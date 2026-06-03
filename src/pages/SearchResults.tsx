import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, FolderIcon, CalendarIcon } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { StatusPill } from '../components/StatusPill';
import { ClassificationBadge } from '../components/ClassificationBadge';
import { EmptyState } from '../components/EmptyState';
import { mockCases } from '../data/mockCases';
import { mockHearings } from '../data/mockHearings';
import { useScreenInit } from '../useScreenInit';
type Tab = 'cases' | 'hearings';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
export function SearchResults() {
  useScreenInit('search-results');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [tab, setTab] = useState<Tab>('cases');
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);
  const onQueryChange = (v: string) => {
    setQuery(v);
    setSearchParams(
      v ?
      {
        q: v
      } :
      {}
    );
  };
  const q = query.toLowerCase().trim();
  const caseResults = useMemo(
    () =>
    mockCases.filter(
      (c) =>
      !q ||
      c.caseNumber.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q)
    ),
    [q]
  );
  const hearingResults = useMemo(
    () =>
    mockHearings.filter(
      (h) =>
      !q ||
      h.caseNumber.toLowerCase().includes(q) ||
      h.type.toLowerCase().includes(q)
    ),
    [q]
  );
  const tabs: {
    key: Tab;
    label: string;
    count: number;
  }[] = [
  {
    key: 'cases',
    label: 'Cases',
    count: caseResults.length
  },
  {
    key: 'hearings',
    label: 'Hearings',
    count: hearingResults.length
  }];

  const activeResults = tab === 'cases' ? caseResults : hearingResults;
  return (
    <div className="w-full">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <SearchBar
            value={query}
            onChange={onQueryChange}
            placeholder="Search cases and hearings…"
            aria-label="Search records" />
          
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="mb-1 font-serif text-2xl font-semibold text-navy-800">
          Search results
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          {q ?
          <>
              Showing results for “
              <span className="font-medium text-navy-800">{query}</span>”
            </> :

          'Showing all public records'
          }
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Result type"
          className="mb-6 flex gap-1 border-b border-slate-200">
          
          {tabs.map((t) =>
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className="relative px-4 py-2.5 text-sm font-medium transition">
            
              <span
              className={
              tab === t.key ?
              'text-navy-800' :
              'text-slate-500 hover:text-navy-800'
              }>
              
                {t.label}{' '}
                <span className="ml-0.5 text-xs text-slate-400">
                  ({t.count})
                </span>
              </span>
              {tab === t.key &&
            <motion.span
              layoutId="search-tab"
              className="absolute inset-x-0 -bottom-px h-0.5 bg-royal" />

            }
            </button>
          )}
        </div>

        {/* Results */}
        {activeResults.length === 0 ?
        <EmptyState
          title="No results found"
          description="Try a different search term or browse the full lists." /> :


        <ul className="space-y-3">
            {activeResults.map((r: any, i) => {
            const isCase = tab === 'cases';
            const to = isCase ? `/cases/${r.id}` : `/hearings/${r.id}`;
            return (
              <motion.li
                key={r.id}
                initial={{
                  opacity: 0,
                  y: 6
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(i * 0.04, 0.3)
                }}>
                
                  <Link
                  to={to}
                  className="group flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sandstone hover:shadow-md">
                  
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-sm bg-navy-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-navy">
                          {isCase ?
                        <FolderIcon className="h-3 w-3" /> :

                        <CalendarIcon className="h-3 w-3" />
                        }
                          {isCase ? 'Case' : 'Hearing'}
                        </span>
                        {isCase ?
                      <ClassificationBadge
                        classification={r.classification} /> :

                      null}
                        <StatusPill status={r.status} />
                      </div>
                      <h3 className="mt-1.5 truncate font-medium text-navy-800">
                        {isCase ? r.title : `${r.type} — ${r.caseNumber}`}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {isCase ?
                      <>
                            {r.caseNumber} · Filed {formatDate(r.filedDate)}
                          </> :

                      <>
                            {formatDate(r.date)} · {r.startTime} · {r.courtroom}
                          </>
                      }
                      </p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-royal transition group-hover:translate-x-0.5" />
                  </Link>
                </motion.li>);

          })}
          </ul>
        }
      </div>
    </div>);

}