import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
  className?: string;
}
export type SortDir = 'asc' | 'desc';
interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  sortKey?: string;
  sortDir?: SortDir;
  onSort?: (key: string) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
}
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
  loading,
  emptyState
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-navy-50/60">
            <tr>
              {columns.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-navy-800 ${col.className ?? ''}`}>
                    
                    {col.sortable && onSort ?
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-royal">
                      
                        {col.header}
                        {active ?
                      sortDir === 'asc' ?
                      <ArrowUpIcon className="h-3.5 w-3.5" /> :

                      <ArrowDownIcon className="h-3.5 w-3.5" /> :


                      <ChevronsUpDownIcon className="h-3.5 w-3.5 text-slate-400" />
                      }
                      </button> :

                    col.header
                    }
                  </th>);

              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ?
            Array.from({
              length: 5
            }).map((_, i) =>
            <tr key={i}>
                  {columns.map((col) =>
              <td key={col.key} className="px-4 py-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                    </td>
              )}
                </tr>
            ) :
            rows.length === 0 ?
            <tr>
                <td colSpan={columns.length} className="px-4 py-6">
                  {emptyState}
                </td>
              </tr> :

            rows.map((row, i) =>
            <motion.tr
              key={rowKey(row)}
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
                delay: Math.min(i * 0.03, 0.2)
              }}
              onClick={() => onRowClick?.(row)}
              className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-navy-50/50' : ''}`}>
              
                  {columns.map((col) =>
              <td
                key={col.key}
                className={`px-4 py-3.5 text-sm text-slate-700 ${col.className ?? ''}`}>
                
                      {col.render(row)}
                    </td>
              )}
                </motion.tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>);

}