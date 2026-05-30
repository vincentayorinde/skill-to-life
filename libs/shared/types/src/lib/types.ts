export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type CareerCategory =
  | 'development'
  | 'security'
  | 'data-ai'
  | 'design-product'
  | 'writing-qa';

export interface ResourceLink {
  title: string;
  url?: string;
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
