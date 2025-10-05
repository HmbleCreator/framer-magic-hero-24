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
    date: '2025-05-10',
    category: 'Case Study',
    image: '/src/assets/boost.png',
    featured: true,
    excerpt: 'Discover how a custom AI chatbot increased lead conversions by 340% for a B2B SaaS company.',
    description:
      'Discover how a custom AI chatbot increased lead conversions by 340% for a B2B SaaS company. See the process, results, and how your business can achieve similar ROI.'
  },
  {
    slug: 'blog2',
    title: '5 Signs Your Current Website Is Costing You Customers (With Revenue Impact Analysis)',
    date: '2025-03-05',
    category: 'Guide',
    image: '/src/assets/conversion.png',
    excerpt: 'Master workflow automation with proven strategies for the modern workplace.',
    description: 'Practical workflow automation best practices to increase efficiency and reduce manual work in 2025.'
  },
    {
    slug: 'blog3',
    title: 'Startup Case Study: How AI Automation Cut Operating Costs by $75,000',
    date: "January 14, 2025",
    category: 'Case Study',
    image: '/src/assets/75000.png',
    excerpt: "Discover how a fast-growing startup saved $75,000 annually using custom AI automation — from problem to process to measurable impact.",
    description: "Detailed case study of how a startup achieved massive cost savings by automating its manual workflows using AI. Includes process overview, results breakdown, and insights you can apply to your business."
  },
    {
    slug: 'blog4',
    title: 'Why Most Businesses Fail at AI Implementation (and Proven Ways to Succeed)',
    date: "November 3, 2024",
    category: 'Guide',
    image: '/src/assets/transform.png',
    excerpt: "73% of businesses fail at AI adoption. Learn the real reasons behind these failures and the proven framework that ensures success.",
  description: "A data-backed deep dive into why most AI projects fail — from unclear ROI frameworks to poor data readiness — and how your business can succeed with a structured AI implementation strategy."
  },
    {
    slug: 'blog5',
    title: 'How to Build and Launch a Custom App in 30 Days (Step-by-Step Process)',
    date: "August 2, 2024",
    category: 'Guide',
    image: '/src/assets/rapidapp.png',
    excerpt: "Think custom apps take months to build? Discover the 30-day process OrbitLabs uses to turn ideas into fully deployed products — fast, reliable, and scalable.",
    description: "Learn the proven 4-week framework OrbitLabs uses to build and deploy custom apps in just 30 days. From planning to launch, this guide breaks down every step with real timelines, tools, and process insights."
  },
    {
    slug: 'blog6',
    title: 'Custom Web Development vs Templates: Which Saves Money (and Scales with Growth)?',
    date: "January 18, 2024",
    category: 'Guide',
    image: '/src/assets/custom.png',
    excerpt: "Explore the real cost difference between custom websites and templates — and find out which one truly supports long-term growth.",
  description: "A detailed cost and ROI comparison between template-based websites and custom web development. Understand where hidden costs hide, and how custom solutions can scale with your business.",
  }
];

export default blogs;
