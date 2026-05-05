import type { PersonInfo, SkillCategory, Experience, NavItem } from '@/types'

export const person: PersonInfo = {
  name: 'Raman Milash',
  firstName: 'Raman',
  lastName: 'Milash',
  title: 'Frontend Developer',
  subtitle: 'Middle+',
  bio: [
    "I'm an experienced Frontend Developer with over 5 years in different industries such as HealthTech, EduTech and IoT, specializing in React.",
    'As a team member, I\'ve contributed to the successful delivery of tasks, collaborating closely with teams.',
    'In addition to my existing skills, I continuously explore new technologies — from cross-platform mobile development to backend development.',
    'Strategic adopter of AI technologies in software engineering, skilled at integrating AI tools to enhance productivity.',
  ],
  yearsExp: 5,
  email: 'raman.milash@gmail.com',
  location: 'Remote',
  languages: [{ name: 'English', level: 'Upper Intermediate' }],
  education: 'Degree in Computer Science',
}

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core',
    skills: [
      { name: 'JavaScript', level: 95, yearsExp: 4, lastUsed: 2026 },
      { name: 'TypeScript', level: 92, yearsExp: 4, lastUsed: 2026 },
      { name: 'React', level: 95, yearsExp: 4, lastUsed: 2026 },
      { name: 'Next.js', level: 90, yearsExp: 4, lastUsed: 2026 },
    ],
  },
  {
    title: 'Styling',
    skills: [
      { name: 'CSS / SCSS', level: 95, yearsExp: 5, lastUsed: 2026 },
      { name: 'Tailwind CSS', level: 92, yearsExp: 5, lastUsed: 2026 },
      { name: 'Framer Motion', level: 85, yearsExp: 4, lastUsed: 2026 },
      { name: 'CSS Transitions', level: 95, yearsExp: 5, lastUsed: 2026 },
    ],
  },
  {
    title: 'State & Data',
    skills: [
      { name: 'Redux Toolkit', level: 88, yearsExp: 3, lastUsed: 2026 },
      { name: 'React Context', level: 90, yearsExp: 4, lastUsed: 2024 },
      { name: 'GraphQL', level: 78, yearsExp: 2, lastUsed: 2026 },
      { name: 'REST API', level: 95, yearsExp: 5, lastUsed: 2026 },
    ],
  },
  {
    title: 'Backend & Infra',
    skills: [
      { name: 'Node.js', level: 80, yearsExp: 3, lastUsed: 2026 },
      { name: 'Firebase', level: 72, yearsExp: 2, lastUsed: 2026 },
      { name: 'PostgreSQL', level: 70, yearsExp: 2, lastUsed: 2026 },
      { name: 'Docker', level: 68, yearsExp: 3, lastUsed: 2026 },
    ],
  },
  {
    title: 'Tooling',
    skills: [
      { name: 'Git', level: 95, yearsExp: 6, lastUsed: 2026 },
      { name: 'WebSocket', level: 85, yearsExp: 3, lastUsed: 2026 },
      { name: 'Jest / RTL', level: 78, yearsExp: 3, lastUsed: 2026 },
      { name: 'Webpack / Vite', level: 75, yearsExp: 2, lastUsed: 2026 },
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: 'dmc-saas',
    period: 'Feb 2026 – Present',
    dateFrom: '2026-02',
    dateTo: 'present',
    title: 'SaaS Platform for DMCs',
    role: 'Middle+ FullStack Developer',
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Supabase', 'Stripe', 'Vercel', 'Playwright'],
    description:
      'A platform for helping Destination Management Companies create proposals, manage itineraries, organize contacts and monitor trips.',
    achievements: [
      'Extended and enhanced existing proposal functionality, improving usability and aligning it with evolving business requirements.',
      'Maintained and supported the existing codebase, ensuring stability, performance, and timely resolution of issues.',
      'Integrated Stripe Connect to enable secure multi-party payments and payouts between platform users.',
      'Implemented Stripe Subscriptions including recurring billing logic, plan management, and subscription lifecycle handling.',
      'Developed and maintained end-to-end tests using Playwright, improving test coverage.',
    ],
    industry: 'Travel / SaaS',
  },
  {
    id: 'ecommerce',
    period: 'Aug 2025 – Feb 2026',
    dateFrom: '2025-08',
    dateTo: '2026-02',
    title: 'Content-driven E-commerce Platform',
    role: 'Middle+ FullStack Developer (Frontend oriented)',
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Framer Motion', 'MongoDB', 'Payload CMS', 'Medusa', 'Vercel'],
    description:
      'A platform for selling products with a strong focus on education, providing learning resources and guidance related to those products.',
    achievements: [
      'Set up the project architecture from scratch, defining the overall structure, tech stack, and development workflow.',
      'Developed the full frontend using Next.js, React, and Tailwind, including all landing pages and core e-commerce views.',
      'Designed and implemented a scalable, component-based UI system for consistent styling and reusability across the platform.',
      'Integrated and configured Payload CMS as a headless content management system.',
      'Set up and customized Medusa for e-commerce functionality including product management, cart, and checkout flows.',
    ],
    industry: 'E-commerce / EduTech',
  },
  {
    id: 'workflow',
    period: 'Apr 2023 – Aug 2025',
    dateFrom: '2023-04',
    dateTo: '2025-08',
    title: 'Platform to Digitize Workflows',
    role: 'Middle+ FullStack Developer (Frontend oriented)',
    stack: ['TypeScript', 'React', 'Redux', 'SCSS', 'WebSocket', 'GraphQL', 'Express', 'PostgreSQL', 'Redis', 'Azure'],
    description:
      'A platform designed to improve work processes — documenting maintenance and operational procedures, creating step-by-step work instructions, analyzing performance and tracking work history.',
    achievements: [
      'Supported and developed new features in a complex multi-tenant UI system.',
      'Implemented SSO with Microsoft Entra ID (Azure AD): SAML, OKTA and OIDC with custom claim mapping.',
      'Built an internal admin dashboard with real-time user analytics, translation management and tenant control.',
      'Integrated WebSocket-based real-time updates and implemented a live text chat feature.',
      'Implemented video call functionality using WebRTC and LiveKit.',
    ],
    industry: 'IoT / Enterprise',
  },
  {
    id: 'ai-video',
    period: 'Sep 2022 – Apr 2023',
    dateFrom: '2022-09',
    dateTo: '2023-04',
    title: 'AI Video Monitoring System',
    role: 'Middle Frontend Developer',
    stack: ['TypeScript', 'React', 'Redux', 'SCSS', 'D3.js', 'Docker', 'Python', 'Go', 'Django', 'PostgreSQL'],
    description:
      'A platform for tracking and analyzing processes using an AI-powered video tool with detailed analytics and comprehensive reports.',
    achievements: [
      'Planned and executed development processes for the frontend module.',
      'Implemented role-based UI logic and access control for different user types.',
      'Built graphs for analytics data using D3.js.',
      'Integrated reporting system with custom npm library for report creation by template.',
      'Optimized rendering performance for large datasets and video analytics dashboard.',
    ],
    industry: 'AI / Manufacturing',
  },
  {
    id: 'browser-ext',
    period: 'Mar 2021 – Sep 2022',
    dateFrom: '2021-03',
    dateTo: '2022-09',
    title: 'Browser Extension',
    role: 'Junior Frontend Developer',
    stack: ['TypeScript', 'React', 'Redux', 'Tailwind', 'Firebase', 'Next.js', 'NestJS', 'PostgreSQL'],
    description:
      'A browser extension for highlighting and translating text with "smart" subtitles for YouTube, Netflix, and Coursera, featuring synchronization with a companion website.',
    achievements: [
      'Integrated extension code into external DOM on video platforms.',
      'Implemented core extension functions: smart subtitles and translation.',
      'Implemented payment system on both client and server sides.',
      'Integrated authentication with Firebase.',
      'Improved website SEO implementing Core Web Vitals best practices.',
    ],
    industry: 'EduTech',
  },
]
