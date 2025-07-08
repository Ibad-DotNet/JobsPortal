// Mock data for the application

export const recruitersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@volmatica.com',
    gender: 'Male',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@volmatica.com',
    gender: 'Female',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@volmatica.com',
    gender: 'Male',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@volmatica.com',
    gender: 'Female',
    status: 'Active'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@volmatica.com',
    gender: 'Male',
    status: 'Active'
  }
];

export const jobPostsData = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    description: 'We are looking for a senior frontend developer with expertise in React and modern web technologies.',
    responsibilities: 'Develop user interfaces, optimize performance, collaborate with design team, mentor junior developers.',
    qualifications: 'Bachelor\'s degree in Computer Science, 5+ years React experience, proficiency in JavaScript/TypeScript.',
    salaryMin: 80000,
    salaryMax: 120000,
    stage: 'Technical Interview',
    status: 'Active',
    candidates: [
      {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        status: 'Screening',
        cvFile: 'alex_johnson_cv.pdf'
      },
      {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        status: 'Technical Interview',
        cvFile: 'maria_garcia_cv.pdf'
      }
    ]
  },
  {
    id: 2,
    title: 'Backend Developer',
    description: 'Join our team as a backend developer working with Node.js and cloud technologies.',
    responsibilities: 'Design APIs, implement server logic, database optimization, cloud deployment.',
    qualifications: 'Bachelor\'s degree, 3+ years Node.js experience, cloud platform knowledge.',
    salaryMin: 70000,
    salaryMax: 100000,
    stage: 'Screening',
    status: 'Active',
    candidates: [
      {
        id: 3,
        name: 'Robert Chen',
        email: 'robert.chen@email.com',
        status: 'Final Call',
        cvFile: 'robert_chen_cv.pdf'
      }
    ]
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    description: 'Creative UX/UI designer to join our design team and create amazing user experiences.',
    responsibilities: 'Create wireframes, design prototypes, user research, collaborate with development team.',
    qualifications: 'Design degree, 4+ years experience, proficiency in Figma/Adobe Creative Suite.',
    salaryMin: 60000,
    salaryMax: 90000,
    stage: 'Final Call',
    status: 'Active',
    candidates: [
      {
        id: 4,
        name: 'Lisa Wong',
        email: 'lisa.wong@email.com',
        status: 'Offered',
        cvFile: 'lisa_wong_portfolio.pdf'
      }
    ]
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    description: 'Experienced DevOps engineer to manage our infrastructure and deployment pipelines.',
    responsibilities: 'Manage CI/CD pipelines, infrastructure automation, monitoring and logging, security implementation.',
    qualifications: 'Bachelor\'s degree, 4+ years DevOps experience, AWS/Azure certification preferred.',
    salaryMin: 85000,
    salaryMax: 125000,
    stage: 'Screening',
    status: 'Inactive',
    candidates: []
  },
  {
    id: 5,
    title: 'Product Manager',
    description: 'Strategic product manager to drive product development and roadmap planning.',
    responsibilities: 'Product strategy, roadmap planning, stakeholder management, market research.',
    qualifications: 'MBA or equivalent, 5+ years product management experience, technical background preferred.',
    salaryMin: 90000,
    salaryMax: 140000,
    stage: 'Technical Interview',
    status: 'Active',
    candidates: [
      {
        id: 5,
        name: 'James Miller',
        email: 'james.miller@email.com',
        status: 'Screening',
        cvFile: 'james_miller_cv.pdf'
      },
      {
        id: 6,
        name: 'Amanda Taylor',
        email: 'amanda.taylor@email.com',
        status: 'Technical Interview',
        cvFile: 'amanda_taylor_cv.pdf'
      }
    ]
  }
];