// Single source of truth for portfolio content.
// Edit this file to update what's shown on the site and what the AI chat knows.

export const profile = {
  siteUrl: "https://bablu-kumar-portfolio.vercel.app",
  name: "Bablu Kumar",
  initials: "BK",
  role: "MERN Stack Developer",
  tagline: "Full-Stack Developer · MERN & Next.js",
  location: "Chandigarh, India",
  yearsExperience: "2+",
  availability: "Open to full-time opportunities",
  summary:
    "MERN Stack Developer with 2+ years of experience building and scaling full-stack SaaS applications using React.js, Next.js, Node.js, and Express.js. Skilled in REST APIs, multi-tenant architecture, JWT/RBAC authentication, and performance optimization using MongoDB, Redis, and Elasticsearch.",
  contact: {
    email: "bk392534@gmail.com",
    phone: "+91 7667869102",
    linkedin: "https://www.linkedin.com/in/bablu-kumar-7b7028275/",
    github: "https://github.com/bablusharma13",
  },
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpg",
  languages: [
    { name: "Hindi", level: "Full Professional" },
    { name: "English", level: "Limited Working" },
  ],
  stats: [
    { label: "Years of experience", value: "2+" },
    { label: "SaaS platforms shipped", value: "3" },
    { label: "Domain records handled", value: "710M+" },
  ],
} as const;

export const skillGroups = [
  {
    category: "Programming",
    skills: ["JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    skills: [
      "Next.js",
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "TanStack React Query",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Mobile",
    skills: ["React Native", "Expo", "React Navigation"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "Socket.io"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "Redis"],
  },
  {
    category: "Search & Background Jobs",
    skills: ["Elasticsearch", "BullMQ"],
  },
  {
    category: "Payments",
    skills: ["Stripe", "Razorpay"],
  },
  {
    category: "DevOps & Tools",
    skills: ["CI/CD", "Docker", "Git", "GitHub", "Vercel", "Render", "Linux", "Postman"],
  },
  {
    category: "AI-Assisted Development",
    skills: ["Claude", "Codex", "ChatGPT", "Cursor", "Prompt Engineering"],
  },
] as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
  project?: {
    name: string;
    tech: string[];
    highlights: string[];
  };
};

