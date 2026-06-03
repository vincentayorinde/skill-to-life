import type { CareerRoadmap, CareerResource } from './types';

// ─── Roadmap data ──────────────────────────────────────────────────────────
// Each entry corresponds to a career in CAREER_PATHS.
// careerId must match the career's id/slug field exactly.

export const CAREER_ROADMAPS: CareerRoadmap[] = [
  // ── Development ────────────────────────────────────────────────────────────
  {
    careerId: 'frontend-developer',
    totalEstimatedTime: '6–12 months',
    steps: [
      {
        step: 1,
        title: 'HTML & CSS Fundamentals',
        description:
          'Learn the building blocks of every web page. HTML gives structure, CSS gives style. Master flexbox, grid, and responsive layouts — the foundations everything else builds on.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'freeCodeCamp — Responsive Web Design',
            url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
            type: 'course',
            platform: 'freeCodeCamp',
            beginner: true,
          },
          {
            title: 'The Odin Project — Foundations',
            url: 'https://www.theodinproject.com/paths/foundations',
            type: 'course',
            platform: 'The Odin Project',
            beginner: true,
          },
          {
            title: 'MDN — Introduction to HTML',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
            type: 'free',
            platform: 'MDN',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'JavaScript Fundamentals',
        description:
          'JavaScript makes pages interactive. Learn variables, functions, DOM manipulation, events, and async programming. Focus on understanding before frameworks.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'javascript.info — The Modern JavaScript Tutorial',
            url: 'https://javascript.info',
            type: 'free',
            platform: 'javascript.info',
            beginner: true,
          },
          {
            title: 'Eloquent JavaScript (free book)',
            url: 'https://eloquentjavascript.net',
            type: 'book',
            platform: 'eloquentjavascript.net',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'A Modern Framework',
        description:
          'Learn React or Angular. Frameworks handle the hard parts of building dynamic interfaces. Pick one and go deep — switching later is easy once you understand the concepts.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'React — Official Tutorial',
            url: 'https://react.dev/learn',
            type: 'free',
            platform: 'react.dev',
            beginner: true,
          },
          {
            title: 'Angular — Getting Started',
            url: 'https://angular.dev/tutorials/learn-angular',
            type: 'free',
            platform: 'angular.dev',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Build & Practice Projects',
        description:
          'Practice is how you really learn. Build a portfolio site, a landing page clone, a quiz app. Use Frontend Mentor challenges to stretch your skills on real-world problems.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'Frontend Mentor — Real-world challenges',
            url: 'https://www.frontendmentor.io',
            type: 'practice',
            platform: 'Frontend Mentor',
            beginner: true,
          },
          {
            title: 'CSS-Tricks — Guides and almanac',
            url: 'https://css-tricks.com',
            type: 'free',
            platform: 'CSS-Tricks',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Git, Deployment & Job Prep',
        description:
          'Learn version control with Git and GitHub. Deploy your projects to Netlify or Vercel. Polish your portfolio and start applying — even before you feel ready.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Git official documentation',
            url: 'https://git-scm.com/doc',
            type: 'free',
            platform: 'git-scm.com',
            beginner: true,
          },
          {
            title: 'Netlify — Deploy your first site',
            url: 'https://docs.netlify.com/get-started/',
            type: 'free',
            platform: 'Netlify',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'backend-developer',
    totalEstimatedTime: '8–14 months',
    steps: [
      {
        step: 1,
        title: 'Programming Language Basics',
        description:
          'Pick Python or JavaScript/Node.js and learn it properly. Master functions, data structures, error handling, and how to read documentation. This foundation carries you everywhere.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Python.org — Official Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            type: 'free',
            platform: 'python.org',
            beginner: true,
          },
          {
            title: 'The Odin Project — Node.js',
            url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
            type: 'course',
            platform: 'The Odin Project',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'SQL & Databases',
        description:
          'Most backend work involves data. Learn SQL — joins, aggregations, indexing basics. Set up PostgreSQL locally and interact with it through code.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'SQLZoo — Interactive SQL tutorials',
            url: 'https://sqlzoo.net',
            type: 'practice',
            platform: 'SQLZoo',
            beginner: true,
          },
          {
            title: 'PostgreSQL Tutorial',
            url: 'https://www.postgresqltutorial.com',
            type: 'free',
            platform: 'postgresqltutorial.com',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'REST APIs & HTTP',
        description:
          'Build APIs that frontends and mobile apps can call. Understand HTTP verbs, status codes, authentication patterns (JWT, sessions), and how to design clean endpoints.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Full Stack Open — Node.js and Express',
            url: 'https://fullstackopen.com/en/part3',
            type: 'course',
            platform: 'Full Stack Open',
            beginner: true,
          },
          {
            title: 'Postman Learning Centre',
            url: 'https://learning.postman.com',
            type: 'free',
            platform: 'Postman',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Frameworks (Express, NestJS, or FastAPI)',
        description:
          'Frameworks save you from reinventing the wheel. Express (Node) or FastAPI (Python) for flexibility. NestJS for structure. Pick one aligned to the language you chose in Step 1.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'NestJS — Official Documentation',
            url: 'https://docs.nestjs.com',
            type: 'free',
            platform: 'NestJS',
            beginner: false,
          },
          {
            title: 'FastAPI — Official Tutorial',
            url: 'https://fastapi.tiangolo.com/tutorial/',
            type: 'free',
            platform: 'FastAPI',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Docker & Deployment',
        description:
          "Learn Docker to containerise your app so it runs consistently anywhere. Deploy to Railway, Render, or Fly.io. Your API should be accessible on a real URL — not just 'localhost'.",
        estimatedTime: '2–4 weeks',
        type: 'practice',
        resources: [
          {
            title: 'Docker — Get Started guide',
            url: 'https://docs.docker.com/get-started/',
            type: 'free',
            platform: 'Docker',
            beginner: false,
          },
          {
            title: 'Railway — Deploy in minutes',
            url: 'https://railway.app',
            type: 'free',
            platform: 'Railway',
            beginner: true,
          },
        ],
      },
      {
        step: 6,
        title: 'System Design Basics & Job Ready',
        description:
          'Learn enough system design to talk confidently in interviews — caching, load balancing, database scaling. Start applying for backend or API-focused roles.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'System Design Primer (GitHub)',
            url: 'https://github.com/donnemartin/system-design-primer',
            type: 'free',
            platform: 'GitHub',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'fullstack-developer',
    totalEstimatedTime: '10–18 months',
    steps: [
      {
        step: 1,
        title: 'Frontend Fundamentals',
        description:
          'Master HTML, CSS, and JavaScript before touching frameworks. Full-stack work requires genuine depth on both sides — shortcuts here cause pain later.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'The Odin Project — Full Stack JavaScript',
            url: 'https://www.theodinproject.com/paths/full-stack-javascript',
            type: 'course',
            platform: 'The Odin Project',
            beginner: true,
          },
          {
            title: 'Full Stack Open (University of Helsinki)',
            url: 'https://fullstackopen.com/en/',
            type: 'course',
            platform: 'fullstackopen.com',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Backend & Databases',
        description:
          'Learn a backend framework and how to design databases. Build APIs that your frontend can consume. Understand how the two sides talk to each other.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'Full Stack Open — Part 3 & 4',
            url: 'https://fullstackopen.com/en/part3',
            type: 'course',
            platform: 'Full Stack Open',
            beginner: true,
          },
          {
            title: 'SQLZoo — SQL for beginners',
            url: 'https://sqlzoo.net',
            type: 'practice',
            platform: 'SQLZoo',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Authentication & Security Basics',
        description:
          'Learn how authentication works — sessions, JWT, OAuth. Most full-stack apps need login. Understanding this early prevents security mistakes.',
        estimatedTime: '2–4 weeks',
        type: 'core',
        resources: [
          {
            title: 'JWT.io — Introduction to JSON Web Tokens',
            url: 'https://jwt.io/introduction',
            type: 'free',
            platform: 'jwt.io',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Build a Complete Product',
        description:
          'Build something real from scratch — a SaaS app, a content platform, or a tool you actually want. This is where full-stack skills solidify. Aim for real deployment.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'GitHub — Source control and portfolio hosting',
            url: 'https://github.com',
            type: 'free',
            platform: 'GitHub',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Deployment & DevOps Basics',
        description:
          'Deploy your full-stack app to a real URL. Learn Docker basics, environment variables, CI/CD pipelines. Being able to ship is as important as being able to build.',
        estimatedTime: '2–4 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Vercel — Deploy Next.js and more',
            url: 'https://vercel.com/docs',
            type: 'free',
            platform: 'Vercel',
            beginner: true,
          },
          {
            title: 'Render — Full-stack deployment',
            url: 'https://render.com/docs',
            type: 'free',
            platform: 'Render',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'cybersecurity-analyst',
    totalEstimatedTime: '8–14 months',
    steps: [
      {
        step: 1,
        title: 'Networking Fundamentals',
        description:
          'Security starts with understanding how networks work. Learn TCP/IP, DNS, HTTP, the OSI model, and how data moves across the internet. This knowledge is non-negotiable.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Professor Messer — CompTIA Network+ Study Guide',
            url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/',
            type: 'video',
            platform: 'Professor Messer',
            beginner: true,
          },
          {
            title: 'Cisco Networking Academy — free networking intro',
            url: 'https://www.netacad.com',
            type: 'course',
            platform: 'Cisco NetAcad',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Linux Basics',
        description:
          'Most security tools run on Linux. Learn the command line — file permissions, processes, networking tools. OverTheWire Bandit is the most effective way to learn by doing.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Linux Journey — free interactive Linux learning',
            url: 'https://linuxjourney.com',
            type: 'course',
            platform: 'Linux Journey',
            beginner: true,
          },
          {
            title: 'OverTheWire — Bandit wargame',
            url: 'https://overthewire.org/wargames/bandit/',
            type: 'practice',
            platform: 'OverTheWire',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Security Fundamentals',
        description:
          'Learn the CIA triad, common threats (phishing, malware, ransomware), and defence strategies. Study the Security+ framework — it structures everything you need to know for entry-level roles.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Professor Messer — CompTIA Security+ course',
            url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
            type: 'video',
            platform: 'Professor Messer',
            beginner: true,
          },
          {
            title: 'Cybrary — free security courses',
            url: 'https://www.cybrary.it',
            type: 'course',
            platform: 'Cybrary',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Hands-On Practice',
        description:
          'Theory only takes you so far. Work through TryHackMe beginner paths. Get comfortable investigating logs, running scans, and responding to simulated attacks.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'TryHackMe — Beginner paths',
            url: 'https://tryhackme.com/paths',
            type: 'practice',
            platform: 'TryHackMe',
            beginner: true,
          },
          {
            title: 'Hack The Box — Starting Point',
            url: 'https://app.hackthebox.com/starting-point',
            type: 'practice',
            platform: 'Hack The Box',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'CompTIA Security+ Certification',
        description:
          'Security+ is the most recognised entry-level security certification. It opens doors to SOC analyst, security consultant, and GRC roles. Study consistently for 8–12 weeks.',
        estimatedTime: '8–12 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'CompTIA Security+ Exam page',
            url: 'https://www.comptia.org/certifications/security',
            type: 'paid',
            platform: 'CompTIA',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'security-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Programming & Linux',
        description:
          'Security engineers need to write code. Python or Go are standard choices. Combine this with deep Linux skills — you need to be comfortable on the command line for hours.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Automate the Boring Stuff with Python (free)',
            url: 'https://automatetheboringstuff.com',
            type: 'book',
            platform: 'automatetheboringstuff.com',
            beginner: true,
          },
          {
            title: 'Linux Journey',
            url: 'https://linuxjourney.com',
            type: 'course',
            platform: 'Linux Journey',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Web Security Fundamentals',
        description:
          'Learn the OWASP Top 10 — the ten most critical web security risks. Understand SQL injection, XSS, CSRF, and authentication flaws. Portswigger Web Academy is the best free resource for this.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'PortSwigger Web Security Academy (free)',
            url: 'https://portswigger.net/web-security',
            type: 'course',
            platform: 'PortSwigger',
            beginner: false,
          },
          {
            title: 'OWASP Top 10',
            url: 'https://owasp.org/www-project-top-ten/',
            type: 'free',
            platform: 'OWASP',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'Cloud Security',
        description:
          'Most modern infrastructure runs on AWS, GCP, or Azure. Learn how to configure IAM, secure S3 buckets, set up security groups, and use cloud-native security services.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'AWS Security Learning Plan',
            url: 'https://aws.amazon.com/training/learn-about/security/',
            type: 'course',
            platform: 'AWS',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'CTF Practice & Red Team Skills',
        description:
          'Security engineers often need to think offensively to defend effectively. Work through HTB machines, CTF challenges, and study real vulnerability disclosures.',
        estimatedTime: 'Ongoing',
        type: 'advanced',
        resources: [
          {
            title: 'Hack The Box — Machines and challenges',
            url: 'https://app.hackthebox.com',
            type: 'practice',
            platform: 'Hack The Box',
            beginner: false,
          },
          {
            title: 'TryHackMe — Advanced rooms',
            url: 'https://tryhackme.com',
            type: 'practice',
            platform: 'TryHackMe',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Certifications & Specialisation',
        description:
          'OSCP is the gold standard for offensive security. AWS Security Specialty or CISSP for defensive/cloud engineering. Choose based on which direction you want to go.',
        estimatedTime: '12–16 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Offensive Security — OSCP',
            url: 'https://www.offsec.com/courses/pen-200/',
            type: 'paid',
            platform: 'Offensive Security',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'cloud-engineer',
    totalEstimatedTime: '6–12 months',
    steps: [
      {
        step: 1,
        title: 'Linux & Networking Basics',
        description:
          'Cloud engineering requires solid Linux and networking foundations. Learn the command line, file system, processes, and basic networking concepts before touching any cloud platform.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Linux Journey',
            url: 'https://linuxjourney.com',
            type: 'course',
            platform: 'Linux Journey',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'First Cloud Platform (Start with AWS)',
        description:
          'Pick one cloud platform and go deep. AWS has the most jobs. Learn core services: EC2, S3, VPC, IAM, Lambda, RDS. Use the free tier to experiment.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'AWS Skill Builder — free learning',
            url: 'https://skillbuilder.aws',
            type: 'course',
            platform: 'AWS Skill Builder',
            beginner: true,
          },
          {
            title: 'Google Cloud Skills Boost',
            url: 'https://cloudskillsboost.google',
            type: 'course',
            platform: 'Google Cloud',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Infrastructure as Code',
        description:
          'Manual cloud configuration is fragile and hard to repeat. Learn Terraform to define infrastructure in code — this is standard practice at every professional cloud team.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'HashiCorp Terraform — official tutorials',
            url: 'https://developer.hashicorp.com/terraform/tutorials',
            type: 'free',
            platform: 'HashiCorp',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Containers & Kubernetes',
        description:
          'Learn Docker to containerise applications, then Kubernetes to orchestrate them at scale. KodeKloud has the best free labs for hands-on Kubernetes practice.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Docker official Get Started',
            url: 'https://docs.docker.com/get-started/',
            type: 'free',
            platform: 'Docker',
            beginner: false,
          },
          {
            title: 'Kubernetes interactive tutorial',
            url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
            type: 'free',
            platform: 'kubernetes.io',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'AWS Cloud Practitioner → Solutions Architect',
        description:
          'Start with AWS Cloud Practitioner to build confidence, then go for Solutions Architect Associate. These certifications open doors at cloud-focused companies.',
        estimatedTime: '8–12 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'AWS Certified Cloud Practitioner',
            url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
            type: 'paid',
            platform: 'AWS',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'devops-engineer',
    totalEstimatedTime: '8–14 months',
    steps: [
      {
        step: 1,
        title: 'Linux & Shell Scripting',
        description:
          'DevOps lives in the terminal. Master Linux administration, Bash scripting, process management, cron jobs, and system monitoring. This is used every day in the role.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Linux Journey',
            url: 'https://linuxjourney.com',
            type: 'course',
            platform: 'Linux Journey',
            beginner: true,
          },
          {
            title: 'Bash scripting tutorial',
            url: 'https://www.gnu.org/software/bash/manual/bash.html',
            type: 'free',
            platform: 'GNU',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Docker & Containers',
        description:
          'Containers are the foundation of modern deployment. Learn how Docker works, write Dockerfiles, build images, and run multi-container apps with Docker Compose.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Docker — Play with Docker labs (free)',
            url: 'https://labs.play-with-docker.com',
            type: 'practice',
            platform: 'Play with Docker',
            beginner: true,
          },
          {
            title: 'Docker official documentation',
            url: 'https://docs.docker.com/get-started/',
            type: 'free',
            platform: 'Docker',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'CI/CD Pipelines',
        description:
          'Learn to automate the path from code commit to production deployment. GitHub Actions is the most accessible starting point. Understand builds, tests, and deployment stages.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'GitHub Actions — official documentation',
            url: 'https://docs.github.com/en/actions',
            type: 'free',
            platform: 'GitHub',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Kubernetes',
        description:
          'Kubernetes is how containers are run at scale. Learn deployments, services, ingress, configmaps, and secrets. KodeKloud has the best hands-on labs for this.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Kubernetes — Interactive basics tutorial',
            url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
            type: 'free',
            platform: 'kubernetes.io',
            beginner: false,
          },
          {
            title: 'KodeKloud — Kubernetes for beginners',
            url: 'https://kodekloud.com',
            type: 'course',
            platform: 'KodeKloud',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Monitoring & Observability',
        description:
          'You cannot fix what you cannot see. Learn Prometheus for metrics, Grafana for dashboards, and structured logging. Understanding how systems behave is half the job.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Prometheus — Getting started',
            url: 'https://prometheus.io/docs/prometheus/latest/getting_started/',
            type: 'free',
            platform: 'Prometheus',
            beginner: false,
          },
        ],
      },
      {
        step: 6,
        title: 'Cloud & Certifications',
        description:
          'Deepen your cloud platform knowledge and pursue a certification. CKA (Certified Kubernetes Administrator) or AWS DevOps Professional are the most valued in the industry.',
        estimatedTime: '8–12 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'roadmap.sh — DevOps roadmap',
            url: 'https://roadmap.sh/devops',
            type: 'free',
            platform: 'roadmap.sh',
            beginner: false,
          },
        ],
      },
    ],
  },

  // ── Data & AI ─────────────────────────────────────────────────────────────
  {
    careerId: 'data-analyst',
    totalEstimatedTime: '6–10 months',
    steps: [
      {
        step: 1,
        title: 'Spreadsheets & Excel',
        description:
          'Most data analysis starts in spreadsheets. Learn Excel or Google Sheets properly — pivot tables, VLOOKUP, formulas, basic charts. Faster to learn than SQL and used in almost every data role.',
        estimatedTime: '2–3 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Excel — Microsoft Learning (free)',
            url: 'https://support.microsoft.com/en-us/excel',
            type: 'free',
            platform: 'Microsoft',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'SQL',
        description:
          'SQL is the most important skill for data analysts. Learn SELECT, WHERE, JOIN, GROUP BY, and window functions. SQLZoo and Mode are excellent free resources.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'SQLZoo — Interactive SQL tutorials',
            url: 'https://sqlzoo.net',
            type: 'practice',
            platform: 'SQLZoo',
            beginner: true,
          },
          {
            title: 'Mode — SQL Tutorial',
            url: 'https://mode.com/sql-tutorial/',
            type: 'free',
            platform: 'Mode',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Data Visualisation',
        description:
          'Turning numbers into stories. Learn Tableau Public (free) or Power BI Desktop. Focus on choosing the right chart type and designing dashboards that communicate clearly.',
        estimatedTime: '3–5 weeks',
        type: 'core',
        resources: [
          {
            title: 'Tableau Public — free training videos',
            url: 'https://public.tableau.com/app/learn/how-to-videos',
            type: 'video',
            platform: 'Tableau',
            beginner: true,
          },
          {
            title: 'Looker Studio — Google tutorials',
            url: 'https://lookerstudio.google.com/u/0/navigation/reporting',
            type: 'free',
            platform: 'Google',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Python for Data Analysis',
        description:
          'Python with pandas and matplotlib lets you do things spreadsheets can not. Learn data cleaning, merging datasets, and basic visualisations. Kaggle Learn is the fastest path.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Kaggle Learn — Python and Pandas',
            url: 'https://www.kaggle.com/learn',
            type: 'course',
            platform: 'Kaggle',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Statistics & Business Thinking',
        description:
          'Learn basic statistics (mean, median, standard deviation, correlation) and how to frame analysis in terms of business impact. StatQuest makes statistics genuinely enjoyable.',
        estimatedTime: '3–5 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'StatQuest with Josh Starmer (YouTube)',
            url: 'https://www.youtube.com/@statquest',
            type: 'video',
            platform: 'YouTube',
            beginner: true,
          },
        ],
      },
      {
        step: 6,
        title: 'Portfolio & Job Search',
        description:
          'Build 2–3 portfolio projects using real public datasets. Write up your analysis with clear findings and visualisations. Apply for data analyst, business analyst, or BI analyst roles.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Kaggle — Public datasets',
            url: 'https://www.kaggle.com/datasets',
            type: 'practice',
            platform: 'Kaggle',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'data-scientist',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Python & Mathematics',
        description:
          'Data science requires genuine comfort with Python and applied maths. Learn NumPy, pandas, basic statistics, and linear algebra. 3Blue1Brown makes the maths visual and intuitive.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Python.org — Official Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            type: 'free',
            platform: 'python.org',
            beginner: true,
          },
          {
            title: '3Blue1Brown — Essence of Linear Algebra',
            url: 'https://www.3blue1brown.com/topics/linear-algebra',
            type: 'video',
            platform: '3Blue1Brown',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Statistics & Probability',
        description:
          'Statistics is the language of data science. Learn probability distributions, hypothesis testing, p-values, Bayes theorem. StatQuest explains everything clearly without dumbing it down.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'StatQuest — Statistics playlist (YouTube)',
            url: 'https://www.youtube.com/@statquest',
            type: 'video',
            platform: 'YouTube',
            beginner: true,
          },
          {
            title: 'Seeing Theory — visual probability',
            url: 'https://seeing-theory.brown.edu',
            type: 'free',
            platform: 'Brown University',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Machine Learning Fundamentals',
        description:
          'Learn supervised and unsupervised learning with scikit-learn. Linear regression, decision trees, random forests, k-means clustering. The Andrew Ng course is the gold standard.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'Machine Learning Specialisation — Andrew Ng (Coursera)',
            url: 'https://www.coursera.org/specializations/machine-learning-introduction',
            type: 'course',
            platform: 'Coursera',
            beginner: true,
          },
          {
            title: 'Kaggle Learn — Intro to Machine Learning',
            url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
            type: 'course',
            platform: 'Kaggle',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Deep Learning',
        description:
          'Neural networks, CNNs, RNNs, and transformers. fast.ai teaches deep learning from a practical, top-down perspective — you build real models before learning all the theory.',
        estimatedTime: '6–8 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'fast.ai — Practical Deep Learning for Coders',
            url: 'https://course.fast.ai',
            type: 'course',
            platform: 'fast.ai',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Projects & Kaggle Competitions',
        description:
          'Join Kaggle competitions to practice on real datasets with real scoring. Build 2–3 strong projects for your portfolio. Aim for publishable notebooks with clear analysis.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'Kaggle — Competitions',
            url: 'https://www.kaggle.com/competitions',
            type: 'practice',
            platform: 'Kaggle',
            beginner: false,
          },
        ],
      },
      {
        step: 6,
        title: 'MLOps & Deployment',
        description:
          'Models in notebooks are not useful — models in production are. Learn to deploy with FastAPI or Flask, track experiments with MLflow, and monitor model performance over time.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'MLflow — Quick start tutorial',
            url: 'https://mlflow.org/docs/latest/getting-started/intro-quickstart/index.html',
            type: 'free',
            platform: 'MLflow',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'ai-engineer',
    totalEstimatedTime: '10–16 months',
    steps: [
      {
        step: 1,
        title: 'Python & Software Engineering',
        description:
          'AI engineers write production code. Get comfortable with Python, Git, APIs, and basic software design patterns. These skills matter more than knowing the latest model architecture.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Python.org — Official Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            type: 'free',
            platform: 'python.org',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'ML Fundamentals & LLM Basics',
        description:
          'Learn how machine learning works conceptually, then focus on how large language models (LLMs) work. You do not need to train models — but you need to understand what they can and can not do.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'fast.ai — Practical Deep Learning',
            url: 'https://course.fast.ai',
            type: 'course',
            platform: 'fast.ai',
            beginner: true,
          },
          {
            title: 'Andrej Karpathy — Neural Networks: Zero to Hero',
            url: 'https://www.youtube.com/@AndrejKarpathy',
            type: 'video',
            platform: 'YouTube',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'Build with LLM APIs',
        description:
          'Use OpenAI or Anthropic APIs to build real applications. Learn prompt engineering, function calling, and how to structure conversations. Build something that actually does something useful.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Anthropic API documentation',
            url: 'https://docs.anthropic.com',
            type: 'free',
            platform: 'Anthropic',
            beginner: false,
          },
          {
            title: 'OpenAI API documentation',
            url: 'https://platform.openai.com/docs',
            type: 'free',
            platform: 'OpenAI',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'RAG & Vector Databases',
        description:
          'Retrieval-Augmented Generation (RAG) is how you connect LLMs to your own data. Learn vector embeddings, semantic search, and tools like Pinecone or ChromaDB.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Hugging Face — Course on NLP',
            url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
            type: 'course',
            platform: 'Hugging Face',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'MLOps & Production Deployment',
        description:
          'Ship AI products that stay reliable. Learn FastAPI for serving models, Docker for containerisation, and monitoring patterns for AI systems in production.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'FastAPI — Official Tutorial',
            url: 'https://fastapi.tiangolo.com/tutorial/',
            type: 'free',
            platform: 'FastAPI',
            beginner: false,
          },
        ],
      },
    ],
  },

  // ── Design & Product ──────────────────────────────────────────────────────
  {
    careerId: 'product-designer',
    totalEstimatedTime: '6–10 months',
    steps: [
      {
        step: 1,
        title: 'Design Fundamentals',
        description:
          'Learn the principles behind good design — colour theory, typography, visual hierarchy, spacing. These rules explain why great designs work and why bad ones feel off.',
        estimatedTime: '3–5 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Laws of UX — design principles',
            url: 'https://lawsofux.com',
            type: 'free',
            platform: 'lawsofux.com',
            beginner: true,
          },
          {
            title: 'Google UX Design Certificate (audit free)',
            url: 'https://www.coursera.org/professional-certificates/google-ux-design',
            type: 'course',
            platform: 'Coursera / Google',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Figma',
        description:
          'Figma is the industry standard design tool. Learn frames, components, auto-layout, prototyping, and how to collaborate with developers. The official tutorials are excellent.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Figma — Official tutorials',
            url: 'https://help.figma.com/hc/en-us/categories/360002051613-Get-started',
            type: 'free',
            platform: 'Figma',
            beginner: true,
          },
          {
            title: 'Figma Community — templates and inspiration',
            url: 'https://www.figma.com/community',
            type: 'free',
            platform: 'Figma',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'UX Research',
        description:
          'Great design is grounded in user understanding. Learn how to conduct user interviews, usability tests, and competitive analysis. Nielsen Norman Group is the leading resource.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Nielsen Norman Group — free articles and guidelines',
            url: 'https://www.nngroup.com/articles/',
            type: 'free',
            platform: 'Nielsen Norman Group',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Redesign Projects & Portfolio',
        description:
          'Redesign apps you use daily. Document your thinking — problem, research, iterations, final solution. Portfolios are how designers get hired. 3–5 strong case studies beats 20 shallow ones.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'Dribbble — design inspiration',
            url: 'https://dribbble.com',
            type: 'community',
            platform: 'Dribbble',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Design Systems & Handoff',
        description:
          'Learn how to build and document design systems. Understand how to hand off designs to developers — component specs, interaction notes, design tokens. This is what separates junior from mid-level designers.',
        estimatedTime: '3–4 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Design Systems repo — examples',
            url: 'https://www.designsystemsrepo.com',
            type: 'free',
            platform: 'designsystemsrepo.com',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'product-manager',
    totalEstimatedTime: '6–10 months',
    steps: [
      {
        step: 1,
        title: 'PM Fundamentals',
        description:
          'Learn what product managers actually do — discovery, prioritisation, roadmapping, and delivery. Lenny Rachitsky and Shreyas Doshi are the best writers on modern PM practice.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: "Lenny's Newsletter — free tier",
            url: 'https://www.lennysnewsletter.com',
            type: 'free',
            platform: "Lenny's Newsletter",
            beginner: true,
          },
          {
            title: 'Shape Up — free book by Basecamp',
            url: 'https://basecamp.com/shapeup',
            type: 'book',
            platform: 'Basecamp',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'User Research & Discovery',
        description:
          'PMs build the right thing by understanding users deeply. Learn how to run interviews, synthesise findings, and use frameworks like Jobs-to-be-Done to understand what people actually need.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Nielsen Norman Group — UX research methods',
            url: 'https://www.nngroup.com/articles/',
            type: 'free',
            platform: 'Nielsen Norman Group',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Analytics & Data Literacy',
        description:
          'PMs make decisions with data. Learn SQL basics, understand funnels and cohort analysis, and learn to use tools like Amplitude, Mixpanel, or Google Analytics.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Mode — SQL Tutorial',
            url: 'https://mode.com/sql-tutorial/',
            type: 'free',
            platform: 'Mode',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Write Product Specs & Build Roadmaps',
        description:
          'The best way to learn PM is by doing it. Write PRDs for ideas you have. Build roadmaps for existing products. Critique products publicly. This builds the judgment the role requires.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'Product School — free resources',
            url: 'https://productschool.com/resources',
            type: 'free',
            platform: 'Product School',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Get Your First PM Role',
        description:
          'APM programmes, internal transitions from engineering or design, and early-stage startup roles are the most common entry points. Build a case study from a side project or spec work.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'Exponent — PM interview prep',
            url: 'https://www.tryexponent.com',
            type: 'free',
            platform: 'Exponent',
            beginner: true,
          },
        ],
      },
    ],
  },

  // ── Writing & QA ─────────────────────────────────────────────────────────
  {
    careerId: 'technical-writer',
    totalEstimatedTime: '4–8 months',
    steps: [
      {
        step: 1,
        title: 'Writing Fundamentals',
        description:
          'Clear writing is a learnable skill. Study plain language principles — short sentences, active voice, concrete examples. Google and Apple both publish excellent public writing guidelines.',
        estimatedTime: '3–4 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Google Technical Writing courses (free)',
            url: 'https://developers.google.com/tech-writing',
            type: 'course',
            platform: 'Google Developers',
            beginner: true,
          },
          {
            title: 'Diátaxis — documentation framework',
            url: 'https://diataxis.fr',
            type: 'free',
            platform: 'diataxis.fr',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Tools: Markdown, Git & Docs-as-Code',
        description:
          'Most technical documentation is written in Markdown and managed in Git. Learn both — they are simple but used universally. Docusaurus and GitBook are the most common publishing tools.',
        estimatedTime: '2–3 weeks',
        type: 'core',
        resources: [
          {
            title: 'Markdown Guide',
            url: 'https://www.markdownguide.org',
            type: 'free',
            platform: 'markdownguide.org',
            beginner: true,
          },
          {
            title: 'Docusaurus — official docs',
            url: 'https://docusaurus.io/docs',
            type: 'free',
            platform: 'Meta / Docusaurus',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'API Documentation',
        description:
          'API docs are the highest-paying technical writing specialism. Learn OpenAPI/Swagger, understand REST API concepts, and practise writing reference docs for real public APIs.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Swagger — OpenAPI specification',
            url: 'https://swagger.io/docs/specification/about/',
            type: 'free',
            platform: 'Swagger',
            beginner: false,
          },
          {
            title: 'Write the Docs — community and guide',
            url: 'https://www.writethedocs.org/guide/',
            type: 'community',
            platform: 'Write the Docs',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Build a Portfolio',
        description:
          'Contribute documentation to an open-source project. Rewrite confusing docs for a tool you know. Document your own projects thoroughly. A portfolio of real writing samples beats a CV.',
        estimatedTime: 'Ongoing',
        type: 'practice',
        resources: [
          {
            title: 'Good Docs Project — documentation templates',
            url: 'https://www.thegooddocsproject.dev',
            type: 'free',
            platform: 'Good Docs Project',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'Job Ready',
        description:
          'Apply for technical writer roles at developer-focused companies, API companies, or open-source organisations. Developer advocate roles often start from strong technical writing.',
        estimatedTime: '2–4 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Google Season of Docs — get paid to write OSS docs',
            url: 'https://developers.google.com/season-of-docs',
            type: 'free',
            platform: 'Google',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'qa-engineer',
    totalEstimatedTime: '4–8 months',
    steps: [
      {
        step: 1,
        title: 'Testing Fundamentals',
        description:
          'Learn what software testing actually involves — test cases, bug reports, test plans, regression testing. Study the ISTQB Foundation syllabus as a framework. Ministry of Testing has great free content.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'ISTQB Foundation Level — study materials',
            url: 'https://www.istqb.org/certifications/certified-tester-foundation-level',
            type: 'free',
            platform: 'ISTQB',
            beginner: true,
          },
          {
            title: 'Ministry of Testing — free resources',
            url: 'https://www.ministryoftesting.com',
            type: 'community',
            platform: 'Ministry of Testing',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Manual Testing on Real Products',
        description:
          'Test apps you use every day. Write detailed bug reports. Learn exploratory testing, usability testing, and how to document findings clearly. Practice on open-source projects.',
        estimatedTime: '3–4 weeks',
        type: 'core',
        resources: [
          {
            title: 'Jira — free tier for bug tracking',
            url: 'https://www.atlassian.com/software/jira/free',
            type: 'free',
            platform: 'Atlassian',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Test Automation with Playwright',
        description:
          'Automation multiplies your impact. Learn Playwright (or Cypress) to write end-to-end tests that run automatically on every code change. This is the skill that moves QA engineers to SDET roles.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Playwright — official documentation',
            url: 'https://playwright.dev/docs/intro',
            type: 'free',
            platform: 'Playwright',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'API Testing with Postman',
        description:
          'Most modern apps are API-first. Learn Postman to send requests, write assertions, and build collections that test your API thoroughly. Postman has a free tier and excellent learning materials.',
        estimatedTime: '2–3 weeks',
        type: 'core',
        resources: [
          {
            title: 'Postman Learning Centre',
            url: 'https://learning.postman.com',
            type: 'free',
            platform: 'Postman',
            beginner: true,
          },
        ],
      },
      {
        step: 5,
        title: 'CI/CD Integration & Certifications',
        description:
          'Learn to integrate your automated tests into GitHub Actions so they run on every pull request. Pursue ISTQB Foundation certification — it validates your fundamentals and is widely recognised.',
        estimatedTime: '4–6 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'GitHub Actions — test automation tutorial',
            url: 'https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing',
            type: 'free',
            platform: 'GitHub',
            beginner: false,
          },
        ],
      },
    ],
  },

  // ── Specialist & Advanced ─────────────────────────────────────────────────
  {
    careerId: 'ethical-hacker',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Networking Fundamentals',
        description:
          'Everything in security starts with networking. TCP/IP, DNS, HTTP/S, ports, protocols. You need to understand how data moves across a network before you can attack or defend one.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Professor Messer — Network+ course (free)',
            url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/',
            type: 'video',
            platform: 'Professor Messer',
            beginner: true,
          },
          {
            title: 'Cisco NetAcad — free networking intro',
            url: 'https://www.netacad.com',
            type: 'course',
            platform: 'Cisco',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Linux & Scripting',
        description:
          'Kali Linux is the standard pentesting OS. Get fluent with the Linux command line, learn Bash scripting, and write basic Python scripts for automating reconnaissance tasks.',
        estimatedTime: '4–6 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'OverTheWire — Bandit wargame',
            url: 'https://overthewire.org/wargames/bandit/',
            type: 'practice',
            platform: 'OverTheWire',
            beginner: true,
          },
          {
            title: 'Kali Linux revealed — free book',
            url: 'https://kali.training',
            type: 'book',
            platform: 'Offensive Security',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'TryHackMe & Structured Learning',
        description:
          'TryHackMe has guided paths specifically for ethical hacking. Work through the Pre-Security and Jr Penetration Tester paths in order — they are genuinely well-designed for beginners.',
        estimatedTime: '8–12 weeks',
        type: 'core',
        resources: [
          {
            title: 'TryHackMe — Jr Penetration Tester path',
            url: 'https://tryhackme.com/path/outline/jrpenetrationtester',
            type: 'practice',
            platform: 'TryHackMe',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Web Application Hacking',
        description:
          'Web applications are the most common target. Learn the OWASP Top 10, practise on PortSwigger Web Security Academy, and learn to use Burp Suite for intercepting and modifying HTTP traffic.',
        estimatedTime: '6–8 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'PortSwigger Web Security Academy (free)',
            url: 'https://portswigger.net/web-security',
            type: 'practice',
            platform: 'PortSwigger',
            beginner: false,
          },
          {
            title: 'OWASP Top 10',
            url: 'https://owasp.org/www-project-top-ten/',
            type: 'free',
            platform: 'OWASP',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'CTF Practice & Certification',
        description:
          'CTF competitions build your skills faster than anything else. Start with picoCTF (beginner-friendly), progress to Hack The Box. Pursue CEH first, then OSCP when you are ready.',
        estimatedTime: '12–16 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'picoCTF — beginner CTF',
            url: 'https://picoctf.org',
            type: 'practice',
            platform: 'picoCTF',
            beginner: true,
          },
          {
            title: 'Hack The Box',
            url: 'https://app.hackthebox.com',
            type: 'practice',
            platform: 'Hack The Box',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'cloud-architect',
    totalEstimatedTime: '18–24 months',
    steps: [
      {
        step: 1,
        title: 'Cloud Fundamentals & Associate Cert',
        description:
          'Start with AWS Solutions Architect Associate. It is the most recognised cloud certification and gives you a solid, structured grounding in cloud concepts, services, and architecture patterns.',
        estimatedTime: '10–14 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'AWS Skill Builder — free training',
            url: 'https://skillbuilder.aws',
            type: 'course',
            platform: 'AWS',
            beginner: true,
          },
          {
            title: 'A Cloud Guru — AWS SAA course',
            url: 'https://acloudguru.com',
            type: 'course',
            platform: 'A Cloud Guru',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Infrastructure as Code',
        description:
          'Architects define infrastructure in code. Master Terraform — it is vendor-neutral and the industry standard. Learn modules, state management, and remote backends.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'HashiCorp Terraform tutorials',
            url: 'https://developer.hashicorp.com/terraform/tutorials',
            type: 'free',
            platform: 'HashiCorp',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'Kubernetes & Container Orchestration',
        description:
          'Architects design systems that scale. Kubernetes is how modern workloads scale reliably. Learn the core concepts deeply — pods, deployments, services, ingress, RBAC.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Kubernetes — official tutorials',
            url: 'https://kubernetes.io/docs/tutorials/',
            type: 'free',
            platform: 'kubernetes.io',
            beginner: false,
          },
          {
            title: 'KodeKloud — Kubernetes for absolute beginners',
            url: 'https://kodekloud.com',
            type: 'course',
            platform: 'KodeKloud',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'System Design & Architecture Patterns',
        description:
          'Learn microservices, event-driven architecture, circuit breakers, and how to design for fault tolerance and scalability. The System Design Primer is the best free resource available.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'System Design Primer (GitHub)',
            url: 'https://github.com/donnemartin/system-design-primer',
            type: 'free',
            platform: 'GitHub',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Professional Certification & Specialisation',
        description:
          'Pursue AWS Solutions Architect Professional or Google Cloud Professional Cloud Architect. These signal genuine architectural competence and are required for senior cloud roles at large companies.',
        estimatedTime: '12–16 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'AWS Certified Solutions Architect Professional',
            url: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
            type: 'paid',
            platform: 'AWS',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'ml-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Python, Linear Algebra & Statistics',
        description:
          'ML engineering requires real mathematical foundations. Learn NumPy, pandas, linear algebra (vectors, matrices), and probability. 3Blue1Brown makes the maths intuitive before you write any code.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: '3Blue1Brown — Essence of Linear Algebra',
            url: 'https://www.3blue1brown.com/topics/linear-algebra',
            type: 'video',
            platform: '3Blue1Brown',
            beginner: true,
          },
          {
            title: 'Kaggle Learn — Python',
            url: 'https://www.kaggle.com/learn/python',
            type: 'course',
            platform: 'Kaggle',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Machine Learning Fundamentals',
        description:
          'Andrew Ng is the best ML teacher in the world. Work through his specialisation on Coursera. Focus on understanding the algorithms, not just running them.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'Machine Learning Specialisation — Andrew Ng',
            url: 'https://www.coursera.org/specializations/machine-learning-introduction',
            type: 'course',
            platform: 'Coursera',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Deep Learning with PyTorch or TensorFlow',
        description:
          'Learn neural networks, CNNs, RNNs. Pick PyTorch (preferred in research) or TensorFlow (preferred in production). fast.ai teaches this from a practical angle — you build real things first.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'PyTorch — official tutorials',
            url: 'https://pytorch.org/tutorials/',
            type: 'free',
            platform: 'PyTorch',
            beginner: false,
          },
          {
            title: 'fast.ai — Practical Deep Learning for Coders',
            url: 'https://course.fast.ai',
            type: 'course',
            platform: 'fast.ai',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'MLOps & Model Deployment',
        description:
          'Building models is only half the job. Learn how to deploy them, monitor them, and retrain them when they drift. MLflow for tracking, FastAPI for serving, Docker for containerisation.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'MLflow — Getting started',
            url: 'https://mlflow.org/docs/latest/getting-started/intro-quickstart/index.html',
            type: 'free',
            platform: 'MLflow',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Projects, Kaggle & Job Ready',
        description:
          'Build a portfolio of end-to-end ML projects — from raw data to deployed API. Compete on Kaggle to benchmark your skills. Roles include ML engineer, applied scientist, and AI engineer.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'Kaggle — competitions',
            url: 'https://www.kaggle.com/competitions',
            type: 'practice',
            platform: 'Kaggle',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'blockchain-developer',
    totalEstimatedTime: '10–16 months',
    steps: [
      {
        step: 1,
        title: 'JavaScript & Web Fundamentals',
        description:
          'Most blockchain development builds on web development skills. Get strong in JavaScript first — async patterns, API calls, Node.js. You will use these constantly.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'javascript.info — The Modern JavaScript Tutorial',
            url: 'https://javascript.info',
            type: 'free',
            platform: 'javascript.info',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Blockchain Concepts & Ethereum',
        description:
          'Understand how blockchain works at a protocol level — consensus mechanisms, transactions, wallets, and gas. Read the Ethereum whitepaper summary and official developer docs.',
        estimatedTime: '3–4 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Ethereum — developer documentation',
            url: 'https://ethereum.org/en/developers/docs/',
            type: 'free',
            platform: 'ethereum.org',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Solidity Smart Contracts',
        description:
          'Solidity is the main language for Ethereum smart contracts. CryptoZombies teaches it interactively. Learn state variables, mappings, events, modifiers, and how to avoid common pitfalls.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'CryptoZombies — learn Solidity interactively',
            url: 'https://cryptozombies.io',
            type: 'practice',
            platform: 'CryptoZombies',
            beginner: true,
          },
          {
            title: 'Solidity — official documentation',
            url: 'https://docs.soliditylang.org',
            type: 'free',
            platform: 'soliditylang.org',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Smart Contract Security',
        description:
          'Smart contracts are immutable once deployed. Security vulnerabilities cost millions. Study common attack vectors — reentrancy, integer overflow, access control flaws — using OpenZeppelin resources.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'OpenZeppelin — security documentation',
            url: 'https://docs.openzeppelin.com',
            type: 'free',
            platform: 'OpenZeppelin',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Build & Deploy a dApp',
        description:
          'Build a complete decentralised application — a token, a simple DeFi protocol, or an NFT mint. Deploy to testnet. Connect a React frontend using ethers.js or wagmi.',
        estimatedTime: '6–8 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'Hardhat — Ethereum development environment',
            url: 'https://hardhat.org/docs',
            type: 'free',
            platform: 'Hardhat',
            beginner: false,
          },
          {
            title: 'ethers.js — documentation',
            url: 'https://docs.ethers.org',
            type: 'free',
            platform: 'ethers.js',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'sre-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Linux Systems Administration',
        description:
          'SREs live on the command line. Master Linux deeply — systemd, process management, networking tools (ss, ip, tcpdump), file systems, and performance tools (htop, strace, perf).',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Linux Foundation — Introduction to Linux (free)',
            url: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
            type: 'course',
            platform: 'Linux Foundation',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Programming (Python or Go)',
        description:
          'SREs automate everything. Python for scripting and quick automation; Go for building reliable tools and services. Learn enough to write production-quality automation scripts.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'A Tour of Go — official tutorial',
            url: 'https://go.dev/tour/',
            type: 'free',
            platform: 'go.dev',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Kubernetes & Container Orchestration',
        description:
          'Most modern SRE work involves Kubernetes. Learn how to debug running pods, understand resource limits, read logs, and interpret events. KodeKloud has excellent hands-on labs.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Kubernetes — official tutorials',
            url: 'https://kubernetes.io/docs/tutorials/',
            type: 'free',
            platform: 'kubernetes.io',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Observability: Metrics, Logs & Traces',
        description:
          'You cannot fix what you cannot see. Learn Prometheus for metrics, Grafana for dashboards, and structured logging. Understand what SLOs, SLIs, and error budgets actually mean.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Prometheus — getting started',
            url: 'https://prometheus.io/docs/prometheus/latest/getting_started/',
            type: 'free',
            platform: 'Prometheus',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Incident Management & SRE Book',
        description:
          'Read the Google SRE book — it is available free online and is the definitive guide to how reliable systems are operated. Learn incident management, postmortems, and on-call practices.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'Google SRE Book (free online)',
            url: 'https://sre.google/sre-book/table-of-contents/',
            type: 'book',
            platform: 'Google',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'platform-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'Software Engineering & Linux',
        description:
          'Platform engineers are software engineers who build infrastructure. Start with strong programming fundamentals in Python or Go, combined with solid Linux skills.',
        estimatedTime: '6–8 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'A Tour of Go',
            url: 'https://go.dev/tour/',
            type: 'free',
            platform: 'go.dev',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Docker & Kubernetes',
        description:
          'Internal developer platforms are built on containers. Master Docker and Kubernetes deeply — not just "kubectl apply" but understanding what happens under the hood.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'Docker official Get Started',
            url: 'https://docs.docker.com/get-started/',
            type: 'free',
            platform: 'Docker',
            beginner: true,
          },
          {
            title: 'Kubernetes — official tutorials',
            url: 'https://kubernetes.io/docs/tutorials/',
            type: 'free',
            platform: 'kubernetes.io',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'CI/CD & GitOps',
        description:
          'Platform engineers build the pipelines other teams use. Learn GitHub Actions, GitLab CI, and ArgoCD for GitOps deployments. Understand how to design pipeline templates at scale.',
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Argo CD — getting started',
            url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/',
            type: 'free',
            platform: 'Argo CD',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Internal Developer Platforms',
        description:
          'Study Backstage — the open-source IDP that many large companies have adopted. Understand service catalogues, software templates, and how to reduce cognitive load for engineering teams.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Backstage — official documentation',
            url: 'https://backstage.io/docs',
            type: 'free',
            platform: 'Backstage',
            beginner: false,
          },
          {
            title: 'CNCF landscape — platform tools',
            url: 'https://landscape.cncf.io',
            type: 'free',
            platform: 'CNCF',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Open Source Contribution & Job Ready',
        description:
          'Contributing to open-source platform tooling (Backstage, ArgoCD, Crossplane) is the most direct route to a platform engineering role. It signals technical credibility at interview.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'roadmap.sh — Platform Engineering',
            url: 'https://roadmap.sh/platform-engineer',
            type: 'free',
            platform: 'roadmap.sh',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'ai-safety-researcher',
    totalEstimatedTime: '18–36 months',
    steps: [
      {
        step: 1,
        title: 'Mathematics & Statistics',
        description:
          'AI safety research requires genuine mathematical depth. Focus on linear algebra, calculus, probability, and information theory. This takes longer than most paths but there are no shortcuts.',
        estimatedTime: '12–16 weeks',
        type: 'foundation',
        resources: [
          {
            title: '3Blue1Brown — linear algebra, calculus series',
            url: 'https://www.3blue1brown.com',
            type: 'video',
            platform: '3Blue1Brown',
            beginner: true,
          },
          {
            title: 'Khan Academy — multivariable calculus',
            url: 'https://www.khanacademy.org/math/multivariable-calculus',
            type: 'course',
            platform: 'Khan Academy',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Machine Learning (Deep)',
        description:
          'You need to understand what modern AI systems actually do. Work through the Andrew Ng specialisation, then go deeper with research-level ML. Deep Learning book by Goodfellow et al. is the standard text.',
        estimatedTime: '12–16 weeks',
        type: 'core',
        resources: [
          {
            title: 'Deep Learning book by Goodfellow, Bengio, Courville (free)',
            url: 'https://www.deeplearningbook.org',
            type: 'book',
            platform: 'deeplearningbook.org',
            beginner: false,
          },
          {
            title: 'fast.ai — Practical Deep Learning',
            url: 'https://course.fast.ai',
            type: 'course',
            platform: 'fast.ai',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'AI Safety Literature',
        description:
          'Read the core AI safety literature. Start with the AI Safety Fundamentals curriculum from BlueDot. Follow the Alignment Forum for current research. This field moves fast.',
        estimatedTime: '8–12 weeks',
        type: 'core',
        resources: [
          {
            title: 'AI Safety Fundamentals — BlueDot Impact',
            url: 'https://aisafetyfundamentals.com',
            type: 'course',
            platform: 'BlueDot Impact',
            beginner: true,
          },
          {
            title: 'Alignment Forum — research posts',
            url: 'https://www.alignmentforum.org',
            type: 'community',
            platform: 'Alignment Forum',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Interpretability & Alignment Research',
        description:
          'Work through the ARENA curriculum — it is the most structured free resource for learning mechanistic interpretability. Replicate published results to build genuine research skills.',
        estimatedTime: '12–16 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'ARENA — alignment and interpretability curriculum',
            url: 'https://arena.education',
            type: 'course',
            platform: 'arena.education',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Research & Fellowship Applications',
        description:
          'Publish writeups and research results. Apply for MATS, Redwood Research fellowships, or safety-focused research programmes at Anthropic, DeepMind, and OpenAI. Relationships in the field open doors.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'MATS — ML Alignment Theory Scholars',
            url: 'https://www.matsprogram.org',
            type: 'course',
            platform: 'MATS',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'embedded-systems-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'C Programming',
        description:
          'Embedded systems are almost exclusively written in C. Learn it properly — pointers, memory management, bit manipulation, and understanding what the compiler actually generates.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'CS50x — weeks 1–4 cover C deeply',
            url: 'https://cs50.harvard.edu/x',
            type: 'course',
            platform: 'Harvard / edX',
            beginner: true,
          },
          {
            title: "C Programming — Beej's Guide (free)",
            url: 'https://beej.us/guide/bgc/',
            type: 'book',
            platform: 'beej.us',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Electronics Basics',
        description:
          'You do not need an electronics degree, but you need to read a circuit, understand voltage and current, and not destroy hardware. SparkFun and Adafruit tutorials are excellent for self-taught engineers.',
        estimatedTime: '3–4 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'SparkFun — electronics tutorials',
            url: 'https://learn.sparkfun.com',
            type: 'free',
            platform: 'SparkFun',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Microcontrollers (Arduino → STM32)',
        description:
          'Start with Arduino to get comfortable with the development cycle. Then move to STM32 or similar bare-metal MCUs for production-grade work. Blink an LED, then build from there.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Arduino official tutorials',
            url: 'https://docs.arduino.cc/tutorials/',
            type: 'free',
            platform: 'Arduino',
            beginner: true,
          },
          {
            title: 'STMicroelectronics — STM32 getting started',
            url: 'https://www.st.com/en/microcontrollers-microprocessors/stm32.html',
            type: 'free',
            platform: 'STMicroelectronics',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'RTOS & Communication Protocols',
        description:
          'Learn FreeRTOS for task scheduling in real-time systems. Study the common communication protocols: I2C, SPI, UART, CAN. These are used on every serious embedded project.',
        estimatedTime: '6–8 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'FreeRTOS — official documentation',
            url: 'https://www.freertos.org/Documentation/RTOS_book.html',
            type: 'free',
            platform: 'FreeRTOS',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Build Real Projects',
        description:
          'Build a temperature data logger, a motor controller, or a simple communication bus. Real hardware projects are your portfolio — document them thoroughly with schematics and code.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'Embedded.fm — podcast and learning community',
            url: 'https://embedded.fm',
            type: 'community',
            platform: 'embedded.fm',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'robotics-engineer',
    totalEstimatedTime: '18–24 months',
    steps: [
      {
        step: 1,
        title: 'Python & C++ Programming',
        description:
          'Robotics uses both Python (for high-level control and ML) and C++ (for performance-critical code). Get comfortable in both. C++ pointers and classes are worth learning early.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Python.org — Official Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            type: 'free',
            platform: 'python.org',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Mathematics (Linear Algebra & Calculus)',
        description:
          'Kinematics, control theory, and computer vision all require linear algebra and calculus. Study transformation matrices, eigenvalues, and differential equations with 3Blue1Brown.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: '3Blue1Brown — linear algebra and calculus',
            url: 'https://www.3blue1brown.com',
            type: 'video',
            platform: '3Blue1Brown',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'ROS / ROS2',
        description:
          'ROS (Robot Operating System) is the standard middleware for robotics. Learn nodes, topics, services, and how to write publishers and subscribers. Simulate robots in Gazebo before touching real hardware.',
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'ROS2 — official tutorials',
            url: 'https://docs.ros.org/en/rolling/Tutorials.html',
            type: 'free',
            platform: 'ros.org',
            beginner: true,
          },
          {
            title: 'The Construct — free ROS learning',
            url: 'https://theconstructsim.com',
            type: 'course',
            platform: 'The Construct',
            beginner: true,
          },
        ],
      },
      {
        step: 4,
        title: 'Computer Vision with OpenCV',
        description:
          'Most robots need to see. Learn OpenCV for image processing — edge detection, object detection, and camera calibration. Combine with ROS for perception pipelines.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'OpenCV — official tutorials',
            url: 'https://docs.opencv.org/4.x/d9/df8/tutorial_root.html',
            type: 'free',
            platform: 'OpenCV',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Build Robot Projects',
        description:
          'Build a line-following robot, an arm controller, or an autonomous navigation project. Gazebo simulation lets you test without hardware. Document everything — robotics portfolios are rare and impressive.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'MIT OpenCourseWare — Introduction to Robotics',
            url: 'https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/',
            type: 'course',
            platform: 'MIT OCW',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'cryptography-engineer',
    totalEstimatedTime: '18–30 months',
    steps: [
      {
        step: 1,
        title: 'Mathematics (Number Theory & Abstract Algebra)',
        description:
          'Cryptography is applied mathematics. You need modular arithmetic, group theory, prime numbers, and elliptic curves. This takes time but it is the foundation everything else builds on.',
        estimatedTime: '12–16 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'Khan Academy — number theory',
            url: 'https://www.khanacademy.org/computing/computer-science/cryptography',
            type: 'course',
            platform: 'Khan Academy',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Cryptography Fundamentals',
        description:
          "Learn symmetric encryption (AES), asymmetric encryption (RSA, ECC), hash functions, MACs, and digital signatures. Dan Boneh's Coursera course is free to audit and is the best available.",
        estimatedTime: '8–10 weeks',
        type: 'core',
        resources: [
          {
            title: 'Cryptography I — Dan Boneh (Coursera, free audit)',
            url: 'https://www.coursera.org/learn/crypto',
            type: 'course',
            platform: 'Coursera / Stanford',
            beginner: false,
          },
          {
            title: 'Crypto 101 — free introductory book',
            url: 'https://crypto101.io',
            type: 'book',
            platform: 'crypto101.io',
            beginner: true,
          },
        ],
      },
      {
        step: 3,
        title: 'Cryptopals Challenges',
        description:
          'Cryptopals is a series of cryptographic challenges that teach you by breaking real implementations. It is the best hands-on cryptography learning available anywhere — and it is free.',
        estimatedTime: '8–12 weeks',
        type: 'practice',
        resources: [
          {
            title: 'Cryptopals — cryptographic challenges',
            url: 'https://cryptopals.com',
            type: 'practice',
            platform: 'cryptopals.com',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Systems Language (C or Rust)',
        description:
          'Cryptographic implementations must be correct and performant. Learn C or Rust. Rust is increasingly preferred in new cryptographic libraries because of its memory safety guarantees.',
        estimatedTime: '8–10 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'The Rust Programming Language (free book)',
            url: 'https://doc.rust-lang.org/book/',
            type: 'book',
            platform: 'rust-lang.org',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Protocol Analysis & Contribution',
        description:
          'Study real protocol implementations — TLS, Signal protocol, age encryption. Contribute to open-source cryptographic libraries. Read Trail of Bits audit reports to see what real vulnerabilities look like.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'Real World Cryptography — book by David Wong',
            url: 'https://www.manning.com/books/real-world-cryptography',
            type: 'book',
            platform: 'Manning',
            beginner: false,
          },
        ],
      },
    ],
  },

  {
    careerId: 'reverse-engineer',
    totalEstimatedTime: '12–18 months',
    steps: [
      {
        step: 1,
        title: 'C Programming & Memory',
        description:
          'Reverse engineering is about understanding compiled C. Learn C first — pointers, memory allocation, structs, and how the stack and heap work. CS50x covers this well.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'CS50x — C programming weeks',
            url: 'https://cs50.harvard.edu/x',
            type: 'course',
            platform: 'Harvard / edX',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'x86 Assembly Language',
        description:
          'When you disassemble a binary, you see assembly. Learn x86/x64 assembly — registers, the stack frame, calling conventions, common instruction patterns. pwn.college teaches this brilliantly.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'pwn.college — assembly crash course',
            url: 'https://pwn.college',
            type: 'practice',
            platform: 'pwn.college',
            beginner: false,
          },
          {
            title: 'x86 Assembly Guide — University of Virginia',
            url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x86.html',
            type: 'free',
            platform: 'University of Virginia',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'Static Analysis with Ghidra',
        description:
          "Ghidra is the NSA's free reverse engineering tool and the most accessible starting point. Learn to navigate functions, rename variables, add comments, and understand what decompiled C is trying to tell you.",
        estimatedTime: '4–6 weeks',
        type: 'core',
        resources: [
          {
            title: 'Ghidra — official documentation',
            url: 'https://ghidra-sre.org',
            type: 'free',
            platform: 'NSA / Ghidra',
            beginner: false,
          },
          {
            title: 'Malware Unicorn — free workshops',
            url: 'https://malwareunicorn.org',
            type: 'course',
            platform: 'Malware Unicorn',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Dynamic Analysis & Debugging',
        description:
          'Static analysis tells you what code exists. Dynamic analysis tells you what it does at runtime. Learn x64dbg for Windows, GDB for Linux. Set breakpoints, inspect memory, trace execution.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'ANY.RUN — interactive sandbox for analysis',
            url: 'https://any.run',
            type: 'practice',
            platform: 'ANY.RUN',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'CTF Challenges & Real Malware',
        description:
          'Practice on picoCTF (beginner), then progress to more advanced RE challenges. Analyse real malware samples in an isolated VM. Write up your analysis — this is your portfolio.',
        estimatedTime: 'Ongoing',
        type: 'job-ready',
        resources: [
          {
            title: 'picoCTF — beginner reverse engineering',
            url: 'https://picoctf.org',
            type: 'practice',
            platform: 'picoCTF',
            beginner: true,
          },
        ],
      },
    ],
  },

  {
    careerId: 'distributed-systems-engineer',
    totalEstimatedTime: '18–24 months',
    steps: [
      {
        step: 1,
        title: 'Backend Engineering Fundamentals',
        description:
          'Distributed systems engineering requires deep backend skills first. Get very strong in one language — Go, Java, or Rust are preferred. Build APIs and understand concurrency deeply.',
        estimatedTime: '8–10 weeks',
        type: 'foundation',
        resources: [
          {
            title: 'A Tour of Go — official tutorial',
            url: 'https://go.dev/tour/',
            type: 'free',
            platform: 'go.dev',
            beginner: true,
          },
        ],
      },
      {
        step: 2,
        title: 'Designing Data-Intensive Applications',
        description:
          'This book by Martin Kleppmann is the best resource for understanding how distributed systems work — databases, replication, consensus, stream processing. Read it cover to cover.',
        estimatedTime: '6–8 weeks',
        type: 'core',
        resources: [
          {
            title: 'Designing Data-Intensive Applications — companion site',
            url: 'https://dataintensive.net',
            type: 'book',
            platform: 'Martin Kleppmann',
            beginner: false,
          },
        ],
      },
      {
        step: 3,
        title: 'MIT 6.824 Distributed Systems',
        description:
          "MIT's distributed systems course is free online and has labs that require you to implement Raft consensus, distributed key-value stores, and MapReduce. This is the most respected learning path for this field.",
        estimatedTime: '10–14 weeks',
        type: 'core',
        resources: [
          {
            title: 'MIT 6.824 — Distributed Systems (free)',
            url: 'https://pdos.csail.mit.edu/6.824/',
            type: 'course',
            platform: 'MIT',
            beginner: false,
          },
        ],
      },
      {
        step: 4,
        title: 'Message Queues & Streaming',
        description:
          'Learn Apache Kafka — how it handles high-throughput messaging, how consumers work, and how it provides durability guarantees. Most large-scale distributed systems use it.',
        estimatedTime: '4–6 weeks',
        type: 'advanced',
        resources: [
          {
            title: 'Kafka — official documentation',
            url: 'https://kafka.apache.org/documentation/',
            type: 'free',
            platform: 'Apache Kafka',
            beginner: false,
          },
        ],
      },
      {
        step: 5,
        title: 'Consensus Algorithms & Database Internals',
        description:
          'Study Raft and Paxos consensus algorithms. Learn how databases are actually implemented — storage engines, WAL, MVCC. CMU 15-445 is the best free database internals course.',
        estimatedTime: '8–10 weeks',
        type: 'job-ready',
        resources: [
          {
            title: 'CMU 15-445 — Database Systems (free)',
            url: 'https://15445.courses.cs.cmu.edu',
            type: 'course',
            platform: 'Carnegie Mellon',
            beginner: false,
          },
          {
            title: 'The Paper Trail — distributed systems blog',
            url: 'https://www.the-paper-trail.org',
            type: 'free',
            platform: 'the-paper-trail.org',
            beginner: false,
          },
        ],
      },
    ],
  },
];

// ─── Free resource catalogue ───────────────────────────────────────────────
// A curated flat list of free resources across all careers for the /resources page.

export const FREE_CAREER_RESOURCES: CareerResource[] = [
  // Frontend
  {
    title: 'freeCodeCamp — Responsive Web Design',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    type: 'course',
    platform: 'freeCodeCamp',
    cost: 'free',
    level: 'beginner',
    description:
      'Hands-on HTML and CSS certification. Build 5 projects to earn the certificate.',
    recommended: true,
    careerId: 'frontend-developer',
  },
  {
    title: 'The Odin Project — Full Stack JavaScript',
    url: 'https://www.theodinproject.com/paths/full-stack-javascript',
    type: 'course',
    platform: 'The Odin Project',
    cost: 'free',
    level: 'beginner',
    description:
      'Comprehensive free curriculum covering HTML, CSS, JavaScript, Node.js, and React.',
    recommended: true,
    careerId: 'frontend-developer',
  },
  {
    title: 'javascript.info — The Modern JavaScript Tutorial',
    url: 'https://javascript.info',
    type: 'course',
    platform: 'javascript.info',
    cost: 'free',
    level: 'beginner',
    description:
      'The best free JavaScript reference available. Clear, accurate, and constantly updated.',
    recommended: true,
    careerId: 'frontend-developer',
  },
  {
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn',
    type: 'course',
    platform: 'MDN',
    cost: 'free',
    level: 'beginner',
    description:
      'The authoritative reference for HTML, CSS, and JavaScript. Essential bookmarked resource.',
    recommended: true,
    careerId: 'frontend-developer',
  },
  {
    title: 'Frontend Mentor',
    url: 'https://www.frontendmentor.io',
    type: 'practice',
    platform: 'Frontend Mentor',
    cost: 'freemium',
    level: 'beginner',
    description:
      'Real-world challenges with professional designs. Build your portfolio while practising.',
    recommended: true,
    careerId: 'frontend-developer',
  },
  // Backend
  {
    title: 'Full Stack Open — Helsinki University',
    url: 'https://fullstackopen.com/en/',
    type: 'course',
    platform: 'University of Helsinki',
    cost: 'free',
    level: 'intermediate',
    description:
      'Free, rigorous full-stack course. Covers React, Node, MongoDB, GraphQL, TypeScript.',
    recommended: true,
    careerId: 'backend-developer',
  },
  {
    title: 'SQLZoo — Interactive SQL',
    url: 'https://sqlzoo.net',
    type: 'practice',
    platform: 'SQLZoo',
    cost: 'free',
    level: 'beginner',
    description:
      'Interactive SQL challenges covering SELECT through window functions.',
    recommended: true,
    careerId: 'backend-developer',
  },
  // Data
  {
    title: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    type: 'course',
    platform: 'Kaggle',
    cost: 'free',
    level: 'beginner',
    description:
      'Short, free courses on Python, ML, SQL, and data visualisation. Certificates included.',
    recommended: true,
    careerId: 'data-analyst',
  },
  {
    title: 'fast.ai — Practical Deep Learning for Coders',
    url: 'https://course.fast.ai',
    type: 'course',
    platform: 'fast.ai',
    cost: 'free',
    level: 'intermediate',
    description:
      'The best free deep learning course. Top-down, practical approach — you build real models first.',
    recommended: true,
    careerId: 'data-scientist',
  },
  // Security
  {
    title: 'TryHackMe',
    url: 'https://tryhackme.com',
    type: 'practice',
    platform: 'TryHackMe',
    cost: 'freemium',
    level: 'beginner',
    description:
      'Browser-based learning platform for cybersecurity. Structured beginner paths available free.',
    recommended: true,
    careerId: 'cybersecurity-analyst',
  },
  {
    title: 'PortSwigger Web Security Academy',
    url: 'https://portswigger.net/web-security',
    type: 'practice',
    platform: 'PortSwigger',
    cost: 'free',
    level: 'intermediate',
    description:
      'Free, comprehensive web security training. Labs cover every OWASP vulnerability category.',
    recommended: true,
    careerId: 'security-engineer',
  },
  {
    title: 'Professor Messer — CompTIA courses',
    url: 'https://www.professormesser.com',
    type: 'video',
    platform: 'Professor Messer',
    cost: 'free',
    level: 'beginner',
    description:
      'Free video study guides for CompTIA Security+, Network+, and A+. The best free cert prep available.',
    recommended: true,
    careerId: 'cybersecurity-analyst',
  },
  // Cloud
  {
    title: 'AWS Skill Builder',
    url: 'https://skillbuilder.aws',
    type: 'course',
    platform: 'AWS',
    cost: 'freemium',
    level: 'beginner',
    description:
      "Amazon's official free learning platform. Hundreds of courses covering all AWS services.",
    recommended: true,
    careerId: 'cloud-engineer',
  },
  // DevOps
  {
    title: 'Docker official Get Started',
    url: 'https://docs.docker.com/get-started/',
    type: 'course',
    platform: 'Docker',
    cost: 'free',
    level: 'beginner',
    description:
      'Official Docker documentation and tutorials. Best place to start learning containers.',
    recommended: true,
    careerId: 'devops-engineer',
  },
  // AI
  {
    title: 'Hugging Face NLP Course',
    url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
    type: 'course',
    platform: 'Hugging Face',
    cost: 'free',
    level: 'intermediate',
    description:
      'Free course covering transformers, fine-tuning, and deploying NLP models.',
    recommended: true,
    careerId: 'ai-engineer',
  },
  // Specialist
  {
    title: 'Cryptopals Cryptographic Challenges',
    url: 'https://cryptopals.com',
    type: 'practice',
    platform: 'cryptopals.com',
    cost: 'free',
    level: 'advanced',
    description:
      'The best cryptography practice available. Learn by breaking real crypto implementations.',
    recommended: true,
    careerId: 'cryptography-engineer',
  },
  {
    title: 'MIT 6.824 Distributed Systems',
    url: 'https://pdos.csail.mit.edu/6.824/',
    type: 'course',
    platform: 'MIT',
    cost: 'free',
    level: 'advanced',
    description:
      'Free MIT course with labs requiring you to implement Raft, distributed KV stores, and MapReduce.',
    recommended: true,
    careerId: 'distributed-systems-engineer',
  },
  {
    title: 'AI Safety Fundamentals — BlueDot Impact',
    url: 'https://aisafetyfundamentals.com',
    type: 'course',
    platform: 'BlueDot Impact',
    cost: 'free',
    level: 'intermediate',
    description:
      'Structured AI safety curriculum. Best free introduction to alignment research.',
    recommended: true,
    careerId: 'ai-safety-researcher',
  },
  {
    title: 'ROS2 Official Tutorials',
    url: 'https://docs.ros.org/en/rolling/Tutorials.html',
    type: 'course',
    platform: 'ros.org',
    cost: 'free',
    level: 'intermediate',
    description:
      'The official ROS2 tutorials. Start here before any other robotics resource.',
    recommended: true,
    careerId: 'robotics-engineer',
  },
  {
    title: 'Google Technical Writing courses',
    url: 'https://developers.google.com/tech-writing',
    type: 'course',
    platform: 'Google Developers',
    cost: 'free',
    level: 'beginner',
    description:
      'Free courses covering technical writing fundamentals and advanced techniques. Highly practical.',
    recommended: true,
    careerId: 'technical-writer',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getRoadmapByCareerId(
  careerId: string,
): CareerRoadmap | undefined {
  return CAREER_ROADMAPS.find((r) => r.careerId === careerId);
}

export function getResourcesByCareerId(careerId: string): CareerResource[] {
  return FREE_CAREER_RESOURCES.filter((r) => r.careerId === careerId);
}
