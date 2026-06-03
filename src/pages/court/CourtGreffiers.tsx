import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, EyeIcon, UserCogIcon } from 'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { DataTable, Column } from '../../components/DataTable';
import { EmptyState } from '../../components/EmptyState';
import { greffiers, Greffier, currentUser } from '../../data/mockCourt';
import { useScreenInit } from '../../useScreenInit';
export function CourtGreffiers() {
  useScreenInit();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const isChief = currentUser.role === 'Chief Greffier';
  const filtered = greffiers.filter(
    (g) => !query || g.name.toLowerCase().includes(query.toLowerCase())
  );
  const columns: Column<Greffier>[] = [
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
    key: 'role',
    header: 'Role',
    render: (r) =>
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.role === 'Chief Greffier' ? 'bg-sandstone-50 text-sandstone' : 'bg-navy-50 text-navy'}`}>
      
          {r.role}
        </span>

  },
  {
    key: 'email',
    header: 'Email',
    render: (r) => <span className="text-slate-600">{r.email}</span>
  },
  {
    key: 'assignedCases',
    header: 'Assigned Cases',
    render: (r) => r.assignedCases
  },
  {
    key: 'active',
    header: 'Status',
    render: (r) =>
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.active ? 'bg-navy-50 text-navy' : 'bg-slate-100 text-slate-500'}`}>
      
          {r.active ? 'Active' : 'Inactive'}
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
        onClick={() => navigate(`/court/greffiers/${r.id}`)}
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="View profile"
        title="View profile">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          {isChief &&
      <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="Manage assignment"
        title="Case assignment">
        
              <UserCogIcon className="h-4 w-4" />
            </button>
      }
        </div>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Greffiers"
        subtitle="Court clerks and their case assignments." />
      
      {isChief &&
      <div className="mb-5 flex items-start gap-2 rounded-md border border-sandstone/30 bg-sandstone-50 px-4 py-3 text-sm text-navy-800">
          <ShieldIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sandstone" />
          <p>
            As Chief Greffier you can manage case assignments and supervision
            for the greffiers below.
          </p>
        </div>
      }
      <div className="mb-6 max-w-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name…"
          aria-label="Search greffiers" />
        
      </div>
      <DataTable<Greffier>
        columns={columns}
        rows={filtered}
        rowKey={(r) => r.id}
        onRowClick={(r) => navigate(`/court/greffiers/${r.id}`)}
        emptyState={<EmptyState title="No greffiers found" />} />
      
    </div>);

}