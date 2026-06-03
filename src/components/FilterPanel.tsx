import React from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
export interface FilterSelect {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}
interface FilterPanelProps {
  selects: FilterSelect[];
  dateLabel?: string;
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange?: (value: string) => void;
  onDateToChange?: (value: string) => void;
  onReset: () => void;
}
export function FilterPanel({
  selects,
  dateLabel,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset
}: FilterPanelProps) {
  return (
    <section
      aria-label="Filters"
      className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-800">
        <SlidersHorizontalIcon
          className="h-4 w-4 text-sandstone"
          aria-hidden="true" />
        
        Filters
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selects.map((sel) =>
        <label key={sel.label} className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {sel.label}
            </span>
            <select
            value={sel.value}
            onChange={(e) => sel.onChange(e.target.value)}
            className="h-10 rounded-md border border-slate-300 bg-white px-2 text-sm focus:border-navy focus:ring-1 focus:ring-navy/30">
            
              <option value="">All</option>
              {sel.options.map((opt) =>
            <option key={opt} value={opt}>
                  {opt}
                </option>
            )}
            </select>
          </label>
        )}

        {dateLabel &&
        <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {dateLabel}
            </span>
            <div className="flex items-center gap-2">
              <input
              type="date"
              value={dateFrom ?? ''}
              onChange={(e) => onDateFromChange?.(e.target.value)}
              aria-label={`${dateLabel} from`}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-2 text-sm focus:border-navy focus:ring-1 focus:ring-navy/30" />
            
              <span className="text-slate-400">–</span>
              <input
              type="date"
              value={dateTo ?? ''}
              onChange={(e) => onDateToChange?.(e.target.value)}
              aria-label={`${dateLabel} to`}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-2 text-sm focus:border-navy focus:ring-1 focus:ring-navy/30" />
            
            </div>
          </div>
        }
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-navy hover:bg-navy-50">
          
          Reset filters
        </button>
      </div>
    </section>);

}