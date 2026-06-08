import type { RegionalSalary, SalaryRegion } from './types';

function uk(
  jr: [number, number],
  md: [number, number],
  sr: [number, number],
  ld: [number, number],
  fdMin: number,
  fdMax: number,
  fhMin: number,
  fhMax: number,
  note: string,
): RegionalSalary {
  return {
    region: 'uk',
    currency: 'GBP',
    currencySymbol: '£',
    ranges: [
      { level: 'junior', min: jr[0], max: jr[1], currency: 'GBP', location: 'UK' },
      { level: 'mid', min: md[0], max: md[1], currency: 'GBP', location: 'UK' },
      { level: 'senior', min: sr[0], max: sr[1], currency: 'GBP', location: 'UK' },
      { level: 'lead', min: ld[0], max: ld[1], currency: 'GBP', location: 'UK' },
    ],
    freelanceRate: {
      daily: { min: fdMin, max: fdMax },
      hourly: { min: fhMin, max: fhMax },
    },
    regionalNote: note,
  };
}

function us(
  jr: [number, number],
  md: [number, number],
  sr: [number, number],
  ld: [number, number],
  fdMin: number,
  fdMax: number,
  fhMin: number,
  fhMax: number,
  note: string,
): RegionalSalary {
  return {
    region: 'us',
    currency: 'USD',
    currencySymbol: '$',
    ranges: [
      { level: 'junior', min: jr[0], max: jr[1], currency: 'USD', location: 'US' },
      { level: 'mid', min: md[0], max: md[1], currency: 'USD', location: 'US' },
      { level: 'senior', min: sr[0], max: sr[1], currency: 'USD', location: 'US' },
      { level: 'lead', min: ld[0], max: ld[1], currency: 'USD', location: 'US' },
    ],
    freelanceRate: {
      daily: { min: fdMin, max: fdMax },
      hourly: { min: fhMin, max: fhMax },
    },
    regionalNote: note,
  };
}

function nigeria(
  jr: [number, number],
  md: [number, number],
  sr: [number, number],
  ld: [number, number],
  fdMin: number,
  fdMax: number,
  fhMin: number,
  fhMax: number,
  note: string,
): RegionalSalary {
  return {
    region: 'nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    ranges: [
      { level: 'junior', min: jr[0], max: jr[1], currency: 'NGN', location: 'Nigeria' },
      { level: 'mid', min: md[0], max: md[1], currency: 'NGN', location: 'Nigeria' },
      { level: 'senior', min: sr[0], max: sr[1], currency: 'NGN', location: 'Nigeria' },
      { level: 'lead', min: ld[0], max: ld[1], currency: 'NGN', location: 'Nigeria' },
    ],
    freelanceRate: {
      daily: { min: fdMin, max: fdMax, currency: 'USD', symbol: '$' },
      hourly: { min: fhMin, max: fhMax, currency: 'USD', symbol: '$' },
    },
    regionalNote: note,
  };
}

function europe(
  jr: [number, number],
  md: [number, number],
  sr: [number, number],
  ld: [number, number],
  fdMin: number,
  fdMax: number,
  fhMin: number,
  fhMax: number,
  note: string,
): RegionalSalary {
  return {
    region: 'europe',
    currency: 'EUR',
    currencySymbol: '€',
    ranges: [
      { level: 'junior', min: jr[0], max: jr[1], currency: 'EUR', location: 'Europe' },
      { level: 'mid', min: md[0], max: md[1], currency: 'EUR', location: 'Europe' },
      { level: 'senior', min: sr[0], max: sr[1], currency: 'EUR', location: 'Europe' },
      { level: 'lead', min: ld[0], max: ld[1], currency: 'EUR', location: 'Europe' },
    ],
    freelanceRate: {
      daily: { min: fdMin, max: fdMax },
      hourly: { min: fhMin, max: fhMax },
    },
    regionalNote: note,
  };
}

