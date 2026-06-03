import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ScaleIcon,
  GavelIcon,
  EyeIcon,
  PencilIcon } from
'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { SearchBar } from '../../components/SearchBar';
import { DataTable, Column } from '../../components/DataTable';
import { EmptyState } from '../../components/EmptyState';
import { lawyers, judges, Lawyer, Judge } from '../../data/mockCourt';
import { useScreenInit } from '../../useScreenInit';
type Tab = 'Lawyers' | 'Judges';
export function CourtLawyersJudges() {
  useScreenInit();
  const [tab, setTab] = useState<Tab>('Lawyers');
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();
  const filteredLawyers = useMemo(
    () => lawyers.filter((l) => !q || l.name.toLowerCase().includes(q)),
    [q]
  );
  const filteredJudges = useMemo(
    () => judges.filter((j) => !q || j.name.toLowerCase().includes(q)),
    [q]
  );
  const lawyerCols: Column<Lawyer>[] = [
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
    key: 'barNumber',
    header: 'Bar Number',
    render: (r) => r.barNumber
  },
  {
    key: 'firm',
    header: 'Firm',
    render: (r) => <span className="text-slate-600">{r.firm}</span>
  },
  {
    key: 'cases',
    header: 'Cases',
    render: (r) => r.assignedCaseIds.length
  },
  {
    key: 'actions',
    header: '',
    render: () =>
    <div className="flex justify-end gap-1">
          <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="View"
        title="View">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="Edit"
        title="Edit">
        
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>

  }];

  const judgeCols: Column<Judge>[] = [
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
    key: 'barNumber',
    header: 'ID Number',
    render: (r) => r.barNumber
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
    key: 'cases',
    header: 'Cases',
    render: (r) => r.assignedCaseIds.length
  },
  {
    key: 'actions',
    header: '',
    render: () =>
    <div className="flex justify-end gap-1">
          <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="View"
        title="View">
        
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
        className="rounded-md p-1.5 text-slate-500 hover:bg-navy-50 hover:text-navy"
        aria-label="Edit"
        title="Edit">
        
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>

  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Lawyers & Judges"
        subtitle="Legal counsel and judicial officer records."
        action={
        <button className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700">
            <PlusIcon className="h-4 w-4" /> Add{' '}
            {tab === 'Lawyers' ? 'lawyer' : 'judge'}
          </button>
        } />
      

      <div
        role="tablist"
        aria-label="Record type"
        className="mb-5 flex gap-1 border-b border-slate-200">
        
        {(['Lawyers', 'Judges'] as Tab[]).map((t) =>
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => setTab(t)}
          className="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium">
          
            {t === 'Lawyers' ?
          <ScaleIcon className="h-4 w-4" /> :

          <GavelIcon className="h-4 w-4" />
          }
            <span
            className={
            tab === t ?
            'text-navy-800' :
            'text-slate-500 hover:text-navy-800'
            }>
            
              {t}
            </span>
            {tab === t &&
          <motion.span
            layoutId="lj-tab"
            className="absolute inset-x-0 -bottom-px h-0.5 bg-royal" />

          }
          </button>
        )}
      </div>

      <div className="mb-6 max-w-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name…"
          aria-label="Search records" />
        
      </div>

      {tab === 'Lawyers' ?
      <DataTable<Lawyer>
        columns={lawyerCols}
        rows={filteredLawyers}
        rowKey={(r) => r.id}
        emptyState={<EmptyState title="No lawyers found" />} /> :


      <DataTable<Judge>
        columns={judgeCols}
        rows={filteredJudges}
        rowKey={(r) => r.id}
        emptyState={<EmptyState title="No judges found" />} />

      }
    </div>);

}