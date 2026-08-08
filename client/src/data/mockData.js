export const platformStats = {
  totalUsers: 12480,
  revenue: '₹18.4L',
  activeFreelancers: 2840,
  jobSuccessRate: '91%',
}

export const clientStats = {
  activeGigs: 5,
  proposalsReceived: 23,
  totalSpent: '₹2,45,000',
}

export const freelancerStats = {
  earnings: '₹1,85,000',
  profileViews: 342,
  applications: 18,
}

export const freelancers = [
  {
    id: 1,
    name: 'Ananya Rao',
    title: 'React & Node.js Specialist',
    location: 'Bengaluru',
    avatar: 'https://i.pravatar.cc/150?img=5',
    skills: ['React', 'Node.js', 'MongoDB'],
    rating: 4.9,
    reviewCount: 48,
    hourlyRate: '₹1,200/hr',
    completedJobs: 62,
    verified: true,
  },
  {
    id: 2,
    name: 'Kabir Mehta',
    title: 'Brand Designer',
    location: 'Mumbai',
    avatar: 'https://i.pravatar.cc/150?img=12',
    skills: ['Figma', 'Branding', 'Illustration'],
    rating: 4.8,
    reviewCount: 35,
    hourlyRate: '₹950/hr',
    completedJobs: 41,
    verified: true,
  },
  {
    id: 3,
    name: 'Sara Thomas',
    title: 'SEO & Content Strategist',
    location: 'Kochi',
    avatar: 'https://i.pravatar.cc/150?img=9',
    skills: ['SEO', 'Content', 'Analytics'],
    rating: 4.7,
    reviewCount: 29,
    hourlyRate: '₹800/hr',
    completedJobs: 33,
    verified: false,
  },
  {
    id: 4,
    name: 'Rahul Verma',
    title: 'Full-Stack Developer',
    location: 'Delhi',
    avatar: 'https://i.pravatar.cc/150?img=15',
    skills: ['React', 'Python', 'PostgreSQL'],
    rating: 4.9,
    reviewCount: 51,
    hourlyRate: '₹1,400/hr',
    completedJobs: 78,
    verified: true,
  },
]

export const gigs = [
  {
    id: 1,
    title: 'Build a React booking dashboard',
    description: 'Need a responsive booking dashboard with calendar integration, payment hooks, and admin panel for a local hotel chain.',
    client: 'GreenStay Hotels',
    category: 'Web Development',
    location: 'Bengaluru',
    budget: 75000,
    budgetLabel: '₹75,000',
    type: 'Milestone Based',
    status: 'Open',
    postedDate: '2026-07-10',
    skills: ['React', 'Bootstrap', 'API Integration'],
    rating: 4.8,
    proposalsCount: 12,
    milestones: [
      { id: 1, title: 'UI wireframes & prototype', amount: 15000, dueDate: '2026-07-20' },
      { id: 2, title: 'Core booking module', amount: 35000, dueDate: '2026-08-05' },
      { id: 3, title: 'Payment & admin panel', amount: 25000, dueDate: '2026-08-20' },
    ],
  },
  {
    id: 2,
    title: 'Design social campaign assets',
    description: 'Create a cohesive set of social media creatives for a food brand launch across Instagram and Facebook.',
    client: 'Natura Foods',
    category: 'Design',
    location: 'Mumbai',
    budget: 30000,
    budgetLabel: '₹30,000',
    type: 'Fixed Price',
    status: 'Open',
    postedDate: '2026-07-12',
    skills: ['Figma', 'Branding', 'Canva'],
    rating: 4.6,
    proposalsCount: 8,
    milestones: [
      { id: 1, title: 'Concept & moodboard', amount: 8000, dueDate: '2026-07-18' },
      { id: 2, title: 'Final asset delivery', amount: 22000, dueDate: '2026-07-28' },
    ],
  },
  {
    id: 3,
    title: 'Local SEO audit for clinic',
    description: 'Comprehensive local SEO audit with Google Business Profile optimization for a multi-location clinic.',
    client: 'CarePlus Clinic',
    category: 'Marketing',
    location: 'Pune',
    budget: 18000,
    budgetLabel: '₹18,000',
    type: 'Fixed Price',
    status: 'In Progress',
    postedDate: '2026-07-05',
    skills: ['SEO', 'Google Business', 'Analytics'],
    rating: 4.5,
    proposalsCount: 5,
    milestones: [
      { id: 1, title: 'Audit report', amount: 8000, dueDate: '2026-07-15' },
      { id: 2, title: 'Implementation & tracking', amount: 10000, dueDate: '2026-07-25' },
    ],
  },
  {
    id: 4,
    title: 'Mobile app UI for fitness startup',
    description: 'Design and prototype a fitness tracking mobile app UI with onboarding, workout plans, and progress charts.',
    client: 'FitLocal',
    category: 'Design',
    location: 'Hyderabad',
    budget: 45000,
    budgetLabel: '₹45,000',
    type: 'Milestone Based',
    status: 'Open',
    postedDate: '2026-07-14',
    skills: ['Figma', 'Mobile UI', 'Prototyping'],
    rating: 4.7,
    proposalsCount: 15,
    milestones: [
      { id: 1, title: 'User research & wireframes', amount: 12000, dueDate: '2026-07-22' },
      { id: 2, title: 'High-fidelity screens', amount: 20000, dueDate: '2026-08-01' },
      { id: 3, title: 'Interactive prototype', amount: 13000, dueDate: '2026-08-10' },
    ],
  },
]

