import React, { useState } from 'react';
import { Candidate, Job } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Download, Mail, Phone, MapPin, Briefcase, Award, AlertTriangle, TrendingDown, MessageSquare, CheckCircle, Calendar as CalendarIcon, XCircle, FileText } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Calendar } from '@/app/components/ui/calendar';
import { toast } from 'sonner';
import { useApp } from '@/app/context/AppContext';

interface CandidateReportProps {
  candidate: Candidate;
  job: Job;
  onBack: () => void;
}

export const CandidateReport: React.FC<CandidateReportProps> = ({ candidate, job, onBack }) => {
  const { updateCandidate } = useApp();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleScheduleInterview = () => {
    setShowScheduleModal(true);
  };

  const confirmSchedule = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    toast.success(`Interview scheduled for ${selectedDate.toLocaleDateString()}`);
    setShowScheduleModal(false);
    setSelectedDate(undefined);
  };

  const handleShortlist = () => {
    updateCandidate(candidate.id, { status: 'Shortlisted' });
    toast.success('Candidate shortlisted!');
  };

  const handleReject = () => {
    updateCandidate(candidate.id, { status: 'Rejected' });
    toast.success('Candidate rejected');
  };

  const handleDownloadCV = () => {
    toast.success(`Downloading CV for ${candidate.name}`);
  };

  const handleDownloadReport = () => {
    toast.success(`Downloading assessment report for ${candidate.name}`);
  };

  // Generate strengths based on scores
  const strengths: string[] = [];
  if (candidate.assessmentScore >= 85) strengths.push('Excellent technical assessment performance');
  if (candidate.profileFitScore >= 90) strengths.push('Strong skill match with job requirements');
  if (candidate.reliabilityScore >= 90) strengths.push('High attention to detail and completion rate');
  if (candidate.skills.some(s => job.mustHaveSkills.includes(s))) {
    strengths.push(`Proficient in required skills: ${candidate.skills.filter(s => job.mustHaveSkills.includes(s)).join(', ')}`);
  }
  if (candidate.noticePeriod && parseInt(candidate.noticePeriod) <= 30) {
    strengths.push('Short notice period - can join quickly');
  }

  // Generate risk areas
  const riskAreas: string[] = [];
  if (candidate.assessmentScore < 70) riskAreas.push('Below-average technical assessment score');
  if (candidate.expectedCTC && candidate.currentCTC && candidate.expectedCTC > candidate.currentCTC * 1.5) {
    riskAreas.push('Significant salary expectation increase');
  }
  if (candidate.location !== job.location && job.workMode === 'On-site') {
    riskAreas.push('Location mismatch with on-site requirement');
  }

  // Generate skill gaps
  const skillGaps = job.mustHaveSkills.filter(skill => !candidate.skills.includes(skill));

  // Generate recommended questions
  const recommendedQuestions = [
    `Can you walk me through a challenging project where you used ${candidate.skills[0] || 'your primary skill'}?`,
    `How do you approach ${job.responsibilities[0]?.toLowerCase() || 'problem-solving in your role'}?`,
    `Tell me about a time you had to learn a new technology quickly. How did you approach it?`,
    skillGaps.length > 0 ? `We noticed ${skillGaps[0]} is a key requirement. How would you plan to develop this skill?` : null,
    `What interests you most about this ${job.title} position?`,
    `How do you stay updated with the latest developments in ${candidate.skills[0] || 'your field'}?`,
    `Describe your ideal team and work environment.`,
    candidate.noticePeriod ? `You mentioned a ${candidate.noticePeriod} notice period. Is there flexibility if we need you to start sooner?` : null
  ].filter(Boolean) as string[];

  const getInterpretation = (score: number): string => {
    if (score >= 80) {
      return `${candidate.name} is a strong candidate for this position. Their technical skills, experience, and profile alignment make them an excellent fit. We recommend moving forward with an interview to assess cultural fit and discuss specific project requirements.`;
    } else if (score >= 60) {
      return `${candidate.name} shows potential for this role. While there are some areas that need further evaluation, their core competencies align with the position requirements. An interview would help determine if they can address the identified gaps and succeed in this role.`;
    } else {
      return `${candidate.name} may not be the best fit for this position at this time. Their assessment results and profile indicate significant gaps in key areas. Consider whether additional training or a different role might be more suitable.`;
    }
  };

  const downloadPDF = () => {
    // In a real app, this would generate a PDF
    alert('PDF download would be triggered here. This is a demo.');
  };

  const hireabilityLabel = candidate.hireabilityScore >= 80 ? 'Strong Fit' : 
                          candidate.hireabilityScore >= 60 ? 'Potential Fit' : 'Weak Fit';
  const hireabilityColor = candidate.hireabilityScore >= 80 ? 'text-green-600' : 
                          candidate.hireabilityScore >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Candidates
          </Button>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
              <p className="text-gray-600">Candidate Report for {job.title}</p>
            </div>
            <Button onClick={downloadPDF} size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Action Buttons */}
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-gray-50 to-white">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleScheduleInterview}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                {candidate.status !== 'Shortlisted' && (
                  <Button 
                    onClick={handleShortlist}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Shortlist Candidate
                  </Button>
                )}
                {candidate.status !== 'Rejected' && (
                  <Button 
                    onClick={handleReject}
                    variant="destructive"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Candidate
                  </Button>
                )}
                <Button 
                  onClick={handleDownloadCV}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                <Button 
                  onClick={handleDownloadReport}
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Assessment Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidate Snapshot */}
        <Card className="border-0 shadow-xl rounded-2xl mb-6">
          <CardHeader>
            <CardTitle>Candidate Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{candidate.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{candidate.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{candidate.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Notice Period</p>
                    <p className="font-semibold text-gray-900">{candidate.noticePeriod || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current CTC</p>
                    <p className="font-semibold text-gray-900">
                      {candidate.currentCTC ? `₹${(candidate.currentCTC / 100000).toFixed(1)}L` : 'Not disclosed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Expected CTC</p>
                    <p className="font-semibold text-gray-900">
                      {candidate.expectedCTC ? `₹${(candidate.expectedCTC / 100000).toFixed(1)}L` : 'Not disclosed'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => {
                  const isRequired = job.mustHaveSkills.includes(skill);
                  return (
                    <Badge 
                      key={skill} 
                      variant={isRequired ? 'default' : 'secondary'}
                      className={isRequired ? 'bg-red-600' : ''}
                    >
                      {skill} {isRequired && '✓'}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Work History</p>
              <div className="space-y-2">
                {candidate.workHistory.map((work, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">{work.role}</p>
                    <p className="text-sm text-gray-600">{work.company} • {work.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="border-0 shadow-xl rounded-2xl mb-6">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2">Overall Hireability Score</p>
              <h2 className={`text-6xl font-bold ${hireabilityColor} mb-2`}>
                {candidate.hireabilityScore}
              </h2>
              <Badge className="text-lg px-4 py-1">{hireabilityLabel}</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Assessment Score (65% weight)</span>
                  <span className="text-sm font-bold text-gray-900">{candidate.assessmentScore}/100</span>
                </div>
                <Progress value={candidate.assessmentScore} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Profile Fit Score (30% weight)</span>
                  <span className="text-sm font-bold text-gray-900">{candidate.profileFitScore}/100</span>
                </div>
                <Progress value={candidate.profileFitScore} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Reliability Score (5% weight)</span>
                  <span className="text-sm font-bold text-gray-900">{candidate.reliabilityScore}/100</span>
                </div>
                <Progress value={candidate.reliabilityScore} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Risks */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <p className="text-gray-700">{strength}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Risk Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {riskAreas.length > 0 ? (
                <ul className="space-y-3">
                  {riskAreas.map((risk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{risk}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No significant risk areas identified</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Skill Gaps */}
        {skillGaps.length > 0 && (
          <Card className="border-0 shadow-xl rounded-2xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Skill Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">The following required skills were not found in the candidate's profile:</p>
              <div className="flex flex-wrap gap-2">
                {skillGaps.map(skill => (
                  <Badge key={skill} variant="destructive">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Questions */}
        <Card className="border-0 shadow-xl rounded-2xl mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              Recommended Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recommendedQuestions.slice(0, 8).map((question, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{question}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Final Interpretation */}
        <Card className="border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Final Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-6">
              <p className="text-gray-800 leading-relaxed">{getInterpretation(candidate.hireabilityScore)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Interview Modal */}
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview with {candidate.name}</DialogTitle>
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