export const experience: Experience[] = [
  {
    company: "AllHeart Web Pvt. Ltd.",
    role: "MERN Stack Developer",
    location: "Chandigarh, India",
    period: "July 2025 – Present",
    current: true,
    highlights: [
      "Built responsive frontend and backend features for a multi-tenant SaaS platform using React.js, Next.js, and Tailwind CSS.",
      "Developed secure REST APIs and authentication using Node.js, Express.js, JWT, and RBAC, with Elasticsearch-based search and Redis-optimized performance.",
    ],
    project: {
      name: "MarketXY — Domain Intelligence Platform",
      tech: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Elasticsearch",
        "Redis",
        "Redux Toolkit",
        "Stripe",
        "Docker",
      ],
      highlights: [
        "Built a domain intelligence platform indexing 710M+ domains and 230M+ company records across three applications with a shared Node.js backend.",
        "Developed REST APIs with JWT/RBAC, used MongoDB and Elasticsearch for domain, WHOIS, DNS, and SSL search, and integrated Stripe billing with Redis caching.",
        "Built async CSV/Excel/Parquet export with BullMQ and ExcelJS across 1,000+ API endpoints, and managed frontend state using Redux Toolkit and TanStack React Query.",
      ],
    },
  },
  {
    company: "Pisoft Informatics Pvt. Ltd.",
    role: "MERN Stack Developer",
    location: "Mohali District, India",
    period: "October 2024 – July 2025",
    highlights: [
      "Built and maintained web features using the MERN stack, with reusable React.js/Redux Toolkit UI components and REST APIs backed by MongoDB, MySQL, and Docker.",
    ],
    project: {
      name: "API Monitoring & Observability Platform",
      tech: [
        "Next.js",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "BullMQ",
        "Socket.io",
        "TypeScript",
        "Docker",
      ],
      highlights: [
        "Built a SaaS platform for real-time API health, uptime, and response-time monitoring with a Redis/BullMQ background engine.",
        "Implemented incident management, automated recovery detection, and live Socket.io dashboards.",
        "Secured the platform with JWT, RBAC, and rate limiting; added alerts, status pages, and Docker-based deployment.",
      ],
    },
  },
  {
    company: "A2IT InternEdge",
    role: "Web Development Intern",
    location: "Mohali District, India",
    period: "July 2023 – January 2024",
    highlights: [
      "Assisted in building responsive web pages with HTML, CSS, JavaScript, and React.js, and gained hands-on Git and REST API experience.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string[];
  tech: string[];
  type: "Company Project" | "Personal Project";
  links?: { github?: string; live?: string };
  note?: string;
};

export const projects: Project[] = [
  {
    name: "MarketXY",
    tagline: "Domain Intelligence Platform",
    type: "Company Project",
    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Elasticsearch",
      "Redis",
      "Redux Toolkit",
      "Stripe",
      "Docker",
    ],
    description: [
      "Domain intelligence platform indexing 710M+ domains and 230M+ company records across three applications with a shared Node.js backend.",
      "REST APIs with JWT/RBAC, and MongoDB + Elasticsearch-powered search across linked WHOIS, DNS, SSL, and IP/ASN data, plus Stripe billing with Redis caching.",
      "Async CSV/Excel/Parquet export pipeline with BullMQ and ExcelJS, backing a platform exposing 1,000+ API endpoints.",
    ],
    links: {
      live: "https://marketxy.com/",
    },
  },
  {
    name: "SyberFort",
    tagline: "Real-Time Domain Threat Intelligence & Brand Protection",
    type: "Company Project",
    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Elasticsearch",
      "Redis",
      "Docker",
    ],
    description: [
      "Real-time domain threat-intelligence platform scanning 12M+ domains daily across 10 intelligence layers — website fingerprint, WHOIS ownership, SSL, infrastructure, and typosquat/homoglyph detection.",
      "Self-serve security products (Due Diligence, Brand Monitor, Global Blacklist) backed by a 12M+ indicator feed with REST API and STIX/TAXII support for SIEM integration.",
      "Automated phishing and brand-impersonation detection with takedown workflows, powering due-diligence and fraud checks for government agencies, universities, and enterprises.",
    ],
    links: {
      live: "https://syberfort.com/",
    },
  },
  {
    name: "API Monitoring & Observability Platform",
    tagline: "Real-time uptime & incident monitoring SaaS",
    type: "Company Project",
    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.io",
      "TypeScript",
      "Docker",
    ],
    description: [
      "Real-time API health, uptime, and response-time monitoring with a Redis/BullMQ background engine.",
      "Incident management, automated recovery detection, and live Socket.io dashboards.",
      "Secured with JWT, RBAC, rate limiting, alerts, and status pages; Docker-based deployment.",
    ],
  },
  {
    name: "SmartCampus",
    tagline: "Multi-Tenant School / Coaching SaaS",
    type: "Personal Project",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.io",
      "Razorpay",
      "TypeScript",
      "Docker",
    ],
    description: [
      "Multi-tenant SaaS with 20+ features across six modules — academics, fees, communication, campus ops, an AI assistant, and admin/trust — covering admissions, attendance, exams, homework, library, and transport for student, parent, and staff roles.",
      "Secure REST APIs with JWT access/refresh tokens, OTP login, TOTP 2FA, and RBAC with per-member permission overrides; Razorpay billing with PDF receipt generation and a full audit trail.",
      "Built-in AI assistant (student analysis, parent reports, question drafts, doubt solver) alongside real-time parent-teacher chat, notices, and live class-status via Socket.io, backed by Redis/BullMQ background jobs.",
    ],
    links: {
      live: "https://smartcampus-t712.onrender.com/",
    },
    note: "Hosted on Render's free tier — the demo may take ~30s to wake up on first load.",
  },
];

export const education = [
  {
    school: "Punjab Technical University",
    degree: "Bachelor of Technology, Computer Science",
    period: "September 2021 – June 2025",
  },
  {
    school: "Zila School Chhapra, Saran (BSEB)",
    degree: "Intermediate, Mathematics and Science",
    period: "June 2018 – February 2020",
  },
  {
    school: "Utkramit M S Panapur Mohammedpur, Saran",
    degree: "Matriculation",
    period: "March 2017 – May 2018",
  },
];
