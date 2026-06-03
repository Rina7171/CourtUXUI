import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  FileTextIcon,
  RefreshCwIcon } from
'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { StatusPill } from '../../components/StatusPill';
import { EmptyState } from '../../components/EmptyState';
import { mockHearings, HearingStatus } from '../../data/mockHearings';
import { mockCases } from '../../data/mockCases';
import { useScreenInit } from '../../useScreenInit';
function fdate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
export function CourtHearingDetail() {
  useScreenInit();
  const { id } = useParams();
  const hearing = mockHearings.find((h) => h.id === id);
  const [status, setStatus] = useState<HearingStatus>(
    hearing?.status ?? 'Scheduled'
  );
  if (!hearing) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState title="Hearing not found" />
      </div>);

  }
  const relatedCase = mockCases.find((c) => c.id === hearing.caseId);
  const schedule = [
  {
    icon: CalendarIcon,
    label: 'Date',
    value: fdate(hearing.date)
  },
  {
    icon: ClockIcon,
    label: 'Start',
    value: hearing.startTime
  },
  {
    icon: ClockIcon,
    label: 'End',
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
          to: '/court/hearings'
        },
        {
          label: `${hearing.type} · ${hearing.caseNumber}`
        }]
        } />
      
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-2xl font-semibold text-navy-800">
            {hearing.type}
          </h1>
          <StatusPill status={status} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <FileTextIcon className="h-4 w-4 text-sandstone" />
          <span>Linked case:</span>
          {relatedCase ?
          <Link
            to={`/court/cases/${relatedCase.id}`}
            className="font-medium text-navy hover:underline">
            
              {hearing.caseNumber}
            </Link> :

          <span className="font-medium text-navy">{hearing.caseNumber}</span>
          }
        </div>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-navy-800">
          Schedule
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {schedule.map((s) =>
          <div key={s.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy">
                <s.icon className="h-4 w-4" />
              </span>
              <span>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {s.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-800">
                  {s.value}
                </dd>
              </span>
            </div>
          )}
        </dl>
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
          <label
            htmlFor="hstatus"
            className="text-sm font-medium text-slate-700">
            
            Update status:
          </label>
          <select
            id="hstatus"
            value={status}
            onChange={(e) => setStatus(e.target.value as HearingStatus)}
            className="h-10 rounded-md border border-slate-300 px-3 text-sm focus:border-navy focus:ring-1 focus:ring-navy/30">
            
            {['Scheduled', 'Completed', 'Adjourned'].map((s) =>
            <option key={s}>{s}</option>
            )}
          </select>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 font-serif text-base font-semibold text-navy-800">
          Continuance / Reschedule History
        </h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-50 text-navy">
              <RefreshCwIcon className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="block text-slate-700">
                Originally scheduled, no continuances recorded.
              </span>
            </span>
          </li>
        </ul>
      </section>

      <div className="mt-6">
        <Link
          to="/court/hearings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-royal">
          
          <ArrowLeftIcon className="h-4 w-4" /> Back to hearings
        </Link>
      </div>
    </div>);

}