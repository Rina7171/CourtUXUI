import React from 'react';
import { FileSearchIcon } from 'lucide-react';
interface EmptyStateProps {
  title: string;
  description?: string;
}
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy">
        <FileSearchIcon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy-800">
        {title}
      </h3>
      {description &&
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      }
    </div>);

}