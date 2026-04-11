import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useNavigate } from 'react-router';
import { Briefcase, MapPin, Users, Calendar, Eye, Trash2, FileText } from 'lucide-react';

export const Jobs: React.FC = () => {
  const { jobs, candidates, deleteJob } = useApp();
  const navigate = useNavigate();

  const activeJobs = jobs.filter(job => job.status === 'Published');
  const draftJobs = jobs.filter(job => job.status === 'Draft');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  const JobCard: React.FC<{ job: any; isDraft?: boolean }> = ({ job, isDraft = false }) => {
    const jobCandidates = candidates.filter(c => c.jobId === job.id);
    const shortlistedCount = jobCandidates.filter(c => c.status === 'Shortlisted').length;

    return (
      <Card 
        className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer"
        onClick={() => navigate(`/job/${job.id}`)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.level} Level</p>
                </div>
              </div>
            </div>
            <Badge 
              className={isDraft ? 'bg-gray-600' : 'bg-green-600'}
            >
              {job.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </Badge>
            <Badge variant="secondary">{job.workMode}</Badge>
            <Badge variant="secondary">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(job.createdAt)}
            </Badge>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
            <div className="flex flex-wrap gap-2">
              {job.mustHaveSkills.slice(0, 4).map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.mustHaveSkills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.mustHaveSkills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {!isDraft && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-900">{jobCandidates.length}</span>
                  <span className="text-gray-600">applicants</span>
                </div>
                {shortlistedCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="font-semibold text-gray-900">{shortlistedCount}</span>
                    <span className="text-gray-600">shortlisted</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/job/${job.id}`);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => handleDelete(job.id, e)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {isDraft && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/create-job?draft=${job.id}`);
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Continue Editing
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => handleDelete(job.id, e)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              Active Jobs ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Jobs</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't published any jobs yet. Create your first job to start receiving applications.
                  </p>
                  <Button onClick={() => navigate('/create-job')}>
                    Create Job
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="drafts">
            {draftJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {draftJobs.map(job => (
                  <JobCard key={job.id} job={job} isDraft />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Drafts</h3>
                  <p className="text-gray-600">
                    You don't have any draft jobs. Drafts are automatically saved when you start creating a job.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
