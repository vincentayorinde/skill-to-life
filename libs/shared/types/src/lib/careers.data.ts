import type { CareerPath } from './types';

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    emoji: '🖥️',
    category: 'development',
    difficultyLevel: 'beginner',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary: 'Build the screens and flows people use every day.',
    description:
      'Frontend developers build what users see and interact with — buttons, layouts, animations, and forms. You work in the browser, turning designs into working interfaces using HTML, CSS, and JavaScript. Good fit if you enjoy seeing your work come alive quickly and thinking about how things feel to use.',
    whoItFits:
      'People who enjoy visual problem-solving, care about how things look and feel, and like fast feedback when they build.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Responsive design',
      'Accessibility',
    ],
    tools: [
      'React or Angular',
      'VS Code',
      'Git',
      'Browser DevTools',
      'Figma (for reading designs)',
      'npm or pnpm',
    ],
    tags: ['Visual', 'Code', 'Product'],
    learningStyleFit:
      'Great for visual learners who enjoy building something they can immediately see and click.',
    starterProjects: [
      'Personal portfolio site',
      'Landing page clone',
      'Quiz app',
      'Simple dashboard',
    ],
    freeResources: [
      {
        title: 'freeCodeCamp — Responsive Web Design',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
      },
      {
        title: 'The Odin Project — Foundations',
        url: 'https://www.theodinproject.com/paths/foundations',
      },
      {
        title: 'MDN — Learn Web Development',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
      },
      { title: 'javascript.info', url: 'https://javascript.info' },
      {
        title: 'Frontend Mentor — practice challenges',
        url: 'https://www.frontendmentor.io',
      },
    ],
    paidResources: [
      { title: 'Frontend Masters', url: 'https://frontendmasters.com' },
      {
        title: 'Zero to Mastery Web Dev Bootcamp',
        url: 'https://zerotomastery.io',
      },
    ],
    salaryInsight:
      'Junior: $50k–$70k · Mid: $80k–$110k · Senior: $120k–$160k+ (USD — varies widely by location and company)',
    entrepreneurshipIdeas: [
      'Freelance web design and development',
      'Build and sell UI templates or components',
      'Create SaaS tools as a solo developer',
      'Offer landing page builds for small businesses',
    ],
    roadmapPreview: [
      'Learn HTML and CSS basics',
      'Build your first static web pages',
      'Learn JavaScript fundamentals',
      'Build interactive browser projects',
      'Learn a framework (React or Angular)',
      'Learn Git and version control',
      'Build 2–3 portfolio projects',
      'Apply for junior roles',
    ],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    slug: 'backend-developer',
    emoji: '⚙️',
    category: 'development',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Build the logic and systems that power apps behind the scenes.',
    description:
      'Backend developers work on the server side — building APIs, handling data, managing authentication, and writing the business logic that makes products work. You rarely see your output directly, but you power everything users do.',
    whoItFits:
      "People who enjoy systems thinking, working with data, and solving problems that don't have a visible face.",
    skills: [
      'Node.js or Python',
      'REST APIs',
      'SQL databases',
      'Authentication',
      'Data modelling',
      'Server deployment',
    ],
    tools: [
      'Node.js',
      'NestJS or Express',
      'PostgreSQL or MongoDB',
      'Postman',
      'Docker',
      'Git',
    ],
    tags: ['Systems', 'Logic', 'APIs'],
    learningStyleFit:
      'Good for methodical learners who enjoy understanding how systems connect under the hood.',
    starterProjects: [
      'REST API for a to-do app',
      'User login and registration system',
      'Blog API with CRUD operations',
      'URL shortener service',
    ],
    freeResources: [
      {
        title: 'The Odin Project — Node.js path',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
      },
      {
        title: 'Full Stack Open (University of Helsinki)',
        url: 'https://fullstackopen.com/en/',
      },
      {
        title: 'freeCodeCamp — Back End Certification',
        url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
      },
      { title: 'SQLZoo — interactive SQL', url: 'https://sqlzoo.net' },
      {
        title: 'PostgreSQL Tutorial',
        url: 'https://www.postgresqltutorial.com',
      },
    ],
    paidResources: [
      { title: 'Node.js, Express, MongoDB Bootcamp', url: 'https://udemy.com' },
      { title: 'Backend with TypeScript — NestJS', url: 'https://udemy.com' },
    ],
    salaryInsight:
      'Junior: $60k–$80k · Mid: $90k–$120k · Senior: $130k–$180k+ (USD — fintech and enterprise pay at the top)',
    entrepreneurshipIdeas: [
      'Freelance API development for startups',
      'Build developer tools or libraries',
      'Offer backend consulting',
      'Build and run a SaaS product',
    ],
    roadmapPreview: [
      'Learn a programming language (JavaScript or Python)',
      'Understand HTTP and how the web works',
      'Build simple REST APIs',
      'Learn SQL and database basics',
      'Add authentication to your projects',
      'Learn deployment basics (Railway, Fly.io, or Heroku)',
      'Build a full API project',
      'Apply for backend or full-stack roles',
    ],
  },
  {
    id: 'fullstack-developer',
    title: 'Full-stack Developer',
    slug: 'fullstack-developer',
    emoji: '🔀',
    category: 'development',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Work across both the visible interface and the systems that power it.',
    description:
      'Full-stack developers build the complete picture — both the frontend users see and the backend that runs it. You can take a feature from idea to screen, handling the database, API, and UI yourself. This makes you versatile and in high demand, especially at startups.',
    whoItFits:
      "Builders who enjoy owning a feature end to end and don't want to be limited to just one side of the stack.",
    skills: [
      'HTML/CSS/JavaScript',
      'A backend language (Node or Python)',
      'REST APIs',
      'SQL databases',
      'Git',
      'Deployment basics',
    ],
    tools: [
      'React or Angular',
      'Node.js',
      'PostgreSQL',
      'VS Code',
      'Git',
      'Docker',
    ],
    tags: ['Builder', 'Code', 'Product'],
    learningStyleFit:
      'Perfect for self-starters who enjoy building complete, working products from scratch.',
    starterProjects: [
      'Full-stack to-do app with auth',
      'Blog platform with comments',
      'E-commerce store with cart',
      'Personal dashboard',
    ],
    freeResources: [
      {
        title: 'The Odin Project — Full Stack JavaScript',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript',
      },
      {
        title: 'Full Stack Open (University of Helsinki)',
        url: 'https://fullstackopen.com/en/',
      },
      { title: 'javascript.info', url: 'https://javascript.info' },
      { title: 'SQLZoo — SQL basics', url: 'https://sqlzoo.net' },
      {
        title: 'Docker — Get Started',
        url: 'https://docs.docker.com/get-started/',
      },
    ],
    paidResources: [
      { title: 'Complete Web Developer Bootcamp', url: 'https://udemy.com' },
      { title: 'Zero to Mastery Full Stack', url: 'https://zerotomastery.io' },
    ],
    salaryInsight:
      'Junior: $65k–$85k · Mid: $95k–$130k · Senior: $140k–$190k+ (USD — startup market is especially strong)',
    entrepreneurshipIdeas: [
      'Build and launch a SaaS product solo',
      'Freelance as a solo developer for startups',
      'Offer end-to-end web development',
      'Build internal tools for businesses',
    ],
    roadmapPreview: [
      'Master HTML, CSS, and JavaScript',
      'Build a frontend framework project (React or Angular)',
      'Learn a backend language and framework',
      'Connect frontend to a real API',
      'Learn database design basics',
      'Add authentication and deploy',
      'Build a complete product',
      'Apply for full-stack or startup roles',
    ],
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    emoji: '🛡️',
    category: 'security',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary:
      'Protect people and businesses by spotting threats before they cause damage.',
    description:
      "Cybersecurity analysts monitor systems, investigate suspicious activity, and help organisations stay safe from attacks. You think like an attacker to defend like a protector. It's a role that blends technical skills with investigative thinking.",
    whoItFits:
      'Curious people who notice details others miss, enjoy investigation and puzzles, and care about protecting people and systems.',
    skills: [
      'Networking basics (TCP/IP, DNS)',
      'Threat detection',
      'Incident response',
      'Vulnerability scanning',
      'Security monitoring',
      'Risk analysis',
    ],
    tools: [
      'Wireshark',
      'Splunk or similar SIEM',
      'Nmap',
      'Linux terminal',
      'Metasploit (for testing)',
      'NIST framework',
    ],
    tags: ['Security', 'Investigation', 'Risk'],
    learningStyleFit:
      'Good for analytical learners who enjoy thinking through problems from multiple angles.',
    starterProjects: [
      'Home lab with virtual machines',
      'CTF challenges on TryHackMe',
      'Network traffic analysis exercises',
      'Build a simple security audit checklist',
    ],
    freeResources: [
      {
        title: 'TryHackMe — beginner paths',
        url: 'https://tryhackme.com/paths',
      },
      {
        title: 'Professor Messer — Security+ course (free)',
        url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
      },
      {
        title: 'Cybrary — free security courses',
        url: 'https://www.cybrary.it',
      },
      {
        title: 'Linux Journey',
        url: 'https://linuxjourney.com',
      },
      {
        title: 'OverTheWire — Bandit wargame',
        url: 'https://overthewire.org/wargames/bandit/',
      },
    ],
    paidResources: [
      { title: 'CompTIA Security+ prep course', url: 'https://comptia.org' },
      { title: 'TryHackMe Premium', url: 'https://tryhackme.com' },
    ],
    salaryInsight:
      'Junior: $55k–$75k · Mid: $85k–$115k · Senior: $120k–$160k+ (USD — certifications significantly increase salaries)',
    entrepreneurshipIdeas: [
      'Freelance security auditing for small businesses',
      'Run security awareness training workshops',
      'Build security checker tools',
      'Offer compliance consulting',
    ],
    roadmapPreview: [
      'Learn networking fundamentals (TCP/IP, DNS, HTTP)',
      'Get comfortable with Linux',
      'Study security fundamentals (CIA triad, threats, defences)',
      'Start CTF challenges on TryHackMe',
      'Get CompTIA Security+ certified',
      'Apply for a junior SOC analyst role',
      'Specialise in cloud security, incident response, or pen testing',
    ],
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    slug: 'security-engineer',
    emoji: '🔐',
    category: 'security',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Design and build the security systems that protect organisations at scale.',
    description:
      'Security engineers go beyond analysis — they build tools, write secure code, and architect defences from the ground up. Where analysts detect and respond, engineers build the systems that prevent problems. It requires strong programming skills on top of security knowledge.',
    whoItFits:
      'Experienced developers who want to specialise in security, or security analysts who enjoy building tools and systems.',
    skills: [
      'Secure coding practices',
      'Cloud security (AWS/Azure)',
      'Identity and access management',
      'Threat modelling',
      'Penetration testing',
      'Security automation',
    ],
    tools: [
      'Python or Go',
      'AWS security tools',
      'Terraform',
      'Burp Suite',
      'HashiCorp Vault',
      'Git',
    ],
    tags: ['Security', 'Engineering', 'Infrastructure'],
    learningStyleFit:
      'Best for experienced technical learners who want to build security systems, not just monitor them.',
    starterProjects: [
      'Secure authentication system from scratch',
      'Automated vulnerability scanner',
      'Secrets management tool',
      'Security CI/CD pipeline',
    ],
    freeResources: [
      {
        title: 'OWASP Top 10',
        url: 'https://owasp.org/www-project-top-ten/',
      },
      {
        title: 'PortSwigger Web Security Academy (free)',
        url: 'https://portswigger.net/web-security',
      },
      {
        title: 'Hack The Box — free tier',
        url: 'https://app.hackthebox.com',
      },
      {
        title: 'TryHackMe — free paths',
        url: 'https://tryhackme.com/paths',
      },
      {
        title: 'Linux Journey',
        url: 'https://linuxjourney.com',
      },
    ],
    paidResources: [
      {
        title: 'OSCP — Offensive Security',
        url: 'https://offensive-security.com',
      },
      {
        title: 'Cloud security certifications (AWS/GCP)',
        url: 'https://aws.amazon.com',
      },
    ],
    salaryInsight:
      'Junior: $80k–$100k · Mid: $110k–$145k · Senior: $150k–$210k+ (USD — one of the highest-paid tech specialisms)',
    entrepreneurshipIdeas: [
      'Penetration testing as a service',
      'Security consulting for startups',
      'Bug bounty hunting',
      'Build and sell security developer tools',
    ],
    roadmapPreview: [
      'Master programming fundamentals (Python or Go)',
      'Learn networking and Linux deeply',
      'Study cryptography and authentication',
      'Learn cloud security basics',
      'Practice penetration testing (CTFs, Hack The Box)',
      'Get OSCP or a cloud security cert',
      'Contribute to open-source security projects',
      'Apply for AppSec or security engineering roles',
    ],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    emoji: '☁️',
    category: 'development',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Help apps stay online, scale up, and run reliably in the cloud.',
    description:
      'Cloud engineers design and manage the infrastructure that modern applications run on. Instead of physical servers, you work with cloud platforms like AWS, Azure, or GCP — provisioning resources, controlling costs, and keeping systems available and fast.',
    whoItFits:
      'People who enjoy systems thinking, infrastructure problems, and making sure critical services stay online and performant.',
    skills: [
      'Cloud platforms (AWS/Azure/GCP)',
      'Infrastructure as code (Terraform)',
      'Networking',
      'Linux',
      'Cost optimisation',
      'Monitoring and observability',
    ],
    tools: [
      'AWS or Azure',
      'Terraform',
      'Kubernetes',
      'Linux CLI',
      'CloudWatch or Datadog',
      'Git',
    ],
    tags: ['Cloud', 'Infrastructure', 'Scale'],
    learningStyleFit:
      'Good for people who enjoy building invisible but critical systems that others depend on.',
    starterProjects: [
      'Deploy a web app to AWS free tier',
      'Write Terraform infrastructure for a simple app',
      'Build a serverless function with AWS Lambda',
      'Set up monitoring and alerting for an app',
    ],
    freeResources: [
      { title: 'AWS Skill Builder', url: 'https://skillbuilder.aws' },
      {
        title: 'Google Cloud Skills Boost',
        url: 'https://cloudskillsboost.google',
      },
      { title: 'KodeKloud free labs', url: 'https://kodekloud.com' },
      {
        title: 'HashiCorp Terraform tutorials',
        url: 'https://developer.hashicorp.com/terraform/tutorials',
      },
      {
        title: 'Kubernetes interactive basics',
        url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
      },
    ],
    paidResources: [
      {
        title: 'AWS Solutions Architect certification',
        url: 'https://aws.amazon.com',
      },
      { title: 'A Cloud Guru', url: 'https://acloudguru.com' },
    ],
    salaryInsight:
      'Junior: $70k–$90k · Mid: $100k–$135k · Senior: $140k–$190k+ (USD — cloud certifications significantly increase earnings)',
    entrepreneurshipIdeas: [
      'Cloud consulting for small businesses',
      'Help startups set up infrastructure',
      'FinOps consulting (cloud cost reduction)',
      'Build cloud automation tools',
    ],
    roadmapPreview: [
      'Learn Linux fundamentals',
      'Understand networking basics',
      'Explore the AWS or Azure free tier',
      'Learn Infrastructure as Code (Terraform)',
      'Get your first cloud cert (AWS Cloud Practitioner)',
      'Learn Kubernetes basics',
      'Build a real cloud project',
      'Apply for cloud or infrastructure roles',
    ],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    emoji: '🔄',
    category: 'development',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Help teams ship faster by automating the path from code to production.',
    description:
      'DevOps engineers connect development and operations — automating deployments, building CI/CD pipelines, and keeping software shipping reliably. You reduce friction between writing code and getting it to users, and improve the experience of building products.',
    whoItFits:
      'People who love automation, hate repetitive manual steps, and enjoy making the developer experience better for their team.',
    skills: [
      'CI/CD pipelines',
      'Docker and containers',
      'Linux',
      'Bash or Python scripting',
      'Cloud platforms',
      'Monitoring and alerting',
    ],
    tools: [
      'GitHub Actions or Jenkins',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Prometheus / Grafana',
      'Linux CLI',
    ],
    tags: ['Automation', 'Reliability', 'Delivery'],
    learningStyleFit:
      'Great for systematic thinkers who enjoy removing bottlenecks and building better processes.',
    starterProjects: [
      'Set up a CI/CD pipeline for a web app',
      'Dockerise an existing application',
      'Automate deployment to a cloud platform',
      'Build a monitoring dashboard with Grafana',
    ],
    freeResources: [
      {
        title: 'roadmap.sh — DevOps roadmap',
        url: 'https://roadmap.sh/devops',
      },
      {
        title: 'Play with Docker (free)',
        url: 'https://labs.play-with-docker.com',
      },
      {
        title: 'GitHub Actions — official docs',
        url: 'https://docs.github.com/en/actions',
      },
      {
        title: 'Kubernetes — interactive tutorial',
        url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
      },
      {
        title: 'Prometheus — getting started',
        url: 'https://prometheus.io/docs/prometheus/latest/getting_started/',
      },
    ],
    paidResources: [
      {
        title: 'Docker and Kubernetes: The Complete Guide',
        url: 'https://udemy.com',
      },
      { title: 'KodeKloud DevOps learning path', url: 'https://kodekloud.com' },
    ],
    salaryInsight:
      'Junior: $70k–$90k · Mid: $100k–$135k · Senior: $145k–$185k+ (USD — Kubernetes and cloud skills command a premium)',
    entrepreneurshipIdeas: [
      'DevOps consulting for startups',
      'Platform engineering as a service',
      'Build developer experience tooling',
      'Offer CI/CD pipeline audits',
    ],
    roadmapPreview: [
      'Learn Linux and Bash scripting',
      'Get comfortable with Git and version control',
      'Learn Docker and containerisation',
      'Build a CI/CD pipeline from scratch',
      'Learn Kubernetes basics',
      'Study cloud platforms (AWS or Azure)',
      'Learn Infrastructure as Code',
      'Apply for DevOps or platform engineer roles',
    ],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    slug: 'data-analyst',
    emoji: '📊',
    category: 'data-ai',
    difficultyLevel: 'beginner',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary: 'Find patterns in data and help teams make better decisions.',
    description:
      'Data analysts explore datasets to find trends, answer business questions, and tell clear stories through visualisations. You work with real-world data to help teams understand what happened and why — combining curiosity, numbers, and communication.',
    whoItFits:
      'Curious people who ask "why" often, enjoy finding patterns, and like presenting their findings clearly to others.',
    skills: [
      'SQL',
      'Excel or Google Sheets',
      'Data visualisation',
      'Python or R basics',
      'Statistical thinking',
      'Business communication',
    ],
    tools: [
      'SQL (PostgreSQL or MySQL)',
      'Python (pandas)',
      'Tableau or Power BI',
      'Google Looker Studio',
      'Jupyter Notebooks',
      'Excel',
    ],
    tags: ['Data', 'Insight', 'Business'],
    learningStyleFit:
      'Great for structured learners who enjoy investigating questions and communicating answers clearly.',
    starterProjects: [
      'Sales dashboard in Tableau or Looker Studio',
      'SQL analysis of a public dataset',
      'Python data cleaning project',
      'Customer churn or sales trend analysis',
    ],
    freeResources: [
      {
        title: 'Google Data Analytics Certificate (audit free)',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
      },
      { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
      {
        title: 'Kaggle Learn — SQL',
        url: 'https://www.kaggle.com/learn/intro-to-sql',
      },
      {
        title: 'SQLZoo — interactive SQL practice',
        url: 'https://sqlzoo.net',
      },
      {
        title: 'Tableau Public — free training',
        url: 'https://public.tableau.com/app/learn/how-to-videos',
      },
    ],
    paidResources: [
      {
        title: 'Google Data Analytics Professional Certificate',
        url: 'https://coursera.org',
      },
      { title: 'Data Analyst Bootcamp', url: 'https://udemy.com' },
    ],
    salaryInsight:
      'Junior: $45k–$65k · Mid: $70k–$95k · Senior: $100k–$130k+ (USD — finance and tech companies pay at the top)',
    entrepreneurshipIdeas: [
      'Freelance data analyst for small businesses',
      'Build data dashboards as a service',
      'Offer e-commerce analytics consulting',
      'Sell market research reports',
    ],
    roadmapPreview: [
      'Learn Excel or Google Sheets',
      'Learn SQL basics (joins, filters, aggregations)',
      'Learn a visualisation tool (Tableau or Power BI)',
      'Study Python basics with pandas',
      'Work with real datasets on Kaggle',
      'Build a portfolio dashboard project',
      'Apply for analyst roles in your industry',
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    slug: 'data-scientist',
    emoji: '🔬',
    category: 'data-ai',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Use statistics and machine learning to answer hard questions with data.',
    description:
      'Data scientists build predictive models, run experiments, and extract deep insights from large datasets. You combine programming, statistics, and domain expertise to help organisations understand not just what happened, but why — and what comes next.',
    whoItFits:
      'Analytical thinkers who enjoy maths, statistics, running experiments, and building models that make predictions.',
    skills: [
      'Python',
      'Statistics and probability',
      'Machine learning',
      'Data wrangling',
      'Model evaluation',
      'SQL',
    ],
    tools: [
      'Python (scikit-learn, pandas, numpy)',
      'Jupyter Notebooks',
      'TensorFlow or PyTorch',
      'SQL',
      'Matplotlib / Seaborn',
      'MLflow',
    ],
    tags: ['Data', 'Models', 'Research'],
    learningStyleFit:
      'Best for patient, methodical learners who enjoy theory-grounded work and iterative experimentation.',
    starterProjects: [
      'Titanic survival prediction on Kaggle',
      'House price regression model',
      'Sentiment analysis on product reviews',
      'Customer churn prediction',
    ],
    freeResources: [
      {
        title: 'fast.ai — Practical Deep Learning',
        url: 'https://course.fast.ai',
      },
      {
        title: 'Kaggle Learn — Intro to Machine Learning',
        url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
      },
      {
        title: 'StatQuest with Josh Starmer (YouTube)',
        url: 'https://www.youtube.com/@statquest',
      },
      {
        title: 'Deep Learning Book (free)',
        url: 'https://www.deeplearningbook.org',
      },
      {
        title: '3Blue1Brown — Neural Networks series',
        url: 'https://www.3blue1brown.com/topics/neural-networks',
      },
    ],
    paidResources: [
      {
        title: 'Machine Learning Specialisation (Andrew Ng)',
        url: 'https://coursera.org',
      },
      {
        title: 'Data Science Specialisation (Johns Hopkins)',
        url: 'https://coursera.org',
      },
    ],
    salaryInsight:
      'Junior: $80k–$100k · Mid: $110k–$145k · Senior: $150k–$200k+ (USD — high demand in tech, finance, and healthcare)',
    entrepreneurshipIdeas: [
      'Freelance ML model development',
      'Build AI-powered SaaS tools',
      'Offer predictive analytics consulting',
      'Publish datasets or trained models commercially',
    ],
    roadmapPreview: [
      'Learn Python fundamentals well',
      'Study statistics and probability',
      'Learn pandas and data manipulation',
      'Study ML fundamentals with scikit-learn',
      'Build models on Kaggle',
      'Study deep learning basics',
      'Build a full end-to-end data science project',
      'Apply for data scientist or ML engineer roles',
    ],
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    slug: 'ai-engineer',
    emoji: '🤖',
    category: 'data-ai',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Build real products powered by machine learning models and LLMs.',
    description:
      'AI engineers design and build applications that use AI models — from integrating APIs to building entire AI-powered pipelines. You bridge the gap between research and shipping, turning model capabilities into reliable, useful products that people actually use.',
    whoItFits:
      'Builders who want to use AI to solve real problems, combine software engineering with cutting-edge models, and ship useful tools.',
    skills: [
      'Python',
      'LLM APIs (OpenAI, Anthropic)',
      'Prompt engineering',
      'Vector databases',
      'API design',
      'Software engineering',
    ],
    tools: [
      'Python',
      'LangChain or LlamaIndex',
      'OpenAI or Anthropic SDK',
      'Pinecone or Weaviate',
      'FastAPI',
      'Docker',
    ],
    tags: ['AI', 'Code', 'Models'],
    learningStyleFit:
      'Great for experimental builders who want to combine engineering with the latest AI capabilities.',
    starterProjects: [
      'Chatbot over your own documents (RAG)',
      'AI-powered content summariser',
      'Semantic search over a knowledge base',
      'LLM-powered task automation tool',
    ],
    freeResources: [
      {
        title: 'fast.ai — Practical Deep Learning',
        url: 'https://course.fast.ai',
      },
      {
        title: 'Hugging Face — NLP Course',
        url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
      },
      {
        title: 'Anthropic API Documentation',
        url: 'https://docs.anthropic.com',
      },
      {
        title: 'Andrej Karpathy — Neural Networks: Zero to Hero',
        url: 'https://www.youtube.com/@AndrejKarpathy',
      },
      {
        title: 'OpenAI API Documentation',
        url: 'https://platform.openai.com/docs',
      },
    ],
    paidResources: [
      {
        title: 'LLM Bootcamp — Full Stack Deep Learning',
        url: 'https://fullstackdeeplearning.com',
      },
      { title: 'Building AI Apps with LangChain', url: 'https://udemy.com' },
    ],
    salaryInsight:
      'Junior: $90k–$115k · Mid: $120k–$160k · Senior: $160k–$220k+ (USD — one of the fastest-growing and highest-paid roles in tech)',
    entrepreneurshipIdeas: [
      'Build AI SaaS tools (writing, productivity, research)',
      'Offer AI integration consulting',
      'Fine-tune and sell models for specific industries',
      'Build internal AI tools for businesses',
    ],
    roadmapPreview: [
      'Master Python programming',
      'Learn ML fundamentals',
      'Understand LLMs and prompt engineering',
      'Build with LLM APIs (OpenAI or Anthropic)',
      'Learn vector databases and retrieval (RAG)',
      'Build a complete AI-powered product',
      'Study deployment and MLOps basics',
      'Apply for AI or ML engineer roles',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    slug: 'product-designer',
    emoji: '🎨',
    category: 'design-product',
    difficultyLevel: 'beginner',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary:
      'Design how apps look, feel, and solve real problems for real people.',
    description:
      'Product designers shape the experience people have with digital products — from the flow of an app to the feel of every button. You combine visual design, user research, and systems thinking to make products that are beautiful, usable, and honest.',
    whoItFits:
      'Creative people with empathy for users who enjoy the intersection of aesthetics and problem-solving.',
    skills: [
      'UI design',
      'UX design',
      'Wireframing and prototyping',
      'User research basics',
      'Design systems',
      'Visual hierarchy',
    ],
    tools: [
      'Figma',
      'FigJam',
      'Maze (user testing)',
      'Zeroheight',
      'Notion',
      'Loom',
    ],
    tags: ['Creative', 'UX', 'Research'],
    learningStyleFit:
      'Great for visual learners who enjoy rapid iteration, user feedback, and making things beautiful.',
    starterProjects: [
      'Redesign an app you use daily',
      'Design a mobile onboarding flow',
      'Build a design system from scratch',
      'Run a usability test on an existing product',
    ],
    freeResources: [
      {
        title: 'Google UX Design Certificate (audit free)',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
      },
      {
        title: 'Figma — official tutorials',
        url: 'https://help.figma.com/hc/en-us/categories/360002051613-Get-started',
      },
      { title: 'Laws of UX', url: 'https://lawsofux.com' },
      {
        title: 'Nielsen Norman Group — free UX articles',
        url: 'https://www.nngroup.com/articles/',
      },
      {
        title: 'Figma Community — templates',
        url: 'https://www.figma.com/community',
      },
    ],
    paidResources: [
      {
        title: 'Google UX Design Professional Certificate',
        url: 'https://coursera.org',
      },
      { title: 'UI Design Bootcamp (Scrimba)', url: 'https://scrimba.com' },
    ],
    salaryInsight:
      'Junior: $55k–$75k · Mid: $85k–$115k · Senior: $120k–$170k+ (USD — strong portfolio matters more than a degree)',
    entrepreneurshipIdeas: [
      'Freelance UI/UX design',
      'Sell Figma templates and design resources',
      'Offer UX audits for apps',
      'Start a design agency with partners',
    ],
    roadmapPreview: [
      'Learn design fundamentals (colour, typography, layout)',
      'Get comfortable with Figma',
      'Study UX principles and how to research users',
      'Redesign existing apps for practice',
      'Learn design systems',
      'Build a portfolio of 3–5 case studies',
      'Apply for junior product design or UX roles',
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    slug: 'product-manager',
    emoji: '🧭',
    category: 'design-product',
    difficultyLevel: 'intermediate',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Turn ideas, user needs, and business goals into a product people love.',
    description:
      'Product managers decide what gets built and why. You work with designers, developers, and stakeholders to prioritise features, define roadmaps, and make sure the product creates real value. Strong communication and judgment matter more than coding ability.',
    whoItFits:
      'Strong communicators who enjoy leadership, solving ambiguous problems, and sitting at the intersection of users, business, and engineering.',
    skills: [
      'Product strategy',
      'User research',
      'Roadmap planning',
      'Stakeholder management',
      'Data-driven decisions',
      'Writing clear specs',
    ],
    tools: [
      'Jira or Linear',
      'Notion',
      'Figma (for collaboration)',
      'Amplitude or Mixpanel',
      'Confluence',
      'Slack',
    ],
    tags: ['Strategy', 'People', 'Product'],
    learningStyleFit:
      'Suits people who learn through experience, studying real products, and working closely with others.',
    starterProjects: [
      'Write a PRD for an app idea you have',
      'Run a user interview and synthesise findings',
      'Build a product roadmap for an existing app',
      'Critique and improve a product feature publicly',
    ],
    freeResources: [
      {
        title: "Lenny's Newsletter (free tier)",
        url: 'https://www.lennysnewsletter.com',
      },
      {
        title: 'Shape Up — free book by Basecamp',
        url: 'https://basecamp.com/shapeup',
      },
      {
        title: 'Product School — free resources',
        url: 'https://productschool.com/resources',
      },
      {
        title: 'Nielsen Norman Group — UX research methods',
        url: 'https://www.nngroup.com/articles/',
      },
      {
        title: 'Mode SQL Tutorial (for data-driven PMs)',
        url: 'https://mode.com/sql-tutorial/',
      },
    ],
    paidResources: [
      { title: 'Reforge Product Management', url: 'https://reforge.com' },
      {
        title: 'Product Management Certification',
        url: 'https://productschool.com',
      },
    ],
    salaryInsight:
      'Junior: $75k–$95k · Mid: $110k–$145k · Senior: $150k–$220k+ (USD — top PMs at major companies earn exceptionally well)',
    entrepreneurshipIdeas: [
      'Start your own SaaS product',
      'Fractional PM consulting for startups',
      'Product coaching and mentoring',
      'Build a productised service around a skill you have',
    ],
    roadmapPreview: [
      'Learn PM fundamentals (discovery, roadmapping, delivery)',
      'Study successful products and why they work',
      'Run user interviews and research',
      'Write product specs (PRDs) for practice',
      'Contribute to projects as a PM or PM-adjacent role',
      'Get an APM or associate PM role',
      'Build toward senior PM or specialisation',
    ],
  },
  {
    id: 'technical-writer',
    title: 'Technical Writer',
    slug: 'technical-writer',
    emoji: '✍️',
    category: 'writing-qa',
    difficultyLevel: 'beginner',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary: 'Explain technical ideas in a way people can actually understand.',
    description:
      'Technical writers create documentation, guides, and tutorials that help people understand and use technical products. You bridge the gap between complex systems and the people who use them — making the hard stuff clear, concise, and approachable. No heavy coding required.',
    whoItFits:
      'Strong writers who enjoy research, understanding systems, and explaining things clearly to different audiences.',
    skills: [
      'Clear writing',
      'Docs tooling (GitBook, Docusaurus)',
      'API documentation',
      'Markdown',
      'Information architecture',
      'Empathy for the reader',
    ],
    tools: [
      'Markdown',
      'GitBook or Docusaurus',
      'Notion',
      'GitHub',
      'Grammarly',
      'Figma (for screenshots)',
    ],
    tags: ['Writing', 'Docs', 'Teaching'],
    learningStyleFit:
      'Perfect for people who enjoy research, structure, and communicating complex ideas simply and clearly.',
    starterProjects: [
      'Write docs for an open-source project',
      'Create a beginner guide to an API you use',
      'Document a project you built',
      'Rewrite confusing documentation for a tool you know',
    ],
    freeResources: [
      {
        title: 'Google Technical Writing courses (free)',
        url: 'https://developers.google.com/tech-writing',
      },
      {
        title: 'Write the Docs — community and guide',
        url: 'https://www.writethedocs.org/guide/',
      },
      {
        title: 'Diátaxis — documentation framework',
        url: 'https://diataxis.fr',
      },
      {
        title: 'Markdown Guide',
        url: 'https://www.markdownguide.org',
      },
      {
        title: 'Good Docs Project — templates',
        url: 'https://www.thegooddocsproject.dev',
      },
    ],
    paidResources: [
      {
        title: 'Technical Writing Certification (Udemy)',
        url: 'https://udemy.com',
      },
      { title: 'API Documentation Course (Udemy)', url: 'https://udemy.com' },
    ],
    salaryInsight:
      'Junior: $50k–$70k · Mid: $75k–$100k · Senior: $110k–$145k+ (USD — API and developer documentation writers earn significantly more)',
    entrepreneurshipIdeas: [
      'Freelance technical writing and docs',
      'Ghostwrite developer blogs and tutorials',
      'Offer docs-as-a-service to startups',
      'Create and sell online courses for developers',
    ],
    roadmapPreview: [
      'Develop strong writing fundamentals',
      'Learn Markdown and docs tools (Docusaurus, GitBook)',
      'Study developer documentation best practices',
      'Contribute docs to an open-source project',
      'Learn API documentation basics (OpenAPI/Swagger)',
      'Build a writing portfolio',
      'Apply for technical writer or developer advocate roles',
    ],
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    slug: 'qa-engineer',
    emoji: '🧪',
    category: 'writing-qa',
    difficultyLevel: 'beginner',
    remoteFriendly: true,
    beginnerFriendly: true,
    summary:
      'Test products, catch problems, and help teams ship with confidence.',
    description:
      "QA engineers make sure software works the way it should before it reaches users. You design test plans, find bugs, write automated tests, and work with developers to improve quality. You're the last line of defence before a release — and a great team values you deeply for it.",
    whoItFits:
      'Detail-oriented people who spot what others miss, take pride in precision, and enjoy a methodical approach to breaking things.',
    skills: [
      'Test planning and design',
      'Manual testing',
      'Automated testing basics',
      'Bug reporting',
      'API testing',
      'Regression testing',
    ],
    tools: [
      'Playwright or Cypress (automation)',
      'Postman (API testing)',
      'Jira or Linear (bugs)',
      'GitHub',
      'TestRail',
      'Browser DevTools',
    ],
    tags: ['Quality', 'Testing', 'Detail'],
    learningStyleFit:
      'Suits methodical learners who enjoy structured investigation and have a talent for spotting edge cases.',
    starterProjects: [
      'Write manual test cases for a web app you use',
      'Automate login and form tests with Playwright',
      'Build a test suite for a public API with Postman',
      'Create a regression test plan for an existing product',
    ],
    freeResources: [
      {
        title: 'Playwright — official documentation',
        url: 'https://playwright.dev/docs/intro',
      },
      {
        title: 'ISTQB Foundation study materials',
        url: 'https://www.istqb.org/certifications/certified-tester-foundation-level',
      },
      {
        title: 'Ministry of Testing (free resources)',
        url: 'https://www.ministryoftesting.com',
      },
      {
        title: 'Postman Learning Centre',
        url: 'https://learning.postman.com',
      },
      {
        title: 'GitHub Actions — test automation',
        url: 'https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing',
      },
    ],
    paidResources: [
      {
        title: 'Test Automation University (Applitools)',
        url: 'https://testautomationu.applitools.com',
      },
      { title: 'Playwright with TypeScript (Udemy)', url: 'https://udemy.com' },
    ],
    salaryInsight:
      'Junior: $45k–$65k · Mid: $70k–$95k · Senior: $100k–$130k+ (USD — automation skills significantly increase QA salaries)',
    entrepreneurshipIdeas: [
      'Freelance QA testing for startups',
      'Offer automated test suite setup as a service',
      'Build testing tooling and sell it',
      'QA consulting and process improvement',
    ],
    roadmapPreview: [
      'Learn software testing fundamentals',
      'Practice manual testing on real apps',
      'Learn a testing framework (Playwright or Cypress)',
      'Study API testing with Postman',
      'Write automated test suites',
      'Learn CI/CD test integration',
      'Get ISTQB Foundation certified',
      'Apply for QA or SDET roles',
    ],
  },
  // ── Specialist & Advanced ──────────────────────────────────────────────────

  {
    id: 'ethical-hacker',
    title: 'Ethical Hacker / Penetration Tester',
    slug: 'ethical-hacker',
    emoji: '🕵️',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Get paid to break into systems — legally.',
    description:
      'Ethical hackers are hired to attack systems before the bad guys can — finding vulnerabilities in networks, apps, and infrastructure, then writing up exactly how they did it. You work with a mix of scripting, deep technical knowledge, and creative thinking to find weaknesses others miss. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy puzzles, think like attackers, and get a kick out of finding the flaw nobody else noticed.',
    skills: [
      'Network security',
      'Vulnerability assessment',
      'Social engineering',
      'Scripting',
      'Report writing',
    ],
    tools: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap', 'Wireshark'],
    tags: ['Security', 'Hacking', 'Advanced'],
    learningStyleFit:
      'Suits hands-on learners who thrive on puzzles and are comfortable with trial and error.',
    starterProjects: [
      'Complete a beginner room on TryHackMe',
      'Set up a home lab with a vulnerable VM and attack it',
      'Write a Python port scanner from scratch',
      'Capture the Flag (CTF) writeup on a public challenge',
    ],
    freeResources: [
      {
        title: 'TryHackMe — Jr Penetration Tester path',
        url: 'https://tryhackme.com/path/outline/jrpenetrationtester',
      },
      {
        title: 'Hack The Box — Starting Point',
        url: 'https://app.hackthebox.com/starting-point',
      },
      {
        title: 'OverTheWire — Bandit wargame',
        url: 'https://overthewire.org/wargames/bandit/',
      },
      {
        title: 'PortSwigger Web Security Academy (free)',
        url: 'https://portswigger.net/web-security',
      },
      { title: 'picoCTF — beginner CTF', url: 'https://picoctf.org' },
    ],
    paidResources: [
      {
        title: 'TCM Security — Practical Ethical Hacking course',
        url: 'https://tcm-sec.com',
      },
      {
        title: 'Offensive Security — OSCP certification',
        url: 'https://offensive-security.com',
      },
    ],
    salaryInsight:
      'Junior: £30k–£45k · Mid: £50k–£75k · Senior: £80k–£120k+ (UK — bug bounty income can supplement significantly)',
    entrepreneurshipIdeas: [
      'Freelance penetration testing for SMBs',
      'Bug bounty hunting on HackerOne or Bugcrowd',
      'Security consultancy and assessments',
      'Running CTF events and security training',
    ],
    roadmapPreview: [
      'Learn networking fundamentals — TCP/IP, DNS, HTTP',
      'Get comfortable with the Linux command line',
      'Study ethical hacking with TryHackMe or Hack The Box',
      'Learn scripting in Python or Bash',
      'Pursue CEH or OSCP certification',
      'Practice on legal CTF challenges',
      'Build a portfolio of writeups',
    ],
  },

  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    slug: 'cloud-architect',
    emoji: '☁️',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Design the infrastructure that powers modern software.',
    description:
      'Cloud architects design the systems that modern companies run on — choosing the right services, designing for scale and resilience, and keeping costs under control. You work across networking, security, databases, and compute to make sure everything holds together under real-world load. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy systems thinking, like understanding how the pieces fit together, and want to work at the architectural level rather than feature level.',
    skills: [
      'Cloud platforms',
      'Networking',
      'Security',
      'Cost optimisation',
      'Infrastructure as code',
      'System design',
    ],
    tools: [
      'AWS / Azure / GCP',
      'Terraform',
      'Kubernetes',
      'Docker',
      'Ansible',
    ],
    tags: ['Cloud', 'Infrastructure', 'Advanced'],
    learningStyleFit:
      'Suits structured learners who enjoy reading documentation and working through certifications.',
    starterProjects: [
      'Deploy a static website to S3 with a CloudFront CDN',
      'Build a serverless API with Lambda and API Gateway',
      'Provision infrastructure with Terraform on a free tier',
      'Set up a basic Kubernetes cluster with a sample app',
    ],
    freeResources: [
      {
        title: 'AWS Skill Builder — free tier',
        url: 'https://skillbuilder.aws',
      },
      {
        title: 'Google Cloud Skills Boost',
        url: 'https://cloudskillsboost.google',
      },
      {
        title: 'KodeKloud — free Kubernetes labs',
        url: 'https://kodekloud.com',
      },
      {
        title: 'HashiCorp Terraform tutorials (free)',
        url: 'https://developer.hashicorp.com/terraform/tutorials',
      },
      {
        title: 'System Design Primer (GitHub)',
        url: 'https://github.com/donnemartin/system-design-primer',
      },
    ],
    paidResources: [
      {
        title: 'AWS Solutions Architect Associate (A Cloud Guru)',
        url: 'https://acloudguru.com',
      },
      {
        title: 'HashiCorp Terraform Associate certification',
        url: 'https://developer.hashicorp.com',
      },
    ],
    salaryInsight:
      'Junior: £40k–£55k · Mid: £65k–£90k · Senior: £100k–£150k+ (UK — senior cloud architects are among the highest-paid engineers)',
    entrepreneurshipIdeas: [
      'Cloud consultancy for startups and SMBs',
      'Architecture reviews and well-architected assessments',
      'Freelance infrastructure work',
      'Cloud training and certification coaching',
    ],
    roadmapPreview: [
      'Learn one cloud platform deeply — start with AWS',
      'Get AWS Solutions Architect Associate certified',
      'Learn networking fundamentals',
      'Study infrastructure as code with Terraform',
      'Learn Kubernetes and container orchestration',
      'Study system design and scalability patterns',
      'Get professional-level certification',
    ],
  },

  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    slug: 'ml-engineer',
    emoji: '🤖',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Build the systems that learn from data and make predictions.',
    description:
      'Machine learning engineers build, train, and deploy models that improve with data — from recommendation engines to fraud detection to language models. You sit at the intersection of software engineering and data science, making sure models actually work in production. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy mathematics, like building things that improve over time, and want to work on some of the most impactful technology being built today.',
    skills: [
      'Python',
      'Mathematics',
      'Statistics',
      'Model training',
      'Data pipelines',
      'MLOps',
      'Deep learning',
    ],
    tools: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'Jupyter',
      'MLflow',
      'Hugging Face',
    ],
    tags: ['AI / ML', 'Data', 'Advanced'],
    learningStyleFit:
      'Suits structured learners who enjoy mathematics and working through courses with strong theoretical foundations.',
    starterProjects: [
      'Train a classifier on the Iris or MNIST dataset',
      'Build a sentiment analyser with scikit-learn',
      'Fine-tune a pre-trained model with Hugging Face',
      'Deploy an ML model as a REST API with FastAPI',
    ],
    freeResources: [
      {
        title: 'Machine Learning Specialisation — Andrew Ng (Coursera)',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
      },
      {
        title: 'fast.ai — Practical Deep Learning for Coders',
        url: 'https://course.fast.ai',
      },
      {
        title: 'Kaggle Learn — Intro to Machine Learning',
        url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
      },
      {
        title: 'PyTorch — official tutorials',
        url: 'https://pytorch.org/tutorials/',
      },
      {
        title: '3Blue1Brown — Essence of Linear Algebra',
        url: 'https://www.3blue1brown.com/topics/linear-algebra',
      },
    ],
    paidResources: [
      {
        title: 'Deep Learning Specialisation (Coursera)',
        url: 'https://www.coursera.org/specializations/deep-learning',
      },
      {
        title: 'Zero to Mastery — PyTorch for Deep Learning',
        url: 'https://zerotomastery.io',
      },
    ],
    salaryInsight:
      'Junior: £40k–£55k · Mid: £65k–£90k · Senior: £100k–£140k+ (UK — one of the fastest-growing specialisms in tech)',
    entrepreneurshipIdeas: [
      'AI consulting for non-tech businesses',
      'Building AI-powered SaaS products',
      'Selling fine-tuned models or datasets',
      'ML research and publications',
    ],
    roadmapPreview: [
      'Get strong in Python and mathematics',
      'Learn statistics and linear algebra basics',
      'Study machine learning fundamentals',
      'Work through the Andrew Ng ML course',
      'Learn deep learning with PyTorch or TensorFlow',
      'Build end-to-end ML projects',
      'Learn MLOps and model deployment',
    ],
  },

  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    slug: 'blockchain-developer',
    emoji: '⛓️',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Build decentralised applications and smart contracts.',
    description:
      'Blockchain developers build applications that run on distributed networks — writing smart contracts that execute automatically, building DeFi protocols, and creating applications that operate without a central authority. The space moves fast and the technical bar is high. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People with strong programming fundamentals who are genuinely curious about decentralised systems and want to work in a fast-moving, high-stakes domain.',
    skills: [
      'Solidity',
      'Cryptography',
      'Distributed systems',
      'JavaScript',
      'Security',
      'Web3',
    ],
    tools: [
      'Ethereum',
      'Solidity',
      'Hardhat',
      'Web3.js',
      'ethers.js',
      'MetaMask',
      'IPFS',
    ],
    tags: ['Blockchain', 'Web3', 'Advanced'],
    learningStyleFit:
      'Suits self-directed learners who are comfortable building in an evolving ecosystem with sparse documentation.',
    starterProjects: [
      'Deploy a Hello World smart contract on a testnet',
      'Build a simple token (ERC-20) in Solidity',
      'Create a basic NFT minting page',
      'Connect a React frontend to a smart contract with ethers.js',
    ],
    freeResources: [
      {
        title: 'CryptoZombies — learn Solidity interactively',
        url: 'https://cryptozombies.io',
      },
      {
        title: 'Ethereum developer documentation',
        url: 'https://ethereum.org/en/developers/docs/',
      },
      {
        title: 'Patrick Collins — Web3 courses (YouTube)',
        url: 'https://www.youtube.com/@PatrickAlphaC',
      },
      {
        title: 'Solidity — official documentation',
        url: 'https://docs.soliditylang.org',
      },
      {
        title: 'Hardhat — development environment docs',
        url: 'https://hardhat.org/docs',
      },
    ],
    paidResources: [
      {
        title: 'Alchemy University — web3 developer bootcamp',
        url: 'https://university.alchemy.com',
      },
      {
        title: 'Cyfrin Updraft — Solidity security',
        url: 'https://updraft.cyfrin.io',
      },
    ],
    salaryInsight:
      'Junior: £35k–£50k · Mid: £60k–£90k · Senior: £100k–£160k+ (UK — highly variable; token compensation common)',
    entrepreneurshipIdeas: [
      'DeFi protocol development',
      'NFT platforms and tooling',
      'Web3 consultancy for traditional businesses',
      'Token launch and DAO tooling',
    ],
    roadmapPreview: [
      'Learn JavaScript and programming fundamentals',
      'Understand how blockchain and Bitcoin work',
      'Learn Ethereum and smart contracts',
      'Study Solidity programming language',
      'Build simple smart contracts and deploy to testnet',
      'Learn DeFi protocols and security patterns',
      'Build a full Web3 application',
    ],
  },

  {
    id: 'sre-engineer',
    title: 'Site Reliability Engineer',
    slug: 'sre-engineer',
    emoji: '⚙️',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Keep large-scale systems running fast and reliably.',
    description:
      'Site reliability engineers are the people who keep production systems alive — building the automation, monitoring, and runbooks that mean things stay up even when they want to fall over. You write code, respond to incidents, and constantly improve how reliable a system is. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy systems thinking, stay calm under pressure, and get satisfaction from preventing problems before they happen.',
    skills: [
      'Linux',
      'Automation',
      'Monitoring',
      'Incident response',
      'Distributed systems',
      'Programming',
    ],
    tools: [
      'Kubernetes',
      'Prometheus',
      'Grafana',
      'Terraform',
      'PagerDuty',
      'Ansible',
      'Python / Go',
    ],
    tags: ['SRE', 'Infrastructure', 'Advanced'],
    learningStyleFit:
      'Suits hands-on learners who enjoy reading engineering postmortems and learning from real-world system failures.',
    starterProjects: [
      'Set up Prometheus and Grafana to monitor a local service',
      'Write an Ansible playbook to configure a server',
      'Simulate an incident and write a postmortem',
      'Build a basic health-check and alerting system',
    ],
    freeResources: [
      {
        title: 'Google SRE Book (free online)',
        url: 'https://sre.google/sre-book/table-of-contents/',
      },
      {
        title: 'Linux Foundation — Introduction to Linux (free)',
        url: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
      },
      {
        title: 'Kubernetes — interactive basics tutorial',
        url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
      },
      {
        title: 'A Tour of Go',
        url: 'https://go.dev/tour/',
      },
      {
        title: 'Prometheus — getting started',
        url: 'https://prometheus.io/docs/prometheus/latest/getting_started/',
      },
    ],
    paidResources: [
      {
        title: 'Linux Foundation — SRE and DevOps certifications',
        url: 'https://training.linuxfoundation.org',
      },
      {
        title: 'KodeKloud — Kubernetes and DevOps courses',
        url: 'https://kodekloud.com',
      },
    ],
    salaryInsight:
      'Junior: £40k–£55k · Mid: £65k–£85k · Senior: £90k–£130k+ (UK — on-call responsibilities often come with additional pay)',
    entrepreneurshipIdeas: [
      'SRE and reliability consultancy',
      'DevOps tooling products',
      'Reliability coaching for engineering teams',
      'Platform-as-a-service products',
    ],
    roadmapPreview: [
      'Get solid with Linux systems administration',
      'Learn programming in Python or Go',
      'Study networking and distributed systems',
      'Learn Kubernetes and container orchestration',
      'Study observability — metrics, logs, traces',
      'Learn incident management and on-call practices',
      'Read the Google SRE book (free online)',
    ],
  },

  {
    id: 'platform-engineer',
    title: 'Platform Engineer',
    slug: 'platform-engineer',
    emoji: '🏗️',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Build the internal platforms that other engineers build on top of.',
    description:
      'Platform engineers build and maintain the developer experience inside a company — the pipelines, tooling, and abstractions that let product teams ship faster and more safely. Think of it as building the roads other engineers drive on. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy making other developers more productive and care about developer experience as much as end-user experience.',
    skills: [
      'Kubernetes',
      'CI/CD',
      'Developer tooling',
      'Infrastructure',
      'APIs',
      'Automation',
    ],
    tools: [
      'Kubernetes',
      'Helm',
      'ArgoCD',
      'GitHub Actions',
      'Backstage',
      'Terraform',
      'Docker',
    ],
    tags: ['Platform', 'DevOps', 'Advanced'],
    learningStyleFit:
      'Suits systematic learners who enjoy building things that improve other engineers lives.',
    starterProjects: [
      'Build a CI/CD pipeline with GitHub Actions from scratch',
      'Set up a local Kubernetes cluster with Minikube',
      'Create a Helm chart for a sample application',
      'Build a simple internal developer portal with Backstage',
    ],
    freeResources: [
      {
        title: 'GitHub Actions — official documentation',
        url: 'https://docs.github.com/en/actions',
      },
      {
        title: 'CNCF landscape guide — platform engineering',
        url: 'https://landscape.cncf.io',
      },
      { title: 'Backstage — official docs', url: 'https://backstage.io/docs' },
      {
        title: 'Kubernetes — tutorials',
        url: 'https://kubernetes.io/docs/tutorials/',
      },
      {
        title: 'Argo CD — getting started',
        url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/',
      },
    ],
    paidResources: [
      {
        title: 'KodeKloud — Kubernetes and Helm',
        url: 'https://kodekloud.com',
      },
      {
        title: 'A Cloud Guru — DevOps and platform engineering',
        url: 'https://acloudguru.com',
      },
    ],
    salaryInsight:
      'Junior: £40k–£55k · Mid: £65k–£85k · Senior: £90k–£120k+ (UK — growing fast as companies invest in developer productivity)',
    entrepreneurshipIdeas: [
      'Developer tooling products and SaaS',
      'Platform engineering consultancy',
      'Open source tools and monetisation',
      'Developer experience audits',
    ],
    roadmapPreview: [
      'Learn software engineering fundamentals',
      'Get strong with Linux and containers',
      'Learn Kubernetes deeply',
      'Study CI/CD pipeline design',
      'Learn infrastructure as code',
      'Study internal developer platform patterns',
      'Contribute to open source platform tooling',
    ],
  },

  {
    id: 'ai-safety-researcher',
    title: 'AI Safety Researcher',
    slug: 'ai-safety-researcher',
    emoji: '🔬',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary: 'Make sure powerful AI systems behave safely and as intended.',
    description:
      'AI safety researchers study how to make powerful AI systems reliable, interpretable, and aligned with human intentions. The work is a mix of theoretical research, empirical experiments, and writing — and the stakes are considered very high by those in the field. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People with strong maths and research ability who want to work on one of the most consequential open problems in technology.',
    skills: [
      'Machine learning',
      'Mathematics',
      'Research',
      'Alignment theory',
      'Interpretability',
      'Writing',
    ],
    tools: [
      'Python',
      'PyTorch',
      'Research papers',
      'Jupyter',
      'Statistical analysis tools',
    ],
    tags: ['AI Safety', 'Research', 'Advanced'],
    learningStyleFit:
      'Suits deep, independent learners who enjoy reading academic literature and working on open-ended problems.',
    starterProjects: [
      'Replicate a key result from an AI safety paper',
      'Write a summary of a core alignment research agenda',
      'Run interpretability experiments on a small transformer',
      'Complete the ARENA curriculum exercises',
    ],
    freeResources: [
      {
        title: 'ARENA curriculum — alignment and interpretability',
        url: 'https://arena.education',
      },
      {
        title: 'AI Safety Fundamentals — BlueDot Impact',
        url: 'https://aisafetyfundamentals.com',
      },
      {
        title: 'Alignment Forum — research posts',
        url: 'https://www.alignmentforum.org',
      },
      {
        title: 'fast.ai — Practical Deep Learning',
        url: 'https://course.fast.ai',
      },
      {
        title: 'Deep Learning Book — Goodfellow et al. (free)',
        url: 'https://www.deeplearningbook.org',
      },
    ],
    paidResources: [
      {
        title: 'MATS — research programme for aspiring safety researchers',
        url: 'https://matsprogram.org',
      },
      {
        title: 'Deep Learning Specialisation (Coursera)',
        url: 'https://coursera.org',
      },
    ],
    salaryInsight:
      'Junior: £45k–£60k · Mid: £70k–£100k · Senior: £110k–£160k+ (UK — research roles at top labs pay significantly above market)',
    entrepreneurshipIdeas: [
      'AI safety consultancy for developers',
      'Research lab founding',
      'Policy advising and writing',
      'AI safety education and curriculum development',
    ],
    roadmapPreview: [
      'Get strong in mathematics and statistics',
      'Learn machine learning deeply',
      'Study AI alignment and safety literature',
      'Read key papers from Anthropic, DeepMind, and OpenAI safety teams',
      'Work through the ARENA or MATS curriculum',
      'Publish research writeups or summaries',
      'Apply to safety research fellowships or programmes',
    ],
  },

  {
    id: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    slug: 'embedded-systems-engineer',
    emoji: '🔌',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: false,
    beginnerFriendly: false,
    summary:
      'Write software that runs directly on hardware — from chips to cars.',
    description:
      'Embedded systems engineers write the software that lives inside hardware — microcontrollers, medical devices, vehicles, and industrial equipment. The code is low-level, performance is critical, and debugging requires different tools from web development. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who like understanding how things work at the hardware level and enjoy the discipline of writing tight, correct code with no room for error.',
    skills: [
      'C',
      'C++',
      'Real-time systems',
      'Hardware interfaces',
      'Debugging',
      'Electronics basics',
      'RTOS',
    ],
    tools: [
      'C / C++',
      'GDB',
      'Oscilloscope',
      'STM32',
      'Raspberry Pi',
      'FreeRTOS',
      'JTAG',
    ],
    tags: ['Embedded', 'Hardware', 'Advanced'],
    learningStyleFit:
      'Suits methodical learners who enjoy working close to the metal and reading datasheets and technical specs.',
    starterProjects: [
      'Blink an LED on an Arduino or STM32 board',
      'Build a temperature logger with a sensor and serial output',
      'Implement a basic UART communication protocol',
      'Write a simple task scheduler using FreeRTOS',
    ],
    freeResources: [
      {
        title: 'Embedded.fm — podcast and community',
        url: 'https://embedded.fm',
      },
      {
        title: 'SparkFun — electronics tutorials',
        url: 'https://learn.sparkfun.com',
      },
      {
        title: 'FreeRTOS — official documentation',
        url: 'https://www.freertos.org/Documentation/RTOS_book.html',
      },
      {
        title: 'CS50x — C programming (weeks 1–4)',
        url: 'https://cs50.harvard.edu/x',
      },
      {
        title: 'Arduino official tutorials',
        url: 'https://docs.arduino.cc/tutorials/',
      },
    ],
    paidResources: [
      {
        title: 'Fastbit EBA — embedded C masterclass',
        url: 'https://fastbitlab.com',
      },
      {
        title: 'Modern Embedded Systems Programming (Udemy)',
        url: 'https://udemy.com',
      },
    ],
    salaryInsight:
      'Junior: £30k–£45k · Mid: £50k–£70k · Senior: £75k–£110k+ (UK — aerospace and automotive commands significant premiums)',
    entrepreneurshipIdeas: [
      'Hardware product development and consulting',
      'IoT device development',
      'Firmware contracting for manufacturers',
      'Electronics project tutorials and courses',
    ],
    roadmapPreview: [
      'Learn C programming deeply',
      'Understand basic electronics and circuits',
      'Get a microcontroller dev kit and start experimenting',
      'Learn real-time operating systems',
      'Study hardware communication protocols (I2C, SPI, UART)',
      'Build embedded projects from scratch',
      'Learn debugging with hardware tools',
    ],
  },

  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    slug: 'robotics-engineer',
    emoji: '🦾',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: false,
    beginnerFriendly: false,
    summary: 'Build machines that sense, think, and move in the real world.',
    description:
      'Robotics engineers design and program systems that interact with the physical world — from factory automation to surgical robots to autonomous vehicles. The work combines software, mathematics, and an understanding of how mechanical systems behave. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who want their software to have a physical presence in the world and enjoy the challenge of bridging the gap between code and hardware.',
    skills: [
      'Python',
      'C++',
      'ROS',
      'Kinematics',
      'Computer vision',
      'Control systems',
      'Mechanical understanding',
    ],
    tools: [
      'ROS / ROS2',
      'Python',
      'C++',
      'Gazebo simulator',
      'OpenCV',
      'MATLAB',
      'Arduino',
    ],
    tags: ['Robotics', 'Hardware', 'Advanced'],
    learningStyleFit:
      'Suits learners who enjoy combining theory and practical building, and are comfortable working across disciplines.',
    starterProjects: [
      'Build a line-following robot with Arduino',
      'Program a robot arm simulation in Gazebo',
      'Implement object detection with OpenCV',
      'Write a basic PID controller from scratch',
    ],
    freeResources: [
      {
        title: 'ROS2 — official tutorials',
        url: 'https://docs.ros.org/en/rolling/Tutorials.html',
      },
      {
        title: 'The Construct — free ROS learning',
        url: 'https://theconstructsim.com',
      },
      {
        title: 'MIT OpenCourseWare — Intro to Robotics',
        url: 'https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/',
      },
      {
        title: 'OpenCV official tutorials',
        url: 'https://docs.opencv.org/4.x/d9/df8/tutorial_root.html',
      },
      {
        title: '3Blue1Brown — Essence of Linear Algebra',
        url: 'https://www.3blue1brown.com/topics/linear-algebra',
      },
    ],
    paidResources: [
      { title: 'Udemy — ROS2 for Beginners', url: 'https://udemy.com' },
      {
        title: 'Coursera — Robotics Specialisation (Penn)',
        url: 'https://coursera.org',
      },
    ],
    salaryInsight:
      'Junior: £30k–£45k · Mid: £50k–£75k · Senior: £80k–£120k+ (UK — defence and automotive sectors pay at the top end)',
    entrepreneurshipIdeas: [
      'Robotics consulting and automation projects',
      'Drone startups and services',
      'Automation products for SMBs',
      'Research spin-out companies',
    ],
    roadmapPreview: [
      'Learn Python and C++ programming',
      'Study mathematics — linear algebra and calculus',
      'Learn ROS (Robot Operating System)',
      'Study kinematics and control theory basics',
      'Build simple robot projects',
      'Learn computer vision with OpenCV',
      'Work in simulation before real hardware',
    ],
  },

  {
    id: 'cryptography-engineer',
    title: 'Cryptography Engineer',
    slug: 'cryptography-engineer',
    emoji: '🔐',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Design and implement the mathematical systems that keep data secure.',
    description:
      'Cryptography engineers design and implement the protocols that protect digital communication, from TLS to end-to-end encryption. The work is deeply mathematical and requires an ability to reason carefully about security properties and attack models. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy rigorous mathematical thinking and want to work in a specialism where precision is everything and mistakes have real consequences.',
    skills: [
      'Mathematics',
      'Cryptographic protocols',
      'C / C++ / Rust',
      'Security analysis',
      'Research',
      'Implementation',
    ],
    tools: ['OpenSSL', 'Rust', 'C', 'Python', 'Academic papers', 'SageMath'],
    tags: ['Cryptography', 'Security', 'Advanced'],
    learningStyleFit:
      'Suits deep learners who enjoy mathematics, reading papers, and working through the theory before touching implementation.',
    starterProjects: [
      'Implement AES encryption from scratch in Python',
      'Build a simple RSA key pair generator',
      'Work through the Cryptopals challenges',
      'Audit an open source cryptography library for misuse',
    ],
    freeResources: [
      {
        title: 'Cryptopals challenges — hands-on cryptography',
        url: 'https://cryptopals.com',
      },
      {
        title: 'Cryptography I — Dan Boneh (Coursera, free audit)',
        url: 'https://www.coursera.org/learn/crypto',
      },
      {
        title: 'Crypto 101 — free introductory book',
        url: 'https://crypto101.io',
      },
      {
        title: 'The Rust Programming Language (free book)',
        url: 'https://doc.rust-lang.org/book/',
      },
      {
        title: 'Khan Academy — cryptography',
        url: 'https://www.khanacademy.org/computing/computer-science/cryptography',
      },
    ],
    paidResources: [
      {
        title: 'Applied Cryptography (Coursera specialisation)',
        url: 'https://coursera.org',
      },
      {
        title: 'Real World Cryptography (book by David Wong)',
        url: 'https://realworldcryptography.com',
      },
    ],
    salaryInsight:
      'Junior: £40k–£55k · Mid: £65k–£90k · Senior: £95k–£140k+ (UK — specialist roles at banks and security firms pay at the top end)',
    entrepreneurshipIdeas: [
      'Security consultancy and cryptographic auditing',
      'Privacy-preserving technology products',
      'Protocol design consulting',
      'Security training and education',
    ],
    roadmapPreview: [
      'Get strong in mathematics — number theory and algebra',
      'Learn a systems language like C or Rust',
      'Study cryptography fundamentals',
      'Work through a cryptography course or textbook',
      'Study real-world protocol implementations',
      'Learn to audit and find vulnerabilities',
      'Contribute to open source cryptography projects',
    ],
  },

  {
    id: 'reverse-engineer',
    title: 'Reverse Engineer / Malware Analyst',
    slug: 'reverse-engineer',
    emoji: '🧬',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Take apart software to understand how it works — especially when it is malicious.',
    description:
      'Reverse engineers analyse compiled software without access to the source code — used to understand malware, find vulnerabilities, and validate security claims. The work requires patience, strong fundamentals in how computers actually work, and a knack for pattern recognition. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who love understanding how things work under the hood and enjoy detective-style investigation more than building new features.',
    skills: [
      'Assembly language',
      'C',
      'Debugging',
      'Malware analysis',
      'Binary analysis',
      'Patience',
    ],
    tools: [
      'Ghidra',
      'IDA Pro',
      'x64dbg',
      'Wireshark',
      'Python',
      'Cuckoo sandbox',
      'YARA',
    ],
    tags: ['Reverse Engineering', 'Security', 'Advanced'],
    learningStyleFit:
      'Suits independent, detail-oriented learners who enjoy puzzle-solving and are not put off by spending hours on a single problem.',
    starterProjects: [
      'Reverse a simple crackme binary using Ghidra',
      'Write a basic YARA rule to detect a malware pattern',
      'Analyse a malware sample in a sandboxed VM',
      'Solve a binary exploitation challenge on pwn.college',
    ],
    freeResources: [
      {
        title: 'Malware Unicorn — free analysis workshops',
        url: 'https://malwareunicorn.org',
      },
      {
        title: 'pwn.college — binary exploitation platform',
        url: 'https://pwn.college',
      },
      {
        title: 'ANY.RUN — interactive malware sandbox',
        url: 'https://any.run',
      },
      {
        title: 'Ghidra — NSA reverse engineering tool (free)',
        url: 'https://ghidra-sre.org',
      },
      {
        title: 'picoCTF — beginner CTF challenges',
        url: 'https://picoctf.org',
      },
    ],
    paidResources: [
      {
        title: 'TCM Security — Practical Malware Analysis',
        url: 'https://tcm-sec.com',
      },
      {
        title: 'OpenSecurityTraining2 — architecture courses',
        url: 'https://ost2.fyi',
      },
    ],
    salaryInsight:
      'Junior: £35k–£50k · Mid: £55k–£80k · Senior: £85k–£130k+ (UK — government and defence pay top rates for cleared analysts)',
    entrepreneurshipIdeas: [
      'Malware analysis consulting',
      'Threat intelligence research and reporting',
      'Security tooling development',
      'Incident response consulting',
    ],
    roadmapPreview: [
      'Learn C programming and how memory works',
      'Study x86/x64 assembly language basics',
      'Learn how operating systems work internally',
      'Start with static analysis using Ghidra',
      'Learn dynamic analysis and debugging',
      'Analyse real malware samples in safe environments',
      'Study obfuscation and anti-analysis techniques',
    ],
  },

  {
    id: 'distributed-systems-engineer',
    title: 'Distributed Systems Engineer',
    slug: 'distributed-systems-engineer',
    emoji: '🌐',
    category: 'specialist-advanced',
    difficultyLevel: 'advanced',
    remoteFriendly: true,
    beginnerFriendly: false,
    summary:
      'Build software systems that work reliably across many machines at once.',
    description:
      'Distributed systems engineers tackle some of the hardest problems in computer science — making software that is consistent, available, and fault-tolerant when spread across many machines. You work on databases, message queues, consensus algorithms, and the infrastructure that large-scale systems depend on. This path takes time to get into but pays off significantly. Good fit if you enjoy deep technical problems and want to specialise in something most people never attempt.',
    whoItFits:
      'People who enjoy deep computer science, like thinking about edge cases and failure modes, and want to work on the foundations that the rest of the industry builds on.',
    skills: [
      'Distributed computing',
      'Consensus algorithms',
      'Go / Java / Rust',
      'Database internals',
      'Networking',
    ],
    tools: ['Go', 'Java', 'Apache Kafka', 'etcd', 'Cassandra', 'Redis', 'gRPC'],
    tags: ['Distributed Systems', 'Backend', 'Advanced'],
    learningStyleFit:
      'Suits learners who enjoy reading textbooks and papers, and who want a deep theoretical foundation before building.',
    starterProjects: [
      'Implement a key-value store with basic replication',
      'Build a simple message queue from scratch',
      'Work through the MIT 6.824 Distributed Systems labs',
      'Implement the Raft consensus algorithm',
    ],
    freeResources: [
      {
        title: 'MIT 6.824 — Distributed Systems (free)',
        url: 'https://pdos.csail.mit.edu/6.824/',
      },
      {
        title: 'Designing Data-Intensive Applications — companion site',
        url: 'https://dataintensive.net',
      },
      {
        title: 'The Paper Trail — distributed systems blog',
        url: 'https://www.the-paper-trail.org',
      },
      {
        title: 'A Tour of Go — official Go tutorial',
        url: 'https://go.dev/tour/',
      },
      {
        title: 'Apache Kafka — official documentation',
        url: 'https://kafka.apache.org/documentation/',
      },
    ],
    paidResources: [
      {
        title:
          'Designing Data-Intensive Applications (book by Martin Kleppmann)',
        url: 'https://dataintensive.net',
      },
      {
        title: 'Grokking System Design (Educative)',
        url: 'https://educative.io',
      },
    ],
    salaryInsight:
      'Junior: £45k–£60k · Mid: £70k–£95k · Senior: £100k–£150k+ (UK — large tech companies pay at the top end for this specialism)',
    entrepreneurshipIdeas: [
      'Distributed systems consultancy',
      'Infrastructure tooling and open source',
      'Database products and platforms',
      'Technical writing and education on distributed systems',
    ],
    roadmapPreview: [
      'Get strong in at least one backend language',
      'Study networking and how the internet works',
      'Learn about consistency, availability, and partition tolerance',
      'Study Designing Data-Intensive Applications',
      'Learn message queues and event streaming',
      'Build a distributed system from scratch',
      'Study consensus algorithms like Raft and Paxos',
    ],
  },
];

export function getCareerBySlug(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find((c) => c.slug === slug);
}

export function getCareersByCategory(category: string): CareerPath[] {
  return CAREER_PATHS.filter((c) => c.category === category);
}
