import React from 'react';
import { Classification } from '../data/mockCases';
interface ClassificationBadgeProps {
  classification: Classification | string;
}
export function ClassificationBadge({
  classification
}: ClassificationBadgeProps) {
  const isCriminal = classification === 'Criminal';
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${isCriminal ? 'bg-royal/10 text-royal' : 'bg-sandstone/10 text-sandstone'}`}>
      
      {classification}
    </span>);

}