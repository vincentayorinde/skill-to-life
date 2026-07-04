export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  isPublic: boolean;
  username?: string;
  currentRole?: string;
  experienceLevel?: string;
  savedCareers: SavedCareer[];
  savedResources: SavedResource[];
  cvAnalysisCount: number;
}

export interface SavedCareer {
  id: string;
  careerId: string;
  careerTitle: string;
  careerEmoji: string;
  careerSlug: string;
  notes?: string;
  savedAt: string;
}

export interface SavedResource {
  id: string;
  resourceTitle: string;
  resourceUrl: string;
  platform: string;
  careerId?: string;
  careerTitle?: string;
  type: string;
  savedAt: string;
}

export interface CvCareerMatch {
  careerId: string;
  careerTitle: string;
  matchPercentage: number;
  matchReason: string;
  tier: 'strong' | 'good' | 'possible';
}

export interface CvStrength {
  title: string;
  description: string;
}

export interface CvGap {
  title: string;
  description: string;
  impactedCareers: string[];
}

export interface CvImprovement {
  priority: 'high' | 'medium' | 'low';
  action: string;
  detail: string;
  impactScore: number;
}

export interface CvRecommendedCareer {
  careerId: string;
  careerTitle: string;
  whyNow: string;
  timeToReady: string;
  keyGap: string;
}

export interface CvAnalysisResult {
  id: string;
  profileScore: number;
  profileScoreLabel: string;
  topMatches: CvCareerMatch[];
  strengths: CvStrength[];
  gaps: CvGap[];
  improvements: CvImprovement[];
  recommendedCareers: CvRecommendedCareer[];
  summary: string;
  fullAnalysis?: string;
  aiModel: string;
  inputType: string;
  fileName?: string;
  createdAt: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CareerSignal {
  careerId: string;
  weight: number;
}

export interface AssessmentOption {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  signals: CareerSignal[];
}

export interface AssessmentCategory {
  id: number;
  slug: string;
  label: string;
  emoji: string;
  totalQuestions: number;
}

export interface AssessmentQuestion {
  id: number;
  category: AssessmentCategory;
  categoryLabel: string;
  text: string;
  subtitle?: string;
  options: AssessmentOption[];
}

export type MatchTier = 'strong' | 'good' | 'possible';

export interface CategoryBreakdown {
  workStyle: number;
  dayToDay: number;
  problemSolving: number;
  temperament: number;
  softSkills: number;
  careerGoals: number;
}

export interface CareerMatch {
  careerId: string;
  title: string;
  emoji: string;
  score: number;
  percentage: number;
  matchTier: MatchTier;
  categoryBreakdown: CategoryBreakdown;
}

export type CareerCategory =
  | 'development'
  | 'security'
  | 'data-ai'
  | 'design-product'
  | 'writing-qa'
  | 'specialist-advanced';

export interface RoadmapResource {
  title: string;
  url: string;
  type:
    | 'free'
    | 'paid'
    | 'book'
    | 'course'
    | 'video'
    | 'practice'
    | 'community';
  platform: string;
  beginner: boolean;
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  estimatedTime: string;
  resources: RoadmapResource[];
  type: 'foundation' | 'core' | 'practice' | 'advanced' | 'job-ready';
}

export interface CareerRoadmap {
  careerId: string;
  totalEstimatedTime: string;
  steps: RoadmapStep[];
}

export interface CareerResource {
  title: string;
  url: string;
  type: 'course' | 'video' | 'book' | 'practice' | 'community' | 'tool';
  platform: string;
  cost: 'free' | 'paid' | 'freemium';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  recommended: boolean;
  careerId: string;
}

export interface ResourceLink {
  title: string;
  url?: string;
}

// ─── Salary types ──────────────────────────────────────────────────────────

export interface SalaryRange {
  level: 'junior' | 'mid' | 'senior' | 'lead';
  min: number;
  max: number;
  currency: 'GBP' | 'USD' | 'EUR';
  location: string;
}

export interface CareerSalaryData {
  careerId: string;
  lastUpdated: string;
  summary: string;
  ranges: SalaryRange[];
  freelanceRate?: {
    daily: { min: number; max: number; currency: string };
    hourly: { min: number; max: number; currency: string };
  };
  factors: string[];
  regionalNote: string;
  sources: string[];
}

// ─── Entrepreneurship types ────────────────────────────────────────────────

export interface EntrepreneurshipPath {
  title: string;
  description: string;
  difficulty: 'low' | 'medium' | 'high';
  timeToFirstIncome: string;
  potentialIncome: string;
  examples: string[];
  gettingStarted: string[];
}

export interface CareerEntrepreneurshipData {
  careerId: string;
  summary: string;
  paths: EntrepreneurshipPath[];
  successStories: string[];
  tools: string[];
  communities: string[];
}

export interface SavedResult {
  id: string;
  topCareer: string;
  topPercentage: number;
  allMatches: CareerMatch[];
  answers: Record<number, string>;
  anonymous: boolean;
  createdAt: string;
}

export interface CareerPath {
  id: string;
  title: string;
  slug: string;
  emoji: string;
  category: CareerCategory;
  difficultyLevel: DifficultyLevel;
  remoteFriendly: boolean;
  beginnerFriendly: boolean;
  summary: string;
  description: string;
  whoItFits: string;
  skills: string[];
  tools: string[];
  tags: string[];
  learningStyleFit: string;
  starterProjects: string[];
  freeResources: ResourceLink[];
  paidResources: ResourceLink[];
  salaryInsight: string;
  entrepreneurshipIdeas: string[];
  roadmapPreview: string[];
}
