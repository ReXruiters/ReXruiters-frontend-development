export type JobLevel = 'Intern' | 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type JobStatus = 'Draft' | 'Published' | 'Closed';
export type CandidateStatus = 'Applied' | 'Incomplete' | 'Completed' | 'Shortlisted' | 'Rejected';
export type AssessmentType = 'Short' | 'Standard';
export type JDVersion = 'Formal' | 'Startup' | 'Skills-first';

export interface Job {
  id: string;
  title: string;
  level: JobLevel;
  location: string;
  workMode: WorkMode;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  experienceRange: { min: number; max: number };
  salaryRange?: { min: number; max: number };
  noticePeriod?: string;
  successCriteria?: string;
  status: JobStatus;
  acceptingApplications: boolean;
  createdAt: Date;
  selectedJD?: string;
  selectedJDVersion?: JDVersion;
  selectedAssessment?: Assessment;
  publicLink?: string;
  assessmentGenerationStatus?: 'not-started' | 'in-progress' | 'completed';
}

export interface Assessment {
  type: AssessmentType;
  duration: number; // in minutes
  skillsTested: string[];
  questionCount: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'coding';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentCTC?: number;
  expectedCTC?: number;
  noticePeriod?: string;
  experienceSummary?: string;
  skills: string[];
  workHistory: WorkHistoryEntry[];
  education?: string;
  resumeUrl?: string;
  assessmentScore: number;
  profileFitScore: number;
  reliabilityScore: number;
  hireabilityScore: number;
  status: CandidateStatus;
  appliedAt: Date;
  assessmentAnswers?: AssessmentAnswer[];
  assessmentCompletedAt?: Date;
}

export interface WorkHistoryEntry {
  company: string;
  role: string;
  duration: string;
  description?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string | number;
  timeSpent: number; // in seconds
}

export interface CandidateReport {
  candidate: Candidate;
  strengths: string[];
  riskAreas: string[];
  skillGaps: string[];
  recommendedQuestions: string[];
  interpretation: string;
}
