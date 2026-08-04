export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  id: string
  name: string
  eyebrow: string
  headline: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  contribution: string[]
  stack: string[]
  metrics: ProjectMetric[]
  image?: string
  imageAlt?: string
  githubUrl?: string
  liveUrl?: string
  externalLabel?: string
  accent: 'green' | 'blue' | 'amber' | 'violet' | 'slate'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'fieldline',
    name: 'Fieldline',
    eyebrow: 'Open source · LoRaWAN infrastructure',
    headline: 'A multi-tenant operating layer for campus sensor networks.',
    summary: 'Fieldline gives schools one place to onboard organizations, provision gateways and sensors, monitor live readings, and route data through APIs, webhooks, and CSV exports.',
    challenge: 'Private LoRaWAN deployments are powerful, but the operational details are unforgiving. Device keys are write-only, gateway terminology conflicts with server terminology, and each organization needs strict data isolation.',
    approach: 'I turned those field failures into product requirements. Fieldline maps each organization to a ChirpStack tenant, generates secure device credentials server-side, provides model-specific setup guidance, and enforces organization scope on every backend route.',
    outcome: 'The platform is battle-tested against a real Oberlin College deployment with a rooftop Milesight gateway, air-quality sensors, and energy sensors feeding a community dashboard.',
    contribution: [
      'Designed the multi-tenant product and backend boundaries across two Next.js consoles, a Hono API, ChirpStack, MQTT, and a datastore service.',
      'Built admin-provisioned onboarding, forced-password setup, organization-scoped API tokens, HMAC-signed webhooks, and computed device alerts.',
      'Documented the real hardware failure modes so another operator can reproduce the deployment without repeating the same mistakes.',
    ],
    stack: ['TypeScript', 'Next.js', 'Hono', 'ChirpStack', 'MQTT', 'Python', 'Docker'],
    metrics: [
      { value: '3', label: 'data export paths' },
      { value: '2', label: 'operator and school consoles' },
      { value: 'MIT', label: 'open-source license' },
    ],
    image: '/images/fieldline/fieldline-platform.png',
    imageAlt: 'Fieldline campus sensor network platform illustration',
    githubUrl: 'https://github.com/2024frank/fieldline',
    externalLabel: 'Open-source repository',
    accent: 'green',
    featured: true,
  },
  {
    id: 'pdf-reader-even-g2',
    name: 'PDF Reader for Even G2',
    eyebrow: 'Shipped product · Wearable computing',
    headline: 'Readable documents on a display that was not built for documents.',
    summary: 'A PDF and Word document reader for Even G2 smart glasses, available through Even Hub and used by more than 1,600 people.',
    challenge: 'The glasses can display text, but their native text renderer cannot reliably preserve mathematical symbols, custom fonts, tables, diagrams, or the spatial structure of a real document.',
    approach: 'I reframed the problem as visual delivery. The app renders source pages into high-resolution image panels, then uses Smart Flow to place cuts around sentences, tables, forms, and figures before sending tiled images to the glasses.',
    outcome: 'Users can read source-faithful documents panel by panel, reconnect without losing their place, and choose larger reading presets for dense material.',
    contribution: [
      'Owned product requirements, document processing, simulator validation, release readiness, and the Even Hub launch.',
      'Designed an image-first rendering pipeline that preserves symbols and layout instead of rebuilding a PDF as plain text.',
      'Implemented resilient tiled delivery, saved reading progress, and reconnect recovery for a constrained wearable display.',
    ],
    stack: ['React', 'TypeScript', 'PDF.js', 'Even Hub SDK', 'Firebase', 'Stripe'],
    metrics: [
      { value: '1,600+', label: 'users' },
      { value: 'PDF + DOCX', label: 'document support' },
      { value: '576 × 288', label: 'display target' },
    ],
    image: '/images/pdf-reader/big-text-preview.png',
    imageAlt: 'Big Text document preview rendered for Even G2 smart glasses',
    liveUrl: 'https://hub.evenrealities.com/',
    externalLabel: 'Available in Even Hub',
    accent: 'blue',
  },
  {
    id: 'ai-community-calendar',
    name: 'AI Community Calendar',
    eyebrow: 'Grant-funded pilot · Civic AI',
    headline: 'Turning scattered event pages into shared community infrastructure.',
    summary: 'A multi-tenant platform that discovers, extracts, deduplicates, reviews, and publishes community events while keeping a human in control.',
    challenge: 'Oberlin organizations maintain separate calendars in different formats. Events are missed because no person can continuously monitor every site and repost everything into a shared calendar.',
    approach: 'I built an agent workflow that follows source-specific extraction instructions, validates each event, catches semantic duplicates, enriches incomplete records, and sends qualified events to a reviewer or directly to a destination.',
    outcome: 'The pilot feeds the Community Calendar used across 23 public display signs and a weekly newsletter, with a path to additional Cleveland neighborhoods.',
    contribution: [
      'Designed the product with Professor John Petersen and translated a civic information problem into a measurable AI pilot.',
      'Built a review system with provenance, per-run timelines, real model cost tracking, role-based access, and multi-tenant isolation.',
      'Created a reliability model that holds incomplete events, preserves source links, and records every automated decision for review.',
    ],
    stack: ['Next.js', 'TypeScript', 'Drizzle', 'MySQL', 'Agent APIs', 'Vercel'],
    metrics: [
      { value: '23+', label: 'public display signs' },
      { value: '10+', label: 'source institutions' },
      { value: '3', label: 'publishing modes' },
    ],
    githubUrl: 'https://github.com/2024frank/ai-calendar',
    liveUrl: 'https://ai-calendar-pi.vercel.app',
    externalLabel: 'View live pilot',
    accent: 'amber',
  },
  {
    id: 'environmental-dashboard',
    name: 'Oberlin Environmental Dashboard',
    eyebrow: 'Production infrastructure · Campus IoT',
    headline: 'Making a distributed sensor network observable and dependable.',
    summary: 'Hardware, data, and monitoring infrastructure that supports environmental information across the Oberlin campus.',
    challenge: 'Dozens of distributed devices created silent failures, inconsistent readings, and limited operational visibility across a campus-wide system.',
    approach: 'I built Python and SQL ingestion pipelines, REST APIs, monitoring dashboards, and anomaly checks while managing the hardware lifecycle from deployment through documentation.',
    outcome: 'The system processes more than 10,000 readings each day across 30+ IoT nodes with zero data loss since deployment and clearer network-wide operational decisions.',
    contribution: [
      'Owned architecture, deployment, testing, documentation, and field support for the infrastructure lifecycle.',
      'Shipped real-time dashboards tracking uptime, latency, and data integrity across more than 25 deployments.',
      'Introduced automated anomaly detection that reduced system failure rates by 40 percent.',
    ],
    stack: ['Python', 'SQL', 'REST APIs', 'Grafana', 'AWS', 'LoRaWAN', 'Solar power'],
    metrics: [
      { value: '10,000+', label: 'readings per day' },
      { value: '30+', label: 'IoT nodes' },
      { value: '40%', label: 'fewer failures' },
    ],
    image: '/images/air-quality/IMG_6354.jpg',
    imageAlt: 'Outdoor air-quality monitoring hardware deployed at Oberlin College',
    accent: 'slate',
  },
  {
    id: 'chirpstack-deploy',
    name: 'ChirpStack Deploy',
    eyebrow: 'Open source · Infrastructure playbook',
    headline: 'A field-tested path from gateway hardware to a private LoRaWAN network.',
    summary: 'Deployment automation and operational documentation for ChirpStack v4, Docker, and Milesight gateways on AWS or local hardware.',
    challenge: 'Vendor terminology, blocked network ports, and insecure defaults make private LoRaWAN deployments fail in ways that are difficult to diagnose from generic setup guides.',
    approach: 'I captured the exact gateway, sub-band, MQTT, and security configurations that worked against real hardware, then automated server provisioning and headless device registration.',
    outcome: 'The repository turns repeated field failures into a reproducible deployment path and an ordered security checklist.',
    contribution: [
      'Built one-command EC2 provisioning and a Docker-based local deployment path.',
      'Documented gateway and sub-band naming traps that caused real connection failures.',
      'Added scripts for device registration and live MQTT validation.',
    ],
    stack: ['ChirpStack', 'Docker', 'AWS EC2', 'MQTT', 'Shell', 'Python'],
    metrics: [
      { value: '2', label: 'deployment targets' },
      { value: '8', label: 'US915 sub-bands' },
      { value: 'MIT', label: 'open-source license' },
    ],
    githubUrl: 'https://github.com/2024frank/chirpstack-deploy',
    externalLabel: 'Open-source repository',
    accent: 'green',
  },
  {
    id: 'ar-memory-journal',
    name: 'AR Memory Journal',
    eyebrow: 'HackHarvard · Rapid product delivery',
    headline: 'Location-based memories built in one weekend.',
    summary: 'An iOS prototype that anchors personal notes to real-world locations and restores them through shared spatial data.',
    challenge: 'Our three-person team entered the hackathon without prior ARKit experience and had 36 hours to produce a working experience.',
    approach: 'We narrowed scope to one clear interaction, learned the spatial APIs while building, and used Firebase to synchronize notes and anchor data across devices.',
    outcome: 'The team delivered a functioning prototype within the hackathon window and demonstrated rapid learning under a fixed deadline.',
    contribution: [
      'Helped scope the minimum viable interaction and divide work across a three-person team.',
      'Implemented the mobile experience with Swift, ARKit, Firebase, and Unity.',
      'Validated the end-to-end flow under a 36-hour delivery constraint.',
    ],
    stack: ['Swift', 'ARKit', 'Firebase', 'Unity', 'iOS'],
    metrics: [
      { value: '36 hrs', label: 'build window' },
      { value: '3', label: 'team members' },
      { value: '0', label: 'prior ARKit projects' },
    ],
    accent: 'violet',
  },
]

