import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveIcon, XIcon } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useScreenInit } from '../../useScreenInit';
export function CourtCaseCreate() {
  useScreenInit();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('Civil');
  const [status, setStatus] = useState('Open');
  const [isPublic, setIsPublic] = useState(true);
  const [filedDate, setFiledDate] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    filedDate?: string;
  }>({});
  const [saving, setSaving] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'Case title is required.';
    if (!filedDate) errs.filedDate = 'Filed date is required.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setTimeout(() => navigate('/court/cases'), 600);
  };
  const fieldClass =
  'h-11 w-full rounded-md border border-slate-300 px-3 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20';
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
        {
          label: 'Cases',
          to: '/court/cases'
        },
        {
          label: 'New Case'
        }]
        } />
      
      <h1 className="mb-6 font-serif text-2xl font-semibold text-navy-800">
        Create New Case
      </h1>

      <form
        onSubmit={submit}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        
        <div className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-slate-700">
              
              Case title <span className="text-royal">*</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass} />
            
            {errors.title &&
            <p className="mt-1 text-xs text-royal">{errors.title}</p>
            }
          </div>

          <div>
            <label
              htmlFor="desc"
              className="mb-1 block text-sm font-medium text-slate-700">
              
              Description
            </label>
            <textarea
              id="desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-navy focus:ring-2 focus:ring-navy/20" />
            
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="class"
                className="mb-1 block text-sm font-medium text-slate-700">
                
                Classification
              </label>
              <select
                id="class"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className={fieldClass}>
                
                <option>Civil</option>
                <option>Criminal</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-slate-700">
                
                Initial status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={fieldClass}>
                
                <option>Open</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="filed"
              className="mb-1 block text-sm font-medium text-slate-700">
              
              Filed date <span className="text-royal">*</span>
            </label>
            <input
              id="filed"
              type="date"
              value={filedDate}
              onChange={(e) => setFiledDate(e.target.value)}
              className={fieldClass} />
            
            {errors.filedDate &&
            <p className="mt-1 text-xs text-royal">{errors.filedDate}</p>
            }
          </div>

          <label className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <span>
              <span className="block text-sm font-medium text-slate-700">
                Public case
              </span>
              <span className="block text-xs text-slate-500">
                Visible on the public portal when enabled.
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              onClick={() => setIsPublic((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${isPublic ? 'bg-navy' : 'bg-slate-300'}`}>
              
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${isPublic ? 'left-[22px]' : 'left-0.5'}`} />
              
            </button>
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => navigate('/court/cases')}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            
            <XIcon className="h-4 w-4" /> Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-700 disabled:opacity-60">
            
            <SaveIcon className="h-4 w-4" /> {saving ? 'Saving…' : 'Save case'}
          </button>
        </div>
      </form>
    </div>);

}