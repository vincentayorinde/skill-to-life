export interface AssessmentOption {
  emoji: string;
  label: string;
  description: string;
}

export interface AssessmentCategory {
  id: number;
  slug: string;
  label: string;
  emoji: string;
  description: string;
  totalQuestions: number;
}

export interface AssessmentQuestion {
  id: number;
  categoryIndex: number;
  category: AssessmentCategory;
  categoryLabel: string;
  text: string;
  subtitle?: string;
  options: AssessmentOption[];
}

export const ASSESSMENT_CATEGORIES: AssessmentCategory[] = [
  {
    id: 1,
    slug: 'work-style',
    label: 'Work Style',
    emoji: '💼',
    description: 'How you like to work day to day',
    totalQuestions: 5,
  },
  {
    id: 2,
    slug: 'day-to-day',
    label: 'Day to Day',
    emoji: '📅',
    description: 'Real scenarios from a typical work week',
    totalQuestions: 5,
  },
  {
    id: 3,
    slug: 'problem-solving',
    label: 'Problem Solving',
    emoji: '🧩',
    description: 'How you approach challenges',
    totalQuestions: 5,
  },
  {
    id: 4,
    slug: 'temperament',
    label: 'Temperament',
    emoji: '🧠',
    description: 'How you think and react under pressure',
    totalQuestions: 5,
  },
  {
    id: 5,
    slug: 'soft-skills',
    label: 'Soft Skills',
    emoji: '🤝',
    description: 'How you work with and communicate with people',
    totalQuestions: 5,
  },
  {
    id: 6,
    slug: 'career-goals',
    label: 'Career Goals',
    emoji: '🎯',
    description: 'Where you want to go from here',
    totalQuestions: 5,
  },
];

export const CATEGORY_MICROCOPY: Record<string, string> = {
  'work-style': 'No right answers — just your honest take.',
  'day-to-day': 'Picture yourself actually in these situations.',
  'problem-solving': 'Go with your gut — first instinct is usually right.',
  temperament: 'Be honest — this is what makes the results accurate.',
  'soft-skills':
    'Think about how you actually behave, not how you wish you did.',
  'career-goals': 'Almost there — these last questions matter a lot.',
};

const RAW_ASSESSMENT_QUESTIONS: Omit<
  AssessmentQuestion,
  'category' | 'categoryLabel'
