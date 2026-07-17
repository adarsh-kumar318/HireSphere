export const platformStats = {
  revenue: '18.4L',
  activeFreelancers: 2840,
  jobSuccessRate: '91%',
  disputesOpen: 12,
}

export const freelancers = [
  {
    id: 1,
    name: 'Ananya Rao',
    title: 'React and Node.js Specialist',
    location: 'Bengaluru',
    skills: ['React', 'Node.js', 'MongoDB'],
    rating: 4.9,
    reputation: 96,
    hourlyRate: '1200/hr',
    availability: 'Available this week',
    verified: true,
  },
  {
    id: 2,
    name: 'Kabir Mehta',
    title: 'Brand Designer',
    location: 'Mumbai',
    skills: ['Figma', 'Branding', 'Illustration'],
    rating: 4.8,
    reputation: 92,
    hourlyRate: '950/hr',
    availability: '2 slots open',
    verified: true,
  },
  {
    id: 3,
    name: 'Sara Thomas',
    title: 'SEO and Content Strategist',
    location: 'Kochi',
    skills: ['SEO', 'Content', 'Analytics'],
    rating: 4.7,
    reputation: 89,
    hourlyRate: '800/hr',
    availability: 'Available tomorrow',
    verified: false,
  },
]

export const gigs = [
  {
    id: 1,
    title: 'Build a React booking dashboard',
    client: 'GreenStay Hotels',
    category: 'Web Development',
    location: 'Bengaluru',
    budget: '75000',
    type: 'Milestone Based',
    status: 'Open',
    matchScore: 94,
    skills: ['React', 'Bootstrap', 'API Integration'],
  },
  {
    id: 2,
    title: 'Design social campaign assets',
    client: 'Natura Foods',
    category: 'Design',
    location: 'Mumbai',
    budget: '30000',
    type: 'Fixed Price',
    status: 'Open',
    matchScore: 88,
    skills: ['Figma', 'Branding', 'Canva'],
  },
  {
    id: 3,
    title: 'Local SEO audit for clinic',
    client: 'CarePlus Clinic',
    category: 'Marketing',
    location: 'Pune',
    budget: '18000',
    type: 'Fixed Price',
    status: 'In Progress',
    matchScore: 82,
    skills: ['SEO', 'Google Business', 'Analytics'],
  },
]

export const proposals = [
  {
    id: 1,
    gig: 'Build a React booking dashboard',
    freelancer: 'Ananya Rao',
    bidAmount: '72000',
    timeline: '21 days',
    status: 'Negotiating',
  },
  {
    id: 2,
    gig: 'Design social campaign assets',
    freelancer: 'Kabir Mehta',
    bidAmount: '28000',
    timeline: '8 days',
    status: 'Accepted',
  },
  {
    id: 3,
    gig: 'Local SEO audit for clinic',
    freelancer: 'Sara Thomas',
    bidAmount: '17500',
    timeline: '5 days',
    status: 'Submitted',
  },
]

export const payments = [
  { id: 1, gig: 'Booking dashboard', provider: 'Razorpay', amount: '25000', stage: 'Milestone 1', status: 'Escrowed' },
  { id: 2, gig: 'Campaign assets', provider: 'Stripe', amount: '28000', stage: 'Final', status: 'Released' },
  { id: 3, gig: 'SEO audit', provider: 'Razorpay', amount: '9000', stage: 'Advance', status: 'Pending' },
]

export const disputes = [
  { id: 1, project: 'Booking dashboard', reason: 'Milestone scope mismatch', priority: 'High', status: 'Mediation' },
  { id: 2, project: 'SEO audit', reason: 'Delayed evidence upload', priority: 'Medium', status: 'Evidence Review' },
]

export const messages = [
  { id: 1, from: 'Client', body: 'Can you share the updated milestone build today?', time: '10:05 AM' },
  { id: 2, from: 'Freelancer', body: 'Yes, upload is complete and I added notes in the tracker.', time: '10:12 AM' },
  { id: 3, from: 'Client', body: 'Great, I will review and release the next milestone.', time: '10:18 AM' },
]

export const milestones = [
  { id: 1, title: 'Requirement freeze', progress: 100, due: '10 Jul 2026' },
  { id: 2, title: 'UI prototype', progress: 80, due: '16 Jul 2026' },
  { id: 3, title: 'API integration', progress: 45, due: '23 Jul 2026' },
]

export const reviews = [
  { id: 1, client: 'GreenStay Hotels', score: 5, comment: 'Strong delivery discipline and clear communication.' },
  { id: 2, client: 'Natura Foods', score: 4.8, comment: 'Excellent design quality with quick revisions.' },
]

export const notifications = [
  { id: 1, title: 'Proposal accepted', message: 'Natura Foods accepted your proposal.', type: 'Proposal' },
  { id: 2, title: 'Payment received', message: 'Milestone payment is now in escrow.', type: 'Payment' },
  { id: 3, title: 'New gig nearby', message: 'A React dashboard gig was posted in Bengaluru.', type: 'Gig' },
]

export const trendingSkills = ['React', 'Figma', 'Local SEO', 'WebRTC', 'Stripe', 'Prompt Engineering']
