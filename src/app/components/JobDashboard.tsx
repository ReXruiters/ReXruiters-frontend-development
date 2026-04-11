import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ArrowLeft, Download, MapPin, DollarSign, Clock, Users, CheckCircle, XCircle, FileText, Settings, BarChart3, Eye, Sparkles, Loader2, Check, Search, Upload, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';
import { CandidateReport } from './CandidateReport';
import { toast } from 'sonner';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/app/components/ui/dropdown-menu';
import { Calendar } from '@/app/components/ui/calendar';

export const JobDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, getCandidatesByJobId, updateCandidate } = useApp();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedCandidateForSchedule, setSelectedCandidateForSchedule] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'csv'>('manual');
  const [manualCandidateData, setManualCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    skills: '',
    experience: ''
  });

  const job = getJobById(id!);
  const candidates = getCandidatesByJobId(id!);

  if (!job) {
    return <div>Job not found</div>;
  }

  const completedCandidates = candidates.filter(c => c.status === 'Completed' || c.status === 'Shortlisted' || c.status === 'Rejected');
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const passedCount = candidates.filter(c => c.hireabilityScore >= 60).length;

  const exportToCSV = () => {
    const headers = ['Name', 'Location', 'Current CTC', 'Expected CTC', 'Notice Period', 'Experience', 'Assessment Score', 'Hireability Score', 'Status'];
    const rows = candidates.map(c => [
      c.name,
      c.location,
      c.currentCTC || '',
      c.expectedCTC || '',
      c.noticePeriod || '',
      `${c.workHistory.reduce((sum, w) => sum + parseInt(w.duration), 0)} years`,
      c.assessmentScore,
      c.hireabilityScore,
      c.status
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.title.replace(/\s+/g, '-')}-candidates.csv`;
    a.click();
  };

  const getHireabilityLabel = (score: number) => {
    if (score >= 80) return { label: 'Strong Fit', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { label: 'Potential Fit', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Weak Fit', color: 'bg-red-100 text-red-800' };
  };

  const handleShortlist = (candidateId: string) => {
    updateCandidate(candidateId, { status: 'Shortlisted' });
    toast.success('Candidate shortlisted!');
  };

  const handleReject = (candidateId: string) => {
    updateCandidate(candidateId, { status: 'Rejected' });
    toast.success('Candidate rejected');
  };

  const handleScheduleInterview = (candidateId: string) => {
    setSelectedCandidateForSchedule(candidateId);
    setShowScheduleModal(true);
  };

  const confirmSchedule = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    // In a real app, you would save this to the database
    toast.success(`Interview scheduled for ${selectedDate.toLocaleDateString()}`);
    setShowScheduleModal(false);
    setSelectedDate(undefined);
    setSelectedCandidateForSchedule(null);
  };

  const handleDownloadCV = (candidate: any) => {
    // Mock CV download
    toast.success(`Downloading CV for ${candidate.name}`);
  };

  const handleDownloadReport = (candidate: any) => {
    // Mock report download
    toast.success(`Downloading assessment report for ${candidate.name}`);
  };

  const handleUploadCandidate = () => {
    if (uploadMethod === 'manual') {
      // Validate and add candidate
      if (!manualCandidateData.name || !manualCandidateData.email) {
        toast.error('Name and email are required');
        return;
      }
      // In a real app, you would call addCandidate here
      toast.success('Candidate uploaded successfully!');
      setShowUploadModal(false);
      setManualCandidateData({
        name: '', email: '', phone: '', location: '', 
        currentCTC: '', expectedCTC: '', noticePeriod: '', 
        skills: '', experience: ''
      });
    } else {
      // Handle CSV upload
      toast.success('CSV file uploaded successfully!');
      setShowUploadModal(false);
    }
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCandidateId) {
    const candidate = candidates.find(c => c.id === selectedCandidateId);
    if (candidate) {
      return <CandidateReport candidate={candidate} job={job} onBack={() => setSelectedCandidateId(null)} />;
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </Badge>
                <Badge variant="secondary">{job.workMode}</Badge>
                <Badge variant="secondary">{job.level}</Badge>
                <Badge className={job.acceptingApplications ? 'bg-green-600' : 'bg-gray-600'}>
                  {job.acceptingApplications ? 'Accepting Applications' : 'Closed'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <Users className="w-10 h-10 text-red-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{candidates.length}</h3>
              <p className="text-gray-600 text-sm">Total Applicants</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{completedCandidates.length}</h3>
              <p className="text-gray-600 text-sm">Completed</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <BarChart3 className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{passedCount}</h3>
              <p className="text-gray-600 text-sm">Passed Criteria</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <CheckCircle className="w-10 h-10 text-yellow-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{shortlistedCount}</h3>
              <p className="text-gray-600 text-sm">Shortlisted</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <Tabs defaultValue="candidates" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="jd">Job Description</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* Candidates Tab */}
              <TabsContent value="candidates" className="space-y-4">
                <div className="flex justify-between items-center mb-4 gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button onClick={() => setShowUploadModal(true)} variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Candidate
                    </Button>
                  </div>
                  <Button onClick={exportToCSV} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Current CTC</TableHead>
                        <TableHead>Expected CTC</TableHead>
                        <TableHead>Notice Period</TableHead>
                        <TableHead>Assessment Score</TableHead>
                        <TableHead>Hireability</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCandidates.map(candidate => {
                        const hireability = getHireabilityLabel(candidate.hireabilityScore);
                        return (
                          <TableRow key={candidate.id}>
                            <TableCell className="font-medium">{candidate.name}</TableCell>
                            <TableCell>{candidate.location}</TableCell>
                            <TableCell>
                              {candidate.currentCTC ? `₹${(candidate.currentCTC / 100000).toFixed(1)}L` : '-'}
                            </TableCell>
                            <TableCell>
                              {candidate.expectedCTC ? `₹${(candidate.expectedCTC / 100000).toFixed(1)}L` : '-'}
                            </TableCell>
                            <TableCell>{candidate.noticePeriod || '-'}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                                    style={{ width: `${candidate.assessmentScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold">{candidate.assessmentScore}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={hireability.color}>
                                {candidate.hireabilityScore} - {hireability.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                candidate.status === 'Shortlisted' ? 'default' :
                                candidate.status === 'Rejected' ? 'destructive' :
                                'secondary'
                              }>
                                {candidate.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setSelectedCandidateId(candidate.id)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleScheduleInterview(candidate.id)}>
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    Schedule Interview
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {candidate.status !== 'Shortlisted' && (
                                    <DropdownMenuItem onClick={() => handleShortlist(candidate.id)}>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Shortlist
                                    </DropdownMenuItem>
                                  )}
                                  {candidate.status !== 'Rejected' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleReject(candidate.id)}
                                      className="text-red-600"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDownloadCV(candidate)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download CV
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDownloadReport(candidate)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download Report
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* JD Tab */}
              <TabsContent value="jd">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                    <Badge variant="secondary">{job.selectedJDVersion} Version</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700">
                        {job.selectedJD || 'No job description available'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assessment Tab */}
              <TabsContent value="assessment">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!job.selectedAssessment && !job.assessmentGenerationStatus && (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FileText className="w-10 h-10 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Assessment Yet</h3>
                        <p className="text-gray-600 mb-6">
                          Generate an AI-powered assessment to evaluate candidates for this role
                        </p>
                        <Button
                          onClick={() => {
                            if (job.id) {
                              updateJob(job.id, { assessmentGenerationStatus: 'in-progress' });
                              toast.success('Assessment generation started!');
                            }
                          }}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          size="lg"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Assessment
                        </Button>
                      </div>
                    )}

                    {job.assessmentGenerationStatus === 'in-progress' && !job.selectedAssessment && (
                      <div className="py-8">
                        <div className="max-w-2xl mx-auto">
                          <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Generation in Progress</h3>
                            <p className="text-gray-600">
                              We're creating a customized assessment based on your job requirements. This typically takes 5-10 minutes.
                            </p>
                          </div>

                          {/* Timeline */}
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                                <div className="w-0.5 h-full bg-green-600 mt-2"></div>
                              </div>
                              <div className="pb-8">
                                <h4 className="font-semibold text-gray-900 mb-1">Job Requirements Analyzed</h4>
                                <p className="text-sm text-gray-600">Successfully extracted skills and requirements</p>
                                <p className="text-xs text-gray-500 mt-1">Completed</p>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                                </div>
                                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                              </div>
                              <div className="pb-8">
                                <h4 className="font-semibold text-gray-900 mb-1">Generating Questions</h4>
                                <p className="text-sm text-gray-600">AI is creating relevant assessment questions</p>
                                <p className="text-xs text-blue-600 mt-1">In Progress...</p>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-400 mb-1">Assessment Ready</h4>
                                <p className="text-sm text-gray-500">You'll be notified when complete</p>
                                <p className="text-xs text-gray-400 mt-1">Pending</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> You'll receive a notification once the assessment is ready. You can continue using the platform in the meantime.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {job.selectedAssessment && (
                      <>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 bg-red-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Type</p>
                            <p className="text-xl font-bold text-gray-900">{job.selectedAssessment.type}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Duration</p>
                            <p className="text-xl font-bold text-gray-900">{job.selectedAssessment.duration} min</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl">
                            <p className="text-sm text-gray-600 mb-1">Questions</p>
                            <p className="text-xl font-bold text-gray-900">{job.selectedAssessment.questionCount}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Skills Tested</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.selectedAssessment.skillsTested.map(skill => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">Application Link</p>
                        <p className="text-sm text-gray-600 mt-1">{job.publicLink}</p>
                      </div>
                      <Button variant="outline" onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/${job.publicLink}`);
                      }}>
                        Copy Link
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">Job Status</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {job.acceptingApplications ? 'Accepting applications' : 'Applications closed'}
                        </p>
                      </div>
                      <Button variant="outline">
                        Toggle Status
                      </Button>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Danger Zone</h4>
                      <Button variant="destructive" className="w-full">
                        Delete Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Upload Candidate Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload Candidate</DialogTitle>
              <DialogDescription>
                Add a new candidate manually or upload via CSV file
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Toggle between manual and CSV */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setUploadMethod('manual')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    uploadMethod === 'manual' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setUploadMethod('csv')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    uploadMethod === 'csv' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  CSV Upload
                </button>
              </div>

              {uploadMethod === 'manual' ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={manualCandidateData.name}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={manualCandidateData.email}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={manualCandidateData.phone}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={manualCandidateData.location}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Bangalore"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="currentCTC">Current CTC (₹)</Label>
                      <Input
                        id="currentCTC"
                        type="number"
                        value={manualCandidateData.currentCTC}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, currentCTC: e.target.value }))}
                        placeholder="1500000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedCTC">Expected CTC (₹)</Label>
                      <Input
                        id="expectedCTC"
                        type="number"
                        value={manualCandidateData.expectedCTC}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, expectedCTC: e.target.value }))}
                        placeholder="2000000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="noticePeriod">Notice Period</Label>
                      <Input
                        id="noticePeriod"
                        value={manualCandidateData.noticePeriod}
                        onChange={(e) => setManualCandidateData(prev => ({ ...prev, noticePeriod: e.target.value }))}
                        placeholder="30 days"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      value={manualCandidateData.skills}
                      onChange={(e) => setManualCandidateData(prev => ({ ...prev, skills: e.target.value }))}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Summary</Label>
                    <Textarea
                      id="experience"
                      value={manualCandidateData.experience}
                      onChange={(e) => setManualCandidateData(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="Brief summary of work experience..."
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm font-medium text-gray-900 mb-1">Upload CSV File</p>
                    <p className="text-xs text-gray-600 mb-4">
                      Drag and drop or click to browse
                    </p>
                    <Input
                      type="file"
                      accept=".csv"
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>CSV Format:</strong>
                    </p>
                    <p className="text-xs text-blue-700">
                      Name, Email, Phone, Location, Current CTC, Expected CTC, Notice Period, Skills
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUploadCandidate}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Candidate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Schedule Interview Modal */}
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Select a date and time for the interview
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              {selectedDate && (
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Selected Date:</strong> {selectedDate.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedDate(undefined);
                  setSelectedCandidateForSchedule(null);
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={confirmSchedule}
                  disabled={!selectedDate}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Confirm Interview
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
