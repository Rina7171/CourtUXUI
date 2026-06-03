import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GavelIcon,
  ShieldIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  RefreshCwIcon,
  PlusIcon,
  FileTextIcon,
  ListChecksIcon,
  StampIcon,
  XIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  FilePlusIcon,
  CalendarPlusIcon } from
'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { StatusPill } from '../../components/StatusPill';
import { ClassificationBadge } from '../../components/ClassificationBadge';
import { EmptyState } from '../../components/EmptyState';
import { mockCases, CaseStatus } from '../../data/mockCases';
import { mockHearings } from '../../data/mockHearings';
import {
  courtDocuments,
  docketEntries,
  dispositions,
  participants as allParticipants,
  ActivityType } from
'../../data/mockCourt';
import { useScreenInit } from '../../useScreenInit';
const TABS = [
'Overview',
'Participants',
'Hearings',
'Documents',
'Docket',
'Disposition'] as
const;
type Tab = (typeof TABS)[number];
function fdate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
function fdatetime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
const activityIcon: Record<ActivityType, React.ElementType> = {
  'Case Filed': FilePlusIcon,
  'Hearing Scheduled': CalendarPlusIcon,
  'Status Changed': RefreshCwIcon,
  'Document Added': FileTextIcon,
  'Disposition Entered': CheckCircleIcon
};
export function CourtCaseDetail() {
  useScreenInit();
  const { id } = useParams();
  const navigate = useNavigate();
  const courtCase = mockCases.find((c) => c.id === id);
  const [tab, setTab] = useState<Tab>('Overview');
  const [statusModal, setStatusModal] = useState(false);
  const [status, setStatus] = useState<CaseStatus>(courtCase?.status ?? 'Open');
  const [newStatus, setNewStatus] = useState<CaseStatus>(
    courtCase?.status ?? 'Open'
  );
  const [note, setNote] = useState('');
  if (!courtCase) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <EmptyState title="Case not found" />
      </div>);

  }
  const caseHearings = mockHearings.filter((h) => h.caseId === courtCase.id);
  const caseDocs = courtDocuments.filter((d) => d.caseId === courtCase.id);
  const caseDocket = docketEntries.
  filter((d) => d.caseId === courtCase.id).
  sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
  const caseDisp = dispositions.find((d) => d.caseId === courtCase.id);
  const caseParties = allParticipants.filter((p) =>
  p.caseIds.includes(courtCase.id)
  );
  const applyStatus = () => {
    setStatus(newStatus);
    setStatusModal(false);
    setNote('');
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Cases',
          to: '/court/cases'
        },
        {
          label: courtCase.caseNumber
        }]
        } />
      

      {/* Case header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ClassificationBadge classification={courtCase.classification} />
              <StatusPill status={status} />
            </div>
            <h1 className="mt-3 font-serif text-2xl font-semibold text-navy-800">
              {courtCase.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
              <span className="font-medium text-navy">
                {courtCase.caseNumber}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" /> Filed{' '}
                {fdate(courtCase.filedDate)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setNewStatus(status);
              setStatusModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-md border border-navy bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy-50">
            
            <RefreshCwIcon className="h-4 w-4" /> Update status
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Case sections"
        className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200">
        
        {TABS.map((t) =>
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => setTab(t)}
          className="relative whitespace-nowrap px-4 py-2.5 text-sm font-medium">
          
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
            layoutId="case-tab"
            className="absolute inset-x-0 -bottom-px h-0.5 bg-royal" />

          }
          </button>
        )}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -6
            }}
            transition={{
              duration: 0.15
            }}>
            
            {tab === 'Overview' &&
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <section className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
                    Case Summary
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {courtCase.description}
                  </p>
                </section>
                <div className="space-y-6">
                  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="font-serif text-base font-semibold text-navy-800">
                        Assigned Judge
                      </h2>
                      <button className="text-xs font-medium text-royal hover:underline">
                        Assign
                      </button>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-slate-700">
                      <GavelIcon className="h-4 w-4 text-sandstone" />{' '}
                      {courtCase.judge}
                    </p>
                  </section>
                  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-2 font-serif text-base font-semibold text-navy-800">
                      Assigned Greffier
                    </h2>
                    <p className="flex items-center gap-2 text-sm text-slate-700">
                      <ShieldIcon className="h-4 w-4 text-sandstone" /> Kim
                      Sophal
                    </p>
                  </section>
                </div>
              </div>
            }

            {tab === 'Participants' &&
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-semibold text-navy-800">
                    Participants
                  </h2>
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700">
                    <PlusIcon className="h-3.5 w-3.5" /> Add participant
                  </button>
                </div>
                {caseParties.length === 0 ?
              <EmptyState title="No participants linked" /> :

              <ul className="divide-y divide-slate-100">
                    {caseParties.map((p) =>
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3">
                  
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy">
                            <UserIcon className="h-4 w-4" />
                          </span>
                          <span>
                            <Link
                        to={`/court/participants/${p.id}`}
                        className="block text-sm font-medium text-navy hover:underline">
                        
                              {p.name}
                            </Link>
                            <span className="font-khmer text-xs text-slate-500">
                              {p.khmerName}
                            </span>
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {p.partyType} · self-represented
                        </span>
                      </li>
                )}
                  </ul>
              }
              </section>
            }

            {tab === 'Hearings' &&
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-semibold text-navy-800">
                    Hearings
                  </h2>
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700">
                    <PlusIcon className="h-3.5 w-3.5" /> Schedule hearing
                  </button>
                </div>
                {caseHearings.length === 0 ?
              <EmptyState title="No hearings scheduled" /> :

              <ul className="divide-y divide-slate-100">
                    {caseHearings.map((h) =>
                <li
                  key={h.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3">
                  
                        <div>
                          <span className="block text-sm font-medium text-navy-800">
                            {h.type}
                          </span>
                          <span className="mt-0.5 flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3.5 w-3.5" />{' '}
                              {fdatetime(`${h.date}T${h.startTime}:00`)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPinIcon className="h-3.5 w-3.5" />{' '}
                              {h.courtroom}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusPill status={h.status} />
                          <Link
                      to={`/court/hearings/${h.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-royal hover:underline">
                      
                            View <ArrowRightIcon className="h-4 w-4" />
                          </Link>
                        </div>
                      </li>
                )}
                  </ul>
              }
              </section>
            }

            {tab === 'Documents' &&
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-semibold text-navy-800">
                    Documents
                  </h2>
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700">
                    <PlusIcon className="h-3.5 w-3.5" /> Add document
                  </button>
                </div>
                {caseDocs.length === 0 ?
              <EmptyState title="No documents uploaded" /> :

              <ul className="divide-y divide-slate-100">
                    {caseDocs.map((d) =>
                <li
                  key={d.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3">
                  
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy">
                            <FileTextIcon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-navy-800">
                              {d.title}
                            </span>
                            <span className="text-xs text-slate-500">
                              {d.type} · {d.submittedBy} ·{' '}
                              {fdate(d.uploadedDate)}
                            </span>
                          </span>
                        </div>
                        {d.confidential &&
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-royal">
                            Confidential
                          </span>
                  }
                      </li>
                )}
                  </ul>
              }
              </section>
            }

            {tab === 'Docket' &&
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-semibold text-navy-800">
                    Docket Timeline
                  </h2>
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700">
                    <PlusIcon className="h-3.5 w-3.5" /> Add entry
                  </button>
                </div>
                {caseDocket.length === 0 ?
              <EmptyState title="No docket activity" /> :

              <ol className="relative ml-3 border-l border-slate-200">
                    {caseDocket.map((e) => {
                  const Icon = activityIcon[e.activityType];
                  return (
                    <li key={e.id} className="mb-5 ml-6 last:mb-0">
                          <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white">
                            <Icon className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <p className="text-sm font-medium text-navy-800">
                            {e.activityType}
                          </p>
                          <p className="text-sm text-slate-600">
                            {e.description}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {e.performedBy} · {fdatetime(e.timestamp)}
                          </p>
                        </li>);

                })}
                  </ol>
              }
              </section>
            }

            {tab === 'Disposition' &&
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-serif text-lg font-semibold text-navy-800">
                  Disposition
                </h2>
                {caseDisp ?
              <div>
                    <div className="mb-3 flex items-center gap-2">
                      <StampIcon className="h-4 w-4 text-sandstone" />
                      <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-sm font-medium text-navy">
                        {caseDisp.outcome}
                      </span>
                      <span className="text-sm text-slate-500">
                        · {fdate(caseDisp.effectiveDate)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {caseDisp.ruling}
                    </p>
                    <p className="mt-3 text-sm text-slate-500">
                      Presiding:{' '}
                      <span className="font-medium text-navy-800">
                        {caseDisp.judge}
                      </span>
                    </p>
                    <button className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-royal px-3 py-2 text-sm font-semibold text-royal hover:bg-red-50">
                      <StampIcon className="h-4 w-4" /> File appeal
                    </button>
                  </div> :

              <div className="text-center">
                    <EmptyState
                  title="No disposition recorded"
                  description="Create a disposition to record the case outcome." />
                
                    <button className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700">
                      <PlusIcon className="h-4 w-4" /> Create disposition
                    </button>
                  </div>
              }
              </section>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Update status modal */}
      <AnimatePresence>
        {statusModal &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setStatusModal(false)}>
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.96
            }}
            transition={{
              duration: 0.15
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Update case status"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-white shadow-xl">
            
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="font-serif text-lg font-semibold text-navy-800">
                  Update Case Status
                </h2>
                <button
                onClick={() => setStatusModal(false)}
                aria-label="Close"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4 px-5 py-5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Current:</span>{' '}
                  <StatusPill status={status} />
                </div>
                <div>
                  <label
                  htmlFor="newStatus"
                  className="mb-1 block text-sm font-medium text-slate-700">
                  
                    New status
                  </label>
                  <select
                  id="newStatus"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as CaseStatus)}
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20">
                  
                    {['Open', 'Pending', 'Closed', 'Appealed'].map((s) =>
                  <option key={s}>{s}</option>
                  )}
                  </select>
                </div>
                <div>
                  <label
                  htmlFor="note"
                  className="mb-1 block text-sm font-medium text-slate-700">
                  
                    Note / reason
                  </label>
                  <textarea
                  id="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20" />
                
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
                <button
                onClick={() => setStatusModal(false)}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                
                  Cancel
                </button>
                <button
                onClick={applyStatus}
                className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700">
                
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}