import React, { useState } from 'react';
import { Briefcase, Eye, Trash2, MapPin, Calendar, Users, CheckCircle, BarChart3 } from '../../../icons';

export default function JobsList({ jobs, go, setSel, delJob }) {
  const [tab, setTab] = useState('active');
  const list = tab === 'active' ? jobs.filter(j => j.status === 'Published') : jobs.filter(j => j.status === 'Draft');

  return (
    <div className="p-8 anim">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setTab('active')} className={`px-5 py-2 rounded-full text-sm font-semibold ${tab === 'active' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Active Jobs ({jobs.filter(j => j.status === 'Published').length})
        </button>
        <button onClick={() => setTab('drafts')} className={`px-5 py-2 rounded-full text-sm font-semibold ${tab === 'drafts' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Drafts ({jobs.filter(j => j.status === 'Draft').length})
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No {tab === 'active' ? 'active jobs' : 'drafts'} yet</p>
          <button onClick={() => go('create-job')} className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold">Create your first job</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {list.map(j => (
            <div key={j.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Briefcase size={18} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-gray-900">{j.title}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${j.status === 'Published' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600'}`}>
                      {j.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{j.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={13} /> {j.location}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{j.mode}</span>
                <span className="flex items-center gap-1"><Calendar size={13} /> {j.date}</span>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1.5">Required Skills:</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Users size={15} /> {j.applicants} applicants</span>
                  {j.shortlisted > 0 && <span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full" />{j.shortlisted} shortlisted</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => { setSel(j.id); go('job-detail'); }} className="p-2 hover:bg-gray-100 rounded-lg"><Eye size={16} className="text-gray-400" /></button>
                  <button onClick={() => delJob(j.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-red-400" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}