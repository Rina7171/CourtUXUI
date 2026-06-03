import React from 'react';
interface AngkorMotifProps {
  className?: string;
}
// Stylized Angkor Wat temple silhouette used as a subtle background motif.
export function AngkorMotif({ className = '' }: AngkorMotifProps) {
  return (
    <svg
      viewBox="0 0 600 200"
      preserveAspectRatio="xMidYEnd meet"
      aria-hidden="true"
      className={className}>
      
      <g fill="currentColor">
        {/* base platform */}
        <rect x="40" y="170" width="520" height="30" />
        <rect x="70" y="150" width="460" height="22" />
        {/* outer towers */}
        <path d="M110 150 L110 95 Q118 70 126 95 L126 150 Z" />
        <path d="M474 150 L474 95 Q482 70 490 95 L490 150 Z" />
        <path d="M175 150 L175 80 Q184 52 193 80 L193 150 Z" />
        <path d="M407 150 L407 80 Q416 52 425 80 L425 150 Z" />
        {/* central tower (tallest) */}
        <path d="M278 150 L278 55 Q300 8 322 55 L322 150 Z" />
        <path d="M290 55 L300 28 L310 55 Z" />
        {/* connecting gallery */}
        <rect x="126" y="130" width="348" height="20" />
        {/* small finials */}
        <circle cx="300" cy="20" r="5" />
        <circle cx="184" cy="48" r="3" />
        <circle cx="416" cy="48" r="3" />
      </g>
    </svg>);

}