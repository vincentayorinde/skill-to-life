export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
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

export interface AssessmentQuestion {
  id: number;
  text: string;
  subtitle?: string;
  options: AssessmentOption[];
}

export type MatchTier = 'strong' | 'good' | 'possible';

export interface CareerMatch {
  careerId: string;
  title: string;
  emoji: string;
  score: number;
  percentage: number;
  matchTier: MatchTier;
}

export type CareerCategory =
  | 'development'
  | 'security'
  | 'data-ai'
  | 'design-product'
  | 'writing-qa'
  | 'specialist-advanced';

export interface ResourceLink {
  title: string;
  url?: string;
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
