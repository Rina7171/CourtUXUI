import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserIcon, PhoneIcon, MailIcon, ArrowRightIcon } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { StatusPill } from '../../components/StatusPill';
import { EmptyState } from '../../components/EmptyState';
import { participants } from '../../data/mockCourt';
import { mockCases } from '../../data/mockCases';
import { useScreenInit } from '../../useScreenInit';
export function CourtParticipantProfile() {
  useScreenInit();
  const { id } = useParams();
  const p = participants.find((x) => x.id === id);
  if (!p)
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState title="Participant not found" />
      </div>);

  const involved = mockCases.filter((c) => p.caseIds.includes(c.id));
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Participants',
          to: '/court/participants'
        },
        {
          label: p.name
        }]
        } />
      
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy">
            <UserIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-navy-800">
              {p.name}
            </h1>
            <p className="font-khmer text-sm text-slate-500">{p.khmerName}</p>
            <span className="mt-1 inline-block rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy">
              {p.partyType}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-base font-semibold text-navy-800">
            Contact Information
          </h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-sandstone" /> {p.phone}
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-sandstone" /> {p.email}
            </li>
          </ul>
        </section>
        <section className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-base font-semibold text-navy-800">
            Involved Cases
          </h2>
          {involved.length === 0 ?
          <EmptyState title="No cases" /> :

          <ul className="divide-y divide-slate-100">
              {involved.map((c) =>
            <li
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3">
              
                  <div>
                    <Link
                  to={`/court/cases/${c.id}`}
                  className="text-sm font-medium text-navy hover:underline">
                  
                      {c.caseNumber}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {c.title} · self-represented
                    </p>
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
          }
        </section>
      </div>
    </div>);

}