function global_(
  jr: [number, number],
  md: [number, number],
  sr: [number, number],
  ld: [number, number],
  fdMin: number,
  fdMax: number,
  fhMin: number,
  fhMax: number,
  note: string,
): RegionalSalary {
  return {
    region: 'global',
    currency: 'USD',
    currencySymbol: '$',
    ranges: [
      { level: 'junior', min: jr[0], max: jr[1], currency: 'USD', location: 'Global' },
      { level: 'mid', min: md[0], max: md[1], currency: 'USD', location: 'Global' },
      { level: 'senior', min: sr[0], max: sr[1], currency: 'USD', location: 'Global' },
      { level: 'lead', min: ld[0], max: ld[1], currency: 'USD', location: 'Global' },
    ],
    freelanceRate: {
      daily: { min: fdMin, max: fdMax },
      hourly: { min: fhMin, max: fhMax },
    },
    regionalNote: note,
  };
}

export const CAREER_REGIONAL_SALARIES: Record<string, RegionalSalary[]> = {
  'frontend-developer': [
    uk([28000,42000],[45000,65000],[68000,90000],[90000,120000],250,600,35,80,'London pays 20–30% above UK average. Fintech and scale-ups pay highest.'),
    us([65000,90000],[95000,130000],[135000,175000],[175000,220000],400,1000,60,140,'SF, NYC, and Seattle pay highest. Remote roles increasingly common at all levels.'),
    nigeria([2400000,4800000],[5000000,9600000],[10000000,18000000],[18000000,30000000],50,150,8,25,'International remote roles pay significantly more than local rates. Many Nigerian developers earn in USD working for foreign companies via Toptal, Andela, and Remote.com.'),
    europe([28000,45000],[48000,70000],[72000,95000],[95000,130000],250,650,35,90,'Germany, Netherlands, and Switzerland pay highest. Eastern Europe is lower but growing fast.'),
    global_([50000,85000],[85000,125000],[125000,170000],[160000,220000],200,800,30,110,'Highly location dependent. Remote-first companies often benchmark against local market rates.'),
  ],
  'backend-developer': [
    uk([30000,45000],[48000,68000],[70000,100000],[95000,130000],300,700,40,90,'London and financial services pay 20–30% above average. Go/Rust expertise commands premium.'),
    us([70000,95000],[100000,140000],[145000,190000],[185000,240000],450,1100,65,150,'Big Tech pays significantly above median. Distributed systems and fintech command top rates.'),
    nigeria([2800000,5200000],[5500000,10000000],[11000000,20000000],[20000000,35000000],60,175,10,28,'Node.js and Python engineers in highest demand. Remote contracts with UK/US companies pay USD rates.'),
    europe([30000,48000],[50000,75000],[78000,105000],[100000,140000],270,700,38,95,'Netherlands, Germany, and Nordics pay highest. Strong demand for cloud-native and microservices skills.'),
    global_([55000,90000],[90000,135000],[135000,180000],[170000,240000],220,900,32,125,'Remote backend roles highly available globally. Cloud skills increase earning power across all regions.'),
  ],
  'fullstack-developer': [
    uk([32000,48000],[50000,72000],[75000,105000],[100000,135000],300,700,42,95,'Startups and scale-ups value fullstack breadth. London premium applies across the board.'),
    us([72000,100000],[105000,145000],[150000,200000],[195000,250000],460,1100,65,155,'One of the most in-demand roles across the US. Startups often pay in equity as well.'),
    nigeria([2800000,5400000],[5600000,10500000],[11500000,21000000],[20000000,36000000],60,180,10,30,'Versatility valued highly at Nigerian startups and fintechs. Remote opportunities plentiful.'),
    europe([30000,50000],[52000,78000],[80000,110000],[105000,145000],270,720,38,100,'Very strong demand across Western Europe. React + Node.js or Vue + Django combinations especially valued.'),
    global_([55000,95000],[92000,140000],[140000,190000],[175000,250000],230,920,33,130,'Fullstack versatility is highly valued for remote work. Demand consistently outpaces supply globally.'),
  ],
  'cybersecurity-analyst': [
    uk([28000,42000],[45000,65000],[68000,90000],[88000,120000],250,550,35,75,'Government and defence sectors offer stable roles. Certifications like CISSP/CISM push salaries higher.'),
    us([60000,85000],[90000,125000],[130000,170000],[165000,215000],380,950,55,130,'Government and federal contracting adds a premium. Cleared positions pay 20–30% above market.'),
    nigeria([2200000,4200000],[4500000,8500000],[9000000,16000000],[15000000,26000000],45,130,7,22,'Growing rapidly due to fintech expansion. Certified analysts in very high demand at banks and telcos.'),
    europe([26000,42000],[45000,65000],[68000,92000],[90000,125000],230,580,32,80,'Germany and Netherlands lead. GDPR compliance work drives consistent demand across the EU.'),
    global_([45000,80000],[80000,120000],[120000,165000],[155000,210000],180,780,27,105,'Cloud security and SOC analyst roles are increasingly remote. Certifications matter globally.'),
  ],
  'security-engineer': [
    uk([35000,52000],[55000,78000],[82000,115000],[110000,150000],350,800,50,110,'Financial services and defence pay top rates. AppSec and cloud security command significant premium.'),
    us([85000,115000],[120000,160000],[165000,215000],[210000,270000],500,1200,70,165,'One of the highest-paid specialisms in tech. Bug bounty income can supplement significantly.'),
    nigeria([3200000,6000000],[6500000,12000000],[13000000,22000000],[21000000,38000000],70,200,11,32,'Critical shortage of skilled security engineers. Banks and fintechs actively recruiting at premium rates.'),
    europe([34000,55000],[58000,85000],[90000,120000],[115000,155000],300,820,42,112,'Strong demand driven by EU cybersecurity regulations. Netherlands and Germany highest paying.'),
    global_([65000,105000],[105000,155000],[155000,205000],[195000,265000],260,1000,37,140,'Remote security engineering roles growing. Penetration testing and cloud security most in demand.'),
  ],
  'cloud-engineer': [
    uk([32000,48000],[52000,75000],[78000,110000],[105000,145000],320,750,45,100,'AWS and Azure certifications significantly boost earnings. London and Manchester are hotspots.'),
    us([75000,105000],[110000,150000],[155000,200000],[195000,255000],480,1150,68,158,'Cloud spend continues to grow. Multi-cloud expertise commands significant premium over single-cloud.'),
    nigeria([2800000,5400000],[5800000,11000000],[12000000,21000000],[19000000,34000000],60,175,10,28,'AWS solutions architects in very high demand. Remote roles for global cloud companies increasingly accessible.'),
    europe([32000,52000],[55000,80000],[83000,112000],[108000,148000],280,740,40,100,'Strong demand across all major EU markets. Kubernetes and Terraform skills especially valued.'),
    global_([55000,95000],[95000,140000],[140000,190000],[180000,245000],225,940,32,128,'Cloud engineering is one of the most location-independent specialisms. Certifications matter everywhere.'),
  ],
  'devops-engineer': [
    uk([32000,48000],[52000,75000],[78000,110000],[105000,145000],320,750,45,100,'High demand across all sectors. Kubernetes, Terraform, and CI/CD expertise are essential.'),
    us([75000,105000],[110000,150000],[155000,200000],[195000,255000],480,1150,68,158,'SRE hybrid roles at Big Tech pay significantly above market. Platform engineering growing fast.'),
    nigeria([2800000,5200000],[5600000,10500000],[11000000,20000000],[19000000,34000000],58,170,9,27,'One of the most in-demand roles in Nigerian tech. Remote opportunities with global companies very common.'),
    europe([32000,52000],[55000,80000],[83000,112000],[108000,148000],280,740,40,100,'DACH region pays highest. Platform engineering and FinOps expertise command strong premiums.'),
    global_([55000,95000],[95000,140000],[140000,190000],[180000,245000],225,940,32,128,'DevOps/Platform engineering is highly remote-friendly. Cloud provider certifications increase global earning power.'),
  ],
  'data-analyst': [
    uk([25000,38000],[40000,58000],[60000,82000],[80000,108000],200,480,28,65,'SQL, Python, and Power BI/Tableau experience drive salary. Financial services pays above average.'),
    us([50000,72000],[75000,105000],[108000,145000],[140000,185000],320,800,45,110,'Finance and tech pay highest. Strong storytelling and stakeholder communication add significant value.'),
    nigeria([1800000,3600000],[3800000,7200000],[7500000,13500000],[12000000,22000000],38,110,6,18,'Growing rapidly in fintech and FMCG. Excel to Python/SQL transition significantly increases earning power.'),
    europe([24000,40000],[42000,62000],[64000,88000],[85000,116000],190,500,27,68,'Germany and Netherlands lead. Strong demand in finance, retail, and logistics sectors.'),
    global_([40000,70000],[70000,105000],[105000,145000],[135000,185000],160,650,23,88,'Remote data analyst roles growing. Business intelligence and cloud analytics skills most valued globally.'),
  ],
  'data-scientist': [
    uk([35000,52000],[55000,78000],[82000,115000],[110000,150000],350,800,50,110,'ML/AI specialisation commands a strong premium. Fintech and pharmaceuticals pay highest.'),
    us([85000,115000],[120000,160000],[165000,215000],[210000,275000],500,1250,70,170,'One of the fastest-growing and highest-paid roles in tech. Research backgrounds valued at top companies.'),
    nigeria([3200000,6000000],[6500000,12000000],[13000000,22000000],[20000000,36000000],65,190,10,30,'Very high demand, short supply. Fintech and telecoms leading adoption. Remote opportunities with global companies growing.'),
    europe([34000,55000],[58000,85000],[90000,120000],[115000,155000],300,820,42,112,'Germany, Netherlands, and Nordics pay highest. Research degrees and publication records add leverage.'),
    global_([65000,105000],[105000,155000],[155000,210000],[200000,270000],260,1050,37,145,'Highly sought globally. ML platform experience and production deployment skills especially valued for remote roles.'),
  ],
  'ai-engineer': [
    uk([38000,58000],[60000,88000],[90000,130000],[125000,170000],400,950,55,130,'One of the fastest-growing roles in UK tech. LLM fine-tuning and MLOps skills command highest rates.'),
    us([90000,125000],[130000,175000],[180000,235000],[225000,300000],550,1400,78,195,'Extraordinary demand from Big Tech, AI labs, and startups. Equity compensation often significant.'),
    nigeria([3600000,7000000],[7500000,14000000],[15000000,26000000],[24000000,42000000],75,220,12,35,'Emerging role with very high salary growth. Remote roles for US/EU AI companies pay in hard currency.'),
    europe([36000,60000],[62000,92000],[95000,130000],[125000,170000],320,900,45,125,'Rapid growth across all major EU tech hubs. Applied AI and MLOps skills especially in demand.'),
    global_([70000,115000],[115000,165000],[165000,225000],[215000,295000],280,1150,40,160,'AI engineering is the highest growth specialism globally. LLM deployment and inference optimisation command premium.'),
  ],
  'product-designer': [
    uk([28000,42000],[45000,65000],[68000,92000],[90000,122000],250,580,35,80,'Strong portfolio matters more than degree. Consumer tech and fintech pay above average.'),
    us([65000,90000],[92000,128000],[132000,175000],[170000,225000],400,1000,57,138,'Top-tier companies pay exceptionally well. Research skills and design systems experience highly valued.'),
    nigeria([2200000,4200000],[4500000,8500000],[9000000,16000000],[15000000,27000000],45,130,7,22,'Growing role in Nigerian tech. Strong Figma skills plus user research experience command highest rates.'),
    europe([28000,45000],[48000,70000],[72000,98000],[95000,130000],240,600,34,83,'Germany and Netherlands lead. Design systems and accessibility expertise increasingly valued.'),
    global_([48000,82000],[82000,122000],[122000,168000],[158000,220000],195,820,28,112,'UX/product design is moderately remote-friendly. Strong portfolio is the key differentiator globally.'),
  ],
  'product-manager': [
    uk([35000,52000],[55000,80000],[85000,120000],[115000,160000],350,850,50,118,'Fintech and SaaS companies pay highest. Technical background and data fluency command premium.'),
    us([80000,110000],[115000,155000],[160000,215000],[205000,270000],500,1250,70,175,'Senior PMs at major tech companies earn exceptionally well. Strong equity compensation common.'),
    nigeria([3000000,5800000],[6200000,11500000],[12000000,21000000],[20000000,35000000],60,175,9,28,'Scarce role in Nigerian tech. Those with international product experience command highest salaries.'),
    europe([34000,55000],[58000,85000],[88000,120000],[115000,158000],300,860,43,118,'DACH and Nordics pay highest. Agile and OKR experience essential across European markets.'),
    global_([60000,100000],[100000,148000],[148000,205000],[195000,262000],240,1000,34,140,'Senior PM roles increasingly accessible remotely. Data-driven and technical PMs most in demand globally.'),
  ],
  'technical-writer': [
    uk([25000,38000],[40000,58000],[60000,82000],[78000,105000],200,450,28,62,'API documentation and developer tooling experience pay above average. SaaS companies leading demand.'),
    us([55000,78000],[80000,108000],[112000,148000],[145000,192000],340,850,48,118,'Developer documentation and DevRel crossover roles pay highest. Remote-friendly by nature.'),
    nigeria([1800000,3400000],[3600000,6800000],[7200000,12500000],[11500000,20000000],36,105,6,17,'Emerging role. English fluency is a core advantage. International companies hiring Nigerian writers remotely.'),
    europe([24000,40000],[42000,62000],[64000,88000],[84000,114000],188,462,27,65,'Strong demand in SaaS and developer tooling companies. Germany and Netherlands pay above average.'),
    global_([40000,70000],[70000,105000],[105000,142000],[138000,188000],158,680,23,93,'Technical writing is well-suited to remote work. Developer documentation and API writing command premiums globally.'),
  ],
  'qa-engineer': [
    uk([25000,38000],[40000,58000],[60000,82000],[78000,105000],200,460,28,63,'Automation skills (Cypress, Playwright, Selenium) significantly increase salaries. Fintech pays highest.'),
    us([55000,78000],[80000,110000],[115000,150000],[148000,195000],340,860,48,120,'SDET roles (testing + development) command significant premium. AI-assisted testing growing fast.'),
    nigeria([1800000,3600000],[3800000,7200000],[7800000,13500000],[12500000,22000000],38,110,6,18,'Automation QA engineers in highest demand. Fintech and e-commerce leading hiring growth.'),
    europe([24000,40000],[42000,62000],[65000,88000],[85000,116000],192,472,27,66,'Germany, Netherlands, and Poland are strong QA markets. Automation expertise most valued.'),
    global_([42000,72000],[72000,108000],[108000,148000],[140000,192000],165,695,24,96,'QA is increasingly remote-friendly. Automation, CI/CD integration, and performance testing skills valued globally.'),
  ],
  'ethical-hacker': [
    uk([30000,45000],[50000,75000],[80000,120000],[115000,155000],300,750,42,105,'Bug bounty income can supplement significantly. Government and defence pay top rates for cleared staff.'),
    us([70000,95000],[100000,140000],[148000,200000],[195000,258000],450,1100,64,152,'Red team and offensive security roles at tech companies pay very well. Cleared positions add premium.'),
    nigeria([2500000,5000000],[5500000,10000000],[11000000,19000000],[18000000,32000000],55,160,9,26,'High-value skill with growing demand from Nigerian banks. Bug bounty and international consulting opportunities.'),
    europe([30000,48000],[52000,78000],[82000,112000],[108000,148000],270,760,38,105,'Netherlands, Germany, and Nordics lead. Penetration testing certifications (OSCP, CEH) essential.'),
    global_([52000,88000],[88000,132000],[132000,192000],[185000,252000],210,880,30,122,'Ethical hacking is highly sought globally. Remote engagements common for contract penetration testers.'),
  ],
  'cloud-architect': [
    uk([40000,58000],[65000,90000],[100000,150000],[145000,195000],400,950,55,132,'One of the highest-paid infrastructure roles. Multi-cloud expertise commands significant premium.'),
    us([95000,130000],[138000,185000],[195000,260000],[250000,325000],600,1500,85,210,'Senior cloud architects at major firms earn at the very top of tech compensation. AWS/GCP/Azure all in demand.'),
    nigeria([3800000,7200000],[7800000,14500000],[15500000,28000000],[26000000,46000000],80,240,13,38,'Very scarce role. Remote architecture roles for global companies increasingly accessible. Certification critical.'),
    europe([40000,62000],[68000,98000],[105000,142000],[138000,185000],360,960,51,132,'Senior cloud architects extremely well compensated across Western Europe. FinOps and hybrid cloud most valued.'),
    global_([72000,118000],[118000,175000],[175000,252000],[240000,320000],300,1200,43,168,'Cloud architecture is highly portable globally. Multi-cloud skills and FinOps experience command highest rates.'),
  ],
  'ml-engineer': [
    uk([38000,56000],[58000,84000],[88000,125000],[120000,162000],380,900,53,125,'MLOps and production deployment skills command premium. AI labs and fintech pay highest.'),
    us([88000,120000],[125000,168000],[175000,228000],[220000,290000],530,1350,75,188,'Extremely high demand from AI-first companies. GPU infrastructure and distributed training experience premium.'),
    nigeria([3400000,6600000],[7000000,13000000],[14000000,24000000],[22000000,40000000],70,210,11,33,'Emerging field with very high growth trajectory. Remote opportunities with global AI companies very accessible.'),
    europe([36000,58000],[60000,88000],[92000,125000],[120000,162000],308,920,44,128,'Rapidly growing across EU tech hubs. MLOps, PyTorch, and cloud ML platforms most in demand.'),
    global_([68000,110000],[110000,160000],[160000,218000],[208000,282000],272,1100,39,152,'ML engineering is global and remote-friendly. Production ML deployment and LLM integration most valued.'),
  ],
  'blockchain-developer': [
    uk([35000,52000],[58000,88000],[95000,145000],[138000,195000],350,900,50,125,'Highly variable. DeFi and Web3 startups pay in tokens as well as salary. London leads the UK market.'),
    us([80000,115000],[120000,168000],[172000,230000],[220000,295000],500,1300,70,180,'Web3 ecosystem volatile but high earners at peak. Traditional finance blockchain projects more stable.'),
    nigeria([3000000,5800000],[6200000,12000000],[13000000,23000000],[22000000,38000000],62,185,10,30,'Fintech blockchain applications growing. International crypto projects heavily recruit Nigerian developers.'),
    europe([32000,52000],[56000,85000],[90000,125000],[120000,165000],280,880,40,122,'Switzerland (Crypto Valley), Netherlands, and Germany lead. Token compensation common at Web3 startups.'),
    global_([58000,98000],[98000,148000],[148000,210000],[200000,278000],230,1050,33,145,'Blockchain development is globally accessible. Smart contract and DeFi expertise command highest global rates.'),
  ],
  'sre-engineer': [
    uk([35000,52000],[55000,78000],[82000,118000],[112000,152000],340,800,48,110,'On-call responsibilities often come with additional compensation. Platform and reliability skills well rewarded.'),
    us([85000,118000],[122000,162000],[168000,218000],[210000,275000],510,1280,72,178,'Big Tech SRE roles are among the highest compensated engineering positions. Incident management crucial.'),
    nigeria([3200000,6200000],[6600000,12500000],[13500000,23000000],[22000000,38000000],65,195,10,31,'Growing role as Nigerian tech matures. Remote SRE roles for global companies increasingly common.'),
    europe([34000,55000],[58000,84000],[88000,120000],[115000,155000],295,820,42,113,'Observability, Kubernetes, and incident management skills most valued. Germany and Netherlands lead.'),
    global_([62000,105000],[105000,155000],[155000,210000],[200000,268000],248,1040,35,145,'SRE roles highly remote-friendly. On-call premium and incident response experience valued globally.'),
  ],
  'platform-engineer': [
    uk([35000,52000],[55000,78000],[80000,115000],[108000,148000],330,780,47,108,'Rapidly growing as companies invest in developer productivity. Kubernetes and internal tooling expertise valued.'),
    us([82000,115000],[120000,160000],[165000,215000],[205000,268000],500,1250,70,175,'Internal developer platform roles growing fast at scale-ups and enterprises. Backstage and Crossplane skills premium.'),
    nigeria([3000000,5800000],[6200000,11500000],[12500000,22000000],[21000000,36000000],62,185,10,30,'Emerging role in Nigerian tech ecosystem. Remote platform engineering roles accessible with cloud skills.'),
    europe([33000,54000],[56000,82000],[85000,118000],[112000,152000],285,800,40,110,'DACH region and Nordics lead. Platform engineering with GitOps and IDP experience commands premium.'),
    global_([60000,102000],[102000,152000],[152000,205000],[195000,260000],240,1000,34,140,'Platform engineering is one of the fastest-growing roles globally. Developer experience skills command remote premium.'),
  ],
  'ai-safety-researcher': [
    uk([40000,60000],[65000,95000],[100000,148000],[140000,195000],420,1000,60,140,'Niche but fast-growing. Positions at leading AI labs (DeepMind, etc.) pay at the very top.'),
    us([95000,135000],[140000,190000],[200000,265000],[255000,340000],580,1450,82,200,'One of the highest-paid research roles. Labs like Anthropic, OpenAI, and DeepMind pay exceptionally well.'),
    nigeria([3600000,7000000],[7500000,14000000],[15000000,26000000],[24000000,42000000],72,215,11,34,'Very small but growing community. Remote research positions with global AI labs increasingly accessible.'),
    europe([38000,62000],[65000,96000],[102000,145000],[140000,190000],330,950,47,132,'AI research positions growing across EU, led by UK (pre-Brexit legacy), Germany, and Switzerland.'),
    global_([72000,118000],[118000,175000],[175000,255000],[245000,332000],290,1180,41,165,'AI safety is a global priority. Remote research roles at top labs accessible to qualified researchers worldwide.'),
  ],
  'embedded-systems-engineer': [
    uk([28000,42000],[45000,65000],[68000,95000],[90000,125000],250,580,35,80,'Aerospace, automotive, and defence command significant premiums. C/C++ and RTOS expertise essential.'),
    us([65000,88000],[90000,125000],[130000,172000],[168000,222000],400,1000,57,140,'Automotive (EV), aerospace, and robotics sectors pay highest. Security clearances add premium.'),
    nigeria([2200000,4200000],[4500000,8500000],[9000000,16000000],[15000000,26000000],45,132,7,21,'Growing in hardware and automotive sectors. Oil & gas sector hiring embedded engineers for IoT applications.'),
    europe([28000,46000],[48000,72000],[74000,102000],[98000,135000],235,595,33,83,'Germany leads due to automotive industry. AUTOSAR and functional safety (ISO 26262) expertise premium.'),
    global_([48000,82000],[82000,120000],[120000,165000],[158000,215000],192,810,27,113,'Embedded engineering less remote-friendly but opportunities exist in IoT and automotive software. C/C++ essential.'),
  ],
  'robotics-engineer': [
    uk([30000,45000],[50000,75000],[80000,120000],[115000,158000],295,700,42,98,'Defence, aerospace, and manufacturing lead hiring. ROS expertise widely required.'),
    us([72000,98000],[102000,140000],[148000,195000],[190000,250000],450,1120,64,155,'Autonomous vehicles, manufacturing automation, and defence pay highest. Boston and Bay Area hotspots.'),
    nigeria([2400000,4600000],[5000000,9500000],[10000000,18000000],[17000000,30000000],50,148,8,24,'Emerging sector. Agriculture and manufacturing automation driving demand. International research partnerships growing.'),
    europe([30000,50000],[52000,78000],[82000,115000],[110000,152000],252,715,36,100,'Germany, Netherlands, and Nordics lead. EU manufacturing automation investment driving strong demand.'),
    global_([52000,88000],[88000,132000],[132000,185000],[178000,242000],208,895,30,125,'Robotics engineering growing globally. Autonomous systems, ROS, and simulation (Gazebo) skills most valued.'),
  ],
  'cryptography-engineer': [
    uk([35000,52000],[58000,85000],[90000,135000],[128000,172000],340,820,48,115,'Specialist roles at banks and security firms pay at the top. Post-quantum cryptography emerging premium.'),
    us([85000,118000],[122000,165000],[172000,228000],[220000,295000],510,1280,72,178,'Financial institutions and government contractors pay highest. Clearances add 20–30% premium.'),
    nigeria([3000000,5800000],[6200000,12000000],[13000000,22000000],[20000000,36000000],60,178,10,28,'Very rare specialisation. Remote roles with global security companies most accessible path.'),
    europe([34000,55000],[58000,88000],[92000,128000],[122000,165000],292,840,41,116,'Switzerland, Germany, and Netherlands lead. Post-quantum and zero-knowledge proof expertise premium.'),
    global_([62000,105000],[105000,158000],[158000,218000],[208000,285000],248,1025,35,143,'Cryptography engineering is globally scarce and well-compensated. Post-quantum crypto expertise commands highest rates.'),
  ],
  'reverse-engineer': [
    uk([32000,48000],[52000,78000],[82000,125000],[118000,162000],310,760,44,106,'Government and defence pay top rates for cleared analysts. Malware analysis and vulnerability research premium.'),
    us([75000,105000],[112000,155000],[162000,215000],[205000,272000],465,1165,66,162,'Intelligence community and defence contractors pay highest. Security clearances essential for top-tier roles.'),
    nigeria([2600000,5000000],[5500000,10500000],[11500000,20000000],[19000000,34000000],55,162,9,26,'Rare but growing, especially in financial crime and fraud prevention. International security firms recruiting remotely.'),
    europe([30000,50000],[54000,82000],[86000,118000],[112000,152000],260,775,37,108,'Netherlands, Germany, and UK (pre-Brexit) lead. Malware research and vulnerability disclosure ecosystem active.'),
    global_([55000,95000],[95000,145000],[145000,205000],[195000,265000],218,930,31,130,'Reverse engineering is globally rare and well-rewarded. CTF track record and security research publications help.'),
  ],
  'distributed-systems-engineer': [
    uk([40000,60000],[65000,92000],[100000,148000],[140000,192000],390,940,55,130,'Trading firms, streaming platforms, and large-scale SaaS pay highest. London fintech is world-class.'),
    us([90000,125000],[132000,178000],[185000,248000],[238000,318000],545,1380,77,192,'Big Tech distributed systems roles are among the highest paid in engineering. Kafka, Flink, Cassandra expertise premium.'),
    nigeria([3600000,6800000],[7200000,13500000],[14500000,25000000],[23000000,42000000],70,208,11,33,'Remote distributed systems roles for global companies very accessible to skilled Nigerian engineers.'),
    europe([38000,62000],[65000,95000],[100000,138000],[132000,178000],318,958,45,132,'DACH region and Nordics lead. Financial and streaming platform companies pay highest across EU.'),
    global_([68000,112000],[112000,168000],[168000,238000],[228000,308000],272,1102,39,153,'Distributed systems expertise is globally scarce and well-compensated. Remote roles widely available at top companies.'),
  ],
};

