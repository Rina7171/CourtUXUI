import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserIcon,
  GavelIcon,
  CalendarIcon,
  MapPinIcon,
  InfoIcon,
  ArrowRightIcon } from
'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { StatusPill } from '../components/StatusPill';
import { ClassificationBadge } from '../components/ClassificationBadge';
import { EmptyState } from '../components/EmptyState';
import { mockCases } from '../data/mockCases';
import { mockHearings } from '../data/mockHearings';
import { useScreenInit } from '../useScreenInit';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export function CaseDetail() {
  useScreenInit('case-detail');
  const { id } = useParams();
  const courtCase = mockCases.find((c) => c.id === id);
  if (!courtCase) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState
          title="Case not found"
          description="The requested case is unavailable or not public." />
        
      </div>);

  }
  const hearings = mockHearings.filter((h) => h.caseId === courtCase.id);
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Cases',
          to: '/cases'
        },
        {
          label: courtCase.caseNumber
        }]
        } />
      

      {/* Case header */}
      <motion.header
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.3
        }}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        
        <div className="flex flex-wrap items-center gap-2">
          <ClassificationBadge classification={courtCase.classification} />
          <StatusPill status={courtCase.status} />
        </div>
        <h1 className="mt-3 font-serif text-2xl font-semibold text-navy-800">
          {courtCase.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
          <span className="font-medium text-navy">{courtCase.caseNumber}</span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4" aria-hidden="true" /> Filed{' '}
            {formatDate(courtCase.filedDate)}
          </span>
          <span>{courtCase.court}</span>
        </div>
      </motion.header>

      {/* Disclaimer banner */}
      <div className="mt-4 flex items-start gap-2 rounded-md border border-sandstone/30 bg-sandstone-50 px-4 py-3 text-sm text-navy-800">
        <InfoIcon
          className="mt-0.5 h-4 w-4 flex-shrink-0 text-sandstone"
          aria-hidden="true" />
        
        <p>
          Public information only. Confidential details are not shown in this
          portal.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Summary */}
        <section className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
            Case Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            {courtCase.description}
          </p>
          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm">
            <GavelIcon className="h-4 w-4 text-sandstone" aria-hidden="true" />
            <span className="text-slate-500">Assigned judge:</span>
            <span className="font-medium text-navy-800">{courtCase.judge}</span>
          </div>
        </section>

        {/* Parties */}
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
            Parties
          </h2>
          <ul className="space-y-3">
            {courtCase.parties.map((p, i) =>
            <li key={i} className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy">
                  <UserIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-navy-800">
                    {p.name}
                  </span>
                  {p.khmerName &&
                <span className="block font-khmer text-xs text-slate-500">
                      {p.khmerName}
                    </span>
                }
                  <span
                  className={`mt-0.5 inline-block text-xs font-medium ${p.role === 'Plaintiff' ? 'text-navy' : 'text-royal'}`}>
                  
                    {p.role}
                  </span>
                </span>
              </li>
            )}
          </ul>
        </section>
      </div>

      {/* Related hearings */}
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-navy-800">
          Related Hearings
        </h2>
        {hearings.length === 0 ?
        <EmptyState title="No public hearings scheduled" /> :

        <ul className="divide-y divide-slate-100">
            {hearings.map((h) =>
          <li
            key={h.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3">
            
                <div>
                  <span className="block text-sm font-medium text-navy-800">
                    {h.type}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarIcon
                    className="h-3.5 w-3.5"
                    aria-hidden="true" />
                  
                      {formatDateTime(`${h.date}T${h.startTime}:00`)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />{' '}
                      {h.courtroom}
                    </span>
                  </span>
                </div>
                <Link
              to={`/hearings/${h.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-royal hover:underline">
              
                  View hearing <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </li>
          )}
          </ul>
        }
      </section>
    </div>);

}