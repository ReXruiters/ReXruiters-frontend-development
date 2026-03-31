import React from 'react';

export default function StatCard({ icon, value, label, trend, up, sub }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-start justify-between">
        {icon}
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-gray-900 mt-3">{value}</p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