export const clientGigs = gigs.map((g) => ({
  id: g.id,
  title: g.title,
  budget: g.budgetLabel,
  status: g.status,
  proposals: g.proposalsCount,
  posted: g.postedDate,
}))

export const proposals = [
  {
    id: 1,
    gigId: 1,
    gig: 'Build a React booking dashboard',
    freelancer: 'Ananya Rao',
    freelancerId: 1,
    bidAmount: '₹72,000',
    timeline: '21 days',
    coverLetter: 'I have built 3 similar booking systems for hospitality clients in Bengaluru.',
    status: 'Negotiating',
  },
  {
    id: 2,
    gigId: 2,
    gig: 'Design social campaign assets',
    freelancer: 'Kabir Mehta',
    freelancerId: 2,
    bidAmount: '₹28,000',
    timeline: '8 days',
    coverLetter: 'Specialized in food & beverage branding with 40+ campaign launches.',
    status: 'Accepted',
  },
  {
    id: 3,
    gigId: 3,
    gig: 'Local SEO audit for clinic',
    freelancer: 'Sara Thomas',
    freelancerId: 3,
    bidAmount: '₹17,500',
    timeline: '5 days',
    coverLetter: 'Healthcare SEO specialist with proven local ranking improvements.',
    status: 'Submitted',
  },
  {
    id: 4,
    gigId: 1,
    gig: 'Build a React booking dashboard',
    freelancer: 'Rahul Verma',
    freelancerId: 4,
    bidAmount: '₹68,000',
    timeline: '18 days',
    coverLetter: 'Full-stack developer with React + payment gateway experience.',
    status: 'Submitted',
  },
]

export const myProposals = [
  { id: 1, gig: 'Build a React booking dashboard', bidAmount: '₹72,000', status: 'Negotiating', submitted: '2026-07-11' },
  { id: 2, gig: 'Mobile app UI for fitness startup', bidAmount: '₹42,000', status: 'Submitted', submitted: '2026-07-15' },
  { id: 3, gig: 'Design social campaign assets', bidAmount: '₹29,000', status: 'Rejected', submitted: '2026-07-08' },
]

