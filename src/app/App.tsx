import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from '@/app/context/AppContext';
import { DashboardLayout } from '@/app/components/DashboardLayout';
import { EmployerDashboard } from '@/app/components/EmployerDashboard';
import { CreateJob } from '@/app/components/CreateJob';
import { Jobs } from '@/app/components/Jobs';
import { JobDashboard } from '@/app/components/JobDashboard';
import { EmployerProfile } from '@/app/components/EmployerProfile';
import { Settings } from '@/app/components/Settings';
import { AdminPanel } from '@/app/components/AdminPanel';
import { CandidateApplication } from '@/app/components/CandidateApplication';
import { Login } from '@/app/components/Login';
import { Signup } from '@/app/components/Signup';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Public Routes */}
          <Route path="/apply/:jobId" element={<CandidateApplication />} />
          
          {/* Dashboard Routes with Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<EmployerDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/active" element={<Jobs />} />
            <Route path="/jobs/drafts" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/profile" element={<EmployerProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  );
}
