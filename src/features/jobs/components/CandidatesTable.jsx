import React from 'react';
import { Search, Upload, Download, MoreVertical } from '../../../icons';

export default function CandidatesTable({ query, setQuery, candidates }) {
  const filtered = candidates.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search candidates..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Upload size={15} /> Upload Candidate
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download size={15} /> Export CSV
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 text-xs uppercase border-b border-gray-100">
            {['Name','Location','Current CTC','Expected CTC','Notice','Score','Hireability','Status',''].map(h => <th key={h} className="pb-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="py-3.5 font-semibold text-gray-800">{c.name}</td>
              <td className="py-3.5 text-gray-600">{c.location}</td>
              <td className="py-3.5 text-gray-600">{c.currentCTC}</td>
              <td className="py-3.5 text-gray-600">{c.expectedCTC}</td>
              <td className="py-3.5 text-gray-600">{c.notice}</td>
              <td className="py-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.score >= 80 ? '#f97316' : '#f59e0b' }} />
                  </div>
                  <span className="font-semibold">{c.score}</span>
                </div>
              </td>
              <td className="py-3.5">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.hireability.includes('Strong') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {c.hireability}
                </span>
              </td>
              <td className="py-3.5">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${c.status === 'Shortlisted' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {c.status}
                </span>
              </td>
              <td className="py-3.5">
                <button className="p-1 hover:bg-gray-100 rounded"><MoreVertical size={16} className="text-gray-400" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}