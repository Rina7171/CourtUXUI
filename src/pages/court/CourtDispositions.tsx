import React from 'react';
import { Link } from 'react-router-dom';
import { StampIcon, PlusIcon, ArrowRightIcon } from 'lucide-react';
import { PageHeader } from '../../components/court/PageHeader';
import { EmptyState } from '../../components/EmptyState';
import { dispositions } from '../../data/mockCourt';
import { mockCases } from '../../data/mockCases';
import { useScreenInit } from '../../useScreenInit';
const outcomeTypes = ['Guilty', 'Dismissed', 'Settled', 'Liable', 'Not Liable'];
function fdate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function CourtDispositions() {
  useScreenInit();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Dispositions"
        subtitle="Recorded case outcomes and outcome types." />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
            Recorded Dispositions
          </h2>
          {dispositions.length === 0 ?
          <EmptyState title="No dispositions recorded" /> :

          <ul className="space-y-3">
              {dispositions.map((d) => {
              const c = mockCases.find((x) => x.id === d.caseId);
              return (
                <li
                  key={d.id}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <StampIcon className="h-4 w-4 text-sandstone" />
                        <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-sm font-medium text-navy">
                          {d.outcome}
                        </span>
                        <span className="text-sm text-slate-500">
                          · {fdate(d.effectiveDate)}
                        </span>
                      </div>
                      {c &&
                    <Link
                      to={`/court/cases/${c.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-royal hover:underline">
                      
                          {c.caseNumber} <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    }
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{d.ruling}</p>
                    <p className="mt-1.5 text-xs text-slate-400">
                      Presiding: {d.judge}
                    </p>
                  </li>);

            })}
            </ul>
          }
        </section>

        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
            Outcome Manager
          </h2>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <ul className="mb-4 divide-y divide-slate-100">
              {outcomeTypes.map((o) =>
              <li key={o} className="py-2.5 text-sm text-slate-700">
                  {o}
                </li>
              )}
            </ul>
            <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
              <input
                placeholder="New outcome type…"
                className="h-9 flex-1 rounded-md border border-slate-300 px-3 text-sm focus:border-navy focus:ring-1 focus:ring-navy/30" />
              
              <button className="inline-flex items-center gap-1 rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700">
                <PlusIcon className="h-3.5 w-3.5" /> Add
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>);

}