export function getRegionalSalary(
  careerId: string,
  region: SalaryRegion,
): RegionalSalary | undefined {
  return CAREER_REGIONAL_SALARIES[careerId]?.find((r) => r.region === region);
}

export function formatRegionalRange(
  min: number,
  max: number,
  symbol: string,
): string {
  const fmt = (n: number): string => {
    if (n >= 1_000_000)
      return `${symbol}${(n / 1_000_000).toFixed(n % 100_000 === 0 ? 1 : 1)}M`;
    if (n >= 1000) return `${symbol}${(n / 1000).toFixed(0)}k`;
    return `${symbol}${n}`;
  };
  return `${fmt(min)} – ${fmt(max)}`;
}

export function formatFreelanceRate(
  rate: { min: number; max: number },
  symbol: string,
  period: 'daily' | 'hourly',
): string {
  const fmt = (n: number): string =>
    n >= 1000 ? `${symbol}${(n / 1000).toFixed(0)}k` : `${symbol}${n}`;
  const label = period === 'daily' ? 'per day' : 'per hour';
  return `${fmt(rate.min)} – ${fmt(rate.max)} ${label}`;
}

export const REGION_LABELS: Record<SalaryRegion, string> = {
  uk: '🇬🇧 UK',
  us: '🇺🇸 US',
  nigeria: '🇳🇬 Nigeria',
  europe: '🇪🇺 Europe',
  global: '🌍 Global',
};

export const REGION_FULL_LABELS: Record<SalaryRegion, string> = {
  uk: 'United Kingdom',
  us: 'United States',
  nigeria: 'Nigeria',
  europe: 'Europe',
  global: 'Global',
};
