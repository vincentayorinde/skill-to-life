export interface AssessmentOption {
  emoji: string;
  label: string;
  description: string;
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  options: AssessmentOption[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: 'Which work sounds most exciting to you?',
    options: [
      {
        emoji: '🛠️',
        label: 'Building apps',
        description: 'Create tools and interfaces people use every day',
      },
      {
        emoji: '🛡️',
        label: 'Protecting systems',
        description: 'Spot risks and help keep things secure',
      },
      {
        emoji: '📊',
        label: 'Analysing data',
        description: 'Turn information into clearer decisions',
      },
      {
        emoji: '🎨',
        label: 'Designing experiences',
        description: 'Shape how products look and feel',
      },
      {
        emoji: '✍️',
        label: 'Explaining things',
        description: 'Write, teach, or document ideas clearly',
      },
      {
        emoji: '🧪',
        label: 'Testing quality',
        description: 'Make sure things work the way they should',
      },
    ],
  },
  {
    id: 2,
    text: 'How do you prefer to learn something new?',
    options: [
      { emoji: '👀', label: 'Watching and following along', description: '' },
      { emoji: '📖', label: 'Reading and taking notes', description: '' },
      { emoji: '🛠️', label: 'Jumping in and trying it', description: '' },
      { emoji: '🤝', label: 'Learning with others', description: '' },
    ],
  },
  {
    id: 3,
    text: 'How do you feel about writing code?',
    options: [
      { emoji: '💚', label: 'I enjoy it or want to learn', description: '' },
      { emoji: '😐', label: 'I am okay with some code', description: '' },
      { emoji: '😬', label: 'I would rather avoid it', description: '' },
      {
        emoji: '🤷',
        label: 'I have never tried — not sure yet',
        description: '',
      },
    ],
  },
  {
    id: 4,
    text: 'What matters most to you in a career?',
    options: [
      { emoji: '💰', label: 'Good earning potential', description: '' },
      { emoji: '🌍', label: 'Remote and flexible work', description: '' },
      { emoji: '🚀', label: 'Fast career growth', description: '' },
      {
        emoji: '🎯',
        label: 'Doing work that feels meaningful',
        description: '',
      },
      { emoji: '🏗️', label: 'Building things I am proud of', description: '' },
    ],
  },
  {
    id: 5,
    text: 'How do you approach problems?',
    options: [
      { emoji: '🔍', label: 'I break them down step by step', description: '' },
      { emoji: '💡', label: 'I look for creative solutions', description: '' },
      {
        emoji: '🤝',
        label: 'I talk them through with others',
        description: '',
      },
      { emoji: '⚡', label: 'I try things fast and adjust', description: '' },
    ],
  },
  {
    id: 6,
    text: 'What kind of environment do you prefer?',
    options: [
      { emoji: '🏠', label: 'Fully remote', description: '' },
      { emoji: '🏢', label: 'In an office with a team', description: '' },
      { emoji: '🔀', label: 'A mix of both', description: '' },
      { emoji: '🤷', label: 'No strong preference', description: '' },
    ],
  },
  {
    id: 7,
    text: 'How comfortable are you with maths or logic?',
    options: [
      { emoji: '😎', label: 'Very comfortable — I enjoy it', description: '' },
      { emoji: '🙂', label: 'Fairly comfortable', description: '' },
      {
        emoji: '😐',
        label: 'Not my strength but I can manage',
        description: '',
      },
      { emoji: '😬', label: 'I find it difficult', description: '' },
    ],
  },
  {
    id: 8,
    text: 'What sounds like your ideal output at work?',
    options: [
      { emoji: '🖥️', label: 'A working app or feature', description: '' },
      { emoji: '📊', label: 'A report or data insight', description: '' },
      { emoji: '🎨', label: 'A design or visual', description: '' },
      { emoji: '📄', label: 'A document or guide', description: '' },
      {
        emoji: '🔒',
        label: 'A system that is secure and stable',
        description: '',
      },
    ],
  },
  {
    id: 9,
    text: 'How much experience do you have in tech?',
    options: [
      {
        emoji: '🌱',
        label: 'Complete beginner — starting from zero',
        description: '',
      },
      {
        emoji: '📚',
        label: 'Some knowledge — still learning',
        description: '',
      },
      { emoji: '💼', label: 'Some professional experience', description: '' },
      {
        emoji: '🚀',
        label: 'Experienced — looking to specialise',
        description: '',
      },
    ],
  },
  {
    id: 10,
    text: 'What is your main goal right now?',
    options: [
      { emoji: '💼', label: 'Get a job in tech', description: '' },
      { emoji: '💸', label: 'Freelance or start something', description: '' },
      { emoji: '📚', label: 'Learn a valuable skill', description: '' },
      { emoji: '🔄', label: 'Switch careers into tech', description: '' },
      { emoji: '🧭', label: 'Just exploring — not sure yet', description: '' },
    ],
  },
];

export const MICROCOPY: Record<string, string> = {
  early: 'Simple questions. Clearer direction.',
  mid: 'No wrong answers — just your honest take.',
  late: 'Nice — keep going, almost there.',
  final: 'Your answers help us find what fits you.',
};
