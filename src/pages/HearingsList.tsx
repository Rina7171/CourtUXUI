import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { DataTable, Column, SortDir } from '../components/DataTable';
import { Pagination } from '../components/Pagination';
import { StatusPill } from '../components/StatusPill';
import { EmptyState } from '../components/EmptyState';
import { mockHearings, Hearing } from '../data/mockHearings';
import { useScreenInit } from '../useScreenInit';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function HearingsList() {
  useScreenInit('hearings-list');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [courtroom, setCourtroom] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const courtrooms = useMemo(
    () => Array.from(new Set(mockHearings.map((h) => h.courtroom))),
    []
  );
  const filtered = useMemo(() => {
    let list = mockHearings.filter((h) => {
      const q = query.toLowerCase();
      const matchesQuery =
      !q ||
      h.caseNumber.toLowerCase().includes(q) ||
      h.type.toLowerCase().includes(q);
      const matchesType = !type || h.type === type;
      const matchesRoom = !courtroom || h.courtroom === courtroom;
      const matchesFrom = !from || h.date >= from;
      const matchesTo = !to || h.date <= to;
      return (
        matchesQuery && matchesType && matchesRoom && matchesFrom && matchesTo);

    });
    list = [...list].sort((a, b) => {
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [query, type, courtroom, from, to, sortKey, sortDir]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');else
    {
      setSortKey(key);
      setSortDir('asc');
    }
  };
  const resetFilters = () => {
    setType('');
    setCourtroom('');
    setFrom('');
    setTo('');
    setPage(1);
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
    header: 'Hearing Type',
    sortable: true,
    render: (r) => r.type
  },
  {
    key: 'date',
    header: 'Date / Time',
    sortable: true,
    render: (r) => `${formatDate(r.date)} · ${r.startTime}`
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
    key: 'view',
    header: '',
    render: () =>
    <span className="inline-flex items-center gap-0.5 text-sm font-medium text-royal">
          View <ChevronRightIcon className="h-4 w-4" />
        </span>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-navy-800">
          Public Hearings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The public schedule of court hearings.
        </p>
      </header>

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
            value: courtroom,
            options: courtrooms,
            onChange: (v) => {
              setCourtroom(v);
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
          onReset={resetFilters} />
        
      </div>

      <DataTable<Hearing>
        columns={columns}
        rows={paged}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/hearings/${r.id}`)}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        emptyState={
        <EmptyState
          title="No hearings match your search"
          description="Try adjusting your filters." />

        } />
      

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