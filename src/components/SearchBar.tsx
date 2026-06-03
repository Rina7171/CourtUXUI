import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'md' | 'lg';
  'aria-label'?: string;
}
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  className = '',
  size = 'md',
  'aria-label': ariaLabel = 'Search'
}: SearchBarProps) {
  const sizing =
  size === 'lg' ? 'h-14 text-base pl-12 pr-11' : 'h-11 text-sm pl-10 pr-9';
  const iconLeft = size === 'lg' ? 'left-4' : 'left-3';
  const iconRight = size === 'lg' ? 'right-4' : 'right-3';
  return (
    <div className={`relative ${className}`}>
      <SearchIcon
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${iconLeft} h-5 w-5 text-slate-400`}
        aria-hidden="true" />
      
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`w-full rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-navy focus:ring-2 focus:ring-navy/20 ${sizing}`} />
      
      {value &&
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className={`absolute top-1/2 -translate-y-1/2 ${iconRight} rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600`}>
        
          <XIcon className="h-4 w-4" />
        </button>
      }
    </div>);

}