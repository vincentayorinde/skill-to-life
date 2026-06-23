import type { RegionalSalary } from './types';

export const CAREER_SALARY_REGIONS: Record<string, RegionalSalary[]> = {
  'frontend-developer': [
    {
      region: 'uk',
      currency: 'GBP',
      currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 30000, max: 50000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 55000, max: 75000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 80000, max: 110000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 100000, max: 140000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 300, max: 600, currency: 'GBP' }, hourly: { min: 40, max: 80, currency: 'GBP' } },
      regionalNote: 'London commands a 20–30% premium. Remote-first companies often pay London rates nationally.',
    },
    {
      region: 'us',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 60000, max: 90000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 95000, max: 130000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 140000, max: 185000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 170000, max: 220000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 500, max: 1000, currency: 'USD' }, hourly: { min: 65, max: 130, currency: 'USD' } },
      regionalNote: 'FAANG and top-tier tech firms in SF/NYC offer total comp well above base. Remote roles show more variation.',
    },
    {
      region: 'nigeria',
      currency: 'NGN',
      currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1800000, max: 3600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 12000000, max: 21600000, currency: 'NGN', location: 'Nigeria' },
      ],
      freelanceRate: { daily: { min: 40000, max: 100000, currency: 'NGN' }, hourly: { min: 5000, max: 15000, currency: 'NGN' } },
      regionalNote: 'USD-paying remote roles from foreign companies typically pay 3–5× local market rates.',
    },
    {
      region: 'europe',
      currency: 'EUR',
      currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 60000, max: 80000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 85000, max: 120000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 110000, max: 150000, currency: 'EUR', location: 'Western Europe' },
      ],
      freelanceRate: { daily: { min: 350, max: 700, currency: 'EUR' }, hourly: { min: 45, max: 90, currency: 'EUR' } },
      regionalNote: 'Berlin, Amsterdam, and Zurich lead in salaries. Eastern Europe offers lower cost of living with competitive pay.',
    },
    {
      region: 'global',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 50000, max: 75000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 80000, max: 110000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 120000, max: 160000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 145000, max: 190000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Global figures represent USD-equivalent medians across remote-friendly roles internationally.',
    },
  ],

  'backend-developer': [
    {
      region: 'uk',
      currency: 'GBP',
      currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 32000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 58000, max: 78000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 85000, max: 115000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 105000, max: 145000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 350, max: 650, currency: 'GBP' }, hourly: { min: 45, max: 85, currency: 'GBP' } },
      regionalNote: 'Fintech and enterprise back-end roles in London command a significant premium.',
    },
    {
      region: 'us',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 65000, max: 95000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 100000, max: 140000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 150000, max: 195000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 180000, max: 230000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'USD' }, hourly: { min: 70, max: 140, currency: 'USD' } },
      regionalNote: 'Go, Rust, and Java/Spring specialisations command a premium. Systems-level engineers earn highest.',
    },
    {
      region: 'nigeria',
      currency: 'NGN',
      currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2000000, max: 4000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4000000, max: 8000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 8000000, max: 16000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 14000000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'API and microservices engineers with cloud experience are highly sought after by fintechs.',
    },
    {
      region: 'europe',
      currency: 'EUR',
      currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 62000, max: 85000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 90000, max: 125000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 115000, max: 155000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Germany and the Netherlands have strong demand for Java and Python back-end engineers.',
    },
    {
      region: 'global',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 55000, max: 80000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 85000, max: 120000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 130000, max: 170000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 155000, max: 200000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Back-end roles are among the most globally portable, with strong remote demand.',
    },
  ],

  'fullstack-developer': [
    {
      region: 'uk',
      currency: 'GBP',
      currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 32000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 58000, max: 80000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 85000, max: 118000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 108000, max: 148000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 350, max: 700, currency: 'GBP' }, hourly: { min: 45, max: 90, currency: 'GBP' } },
      regionalNote: 'Full-stack engineers are highly sought after by start-ups and scale-ups.',
    },
    {
      region: 'us',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 65000, max: 95000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 100000, max: 140000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 148000, max: 195000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 175000, max: 225000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'USD' }, hourly: { min: 70, max: 145, currency: 'USD' } },
      regionalNote: 'React + Node.js and Next.js stacks are the most in-demand combination.',
    },
    {
      region: 'nigeria',
      currency: 'NGN',
      currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2000000, max: 4200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4200000, max: 8400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 8400000, max: 16800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 14400000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Full-stack roles are highly favoured by Nigerian start-ups for their versatility.',
    },
    {
      region: 'europe',
      currency: 'EUR',
      currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 63000, max: 85000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 90000, max: 128000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 118000, max: 158000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Full-stack demand is uniform across Europe; Scandinavia pays a premium.',
    },
    {
      region: 'global',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 55000, max: 80000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 85000, max: 120000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 125000, max: 168000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 150000, max: 200000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Full-stack is one of the most remote-friendly roles globally.',
    },
  ],

  'cybersecurity-analyst': [
    {
      region: 'uk',
      currency: 'GBP',
      currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 28000, max: 45000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 50000, max: 70000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 75000, max: 100000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 95000, max: 130000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 350, max: 700, currency: 'GBP' }, hourly: { min: 45, max: 90, currency: 'GBP' } },
      regionalNote: 'Government and defence roles require SC/DV clearance, which commands a premium.',
    },
    {
      region: 'us',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 60000, max: 85000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 90000, max: 120000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 125000, max: 165000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 155000, max: 205000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 500, max: 1000, currency: 'USD' }, hourly: { min: 65, max: 130, currency: 'USD' } },
      regionalNote: 'Federal and DoD roles require clearance; private sector SOC roles are widespread.',
    },
    {
      region: 'nigeria',
      currency: 'NGN',
      currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1500000, max: 3000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 3000000, max: 6000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 6000000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 10000000, max: 18000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Financial sector and telcos are top cybersecurity employers in Nigeria.',
    },
    {
      region: 'europe',
      currency: 'EUR',
      currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 32000, max: 50000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 55000, max: 75000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 80000, max: 110000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 105000, max: 140000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'GDPR compliance drives demand; Germany and Netherlands are cybersecurity hubs.',
    },
    {
      region: 'global',
      currency: 'USD',
      currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 48000, max: 70000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 75000, max: 105000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 110000, max: 150000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 140000, max: 185000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Cybersecurity is one of the fastest-growing fields globally with a talent shortage.',
    },
  ],

  'security-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 60000, max: 85000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 90000, max: 125000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 115000, max: 155000, currency: 'GBP', location: 'United Kingdom' },
      ],
      regionalNote: 'Strong demand in fintech and cloud-native companies.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 75000, max: 105000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 115000, max: 155000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 160000, max: 210000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 195000, max: 255000, currency: 'USD', location: 'United States' },
      ],
      regionalNote: 'Application security and cloud security engineers command highest pay.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 9600000, max: 19200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 16000000, max: 28000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Demand is rising rapidly as Nigerian enterprises adopt cloud-first architectures.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 42000, max: 62000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 68000, max: 92000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 98000, max: 135000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 128000, max: 170000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'High demand from banks, insurance firms, and cloud providers.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 60000, max: 90000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 95000, max: 135000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 145000, max: 190000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 175000, max: 230000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Security engineers are among the highest-paid engineers globally.',
    },
  ],

  'cloud-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 60000, max: 82000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 88000, max: 120000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 110000, max: 150000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 400, max: 800, currency: 'GBP' }, hourly: { min: 55, max: 105, currency: 'GBP' } },
      regionalNote: 'AWS and Azure certifications significantly boost earnings in the UK market.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 75000, max: 105000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 110000, max: 150000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 155000, max: 205000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 185000, max: 245000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 600, max: 1200, currency: 'USD' }, hourly: { min: 75, max: 155, currency: 'USD' } },
      regionalNote: 'Multi-cloud and Kubernetes expertise commands strong premiums.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 9600000, max: 19200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 16000000, max: 28000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Cloud adoption in Nigeria is accelerating; certified cloud engineers are scarce.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 40000, max: 62000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 68000, max: 90000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 95000, max: 132000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 125000, max: 165000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Hyperscaler migrations driving demand in Germany, Netherlands, and Scandinavia.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 60000, max: 90000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 95000, max: 130000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 140000, max: 185000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 168000, max: 220000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Cloud engineering is a globally remote-friendly discipline with high demand.',
    },
  ],

  'devops-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 32000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 58000, max: 80000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 85000, max: 115000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 108000, max: 148000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 380, max: 750, currency: 'GBP' }, hourly: { min: 50, max: 98, currency: 'GBP' } },
      regionalNote: 'Kubernetes and Terraform expertise strongly correlates with higher pay.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 70000, max: 100000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 105000, max: 145000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 150000, max: 198000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 180000, max: 238000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 575, max: 1150, currency: 'USD' }, hourly: { min: 72, max: 148, currency: 'USD' } },
      regionalNote: 'DevOps + security (DevSecOps) engineers earn 15–25% above pure DevOps.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2200000, max: 4400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4400000, max: 8800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 8800000, max: 17600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 15000000, max: 26000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'DevOps is a priority hire at Nigerian fintechs scaling their engineering infrastructure.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 62000, max: 85000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 90000, max: 125000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 118000, max: 158000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Strong DevOps market in Germany, Sweden, and Switzerland.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 56000, max: 85000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 90000, max: 125000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 132000, max: 178000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 158000, max: 212000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'DevOps is highly portable with remote work well-established in this discipline.',
    },
  ],

  'data-analyst': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 25000, max: 40000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 42000, max: 60000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 65000, max: 90000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 85000, max: 115000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 250, max: 500, currency: 'GBP' }, hourly: { min: 32, max: 65, currency: 'GBP' } },
      regionalNote: 'SQL + Power BI/Tableau skills are most valued in UK enterprise hiring.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 50000, max: 75000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 78000, max: 108000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 112000, max: 148000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 140000, max: 180000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 400, max: 800, currency: 'USD' }, hourly: { min: 50, max: 100, currency: 'USD' } },
      regionalNote: 'Analytics engineering and dbt expertise moving analysts closer to engineering pay.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1200000, max: 2400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 8000000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Data analysts are high in demand in the Nigerian banking, e-commerce, and media sectors.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 28000, max: 45000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 48000, max: 68000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 72000, max: 100000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 95000, max: 128000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Netherlands and Germany are mature markets for data analyst roles.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 40000, max: 62000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 65000, max: 92000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 95000, max: 130000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 120000, max: 162000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Data analyst is one of the most accessible entry points into tech globally.',
    },
  ],

  'data-scientist': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 60000, max: 82000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 88000, max: 122000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 115000, max: 155000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 400, max: 800, currency: 'GBP' }, hourly: { min: 52, max: 105, currency: 'GBP' } },
      regionalNote: 'PhD holders command 10–20% premium; NLP and computer vision attract highest offers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 80000, max: 115000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 120000, max: 162000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 168000, max: 220000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 205000, max: 265000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 700, max: 1400, currency: 'USD' }, hourly: { min: 90, max: 180, currency: 'USD' } },
      regionalNote: 'Research-focused roles at big tech often include RSU packages worth 50–100% of base.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 9600000, max: 19200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 16800000, max: 28800000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'International remote data science roles are accessible and increasingly popular in Nigeria.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 70000, max: 95000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 100000, max: 138000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 132000, max: 175000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Switzerland and Sweden pay top rates; strong demand in pharma and finance.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 65000, max: 95000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 100000, max: 140000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 148000, max: 198000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 182000, max: 240000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Data scientists are among the highest-paid professionals in tech globally.',
    },
  ],

  'ai-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 70000, max: 98000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 105000, max: 145000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 138000, max: 185000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'GBP' }, hourly: { min: 70, max: 140, currency: 'GBP' } },
      regionalNote: 'LLM and GenAI specialists are the most in-demand and highest paid in 2024–25.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 100000, max: 145000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 150000, max: 205000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 210000, max: 280000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 265000, max: 350000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 900, max: 1800, currency: 'USD' }, hourly: { min: 115, max: 225, currency: 'USD' } },
      regionalNote: 'AI engineers at frontier labs (OpenAI, Anthropic, DeepMind) earn significantly above market.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 14400000, max: 28800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 24000000, max: 43200000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'AI engineering is emerging in Nigeria; international remote roles are the highest-paying path.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 55000, max: 82000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 88000, max: 122000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 130000, max: 175000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 168000, max: 220000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'AI hubs in Germany, France, and Sweden are scaling fast with government backing.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 85000, max: 125000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 130000, max: 178000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 185000, max: 245000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 230000, max: 310000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'AI engineering is the fastest-growing and highest-paying discipline in tech globally.',
    },
  ],

  'product-designer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 28000, max: 45000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 48000, max: 68000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 72000, max: 100000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 95000, max: 130000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 280, max: 580, currency: 'GBP' }, hourly: { min: 36, max: 75, currency: 'GBP' } },
      regionalNote: 'Figma proficiency and design system ownership significantly increase value.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 55000, max: 82000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 88000, max: 120000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 128000, max: 170000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 158000, max: 210000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 480, max: 960, currency: 'USD' }, hourly: { min: 60, max: 120, currency: 'USD' } },
      regionalNote: 'Product design at big tech (Apple, Google, Meta) pays on par with engineering.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1200000, max: 2400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 8400000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Product design is one of the most accessible tech careers for Nigerians to break into internationally.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 32000, max: 50000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 55000, max: 75000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 80000, max: 112000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 108000, max: 145000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Amsterdam and Berlin have strong product design scenes with many remote-first companies.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 70000, max: 100000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 108000, max: 148000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 138000, max: 185000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Remote product design roles have grown significantly; portfolio quality drives salary.',
    },
  ],

  'product-manager': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 32000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 58000, max: 82000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 88000, max: 125000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 118000, max: 162000, currency: 'GBP', location: 'United Kingdom' },
      ],
      regionalNote: 'B2B SaaS PMs with technical backgrounds earn a strong premium.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 70000, max: 100000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 108000, max: 148000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 155000, max: 208000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 195000, max: 265000, currency: 'USD', location: 'United States' },
      ],
      regionalNote: 'FAANG PMs have total comp packages that often exceed $300k with equity.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1800000, max: 3600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 12000000, max: 21600000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'PM roles at Nigerian fintechs and multinationals are among the most competitive.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 65000, max: 90000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 95000, max: 132000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 128000, max: 175000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Germany and Sweden are strong markets for technical product managers.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 55000, max: 82000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 90000, max: 128000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 135000, max: 182000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 168000, max: 228000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Product management is highly valued globally across all tech sectors.',
    },
  ],

  'technical-writer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 22000, max: 35000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 36000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 54000, max: 75000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 72000, max: 98000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 200, max: 400, currency: 'GBP' }, hourly: { min: 25, max: 52, currency: 'GBP' } },
      regionalNote: 'API documentation and developer experience writers earn the most.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 45000, max: 65000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 68000, max: 92000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 95000, max: 130000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 122000, max: 165000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 350, max: 700, currency: 'USD' }, hourly: { min: 45, max: 90, currency: 'USD' } },
      regionalNote: 'Technical writers at developer-first companies (Stripe, Twilio) earn near engineering salaries.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 800000, max: 1800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 1800000, max: 3600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 6000000, max: 10800000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Remote technical writing for international companies is well-suited to Nigerian writers.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 26000, max: 40000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 42000, max: 60000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 62000, max: 85000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 80000, max: 108000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Developer documentation roles at open-source companies are well compensated.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 58000, max: 80000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 82000, max: 115000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 108000, max: 148000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Technical writing is remote-friendly and globally accessible.',
    },
  ],

  'qa-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 24000, max: 38000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 40000, max: 58000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 62000, max: 85000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 80000, max: 108000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 250, max: 500, currency: 'GBP' }, hourly: { min: 32, max: 65, currency: 'GBP' } },
      regionalNote: 'SDET (Software Development Engineer in Test) roles command near-engineer pay.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 50000, max: 72000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 75000, max: 102000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 108000, max: 142000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 135000, max: 178000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 400, max: 800, currency: 'USD' }, hourly: { min: 52, max: 100, currency: 'USD' } },
      regionalNote: 'Automation QA engineers using Playwright or Cypress earn significantly more than manual testers.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1000000, max: 2000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 2000000, max: 4200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 4200000, max: 8400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 7200000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'QA is a good entry point into the Nigerian tech industry.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 28000, max: 44000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 46000, max: 66000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 70000, max: 95000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 90000, max: 120000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Automation QA is increasingly valued across the EU tech ecosystem.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 60000, max: 85000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 90000, max: 125000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 118000, max: 158000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'QA automation engineers have strong remote prospects globally.',
    },
  ],

  'ethical-hacker': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 30000, max: 50000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 55000, max: 78000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 82000, max: 115000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 108000, max: 148000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 400, max: 900, currency: 'GBP' }, hourly: { min: 52, max: 115, currency: 'GBP' } },
      regionalNote: 'Bug bounty hunters in the UK supplement salary significantly with programme payouts.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 65000, max: 95000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 100000, max: 140000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 148000, max: 195000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 182000, max: 245000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 650, max: 1300, currency: 'USD' }, hourly: { min: 82, max: 165, currency: 'USD' } },
      regionalNote: 'Red team leads and pentest consultants frequently bill $200+/hr.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1800000, max: 3600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 12000000, max: 21600000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Bug bounty hunting on global platforms is a lucrative path for Nigerian ethical hackers.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 36000, max: 56000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 60000, max: 85000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 90000, max: 125000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 118000, max: 160000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Penetration testers are in high demand across EU financial and critical infrastructure sectors.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 52000, max: 78000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 82000, max: 118000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 128000, max: 172000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 158000, max: 215000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Ethical hacking is globally remote-accessible through bug bounty programmes.',
    },
  ],

  'cloud-architect': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 50000, max: 72000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 78000, max: 108000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 115000, max: 155000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 148000, max: 200000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 600, max: 1200, currency: 'GBP' }, hourly: { min: 78, max: 155, currency: 'GBP' } },
      regionalNote: 'Enterprise cloud architects are among the highest earners in UK tech.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 110000, max: 150000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 158000, max: 210000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 218000, max: 285000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 272000, max: 360000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 900, max: 1800, currency: 'USD' }, hourly: { min: 115, max: 228, currency: 'USD' } },
      regionalNote: 'Cloud architects with AWS SA Professional or GCP Fellow credentials command top of market.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 9600000, max: 19200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 19200000, max: 36000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 30000000, max: 54000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Cloud architects are extremely scarce in Nigeria; commanding very high local salaries.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 65000, max: 92000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 98000, max: 135000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 142000, max: 190000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 182000, max: 245000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Switzerland and Luxembourg pay highest in Europe for cloud architects.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 90000, max: 132000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 140000, max: 190000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 198000, max: 260000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 245000, max: 325000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Cloud architects rank among the highest-paid professionals in technology worldwide.',
    },
  ],

  'ml-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 70000, max: 100000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 108000, max: 148000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 142000, max: 192000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'GBP' }, hourly: { min: 70, max: 140, currency: 'GBP' } },
      regionalNote: 'DeepMind, BenevolentAI, and UK fintech pay above market for ML engineers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 105000, max: 148000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 155000, max: 210000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 218000, max: 290000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 272000, max: 360000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 900, max: 1800, currency: 'USD' }, hourly: { min: 115, max: 228, currency: 'USD' } },
      regionalNote: 'ML engineers working on production LLMs are among the most sought-after globally.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 14400000, max: 28800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 24000000, max: 43200000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Remote ML engineering is a major income opportunity for Nigerian engineers.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 55000, max: 80000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 88000, max: 122000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 130000, max: 178000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 170000, max: 228000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'European AI hubs in Germany, France, and Sweden offer competitive ML packages.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 88000, max: 128000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 135000, max: 185000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 192000, max: 255000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 240000, max: 318000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'ML engineering is one of the most highly compensated disciplines in tech.',
    },
  ],

  'blockchain-developer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 40000, max: 62000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 68000, max: 95000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 100000, max: 138000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 130000, max: 178000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 500, max: 1000, currency: 'GBP' }, hourly: { min: 65, max: 130, currency: 'GBP' } },
      regionalNote: 'Smart contract and DeFi protocol engineers earn top of market in crypto companies.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 85000, max: 120000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 128000, max: 172000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 178000, max: 238000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 220000, max: 295000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 750, max: 1500, currency: 'USD' }, hourly: { min: 95, max: 190, currency: 'USD' } },
      regionalNote: 'Token compensation is common in DeFi and Web3 companies; base + tokens packages vary widely.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3000000, max: 6000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 6000000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 12000000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 20000000, max: 36000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Blockchain adoption in Nigeria is strong, particularly in DeFi and crypto payments.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 48000, max: 72000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 78000, max: 108000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 115000, max: 158000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 150000, max: 200000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Switzerland, Germany, and Malta are blockchain development hotspots.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 72000, max: 105000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 112000, max: 155000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 162000, max: 215000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 200000, max: 268000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Blockchain roles are highly remote-friendly and globally distributed.',
    },
  ],

  'sre-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 38000, max: 58000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 62000, max: 88000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 92000, max: 128000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 120000, max: 162000, currency: 'GBP', location: 'United Kingdom' },
      ],
      regionalNote: 'SRE at hyperscalers in London pays among the highest in UK tech.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 90000, max: 125000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 130000, max: 175000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 182000, max: 240000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 225000, max: 298000, currency: 'USD', location: 'United States' },
      ],
      regionalNote: 'Google SRE roles pioneered this discipline; they pay top-of-market consistently.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3000000, max: 6000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 6000000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 12000000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 20000000, max: 36000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'SRE is a growing discipline in Nigerian tech, particularly at fintechs.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 45000, max: 68000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 72000, max: 100000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 108000, max: 145000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 138000, max: 185000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'SRE is in high demand across European hyperscaler offices.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 72000, max: 108000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 115000, max: 158000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 165000, max: 218000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 200000, max: 265000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'SRE is one of the most remote-capable and well-compensated disciplines globally.',
    },
  ],

  'platform-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 38000, max: 60000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 65000, max: 90000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 95000, max: 132000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 125000, max: 168000, currency: 'GBP', location: 'United Kingdom' },
      ],
      regionalNote: 'Internal developer platforms (IDPs) engineers are among the most impactful and well-paid.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 85000, max: 120000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 128000, max: 170000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 178000, max: 235000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 218000, max: 288000, currency: 'USD', location: 'United States' },
      ],
      regionalNote: 'Platform engineering is the fastest-growing discipline within infrastructure engineering.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3000000, max: 6000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 6000000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 12000000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 20000000, max: 36000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Large Nigerian tech companies are starting to invest in internal developer platforms.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 45000, max: 68000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 72000, max: 100000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 108000, max: 148000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 142000, max: 190000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Platform engineering demand is strong in Germany, Netherlands, and Sweden.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 70000, max: 105000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 112000, max: 155000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 162000, max: 215000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 198000, max: 262000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Platform engineers are highly sought after globally as organisations scale.',
    },
  ],

  'ai-safety-researcher': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 55000, max: 85000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 90000, max: 130000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 138000, max: 195000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 188000, max: 265000, currency: 'GBP', location: 'United Kingdom' },
      ],
      regionalNote: 'DeepMind, UK Frontier AI Safety Institute, and Anthropic UK are key employers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 120000, max: 180000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 190000, max: 265000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 278000, max: 380000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 360000, max: 500000, currency: 'USD', location: 'United States' },
      ],
      regionalNote: 'Anthropic, OpenAI, and DeepMind pay frontier-level compensation; equity adds significantly.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 6000000, max: 12000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 12000000, max: 24000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 24000000, max: 48000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 40000000, max: 72000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Most AI safety roles are remote or in major AI hubs; Nigerian researchers typically work remotely for international labs.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 70000, max: 105000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 112000, max: 158000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 168000, max: 230000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 225000, max: 310000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'European AI safety is growing rapidly with new institutes in France, Germany, and Brussels.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 105000, max: 158000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 168000, max: 238000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 248000, max: 345000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 328000, max: 455000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'AI safety is one of the highest-paying fields in all of technology.',
    },
  ],

  'embedded-systems-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 30000, max: 48000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 52000, max: 75000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 80000, max: 112000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 108000, max: 148000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 350, max: 700, currency: 'GBP' }, hourly: { min: 45, max: 90, currency: 'GBP' } },
      regionalNote: 'Defence, automotive (Jaguar, MIRA), and IoT sectors are top employers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 68000, max: 98000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 102000, max: 142000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 148000, max: 198000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 188000, max: 248000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'USD' }, hourly: { min: 70, max: 140, currency: 'USD' } },
      regionalNote: 'SpaceX, Tesla, and Apple hardware teams are top employers in embedded systems.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 1800000, max: 3600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 12000000, max: 21600000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Embedded systems engineering is emerging in Nigeria with IoT and smart devices adoption.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 36000, max: 55000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 58000, max: 82000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 88000, max: 122000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 118000, max: 158000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Germany is the top market for embedded systems engineers due to automotive industry demand.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 55000, max: 82000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 88000, max: 122000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 130000, max: 175000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 165000, max: 218000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Embedded engineers are in high demand globally in automotive, aerospace, and IoT.',
    },
  ],

  'robotics-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 32000, max: 52000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 55000, max: 80000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 85000, max: 120000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 115000, max: 158000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 400, max: 800, currency: 'GBP' }, hourly: { min: 52, max: 105, currency: 'GBP' } },
      regionalNote: 'UK robotics is growing in logistics (Amazon), healthcare, and defence.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 75000, max: 108000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 115000, max: 158000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 165000, max: 218000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 205000, max: 272000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 600, max: 1200, currency: 'USD' }, hourly: { min: 78, max: 155, currency: 'USD' } },
      regionalNote: 'Boston Dynamics, Figure AI, and Tesla Optimus are leading employers.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2000000, max: 4000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4000000, max: 8000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 8000000, max: 16000000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 13000000, max: 22000000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Robotics is nascent in Nigeria; most opportunities are through international remote roles.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 38000, max: 60000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 65000, max: 92000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 98000, max: 135000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 130000, max: 175000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Germany, Sweden, and Denmark lead Europe in robotics engineering demand.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 62000, max: 92000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 98000, max: 138000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 145000, max: 195000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 182000, max: 242000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Robotics engineers are highly valued globally as automation expands across industries.',
    },
  ],

  'cryptography-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 70000, max: 100000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 108000, max: 150000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 142000, max: 195000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'GBP' }, hourly: { min: 70, max: 142, currency: 'GBP' } },
      regionalNote: 'GCHQ, NCSC, and UK fintech firms are top employers for cryptographers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 95000, max: 138000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 145000, max: 198000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 205000, max: 275000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 258000, max: 345000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 800, max: 1600, currency: 'USD' }, hourly: { min: 100, max: 200, currency: 'USD' } },
      regionalNote: 'NSA, tech giants, and crypto firms pay extremely high rates for cryptographers.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 3600000, max: 7200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 7200000, max: 14400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 14400000, max: 28800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 24000000, max: 43200000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Cryptography is a highly specialised field; most Nigerian cryptographers work internationally.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 52000, max: 80000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 85000, max: 120000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 128000, max: 175000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 168000, max: 228000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Switzerland, Germany, and France have strong cryptography research and industry communities.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 82000, max: 122000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 128000, max: 178000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 185000, max: 248000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 232000, max: 312000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Cryptography engineers are among the most specialised and well-paid in technology.',
    },
  ],

  'reverse-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 35000, max: 55000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 60000, max: 88000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 92000, max: 130000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 122000, max: 168000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 450, max: 900, currency: 'GBP' }, hourly: { min: 58, max: 115, currency: 'GBP' } },
      regionalNote: 'GCHQ, NCA, defence contractors, and AV firms are top UK employers.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 80000, max: 115000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 122000, max: 168000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 175000, max: 235000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 218000, max: 295000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 700, max: 1400, currency: 'USD' }, hourly: { min: 90, max: 178, currency: 'USD' } },
      regionalNote: 'NSA, Crowdstrike, Mandiant, and defence primes pay top-of-market.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 2400000, max: 4800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 4800000, max: 9600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 9600000, max: 19200000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 16000000, max: 28800000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Reverse engineering talent is scarce in Nigeria; most opportunities are with international firms.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 42000, max: 65000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 68000, max: 98000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 105000, max: 145000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 138000, max: 188000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Security research and malware analysis are the primary employer segments in Europe.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 68000, max: 100000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 108000, max: 150000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 158000, max: 212000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 198000, max: 268000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Reverse engineers are among the most specialised and highest-paid security professionals.',
    },
  ],

  'distributed-systems-engineer': [
    {
      region: 'uk', currency: 'GBP', currencySymbol: '£',
      ranges: [
        { level: 'junior', min: 45000, max: 68000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'mid', min: 72000, max: 102000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'senior', min: 110000, max: 152000, currency: 'GBP', location: 'United Kingdom' },
        { level: 'lead', min: 145000, max: 198000, currency: 'GBP', location: 'United Kingdom' },
      ],
      freelanceRate: { daily: { min: 550, max: 1100, currency: 'GBP' }, hourly: { min: 70, max: 140, currency: 'GBP' } },
      regionalNote: 'Fintech, trading systems, and cloud providers are top employers in the UK.',
    },
    {
      region: 'us', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 105000, max: 150000, currency: 'USD', location: 'United States' },
        { level: 'mid', min: 158000, max: 215000, currency: 'USD', location: 'United States' },
        { level: 'senior', min: 225000, max: 298000, currency: 'USD', location: 'United States' },
        { level: 'lead', min: 278000, max: 368000, currency: 'USD', location: 'United States' },
      ],
      freelanceRate: { daily: { min: 900, max: 1800, currency: 'USD' }, hourly: { min: 115, max: 228, currency: 'USD' } },
      regionalNote: 'Kafka, Cassandra, and consensus algorithm expertise command the highest premiums.',
    },
    {
      region: 'nigeria', currency: 'NGN', currencySymbol: '₦',
      ranges: [
        { level: 'junior', min: 4200000, max: 8400000, currency: 'NGN', location: 'Nigeria' },
        { level: 'mid', min: 8400000, max: 16800000, currency: 'NGN', location: 'Nigeria' },
        { level: 'senior', min: 16800000, max: 33600000, currency: 'NGN', location: 'Nigeria' },
        { level: 'lead', min: 28000000, max: 50400000, currency: 'NGN', location: 'Nigeria' },
      ],
      regionalNote: 'Extremely rare skill in Nigeria; engineers typically work remotely for international companies.',
    },
    {
      region: 'europe', currency: 'EUR', currencySymbol: '€',
      ranges: [
        { level: 'junior', min: 60000, max: 90000, currency: 'EUR', location: 'Western Europe' },
        { level: 'mid', min: 95000, max: 135000, currency: 'EUR', location: 'Western Europe' },
        { level: 'senior', min: 142000, max: 195000, currency: 'EUR', location: 'Western Europe' },
        { level: 'lead', min: 188000, max: 252000, currency: 'EUR', location: 'Western Europe' },
      ],
      regionalNote: 'Large-scale distributed systems engineers are in very short supply across Europe.',
    },
    {
      region: 'global', currency: 'USD', currencySymbol: '$',
      ranges: [
        { level: 'junior', min: 90000, max: 132000, currency: 'USD', location: 'Global Median' },
        { level: 'mid', min: 140000, max: 192000, currency: 'USD', location: 'Global Median' },
        { level: 'senior', min: 200000, max: 268000, currency: 'USD', location: 'Global Median' },
        { level: 'lead', min: 252000, max: 335000, currency: 'USD', location: 'Global Median' },
      ],
      regionalNote: 'Distributed systems engineers are among the highest-paid engineers in the world.',
    },
  ],
};
