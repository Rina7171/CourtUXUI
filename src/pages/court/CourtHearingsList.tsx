import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, EyeIcon, RefreshCwIcon } from 'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { FilterPanel } from '../../components/FilterPanel';
import { DataTable, Column, SortDir } from '../../components/DataTable';
import { Pagination } from '../../components/Pagination';
import { StatusPill } from '../../components/StatusPill';
import { EmptyState } from '../../components/EmptyState';
import { mockHearings, Hearing } from '../../data/mockHearings';
import { useScreenInit } from '../../useScreenInit';
function fdate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function CourtHearingsList() {
  useScreenInit();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [room, setRoom] = useState('');
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const rooms = useMemo(
    () => Array.from(new Set(mockHearings.map((h) => h.courtroom))),
    []
  );
  const filtered = useMemo(() => {
    let list = mockHearings.filter((h) => {
      const q = query.toLowerCase();
      const mq =
      !q ||
      h.caseNumber.toLowerCase().includes(q) ||
      h.type.toLowerCase().includes(q);
      return (
        mq && (
        !type || h.type === type) && (
        !room || h.courtroom === room) && (
        !status || h.status === status) && (
        !from || h.date >= from) && (
        !to || h.date <= to));

    });
    list = [...list].sort((a, b) => {
      const av = (a as any)[sortKey],
        bv = (b as any)[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [query, type, room, status, from, to, sortKey, sortDir]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const handleSort = (k: string) => {
    if (sortKey === k) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');else
    {
      setSortKey(k);
      setSortDir('asc');
    }
  };
  const columns: Column<Hearing>[] = [
  {
    key: 'caseNumber',
    header: 'Case Number',
    sortable: true,
    render: (r) =>
    <span className="font-medium text-navy">{r.caseNumber}</span>

  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
    render: (r) => r.type
  },
  {
    key: 'date',
    header: 'Date / Time',
    sortable: true,
    render: (r) => `${fdate(r.date)} · ${r.startTime}–${r.endTime}`
  },
  {
    key: 'courtroom',
    header: 'Courtroom',
    render: (r) => r.courtroom
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill status={r.status} />
  },
  {
    key: 'actions',
    header: '',
    render: (r) =>
    <div
      className="flex justify-end gap-1"
      onClick={(e) => e.stopPropagation()}>
      
          <button
        onClick={() => navigate(`/court/hearings/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="View"
        title="View">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        onClick={() => navigate(`/court/hearings/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="Reschedule"
        title="Reschedule">
        
            <RefreshCwIcon className="h-4 w-4" />
          </button>
        </div>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Hearings"
        subtitle="All scheduled court hearings."
        action={
        <button className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700">
            <PlusIcon className="h-4 w-4" /> Schedule hearing
          </button>
        } />
      
      <div className="mb-4 max-w-xl">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder="Search by case number or hearing type…"
          aria-label="Search hearings" />
        
      </div>
      <div className="mb-6">
        <FilterPanel
          selects={[
          {
            label: 'Hearing type',
            value: type,
            options: ['Arraignment', 'Trial', 'Bail Hearing', 'Sentencing'],
            onChange: (v) => {
              setType(v);
              setPage(1);
            }
          },
          {
            label: 'Courtroom',
            value: room,
            options: rooms,
            onChange: (v) => {
              setRoom(v);
              setPage(1);
            }
          },
          {
            label: 'Status',
            value: status,
            options: ['Scheduled', 'Completed', 'Adjourned'],
            onChange: (v) => {
              setStatus(v);
              setPage(1);
            }
          }]
          }
          dateLabel="Date range"
          dateFrom={from}
          dateTo={to}
          onDateFromChange={(v) => {
            setFrom(v);
            setPage(1);
          }}
          onDateToChange={(v) => {
            setTo(v);
            setPage(1);
          }}
          onReset={() => {
            setType('');
            setRoom('');
            setStatus('');
            setFrom('');
            setTo('');
            setPage(1);
          }} />
        
      </div>
      <DataTable<Hearing>
        columns={columns}
        rows={paged}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/court/hearings/${r.id}`)}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        emptyState={<EmptyState title="No hearings found" />} />
      
      {filtered.length > 0 &&
      <div className="mt-4">
          <Pagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }} />
        
        </div>
      }
    </div>);

}