export type BlogMeta = {
  slug: string; // maps to src/blogs/<slug>.md
  title: string;
  category?: string;
  image?: string;
  featured?: boolean;
  excerpt?: string;
  date?: string;
  description?: string; // meta description / SEO
};

const blogs: BlogMeta[] = [
  {
    slug: 'blog1',
    title: 'B2B SaaS Case Study: How a Custom AI Chatbot Boosted Lead Conversion by 340%',
    date: '2024-03-10',
    category: 'Case Study',
    image: '/src/assets/customBot.jpeg',
    featured: true,
    excerpt: 'Discover how a custom AI chatbot increased lead conversions by 340% for a B2B SaaS company.',
    description:
      'Discover how a custom AI chatbot increased lead conversions by 340% for a B2B SaaS company. See the process, results, and how your business can achieve similar ROI.'
  },
  {
    slug: 'blog2',
    title: 'Workflow Automation Best Practices for 2025',
    date: '2024-03-05',
    category: 'Guide',
    image: '/src/assets/workAuto.png',
    excerpt: 'Master workflow automation with proven strategies for the modern workplace.',
    description: 'Practical workflow automation best practices to increase efficiency and reduce manual work in 2025.'
  }
];

export default blogs;
