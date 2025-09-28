import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Footer from './Footer';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import matter from 'gray-matter';
import blogsMeta, { BlogMeta } from '@/lib/blogs';

// Try to load remark-gfm at runtime
let runtimeRemarkGfm: any = null;
try {
  runtimeRemarkGfm = require('remark-gfm');
  console.log('remark-gfm loaded successfully');
} catch (e) {
  console.warn('remark-gfm not available, using basic markdown parsing');
  runtimeRemarkGfm = null;
}

// Helper functions - defined once at module level
const stripMarkdown = (md: string): string =>
  md
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#_*>`~-]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const generateDescriptionFromContent = (md: string, maxChars = 150): string => {
  const moreIndex = md.indexOf('<!--more-->');
  const source = moreIndex >= 0 ? md.slice(0, moreIndex) : md;
  const plain = stripMarkdown(source);
  if (!plain) return 'No preview available.';
  if (plain.length <= maxChars) return plain;
  const truncated = plain.slice(0, maxChars).replace(/\s+\S*$/, '');
  return `${truncated}…`;
};

// Fixed Intersection Observer Hook
const useIntersectionObserver = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => ({ threshold: 0.1, ...options }), [options.threshold, options.root, options.rootMargin]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, memoizedOptions);

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [hasIntersected, memoizedOptions]);

  return [ref, hasIntersected] as const;
};

