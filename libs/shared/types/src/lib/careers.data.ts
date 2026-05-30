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
        url: 'https://freecodecamp.org',
      },
      { title: 'The Odin Project', url: 'https://theodinproject.com' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
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
        title: 'The Odin Project — Node path',
        url: 'https://theodinproject.com',
      },
      {
        title: 'freeCodeCamp — Back End Certification',
        url: 'https://freecodecamp.org',
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
        title: 'The Odin Project — Full Stack',
        url: 'https://theodinproject.com',
      },
      {
        title: 'Full Stack Open (University of Helsinki)',
        url: 'https://fullstackopen.com',
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
        title: 'TryHackMe — free beginner paths',
        url: 'https://tryhackme.com',
      },
      {
        title: 'Google Cybersecurity Certificate (audit free)',
        url: 'https://coursera.org',
      },
      { title: 'Cybrary — free courses', url: 'https://cybrary.it' },
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
      { title: 'OWASP Top 10 resources', url: 'https://owasp.org' },
      { title: 'Hack The Box — free tier', url: 'https://hackthebox.com' },
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
      { title: 'AWS free tier tutorials', url: 'https://aws.amazon.com' },
      { title: 'Google Cloud free tier', url: 'https://cloud.google.com' },
      { title: 'KodeKloud free labs', url: 'https://kodekloud.com' },
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
      { title: 'roadmap.sh — DevOps roadmap', url: 'https://roadmap.sh' },
      {
        title: 'Play with Docker (free)',
        url: 'https://labs.play-with-docker.com',
      },
      { title: 'GitHub Actions docs', url: 'https://docs.github.com' },
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
        url: 'https://coursera.org',
      },
      { title: 'Mode SQL Tutorial', url: 'https://mode.com' },
      { title: 'Kaggle Learn', url: 'https://kaggle.com' },
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
      { title: 'fast.ai — Practical Deep Learning', url: 'https://fast.ai' },
      { title: 'Kaggle Learn — Machine Learning', url: 'https://kaggle.com' },
      {
        title: 'StatQuest with Josh Starmer (YouTube)',
        url: 'https://youtube.com',
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
      { title: 'fast.ai course', url: 'https://fast.ai' },
      { title: 'Hugging Face tutorials', url: 'https://huggingface.co' },
      { title: 'Anthropic and OpenAI API docs', url: 'https://anthropic.com' },
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
        url: 'https://coursera.org',
      },
      { title: 'Figma official tutorials', url: 'https://figma.com' },
      { title: 'Laws of UX', url: 'https://lawsofux.com' },
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
        url: 'https://lennysnewsletter.com',
      },
      {
        title: 'Product School free resources',
        url: 'https://productschool.com',
      },
      {
        title: 'Shape Up (free book by Basecamp)',
        url: 'https://basecamp.com/shapeup',
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
        title: 'Google Technical Writing courses',
        url: 'https://developers.google.com/tech-writing',
      },
      { title: 'Write the Docs community', url: 'https://writethedocs.org' },
      {
        title: 'The Documentation System (Diátaxis)',
        url: 'https://diataxis.fr',
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
        title: 'Playwright official docs and tutorials',
        url: 'https://playwright.dev',
      },
      { title: 'ISTQB Foundation study materials', url: 'https://istqb.org' },
      {
        title: 'Ministry of Testing (free resources)',
        url: 'https://ministryoftesting.com',
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
];

export function getCareerBySlug(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find((c) => c.slug === slug);
}

export function getCareersByCategory(category: string): CareerPath[] {
  return CAREER_PATHS.filter((c) => c.category === category);
}
