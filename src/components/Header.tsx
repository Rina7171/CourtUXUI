import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GavelIcon, MenuIcon, XIcon, LockIcon, SearchIcon } from 'lucide-react';
const navLinks = [
{
  to: '/cases',
  label: 'Cases'
},
{
  to: '/hearings',
  label: 'Hearings'
},
{
  to: '/search',
  label: 'Search'
}];

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="w-full">
      {/* Top utility bar — public notice */}
      <div className="bg-navy-900 text-navy-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-xs sm:px-6">
          <span className="font-khmer">
            ព្រះរាជាណាចក្រកម្ពុជា · ជាតិ សាសនា ព្រះមហាក្សត្រ
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <LockIcon
              className="h-3 w-3 text-sandstone-light"
              aria-hidden="true" />
            
            Public access · Read-only information
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sandstone bg-navy-800 text-sandstone-light">
              <GavelIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-khmer text-base font-semibold text-sandstone-light">
                តុលាការក្រុងភ្នំពេញ
              </span>
              <span className="block font-serif text-lg font-semibold tracking-tight">
                Phnom Penh Municipal Court
              </span>
              <span className="block text-[11px] uppercase tracking-widest text-navy-100">
                Kingdom of Cambodia · Public Portal
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex">
            
            {navLinks.map((link) =>
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-navy-700 text-sandstone-light' : 'text-navy-100 hover:bg-navy-700 hover:text-white'}`
              }>
              
                {link.label}
              </NavLink>
            )}
          </nav>

          <button
            type="button"
            className="rounded-md p-2 text-navy-100 hover:bg-navy-700 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}>
            
            {open ?
            <XIcon className="h-6 w-6" /> :

            <MenuIcon className="h-6 w-6" />
            }
          </button>
        </div>

        {/* Accent rule — Cambodian flag colours */}
        <div className="flex h-1 w-full">
          <div className="flex-1 bg-royal" />
          <div className="w-1/3 bg-sandstone" />
          <div className="flex-1 bg-royal" />
        </div>

        {open &&
        <nav
          aria-label="Mobile"
          className="border-t border-navy-700 bg-navy md:hidden">
          
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) =>
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-navy-700 text-sandstone-light' : 'text-navy-100 hover:bg-navy-700'}`
              }>
              
                  {link.label === 'Search' &&
              <SearchIcon className="h-4 w-4" />
              }
                  {link.label}
                </NavLink>
            )}
            </div>
          </nav>
        }
      </div>
    </header>);

}