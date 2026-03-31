import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import DashboardHome from '../features/dashboard/DashboardHome';
import JobsList from '../features/jobs/pages/JobsList';
import JobDetail from '../features/jobs/pages/JobDetail';
import CreateJobWithRex from '../features/jobs/pages/CreateJobWithRex';
import AdminPanel from '../features/admin/AdminPanel';
import CompanyProfile from '../features/profile/CompanyProfile';
import SettingsPage from '../features/settings/Settings';
import { initialJobs } from '../data/seed';
import { ROUTES } from './routes';

export default function App() {
  const [page, setPage] = useState(ROUTES.HOME);
  const [collapsed, setCollapsed] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [selId, setSelId] = useState(null);

  const selJob = jobs.find(j => j.id === selId);
  const addJob = (j) => setJobs(p => [...p, j]);
  const delJob = (id) => setJobs(p => p.filter(j => j.id !== id));

  const render = () => {
    switch (page) {
      case ROUTES.HOME: return <DashboardHome jobs={jobs} go={setPage} setSel={setSelId} />;
      case ROUTES.JOBS_ACTIVE: case ROUTES.JOBS_DRAFTS: return <JobsList jobs={jobs} go={setPage} setSel={setSelId} delJob={delJob} />;
      case ROUTES.JOB_DETAIL: return <JobDetail job={selJob} go={setPage} />;
      case ROUTES.CREATE_JOB: return <CreateJobWithRex addJob={addJob} go={setPage} />;
      case ROUTES.ADMIN: return <AdminPanel />;
      case ROUTES.PROFILE: return <CompanyProfile />;
      case ROUTES.SETTINGS: return <SettingsPage />;
      default: return <DashboardHome jobs={jobs} go={setPage} setSel={setSelId} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *{font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        .anim{animation:fadeIn .3s ease-out}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#9ca3af}
      `}</style>

      <div className="flex min-h-screen bg-gray-50/50">
        <Sidebar page={page} go={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
          <Header page={page} go={setPage} />
          <main className="overflow-y-auto" style={{ height:'calc(100vh - 64px)' }}>
            {render()}
          </main>
        </div>
      </div>
    </>
  );
}