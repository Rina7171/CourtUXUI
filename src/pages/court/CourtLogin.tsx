import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GavelIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  LockIcon } from
'lucide-react';
import { AngkorMotif } from '../../components/AngkorMotif';
import { useScreenInit } from '../../useScreenInit';
export function CourtLogin() {
  useScreenInit();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both your username and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/court');
    }, 700);
  };
  return (
    <div className="flex min-h-screen w-full bg-slate-100 font-sans">
      {/* Branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy p-12 text-white lg:flex">
        <AngkorMotif className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-[700px] -translate-x-1/2 text-white/[0.05]" />
        <div className="relative flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-sandstone bg-navy-800 text-sandstone-light">
            <GavelIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-khmer text-base font-semibold text-sandstone-light">
              តុលាការក្រុងភ្នំពេញ
            </span>
            <span className="block font-serif text-lg font-semibold">
              Phnom Penh Municipal Court
            </span>
          </span>
        </div>
        <div className="relative">
          <h2 className="font-serif text-3xl font-semibold leading-snug">
            Court Management System
          </h2>
          <p className="mt-3 max-w-md text-navy-100">
            Secure access for court personnel of the Kingdom of Cambodia. Manage
            cases, hearings, documents and dispositions in one official
            registry.
          </p>
        </div>
        <p className="relative font-khmer text-sm text-navy-100">
          ព្រះរាជាណាចក្រកម្ពុជា · ជាតិ សាសនា ព្រះមហាក្សត្រ
        </p>
      </div>

      {/* Login card */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <motion.div
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}
          className="w-full max-w-sm">
          
          <div className="mb-6 text-center lg:hidden">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-sandstone bg-navy text-sandstone-light">
              <GavelIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="font-serif text-xl font-semibold text-navy-800">
              Court Panel
            </h1>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <LockIcon className="h-4 w-4 text-sandstone" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-navy-800">
                Personnel Sign In
              </h2>
            </div>

            {error &&
            <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-royal">
                <AlertCircleIcon
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                aria-hidden="true" />
              
                <span>{error}</span>
              </div>
            }

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium text-slate-700">
                  
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20" />
                
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700">
                  
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="h-11 w-full rounded-md border border-slate-300 px-3 pr-10 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20" />
                  
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600">
                    
                    {showPw ?
                    <EyeOffIcon className="h-4 w-4" /> :

                    <EyeIcon className="h-4 w-4" />
                    }
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center rounded-md bg-navy text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60">
                
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Authorised personnel only · Kingdom of Cambodia Judiciary
          </p>
        </motion.div>
      </div>
    </div>);

}