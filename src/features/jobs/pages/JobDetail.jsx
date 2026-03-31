import React, { useState } from 'react';
import { ChevronLeft, Users, CheckCircle, BarChart3, Award, Settings } from '../../../icons';
import Md from '../../../components/Md';
import CandidatesTable from '../components/CandidatesTable';

export default function JobDetail({ job, go }) {
  const [tab, setTab] = useState('candidates');
  const [query, setQuery] = useState('');
  if (!job) return null;

  const statDefs = [
    { i: <Users size={24} className="text-red-500" />, v: job.candidates.length, l: "Total Applicants", b: "bg-red-50" },
    { i: <CheckCircle size={24} className="text-green-500" />, v: job.candidates.filter(c => c.status === 'Completed').length, l: "Completed", b: "bg-green-50" },
    { i: <BarChart3 size={24} className="text-blue-500" />, v: job.candidates.filter(c => c.score >= 70).length, l: "Passed Criteria", b: "bg-blue-50" },
    { i: <Award size={24} className="text-amber-500" />, v: job.shortlisted, l: "Shortlisted", b: "bg-amber-50" },
  ];

  return (
    <div className="p-8 anim">
      <button onClick={() => go('jobs-active')} className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1">
        <ChevronLeft size={16} /> Back to Jobs
      </button>

      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
      <div className="flex items-center gap-2 mb-6">
        {[job.location, job.mode, job.level].map(t => (
          <span key={t} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">{t}</span>
        ))}
        <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">Accepting Applications</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statDefs.map((s, idx) => (
          <div key={idx} className={`${s.b} rounded-2xl p-5`}>
            {s.i}
            <p className="text-3xl font-extrabold text-gray-900 mt-2">{s.v}</p>
            <p className="text-sm text-gray-600 font-medium">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex border-b border-gray-100">
          {['candidates', 'description', 'assessment', 'settings'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3.5 text-sm font-semibold capitalize ${tab === t ? 'text-gray-900 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {t === 'description' ? 'Job Description' : t}
            </button>
          ))}
        </div>

        {tab === 'candidates' && <CandidatesTable query={query} setQuery={setQuery} candidates={job.candidates} />}
        {tab === 'description' && <div className="p-8"><Md text={job.description} /></div>}
        {tab === 'assessment' && (
          <div className="p-8">
            {job.assessment
              ? <Md text={job.assessment} />
              : (
                <div className="text-center text-gray-400 py-16">
                  <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No assessment yet</p>
                  <p className="text-sm mt-1">Create one via "Create Job with Rex"</p>
                </div>
              )}
          </div>
        )}
        {tab === 'settings' && (
          <div className="p-8 text-center text-gray-400 py-20">
            <Settings size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Job settings coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
``