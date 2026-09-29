// Edit this file to update the whole page.

export const profile = {
  name: 'Imanda Verliefd',
  role: 'Backend Developer',
  location: 'Malang, East Java, Indonesia',
  headline: 'I build the APIs and databases behind web and mobile apps.',
  summary:
    'Backend developer with 3+ years of experience building scalable, efficient web systems. Deep in Laravel, API development, and MySQL, with hands-on integrations like SATUSEHAT and payment gateways.',
  email: 'verliefd87@gmail.com',
  phone: '+62 878-2064-8163',
  phoneRaw: '6287820648163',
  linkedin: 'https://www.linkedin.com/in/imanda-verliefd',
  github: 'https://github.com/ImandaVerliefd', // TODO: replace with your GitHub URL
}

export const apiPreview = {
  name: profile.name,
  role: profile.role,
  location: 'Malang, ID',
  experience: '3+ years',
  stack: ['Laravel', 'MySQL', 'REST API'],
  integrations: ['SATUSEHAT', 'Payment Gateway'],
  current: 'PT. Digiponic Maju Jaya',
}

export const experience = [
  {
    role: 'Back End Developer',
    company: 'PT. Digiponic Maju Jaya',
    period: 'Apr 2026 – Present',
    points: [
      'Build ERP-based web applications with Laravel, from data models to day-to-day business workflows.',
      'Develop backend modules and RESTful APIs that connect ERP features to the rest of the system.',
      'Design and manage the MySQL databases behind business data and transactions.',
      'Maintain existing modules, fix bugs, and ship improvements.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'PT. Sekar Laut, Tbk.',
    period: 'Jun 2022 – Present',
    points: [
      'Built and maintained RESTful APIs that keep the web server and mobile apps in sync.',
      'Designed an automated reporting module with real-time visualizations and Excel/CSV export.',
      'Managed and optimized complex MySQL databases for integrity, availability, and query speed.',
      'Handled maintenance, bug fixing, and security updates.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'STIKES Pemkab Jombang',
    period: 'May 2024 – Nov 2025',
    points: [
      'Built a User Management System with APIs for master user data.',
      'Delivered the Merdeka Belajar Kampus Merdeka website, connected to that API.',
      'Created the Academic Information System covering campus data and business flow.',
    ],
  },
  {
    role: 'Back-end Developer',
    company: 'PT. Digital Business Innovation',
    period: 'Jan 2024 – Jul 2025',
    points: [
      'Built a multi-event management site with a CMS and payment gateway in Laravel.',
      'Built an online teaching and learning marketplace integrated with a payment gateway.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'RS Kristen Mojowarno',
    period: 'Jul 2023 – Jan 2025',
    points: [
      'Built a hospital website integrated with SATUSEHAT.',
      'Managed SIMRS data through the hospital REST API and synced it with Ministry of Health data.',
    ],
  },
  {
    role: 'Business incubator assistant',
    company: 'STIKI Malang',
    period: 'May 2022 – Jan 2024',
    points: ['Learned web development and contributed to small campus projects.'],
  },
  {
    role: 'Intern',
    company: 'MejaKita',
    period: 'Dec 2018 – Nov 2019',
    points: [
      'Built a custom CMS with CodeIgniter so non-technical users could edit site content.',
      'Shipped a cross-platform mobile app with React Native.',
      'Designed the relational schemas behind both.',
    ],
  },
]

export const projects = [
  {
    title: 'Hospital SATUSEHAT integration',
    text: 'Website and data sync between a hospital’s SIMRS and the Ministry of Health platform.',
    tags: ['SATUSEHAT', 'REST API', 'MySQL'],
  },
  {
    title: 'Academic Information System',
    text: 'Manages data and business flow for a campus, backed by a shared User Management API.',
    tags: ['Laravel', 'REST API', 'MySQL'],
  },
  {
    title: 'Multi-event platform',
    text: 'Event management site with a CMS and online payments.',
    tags: ['Laravel', 'CMS', 'Payment Gateway'],
  },
  {
    title: 'Teaching and learning marketplace',
    text: 'Online marketplace connecting teachers and learners, with checkout through a payment gateway.',
    tags: ['Laravel', 'Payment Gateway'],
  },
  {
    title: 'Automated reporting module',
    text: 'Real-time data visualizations with one-click Excel/CSV export.',
    tags: ['MySQL', 'Reporting', 'Excel/CSV'],
  },
]

export const skills = [
  { group: 'Backend', items: ['Laravel', 'CodeIgniter', 'Python', 'RESTful APIs'] },
  { group: 'Data', items: ['MySQL', 'Schema design', 'Query optimization', 'Excel/CSV reports'] },
  { group: 'Integrations', items: ['SATUSEHAT', 'Payment gateways', 'SIMRS'] },
  { group: 'Also', items: ['HTML', 'React Native'] },
]

export const education = [
  { school: 'STIKI Malang', detail: 'Bachelor’s degree, Information Technology', period: '2021 – 2025' },
  { school: 'SMK Negeri 4 Malang', detail: 'Computer Software Engineering', period: '2017 – 2020' },
]
