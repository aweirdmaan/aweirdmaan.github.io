export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  blurb: string;
  tech: string[];
  links: ProjectLink[];
}

// Drawn from github.com/aweirdmaan. Add or reorder freely.
export const projects: Project[] = [
  {
    name: 'Resource Tracker',
    blurb:
      'A cross-platform mobile app for tracking and managing shared resources, built with React Native (Expo) and a Node.js backend.',
    tech: ['React Native', 'Expo', 'Node.js'],
    links: [
      { label: 'Demo', href: 'https://youtu.be/HKbtxdxrvo0' },
      { label: 'App code', href: 'https://github.com/aweirdmaan/wce-resource-tracker' },
      { label: 'Backend', href: 'https://github.com/aweirdmaan/resource-tracker-backend' },
    ],
  },
  {
    name: 'Attendance & Payroll System',
    blurb:
      'A full-stack RFID-based attendance and payroll platform — React + Sass frontend, Node.js/PostgreSQL backend, and a Telegram bot for supervisors to log incentives and penalties. Final-year mini project.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Telegram Bot'],
    links: [
      { label: 'Frontend', href: 'https://github.com/aweirdmaan/fe-payroll-frontend' },
      { label: 'Backend', href: 'https://github.com/aweirdmaan/fe-payroll-backend' },
    ],
  },
  {
    name: 'Linux Diary — CTF Platform',
    blurb:
      'Infrastructure for a Capture The Flag event I ran as president of the Walchand Linux Users’ Group — Dockerized challenge containers deployed on AWS EC2.',
    tech: ['Docker', 'AWS EC2', 'Linux'],
    links: [{ label: 'Code', href: 'https://github.com/aweirdmaan/linux-diary' }],
  },
];
