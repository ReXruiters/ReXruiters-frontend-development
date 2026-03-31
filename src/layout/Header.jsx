import React from 'react';
import { Bell, Plus } from '../icons';

export default function Header({ page, go }) {
  return (
    
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-100 sticky top-0 z-20">
      <h2 className="text-lg font-bold text-gray-800">Hello Acme Corp</h2>
      <div className="flex items-center gap-4">
        {(page === 'home' || page === 'jobs-active') && (
          <button
            onClick={() => go('create-job')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-md"
            style={{ background: 'linear-gradient(135deg,#dc2626,#ef4444)' }}
          >
            <Plus size={16} /> Create Job
          </button>
        )}
        <button className="relative p-2 hover:bg-gray-50 rounded-xl">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white shadow-sm" />
      </div>
    </header>
  );
}