import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(testimonials.map((_, i) => i));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      quote: "AI automation transformed our operations by eliminating repetitive tasks and improving efficiency. Scaling our workflow has never been easier!",
      author: "James Carter",
      position: "CEO at TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "With AI, we cut manual work and improved accuracy. Our team now focuses on high-impact tasks while automation handles the rest!",
      author: "Sophia Martinez",
      position: "Operations Manager at NexaCorp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "AI-driven insights doubled our sales efficiency. We now engage leads at the right time with smarter, data-backed decisions!",
      author: "David Reynolds",
      position: "Head of Sales at GrowthPeak",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "Customer support is now seamless. Our response time improved drastically, and satisfaction levels are at an all-time high, thanks to xtract",
      author: "Emily Wong",
      position: "Customer Success Lead at SupportHive",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format"
    }
  ];

  const StarRating = () => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6"> {/* responsive container */}
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Why Businesses Love<br />
            Our AI Solutions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real businesses, real results with AI automation.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple w-full ${
                visibleCards.includes(index)
                  ? index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                  : 'opacity-0'
              } ${
                index % 2 === 0 ? 'lg:justify-self-end' : 'lg:justify-self-start'
              }`}
            >
              <StarRating />
              
              <blockquote className={`text-gray-300 mb-6 leading-relaxed ${
                index === 0 || index === testimonials.length - 1 ? 'text-sm' : 'text-base'
              }`}>
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className={`font-semibold text-white ${
                    index === 0 || index === testimonials.length - 1 ? 'text-sm' : 'text-base'
                  }`}>
                    {testimonial.author}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;