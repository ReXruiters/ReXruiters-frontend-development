import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Clock, Target, Award } from 'lucide-react';

export const Insights: React.FC = () => {
  const { jobs, candidates } = useApp();

  // Hireability Distribution
  const hireabilityData = [
    { name: 'Strong Fit (80-100)', value: candidates.filter(c => c.hireabilityScore >= 80).length, color: '#10b981' },
    { name: 'Potential Fit (60-79)', value: candidates.filter(c => c.hireabilityScore >= 60 && c.hireabilityScore < 80).length, color: '#f59e0b' },
    { name: 'Weak Fit (0-59)', value: candidates.filter(c => c.hireabilityScore < 60).length, color: '#ef4444' }
  ];

  // Strong vs Weak Fit Ratio
  const strongFit = candidates.filter(c => c.hireabilityScore >= 80).length;
  const weakFit = candidates.filter(c => c.hireabilityScore < 60).length;
  const fitRatio = weakFit > 0 ? (strongFit / weakFit).toFixed(2) : strongFit;

  // Average Time to Shortlist (mock data based on applied date)
  const avgTimeToShortlist = candidates
    .filter(c => c.status === 'Shortlisted')
    .reduce((sum, c) => {
      const appliedDate = new Date(c.appliedAt);
      const now = new Date();
      const days = Math.floor((now.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0) / (candidates.filter(c => c.status === 'Shortlisted').length || 1);

  // Role-wise trends
  const roleTrends = jobs.map(job => {
    const jobCandidates = candidates.filter(c => c.jobId === job.id);
    const avgScore = jobCandidates.length > 0
      ? jobCandidates.reduce((sum, c) => sum + c.hireabilityScore, 0) / jobCandidates.length
      : 0;
    return {
      role: job.title.length > 20 ? job.title.substring(0, 20) + '...' : job.title,
      applicants: jobCandidates.length,
      avgScore: Math.round(avgScore),
      shortlisted: jobCandidates.filter(c => c.status === 'Shortlisted').length
    };
  });

  // Score breakdown radar chart
  const scoreBreakdown = [
    {
      category: 'Assessment',
      average: Math.round(candidates.reduce((sum, c) => sum + c.assessmentScore, 0) / candidates.length)
    },
    {
      category: 'Profile Fit',
      average: Math.round(candidates.reduce((sum, c) => sum + c.profileFitScore, 0) / candidates.length)
    },
    {
      category: 'Reliability',
      average: Math.round(candidates.reduce((sum, c) => sum + c.reliabilityScore, 0) / candidates.length)
    }
  ];

  // Application timeline (last 7 days)
  const timelineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Mock applications per day
    const applicationsCount = Math.floor(Math.random() * 5) + 1;
    
    return {
      day: dayName,
      applications: applicationsCount
    };
  });

  // Skills in demand
  const skillsMap: Record<string, number> = {};
  jobs.forEach(job => {
    job.mustHaveSkills.forEach(skill => {
      skillsMap[skill] = (skillsMap[skill] || 0) + 1;
    });
  });
  const topSkills = Object.entries(skillsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill, count]) => ({ skill, count }));

  // Completion rate
  const completionRate = (
    (candidates.filter(c => c.status === 'Completed' || c.status === 'Shortlisted').length / candidates.length) * 100
  ).toFixed(0);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-bold">{fitRatio}:1</h3>
              <p className="text-red-50 text-sm">Strong to Weak Fit Ratio</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 opacity-80" />
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-bold">{avgTimeToShortlist.toFixed(1)}</h3>
              <p className="text-blue-100 text-sm">Avg Days to Shortlist</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-bold">{completionRate}%</h3>
              <p className="text-green-100 text-sm">Assessment Completion</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-bold">
                {Math.round(candidates.reduce((sum, c) => sum + c.hireabilityScore, 0) / candidates.length)}
              </h3>
              <p className="text-orange-100 text-sm">Avg Hireability Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hireability Distribution */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Hireability Distribution</CardTitle>
              <p className="text-sm text-gray-600">Candidate quality breakdown</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={hireabilityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => 
                      `${value} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {hireabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                {hireabilityData.map(item => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <p className="text-sm text-gray-600">Last 7 days activity</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#9333ea" 
                    strokeWidth={3}
                    dot={{ fill: '#9333ea', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role-wise Trends */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Role-wise Performance</CardTitle>
              <p className="text-sm text-gray-600">Applicants and average scores by role</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roleTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="applicants" fill="#3b82f6" name="Applicants" />
                  <Bar yAxisId="right" dataKey="avgScore" fill="#10b981" name="Avg Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
              <p className="text-sm text-gray-600">Average performance across criteria</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={scoreBreakdown}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Average Score" 
                    dataKey="average" 
                    stroke="#9333ea" 
                    fill="#9333ea" 
                    fillOpacity={0.6} 
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Skills & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills in Demand */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
              <p className="text-sm text-gray-600">Most requested skills across jobs</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSkills.map((item, index) => (
                  <div key={item.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-red-600">#{index + 1}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{item.skill}</span>
                      </div>
                      <Badge variant="secondary">{item.count} jobs</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${(item.count / jobs.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <p className="text-sm text-gray-600">Actionable recommendations</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {strongFit > weakFit && (
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">High Quality Pipeline</p>
                    <p className="text-sm text-gray-600">
                      You're attracting strong candidates! {strongFit} candidates scored 80+.
                    </p>
                  </div>
                </div>
              )}

              {avgTimeToShortlist < 3 && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast Review Process</p>
                    <p className="text-sm text-gray-600">
                      Your average shortlisting time of {avgTimeToShortlist.toFixed(1)} days is excellent!
                    </p>
                  </div>
                </div>
              )}

              {parseInt(completionRate) > 80 && (
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Great Engagement</p>
                    <p className="text-sm text-gray-600">
                      {completionRate}% assessment completion rate shows strong candidate interest.
                    </p>
                  </div>
                </div>
              )}

              {roleTrends.length > 0 && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Top Role</p>
                    <p className="text-sm text-gray-600">
                      "{roleTrends[0].role}" has the most applicants ({roleTrends[0].applicants}).
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
