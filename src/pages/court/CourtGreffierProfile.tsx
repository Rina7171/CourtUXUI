import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldIcon,
  MailIcon,
  FolderIcon,
  UserCogIcon,
  ArrowRightIcon } from
'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { StatusPill } from '../../components/StatusPill';
import { EmptyState } from '../../components/EmptyState';
import { greffiers, currentUser } from '../../data/mockCourt';
import { mockCases } from '../../data/mockCases';
import { useScreenInit } from '../../useScreenInit';
export function CourtGreffierProfile() {
  useScreenInit();
  const { id } = useParams();
  const g = greffiers.find((x) => x.id === id);
  if (!g)
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState title="Greffier not found" />
      </div>);

  const isChief = currentUser.role === 'Chief Greffier';
  const assigned = mockCases.slice(0, g.assignedCases % mockCases.length || 3);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Greffiers',
          to: '/court/greffiers'
        },
        {
          label: g.name
        }]
        } />
      
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy">
              <ShieldIcon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-navy-800">
                {g.name}
              </h1>
              <p className="font-khmer text-sm text-slate-500">{g.khmerName}</p>
              <span
                className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${g.role === 'Chief Greffier' ? 'bg-sandstone-50 text-sandstone' : 'bg-navy-50 text-navy'}`}>
                
                {g.role}
              </span>
            </div>
          </div>
          {isChief &&
          <button className="inline-flex items-center gap-2 rounded-md border border-navy px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy-50">
              <UserCogIcon className="h-4 w-4" /> Manage assignment
            </button>
          }
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-base font-semibold text-navy-800">
            Details
          </h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-sandstone" /> {g.email}
            </li>
            <li className="flex items-center gap-2">
              <FolderIcon className="h-4 w-4 text-sandstone" />{' '}
              {g.assignedCases} assigned cases
            </li>
          </ul>
        </section>
        <section className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-base font-semibold text-navy-800">
            Assigned Cases
          </h2>
          <ul className="divide-y divide-slate-100">
            {assigned.map((c) =>
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 py-3">
              
                <div>
                  <Link
                  to={`/court/cases/${c.id}`}
                  className="text-sm font-medium text-navy hover:underline">
                  
                    {c.caseNumber}
                  </Link>
                  <p className="text-xs text-slate-500">{c.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={c.status} />
                  <Link
                  to={`/court/cases/${c.id}`}
                  className="text-royal hover:text-royal-dark">
                  
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>);

}