export const users = [
  { id: 1, name: 'Ananya Rao', email: 'ananya@email.com', role: 'Freelancer', status: 'Active', verified: true, joined: '2025-03-12' },
  { id: 2, name: 'GreenStay Hotels', email: 'contact@greenstay.com', role: 'Client', status: 'Active', verified: true, joined: '2025-06-01' },
  { id: 3, name: 'Sara Thomas', email: 'sara@email.com', role: 'Freelancer', status: 'Suspended', verified: false, joined: '2025-01-20' },
  { id: 4, name: 'Natura Foods', email: 'hello@natura.in', role: 'Client', status: 'Active', verified: true, joined: '2025-08-15' },
  { id: 5, name: 'Kabir Mehta', email: 'kabir@email.com', role: 'Freelancer', status: 'Active', verified: true, joined: '2024-11-05' },
  { id: 6, name: 'Admin User', email: 'admin@skillsphere.in', role: 'Admin', status: 'Active', verified: true, joined: '2024-01-01' },
]

export const conversations = [
  { id: 1, name: 'GreenStay Hotels', lastMessage: 'Can you share the updated milestone build today?', time: '10:05 AM', unread: 2, avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 2, name: 'Natura Foods', lastMessage: 'Looks great! Proceeding with final payment.', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 3, name: 'CarePlus Clinic', lastMessage: 'When can we schedule the SEO review call?', time: 'Mon', unread: 1, avatar: 'https://i.pravatar.cc/150?img=34' },
  { id: 4, name: 'FitLocal', lastMessage: 'Thanks for the proposal. We will review shortly.', time: 'Sun', unread: 0, avatar: 'https://i.pravatar.cc/150?img=35' },
]

export const chatMessages = {
  1: [
    { id: 1, sender: 'them', text: 'Hi! We reviewed your proposal and have a few questions.', time: '9:45 AM' },
    { id: 2, sender: 'me', text: 'Sure, happy to clarify anything.', time: '9:50 AM' },
    { id: 3, sender: 'them', text: 'Can you share the updated milestone build today?', time: '10:05 AM' },
  ],
  2: [
    { id: 1, sender: 'them', text: 'The campaign assets look fantastic!', time: '2:30 PM' },
    { id: 2, sender: 'me', text: 'Thank you! Glad you liked the direction.', time: '2:45 PM' },
    { id: 3, sender: 'them', text: 'Looks great! Proceeding with final payment.', time: '3:00 PM' },
  ],
  3: [
    { id: 1, sender: 'them', text: 'Our Google ranking improved after your audit.', time: '11:00 AM' },
    { id: 2, sender: 'me', text: 'That is great to hear! Happy to do a follow-up review.', time: '11:15 AM' },
    { id: 3, sender: 'them', text: 'When can we schedule the SEO review call?', time: '11:30 AM' },
  ],
  4: [
    { id: 1, sender: 'me', text: 'I submitted my proposal for the fitness app UI project.', time: '4:00 PM' },
    { id: 2, sender: 'them', text: 'Thanks for the proposal. We will review shortly.', time: '4:30 PM' },
  ],
}

export const portfolioItems = [
  { id: 1, title: 'Hotel Booking Dashboard', category: 'Web Development', image: 'https://picsum.photos/seed/port1/400/250', link: '#' },
  { id: 2, title: 'Food Brand Campaign', category: 'Design', image: 'https://picsum.photos/seed/port2/400/250', link: '#' },
  { id: 3, title: 'Clinic SEO Case Study', category: 'Marketing', image: 'https://picsum.photos/seed/port3/400/250', link: '#' },
  { id: 4, title: 'Fitness App UI', category: 'Design', image: 'https://picsum.photos/seed/port4/400/250', link: '#' },
]

export const analyticsData = {
  monthlyRevenue: [120000, 145000, 132000, 168000, 184000, 195000],
  monthlyLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  userGrowth: [8200, 9100, 9800, 10500, 11200, 12480],
  gigsByCategory: {
    labels: ['Web Dev', 'Design', 'Marketing', 'Writing', 'Other'],
    values: [420, 310, 180, 95, 65],
  },
}

export const categories = ['Web Development', 'Design', 'Marketing', 'Writing', 'Mobile Apps', 'Data & AI']

export const locations = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kochi', 'Chennai']
