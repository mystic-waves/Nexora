export type Career = {
  title: string
  salary: string
  growth: 'High' | 'Medium' | 'Low'
  skills: string[]
}

export type College = {
  name: string
  location: string
  fees: string
  courses: string[]
}

export type Resource = {
  title: string
  type: 'Article' | 'Video' | 'Guide'
  description: string
}

export type Testimonial = {
  name: string
  quote: string
}

export const popularCareers: Career[] = [
  { title: 'Software Engineer', salary: '$80k-$150k', growth: 'High', skills: ['JS', 'React', 'Algorithms'] },
  { title: 'Data Analyst', salary: '$60k-$120k', growth: 'High', skills: ['SQL', 'Python', 'Excel'] },
  { title: 'UX Designer', salary: '$70k-$130k', growth: 'Medium', skills: ['Figma', 'Research', 'Prototyping'] },
]

export const featuredColleges: College[] = [
  { name: 'Tech University', location: 'San Francisco, CA', fees: '$15k/yr', courses: ['CS', 'Data Science', 'AI'] },
  { name: 'Innovation Institute', location: 'Austin, TX', fees: '$12k/yr', courses: ['Design', 'HCI', 'Product'] },
  { name: 'Global College', location: 'New York, NY', fees: '$18k/yr', courses: ['Business', 'Marketing', 'Finance'] },
]

export const featuredResources: Resource[] = [
  { title: 'How to Choose a Career', type: 'Article', description: 'A step-by-step guide to discovering your strengths and aligning them with the right career path.' },
  { title: 'Top Colleges for CS', type: 'Guide', description: 'A curated list of top computer science programs with key stats and tips.' },
  { title: 'Ace Your Interview', type: 'Video', description: 'Expert advice on preparing for behavioral and technical interviews.' },
]

export const testimonials: Testimonial[] = [
  { name: 'Ava', quote: 'Nexora helped me find the perfect college for my CS journey.' },
  { name: 'Liam', quote: 'The assessments gave me clarity on my strengths and interests.' },
  { name: 'Noah', quote: 'I discovered a new career path I had never considered before.' },
]
