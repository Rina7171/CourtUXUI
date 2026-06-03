import React from 'react';
import { Link } from 'react-router-dom';
import { GavelIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { AngkorMotif } from './AngkorMotif';
export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-navy-900 text-navy-100">
      <AngkorMotif className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[600px] -translate-x-1/2 text-white/[0.04]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sandstone text-sandstone-light">
                <GavelIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-serif text-base font-semibold text-white">
                Phnom Penh Municipal Court
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-navy-100">
              The public portal of the Kingdom of Cambodia judiciary. This
              service provides read-only access to non-confidential case and
              hearing records in the public interest.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sandstone-light">
              Browse
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cases" className="hover:text-white">
                  Public Cases
                </Link>
              </li>
              <li>
                <Link to="/hearings" className="hover:text-white">
                  Upcoming Hearings
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white">
                  Search Records
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sandstone-light">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon
                  className="mt-0.5 h-4 w-4 text-sandstone"
                  aria-hidden="true" />
                
                <span>Street 19, Daun Penh, Phnom Penh, Cambodia</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon
                  className="h-4 w-4 text-sandstone"
                  aria-hidden="true" />
                
                <span>+855 23 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon
                  className="h-4 w-4 text-sandstone"
                  aria-hidden="true" />
                
                <span>info@court.gov.kh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-700 pt-6 text-xs text-navy-100">
          <p className="mb-1 font-khmer">
            ព័ត៌មាននេះផ្តល់ជូនជាសាធារណៈ និងសម្រាប់គោលបំណងព័ត៌មានតែប៉ុណ្ណោះ។
          </p>
          <p>
            Disclaimer: Information shown is public and for informational
            purposes only. It does not constitute an official record or legal
            advice. © {new Date().getFullYear()} Kingdom of Cambodia Judiciary.
          </p>
        </div>
      </div>
    </footer>);

}