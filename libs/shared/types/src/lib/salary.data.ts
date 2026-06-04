import type { CareerSalaryData } from './types';

// UK GBP salary estimates based on ITJobsWatch, Glassdoor, LinkedIn Salary, and Reed.
// Last updated: 2025. Salaries vary significantly by location, employer, and experience.

export const CAREER_SALARY_DATA: CareerSalaryData[] = [
  // ── Development ────────────────────────────────────────────────────────────
  {
    careerId: 'frontend-developer',
    lastUpdated: '2025',
    summary:
      'One of the most in-demand roles in tech with strong freelance potential and fast salary growth. React and TypeScript experience push salaries toward the top of these ranges.',
    ranges: [
      {
        level: 'junior',
        min: 28000,
        max: 40000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 42000, max: 60000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 65000,
        max: 90000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 90000,
        max: 120000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 250, max: 600, currency: 'GBP' },
      hourly: { min: 35, max: 80, currency: 'GBP' },
    },
    factors: [
      'Framework depth — React and TypeScript experience pushes salaries higher',
      'Location — London pays 20–30% more than most other UK cities',
      'Sector — fintech, scale-ups, and Big Tech pay above the UK average',
      'Portfolio quality matters more than formal qualifications',
      'Performance optimisation and accessibility skills add leverage in negotiations',
    ],
    regionalNote:
      'US salaries are significantly higher — senior roles at US tech companies (even remotely) often reach $130k–$180k+. European salaries vary widely by country.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Reed Technology',
    ],
  },

  {
    careerId: 'backend-developer',
    lastUpdated: '2025',
    summary:
      'Consistently high demand with strong salary growth, especially in cloud-native stacks and distributed systems. Specialising in high-performance or financial systems adds significant salary leverage.',
    ranges: [
      {
        level: 'junior',
        min: 30000,
        max: 45000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 48000, max: 68000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 70000,
        max: 100000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 95000,
        max: 130000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 300, max: 700, currency: 'GBP' },
      hourly: { min: 40, max: 90, currency: 'GBP' },
    },
    factors: [
      'Language and ecosystem — Go, Rust, and Java engineers often earn more than Node or PHP',
      'Domain knowledge — fintech, healthcare, and trading systems command a premium',
      'Database expertise, especially PostgreSQL and distributed databases',
      'Cloud platform experience (AWS, GCP, Azure) significantly increases value',
      'Open-source contributions raise profile and negotiating power',
    ],
    regionalNote:
      'Backend engineers at US product companies earn $120k–$200k+. Remote positions from European companies offer competitive salaries with lower cost of living.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Stack Overflow Survey',
    ],
  },

  {
    careerId: 'fullstack-developer',
    lastUpdated: '2025',
    summary:
      'Versatility commands a premium at startups and scale-ups. Full-stack engineers are especially valuable at companies that cannot afford specialists for each layer.',
    ranges: [
      {
        level: 'junior',
        min: 32000,
        max: 48000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 50000, max: 72000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 72000,
        max: 105000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 100000,
        max: 135000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 300, max: 750, currency: 'GBP' },
      hourly: { min: 40, max: 95, currency: 'GBP' },
    },
    factors: [
      'Depth matters — generalists who can go deep in one area earn more than pure generalists',
      'Startup experience is a strong signal for product-led companies',
      'TypeScript and modern frameworks (Next.js, Remix) push mid-level salaries higher',
      'Deployment and DevOps knowledge is increasingly expected at senior level',
    ],
    regionalNote:
      'US full-stack engineers at product companies earn $130k–$180k. Remote full-stack work is widely available internationally.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Stack Overflow Survey',
    ],
  },

  // ── Security ───────────────────────────────────────────────────────────────
  {
    careerId: 'cybersecurity-analyst',
    lastUpdated: '2025',
    summary:
      'Severe global talent shortage means salaries are rising fast. Experienced analysts are highly sought after, and certifications reliably translate into salary increases.',
    ranges: [
      {
        level: 'junior',
        min: 28000,
        max: 42000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 45000, max: 65000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 68000,
        max: 95000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 95000,
        max: 130000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 800, currency: 'GBP' },
      hourly: { min: 45, max: 100, currency: 'GBP' },
    },
    factors: [
      'Certifications (Security+, CISSP, CISM) reliably add £5k–£15k to base salary',
      'SC or DV security clearance adds a significant premium in government and defence',
      'SOC experience is in high demand, especially Tier 2/3 analysts',
      'Cloud security knowledge (AWS Security Specialty, Microsoft AZ-500) commands premiums',
      'Threat intelligence and incident response experience valued most at senior levels',
    ],
    regionalNote:
      'US cybersecurity analysts earn $80k–$150k+. Government and defence roles with clearance pay well in both the UK and US.',
    sources: [
      'CyberSeek',
      'ISC2 Workforce Study',
      'Glassdoor UK',
      'ITJobsWatch',
    ],
  },

  {
    careerId: 'security-engineer',
    lastUpdated: '2025',
    summary:
      'One of the highest-paid engineering specialisms. Strong engineering skills combined with security knowledge create a rare and highly valued profile.',
    ranges: [
      {
        level: 'junior',
        min: 40000,
        max: 55000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 58000, max: 80000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 82000,
        max: 115000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 110000,
        max: 150000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 900, currency: 'GBP' },
      hourly: { min: 50, max: 115, currency: 'GBP' },
    },
    factors: [
      'Application security (AppSec) experience at senior level is scarce and highly paid',
      'OSCP and cloud security certifications are strong differentiators',
      'Penetration testing experience adds significant value',
      'Security engineering at fintech or Big Tech firms pays well above average',
      'Bug bounty track record signals real practical ability',
    ],
    regionalNote:
      'US security engineers at major tech companies earn $150k–$250k+. Remote security engineering roles are increasingly available.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Security BSides job board',
    ],
  },

  {
    careerId: 'cloud-engineer',
    lastUpdated: '2025',
    summary:
      'Cloud certifications translate directly into salary increases. AWS and Azure certified engineers are consistently among the top earners in infrastructure roles.',
    ranges: [
      {
        level: 'junior',
        min: 35000,
        max: 50000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 55000, max: 78000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 80000,
        max: 110000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 105000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 800, currency: 'GBP' },
      hourly: { min: 45, max: 100, currency: 'GBP' },
    },
    factors: [
      'AWS Professional-level certifications add £8k–£15k over AWS Associate',
      'Multi-cloud skills (AWS + Azure or GCP) increase options significantly',
      'FinOps and cost optimisation skills are increasingly valued',
      'Kubernetes (CKA, CKS) certification opens senior and architect roles',
      'Financial services and government cloud work pays above market rate',
    ],
    regionalNote:
      'Cloud engineers at US hyperscalers earn $130k–$200k. UK contract rates are strong, especially in banking and insurance.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Global Knowledge IT Skills Survey',
    ],
  },

  {
    careerId: 'devops-engineer',
    lastUpdated: '2025',
    summary:
      'High demand across all sectors with particularly strong contractor rates. DevOps engineers with Kubernetes and cloud expertise are in short supply.',
    ranges: [
      {
        level: 'junior',
        min: 35000,
        max: 50000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 55000, max: 78000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 80000,
        max: 110000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 105000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 800, currency: 'GBP' },
      hourly: { min: 45, max: 100, currency: 'GBP' },
    },
    factors: [
      'CKA (Certified Kubernetes Administrator) is one of the highest-ROI certifications in this space',
      'Platform engineering skills (Backstage, ArgoCD) are increasingly sought',
      'Financial services and retail devops roles pay above the UK average',
      'On-call responsibilities often include additional pay or compensatory leave',
      'GitHub Actions and GitLab CI expertise is now table stakes at senior level',
    ],
    regionalNote:
      'US DevOps engineers at tech companies earn $120k–$180k. UK contract market is particularly strong for experienced DevOps engineers.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Stack Overflow Survey',
    ],
  },

  // ── Data & AI ─────────────────────────────────────────────────────────────
  {
    careerId: 'data-analyst',
    lastUpdated: '2025',
    summary:
      'Salaries are lower than engineering roles but growing fast, especially for analysts with strong SQL, Python, and business domain knowledge. Entry point is accessible.',
    ranges: [
      {
        level: 'junior',
        min: 25000,
        max: 38000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 40000, max: 58000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 60000,
        max: 82000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 80000,
        max: 110000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 250, max: 550, currency: 'GBP' },
      hourly: { min: 32, max: 70, currency: 'GBP' },
    },
    factors: [
      'Domain expertise (fintech, healthcare, retail) adds substantial salary leverage',
      'Python and SQL proficiency is essential — R skills add value in some sectors',
      'Data visualisation skills (Tableau, Power BI, Looker) increase market value',
      'Business impact communication — analysts who influence decisions earn more',
      'Moving into analytics engineering (dbt, Snowflake) can significantly raise salaries',
    ],
    regionalNote:
      'US data analysts at tech companies earn $80k–$130k. Finance sector analysts in London earn at the top of the UK range.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'DataCamp State of Data',
    ],
  },

  {
    careerId: 'data-scientist',
    lastUpdated: '2025',
    summary:
      'Significant salary growth over the past decade with demand still strong. The role is increasingly focused on practical ML deployment rather than pure analysis.',
    ranges: [
      {
        level: 'junior',
        min: 38000,
        max: 55000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 58000, max: 80000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 82000,
        max: 115000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 110000,
        max: 145000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 800, currency: 'GBP' },
      hourly: { min: 45, max: 100, currency: 'GBP' },
    },
    factors: [
      'Strong mathematics background increases earning potential significantly',
      'MLOps skills (model deployment, monitoring) are increasingly required',
      'PhD can open research-track roles but is not required for industry',
      'Kaggle competition performance is a recognised portfolio signal',
      'Sector matters — fintech and pharma data scientists earn more than media or retail',
    ],
    regionalNote:
      'US data scientists at Big Tech earn $150k–$250k+. Research roles in the UK are catching up but remain below US levels.',
    sources: [
      'Glassdoor UK',
      'LinkedIn Salary',
      'DataCamp State of Data',
      'Burtch Works Study',
    ],
  },

  {
    careerId: 'ai-engineer',
    lastUpdated: '2025',
    summary:
      'The fastest-growing and highest-paid emerging role in tech. Demand currently far outstrips supply, and this is expected to continue for the foreseeable future.',
    ranges: [
      {
        level: 'junior',
        min: 45000,
        max: 65000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 68000, max: 95000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 100000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 135000,
        max: 175000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 1000, currency: 'GBP' },
      hourly: { min: 50, max: 125, currency: 'GBP' },
    },
    factors: [
      'LLM API expertise (Anthropic, OpenAI) is highly valued and in short supply',
      'RAG system design and vector database experience command a premium',
      'Demonstrated shipped AI products matter more than certificates in this field',
      'ML fundamentals prevent you from being limited to prompt engineering roles',
      'UK AI companies (DeepMind, Wayve, Stability AI) offer competitive packages',
    ],
    regionalNote:
      'US AI engineers at major labs and product companies earn $160k–$300k+. UK AI salaries are growing rapidly as the London AI scene expands.',
    sources: ['LinkedIn Salary', 'Glassdoor UK', 'Adzuna', 'Levels.fyi'],
  },

  // ── Design & Product ──────────────────────────────────────────────────────
  {
    careerId: 'product-designer',
    lastUpdated: '2025',
    summary:
      'Portfolio quality matters far more than qualifications. Strong UX designers at scale-ups and Big Tech earn considerably more than average UK figures.',
    ranges: [
      {
        level: 'junior',
        min: 28000,
        max: 42000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 45000, max: 65000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 68000,
        max: 90000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 88000,
        max: 120000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 250, max: 600, currency: 'GBP' },
      hourly: { min: 32, max: 75, currency: 'GBP' },
    },
    factors: [
      'Case study quality is the primary salary determinant — narrative matters',
      'Design system ownership at senior level adds significant value',
      'UX research skills add breadth and increase senior-level leverage',
      'Product-led companies (not agencies) pay significantly more',
      'Motion design and prototyping skills add leverage in some sectors',
    ],
    regionalNote:
      'US product designers at Big Tech and unicorns earn $120k–$180k+. London agencies pay below the UK product company average.',
    sources: [
      'Glassdoor UK',
      'LinkedIn Salary',
      'Figma Design Survey',
      'UX Collective Salary Guide',
    ],
  },

  {
    careerId: 'product-manager',
    lastUpdated: '2025',
    summary:
      'One of the best-compensated non-engineering roles in tech. Senior PMs at growth-stage companies earn extremely well, with equity often adding significantly on top.',
    ranges: [
      {
        level: 'junior',
        min: 40000,
        max: 58000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 62000, max: 88000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 90000,
        max: 125000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 120000,
        max: 160000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 800, currency: 'GBP' },
      hourly: { min: 45, max: 100, currency: 'GBP' },
    },
    factors: [
      'Equity and bonuses can substantially exceed base salary at growth-stage companies',
      'Technical background (engineering or data) significantly increases earning potential',
      'Fintech and marketplace PMs earn above the average for tech PMs',
      'APM (Associate PM) programmes at Big Tech companies are highly paid entry points',
      'Growth PM specialisation is increasingly valued at consumer companies',
    ],
    regionalNote:
      'US PMs at Big Tech (FAANG) earn $180k–$300k+ including equity. UK product management is well-compensated but equity is typically lower than US packages.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor UK',
      'Mind the Product Salary Survey',
      'Adzuna',
    ],
  },

  // ── Writing & QA ─────────────────────────────────────────────────────────
  {
    careerId: 'technical-writer',
    lastUpdated: '2025',
    summary:
      'Salaries are lower than engineering roles but stable and growing. Developer-focused and API documentation writers earn at the top of the range.',
    ranges: [
      {
        level: 'junior',
        min: 28000,
        max: 40000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 42000, max: 60000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 62000,
        max: 82000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 78000,
        max: 100000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 200, max: 500, currency: 'GBP' },
      hourly: { min: 28, max: 65, currency: 'GBP' },
    },
    factors: [
      'API and developer documentation commands a 20–40% salary premium over general tech writing',
      'Coding ability (reading and writing basic code) increases options and value significantly',
      'Developer relations and advocacy roles are adjacent and typically pay more',
      'Open-source documentation contributions build portfolio and reputation',
      'Domain expertise in AI, cloud, or fintech adds significant value',
    ],
    regionalNote:
      'US technical writers at Big Tech earn $100k–$150k+. Remote writing roles are widely available and often pay near US rates.',
    sources: [
      'Society for Technical Communication Salary Survey',
      'Glassdoor UK',
      'LinkedIn Salary',
    ],
  },

  {
    careerId: 'qa-engineer',
    lastUpdated: '2025',
    summary:
      'Automation skills reliably push QA salaries to the top of these ranges. SDET (Software Development Engineer in Test) roles blur the line with engineering and earn accordingly.',
    ranges: [
      {
        level: 'junior',
        min: 25000,
        max: 38000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 40000, max: 58000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 60000,
        max: 80000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 78000,
        max: 105000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 250, max: 550, currency: 'GBP' },
      hourly: { min: 32, max: 70, currency: 'GBP' },
    },
    factors: [
      'Playwright or Cypress automation skills add £5k–£10k over manual-only roles',
      'SDET roles (engineering-focused QA) earn significantly more than traditional QA',
      'Performance testing and load testing skills add value at senior level',
      'Security testing knowledge is increasingly sought and well-compensated',
      'ISTQB certification is an entry-level signal but automation matters more at mid+',
    ],
    regionalNote:
      'US QA engineers at product companies earn $80k–$130k. Automation-focused roles increasingly pay at parity with backend developers.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Ministry of Testing Salary Survey',
    ],
  },

  // ── Specialist & Advanced ─────────────────────────────────────────────────
  {
    careerId: 'ethical-hacker',
    lastUpdated: '2025',
    summary:
      'Ethical hackers with OSCP and real-world experience are in high demand. Bug bounty income can supplement salary significantly at the right skill level.',
    ranges: [
      {
        level: 'junior',
        min: 30000,
        max: 45000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 50000, max: 72000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 75000,
        max: 105000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 100000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 350, max: 1000, currency: 'GBP' },
      hourly: { min: 45, max: 125, currency: 'GBP' },
    },
    factors: [
      'OSCP certification is the strongest differentiator in this field',
      'SC and DV security clearance adds premium in government and defence contracts',
      'Bug bounty payouts can be substantial — top researchers earn six figures from bounties alone',
      'Web application pentesting is the most in-demand specialism',
      'Writeup quality and CTF history are reviewed during hiring at the best firms',
    ],
    regionalNote:
      'US ethical hackers at financial institutions earn $120k–$180k. Remote pentesting is possible but some roles require on-site presence.',
    sources: [
      'Glassdoor UK',
      'LinkedIn Salary',
      'CyberSeek',
      'ec-council Salary Guide',
    ],
  },

  {
    careerId: 'cloud-architect',
    lastUpdated: '2025',
    summary:
      'Among the highest-paid technical roles in the UK. Demand exceeds supply significantly, and experienced architects command strong rates in both permanent and contract roles.',
    ranges: [
      {
        level: 'junior',
        min: 50000,
        max: 68000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'mid',
        min: 72000,
        max: 100000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'senior',
        min: 105000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 135000,
        max: 175000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 500, max: 1200, currency: 'GBP' },
      hourly: { min: 65, max: 150, currency: 'GBP' },
    },
    factors: [
      'AWS Solutions Architect Professional is among the highest-ROI certifications in UK tech',
      'Multi-cloud experience (AWS + Azure) significantly increases market value',
      'Migration project experience at large enterprise scale adds real premium',
      'FinOps skills are increasingly in demand as cloud costs become a boardroom issue',
      'Banking, insurance, and NHS cloud transformation projects pay top rates',
    ],
    regionalNote:
      'US cloud architects at major companies earn $160k–$250k+. UK contract rates are among the strongest in the European market.',
    sources: [
      'ITJobsWatch',
      'Glassdoor UK',
      'LinkedIn Salary',
      'Global Knowledge IT Skills Survey',
    ],
  },

  {
    careerId: 'ml-engineer',
    lastUpdated: '2025',
    summary:
      'Salaries are rising fast as demand for production ML systems grows. Engineers who can ship and maintain models in production earn more than those focused only on model building.',
    ranges: [
      {
        level: 'junior',
        min: 42000,
        max: 60000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 65000, max: 90000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 95000,
        max: 130000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 125000,
        max: 165000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 950, currency: 'GBP' },
      hourly: { min: 50, max: 120, currency: 'GBP' },
    },
    factors: [
      'Production MLOps experience commands a premium over pure research skills',
      'LLM fine-tuning and RLHF experience is the highest-value specialisation currently',
      'PhD is beneficial for research roles but not required for engineering positions',
      'Kaggle Grandmaster status or top-ranked competition results are strong signals',
      'Financial services and biotech ML engineering pays above the UK average',
    ],
    regionalNote:
      'US ML engineers at top labs earn $180k–$300k+. UK AI companies like DeepMind, Wayve, and others offer competitive but lower packages.',
    sources: ['LinkedIn Salary', 'Glassdoor UK', 'Levels.fyi', 'AI Jobs board'],
  },

  {
    careerId: 'blockchain-developer',
    lastUpdated: '2025',
    summary:
      'Salaries are high but volatile — heavily influenced by crypto market conditions. Token compensation can dramatically increase or decrease total earnings.',
    ranges: [
      {
        level: 'junior',
        min: 38000,
        max: 55000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 60000, max: 90000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 95000,
        max: 140000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 130000,
        max: 170000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 1000, currency: 'GBP' },
      hourly: { min: 50, max: 125, currency: 'GBP' },
    },
    factors: [
      'Smart contract audit skills are the highest-paid specialism in this field',
      'DeFi protocol experience commands a premium over NFT or general dApp work',
      'Token compensation is common — factor in vesting schedules and market risk',
      'Security knowledge is essential for senior roles, given high value of exploit risk',
      'Layer 2 (Optimism, Arbitrum, Base) experience is increasingly valued',
    ],
    regionalNote:
      'Blockchain roles are often fully remote and frequently pay in token compensation alongside GBP/USD base salaries. Global talent market applies.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor',
      'Crypto Jobs List',
      'Web3 Careers survey',
    ],
  },

  {
    careerId: 'sre-engineer',
    lastUpdated: '2025',
    summary:
      'On-call responsibilities are compensated with additional pay or time off. SREs at large-scale companies earn among the highest salaries in infrastructure.',
    ranges: [
      {
        level: 'junior',
        min: 42000,
        max: 60000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 65000, max: 88000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 90000,
        max: 125000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 120000,
        max: 155000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 900, currency: 'GBP' },
      hourly: { min: 50, max: 115, currency: 'GBP' },
    },
    factors: [
      'On-call rotas are typically compensated — factor into total compensation calculation',
      'Go programming experience is preferred at many SRE teams and commands a premium',
      'Observability tool ownership (Prometheus, Grafana, Datadog) adds leverage',
      'Incident management and postmortem experience valued at senior levels',
      'Financial services and e-commerce SRE roles pay at the top of these ranges',
    ],
    regionalNote:
      'US SREs at Google and major tech companies earn $150k–$250k. Google coined the SRE role — their internal compensation sets industry expectations.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor UK',
      'ITJobsWatch',
      'Google SRE Hiring Data',
    ],
  },

  {
    careerId: 'platform-engineer',
    lastUpdated: '2025',
    summary:
      'A growing specialisation with strong salary growth as companies invest in developer experience. IDP (Internal Developer Platform) experience is increasingly valued.',
    ranges: [
      {
        level: 'junior',
        min: 42000,
        max: 58000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 62000, max: 85000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 88000,
        max: 120000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 115000,
        max: 150000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 900, currency: 'GBP' },
      hourly: { min: 50, max: 115, currency: 'GBP' },
    },
    factors: [
      'Kubernetes and GitOps expertise is the core differentiator in this field',
      'Backstage and internal developer platform experience is increasingly sought',
      'Large enterprise and banking platform roles pay at the top of these ranges',
      'Open-source contributions to CNCF projects increase visibility and hireability',
      'Developer experience metrics ownership adds value in senior negotiations',
    ],
    regionalNote:
      'US platform engineers at scale-ups and Big Tech earn $140k–$200k. UK market is growing as companies recognise the value of developer productivity investment.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor UK',
      'CNCF Annual Survey',
      'ITJobsWatch',
    ],
  },

  {
    careerId: 'ai-safety-researcher',
    lastUpdated: '2025',
    summary:
      'Salaries at top AI safety organisations are extremely competitive. Anthropic, DeepMind, and OpenAI offer some of the highest total compensation in the field.',
    ranges: [
      {
        level: 'junior',
        min: 45000,
        max: 65000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'mid',
        min: 72000,
        max: 102000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'senior',
        min: 108000,
        max: 148000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 145000,
        max: 185000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    factors: [
      'Publication record in top venues (NeurIPS, ICML) adds substantial leverage',
      'Interpretability and alignment research are the most valued specialisms',
      'PhD is often preferred but not always required at top safety labs',
      'Fellowship experience (MATS, Redwood) is a strong hiring signal',
      'Philanthropic foundations (Open Philanthropy) also fund this work — different compensation structure',
    ],
    regionalNote:
      'US AI safety researchers at Anthropic, OpenAI, and DeepMind (US office) earn $180k–$400k+ with equity. UK labs pay well but below US levels.',
    sources: [
      'Glassdoor',
      'LinkedIn Salary',
      'AI Safety community surveys',
      'Anthropic and DeepMind job postings',
    ],
  },

  {
    careerId: 'embedded-systems-engineer',
    lastUpdated: '2025',
    summary:
      'Stable, specialist role with strong demand in automotive, aerospace, and medical devices. The skill set is rare and salaries reflect genuine scarcity.',
    ranges: [
      {
        level: 'junior',
        min: 30000,
        max: 45000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 48000, max: 68000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 70000,
        max: 98000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 95000,
        max: 130000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 300, max: 700, currency: 'GBP' },
      hourly: { min: 38, max: 88, currency: 'GBP' },
    },
    factors: [
      'Automotive (AUTOSAR, functional safety) embedded experience pays a strong premium',
      'Aerospace and defence embedded roles typically require security clearance',
      'Medical device firmware (IEC 62304 compliance) is a specialist, high-value niche',
      'RTOS expertise (FreeRTOS, Zephyr) adds value across all sectors',
      'C++ embedded experience earns more than C-only profiles at senior level',
    ],
    regionalNote:
      'US embedded engineers at automotive OEMs and defence contractors earn $100k–$160k. UK automotive and aerospace sectors are particularly strong employers.',
    sources: [
      'ITJobsWatch',
      'LinkedIn Salary',
      'Glassdoor UK',
      'EETimes Salary Survey',
    ],
  },

  {
    careerId: 'robotics-engineer',
    lastUpdated: '2025',
    summary:
      'Growing demand from manufacturing, logistics, and autonomous vehicle sectors. Robotics engineers with real hardware experience are a rare commodity.',
    ranges: [
      {
        level: 'junior',
        min: 32000,
        max: 48000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 50000, max: 72000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 75000,
        max: 105000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 100000,
        max: 135000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 300, max: 700, currency: 'GBP' },
      hourly: { min: 38, max: 88, currency: 'GBP' },
    },
    factors: [
      'Autonomous vehicle experience (Wayve, Oxbotica) is highly sought and well-paid',
      'ROS2 and simulation experience (Gazebo, Isaac Sim) add value',
      'Computer vision and perception system experience earns well in autonomous systems',
      'Manipulation and grasping expertise is valued in industrial automation',
      'Research PhD opens academic and lab positions with different pay structures',
    ],
    regionalNote:
      'US robotics engineers at Waymo, Boston Dynamics, and Amazon Robotics earn $130k–$200k+. Oxford and Cambridge research clusters pay competitively in the UK.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor UK',
      'IEEE Salary Survey',
      'Robotics Business Review',
    ],
  },

  {
    careerId: 'cryptography-engineer',
    lastUpdated: '2025',
    summary:
      'Extremely scarce skill set commanding top-of-market salaries. Financial services and security-critical companies pay significant premiums for applied cryptography expertise.',
    ranges: [
      {
        level: 'junior',
        min: 42000,
        max: 58000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 62000, max: 88000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 92000,
        max: 128000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 120000,
        max: 155000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 450, max: 1000, currency: 'GBP' },
      hourly: { min: 58, max: 125, currency: 'GBP' },
    },
    factors: [
      'Protocol implementation experience (TLS, Signal, noise) earns top of range',
      'Zero-knowledge proof experience is one of the most sought-after skills in this field',
      'Cryptographic auditing commands extremely high rates — similar to security engineering',
      'Post-quantum cryptography expertise is increasingly in demand as standards finalise',
      'Financial services and government agencies pay above average for this specialism',
    ],
    regionalNote:
      'US cryptography engineers at major tech companies and financial institutions earn $150k–$250k+. This is a globally scarce skill set.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor',
      'IACR job board',
      'Trail of Bits hiring data',
    ],
  },

  {
    careerId: 'reverse-engineer',
    lastUpdated: '2025',
    summary:
      'Rare skill set with high demand in government, defence, and threat intelligence. Security clearance holders with RE experience earn significantly above these base ranges.',
    ranges: [
      {
        level: 'junior',
        min: 35000,
        max: 50000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 55000, max: 78000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 82000,
        max: 115000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 108000,
        max: 145000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 400, max: 900, currency: 'GBP' },
      hourly: { min: 50, max: 115, currency: 'GBP' },
    },
    factors: [
      'Government and GCHQ-adjacent roles with SC/DV clearance pay a major premium',
      'Malware analyst experience at AV vendors and threat intelligence firms is well-paid',
      'Vulnerability research publication history is a strong differentiator',
      'IDA Pro and Ghidra expertise paired with C and assembly fluency is the standard',
      'CTF competition success (pwn.college, Defcon CTF) is a recognised hiring signal',
    ],
    regionalNote:
      'US reverse engineers at government contractors (NSA, CISA-adjacent) earn $120k–$200k+. UK defence sector pays well but government rates vary.',
    sources: [
      'LinkedIn Salary',
      'Glassdoor UK',
      'CyberSeek',
      'Security Cleared Jobs',
    ],
  },

  {
    careerId: 'distributed-systems-engineer',
    lastUpdated: '2025',
    summary:
      'Top of the engineering pay scale. Distributed systems engineers who can design and build reliable large-scale infrastructure are among the most valued engineers in the industry.',
    ranges: [
      {
        level: 'junior',
        min: 45000,
        max: 62000,
        currency: 'GBP',
        location: 'UK',
      },
      { level: 'mid', min: 68000, max: 95000, currency: 'GBP', location: 'UK' },
      {
        level: 'senior',
        min: 100000,
        max: 138000,
        currency: 'GBP',
        location: 'UK',
      },
      {
        level: 'lead',
        min: 132000,
        max: 170000,
        currency: 'GBP',
        location: 'UK',
      },
    ],
    freelanceRate: {
      daily: { min: 450, max: 1000, currency: 'GBP' },
      hourly: { min: 58, max: 125, currency: 'GBP' },
    },
    factors: [
      'Database internals knowledge (storage engines, replication) is rare and valued',
      'Published technical writing about distributed systems builds significant professional profile',
      'Go and Rust experience in this domain commands a premium over Java',
      'Kafka and streaming system ownership at large scale is a senior differentiator',
      'Financial trading and exchange infrastructure engineers earn at the very top of ranges',
    ],
    regionalNote:
      'US distributed systems engineers at trading firms, streaming platforms, and Big Tech earn $180k–$350k+. London fintech pays competitively relative to the UK market.',
    sources: ['Levels.fyi', 'Glassdoor', 'LinkedIn Salary', 'ITJobsWatch'],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getSalaryDataByCareerId(
  careerId: string,
): CareerSalaryData | undefined {
  return CAREER_SALARY_DATA.find((s) => s.careerId === careerId);
}

export function formatSalaryRange(
  min: number,
  max: number,
  currency: string,
): string {
  const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
  const fmt = (n: number) =>
    n >= 1000 ? `${symbol}${Math.round(n / 1000)}k` : `${symbol}${n}`;
  return `${fmt(min)}–${fmt(max)}`;
}
