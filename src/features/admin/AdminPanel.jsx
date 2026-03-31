import React from 'react';
import { companies } from '../../data/seed';
import { Building2, Briefcase, Mail } from '../../icons';

export default function AdminPanel() {
  const tot = companies.reduce((s, c) => s + c.jobs, 0);

  const stats = [
    { l:"Total Companies", v:companies.length, i:<Building2 size={22} className="text-red-500"/>, b:"bg-red-50" },
    { l:"Total Jobs Created", v:tot, i:<Briefcase size={22} className="text-blue-500"/>, b:"bg-blue-50" },
    { l:"Avg Jobs / Company", v:Math.round(tot/companies.length), i:<Mail size={22} className="text-green-500"/>, b:"bg-green-50" },
  ];

  return (
    <div className="p-8 anim">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of all companies using ReXruiters</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {stats.map((s,i)=>(
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{s.l}</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{s.v}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${s.b} flex items-center justify-center`}>{s.i}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">All Companies</h2>
      <div className="grid grid-cols-3 gap-5">
        {companies.map((c,i)=>(
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center text-white font-bold text-sm`}>{c.initials}</div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{c.name}</p>
                <p className="text-xs text-gray-400 truncate">{c.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Jobs Created</span>
              <span className="text-base font-bold text-gray-900">{c.jobs}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
``