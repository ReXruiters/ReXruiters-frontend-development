import React, { useState } from 'react';
import { Home, Briefcase, ChevronDown, ChevronRight, ChevronLeft, Activity, User, Settings, Plus } from '../icons';

export default function Sidebar({ page, go, collapsed, setCollapsed }) {
  const [jobsOpen, setJobsOpen] = useState(true);

  const Item = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
        active ? 'text-red-600 font-semibold bg-red-50' : 'text-gray-600 hover:bg-gray-50'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 flex flex-col z-30 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-50">
        {!collapsed && <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 22 }}>Re<span style={{ color: '#dc2626' }}>X</span>ruiters</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-gray-50 rounded-lg">
          {collapsed ? <ChevronRight size={18} className="text-gray-400" /> : <ChevronLeft size={18} className="text-gray-400" />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <Item icon={<Home size={19} />} label="Home" active={page === 'home'} onClick={() => go('home')} />

        <button
          onClick={() => go('create-job')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white font-semibold text-sm ${collapsed ? 'justify-center' : ''}`}
          style={{ background: 'linear-gradient(135deg,#dc2626,#ef4444)' }}
        >
          <Plus size={18} /> {!collapsed && <span>Create Job</span>}
        </button>

        <div className="pt-1">
          <button
            onClick={() => setJobsOpen(!jobsOpen)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm hover:bg-gray-50 ${
              page.startsWith('jobs') ? 'text-red-600 font-semibold bg-red-50' : 'text-gray-600'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Briefcase size={19} />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Jobs</span>
                <ChevronDown size={15} className={`transition-transform ${jobsOpen ? '' : '-rotate-90'}`} />
              </>
            )}
          </button>
          {jobsOpen && !collapsed && (
            <div className="ml-9 space-y-0.5 mt-0.5">
              <button
                onClick={() => go('jobs-active')}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                  page === 'jobs-active' ? 'text-red-600 font-medium bg-red-50/60' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Active Jobs
              </button>
              <button
                onClick={() => go('jobs-drafts')}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                  page === 'jobs-drafts' ? 'text-red-600 font-medium bg-red-50/60' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Drafts
              </button>
            </div>
          )}
        </div>

        <Item icon={<Activity size={19} />} label="Admin Panel" active={page === 'admin'} onClick={() => go('admin')} />
        <Item icon={<User size={19} />} label="Profile" active={page === 'profile'} onClick={() => go('profile')} />
        <Item icon={<Settings size={19} />} label="Settings" active={page === 'settings'} onClick={() => go('settings')} />
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AC</div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">Acme Corp</p>
              <p className="text-xs text-gray-400 truncate">admin@acme.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}