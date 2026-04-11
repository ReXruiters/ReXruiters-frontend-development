import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { ArrowRight, CheckCircle, Clock, MapPin, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export const CandidateApplication: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { jobs, addCandidate } = useApp();
  const [step, setStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Find job (mock - in real app would fetch by public link)
  const job = jobs.find(j => j.id === jobId?.split('-').pop());

  // Form state
  const [basicDetails, setBasicDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: ''
  });

  const [profile, setProfile] = useState({
    experienceSummary: '',
    skills: [] as string[],
    workHistory: [{ company: '', role: '', duration: '', description: '' }],
    education: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string>>({});

  // Mock assessment questions
  const assessmentQuestions = [
    {
      id: 1,
      question: 'What is the primary benefit of using React Hooks?',
      type: 'multiple-choice',
      options: [
        'Better performance',
        'Code reusability without class components',
        'Smaller bundle size',
        'Faster rendering'
      ]
    },
    {
      id: 2,
      question: 'Explain the concept of closures in JavaScript.',
      type: 'text'
    },
    {
      id: 3,
      question: 'Which CSS property is used for responsive design?',
      type: 'multiple-choice',
      options: ['display', 'media-query', 'flexbox', 'All of the above']
    },
    {
      id: 4,
      question: 'What is your approach to debugging complex issues?',
      type: 'text'
    },
    {
      id: 5,
      question: 'What does REST stand for?',
      type: 'multiple-choice',
      options: [
        'Representational State Transfer',
        'Remote State Transfer',
        'Resource State Transport',
        'Representational System Transfer'
      ]
    }
  ];

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center p-8">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
            <p className="text-gray-600">This job posting is no longer available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addWorkHistory = () => {
    setProfile(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { company: '', role: '', duration: '', description: '' }]
    }));
  };

  const updateWorkHistory = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      workHistory: prev.workHistory.map((work, i) => 
        i === index ? { ...work, [field]: value } : work
      )
    }));
  };

  const handleBasicDetailsNext = () => {
    if (!basicDetails.name || !basicDetails.email || !basicDetails.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep(1);
  };

  const handleProfileNext = () => {
    if (profile.skills.length === 0 || profile.workHistory[0].company === '') {
      toast.error('Please add at least one skill and work experience');
      return;
    }
    setStep(2);
  };

  const handleStartAssessment = () => {
    // Start timer
    const duration = job.selectedAssessment?.duration || 25;
    setTimeRemaining(duration * 60); // Convert to seconds
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAssessmentSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setStep(3);
  };

  const handleAssessmentSubmit = () => {
    // Calculate mock scores
    const assessmentScore = 75 + Math.floor(Math.random() * 20);
    const profileFitScore = 80 + Math.floor(Math.random() * 15);
    const reliabilityScore = 85 + Math.floor(Math.random() * 15);
    const hireabilityScore = Math.round(
      0.65 * assessmentScore +
      0.30 * profileFitScore +
      0.05 * reliabilityScore
    );

    addCandidate({
      jobId: job.id,
      name: basicDetails.name,
      email: basicDetails.email,
      phone: basicDetails.phone,
      location: basicDetails.location,
      currentCTC: parseInt(basicDetails.currentCTC) || undefined,
      expectedCTC: parseInt(basicDetails.expectedCTC) || undefined,
      noticePeriod: basicDetails.noticePeriod || undefined,
      experienceSummary: profile.experienceSummary,
      skills: profile.skills,
      workHistory: profile.workHistory.filter(w => w.company !== ''),
      education: profile.education || undefined,
      assessmentScore,
      profileFitScore,
      reliabilityScore,
      hireabilityScore,
      status: 'Completed',
      assessmentCompletedAt: new Date()
    });

    setStep(4);
  };

  const progress = ((step + 1) / 5) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Job Landing Page */}
        {step === 0 && (
          <div>
            <Card className="border-0 shadow-xl rounded-2xl mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600">ReXruiters</p>
                  </div>
                  <Badge className="bg-green-600 text-lg px-4 py-2">We're Hiring!</Badge>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.workMode}
                  </Badge>
                  <Badge variant="secondary">{job.level}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-6 rounded-xl">
                    {job.selectedJD}
                  </pre>
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.mustHaveSkills.map(skill => (
                      <Badge key={skill} className="bg-red-600">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setStep(1)} size="lg" className="w-full mt-8">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Application Steps */}
        {step > 0 && step < 4 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              Step {step} of 3
              {step === 3 && timeRemaining > 0 && (
                <span className="ml-4 text-red-600 font-semibold flex items-center gap-1 inline-flex">
                  <Clock className="w-4 h-4" />
                  Time Remaining: {formatTime(timeRemaining)}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Step 1: Basic Details */}
        {step === 1 && (
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={basicDetails.name}
                  onChange={(e) => setBasicDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={basicDetails.email}
                    onChange={(e) => setBasicDetails(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={basicDetails.phone}
                    onChange={(e) => setBasicDetails(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={basicDetails.location}
                  onChange={(e) => setBasicDetails(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Bangalore"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentCTC">Current CTC (₹/year)</Label>
                  <Input
                    id="currentCTC"
                    type="number"
                    value={basicDetails.currentCTC}
                    onChange={(e) => setBasicDetails(prev => ({ ...prev, currentCTC: e.target.value }))}
                    placeholder="1500000"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedCTC">Expected CTC (₹/year)</Label>
                  <Input
                    id="expectedCTC"
                    type="number"
                    value={basicDetails.expectedCTC}
                    onChange={(e) => setBasicDetails(prev => ({ ...prev, expectedCTC: e.target.value }))}
                    placeholder="2000000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Input
                  id="noticePeriod"
                  value={basicDetails.noticePeriod}
                  onChange={(e) => setBasicDetails(prev => ({ ...prev, noticePeriod: e.target.value }))}
                  placeholder="30 days"
                />
              </div>

              <Button onClick={handleBasicDetailsNext} className="w-full" size="lg">
                Next: Profile Builder
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Profile Builder */}
        {step === 2 && (
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>Profile Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="experienceSummary">Experience Summary</Label>
                <Textarea
                  id="experienceSummary"
                  value={profile.experienceSummary}
                  onChange={(e) => setProfile(prev => ({ ...prev, experienceSummary: e.target.value }))}
                  placeholder="Brief summary of your professional experience..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Type a skill and press Enter"
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Work History</Label>
                {profile.workHistory.map((work, index) => (
                  <div key={index} className="space-y-2 mb-4 p-4 border rounded-xl">
                    <Input
                      placeholder="Company Name"
                      value={work.company}
                      onChange={(e) => updateWorkHistory(index, 'company', e.target.value)}
                    />
                    <Input
                      placeholder="Role"
                      value={work.role}
                      onChange={(e) => updateWorkHistory(index, 'role', e.target.value)}
                    />
                    <Input
                      placeholder="Duration (e.g., 2 years)"
                      value={work.duration}
                      onChange={(e) => updateWorkHistory(index, 'duration', e.target.value)}
                    />
                    <Textarea
                      placeholder="Brief description (optional)"
                      value={work.description}
                      onChange={(e) => updateWorkHistory(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addWorkHistory} className="w-full">
                  + Add Another Position
                </Button>
              </div>

              <div>
                <Label htmlFor="education">Education (Optional)</Label>
                <Input
                  id="education"
                  value={profile.education}
                  onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
                  placeholder="e.g., B.Tech Computer Science, XYZ University"
                />
              </div>

              <Button onClick={handleProfileNext} className="w-full" size="lg">
                Next: Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Assessment */}
        {step === 3 && (
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>Assessment</CardTitle>
              <p className="text-sm text-gray-600">
                Answer all questions to the best of your ability. Auto-saves your progress.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-xl">
                  <p className="font-semibold text-gray-900 mb-3">
                    {index + 1}. {q.question}
                  </p>
                  
                  {q.type === 'multiple-choice' ? (
                    <div className="space-y-2">
                      {q.options?.map((option, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={assessmentAnswers[q.id] === option}
                            onChange={(e) => setAssessmentAnswers(prev => ({
                              ...prev,
                              [q.id]: e.target.value
                            }))}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <Textarea
                      value={assessmentAnswers[q.id] || ''}
                      onChange={(e) => setAssessmentAnswers(prev => ({
                        ...prev,
                        [q.id]: e.target.value
                      }))}
                      placeholder="Type your answer here..."
                      rows={4}
                    />
                  )}
                </div>
              ))}

              <Button onClick={handleAssessmentSubmit} className="w-full" size="lg">
                Submit Assessment
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for applying to {job.title}. We've received your application and assessment results.
              </p>

              <div className="bg-red-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✓</span>
                    <span>Our team will review your application within 48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✓</span>
                    <span>Shortlisted candidates will be contacted via email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✓</span>
                    <span>You'll receive updates about your application status</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-500">
                Please check your email ({basicDetails.email}) for updates
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
