import React, { useState, Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderOpenIcon,
  CalendarClockIcon,
  ArrowRightIcon,
  ShieldCheckIcon } from
'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { AngkorMotif } from '../components/AngkorMotif';
import { useScreenInit } from '../useScreenInit';
const quickLinks = [
{
  to: '/cases',
  title: 'Browse public cases',
  description:
  'View non-confidential case records filed before the court, by number or title.',
  icon: FolderOpenIcon
},
{
  to: '/hearings',
  title: 'Upcoming public hearings',
  description:
  'See the public hearing schedule, including type, courtroom and date.',
  icon: CalendarClockIcon
}];

export function Home() {
  useScreenInit('home');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <div className="w-full bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <AngkorMotif className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[680px] -translate-x-1/2 text-white/[0.05]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.span
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4
            }}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-navy-700 px-3 py-1 text-xs font-medium text-sandstone-light">
            
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Official public records portal
          </motion.span>
          <motion.p
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4,
              delay: 0.05
            }}
            className="font-khmer text-lg text-sandstone-light">
            
            ប្រព័ន្ធស្វែងរកព័ត៌មានសំណុំរឿងសាធារណៈ
          </motion.p>
          <motion.h1
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.45,
              delay: 0.1
            }}
            className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            
            Access public court records of the Kingdom of Cambodia
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.45,
              delay: 0.15
            }}
            className="mx-auto mt-4 max-w-2xl text-base text-navy-100">
            
            Search and view non-confidential cases and hearings filed before the
            Phnom Penh Municipal Court. Open and transparent to the public.
          </motion.p>

          <motion.form
            initial={{
              opacity: 0,
              y: 12
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.45,
              delay: 0.2
            }}
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            
            <SearchBar
              value={query}
              onChange={setQuery}
              size="lg"
              placeholder="Search by case number, title or party…"
              aria-label="Search public records"
              className="flex-1" />
            
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-sandstone px-6 text-base font-semibold text-navy-900 transition hover:bg-sandstone-light">
              
              Search
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-navy-800">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {quickLinks.map((link, i) =>
          <motion.div
            key={link.to}
            initial={{
              opacity: 0,
              y: 12
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.1
            }}>
            
              <Link
              to={link.to}
              className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sandstone hover:shadow-md">
              
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy transition group-hover:bg-navy group-hover:text-white">
                  <link.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-lg font-semibold text-navy-800">
                  {link.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-slate-500">
                  {link.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-royal">
                  Continue
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>);

}