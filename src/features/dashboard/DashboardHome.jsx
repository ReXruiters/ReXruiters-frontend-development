import React from 'react';
import { Briefcase, Calendar, Users, CheckCircle, XCircle, ChevronRight } from '../../icons';
import StatCard from '../../components/StatCard';

export default function DashboardHome({ jobs, go, setSel }) {
  const active = jobs.filter(j => j.status === 'Published');
  const totalApps = jobs.reduce((s, j) => s + j.applicants, 0);
  const totalShort = jobs.reduce((s, j) => s + j.shortlisted, 0);

  return (
    <div className="p-8 space-y-6 anim">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-5 rounded-2xl p-6 text-white overflow-hidden"
             style={{ background: 'linear-gradient(135deg,#dc2626,#ef4444 50%,#f87171)' }}>
          <div className="flex items-start justify-between">
            <Briefcase size={36} className="opacity-80" />
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {active.length}/{jobs.length} Active
            </span>
          </div>

          <div className="mt-6">
            <p className="text-5xl font-extrabold">{active.length}</p>
            <p className="text-white/80 font-medium mt-1">Active Jobs</p>
          </div>

          <div className="mt-6 space-y-2">
            {active.slice(0, 3).map(j => (
              <button
                key={j.id}
                onClick={() => { setSel(j.id); go('job-detail'); }}
                className="w-full flex items-center justify-between bg-white/15 rounded-xl px-4 py-3 hover:bg-white/25 transition-all group"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold">{j.title}</p>
                  <p className="text-xs text-white/70">{j.applicants} applicants</p>
                </div>
                <ChevronRight size={16} className="opacity-60 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-2 gap-5">
          <StatCard icon={<Users size={28} className="text-blue-500" />} value={totalApps} label="Total Applications" trend="+12%" up />
          <StatCard icon={<CheckCircle size={28} className="text-green-500" />} value={totalShort} label="Shortlisted" sub="5 completed assessments" />
          <div className="rounded-2xl p-5 border border-gray-100 bg-gradient-to-br from-sky-50 to-cyan-100">
            <Calendar size={28} className="text-sky-600" />
            <p className="text-3xl font-extrabold text-sky-700 mt-3">Feb 9</p>
            <p className="text-sky-600 text-sm font-medium">Monday, 2026</p>
            <span className="inline-flex items-center gap-1 mt-2 bg-sky-600/20 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
              📅 3 interviews scheduled
            </span>
          </div>
          <StatCard icon={<XCircle size={28} className="text-red-400" />} value={0} label="Rejected" sub="Based on assessment scores" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Jobs</h3>
          {jobs.map(j => (
            <button
              key={j.id}
              onClick={() => { setSel(j.id); go('job-detail'); }}
              className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Briefcase size={18} className="text-red-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-800">{j.title}</p>
                <p className="text-xs text-gray-400">{j.location} · {j.mode}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">{j.applicants}</p>
                <p className="text-xs text-gray-400">applicants</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right panel: recent activity */}
        <RecentActivity />
      </div>
    </div>
  );
}

import { recentActivities } from '../../data/seed';
function RecentActivity() {
  return (
    <div className="col-span-5 bg-white border border-gray-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      {recentActivities.map((a, i) => (
        <div key={i} className="flex items-start gap-3 mb-5">
          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${a.color}`} />
          <div>
            <p className="text-sm text-gray-700 font-medium">{a.text}</p>
            <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}