export const experiences = [
  {
    role: 'Hardware & Software Manager',
    organization: 'Oberlin Environmental Dashboard',
    period: 'Jun 2025 to Present',
    description: 'Own the infrastructure lifecycle for campus environmental systems, spanning field hardware, data pipelines, APIs, monitoring, testing, and documentation.',
  },
  {
    role: 'Software Engineer Intern',
    organization: 'Anansenet Limited',
    period: 'Nov 2024 to Jan 2025',
    description: 'Secured connected-hardware infrastructure with AWS Cognito and RBAC, reviewed 50+ pull requests, and shipped production TypeScript interfaces.',
  },
  {
    role: 'Help Desk Technology Consultant',
    organization: 'Oberlin College CIT',
    period: 'Aug 2024 to Dec 2025',
    description: 'Resolved 40+ software, hardware, and network issues per week and built a 300+ incident knowledge base that surfaced recurring failure patterns.',
  },
]

export const capabilities = [
  {
    title: 'Program ownership',
    description: 'Translate ambiguous problems into requirements, milestones, risks, acceptance criteria, and release decisions.',
  },
  {
    title: 'Systems architecture',
    description: 'Work across devices, networks, APIs, data stores, observability, and deployment rather than optimizing one layer in isolation.',
  },
  {
    title: 'Reliability and operations',
    description: 'Instrument the system, document failure modes, and design recovery paths before a prototype becomes production infrastructure.',
  },
  {
    title: 'Technical delivery',
    description: 'Build enough of the system directly to make better tradeoffs, unblock teams, and verify that the program works end to end.',
  },
]

export const education = [
  'Oberlin College, B.A. in the 3-2 Engineering Program, expected May 2027',
  'Columbia University, engineering continuation planned for 2027 to 2029',
]

export const recognition = [
  'STRONG Scholar',
  'Arthur Blank Fellow',
  'MLK Internship Program Recipient',
  'Oberlin AI Micro Grant Recipient',
]
