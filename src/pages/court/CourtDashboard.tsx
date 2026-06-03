import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderIcon,
  CalendarClockIcon,
  StampIcon,
  ArrowRightIcon,
  FilePlusIcon,
  CalendarPlusIcon,
  RefreshCwIcon,
  CheckCircleIcon } from
'lucide-react';
import { DataTable, Column } from '../../components/DataTable';
import { StatusPill } from '../../components/StatusPill';
import { ClassificationBadge } from '../../components/ClassificationBadge';
import { mockCases, CourtCase } from '../../data/mockCases';
import {
  dashboardStats,
  recentActivity,
  currentUser,
  ActivityType } from
'../../data/mockCourt';
import { useScreenInit } from '../../useScreenInit';
const stats = [
{
  label: 'Assigned cases',
  value: dashboardStats.assignedCases,
  icon: FolderIcon,
  to: '/court/cases'
},
{
  label: 'Upcoming hearings',
  value: dashboardStats.upcomingHearings,
  icon: CalendarClockIcon,
  to: '/court/hearings'
},
{
  label: 'Pending dispositions',
  value: dashboardStats.pendingDispositions,
  icon: StampIcon,
  to: '/court/dispositions'
}];

const activityIcon: Record<ActivityType, React.ElementType> = {
  'Case Filed': FilePlusIcon,
  'Hearing Scheduled': CalendarPlusIcon,
  'Status Changed': RefreshCwIcon,
  'Document Added': FilePlusIcon,
  'Disposition Entered': CheckCircleIcon
};
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
function formatRelative(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export function CourtDashboard() {
  useScreenInit();
  const navigate = useNavigate();
  const myCases = mockCases.slice(0, 5);
  const columns: Column<CourtCase>[] = [
  {
    key: 'caseNumber',
    header: 'Case Number',
    render: (r) =>
    <span className="font-medium text-navy">{r.caseNumber}</span>

  },
  {
    key: 'title',
    header: 'Title',
    render: (r) => r.title
  },
  {
    key: 'classification',
    header: 'Class.',
    render: (r) => <ClassificationBadge classification={r.classification} />
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill status={r.status} />
  },
  {
    key: 'filedDate',
    header: 'Filed',
    render: (r) => formatDate(r.filedDate)
  }];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="font-khmer text-sm text-sandstone">
          សួស្តី {currentUser.khmerName}
        </p>
        <h1 className="font-serif text-2xl font-semibold text-navy-800">
          Welcome back, {currentUser.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here is an overview of your registry activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s, i) =>
        <motion.div
          key={s.label}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: i * 0.08
          }}>
          
            <Link
            to={s.to}
            className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sandstone hover:shadow-md">
            
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="mt-1 font-serif text-3xl font-semibold text-navy-800">
                  {s.value}
                </p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy transition group-hover:bg-navy group-hover:text-white">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* My assigned cases */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-navy-800">
              My Assigned Cases
            </h2>
            <Link
              to="/court/cases"
              className="inline-flex items-center gap-1 text-sm font-medium text-royal hover:underline">
              
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <DataTable<CourtCase>
            columns={columns}
            rows={myCases}
            rowKey={(r) => r.id}
            onRowClick={(r) => navigate(`/court/cases/${r.id}`)} />
          
        </section>

        {/* Recent docket activity */}
        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-800">
            Recent Docket Activity
          </h2>
          <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            <ul className="divide-y divide-slate-100">
              {recentActivity.map((a) => {
                const Icon = activityIcon[a.activityType];
                return (
                  <li key={a.id} className="flex gap-3 p-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy-800">
                        {a.activityType}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {a.description}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {a.performedBy} · {formatRelative(a.timestamp)}
                      </p>
                    </div>
                  </li>);

              })}
            </ul>
          </div>
        </section>
      </div>
    </div>);

}