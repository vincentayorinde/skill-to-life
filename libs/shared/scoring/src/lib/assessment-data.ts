import type { CareerSignal } from 'types';

export const ALL_CAREER_IDS = [
  'frontend-developer',
  'backend-developer',
  'fullstack-developer',
  'cybersecurity-analyst',
  'security-engineer',
  'cloud-engineer',
  'devops-engineer',
  'data-analyst',
  'data-scientist',
  'ai-engineer',
  'product-designer',
  'product-manager',
  'technical-writer',
  'qa-engineer',
  // Specialist & Advanced
  'ethical-hacker',
  'cloud-architect',
  'ml-engineer',
  'blockchain-developer',
  'sre-engineer',
  'platform-engineer',
  'ai-safety-researcher',
  'embedded-systems-engineer',
  'robotics-engineer',
  'cryptography-engineer',
  'reverse-engineer',
  'distributed-systems-engineer',
] as const;

export type CareerIdTuple = typeof ALL_CAREER_IDS;
export type CareerId = CareerIdTuple[number];

function all(weight: number): CareerSignal[] {
  return ALL_CAREER_IDS.map((careerId) => ({ careerId, weight }));
}

// Maps questionIndex (0–9) → optionLabel → CareerSignal[]
// Option labels must match exactly what the assessment component stores in answers.
export const QUESTION_SIGNALS: Record<
  number,
  Record<string, CareerSignal[]>
> = {
  0: {
    // Q1 — Which work sounds most exciting? (weight 4–5)
    'Building apps': [
      { careerId: 'frontend-developer', weight: 5 },
      { careerId: 'fullstack-developer', weight: 5 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'platform-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
    ],
    'Protecting systems': [
      { careerId: 'cybersecurity-analyst', weight: 5 },
      { careerId: 'security-engineer', weight: 5 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 5 },
      { careerId: 'reverse-engineer', weight: 5 },
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'Analysing data': [
      { careerId: 'data-analyst', weight: 5 },
      { careerId: 'data-scientist', weight: 4 },
      { careerId: 'ai-engineer', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ml-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
    ],
    'Designing experiences': [
      { careerId: 'product-designer', weight: 5 },
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'Explaining things': [
      { careerId: 'technical-writer', weight: 5 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'Testing quality': [
      { careerId: 'qa-engineer', weight: 5 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
  },

  1: {
    // Q2 — How do you prefer to learn? (weight 2)
    'Watching and following along': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
    ],
    'Reading and taking notes': [
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
    ],
    'Jumping in and trying it': [
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
    ],
    'Learning with others': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
    ],
  },

  2: {
    // Q3 — How do you feel about writing code? (weight 3)
    'I enjoy it or want to learn': [
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'data-scientist', weight: 2 },
      { careerId: 'ai-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'robotics-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'I am okay with some code': [
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'qa-engineer', weight: 3 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'I would rather avoid it': [
      { careerId: 'product-designer', weight: 3 },
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
    ],
    'I have never tried — not sure yet': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
    ],
  },

  3: {
    // Q4 — What matters most to you in a career? (weight 2)
    'Good earning potential': [
      { careerId: 'ai-engineer', weight: 2 },
      { careerId: 'data-scientist', weight: 2 },
      { careerId: 'security-engineer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
      { careerId: 'cryptography-engineer', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'Remote and flexible work': [
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'reverse-engineer', weight: 2 },
    ],
    'Fast career growth': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ai-engineer', weight: 2 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
    ],
    'Doing work that feels meaningful': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
    ],
    'Building things I am proud of': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
    ],
  },

  4: {
    // Q5 — How do you approach problems? (weight 2)
    'I break them down step by step': [
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'cryptography-engineer', weight: 2 },
      { careerId: 'reverse-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
    ],
    'I look for creative solutions': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'ai-engineer', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'I talk them through with others': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
    ],
    'I try things fast and adjust': [
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
    ],
  },

  5: {
    // Q6 — What kind of environment do you prefer? (weight 1)
    'Fully remote': [
      { careerId: 'technical-writer', weight: 1 },
      { careerId: 'frontend-developer', weight: 1 },
      { careerId: 'devops-engineer', weight: 1 },
    ],
    'In an office with a team': [
      { careerId: 'product-manager', weight: 1 },
      { careerId: 'product-designer', weight: 1 },
    ],
    'A mix of both': all(1),
    'No strong preference': all(1),
  },

  6: {
    // Q7 — How comfortable are you with maths or logic? (weight 2)
    'Very comfortable — I enjoy it': [
      { careerId: 'data-scientist', weight: 2 },
      { careerId: 'ai-engineer', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
    ],
    'Fairly comfortable': [
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'security-engineer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
      { careerId: 'reverse-engineer', weight: 2 },
    ],
    'Not my strength but I can manage': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 1 },
    ],
    'I find it difficult': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
    ],
  },

  7: {
    // Q8 — What sounds like your ideal output at work? (weight 3)
    'A working app or feature': [
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
    ],
    'A report or data insight': [
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
    ],
    'A design or visual': [
      { careerId: 'product-designer', weight: 3 },
      { careerId: 'frontend-developer', weight: 2 },
    ],
    'A document or guide': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'A system that is secure and stable': [
      { careerId: 'cybersecurity-analyst', weight: 3 },
      { careerId: 'security-engineer', weight: 3 },
      { careerId: 'devops-engineer', weight: 3 },
      { careerId: 'cloud-engineer', weight: 3 },
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
  },

  8: {
    // Q9 — How much experience do you have in tech? (weight 1)
    'Complete beginner — starting from zero': [
      { careerId: 'frontend-developer', weight: 1 },
      { careerId: 'technical-writer', weight: 1 },
      { careerId: 'product-designer', weight: 1 },
      { careerId: 'qa-engineer', weight: 1 },
    ],
    'Some knowledge — still learning': all(1),
    'Some professional experience': all(1),
    'Experienced — looking to specialise': [
      { careerId: 'ai-engineer', weight: 1 },
      { careerId: 'data-scientist', weight: 1 },
      { careerId: 'security-engineer', weight: 1 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'robotics-engineer', weight: 2 },
      { careerId: 'cryptography-engineer', weight: 2 },
      { careerId: 'reverse-engineer', weight: 2 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
    ],
  },

  9: {
    // Q10 — What is your main goal right now? (weight 2)
    'Get a job in tech': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'Freelance or start something': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
      { careerId: 'ml-engineer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Learn a valuable skill': all(1),
    'Switch careers into tech': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
    ],
    'Just exploring — not sure yet': all(1),
  },
};
