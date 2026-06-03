import React from 'react';
import { CaseStatus } from '../data/mockCases';
const statusStyles: Record<CaseStatus, string> = {
  Open: 'bg-navy-50 text-navy-800 ring-navy-100',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Closed: 'bg-slate-100 text-slate-600 ring-slate-200',
  Appealed: 'bg-red-50 text-royal ring-red-200'
};
interface StatusPillProps {
  status: CaseStatus | string;
}
export function StatusPill({ status }: StatusPillProps) {
  const style =
  statusStyles[status as CaseStatus] ??
  'bg-slate-100 text-slate-600 ring-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
      
      {status}
    </span>);

}