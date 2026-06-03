import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  EyeIcon,
  RefreshCwIcon,
  MoreVerticalIcon } from
'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { FilterPanel } from '../../components/FilterPanel';
import { DataTable, Column, SortDir } from '../../components/DataTable';
import { Pagination } from '../../components/Pagination';
import { StatusPill } from '../../components/StatusPill';
import { ClassificationBadge } from '../../components/ClassificationBadge';
import { EmptyState } from '../../components/EmptyState';
import { mockCases, CourtCase } from '../../data/mockCases';
import { useScreenInit } from '../../useScreenInit';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function CourtCasesList() {
  useScreenInit();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState('');
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sortKey, setSortKey] = useState('filedDate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const filtered = useMemo(() => {
    let list = mockCases.filter((c) => {
      const q = query.toLowerCase();
      const mq =
      !q ||
      c.caseNumber.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q);
      const mc = !classification || c.classification === classification;
      const ms = !status || c.status === status;
      const mf = !from || c.filedDate >= from;
      const mt = !to || c.filedDate <= to;
      return mq && mc && ms && mf && mt;
    });
    list = [...list].sort((a, b) => {
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [query, classification, status, from, to, sortKey, sortDir]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');else
    {
      setSortKey(key);
      setSortDir('asc');
    }
  };
  const columns: Column<CourtCase>[] = [
  {
    key: 'caseNumber',
    header: 'Case Number',
    sortable: true,
    render: (r) =>
    <span className="font-medium text-navy">{r.caseNumber}</span>

  },
  {
    key: 'title',
    header: 'Title',
    sortable: true,
    render: (r) => r.title
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill status={r.status} />
  },
  {
    key: 'classification',
    header: 'Classification',
    render: (r) => <ClassificationBadge classification={r.classification} />
  },
  {
    key: 'judge',
    header: 'Assigned Judge',
    render: (r) => <span className="text-slate-600">{r.judge}</span>
  },
  {
    key: 'filedDate',
    header: 'Filed',
    sortable: true,
    render: (r) => formatDate(r.filedDate)
  },
  {
    key: 'actions',
    header: '',
    render: (r) =>
    <div
      className="flex items-center justify-end gap-1"
      onClick={(e) => e.stopPropagation()}>
      
          <button
        onClick={() => navigate(`/court/cases/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label={`View ${r.caseNumber}`}
        title="View">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        onClick={() => navigate(`/court/cases/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label={`Update status of ${r.caseNumber}`}
        title="Update status">
        
            <RefreshCwIcon className="h-4 w-4" />
          </button>
        </div>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Cases"
        subtitle="All cases in the court registry."
        action={
        <button
          onClick={() => navigate('/court/cases/new')}
          className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700">
          
            <PlusIcon className="h-4 w-4" /> New Case
          </button>
        } />
      

      <div className="mb-4 max-w-xl">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder="Search by case number or title…"
          aria-label="Search cases" />
        
      </div>

      <div className="mb-6">
        <FilterPanel
          selects={[
          {
            label: 'Classification',
            value: classification,
            options: ['Criminal', 'Civil'],
            onChange: (v) => {
              setClassification(v);
              setPage(1);
            }
          },
          {
            label: 'Status',
            value: status,
            options: ['Open', 'Pending', 'Closed', 'Appealed'],
            onChange: (v) => {
              setStatus(v);
              setPage(1);
            }
          }]
          }
          dateLabel="Filed date range"
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
            setClassification('');
            setStatus('');
            setFrom('');
            setTo('');
            setPage(1);
          }} />
        
      </div>

      <DataTable<CourtCase>
        columns={columns}
        rows={paged}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/court/cases/${r.id}`)}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        emptyState={
        <EmptyState
          title="No cases found"
          description="Adjust your filters or create a new case." />

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