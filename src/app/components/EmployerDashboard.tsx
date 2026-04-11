import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Plus, Briefcase, Users, UserCheck, UserX, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export const EmployerDashboard: React.FC = () => {
  const { jobs, candidates } = useApp();
  const navigate = useNavigate();

  const activeJobs = jobs.filter(job => job.status === 'Published');
  const totalCandidates = candidates.length;
  const completedCandidates = candidates.filter(c => c.status === 'Completed' || c.status === 'Shortlisted');
  const shortlistedCandidates = candidates.filter(c => c.status === 'Shortlisted');
  const rejectedCandidates = candidates.filter(c => c.status === 'Rejected');

  const canCreateJob = activeJobs.length < 3;

  const recentActivity = [
    { text: 'Ananya Iyer completed assessment', time: '2 hours ago', type: 'success' },
    { text: 'New application for Product Designer', time: '5 hours ago', type: 'info' },
    { text: 'Rahul Verma submitted profile', time: '1 day ago', type: 'info' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          <Button 
            onClick={() => navigate('/create-job')}
            disabled={!canCreateJob}
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Job {!canCreateJob && '(3/3 Active)'}
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Active Jobs - Large Card */}
          <Card className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-red-500 to-red-700 text-white border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="w-12 h-12 opacity-80" />
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {activeJobs.length}/3 Active
                  </span>
                </div>
                <h2 className="text-5xl font-bold mb-2">{activeJobs.length}</h2>
                <p className="text-red-100 text-lg">Active Jobs</p>
              </div>
              <div className="mt-8 space-y-2">
                {activeJobs.map(job => (
                  <div 
                    key={job.id}
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-red-100">
                          {candidates.filter(c => c.jobId === job.id).length} applicants
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total Candidates */}
          <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{totalCandidates}</h2>
              <p className="text-gray-600 mt-1">Total Applications</p>
              <div className="mt-4 text-sm text-green-600 flex items-center">
                <span className="font-semibold">+12%</span>
                <span className="text-gray-500 ml-2">vs last week</span>
              </div>
            </CardContent>
          </Card>

          {/* Shortlisted */}
          <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <UserCheck className="w-10 h-10 text-green-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900">{shortlistedCandidates.length}</h2>
              <p className="text-gray-600 mt-1">Shortlisted</p>
              <div className="mt-4 text-sm text-gray-500">
                {completedCandidates.length} completed assessments
              </div>
            </CardContent>
          </Card>

          {/* Calendar Widget */}
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <Calendar className="w-10 h-10 mb-4 opacity-80" />
              <div className="text-3xl font-bold">Feb 9</div>
              <p className="text-blue-100 mt-1">Monday, 2026</p>
              <div className="mt-4 text-sm">
                <div className="bg-white/20 rounded-lg p-2">
                  📅 3 interviews scheduled
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rejected */}
          <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <UserX className="w-10 h-10 text-red-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900">{rejectedCandidates.length}</h2>
              <p className="text-gray-600 mt-1">Rejected</p>
              <div className="mt-4 text-sm text-gray-500">
                Based on assessment scores
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Jobs</h3>
              <div className="space-y-3">
                {jobs.slice(0, 3).map(job => {
                  const jobCandidates = candidates.filter(c => c.jobId === job.id);
                  return (
                    <div 
                      key={job.id}
                      onClick={() => navigate(`/job/${job.id}`)}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.location} • {job.workMode}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{jobCandidates.length}</p>
                        <p className="text-sm text-gray-600">applicants</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
