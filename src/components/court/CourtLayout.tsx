import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GavelIcon,
  LayoutDashboardIcon,
  FolderIcon,
  CalendarIcon,
  FileTextIcon,
  ListChecksIcon,
  UsersIcon,
  ScaleIcon,
  StampIcon,
  ShieldIcon,
  BellIcon,
  SearchIcon,
  LogOutIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon } from
'lucide-react';
import { currentUser } from '../../data/mockCourt';
const navItems = [
{
  to: '/court',
  label: 'Dashboard',
  icon: LayoutDashboardIcon,
  end: true
},
{
  to: '/court/cases',
  label: 'Cases',
  icon: FolderIcon
},
{
  to: '/court/hearings',
  label: 'Hearings',
  icon: CalendarIcon
},
{
  to: '/court/documents',
  label: 'Documents',
  icon: FileTextIcon
},
{
  to: '/court/dockets',
  label: 'Dockets',
  icon: ListChecksIcon
},
{
  to: '/court/participants',
  label: 'Participants',
  icon: UsersIcon
},
{
  to: '/court/lawyers-judges',
  label: 'Lawyers & Judges',
  icon: ScaleIcon
},
{
  to: '/court/dispositions',
  label: 'Dispositions',
  icon: StampIcon
},
{
  to: '/court/greffiers',
  label: 'Greffiers',
  icon: ShieldIcon
}];

export function CourtLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-100 font-sans text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-navy-700 bg-navy text-white">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 hover:bg-navy-700 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation">
              
              {menuOpen ?
              <XIcon className="h-5 w-5" /> :

              <MenuIcon className="h-5 w-5" />
              }
            </button>
            <Link to="/court" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-sandstone bg-navy-800 text-sandstone-light">
                <GavelIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-sm font-semibold">
                  Court Panel
                </span>
                <span className="block font-khmer text-[11px] text-sandstone-light">
                  តុលាការក្រុងភ្នំពេញ
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 max-w-md md:block">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-100"
                aria-hidden="true" />
              
              <input
                type="search"
                placeholder="Search cases, hearings, participants…"
                aria-label="Global search"
                className="h-9 w-full rounded-md border border-navy-700 bg-navy-800 pl-9 pr-3 text-sm text-white placeholder:text-navy-100 focus:border-sandstone focus:ring-1 focus:ring-sandstone/40" />
              
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="relative rounded-md p-2 hover:bg-navy-700"
              aria-label="Notifications">
              
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-royal" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setUserOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md py-1.5 pl-2 pr-1.5 hover:bg-navy-700"
                aria-expanded={userOpen}
                aria-haspopup="menu">
                
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sandstone text-xs font-semibold text-navy-900">
                  {currentUser.name.
                  split(' ').
                  map((n) => n[0]).
                  join('')}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-medium leading-none">
                    {currentUser.name}
                  </span>
                  <span className="block text-[10px] text-sandstone-light">
                    {currentUser.role}
                  </span>
                </span>
                <ChevronDownIcon className="h-4 w-4 text-navy-100" />
              </button>

              <AnimatePresence>
                {userOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -4
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -4
                  }}
                  transition={{
                    duration: 0.15
                  }}
                  role="menu"
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white py-1 text-slate-700 shadow-lg">
                  
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-medium text-navy-800">
                        {currentUser.name}
                      </p>
                      <p className="font-khmer text-xs text-slate-500">
                        {currentUser.khmerName}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-sandstone-50 px-2 py-0.5 text-[11px] font-medium text-sandstone">
                        {currentUser.role}
                      </span>
                    </div>
                    <button
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50">
                    
                      <UsersIcon className="h-4 w-4 text-slate-400" /> My
                      profile
                    </button>
                    <button
                    role="menuitem"
                    onClick={() => navigate('/court/login')}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-royal hover:bg-red-50">
                    
                      <LogOutIcon className="h-4 w-4" /> Log out
                    </button>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="flex h-1 w-full">
          <div className="flex-1 bg-royal" />
          <div className="w-1/3 bg-sandstone" />
          <div className="flex-1 bg-royal" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 top-[68px] z-20 w-64 transform border-r border-slate-200 bg-white transition-transform lg:static lg:top-0 lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <nav
            aria-label="Court panel"
            className="flex h-full flex-col gap-0.5 overflow-y-auto p-3">
            
            {navItems.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-navy-50 text-navy-800' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-800'}`
              }>
              
                {({ isActive }) =>
              <>
                    <item.icon
                  className={`h-4.5 w-4.5 ${isActive ? 'text-sandstone' : 'text-slate-400'}`}
                  style={{
                    width: 18,
                    height: 18
                  }}
                  aria-hidden="true" />
                
                    {item.label}
                  </>
              }
              </NavLink>
            )}
          </nav>
        </aside>

        {menuOpen &&
        <div
          className="fixed inset-0 top-[68px] z-10 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true" />

        }

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>);

}