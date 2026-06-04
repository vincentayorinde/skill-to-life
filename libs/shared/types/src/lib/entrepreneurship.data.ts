import type { CareerEntrepreneurshipData } from './types';

export const CAREER_ENTREPRENEURSHIP_DATA: CareerEntrepreneurshipData[] = [
  // ── Development ────────────────────────────────────────────────────────────
  {
    careerId: 'frontend-developer',
    summary:
      'One of the best skills for going independent. High demand, clear deliverables, easy to find first clients, and the ability to build your own products makes this a strong path to self-employment.',
    paths: [
      {
        title: 'Freelance Web Developer',
        description:
          'Build websites and interfaces for businesses, agencies, and startups as an independent contractor. The most direct path to income from frontend skills.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£2,000–£8,000 per month',
        examples: [
          'Building Webflow or Framer sites for local businesses',
          'Landing pages for startup founders',
          'E-commerce frontends for small retailers',
          'Redesigning legacy company websites',
        ],
        gettingStarted: [
          'Build 3 solid portfolio projects that solve real problems',
          'Set up a clear portfolio site showing your work and process',
          'List on Upwork and reach out to 10 local businesses directly',
          'Price by value delivered, not hours — £1,500 for a landing page is reasonable',
          'Get one testimonial from your first client and use it everywhere',
        ],
      },
      {
        title: 'UI Component Libraries and Templates',
        description:
          'Design and sell reusable component libraries, Figma templates, or Tailwind/Framer themes. A product that sells while you sleep.',
        difficulty: 'low',
        timeToFirstIncome: '2–6 months',
        potentialIncome: '£300–£3,000 per month (passive)',
        examples: [
          'Tailwind CSS component packs sold on Gumroad',
          'Framer templates on the Framer Marketplace',
          'Next.js starter kits on GitHub Sponsors or Gumroad',
          'Webflow cloneables for niche industries',
        ],
        gettingStarted: [
          'Study what sells well on Gumroad, Framer Marketplace, and ThemeForest',
          'Build a niche template pack — e.g. SaaS landing pages, or portfolio themes',
          'Price at £15–£79 per template, with bundles at £99–£199',
          'Launch on Twitter/X and share the building process publicly',
          'Submit to directories like UI8 and Mobbin for distribution',
        ],
      },
      {
        title: 'Micro-SaaS Product',
        description:
          'Build a small, focused web tool that solves a specific problem and charges a recurring subscription. The gold standard for frontend developer independence.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£1,000–£50,000+ per month',
        examples: [
          'Screenshot or thumbnail generation tools',
          'Specific workflow tools for niche professions',
          'Developer utilities and productivity tools',
          'SEO or site audit tools for small businesses',
        ],
        gettingStarted: [
          'Find a problem you personally have or hear about repeatedly',
          'Validate with 10 people before building — ask if they would pay',
          'Build an MVP in 4–6 weeks using your frontend skills plus a simple API',
          'Launch on Product Hunt and relevant communities',
          'Charge from day one — even £5/month proves the idea has value',
        ],
      },
    ],
    successStories: [
      'Jon Yongfook (bannerbear.com) built a $1M ARR screenshot and image generation API as a solo founder',
      'Many frontend developers earn £5k–£10k/month from Framer template sales alone',
      'Dozens of developers have turned side tools into full-time businesses via Product Hunt launches',
    ],
    tools: [
      'Stripe',
      'Gumroad',
      'Framer',
      'Webflow',
      'Vercel',
      'Supabase',
      'Lemon Squeezy',
    ],
    communities: [
      'IndieHackers.com',
      'Twitter/X #buildinpublic',
      'r/SideProject',
      'Tiny Improvements newsletter community',
    ],
  },

  {
    careerId: 'backend-developer',
    summary:
      'Backend skills enable both client work and product businesses. API development is particularly in demand from frontend-heavy teams who need backend expertise.',
    paths: [
      {
        title: 'Freelance API and Backend Development',
        description:
          'Build APIs, databases, and server-side systems for startups and agencies that need backend expertise without hiring full-time.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£3,000–£10,000 per month',
        examples: [
          'Building REST or GraphQL APIs for startup products',
          'Database design and optimisation for growing companies',
          'Authentication and payment integration projects',
          'Migrating legacy systems to modern APIs',
        ],
        gettingStarted: [
          'Pick a specific stack and position around it — e.g. "NestJS and PostgreSQL specialist"',
          'Build a portfolio of API documentation as well as code',
          'List on Toptal and Lemon.io for vetted freelancing at higher rates',
          'Reach out to frontend developer communities — they often need backend help',
        ],
      },
      {
        title: 'Developer Tools and SaaS Products',
        description:
          'Build infrastructure tools, boilerplates, or automation products that other developers pay for. A well-positioned backend tool can grow significantly.',
        difficulty: 'medium',
        timeToFirstIncome: '3–12 months',
        potentialIncome: '£2,000–£30,000+ per month',
        examples: [
          'Authentication-as-a-service tools',
          'Webhook infrastructure services',
          'Database backup and monitoring SaaS',
          'API testing and documentation tools',
        ],
        gettingStarted: [
          'Find friction in your own backend development workflow',
          'Look at what developer tools have recently raised funding — validation signal',
          'Open source first, then charge for cloud hosting or advanced features',
          'Post on Hacker News Show HN for early traction',
        ],
      },
      {
        title: 'Technical Consulting and Architecture',
        description:
          'Senior backend developers can charge high rates for architecture reviews, system design guidance, and technical due diligence.',
        difficulty: 'medium',
        timeToFirstIncome: '2–6 months',
        potentialIncome: '£500–£1,500 per day',
        examples: [
          'Database architecture review for growing startups',
          'API design consulting for product teams',
          'Technical due diligence for investors and acquirers',
          'Performance bottleneck analysis and remediation',
        ],
        gettingStarted: [
          'Build your positioning around a specific outcome — "I help SaaS teams handle 10x user growth"',
          'Write case studies of problems you have solved',
          'Network in startup founder communities where technical help is needed',
          'Start with a productised fixed-scope review offering at £1,500–£3,000',
        ],
      },
    ],
    successStories: [
      'Many backend developers earn £500/day+ as senior freelancers through Toptal and direct client relationships',
      'Solo backend developers have built profitable API infrastructure companies serving thousands of businesses',
    ],
    tools: [
      'Stripe',
      'Railway',
      'Fly.io',
      'Postman',
      'GitHub',
      'Lemon Squeezy',
      'Paddle',
    ],
    communities: [
      'IndieHackers.com',
      'Hacker News',
      'Redditor r/webdev',
      'Backend Banter Discord',
    ],
  },

  {
    careerId: 'fullstack-developer',
    summary:
      'Full-stack developers have the broadest set of entrepreneurial options — they can build complete products solo, which is rare and valuable.',
    paths: [
      {
        title: 'Freelance Full-Product Development',
        description:
          'Build complete web applications for clients — from database to UI. The ability to own the full stack makes you especially valuable to non-technical founders.',
        difficulty: 'low',
        timeToFirstIncome: '1–2 months',
        potentialIncome: '£4,000–£12,000 per month',
        examples: [
          'MVPs for startup founders who need a technical co-founder',
          'Internal tools for businesses (dashboards, admin panels)',
          'Customer portals and self-serve products',
          'Migration of legacy apps to modern stacks',
        ],
        gettingStarted: [
          'Position yourself as an "MVP builder for non-technical founders"',
          'Set a fixed project price (£5,000–£25,000) rather than hourly',
          'Use communities like IndieHackers and Twitter/X to find founder clients',
          'Build a simple intake form and package your offering clearly',
        ],
      },
      {
        title: 'Solo SaaS Founder',
        description:
          'The ability to build frontend and backend means you can launch a product without a technical co-founder. This is the biggest advantage of full-stack skills.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£2,000–£100,000+ per month',
        examples: [
          'Niche SaaS tools for specific industries or workflows',
          'Productised services with a software component',
          'Developer tools and utilities',
          'Subscription-based content or directory products',
        ],
        gettingStarted: [
          'Spend 2 weeks on problem validation before writing a line of code',
          'Use your tech stack to build fast — aim for a working MVP in 4 weeks',
          'Charge from the first version — even £9/month validates demand',
          'Share progress publicly on Twitter/X or a newsletter to build early audience',
        ],
      },
    ],
    successStories: [
      'Pieter Levels (Nomad List, Remote OK) built multiple million-dollar products as a solo full-stack developer',
      'Many full-stack developers earn £8k–£15k/month from a combination of consulting and one or two small SaaS products',
    ],
    tools: [
      'Vercel',
      'Supabase',
      'Stripe',
      'Lemon Squeezy',
      'Railway',
      'PlanetScale',
    ],
    communities: [
      'IndieHackers.com',
      '#buildinpublic on Twitter/X',
      'MakerPad',
      'SaaStr community',
    ],
  },

  // ── Security ───────────────────────────────────────────────────────────────
  {
    careerId: 'cybersecurity-analyst',
    summary:
      'Security knowledge opens a range of consulting and freelance paths. SMEs increasingly need security help but cannot afford full-time security staff — a gap that consultants fill.',
    paths: [
      {
        title: 'Freelance Security Audits and Assessments',
        description:
          'Help small and medium businesses understand their security posture through assessments, vulnerability scans, and basic penetration testing.',
        difficulty: 'medium',
        timeToFirstIncome: '3–6 months',
        potentialIncome: '£2,000–£8,000 per month',
        examples: [
          'Basic vulnerability assessments for local businesses',
          'Security awareness training programmes',
          'GDPR and cyber security compliance reviews',
          'Small business firewall and cloud security reviews',
        ],
        gettingStarted: [
          'Get CompTIA Security+ or similar certification first',
          'Create a simple scope-of-work template for security reviews',
          'Target regulated industries (accountants, solicitors, healthcare) who need compliance help',
          'Join the CREST or NCSC Cyber Advisor scheme for credibility',
        ],
      },
      {
        title: 'Security Education and Content',
        description:
          'Create courses, YouTube content, or newsletters teaching cybersecurity concepts. The skill shortage means learning resources are in constant demand.',
        difficulty: 'medium',
        timeToFirstIncome: '3–9 months',
        potentialIncome: '£1,000–£10,000 per month',
        examples: [
          'TryHackMe walkthroughs and tutorial YouTube channel',
          'Udemy or Teachable courses on specific security topics',
          'Newsletter on current cybersecurity news for non-technical audiences',
          'CTF writeup blog that drives consulting leads',
        ],
        gettingStarted: [
          'Start a blog or YouTube channel documenting your learning journey',
          'Write CTF writeups — they attract search traffic and demonstrate skill',
          'Build an audience before trying to monetise',
          'Package your content into a structured course once you have an audience',
        ],
      },
    ],
    successStories: [
      'Many security professionals earn £3k–£6k/month on the side through SME security consulting',
      'Security YouTubers like NetworkChuck and David Bombal have built large audiences monetising cybersecurity education',
    ],
    tools: [
      'Nessus',
      'Burp Suite',
      'Kali Linux',
      'Teachable',
      'Gumroad',
      'Calendly',
    ],
    communities: [
      'r/cybersecurity',
      'ISACA',
      'CREST community',
      'Blue Team Labs Online',
    ],
  },

  {
    careerId: 'security-engineer',
    summary:
      'Security engineering skills command some of the highest freelance rates in tech. Penetration testing and AppSec consulting are particularly lucrative.',
    paths: [
      {
        title: 'Penetration Testing Consulting',
        description:
          'Provide professional penetration testing services to companies who need to test their security before attackers do.',
        difficulty: 'medium',
        timeToFirstIncome: '3–6 months',
        potentialIncome: '£400–£900 per day',
        examples: [
          'Web application penetration tests',
          'Network penetration tests for SMEs',
          'Red team exercises for larger enterprises',
          'Social engineering assessments',
        ],
        gettingStarted: [
          'Obtain CREST CRT or OSCP certification for credibility',
          'Build a professional scope-of-work and report template',
          'Partner with an established firm initially for subcontracting experience',
          'Join CREST or CHECK scheme for government and enterprise access',
        ],
      },
      {
        title: 'Security Tool Development',
        description:
          'Build and sell security tools — scanners, monitoring solutions, or developer security libraries.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£2,000–£30,000+ per month',
        examples: [
          'SaaS security scanning tools for developer workflows',
          'Security dependency auditing tools',
          'Open source security libraries with paid enterprise tiers',
        ],
        gettingStarted: [
          'Identify friction in security workflows you have personally experienced',
          'Open source the core tool, charge for cloud hosting or team features',
          'Launch on GitHub and Hacker News simultaneously',
        ],
      },
    ],
    successStories: [
      'Independent penetration testers in the UK earn £400–£900/day with CREST certification',
      'Several open-source security tools have grown into successful VC-backed companies',
    ],
    tools: [
      'Burp Suite',
      'Metasploit',
      'Cobalt Strike',
      'Stripe',
      'Lemon Squeezy',
      'GitHub',
    ],
    communities: [
      'CREST',
      'DC4420 (DEF CON London)',
      'Bug Bounty Forum',
      'r/netsec',
    ],
  },

  {
    careerId: 'cloud-engineer',
    summary:
      'Cloud consulting is one of the most lucrative freelance niches in UK tech. Businesses migrating to or optimising their cloud spend are a consistent source of well-paid work.',
    paths: [
      {
        title: 'Cloud Consulting and Architecture',
        description:
          'Help businesses design, implement, and optimise their cloud infrastructure. Particularly valuable for companies migrating from on-premise or managing rising cloud costs.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£500–£1,000 per day',
        examples: [
          'AWS or Azure migration projects for SMEs',
          'Cloud cost optimisation (FinOps) reviews',
          'Kubernetes setup and GitOps pipeline implementation',
          'Disaster recovery and backup strategy design',
        ],
        gettingStarted: [
          'Get AWS Solutions Architect Professional or GCP Professional Cloud Architect',
          'Build a clear positioning statement — "I help businesses reduce cloud costs by 30%"',
          'List on Toptal for vetted matching or use LinkedIn for direct outreach',
          'Create a cloud cost audit productised service at £2,000–£5,000 fixed price',
        ],
      },
      {
        title: 'Cloud Training and Certification Coaching',
        description:
          'Create courses or coaching programmes helping others pass cloud certifications. Certification demand is high and shows no signs of slowing.',
        difficulty: 'low',
        timeToFirstIncome: '3–9 months',
        potentialIncome: '£2,000–£15,000 per month',
        examples: [
          'AWS certification prep courses on Udemy',
          'Live bootcamps for career-changers entering cloud roles',
          'Study guides and practice exam packs',
          '1:1 certification coaching sessions',
        ],
        gettingStarted: [
          'Pass your own certifications and document the process publicly',
          'Start with a YouTube channel or blog covering certification topics',
          'Build an Udemy course once you have content proof-of-concept',
          'Join cloud communities and answer certification questions to build reputation',
        ],
      },
    ],
    successStories: [
      'Cloud engineering contractors in the UK regularly earn £500–£800/day',
      'Adrian Cantrill built a successful cloud training business with tens of thousands of students',
    ],
    tools: [
      'Terraform',
      'AWS Console',
      'Teachable',
      'Gumroad',
      'Calendly',
      'Lemon Squeezy',
    ],
    communities: [
      'AWS Community Builders',
      'Cloud Guru community',
      'r/aws',
      'CNCF Slack',
    ],
  },

  {
    careerId: 'devops-engineer',
    summary:
      'DevOps consulting is in high demand from companies who need expertise but cannot justify a full-time hire. Platform-as-a-service offerings are an emerging opportunity.',
    paths: [
      {
        title: 'DevOps and Platform Consulting',
        description:
          'Set up CI/CD pipelines, containerisation, and monitoring for companies that lack internal expertise.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£400–£800 per day',
        examples: [
          'GitHub Actions pipeline setup and optimisation',
          'Docker and Kubernetes deployment setup',
          'Monitoring and alerting implementation (Grafana, PagerDuty)',
          'Infrastructure-as-code implementation with Terraform',
        ],
        gettingStarted: [
          'Productise a specific offering — "CI/CD pipeline setup for startup teams, fixed price £3,000"',
          'Create a simple questionnaire to scope projects efficiently',
          'List on Toptal or Deel for international contracts',
          'Write case studies showing deployment time saved or reliability improved',
        ],
      },
      {
        title: 'DevOps Training and Content',
        description:
          'Create courses, workshops, or a YouTube channel covering DevOps tools and practices. High demand for quality DevOps education.',
        difficulty: 'medium',
        timeToFirstIncome: '4–12 months',
        potentialIncome: '£2,000–£20,000 per month',
        examples: [
          'Kubernetes from zero course on Udemy',
          'Docker and CI/CD workshop for developer teams',
          'YouTube channel documenting real DevOps setups',
          'Newsletter on DevOps best practices for engineering leads',
        ],
        gettingStarted: [
          'Start by documenting your real work setups in public blog posts',
          'Create a beginner tutorial that outranks existing content in search',
          'Partner with a cloud vendor for co-marketing of your content',
        ],
      },
    ],
    successStories: [
      'Senior DevOps contractors in UK banking regularly earn £700–£900/day',
      'Several DevOps educators have built audiences of 100k+ from practical tutorial content',
    ],
    tools: [
      'GitHub Actions',
      'Terraform',
      'Docker',
      'Teachable',
      'Gumroad',
      'Calendly',
    ],
    communities: [
      'DevOps Toptal community',
      'CNCF Slack',
      'r/devops',
      'SRE Weekly newsletter',
    ],
  },

  // ── Data & AI ─────────────────────────────────────────────────────────────
  {
    careerId: 'data-analyst',
    summary:
      'Data analysis consulting is accessible for early-career analysts. Most businesses have data they do not understand — and are willing to pay for insight.',
    paths: [
      {
        title: 'Freelance Data Analysis and Dashboards',
        description:
          'Help businesses make sense of their data through analysis reports and interactive dashboards.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£1,500–£6,000 per month',
        examples: [
          'Building Looker Studio or Power BI dashboards for small businesses',
          'E-commerce analytics reporting packages',
          'Monthly marketing data reports for digital agencies',
          'Customer churn analysis for SaaS companies',
        ],
        gettingStarted: [
          'Build 2–3 example dashboards using public datasets as portfolio pieces',
          'Offer a "free data audit" to a local business to demonstrate value',
          'List on Upwork with a specific niche — "e-commerce analytics specialist"',
          'Package reports as productised services with clear deliverables and price',
        ],
      },
      {
        title: 'Data Analytics Courses and Education',
        description:
          'Teach SQL, Excel, or Python for data analysis to career changers or business professionals.',
        difficulty: 'low',
        timeToFirstIncome: '3–9 months',
        potentialIncome: '£1,000–£8,000 per month',
        examples: [
          'SQL for beginners course on Udemy',
          'Excel for data analysis workshops for business teams',
          'One-on-one coaching for career-changers entering data roles',
          'Corporate Excel/Power BI training workshops',
        ],
        gettingStarted: [
          'Start with LinkedIn Learning or Udemy to validate course content',
          'Offer corporate training workshops at £500–£2,000 per session',
          'Build a personal brand around data education on LinkedIn',
        ],
      },
    ],
    successStories: [
      'Data freelancers on Toptal regularly earn £300–£550/day for analysis projects',
      'Data analysts who pivoted to teaching have built audiences of tens of thousands',
    ],
    tools: [
      'Tableau',
      'Power BI',
      'Looker Studio',
      'Upwork',
      'Calendly',
      'Notion',
    ],
    communities: [
      'Data Twitter',
      'r/dataanalysis',
      'Locally Optimistic (analytics community)',
      'dbt Slack',
    ],
  },

  {
    careerId: 'data-scientist',
    summary:
      'Data science consulting for businesses who need ML insights without a full-time hire. The ability to frame business problems in statistical terms is extremely valuable.',
    paths: [
      {
        title: 'Data Science Consulting',
        description:
          'Help businesses apply machine learning and statistical analysis to their specific problems.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£400–£900 per day',
        examples: [
          'Customer segmentation and churn prediction for SaaS',
          'Demand forecasting for retail and e-commerce',
          'Fraud detection model building',
          'A/B test design and statistical analysis',
        ],
        gettingStarted: [
          'Position around a specific industry — "data science for retail operations"',
          'Build a portfolio of case studies with real metrics (reduced churn by X%)',
          'Write LinkedIn content demonstrating data science thinking in plain language',
          'Target companies with existing data but no interpretation capability',
        ],
      },
      {
        title: 'Kaggle Competition Consulting and Coaching',
        description:
          'Coach other data scientists or help businesses compete in data challenges.',
        difficulty: 'medium',
        timeToFirstIncome: '4–10 months',
        potentialIncome: '£1,000–£5,000 per month',
        examples: [
          'Data science bootcamp instruction',
          'Kaggle competition coaching for corporate teams',
          'ML model building workshops for analytics teams',
        ],
        gettingStarted: [
          'Achieve a competitive Kaggle ranking as credibility signal',
          'Document your approach in blog posts that attract search traffic',
          'Offer structured 4-week coaching programmes at fixed price',
        ],
      },
    ],
    successStories: [
      'Data science consultants with domain expertise earn £500–£900/day',
      'Several Kaggle Grandmasters have built successful consulting practices on the back of their competition success',
    ],
    tools: [
      'Jupyter',
      'Weights & Biases',
      'Calendly',
      'Notion',
      'Stripe',
      'Loom',
    ],
    communities: [
      'Kaggle',
      'r/MachineLearning',
      'DataTalks.Club',
      'Locally Optimistic',
    ],
  },

  {
    careerId: 'ai-engineer',
    summary:
      'The hottest independent path right now. Businesses desperately need AI integration help and there are not enough engineers to meet demand.',
    paths: [
      {
        title: 'AI Integration Consulting',
        description:
          'Help businesses integrate LLMs and AI tools into their workflows and products.',
        difficulty: 'low',
        timeToFirstIncome: '1–2 months',
        potentialIncome: '£500–£1,200 per day',
        examples: [
          'LLM-powered customer support automation for SMEs',
          'Internal knowledge base and document Q&A systems',
          'Content generation pipelines for media companies',
          'AI agent workflows for business process automation',
        ],
        gettingStarted: [
          'Build 2–3 demo AI applications in your niche and share them publicly',
          'Target companies actively talking about AI on LinkedIn — offer concrete help',
          'Create a "free AI opportunity audit" as a lead generation service',
          'Price at £500–£1,000/day — the demand currently supports it',
        ],
      },
      {
        title: 'AI-Powered SaaS Products',
        description:
          'Build software products powered by AI capabilities that solve specific problems.',
        difficulty: 'medium',
        timeToFirstIncome: '3–12 months',
        potentialIncome: '£3,000–£100,000+ per month',
        examples: [
          'AI writing tools for specific industries (legal, medical, financial)',
          'Automated document processing and data extraction',
          'AI-powered research and summarisation tools',
          'Niche workflow automation powered by LLMs',
        ],
        gettingStarted: [
          'Pick a specific profession with an expensive, repetitive task',
          'Build with an LLM API (Anthropic Claude or OpenAI) as the intelligence layer',
          'Charge from day one — even a waitlist with a payment validates demand',
          'Aim for £50–£200/month per user for a B2B tool',
        ],
      },
    ],
    successStories: [
      'AI consulting is one of the fastest ways to £500/day consulting rates in 2025',
      'Several solo AI SaaS products have grown to £50k+ MRR within 12 months of launch',
    ],
    tools: [
      'Anthropic API',
      'OpenAI API',
      'LangChain',
      'Stripe',
      'Vercel',
      'Supabase',
    ],
    communities: [
      'AI Breakfast community',
      'Latent Space Discord',
      'r/LocalLLaMA',
      'IndieHackers AI',
    ],
  },

  // ── Design & Product ──────────────────────────────────────────────────────
  {
    careerId: 'product-designer',
    summary:
      'Design freelancing is well established with clear pricing norms. The ability to design and deliver complete UI/UX work makes designers highly valuable to early-stage companies.',
    paths: [
      {
        title: 'Freelance UI/UX Design',
        description:
          'Design interfaces, landing pages, and full product experiences for startups and businesses.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£2,500–£8,000 per month',
        examples: [
          'Landing page redesigns for startups',
          'Mobile app UI design for app developers',
          'Design system creation for growing product teams',
          'Figma prototypes for investor presentations',
        ],
        gettingStarted: [
          'Build a Figma-based portfolio with 3 case studies showing process and reasoning',
          'Reach out to startup communities — founders often need design help immediately',
          'Price by project — £1,500–£5,000 for a landing page, £8,000+ for a full app',
          'Collect testimonials after every project and publish them prominently',
        ],
      },
      {
        title: 'Selling Figma Templates and Design Kits',
        description:
          'Create and sell reusable design assets, UI kits, and templates on marketplaces.',
        difficulty: 'low',
        timeToFirstIncome: '2–6 months',
        potentialIncome: '£500–£4,000 per month (passive)',
        examples: [
          'Dashboard UI kits on Gumroad and UI8',
          'Mobile app design templates for specific categories',
          'Icon packs and illustration sets',
          'Brand identity template systems',
        ],
        gettingStarted: [
          'Study what sells on UI8, Creative Market, and the Figma Community',
          'Build a niche template that solves a specific need — not another generic UI kit',
          'Price at £25–£149 for templates, with team licences at higher rates',
          'Share freely on Figma Community to build audience and upgrade path to paid',
        ],
      },
      {
        title: 'UX Audits and Reviews',
        description:
          'Provide detailed UX reviews and recommendations for existing products.',
        difficulty: 'low',
        timeToFirstIncome: '2–4 months',
        potentialIncome: '£1,500–£5,000 per month',
        examples: [
          'Conversion rate and UX audit reports for e-commerce stores',
          'Mobile app usability reviews',
          'Onboarding flow analysis with recommendations',
        ],
        gettingStarted: [
          'Offer the first UX audit free to 2 businesses and use as case studies',
          'Productise at £800–£2,000 for a written audit report with screen recordings',
          'Market through LinkedIn and cold email to SaaS founders',
        ],
      },
    ],
    successStories: [
      'Many product designers earn £4k–£8k/month as freelancers after their first year',
      'Figma template sellers with popular packs earn £1,000–£3,000 per month passively',
    ],
    tools: ['Figma', 'Framer', 'Gumroad', 'UI8', 'Calendly', 'Loom', 'Notion'],
    communities: [
      'Dribbble',
      'Behance',
      'Design Twitter/X',
      'ADPList mentoring community',
      'UX Collective',
    ],
  },

  {
    careerId: 'product-manager',
    summary:
      'Fractional and consulting PM work is well established. The ability to bring structured product thinking to early-stage companies is genuinely rare and valued.',
    paths: [
      {
        title: 'Fractional Product Management',
        description:
          'Work as a part-time PM for multiple early-stage companies simultaneously.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£3,000–£10,000 per month',
        examples: [
          'Acting as Head of Product for 2 days/week at a seed-stage startup',
          'Product strategy consulting for a pivot or relaunch',
          'OKR and roadmap facilitation for growing product teams',
        ],
        gettingStarted: [
          'Build a network in startup communities — most fractional PM work comes through referrals',
          'Publish thought leadership on product topics on LinkedIn',
          'Partner with startup advisors or investors who can refer portfolio companies',
          'Price at £500–£800/day or £2,000–£4,000/month retainer for fractional work',
        ],
      },
      {
        title: 'Product Building — Indie Founder',
        description:
          'Use your product intuition to build and launch your own products.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£2,000–£100,000+ per month',
        examples: [
          'SaaS tools in domains where you have deep user insight',
          'Community or content businesses',
          'Productised consulting services',
        ],
        gettingStarted: [
          'Pick a problem where your product thinking gives you a genuine edge',
          'Validate with 10 potential users before building anything',
          'Use no-code tools to test demand before writing a line of code',
          'Hire a technical co-founder or freelance developer if needed',
        ],
      },
    ],
    successStories: [
      'Fractional PMs in the UK earn £500–£750/day once established',
      'Several ex-Google and ex-Meta PMs have built successful consulting practices',
    ],
    tools: ['Notion', 'Linear', 'Mixpanel', 'Calendly', 'Stripe', 'Substack'],
    communities: [
      "Lenny's Community",
      'Mind the Product',
      'ProductBoard community',
      'Reforge alumni',
    ],
  },

  // ── Writing & QA ─────────────────────────────────────────────────────────
  {
    careerId: 'technical-writer',
    summary:
      'Technical writing freelancing has clear demand and accessible entry points. Developer documentation is the highest-paying niche and remote-friendly.',
    paths: [
      {
        title: 'Freelance Technical Documentation',
        description:
          'Write technical documentation, API references, and developer guides for software companies.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£2,000–£6,000 per month',
        examples: [
          'API documentation for SaaS developer tools',
          'User guides for B2B software products',
          'Open-source project documentation',
          'Changelog and release note writing for product teams',
        ],
        gettingStarted: [
          'Build a portfolio by documenting a popular open-source project',
          'List on Contra, Arc.dev, and Upwork with writing samples',
          'Target developer tool companies — they have the highest documentation budgets',
          'Rate at £35–£65/hour or £200–£500/day',
        ],
      },
      {
        title: 'Developer Content Writing',
        description:
          'Write technical tutorials, blog posts, and documentation for developer-focused companies.',
        difficulty: 'low',
        timeToFirstIncome: '1–2 months',
        potentialIncome: '£1,500–£5,000 per month',
        examples: [
          'Sponsored tutorials for AWS, Cloudflare, or similar platforms',
          'Technical blog content for developer tool companies',
          'Newsletter ghostwriting for senior engineers or CTOs',
        ],
        gettingStarted: [
          'Write 3–5 high-quality public tutorials on your own blog first',
          'Apply to Write for Us programmes at developer companies (DigitalOcean, Linode)',
          'Build a personal newsletter to showcase writing quality',
          'Rate at £200–£500 per article depending on depth and subject matter',
        ],
      },
    ],
    successStories: [
      'Senior technical writers freelancing in developer documentation earn £40–£65/hour',
      'Developer advocacy roles regularly emerge from strong technical writing portfolios',
    ],
    tools: [
      'Notion',
      'Docusaurus',
      'Markdown',
      'GitHub',
      'Grammarly',
      'Hemingway Editor',
    ],
    communities: [
      'Write the Docs Slack',
      'Tech Writers Stack Exchange',
      'STC LinkedIn group',
    ],
  },

  {
    careerId: 'qa-engineer',
    summary:
      'QA consulting is accessible and growing, especially for startups that ship fast and need quality assurance without a full-time hire.',
    paths: [
      {
        title: 'Freelance QA Consulting',
        description:
          'Help startups and small teams ship with confidence through testing strategies and automated test suites.',
        difficulty: 'low',
        timeToFirstIncome: '1–3 months',
        potentialIncome: '£2,000–£6,000 per month',
        examples: [
          'Setting up Playwright test suites for web applications',
          'API testing frameworks for backend teams',
          'QA process design for early-stage startups',
          'Regression testing before major product launches',
        ],
        gettingStarted: [
          'Productise a specific offering: "Playwright test suite in 2 weeks, £2,500 fixed price"',
          'Reach out to startup communities — most early-stage teams have zero test coverage',
          'List on Toptal for access to higher-paying contracts',
          'Build case studies showing bugs caught and launches made safer',
        ],
      },
      {
        title: 'QA Tools and Automation Products',
        description:
          'Build QA tooling, test generation tools, or testing consulting services packaged as products.',
        difficulty: 'medium',
        timeToFirstIncome: '4–12 months',
        potentialIncome: '£1,000–£15,000 per month',
        examples: [
          'AI-powered test generation tools',
          'Visual regression testing utilities',
          'QA process templates and checklists sold as packages',
        ],
        gettingStarted: [
          'Identify the most painful manual testing task and build a tool to automate it',
          'Open source first, then charge for cloud-hosted version',
          'Build in public on Twitter/X and relevant developer communities',
        ],
      },
    ],
    successStories: [
      'QA engineers with automation skills command £300–£550/day as contractors',
      'Several testing-focused tools built by solo QA engineers have grown to significant revenue',
    ],
    tools: ['Playwright', 'Cypress', 'Postman', 'Stripe', 'Notion', 'Calendly'],
    communities: [
      'Ministry of Testing',
      'Test Automation University',
      'r/QualityAssurance',
      'TestingPeers Slack',
    ],
  },

  // ── Specialist & Advanced ─────────────────────────────────────────────────
  {
    careerId: 'ethical-hacker',
    summary:
      'Ethical hacking is one of the most viable specialist paths for independent work. Bug bounty hunting alone can be a full-time income at sufficient skill level.',
    paths: [
      {
        title: 'Bug Bounty Hunting',
        description:
          'Find and report vulnerabilities in companies that run public bug bounty programmes through platforms like HackerOne and Bugcrowd.',
        difficulty: 'medium',
        timeToFirstIncome: '3–12 months',
        potentialIncome: '£1,000–£50,000+ per month (variable)',
        examples: [
          'Web application vulnerability reports on HackerOne',
          'Mobile app security reports on Bugcrowd',
          'Specific disclosure reports on company VDPs',
        ],
        gettingStarted: [
          'Complete TryHackMe and Hack The Box paths first',
          'Start with less competitive programmes on HackerOne',
          'Focus on a specific class of vulnerability to build expertise fast',
          'Keep a private report of every vulnerability you find, even if duplicated',
        ],
      },
      {
        title: 'Freelance Penetration Testing',
        description:
          'Conduct formal penetration tests for businesses on a contract basis.',
        difficulty: 'medium',
        timeToFirstIncome: '3–8 months',
        potentialIncome: '£350–£1,000 per day',
        examples: [
          'Web application penetration tests',
          'Network security assessments for SMEs',
          'Social engineering and phishing exercises',
          'Cloud security assessments',
        ],
        gettingStarted: [
          'Get CREST CRT or OSCP certification',
          'Build a professional scope-of-work and report template',
          'Subcontract through established pen test firms initially',
          'Approach solicitors, accountants, and healthcare providers for compliance-driven work',
        ],
      },
    ],
    successStories: [
      'Top bug bounty hunters earn over £100,000 per year entirely from vulnerability disclosures',
      'Many ethical hackers earn £400–£700/day as independent contractors within 2 years of OSCP',
    ],
    tools: [
      'Burp Suite',
      'Metasploit',
      'Kali Linux',
      'HackerOne',
      'Bugcrowd',
      'Cobalt Strike',
    ],
    communities: [
      'Bugcrowd Discord',
      'HackerOne Community',
      'r/netsec',
      'DC4420 London DEF CON chapter',
    ],
  },

  {
    careerId: 'cloud-architect',
    summary:
      'Cloud architecture is one of the highest-value consulting niches in UK tech. Businesses spend millions on cloud infrastructure — a small percentage saved is a valuable service.',
    paths: [
      {
        title: 'Cloud Architecture and Migration Consulting',
        description:
          'Lead large-scale cloud migrations, architecture design, and infrastructure optimisation projects.',
        difficulty: 'medium',
        timeToFirstIncome: '2–4 months',
        potentialIncome: '£600–£1,200 per day',
        examples: [
          'On-premise to AWS or Azure migration projects',
          'Multi-cloud architecture design',
          'Cloud cost optimisation and FinOps reviews',
          'Kubernetes platform design and implementation',
        ],
        gettingStarted: [
          'Get AWS Solutions Architect Professional or Google Cloud Professional Architect',
          'Build a network in CTO and VP Engineering communities on LinkedIn',
          'Create a productised cloud cost audit at fixed price as a lead generator',
          'Target financial services and NHS Digital transformation programmes',
        ],
      },
      {
        title: 'Cloud Training and Certification Business',
        description:
          'Build a training business around cloud certifications and architecture patterns.',
        difficulty: 'medium',
        timeToFirstIncome: '4–12 months',
        potentialIncome: '£5,000–£30,000 per month',
        examples: [
          'AWS certification prep courses on Udemy',
          'Corporate cloud architecture workshops',
          'Live virtual bootcamps for cloud engineers',
        ],
        gettingStarted: [
          'Build a YouTube channel documenting real architecture decisions',
          'Create a landmark Udemy course on your primary cloud certification',
          'Offer team training at £2,000–£5,000 per day for corporate clients',
        ],
      },
    ],
    successStories: [
      'Cloud architects with Professional certifications consistently earn £600–£1,000/day as contractors',
      'Cloud training instructors like Stephane Maarek have trained millions of people via Udemy',
    ],
    tools: [
      'Terraform',
      'AWS/GCP/Azure',
      'Draw.io',
      'Lemon Squeezy',
      'Teachable',
      'Calendly',
    ],
    communities: [
      'AWS Community Builders',
      'GCP Champions',
      'CNCF Slack',
      'Cloud Architecture Discord',
    ],
  },

  {
    careerId: 'ml-engineer',
    summary:
      'ML consulting is in extremely high demand. Most companies know they should use ML but do not know how — a skilled ML engineer can bridge that gap.',
    paths: [
      {
        title: 'ML Engineering Consulting',
        description:
          'Help businesses build, deploy, and maintain machine learning systems in production.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£500–£1,000 per day',
        examples: [
          'Building recommendation systems for e-commerce',
          'Deploying ML models in production (FastAPI + Docker)',
          'Data pipeline and feature store design',
          'Model monitoring and retraining systems',
        ],
        gettingStarted: [
          'Build an end-to-end ML project and document it as a case study',
          'Position around a specific industry where ML adds clear ROI',
          'Write LinkedIn content on practical ML engineering — not AI hype',
          'Reach out to data teams who have models in notebooks but not in production',
        ],
      },
      {
        title: 'AI Product Building',
        description:
          'Use ML expertise to build AI-powered products that solve specific problems.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£3,000–£100,000+ per month',
        examples: [
          'Specialised AI applications for niche industries',
          'ML model marketplace or fine-tuning service',
          'AI-powered analytics products',
          'Dataset creation and curation businesses',
        ],
        gettingStarted: [
          'Find a domain problem where ML provides clear improvement over existing solutions',
          'Build MVP with existing models rather than training from scratch',
          'Sell enterprise contracts rather than SaaS initially for faster revenue',
        ],
      },
    ],
    successStories: [
      'ML consultants with production experience earn £500–£900/day',
      'Solo ML engineers have built AI products generating millions in revenue',
    ],
    tools: [
      'MLflow',
      'FastAPI',
      'Hugging Face',
      'Stripe',
      'Weights & Biases',
      'Modal Labs',
    ],
    communities: [
      'MLOps Community',
      'Hugging Face Discord',
      'DataTalks.Club',
      'r/MachineLearning',
    ],
  },

  {
    careerId: 'blockchain-developer',
    summary:
      'Smart contract auditing is the highest-value independent path — and the crypto bull markets create surges of development activity that drives consulting demand.',
    paths: [
      {
        title: 'Smart Contract Auditing',
        description:
          'Review and audit smart contracts for security vulnerabilities before deployment.',
        difficulty: 'high',
        timeToFirstIncome: '6–12 months',
        potentialIncome: '£500–£2,000 per day',
        examples: [
          'DeFi protocol security audits',
          'ERC-20 token contract reviews',
          'NFT contract security assessments',
          'Cross-chain bridge auditing',
        ],
        gettingStarted: [
          'Build deep knowledge of smart contract vulnerabilities (reentrancy, overflow, etc.)',
          'Contribute audit reports to Code4rena or Sherlock competitions',
          'Build a portfolio of public audit reports',
          'Partner with established audit firms like Trail of Bits or OpenZeppelin',
        ],
      },
      {
        title: 'Web3 Consulting and dApp Development',
        description:
          'Build decentralised applications for companies entering the blockchain space.',
        difficulty: 'medium',
        timeToFirstIncome: '2–6 months',
        potentialIncome: '£400–£1,000 per day',
        examples: [
          'NFT platforms and marketplaces',
          'Token launch smart contracts and frontends',
          'DAO tooling and governance systems',
          'DeFi integration for traditional finance companies',
        ],
        gettingStarted: [
          'Build a complete dApp project and document it publicly',
          'List on blockchain-specific talent platforms (Crypto Jobs List, Web3 Careers)',
          'Join Discord communities of projects looking for developers',
        ],
      },
    ],
    successStories: [
      'Independent smart contract auditors charge £5,000–£50,000+ per audit engagement',
      'Several solo blockchain developers have earned significant income from token appreciation alongside consulting',
    ],
    tools: [
      'Hardhat',
      'Foundry',
      'Code4rena',
      'Sherlock',
      'Etherscan',
      'OpenZeppelin',
    ],
    communities: [
      'Ethereum Magicians',
      'DeFi Discord servers',
      'Code4rena',
      'ETHGlobal hackathons',
    ],
  },

  {
    careerId: 'sre-engineer',
    summary:
      'SRE consulting is growing as companies mature their reliability engineering practices. Fractional SRE roles are emerging as a new service model.',
    paths: [
      {
        title: 'SRE and Reliability Consulting',
        description:
          'Help companies improve system reliability, implement observability, and build incident management practices.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£450–£900 per day',
        examples: [
          'SRE practice setup for growing engineering teams',
          'Incident management and postmortem process design',
          'Observability stack implementation (Prometheus, Grafana)',
          'SLO and error budget design workshops',
        ],
        gettingStarted: [
          'Get CKA and cloud certifications as baseline credibility',
          'Write case studies framed as "from X uptime to Y uptime in Z months"',
          'Target scale-ups that are starting to feel reliability pain',
          'Position as "fractional SRE" for companies too small to hire full-time',
        ],
      },
      {
        title: 'DevOps Tool Development',
        description:
          'Build tooling that solves reliability or observability problems.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£2,000–£30,000+ per month',
        examples: [
          'Incident management SaaS tools',
          'SLO tracking and alerting products',
          'Infrastructure cost optimisation tools',
        ],
        gettingStarted: [
          'Find friction you personally experience in SRE tooling',
          'Build open-source first, then offer cloud-hosted commercial tier',
          'Partner with Grafana or Prometheus ecosystem for distribution',
        ],
      },
    ],
    successStories: [
      'Senior SRE contractors in UK banking earn £600–£900/day',
      'Several incident management tools built by ex-SREs have grown into successful companies',
    ],
    tools: [
      'Prometheus',
      'Grafana',
      'PagerDuty',
      'Terraform',
      'Stripe',
      'Calendly',
    ],
    communities: [
      'Google SRE community',
      'SRE Weekly newsletter community',
      'CNCF Slack',
      'r/devops',
    ],
  },

  {
    careerId: 'platform-engineer',
    summary:
      'Platform engineering consulting is growing as companies invest in developer productivity. Fractional platform engineering is an emerging and lucrative service model.',
    paths: [
      {
        title: 'Platform Engineering Consulting',
        description:
          'Help engineering teams build internal developer platforms, CI/CD systems, and Kubernetes infrastructure.',
        difficulty: 'medium',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£450–£900 per day',
        examples: [
          'Internal developer platform setup using Backstage',
          'GitOps pipeline design with ArgoCD',
          'Kubernetes platform design for growing engineering teams',
          'Developer experience audits and improvement programmes',
        ],
        gettingStarted: [
          'Get CKA and relevant cloud certifications first',
          'Position around developer productivity — quantify the time savings you deliver',
          'Target engineering leaders (CTOs, VPEs) not just engineering managers',
          'Productise a "Platform Engineering Kickstart" at £5,000–£15,000 fixed price',
        ],
      },
      {
        title: 'Open Source Platform Tooling',
        description:
          'Build open-source platform tooling and monetise through cloud hosting, enterprise support, or training.',
        difficulty: 'high',
        timeToFirstIncome: '6–24 months',
        potentialIncome: '£2,000–£50,000+ per month',
        examples: [
          'Backstage plugins with commercial support tiers',
          'Kubernetes operator development and commercial licensing',
          'Developer portal solutions for specific industries',
        ],
        gettingStarted: [
          'Contribute to CNCF projects to build reputation and distribution',
          'Identify gaps in the existing platform engineering toolset',
          'Build in public and engage the Backstage and ArgoCD communities',
        ],
      },
    ],
    successStories: [
      'Platform engineering contractors in financial services earn £600–£900/day',
      'Several CNCF project contributors have built successful commercial companies around their tools',
    ],
    tools: ['Kubernetes', 'Backstage', 'ArgoCD', 'Helm', 'Terraform', 'Stripe'],
    communities: [
      'CNCF Slack',
      'Platform Engineering community (Slack)',
      'r/devops',
      'KubeCon',
    ],
  },

  {
    careerId: 'ai-safety-researcher',
    summary:
      'AI safety has unique entrepreneurial paths — policy advising, education, and research programmes are the most viable independent routes.',
    paths: [
      {
        title: 'AI Safety Education and Consulting',
        description:
          'Help organisations understand AI safety risks and build appropriate governance processes.',
        difficulty: 'medium',
        timeToFirstIncome: '3–8 months',
        potentialIncome: '£400–£1,000 per day',
        examples: [
          'AI governance framework design for enterprises',
          'Board-level AI risk briefings',
          'AI safety curriculum development for universities',
          'Policy advising for government technology programmes',
        ],
        gettingStarted: [
          'Publish accessible writing about AI safety for non-technical audiences',
          'Engage with policy communities and think tanks working on AI regulation',
          'Create a newsletter or blog that demonstrates expertise clearly',
          'Partner with law firms, management consultancies, or think tanks',
        ],
      },
      {
        title: 'Independent Safety Research and Writing',
        description:
          'Conduct independent research funded through grants, fellowships, or Substack-style subscriptions.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£2,000–£10,000 per month (grant-funded)',
        examples: [
          'Open Philanthropy or Long-Term Future Fund grant-funded research',
          'Substack publication on AI alignment for technical readers',
          'Independent interpretability research published on ArXiv',
        ],
        gettingStarted: [
          'Apply to EA Funds and Long-Term Future Fund for research grants',
          'Publish research writeups on the Alignment Forum to build reputation',
          'Apply to MATS or Redwood Research residency programmes',
          'Build a Substack audience while employed before going independent',
        ],
      },
    ],
    successStories: [
      'Several independent AI safety researchers receive grants of £50,000–£150,000/year',
      'AI governance consultants work with major corporations on responsible AI frameworks',
    ],
    tools: [
      'Substack',
      'Notion',
      'Anthropic/OpenAI API',
      'Calendly',
      'EA Funds application portal',
    ],
    communities: [
      'Alignment Forum',
      'EA Forum',
      'LessWrong',
      'AI Safety Slack',
      'LTFF community',
    ],
  },

  {
    careerId: 'embedded-systems-engineer',
    summary:
      'Embedded consulting is well-established in automotive, IoT, and industrial sectors. Hardware product development is the highest-potential entrepreneurial path.',
    paths: [
      {
        title: 'Embedded Systems Consulting',
        description:
          'Provide firmware development and embedded systems design for product companies.',
        difficulty: 'low',
        timeToFirstIncome: '2–5 months',
        potentialIncome: '£350–£750 per day',
        examples: [
          'Firmware development for IoT product startups',
          'Embedded driver development for hardware companies',
          'RTOS porting and integration projects',
          'Embedded security assessments for connected devices',
        ],
        gettingStarted: [
          'Build a portfolio of embedded projects with hardware photos and code on GitHub',
          'Target hardware startups on Crowdfunding platforms who need firmware help',
          'List on Toptal and Upwork as embedded C/C++ specialist',
          'Join hardware-focused startup communities and maker forums',
        ],
      },
      {
        title: 'IoT Hardware Product Development',
        description:
          'Design and build your own IoT hardware products to sell commercially.',
        difficulty: 'high',
        timeToFirstIncome: '12–24 months',
        potentialIncome: '£2,000–£50,000+ per month',
        examples: [
          'Specialised IoT sensors for niche industrial applications',
          'Smart home devices for specific use cases',
          'Agricultural monitoring systems',
          'Educational electronics kits for schools',
        ],
        gettingStarted: [
          'Start with a software-defined product to reduce hardware risk',
          'Partner with a hardware manufacturer or use PCBWay for prototyping',
          'Launch on Kickstarter or Crowd Supply to validate demand with pre-orders',
          'Sell initially through Tindie or Adafruit marketplaces',
        ],
      },
    ],
    successStories: [
      'Embedded firmware contractors in automotive earn £500–£750/day regularly',
      'Several hardware startup founders started as embedded engineers doing consulting before building products',
    ],
    tools: [
      'PlatformIO',
      'KiCad',
      'GitHub',
      'Tindie',
      'Crowd Supply',
      'Hackaday.io',
    ],
    communities: [
      'Hackaday community',
      'Embedded.fm podcast community',
      'r/embedded',
      'EEVblog forum',
    ],
  },

  {
    careerId: 'robotics-engineer',
    summary:
      'Robotics consulting is growing as automation adoption increases. The barrier to entry is high, which means competition is limited and day rates are strong.',
    paths: [
      {
        title: 'Robotics Systems Consulting',
        description:
          'Design and implement robotic systems and automation solutions for manufacturers and research organisations.',
        difficulty: 'medium',
        timeToFirstIncome: '3–8 months',
        potentialIncome: '£400–£800 per day',
        examples: [
          'Robot programming for manufacturing automation',
          'ROS2 system design and integration',
          'Autonomous navigation system consulting',
          'Robot simulation environment setup',
        ],
        gettingStarted: [
          'Build a portfolio of ROS2 projects with video demonstrations',
          'Target manufacturing companies and research institutions directly',
          'Present at ROSCon or local robotics meetups to build network',
          'Subcontract through system integrators initially for experience and contacts',
        ],
      },
      {
        title: 'Robotics Education and Curriculum',
        description:
          'Create educational content, workshops, or courses teaching robotics fundamentals.',
        difficulty: 'medium',
        timeToFirstIncome: '4–10 months',
        potentialIncome: '£1,000–£8,000 per month',
        examples: [
          'ROS2 courses on Udemy or The Construct',
          'Corporate robotics workshops for engineering teams',
          'School and university curriculum development',
        ],
        gettingStarted: [
          'Start with free tutorial content on YouTube to build audience',
          'Partner with The Construct or similar platforms for distribution',
          'Create structured learning paths for specific robot platforms',
        ],
      },
    ],
    successStories: [
      "Robotics consultants supporting the UK's growing autonomous vehicle sector earn £600–£900/day",
      'ROS2 instructors on Udemy and The Construct earn significant income from the growing learner base',
    ],
    tools: [
      'ROS2',
      'Gazebo',
      'GitHub',
      'Teachable',
      'YouTube Studio',
      'Calendly',
    ],
    communities: [
      'ROS Discourse',
      'ROSCon community',
      'r/robotics',
      'IEEE Robotics and Automation Society',
    ],
  },

  {
    careerId: 'cryptography-engineer',
    summary:
      'Cryptography consulting is one of the highest-value niches. Security audits of cryptographic implementations are rare skills commanding exceptional rates.',
    paths: [
      {
        title: 'Cryptographic Security Auditing',
        description:
          'Review cryptographic implementations for security vulnerabilities in financial, blockchain, and privacy-sensitive applications.',
        difficulty: 'high',
        timeToFirstIncome: '6–12 months',
        potentialIncome: '£600–£1,500 per day',
        examples: [
          'TLS implementation security reviews',
          'Blockchain cryptography audits',
          'End-to-end encryption implementation reviews',
          'Post-quantum cryptography migration consulting',
        ],
        gettingStarted: [
          'Build expertise through Cryptopals and open-source library contributions',
          'Publish research on cryptographic vulnerabilities found in open-source projects',
          'Partner with established security firms for initial client access',
          'Join IACR and publish at recognised venues to build research credibility',
        ],
      },
      {
        title: 'Privacy Technology Consulting',
        description:
          'Help companies implement privacy-preserving technology solutions.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£500–£1,200 per day',
        examples: [
          'Zero-knowledge proof system design and implementation',
          'Privacy-preserving machine learning consulting',
          'Secure multi-party computation projects',
          'Data anonymisation system design',
        ],
        gettingStarted: [
          'Study ZK proofs (ZK Hack challenges) as the most in-demand skill',
          'Contribute to privacy tooling open source projects',
          'Write accessible explainers on cryptographic privacy for technical audiences',
        ],
      },
    ],
    successStories: [
      'Cryptographic security auditors at firms like Trail of Bits earn extremely well — some partners earn £500,000+ per year',
      'Zero-knowledge proof consultants are in extremely short supply and command exceptional rates',
    ],
    tools: ['OpenSSL', 'libsodium', 'ZoKrates', 'Circom', 'Notion', 'Calendly'],
    communities: [
      'IACR ePrint',
      'ZK Proof community',
      'Trail of Bits blog community',
      'Cryptography Stack Exchange',
    ],
  },

  {
    careerId: 'reverse-engineer',
    summary:
      'Malware analysis and vulnerability research are high-value independent paths. The skill set is rare enough that demand consistently exceeds supply.',
    paths: [
      {
        title: 'Malware Analysis Consulting',
        description:
          'Provide malware analysis services to companies that have experienced or fear security incidents.',
        difficulty: 'medium',
        timeToFirstIncome: '4–10 months',
        potentialIncome: '£400–£900 per day',
        examples: [
          'Incident response malware analysis',
          'Threat intelligence report writing',
          'Custom malware detection signature development',
          'Forensic analysis of compromised systems',
        ],
        gettingStarted: [
          'Build public malware analysis writeups to establish credibility',
          'Get Blue Team certifications (BTLO) alongside your reverse engineering skills',
          'Reach out to incident response firms for subcontracting opportunities',
          'Publish YARA rules and detection content publicly to demonstrate capability',
        ],
      },
      {
        title: 'Vulnerability Research',
        description:
          'Find and responsibly disclose vulnerabilities in software for bounties or coordinated disclosure credits.',
        difficulty: 'high',
        timeToFirstIncome: '6–18 months',
        potentialIncome: '£1,000–£30,000+ per vulnerability (variable)',
        examples: [
          'Browser and OS vulnerability research',
          'Firmware vulnerability analysis',
          'IoT device security research',
          'Network protocol implementation bugs',
        ],
        gettingStarted: [
          'Start with CTFs and public CVE analysis to build foundational skills',
          'Set up a dedicated research environment with instrumentation tools',
          'Target software with active bug bounty programmes initially',
          'Publish findings through proper coordinated disclosure channels',
        ],
      },
    ],
    successStories: [
      'Independent security researchers have earned single six-figure payouts from critical vulnerability discoveries',
      'Malware analysts working as independent contractors for threat intelligence firms earn £500–£900/day',
    ],
    tools: [
      'Ghidra',
      'IDA Pro',
      'Wireshark',
      'x64dbg',
      'YARA',
      'Cuckoo Sandbox',
    ],
    communities: [
      'vx-underground',
      'Malware Unicorn',
      'REcon community',
      'r/Malware',
      'FIRST (Forum of Incident Response)',
    ],
  },

  {
    careerId: 'distributed-systems-engineer',
    summary:
      'Senior distributed systems engineers command the highest consulting rates in software engineering. The knowledge is rare, high-stakes, and extremely valuable.',
    paths: [
      {
        title: 'Distributed Systems Architecture Consulting',
        description:
          'Design large-scale distributed systems, review existing architectures, and advise on scaling strategies.',
        difficulty: 'medium',
        timeToFirstIncome: '2–4 months',
        potentialIncome: '£600–£1,200 per day',
        examples: [
          'Architecture review for high-growth SaaS companies',
          'Database selection and scaling strategy for scale-ups',
          'Event streaming and Kafka architecture design',
          'Technical due diligence for investors and acquirers',
        ],
        gettingStarted: [
          'Build a strong LinkedIn presence with distributed systems content',
          'Write case studies of specific scaling problems you have solved',
          'Target Series A/B/C companies experiencing growth-related scaling pain',
          'Position as a "distributed systems advisor" at £500–£1,000/day or retainer',
        ],
      },
      {
        title: 'Technical Writing and Education',
        description:
          'Create books, courses, or newsletter content on distributed systems — one of the most in-demand technical learning areas.',
        difficulty: 'medium',
        timeToFirstIncome: '4–12 months',
        potentialIncome: '£3,000–£25,000 per month',
        examples: [
          'Book on distributed systems for practitioners (self-published)',
          'Course on building distributed systems from scratch',
          'Newsletter covering distributed systems papers and patterns',
        ],
        gettingStarted: [
          'Start with blog posts explaining complex concepts clearly — this alone builds significant audience',
          'Write a landmark "how X works" article on a well-known system (Redis, Kafka, Raft)',
          'Self-publish a practical guide and promote through Hacker News and Twitter/X',
          "Partner with O'Reilly or Manning for reach and credibility",
        ],
      },
    ],
    successStories: [
      'Martin Kleppmann\'s "Designing Data-Intensive Applications" became the most-read distributed systems book in the industry',
      'Distributed systems architects with financial systems experience regularly earn £800–£1,200/day',
    ],
    tools: ['Apache Kafka', 'etcd', 'Stripe', 'Substack', 'Gumroad', 'Leanpub'],
    communities: [
      'Hacker News',
      'Papers We Love',
      'VLDB community',
      'Distributed Systems Slack',
      'the-paper-trail.org',
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getEntrepreneurshipDataByCareerId(
  careerId: string,
): CareerEntrepreneurshipData | undefined {
  return CAREER_ENTREPRENEURSHIP_DATA.find((e) => e.careerId === careerId);
}

export function getEasiestPath(careerId: string) {
  const data = getEntrepreneurshipDataByCareerId(careerId);
  if (!data) return undefined;
  const lowFirst = data.paths.find((p) => p.difficulty === 'low');
  return lowFirst ?? data.paths[0];
}
