import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  FileTextIcon } from
'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { StatusPill } from '../components/StatusPill';
import { EmptyState } from '../components/EmptyState';
import { mockHearings } from '../data/mockHearings';
import { mockCases } from '../data/mockCases';
import { useScreenInit } from '../useScreenInit';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
export function HearingDetail() {
  useScreenInit('hearing-detail');
  const { id } = useParams();
  const hearing = mockHearings.find((h) => h.id === id);
  if (!hearing) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState
          title="Hearing not found"
          description="The requested hearing is unavailable or not public." />
        
      </div>);

  }
  const relatedCase = mockCases.find((c) => c.id === hearing.caseId);
  const scheduleItems = [
  {
    icon: CalendarIcon,
    label: 'Date',
    value: formatDate(hearing.date)
  },
  {
    icon: ClockIcon,
    label: 'Start time',
    value: hearing.startTime
  },
  {
    icon: ClockIcon,
    label: 'End time',
    value: hearing.endTime
  },
  {
    icon: MapPinIcon,
    label: 'Courtroom',
    value: hearing.courtroom
  }];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Hearings',
          to: '/hearings'
        },
        {
          label: `${hearing.type} · ${hearing.caseNumber}`
        }]
        } />
      

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
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-2xl font-semibold text-navy-800">
            {hearing.type}
          </h1>
          <StatusPill status={hearing.status} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <FileTextIcon className="h-4 w-4 text-sandstone" aria-hidden="true" />
          <span>Linked case:</span>
          {relatedCase ?
          <Link
            to={`/cases/${relatedCase.id}`}
            className="font-medium text-navy hover:text-royal hover:underline">
            
              {hearing.caseNumber}
            </Link> :

          <span className="font-medium text-navy">{hearing.caseNumber}</span>
          }
        </div>
      </motion.header>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-navy-800">
          Schedule
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {scheduleItems.map((item) =>
          <div key={item.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy">
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {item.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-800">
                  {item.value}
                </dd>
              </span>
            </div>
          )}
        </dl>
      </section>

      <div className="mt-6">
        <Link
          to="/hearings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-royal">
          
          <ArrowLeftIcon className="h-4 w-4" /> Back to hearings
        </Link>
      </div>
    </div>);

}