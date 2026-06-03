import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { DataTable, Column, SortDir } from '../components/DataTable';
import { Pagination } from '../components/Pagination';
import { StatusPill } from '../components/StatusPill';
import { ClassificationBadge } from '../components/ClassificationBadge';
import { EmptyState } from '../components/EmptyState';
import { mockCases, CourtCase } from '../data/mockCases';
import { useScreenInit } from '../useScreenInit';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function CasesList() {
  useScreenInit('cases-list');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState('');
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sortKey, setSortKey] = useState('filedDate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const filtered = useMemo(() => {
    let list = mockCases.filter((c) => {
      const q = query.toLowerCase();
      const matchesQuery =
      !q ||
      c.caseNumber.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q);
      const matchesClass =
      !classification || c.classification === classification;
      const matchesStatus = !status || c.status === status;
      const matchesFrom = !from || c.filedDate >= from;
      const matchesTo = !to || c.filedDate <= to;
      return (
        matchesQuery &&
        matchesClass &&
        matchesStatus &&
        matchesFrom &&
        matchesTo);

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
  const resetFilters = () => {
    setClassification('');
    setStatus('');
    setFrom('');
    setTo('');
    setPage(1);
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
    header: 'Case Title',
    sortable: true,
    render: (r) => r.title
  },
  {
    key: 'classification',
    header: 'Classification',
    render: (r) => <ClassificationBadge classification={r.classification} />
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill status={r.status} />
  },
  {
    key: 'filedDate',
    header: 'Filed Date',
    sortable: true,
    render: (r) => formatDate(r.filedDate)
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
          Public Cases
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse non-confidential cases filed before the court.
        </p>
      </header>

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
          onReset={resetFilters} />
        
      </div>

      <DataTable<CourtCase>
        columns={columns}
        rows={paged}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/cases/${r.id}`)}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        emptyState={
        <EmptyState
          title="No public cases match your search"
          description="Try adjusting your filters or search terms." />

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