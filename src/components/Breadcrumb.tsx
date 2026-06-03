import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
export interface Crumb {
  label: string;
  to?: string;
}
interface BreadcrumbProps {
  items: Crumb[];
}
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.to && !isLast ?
              <Link
                to={item.to}
                className="text-navy hover:text-royal hover:underline">
                
                  {item.label}
                </Link> :

              <span
                className={
                isLast ? 'font-medium text-slate-600' : 'text-slate-500'
                }
                aria-current={isLast ? 'page' : undefined}>
                
                  {item.label}
                </span>
              }
              {!isLast &&
              <ChevronRightIcon
                className="h-4 w-4 text-slate-400"
                aria-hidden="true" />

              }
            </li>);

        })}
      </ol>
    </nav>);

}