// Blog Card Component
const BlogCard: React.FC<{
  title: string;
  category?: string;
  image?: string;
  delay?: number;
  onReadMore?: () => void;
}> = ({ title, category = 'Article', image = '/placeholder.svg', delay = 0, onReadMore }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`bg-black backdrop-blur-sm border border-purple-300/10 rounded-xl overflow-hidden hover:shadow-xl hover:border-purple-300/40 transition-all duration-500 cursor-pointer group ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: hasIntersected ? `${delay}ms` : '0ms' }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-black backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
        <div
          className="flex items-center text-purple-400 font-medium text-sm group-hover:text-purple-300 cursor-pointer transition-colors"
          onClick={onReadMore}
        >
          <span>Read More</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Featured Blog Card
const FeaturedBlogCard: React.FC<{
  title: string;
  category?: string;
  image?: string;
  excerpt?: string;
  onReadMore?: () => void;
}> = ({ title, category = 'Article', image = '/placeholder.svg', excerpt, onReadMore }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`col-span-2 bg-black backdrop-blur-sm border border-purple-300/20 rounded-xl overflow-hidden hover:shadow-2xl hover:border-purple-300/40 transition-all duration-500 cursor-pointer group w-[85%] mx-auto ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid md:grid-cols-2 h-full">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80" />
          <div className="absolute top-4 left-4">
            <span className="bg-black backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              {category}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          {excerpt && <p className="text-gray-300 mb-6 leading-relaxed">{excerpt}</p>}
          <div
            className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 cursor-pointer"
            onClick={onReadMore}
          >
            <span>Read Full Article</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Blog Component
const BlogPage: React.FC = () => {
  const heroHeading = useHeadingReveal({ direction: 'slide-right', delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: 'slide-right', delay: 600 });
  const newsletterHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const [headerRef, headerIntersected] = useIntersectionObserver();
  
  type BlogPost = BlogMeta & { content: string };
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Process markdown content
  const processMarkdownContent = useCallback((raw: string) => {
    let content = raw || '';
    let data = {} as Record<string, unknown>;
    
    if (raw) {
      try {
        const parsed = matter(raw);
        data = parsed.data || {};
        content = parsed.content || raw;
        
        // Minimal processing - only normalize line endings
        content = content.replace(/\r\n/g, '\n');
        
        // Remove any remaining frontmatter that wasn't caught by gray-matter
        content = content.replace(/^---[\s\S]*?---\n?/m, '');
        
        // Ensure headings have proper spacing (add blank line before headings if missing)
        content = content.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
        
        // Ensure proper paragraph spacing for double line breaks
        content = content.replace(/\n\n\n+/g, '\n\n');
        
        console.log('Processed markdown sample:', content.substring(0, 200) + '...');
        
      } catch (e) {
        console.warn('Error parsing markdown frontmatter:', e);
        // Use raw content with minimal processing
        content = raw
          .replace(/\r\n/g, '\n')
          .replace(/^---[\s\S]*?---\n?/m, '')
          .replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
      }
    }
    
    return { content, data };
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if blogsMeta exists and has content
        if (!blogsMeta || blogsMeta.length === 0) {
          setError('No blog metadata found');
          return;
        }

        // Load markdown files from blogs folder
        // CHANGE THIS PATH based on where your blogs folder is located:
        // '../blogs/*.md' - if blogs is in project root (same level as src)
        // './blogs/*.md' - if blogs is inside src folder  
        // '/blogs/*.md' - if blogs is in public folder
        const modules = import.meta.glob('../blogs/*.md', { as: 'raw', eager: true }) as Record<string, string>;
        
        if (Object.keys(modules).length === 0) {
          // Try alternative path if the first one doesn't work
          try {
            const altModules = import.meta.glob('/blogs/*.md', { as: 'raw', eager: true }) as Record<string, string>;
            if (Object.keys(altModules).length > 0) {
              Object.assign(modules, altModules);
            }
          } catch (e) {
            console.warn('Alternative path also failed');
          }
        }
        
        if (Object.keys(modules).length === 0) {
          setError('No markdown files found. Please check if your blogs folder contains .md files');
          return;
        }
        
        console.log('Found markdown files:', Object.keys(modules));
        
        const loadedPosts = blogsMeta.map((meta) => {
          // Try to find the markdown file for this blog post
          const fileKey = Object.keys(modules).find((key) => {
            // Extract filename from path and match with slug
            const filename = key.split('/').pop()?.replace('.md', '');
            return filename === meta.slug;
          });
          
          const raw = fileKey ? modules[fileKey] : '';
          
          if (!raw) {
            console.warn(`No markdown content found for slug: ${meta.slug}`);
          }
          
          const { content, data } = processMarkdownContent(raw);
          
          // Debug: Log the processed content
          console.log(`Processed content for ${meta.slug}:`, {
            rawLength: raw.length,
            contentLength: content.length,
            hasHeadings: content.includes('##'),
            hasBold: content.includes('**')
          });
          
          return {
            ...meta,
            date: (meta.date || (data.date as string)) as string | undefined,
            title: meta.title || (data.title as string) || 'Untitled',
            category: meta.category || (data.category as string) || 'Article',
            image: meta.image || (data.image as string) || '/placeholder.svg',
            excerpt: meta.excerpt || (data.excerpt as string) || generateDescriptionFromContent(content, 120),
            description: meta.description || (data.description as string) || generateDescriptionFromContent(content, 160),
            content
          } as BlogPost;
        });

        // Sort by date (newest first)
        loadedPosts.sort((a: BlogPost, b: BlogPost) => {
          if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return 0;
        });
        
        console.log('Loaded posts:', loadedPosts.length);
        setPosts(loadedPosts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [processMarkdownContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-12 py-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-black border border-purple-300/20 text-gray-300 px-4 py-2 rounded-full text-sm mb-6">
            Blog
          </div>
          <h1 ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${heroHeading.animationClasses}`}>
            Unlock AI Insights with Us
          </h1>
          <p ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>} className={`text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed ${heroSubheading.animationClasses}`}>
            Stay informed with the latest AI trends, insights, and strategies to drive innovation and business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 && (
            <FeaturedBlogCard 
              {...posts[0]} 
              onReadMore={() => setSelectedPost(posts[0])} 
            />
          )}
          {posts.slice(1).map((post, i) => (
            <BlogCard 
              key={post.slug || i} 
              {...post} 
              delay={i * 100} 
              onReadMore={() => setSelectedPost(post)} 
            />
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No blog posts available yet.</p>
          </div>
        )}

        {/* Modal for full content */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="absolute inset-0 bg-black" onClick={() => setSelectedPost(null)} />
            <div className="relative max-w-4xl w-full bg-black border border-orbit-purple/20 rounded-2xl overflow-auto p-8 z-10 max-h-[90vh] modal-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
                  <p className="text-sm text-gray-400">{selectedPost.category} • {selectedPost.date}</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-blockquote:border-purple-400 prose-blockquote:bg-slate-800/50 prose-blockquote:text-gray-200 prose-ul:text-gray-300 prose-li:text-gray-300">
                <ReactMarkdown 
                  remarkPlugins={runtimeRemarkGfm ? [runtimeRemarkGfm] : []} 
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    // Custom component for better heading rendering
                    h1: ({children, ...props}) => (
                      <h1 className="text-3xl font-bold text-white mt-8 mb-6 first:mt-0" {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({children, ...props}) => (
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4 first:mt-0" {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({children, ...props}) => (
                      <h3 className="text-xl font-semibold text-white mt-6 mb-3" {...props}>
                        {children}
                      </h3>
                    ),
                    p: ({children, ...props}) => (
                      <p className="text-gray-300 leading-relaxed mb-4" {...props}>
                        {children}
                      </p>
                    ),
                    strong: ({children, ...props}) => (
                      <strong className="text-white font-semibold" {...props}>
                        {children}
                      </strong>
                    ),
                    blockquote: ({children, ...props}) => (
                      <blockquote className="border-l-4 border-purple-400 bg-slate-800/50 p-4 my-6 rounded-r-lg" {...props}>
                        <div className="text-gray-200">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    ul: ({children, ...props}) => (
                      <ul className="text-gray-300 space-y-2 mb-4" {...props}>
                        {children}
                      </ul>
                    ),
                    li: ({children, ...props}) => (
                      <li className="text-gray-300" {...props}>
                        {children}
                      </li>
                    ),
                    hr: ({...props}) => (
                      <hr className="border-gray-600 my-8" {...props} />
                    ),
                    // Handle HTML elements that might come from rehype-raw
                    div: ({children, ...props}) => (
                      <div {...props}>{children}</div>
                    )
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20 text-center">
          <div className="bg-black backdrop-blur-sm border border-purple-300/20 rounded-2xl p-12 max-w-2xl mx-auto">
            <h3 ref={newsletterHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-2xl font-bold mb-4 ${newsletterHeading.animationClasses}`}>Stay Updated</h3>
            <p className="text-gray-300 mb-8">
              Get the latest AI insights delivered straight to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-black border border-purple-300/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" 
              />
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;