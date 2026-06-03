import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, EyeIcon, LinkIcon } from 'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { DataTable, Column } from '../../components/DataTable';
import { Pagination } from '../../components/Pagination';
import { EmptyState } from '../../components/EmptyState';
import { participants, Participant } from '../../data/mockCourt';
import { useScreenInit } from '../../useScreenInit';
export function CourtParticipants() {
  useScreenInit();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const filtered = useMemo(
    () =>
    participants.filter(
      (p) => !query || p.name.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const columns: Column<Participant>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (r) =>
    <span>
          <span className="block font-medium text-navy">{r.name}</span>
          <span className="font-khmer text-xs text-slate-500">
            {r.khmerName}
          </span>
        </span>

  },
  {
    key: 'partyType',
    header: 'Party Type',
    render: (r) => r.partyType
  },
  {
    key: 'contact',
    header: 'Contact',
    render: (r) =>
    <span className="text-slate-600">
          {r.phone} · {r.email}
        </span>

  },
  {
    key: 'actions',
    header: '',
    render: (r) =>
    <div
      className="flex justify-end gap-1"
      onClick={(e) => e.stopPropagation()}>
      
          <button
        onClick={() => navigate(`/court/participants/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="View profile"
        title="View profile">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="Associate to case"
        title="Associate to case">
        
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Participants"
        subtitle="Individuals and groups involved in cases."
        action={
        <button className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700">
            <PlusIcon className="h-4 w-4" /> Add participant
          </button>
        } />
      
      <div className="mb-6 max-w-xl">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder="Search by name…"
          aria-label="Search participants" />
        
      </div>
      <DataTable<Participant>
        columns={columns}
        rows={paged}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/court/participants/${r.id}`)}
        emptyState={<EmptyState title="No participants found" />} />
      
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