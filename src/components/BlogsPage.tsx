import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Footer from './Footer';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import blogsMeta, { BlogMeta } from '@/lib/blogs';
import { useFormSubmission } from '@/hooks/use-form-submission';

// Browser-compatible frontmatter parser (no Buffer required)
const parseFrontmatter = (content: string): { data: Record<string, any>; content: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatterStr, markdownContent] = match;
  const data: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: markdownContent };
};

// Blog Newsletter Form Component
const BlogNewsletterForm = () => {
  const { submitForm, isSubmitting, submitStatus } = useFormSubmission();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !name.trim()) return;

    const result = await submitForm({
      name: name.trim(),
      email: email.trim(),
      formType: 'newsletter'
    });

    if (result.success) {
      setEmail('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-3 bg-black border border-purple-300/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-black border border-purple-300/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all whitespace-nowrap disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {submitStatus === 'success' && (
        <p className="text-green-400 text-sm text-center">✅ Successfully subscribed to our newsletter!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-400 text-sm text-center">❌ Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

// Helper functions
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

// Intersection Observer Hook
const useIntersectionObserver = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
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
      className={`col-span-2 bg-black backdrop-blur-sm border border-purple-300/20 rounded-xl overflow-hidden hover:shadow-2xl hover:border-purple-300/40 transition-all duration-500 cursor-pointer group w-[95%] mx-auto ${
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
        const parsed = parseFrontmatter(raw);
        data = parsed.data || {};
        content = parsed.content || raw;
        
        // Normalize line endings
        content = content.replace(/\r\n/g, '\n');
        
        // Ensure headings have proper spacing
        content = content.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
        
        // Ensure proper paragraph spacing
        content = content.replace(/\n\n\n+/g, '\n\n');
        
        console.log('Processed markdown sample:', content.substring(0, 200) + '...');
        
      } catch (e) {
        console.warn('Error parsing markdown frontmatter:', e);
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
        
        if (!blogsMeta || blogsMeta.length === 0) {
          setError('No blog metadata found');
          return;
        }

        const modules = import.meta.glob('../blogs/*.md', { as: 'raw', eager: true }) as Record<string, string>;
        
        if (Object.keys(modules).length === 0) {
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
          const fileKey = Object.keys(modules).find((key) => {
            const filename = key.split('/').pop()?.replace('.md', '');
            return filename === meta.slug;
          });
          
          const raw = fileKey ? modules[fileKey] : '';
          
          if (!raw) {
            console.warn(`No markdown content found for slug: ${meta.slug}`);
          }
          
          const { content, data } = processMarkdownContent(raw);
          
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

// Keep the original order from blogs.ts
// No sorting needed - blogs array order is preserved
        
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

  // Hash-based modal routing - opens modal when URL has hash matching a blog slug
  useEffect(() => {
    if (posts.length === 0) return;
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const matchedPost = posts.find(p => p.slug === hash);
        if (matchedPost) {
          setSelectedPost(matchedPost);
          // Smooth scroll to top when modal opens
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setSelectedPost(null);
      }
    };
    
    // Run once on mount to check for initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [posts]);

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
            <div className="relative max-w-4xl w-full bg-black border border-purple-500/20 rounded-2xl overflow-auto p-8 z-10 max-h-[90vh] modal-scrollbar">
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
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-blockquote:border-purple-400 prose-blockquote:bg-slate-800/50 prose-blockquote:text-gray-200 prose-ul:text-gray-300 prose-li:text-gray-300 prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-th:bg-purple-900/30 prose-th:text-white prose-th:font-semibold prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-purple-500/30 prose-td:text-gray-300 prose-td:p-3 prose-td:border prose-td:border-purple-500/20 prose-tr:border-b prose-tr:border-purple-500/20">
                {selectedPost.content ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm] as any} 
                    rehypePlugins={[rehypeRaw, rehypeSanitize] as any}
                    components={{
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
                        <ul className="text-gray-300 space-y-2 mb-4 list-disc pl-6" {...props}>
                          {children}
                        </ul>
                      ),
                      ol: ({children, ...props}) => (
                        <ol className="text-gray-300 space-y-2 mb-4 list-decimal pl-6" {...props}>
                          {children}
                        </ol>
                      ),
                      li: ({children, ...props}: any) => {
                        const { ordered, ...cleanProps } = props;
                        return (
                          <li className="text-gray-300" {...cleanProps}>
                            {children}
                          </li>
                        );
                      },
                      hr: ({...props}) => (
                        <hr className="border-gray-600 my-8" {...props} />
                      ),
                      table: ({children, ...props}) => (
                        <div className="overflow-x-auto my-8">
                          <table className="min-w-full border-collapse border border-purple-500/30 rounded-lg overflow-hidden" {...props}>
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({children, ...props}) => (
                        <thead className="bg-purple-900/30" {...props}>
                          {children}
                        </thead>
                      ),
                      tbody: ({children, ...props}) => (
                        <tbody {...props}>
                          {children}
                        </tbody>
                      ),
                      th: ({children, ...props}) => (
                        <th className="text-white font-semibold p-3 text-left border border-purple-500/30" {...props}>
                          {children}
                        </th>
                      ),
                      td: ({children, ...props}) => (
                        <td className="text-gray-300 p-3 border border-purple-500/20" {...props}>
                          {children}
                        </td>
                      ),
                      tr: ({children, ...props}) => (
                        <tr className="border-b border-purple-500/20 hover:bg-purple-900/10 transition-colors" {...props}>
                          {children}
                        </tr>
                      ),
                      a: ({children, href, ...props}) => (
                        <a 
                          href={href} 
                          className="text-purple-400 hover:text-purple-300 underline" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                      code: ({children, className, ...props}: any) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-gray-800 text-purple-300 px-1.5 py-0.5 rounded text-sm" {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      pre: ({children, ...props}) => (
                        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4" {...props}>
                          {children}
                        </pre>
                      ),
                      div: ({children, ...props}) => (
                        <div {...props}>{children}</div>
                      )
                    }}
                  >
                    {selectedPost.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400">No content available for this post.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20 text-center">
          <div className="bg-black backdrop-blur-sm border border-purple-300/20 rounded-2xl p-12 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our AI Newsletter</h1>
            <h3 ref={newsletterHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-2xl font-bold mb-4 ${newsletterHeading.animationClasses}`}>Stay Updated</h3>
            <p className="text-gray-300 mb-8">
              Get the latest AI insights delivered straight to your inbox. No spam, just valuable content.
            </p>
            <BlogNewsletterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;