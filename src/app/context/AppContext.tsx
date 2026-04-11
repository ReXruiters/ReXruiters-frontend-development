import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Candidate, JobStatus, CandidateStatus } from '@/app/types';

interface AppContextType {
  jobs: Job[];
  candidates: Candidate[];
  createJob: (job: Omit<Job, 'id' | 'createdAt' | 'status' | 'acceptingApplications'>) => Job;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
  getCandidatesByJobId: (jobId: string) => Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedAt'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    level: 'Senior',
    location: 'Bangalore',
    workMode: 'Hybrid',
    mustHaveSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    niceToHaveSkills: ['Node.js', 'GraphQL'],
    responsibilities: [
      'Build scalable frontend architectures',
      'Mentor junior developers',
      'Collaborate with design team'
    ],
    experienceRange: { min: 5, max: 8 },
    salaryRange: { min: 1800000, max: 2500000 },
    status: 'Published',
    acceptingApplications: true,
    createdAt: new Date('2026-01-20'),
    selectedJDVersion: 'Startup',
    publicLink: 'apply/senior-frontend-developer-1',
    selectedJD: `We're looking for a Senior Frontend Developer who loves building beautiful, performant web applications. You'll work with React, TypeScript, and modern tools to create experiences users love. Join our fast-growing team and help shape the future of our product.`,
  },
  {
    id: '2',
    title: 'Product Designer',
    level: 'Mid',
    location: 'Mumbai',
    workMode: 'Remote',
    mustHaveSkills: ['Figma', 'UI/UX Design', 'Prototyping'],
    niceToHaveSkills: ['Motion Design', 'HTML/CSS'],
    responsibilities: [
      'Design user-centered interfaces',
      'Create design systems',
      'Conduct user research'
    ],
    experienceRange: { min: 3, max: 5 },
    status: 'Published',
    acceptingApplications: true,
    createdAt: new Date('2026-01-25'),
    selectedJDVersion: 'Skills-first',
    publicLink: 'apply/product-designer-2',
    selectedJD: `As a Product Designer, you'll craft intuitive interfaces that delight users. Your skills in Figma and prototyping will help bring ideas to life. We value designers who think critically about user problems and create elegant solutions.`,
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    jobId: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore',
    currentCTC: 1500000,
    expectedCTC: 2000000,
    noticePeriod: '30 days',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    workHistory: [
      { company: 'Tech Corp', role: 'Frontend Developer', duration: '3 years' }
    ],
    assessmentScore: 87,
    profileFitScore: 92,
    reliabilityScore: 95,
    hireabilityScore: 89,
    status: 'Completed',
    appliedAt: new Date('2026-01-22'),
    assessmentCompletedAt: new Date('2026-01-22')
  },
  {
    id: '2',
    jobId: '1',
    name: 'Rahul Verma',
    email: 'rahul.verma@email.com',
    phone: '+91 98765 43211',
    location: 'Delhi',
    currentCTC: 1600000,
    expectedCTC: 2200000,
    noticePeriod: '60 days',
    skills: ['React', 'JavaScript', 'Redux', 'CSS'],
    workHistory: [
      { company: 'Startup Inc', role: 'Senior Developer', duration: '4 years' }
    ],
    assessmentScore: 78,
    profileFitScore: 85,
    reliabilityScore: 88,
    hireabilityScore: 81,
    status: 'Completed',
    appliedAt: new Date('2026-01-23'),
    assessmentCompletedAt: new Date('2026-01-23')
  },
  {
    id: '3',
    jobId: '1',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@email.com',
    phone: '+91 98765 43212',
    location: 'Bangalore',
    currentCTC: 1800000,
    expectedCTC: 2400000,
    noticePeriod: '15 days',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'],
    workHistory: [
      { company: 'Product Co', role: 'Lead Developer', duration: '5 years' }
    ],
    assessmentScore: 94,
    profileFitScore: 96,
    reliabilityScore: 98,
    hireabilityScore: 95,
    status: 'Shortlisted',
    appliedAt: new Date('2026-01-24'),
    assessmentCompletedAt: new Date('2026-01-24')
  },
  {
    id: '4',
    jobId: '2',
    name: 'Arjun Malhotra',
    email: 'arjun.m@email.com',
    phone: '+91 98765 43213',
    location: 'Mumbai',
    currentCTC: 1200000,
    expectedCTC: 1600000,
    noticePeriod: '30 days',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
    workHistory: [
      { company: 'Design Studio', role: 'Product Designer', duration: '3 years' }
    ],
    assessmentScore: 85,
    profileFitScore: 88,
    reliabilityScore: 90,
    hireabilityScore: 86,
    status: 'Completed',
    appliedAt: new Date('2026-01-26'),
    assessmentCompletedAt: new Date('2026-01-26')
  },
  {
    id: '5',
    jobId: '1',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@email.com',
    phone: '+91 98765 43214',
    location: 'Pune',
    currentCTC: 1400000,
    expectedCTC: 1900000,
    noticePeriod: '45 days',
    skills: ['React', 'Vue.js', 'JavaScript'],
    workHistory: [
      { company: 'Tech Solutions', role: 'Frontend Developer', duration: '2 years' }
    ],
    assessmentScore: 72,
    profileFitScore: 75,
    reliabilityScore: 82,
    hireabilityScore: 74,
    status: 'Completed',
    appliedAt: new Date('2026-01-25'),
    assessmentCompletedAt: new Date('2026-01-25')
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const createJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'status' | 'acceptingApplications'>): Job => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'Draft',
      acceptingApplications: false
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, ...updates } : job));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getCandidatesByJobId = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobId === jobId);
  };

  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'appliedAt'>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: Date.now().toString(),
      appliedAt: new Date()
    };
    setCandidates(prev => [...prev, newCandidate]);
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === id ? { ...candidate, ...updates } : candidate
    ));
  };

  return (
    <AppContext.Provider value={{
      jobs,
      candidates,
      createJob,
      updateJob,
      deleteJob,
      getJobById,
      getCandidatesByJobId,
      addCandidate,
      updateCandidate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