>[] = [
  // ── Category 1: Work Style (Q1–Q5) ────────────────────────────────

  {
    id: 1,
    categoryIndex: 0,
    text: "It's your first week at a new job. How do you prefer to get up to speed?",
    options: [
      {
        emoji: '📖',
        label: 'Read the docs and figure it out myself',
        description: '',
      },
      {
        emoji: '👀',
        label: 'Shadow someone and watch how they work',
        description: '',
      },
      {
        emoji: '🛠️',
        label: 'Jump straight in and learn by doing',
        description: '',
      },
      {
        emoji: '💬',
        label: 'Ask lots of questions until it clicks',
        description: '',
      },
    ],
  },

  {
    id: 2,
    categoryIndex: 0,
    text: 'Your ideal working day looks like...',
    options: [
      {
        emoji: '🎧',
        label: 'Deep focus time, headphones on, no interruptions',
        description: '',
      },
      {
        emoji: '⚖️',
        label: 'A mix of solo work and team check-ins',
        description: '',
      },
      {
        emoji: '🤝',
        label: 'Back to back collaboration and meetings',
        description: '',
      },
      {
        emoji: '🎲',
        label: 'Something different every single day',
        description: '',
      },
    ],
  },

  {
    id: 3,
    categoryIndex: 0,
    text: 'How do you feel about writing code?',
    options: [
      {
        emoji: '💚',
        label: 'I enjoy it or actively want to learn',
        description: '',
      },
      { emoji: '😐', label: 'I am okay with some coding', description: '' },
      {
        emoji: '🙈',
        label: 'I would rather avoid it where possible',
        description: '',
      },
      {
        emoji: '🤷',
        label: 'I have never tried — genuinely not sure',
        description: '',
      },
    ],
  },

  {
    id: 4,
    categoryIndex: 0,
    text: 'When you finish a piece of work, what makes you feel most satisfied?',
    options: [
      {
        emoji: '🖥️',
        label: 'Something visual I can see and use',
        description: '',
      },
      {
        emoji: '🔍',
        label: 'A problem I solved that nobody else could',
        description: '',
      },
      {
        emoji: '🙏',
        label: 'People telling me it genuinely helped them',
        description: '',
      },
      {
        emoji: '📊',
        label: 'Numbers or data confirming it worked',
        description: '',
      },
    ],
  },

  {
    id: 5,
    categoryIndex: 0,
    text: 'How comfortable are you working alone for long stretches?',
    options: [
      {
        emoji: '😎',
        label: 'Very comfortable — I actually prefer it',
        description: '',
      },
      {
        emoji: '🙂',
        label: 'Fine for a few hours then I need people',
        description: '',
      },
      {
        emoji: '😬',
        label: 'I struggle without regular check-ins',
        description: '',
      },
      { emoji: '🤔', label: 'Depends entirely on the task', description: '' },
    ],
  },

  // ── Category 2: Day to Day (Q6–Q10) ───────────────────────────────

  {
    id: 6,
    categoryIndex: 1,
    text: "Your manager asks you to present last quarter's performance data to the whole company. You...",
    options: [
      {
        emoji: '😄',
        label: 'Actually enjoy this kind of thing',
        description: '',
      },
      {
        emoji: '😌',
        label: 'Will do it but it is not my favourite',
        description: '',
      },
      {
        emoji: '😰',
        label: 'Feel anxious but push through',
        description: '',
      },
      {
        emoji: '✍️',
        label: 'Would rather send a written report instead',
        description: '',
      },
    ],
  },

  {
    id: 7,
    categoryIndex: 1,
    text: 'It is 3pm on a Friday. You can spend two hours writing a detailed report or fixing a tricky bug. You choose...',
    options: [
      {
        emoji: '📝',
        label: 'The report — I enjoy making sense of things in writing',
        description: '',
      },
      {
        emoji: '🐛',
        label: 'The bug — I cannot leave something broken',
        description: '',
      },
      {
        emoji: '🤝',
        label: 'Whichever the team needs more right now',
        description: '',
      },
      {
        emoji: '⚡',
        label: 'The bug — it feels more immediately satisfying',
        description: '',
      },
    ],
  },

  {
    id: 8,
    categoryIndex: 1,
    text: 'Your team gets a brand new project. The first thing you naturally gravitate toward is...',
    options: [
      {
        emoji: '👤',
        label: 'Understanding the user and what they actually need',
        description: '',
      },
      {
        emoji: '🏗️',
        label: 'Planning the technical approach and architecture',
        description: '',
      },
      {
        emoji: '⚠️',
        label: 'Thinking about risks and what could go wrong',
        description: '',
      },
      {
        emoji: '🚀',
        label: 'Getting started on something straight away',
        description: '',
      },
    ],
  },

  {
    id: 9,
    categoryIndex: 1,
    text: 'A colleague asks you to review their work. You spend most of your time...',
    options: [
      {
        emoji: '🔧',
        label: 'Checking if the logic and structure makes sense',
        description: '',
      },
      {
        emoji: '🎨',
        label: 'Looking at how it looks and feels to use',
        description: '',
      },
      {
        emoji: '🧪',
        label: 'Testing edge cases and trying to break it',
        description: '',
      },
      {
        emoji: '📄',
        label: 'Reading through for clarity and accuracy',
        description: '',
      },
    ],
  },

  {
    id: 10,
    categoryIndex: 1,
    text: 'You have been asked to run a weekly team meeting. How do you feel about that?',
    options: [
      {
        emoji: '👋',
        label: 'I enjoy facilitating and keeping things moving',
        description: '',
      },
      {
        emoji: '😐',
        label: 'Fine — it is just part of the job',
        description: '',
      },
      {
        emoji: '😅',
        label: 'I would rather someone else did it',
        description: '',
      },
      {
        emoji: '🤔',
        label: 'Depends on the team and format',
        description: '',
      },
    ],
  },

  // ── Category 3: Problem Solving (Q11–Q15) ─────────────────────────

  {
    id: 11,
    categoryIndex: 2,
    text: 'Your app crashes in production on a Saturday morning. You are on call. Your first move is...',
    options: [
      {
        emoji: '🔍',
        label: 'Check the logs and trace exactly what changed',
        description: '',
      },
      {
        emoji: '⏪',
        label: 'Roll back to the last working version immediately',
        description: '',
      },
      {
        emoji: '📞',
        label: 'Call the team — this needs more than one person',
        description: '',
      },
      {
        emoji: '💻',
        label: 'Reproduce the issue locally before touching anything',
        description: '',
      },
    ],
  },

  {
    id: 12,
    categoryIndex: 2,
    text: 'You are given a complex problem with no clear solution and no instructions. You...',
    options: [
      {
        emoji: '🧩',
        label: 'Break it into smaller pieces and start there',
        description: '',
      },
      {
        emoji: '🔎',
        label: 'Research how others have solved similar things',
        description: '',
      },
      {
        emoji: '📐',
        label: 'Sketch out a few different approaches first',
        description: '',
      },
      {
        emoji: '💬',
        label: 'Talk it through with someone before starting',
        description: '',
      },
    ],
  },

  {
    id: 13,
    categoryIndex: 2,
    text: 'You spot a security vulnerability in a system you did not build. You...',
    options: [
      {
        emoji: '📋',
        label: 'Document it properly and report it immediately',
        description: '',
      },
      {
        emoji: '🔧',
        label: 'Fix it yourself first then tell someone',
        description: '',
      },
      {
        emoji: '🕵️',
        label: 'Investigate how deep it goes before doing anything',
        description: '',
      },
      {
        emoji: '🚨',
        label: 'Flag it to the team and let them decide next steps',
        description: '',
      },
    ],
  },

  {
    id: 14,
    categoryIndex: 2,
    text: 'You need to explain a complex technical concept to someone non-technical. You...',
    options: [
      {
        emoji: '💡',
        label: 'Use an analogy or real world comparison',
        description: '',
      },
      {
        emoji: '✏️',
        label: 'Draw a diagram or visual to illustrate it',
        description: '',
      },
      {
        emoji: '🗣️',
        label: 'Walk through it step by step verbally',
        description: '',
      },
      {
        emoji: '📝',
        label: 'Write it out clearly in a document',
        description: '',
      },
    ],
  },

  {
    id: 15,
    categoryIndex: 2,
    text: 'A project you are leading is two weeks behind schedule. You...',
    options: [
      {
        emoji: '✂️',
        label: 'Reassess scope and cut what is not essential',
        description: '',
      },
      {
        emoji: '💪',
        label: 'Work longer hours to close the gap',
        description: '',
      },
      {
        emoji: '📢',
        label: 'Communicate the delay early and reset expectations',
        description: '',
      },
      {
        emoji: '🔍',
        label: 'Find the bottleneck and fix that first',
        description: '',
      },
    ],
  },

  // ── Category 4: Temperament (Q16–Q20) ────────────────────────────

  {
    id: 16,
    categoryIndex: 3,
    text: 'Someone gives you critical feedback on your work. Your honest first reaction is...',
    options: [
      {
        emoji: '🤔',
        label: 'I want to understand exactly what was wrong',
        description: '',
      },
      {
        emoji: '😤',
        label: 'I feel defensive at first but usually come around',
        description: '',
      },
      {
        emoji: '🙏',
        label: 'I genuinely appreciate it — it helps me improve',
        description: '',
      },
      {
        emoji: '😐',
        label: 'It depends entirely on how it was delivered',
        description: '',
      },
    ],
  },

  {
    id: 17,
    categoryIndex: 3,
    text: 'You are deep in a task when something urgent lands in your inbox. You...',
    options: [
      {
        emoji: '⏸️',
        label: 'Finish my current thought then switch',
        description: '',
      },
      {
        emoji: '⚡',
        label: 'Switch immediately — urgent means urgent',
        description: '',
      },
      { emoji: '😤', label: 'Feel frustrated but handle it', description: '' },
      {
        emoji: '🔍',
        label: 'Triage it first — is it actually urgent?',
        description: '',
      },
    ],
  },

  {
    id: 18,
    categoryIndex: 3,
    text: 'How do you feel about repetitive tasks that need to be done precisely and consistently?',
    options: [
      {
        emoji: '✅',
        label: 'Fine — consistency and accuracy matter to me',
        description: '',
      },
      {
        emoji: '🤖',
        label: 'I can do them but I immediately look to automate',
        description: '',
      },
      {
        emoji: '😴',
        label: 'I find them draining after a while',
        description: '',
      },
      {
        emoji: '🚫',
        label: 'I actively try to avoid or delegate them',
        description: '',
      },
    ],
  },

  {
    id: 19,
    categoryIndex: 3,
    text: 'A decision needs to be made and the team cannot agree. You tend to...',
    options: [
      {
        emoji: '📊',
        label: 'Push for more data before deciding anything',
        description: '',
      },
      { emoji: '✊', label: 'Make a call and own it', description: '' },
      {
        emoji: '🤝',
        label: 'Find the compromise that works for most people',
        description: '',
      },
      {
        emoji: '🎓',
        label: 'Defer to whoever has the most context',
        description: '',
      },
    ],
  },

  {
    id: 20,
    categoryIndex: 3,
    text: 'You are most energised at work when...',
    options: [
      {
        emoji: '💡',
        label: 'I crack something that has been puzzling me for days',
        description: '',
      },
      {
        emoji: '🚀',
        label: 'I ship something people actually use',
        description: '',
      },
      {
        emoji: '🎓',
        label: 'I help someone understand something new',
        description: '',
      },
      {
        emoji: '🏗️',
        label: 'I build something meaningful from nothing',
        description: '',
      },
    ],
  },

  // ── Category 5: Soft Skills (Q21–Q25) ────────────────────────────

  {
    id: 21,
    categoryIndex: 4,
    text: 'A junior colleague is really struggling with something you know well. You...',
    options: [
      {
        emoji: '🤝',
        label: 'Sit with them and walk through it together',
        description: '',
      },
      {
        emoji: '📚',
        label: 'Point them to the right resources and check back',
        description: '',
      },
      {
        emoji: '🔧',
        label: 'Fix it for them and explain what you did',
        description: '',
      },
      {
        emoji: '💪',
        label: 'Encourage them to figure it out — they will learn more',
        description: '',
      },
    ],
  },

  {
    id: 22,
    categoryIndex: 4,
    text: 'You strongly disagree with a decision your team has made. You...',
    options: [
      {
        emoji: '🗣️',
        label: 'Raise it once clearly then commit to the decision',
        description: '',
      },
      {
        emoji: '📢',
        label: 'Keep pushing until you feel properly heard',
        description: '',
      },
      {
        emoji: '🤐',
        label: 'Let it go and trust the process',
        description: '',
      },
      {
        emoji: '📝',
        label: 'Document your concerns clearly and move on',
        description: '',
      },
    ],
  },

  {
    id: 23,
    categoryIndex: 4,
    text: 'When working with clients or stakeholders you prefer to...',
    options: [
      {
        emoji: '📞',
        label: 'Have regular calls and keep them closely involved',
        description: '',
      },
      {
        emoji: '📧',
        label: 'Send clear written updates and let them trust you',
        description: '',
      },
      {
        emoji: '🖥️',
        label: 'Share prototypes early and get feedback often',
        description: '',
      },
      {
        emoji: '📋',
        label: 'Agree the brief upfront and deliver at the end',
        description: '',
      },
    ],
  },

  {
    id: 24,
    categoryIndex: 4,
    text: 'What kind of impact do you most want your work to have?',
    options: [
      {
        emoji: '😊',
        label: 'Make something easier or better for everyday people',
        description: '',
      },
      {
        emoji: '🧠',
        label: 'Solve a hard problem nobody else has cracked',
        description: '',
      },
      {
        emoji: '🎓',
        label: 'Help someone learn, grow, or change their path',
        description: '',
      },
      {
        emoji: '🛡️',
        label: 'Protect people or systems from harm',
        description: '',
      },
    ],
  },

  {
    id: 25,
    categoryIndex: 4,
    text: 'In a team, you naturally take on the role of...',
    options: [
      {
        emoji: '📋',
        label: 'The one who keeps everyone organised and moving',
        description: '',
      },
      {
        emoji: '⚙️',
        label: 'The one who digs deepest into the technical side',
        description: '',
      },
      {
        emoji: '🌉',
        label: 'The one who bridges tech and non-technical people',
        description: '',
      },
      {
        emoji: '🔍',
        label: 'The one who spots what everyone else missed',
        description: '',
      },
    ],
  },

  // ── Category 6: Career Goals (Q26–Q30) ───────────────────────────

  {
    id: 26,
    categoryIndex: 5,
    text: 'Five years from now you want to be...',
    options: [
      {
        emoji: '🎯',
        label: 'A deep specialist — the go-to person in my field',
        description: '',
      },
      {
        emoji: '👥',
        label: 'A technical leader managing and growing a team',
        description: '',
      },
      {
        emoji: '🚀',
        label: 'Running my own product or consultancy',
        description: '',
      },
      {
        emoji: '📚',
        label: 'Still learning broadly — I want breadth not depth',
        description: '',
      },
    ],
  },

  {
    id: 27,
    categoryIndex: 5,
    text: 'Which of these would you most like to say about your career one day?',
    options: [
      {
        emoji: '🌍',
        label: 'I built systems used by millions of people',
        description: '',
      },
      {
        emoji: '🎓',
        label: 'I helped someone get their first job in tech',
        description: '',
      },
      {
        emoji: '🛡️',
        label: 'I caught a breach before it became a disaster',
        description: '',
      },
      {
        emoji: '📊',
        label: 'I turned data into a decision that changed something',
        description: '',
      },
    ],
  },

  {
    id: 28,
    categoryIndex: 5,
    text: 'How important is money in your career decisions?',
    options: [
      {
        emoji: '💰',
        label: 'Very — I want to maximise earning potential',
        description: '',
      },
      {
        emoji: '⚖️',
        label: 'Important but not the main driver',
        description: '',
      },
      {
        emoji: '🏠',
        label: 'I want enough to be comfortable — beyond that varies',
        description: '',
      },
      {
        emoji: '❤️',
        label: 'Less important than doing work that matters to me',
        description: '',
      },
    ],
  },

  {
    id: 29,
    categoryIndex: 5,
    text: 'The idea of freelancing or building your own thing one day...',
    options: [
      {
        emoji: '🔥',
        label: 'Excites me — that is genuinely the goal',
        description: '',
      },
      {
        emoji: '🤔',
        label: 'Interests me but feels risky right now',
        description: '',
      },
      {
        emoji: '🏢',
        label: 'Not for me — I prefer stability and structure',
        description: '',
      },
      {
        emoji: '⏳',
        label: 'Maybe eventually but not something I think about now',
        description: '',
      },
    ],
  },

  {
    id: 30,
    categoryIndex: 5,
    text: 'What would make you feel like you had truly chosen the right path?',
    options: [
      {
        emoji: '🏆',
        label: 'I am well paid and respected in my field',
        description: '',
      },
      {
        emoji: '😊',
        label: 'I genuinely enjoy my work most days',
        description: '',
      },
      {
        emoji: '🌟',
        label: 'I made something that outlasts me',
        description: '',
      },
      {
        emoji: '❤️',
        label: 'I helped more people than I ever expected',
        description: '',
      },
    ],
  },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] =
  RAW_ASSESSMENT_QUESTIONS.map((question) => {
    const category = ASSESSMENT_CATEGORIES[question.categoryIndex];

    return {
      ...question,
      category,
      categoryLabel: category.label,
    };
  });
