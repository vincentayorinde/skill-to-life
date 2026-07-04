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

// ─── Category index → question index range ─────────────────────────
// Category 0 (Work Style):    Q0–Q4
// Category 1 (Day to Day):    Q5–Q9
// Category 2 (Problem Solving): Q10–Q14
// Category 3 (Temperament):   Q15–Q19
// Category 4 (Soft Skills):   Q20–Q24
// Category 5 (Career Goals):  Q25–Q29

// Maps questionIndex (0–29) → optionLabel → CareerSignal[]
// Labels must match exactly what the assessment component stores in answers.
export const QUESTION_SIGNALS: Record<
  number,
  Record<string, CareerSignal[]>
> = {
  // ── Q1 (index 0): First week learning style ─────────────────────
  0: {
    'Read the docs and figure it out myself': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
    ],
    'Shadow someone and watch how they work': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
    ],
    'Jump straight in and learn by doing': [
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'blockchain-developer', weight: 2 },
    ],
    'Ask lots of questions until it clicks': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
    ],
  },

  // ── Q2 (index 1): Ideal working day ─────────────────────────────
  1: {
    'Deep focus time, headphones on, no interruptions': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 2 },
    ],
    'A mix of solo work and team check-ins': [
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'platform-engineer', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
    ],
    'Back to back collaboration and meetings': [
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Something different every single day': [
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
  },

  // ── Q3 (index 2): Coding comfort ────────────────────────────────
  2: {
    'I enjoy it or actively want to learn': [
      { careerId: 'frontend-developer', weight: 4 },
      { careerId: 'backend-developer', weight: 4 },
      { careerId: 'fullstack-developer', weight: 4 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'ai-engineer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'robotics-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 2 },
      { careerId: 'ethical-hacker', weight: 2 },
    ],
    'I am okay with some coding': [
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'qa-engineer', weight: 3 },
      { careerId: 'cloud-engineer', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
    ],
    'I would rather avoid it where possible': [
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 4 },
    ],
    'I have never tried — genuinely not sure': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
    ],
  },

  // ── Q4 (index 3): Satisfaction from work ────────────────────────
  3: {
    'Something visual I can see and use': [
      { careerId: 'frontend-developer', weight: 4 },
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'robotics-engineer', weight: 2 },
    ],
    'A problem I solved that nobody else could': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'ethical-hacker', weight: 3 },
    ],
    'People telling me it genuinely helped them': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'product-designer', weight: 2 },
    ],
    'Numbers or data confirming it worked': [
      { careerId: 'data-analyst', weight: 4 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'qa-engineer', weight: 3 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
  },

  // ── Q5 (index 4): Solo work comfort ─────────────────────────────
  4: {
    'Very comfortable — I actually prefer it': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
    ],
    'Fine for a few hours then I need people': [
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
    ],
    'I struggle without regular check-ins': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'product-designer', weight: 2 },
    ],
    'Depends entirely on the task': all(1),
  },

  // ── Q6 (index 5): Presenting to company ─────────────────────────
  5: {
    'Actually enjoy this kind of thing': [
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Will do it but it is not my favourite': [
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'frontend-developer', weight: 1 },
    ],
    'Feel anxious but push through': [
      { careerId: 'frontend-developer', weight: 1 },
      { careerId: 'backend-developer', weight: 1 },
      { careerId: 'cybersecurity-analyst', weight: 1 },
    ],
    'Would rather send a written report instead': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
    ],
  },

  // ── Q7 (index 6): Report vs bug on Friday ───────────────────────
  6: {
    'The report — I enjoy making sense of things in writing': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'The bug — I cannot leave something broken': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'qa-engineer', weight: 4 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'devops-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
    ],
    'Whichever the team needs more right now': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'fullstack-developer', weight: 2 },
    ],
    'The bug — it feels more immediately satisfying': [
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'ethical-hacker', weight: 2 },
    ],
  },

  // ── Q8 (index 7): First on new project ──────────────────────────
  7: {
    'Understanding the user and what they actually need': [
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'technical-writer', weight: 3 },
    ],
    'Planning the technical approach and architecture': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'cloud-architect', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
    ],
    'Thinking about risks and what could go wrong': [
      { careerId: 'cybersecurity-analyst', weight: 4 },
      { careerId: 'security-engineer', weight: 4 },
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'qa-engineer', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
    ],
    'Getting started on something straight away': [
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 2 },
    ],
  },

  // ── Q9 (index 8): Reviewing colleague work ──────────────────────
  8: {
    'Checking if the logic and structure makes sense': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
    ],
    'Looking at how it looks and feels to use': [
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'frontend-developer', weight: 3 },
    ],
    'Testing edge cases and trying to break it': [
      { careerId: 'qa-engineer', weight: 5 },
      { careerId: 'security-engineer', weight: 3 },
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'Reading through for clarity and accuracy': [
      { careerId: 'technical-writer', weight: 5 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
    ],
  },

  // ── Q10 (index 9): Running team meeting ─────────────────────────
  9: {
    'I enjoy facilitating and keeping things moving': [
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Fine — it is just part of the job': [
      { careerId: 'fullstack-developer', weight: 1 },
      { careerId: 'cloud-engineer', weight: 1 },
      { careerId: 'devops-engineer', weight: 1 },
    ],
    'I would rather someone else did it': [
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'data-scientist', weight: 2 },
      { careerId: 'cryptography-engineer', weight: 2 },
      { careerId: 'reverse-engineer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
    ],
    'Depends on the team and format': all(1),
  },

  // ── Q11 (index 10): Production crash ────────────────────────────
  10: {
    'Check the logs and trace exactly what changed': [
      { careerId: 'backend-developer', weight: 4 },
      { careerId: 'sre-engineer', weight: 4 },
      { careerId: 'devops-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
    ],
    'Roll back to the last working version immediately': [
      { careerId: 'devops-engineer', weight: 4 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'cloud-engineer', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
    ],
    'Call the team — this needs more than one person': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Reproduce the issue locally before touching anything': [
      { careerId: 'qa-engineer', weight: 5 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
    ],
  },

  // ── Q12 (index 11): Complex problem, no instructions ────────────
  11: {
    'Break it into smaller pieces and start there': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
    ],
    'Research how others have solved similar things': [
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'technical-writer', weight: 3 },
    ],
    'Sketch out a few different approaches first': [
      { careerId: 'product-designer', weight: 3 },
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'robotics-engineer', weight: 3 },
    ],
    'Talk it through with someone before starting': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'fullstack-developer', weight: 2 },
    ],
  },

  // ── Q13 (index 12): Security vulnerability found ────────────────
  12: {
    'Document it properly and report it immediately': [
      { careerId: 'cybersecurity-analyst', weight: 5 },
      { careerId: 'security-engineer', weight: 5 },
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
    ],
    'Fix it yourself first then tell someone': [
      { careerId: 'ethical-hacker', weight: 4 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
    ],
    'Investigate how deep it goes before doing anything': [
      { careerId: 'ethical-hacker', weight: 5 },
      { careerId: 'reverse-engineer', weight: 5 },
      { careerId: 'security-engineer', weight: 4 },
      { careerId: 'cybersecurity-analyst', weight: 4 },
    ],
    'Flag it to the team and let them decide next steps': [
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
      { careerId: 'devops-engineer', weight: 2 },
    ],
  },

  // ── Q14 (index 13): Explain complex concept ─────────────────────
  13: {
    'Use an analogy or real world comparison': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 3 },
    ],
    'Draw a diagram or visual to illustrate it': [
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'cloud-architect', weight: 3 },
    ],
    'Walk through it step by step verbally': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'technical-writer', weight: 2 },
    ],
    'Write it out clearly in a document': [
      { careerId: 'technical-writer', weight: 5 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'backend-developer', weight: 2 },
    ],
  },

  // ── Q15 (index 14): Project behind schedule ─────────────────────
  14: {
    'Reassess scope and cut what is not essential': [
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Work longer hours to close the gap': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
    ],
    'Communicate the delay early and reset expectations': [
      { careerId: 'product-manager', weight: 4 },
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
    'Find the bottleneck and fix that first': [
      { careerId: 'sre-engineer', weight: 4 },
      { careerId: 'devops-engineer', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
    ],
  },

  // ── Q16 (index 15): Critical feedback reaction ──────────────────
  15: {
    'I want to understand exactly what was wrong': [
      { careerId: 'qa-engineer', weight: 3 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
      { careerId: 'backend-developer', weight: 2 },
    ],
    'I feel defensive at first but usually come around': [
      { careerId: 'frontend-developer', weight: 1 },
      { careerId: 'product-designer', weight: 1 },
      { careerId: 'fullstack-developer', weight: 1 },
    ],
    'I genuinely appreciate it — it helps me improve': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
    ],
    'It depends entirely on how it was delivered': all(1),
  },

  // ── Q17 (index 16): Interruption handling ───────────────────────
  16: {
    'Finish my current thought then switch': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
    ],
    'Switch immediately — urgent means urgent': [
      { careerId: 'sre-engineer', weight: 4 },
      { careerId: 'devops-engineer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
    ],
    'Feel frustrated but handle it': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
    ],
    'Triage it first — is it actually urgent?': [
      { careerId: 'cybersecurity-analyst', weight: 3 },
      { careerId: 'security-engineer', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'qa-engineer', weight: 3 },
    ],
  },

  // ── Q18 (index 17): Repetitive precise tasks ────────────────────
  17: {
    'Fine — consistency and accuracy matter to me': [
      { careerId: 'qa-engineer', weight: 4 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
    ],
    'I can do them but I immediately look to automate': [
      { careerId: 'devops-engineer', weight: 5 },
      { careerId: 'sre-engineer', weight: 4 },
      { careerId: 'platform-engineer', weight: 4 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
    ],
    'I find them draining after a while': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'I actively try to avoid or delegate them': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'cloud-architect', weight: 2 },
    ],
  },

  // ── Q19 (index 18): Team cannot agree ───────────────────────────
  18: {
    'Push for more data before deciding anything': [
      { careerId: 'data-analyst', weight: 4 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
    ],
    'Make a call and own it': [
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
    ],
    'Find the compromise that works for most people': [
      { careerId: 'product-manager', weight: 3 },
    ],
    'Defer to whoever has the most context': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
    ],
  },

  // ── Q20 (index 19): Most energised when ─────────────────────────
  19: {
    'I crack something that has been puzzling me for days': [
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'reverse-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
    ],
    'I ship something people actually use': [
      { careerId: 'frontend-developer', weight: 4 },
      { careerId: 'fullstack-developer', weight: 4 },
      { careerId: 'blockchain-developer', weight: 3 },
    ],
    'I help someone understand something new': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'I build something meaningful from nothing': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'robotics-engineer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 2 },
    ],
  },

  // ── Q21 (index 20): Junior colleague struggling ──────────────────
  20: {
    'Sit with them and walk through it together': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
    ],
    'Point them to the right resources and check back': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
    ],
    'Fix it for them and explain what you did': [
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'Encourage them to figure it out — they will learn more': [
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'data-scientist', weight: 2 },
    ],
  },

  // ── Q22 (index 21): Disagree with team decision ─────────────────
  21: {
    'Raise it once clearly then commit to the decision': [
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'sre-engineer', weight: 3 },
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'devops-engineer', weight: 3 },
    ],
    'Keep pushing until you feel properly heard': [
      { careerId: 'cybersecurity-analyst', weight: 2 },
      { careerId: 'ai-safety-researcher', weight: 2 },
    ],
    'Let it go and trust the process': [
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
    ],
    'Document your concerns clearly and move on': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
    ],
  },

  // ── Q23 (index 22): Working with stakeholders ───────────────────
  22: {
    'Have regular calls and keep them closely involved': [
      { careerId: 'product-manager', weight: 4 },
    ],
    'Send clear written updates and let them trust you': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'data-analyst', weight: 3 },
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'cybersecurity-analyst', weight: 3 },
    ],
    'Share prototypes early and get feedback often': [
      { careerId: 'product-designer', weight: 4 },
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
    ],
    'Agree the brief upfront and deliver at the end': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
      { careerId: 'cryptography-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
    ],
  },

  // ── Q24 (index 23): Desired impact ──────────────────────────────
  23: {
    'Make something easier or better for everyday people': [
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'product-designer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'technical-writer', weight: 3 },
    ],
    'Solve a hard problem nobody else has cracked': [
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
    ],
    'Help someone learn, grow, or change their path': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'Protect people or systems from harm': [
      { careerId: 'cybersecurity-analyst', weight: 5 },
      { careerId: 'security-engineer', weight: 5 },
      { careerId: 'ethical-hacker', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 3 },
    ],
  },

  // ── Q25 (index 24): Natural team role ───────────────────────────
  24: {
    'The one who keeps everyone organised and moving': [
      { careerId: 'product-manager', weight: 5 },
      { careerId: 'devops-engineer', weight: 2 },
    ],
    'The one who digs deepest into the technical side': [
      { careerId: 'backend-developer', weight: 4 },
      { careerId: 'data-scientist', weight: 4 },
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 4 },
      { careerId: 'ml-engineer', weight: 4 },
      { careerId: 'embedded-systems-engineer', weight: 4 },
    ],
    'The one who bridges tech and non-technical people': [
      { careerId: 'technical-writer', weight: 4 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'cloud-architect', weight: 3 },
    ],
    'The one who spots what everyone else missed': [
      { careerId: 'qa-engineer', weight: 5 },
      { careerId: 'cybersecurity-analyst', weight: 4 },
      { careerId: 'security-engineer', weight: 4 },
      { careerId: 'ethical-hacker', weight: 4 },
      { careerId: 'reverse-engineer', weight: 4 },
    ],
  },

  // ── Q26 (index 25): Five years from now ─────────────────────────
  25: {
    'A deep specialist — the go-to person in my field': [
      { careerId: 'cryptography-engineer', weight: 4 },
      { careerId: 'ai-safety-researcher', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'reverse-engineer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'data-scientist', weight: 3 },
    ],
    'A technical leader managing and growing a team': [
      { careerId: 'cloud-architect', weight: 4 },
      { careerId: 'product-manager', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
    ],
    'Running my own product or consultancy': [
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
    ],
    'Still learning broadly — I want breadth not depth': [
      { careerId: 'fullstack-developer', weight: 3 },
      { careerId: 'devops-engineer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
    ],
  },

  // ── Q27 (index 26): Career legacy ───────────────────────────────
  26: {
    'I built systems used by millions of people': [
      { careerId: 'backend-developer', weight: 4 },
      { careerId: 'distributed-systems-engineer', weight: 4 },
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'platform-engineer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
    ],
    'I helped someone get their first job in tech': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 2 },
    ],
    'I caught a breach before it became a disaster': [
      { careerId: 'cybersecurity-analyst', weight: 5 },
      { careerId: 'security-engineer', weight: 5 },
      { careerId: 'ethical-hacker', weight: 4 },
      { careerId: 'reverse-engineer', weight: 3 },
    ],
    'I turned data into a decision that changed something': [
      { careerId: 'data-analyst', weight: 5 },
      { careerId: 'data-scientist', weight: 4 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'ai-safety-researcher', weight: 3 },
    ],
  },

  // ── Q28 (index 27): Money importance ────────────────────────────
  27: {
    'Very — I want to maximise earning potential': [
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
      { careerId: 'security-engineer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'ai-engineer', weight: 3 },
    ],
    'Important but not the main driver': [
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'product-manager', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'I want enough to be comfortable — beyond that varies': [
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'qa-engineer', weight: 2 },
    ],
    'Less important than doing work that matters to me': [
      { careerId: 'ai-safety-researcher', weight: 3 },
      { careerId: 'technical-writer', weight: 2 },
    ],
  },

  // ── Q29 (index 28): Freelancing / own thing ─────────────────────
  28: {
    'Excites me — that is genuinely the goal': [
      { careerId: 'ethical-hacker', weight: 3 },
      { careerId: 'frontend-developer', weight: 2 },
      { careerId: 'fullstack-developer', weight: 2 },
      { careerId: 'technical-writer', weight: 2 },
      { careerId: 'product-designer', weight: 2 },
    ],
    'Interests me but feels risky right now': [
      { careerId: 'product-designer', weight: 2 },
      { careerId: 'data-analyst', weight: 2 },
      { careerId: 'cybersecurity-analyst', weight: 2 },
    ],
    'Not for me — I prefer stability and structure': [
      { careerId: 'backend-developer', weight: 2 },
      { careerId: 'embedded-systems-engineer', weight: 2 },
      { careerId: 'cryptography-engineer', weight: 2 },
      { careerId: 'sre-engineer', weight: 2 },
    ],
    'Maybe eventually but not something I think about now': all(1),
  },

  // ── Q30 (index 29): Right path feeling ──────────────────────────
  29: {
    'I am well paid and respected in my field': [
      { careerId: 'cloud-architect', weight: 3 },
      { careerId: 'ml-engineer', weight: 3 },
      { careerId: 'security-engineer', weight: 3 },
      { careerId: 'distributed-systems-engineer', weight: 3 },
    ],
    'I genuinely enjoy my work most days': [
      { careerId: 'frontend-developer', weight: 3 },
      { careerId: 'product-designer', weight: 3 },
      { careerId: 'fullstack-developer', weight: 3 },
    ],
    'I made something that outlasts me': [
      { careerId: 'backend-developer', weight: 3 },
      { careerId: 'blockchain-developer', weight: 3 },
      { careerId: 'embedded-systems-engineer', weight: 3 },
      { careerId: 'robotics-engineer', weight: 3 },
    ],
    'I helped more people than I ever expected': [
      { careerId: 'technical-writer', weight: 3 },
      { careerId: 'product-manager', weight: 3 },
    ],
  },
};
