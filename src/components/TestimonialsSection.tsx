import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "AI automation transformed our operations by eliminating repetitive tasks and improving efficiency.",
      author: "James Carter",
      position: "CEO at TechFlow",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "With AI, we cut manual work and improved accuracy. Our team now focuses on high-impact tasks!",
      author: "Sophia Martinez",
      position: "Operations Manager at NexaCorp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "AI-driven insights doubled our sales efficiency. We engage leads at the right time with smarter decisions!",
      author: "David Reynolds",
      position: "Head of Sales at GrowthPeak",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "Customer support is now seamless. Response time improved drastically, and satisfaction levels are at an all-time high.",
      author: "Emily Wong",
      position: "Customer Success Lead",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "Implementation was seamless and results were immediate. Our productivity increased significantly within weeks.",
      author: "Michael Chen",
      position: "CTO at InnovateTech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format"
    },
    {
      quote: "The AI solutions have revolutionized how we handle customer inquiries. Highly recommend!",
      author: "Lisa Anderson",
      position: "Director at ServicePro",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format"
    }
  ];

  const StarRating = () => (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial, index }) => (
    <div
      className="flex-shrink-0 w-80 mx-3"
      style={{
        transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
      }}
    >
      <div className="bg-gradient-to-br from-purple-900/20 via-gray-900 to-black border border-purple-500/30 rounded-lg p-5 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 shadow-lg h-full">
        <StarRating />
        
        <blockquote className="text-gray-300 mb-4 leading-relaxed text-sm">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50"
          />
          <div>
            <div className="font-semibold text-white text-sm">
              {testimonial.author}
            </div>
            <div className="text-purple-300/70 text-xs">
              {testimonial.position}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-black text-white py-20 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Why Businesses Love<br />
            Our AI Solutions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real businesses, real results with AI automation.
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        {/* First Row - Left to Right */}
        <div className="flex mb-6 animate-scroll">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} index={index} />
          ))}
        </div>
        
        {/* Second Row - Right to Left */}
        <div className="flex animate-scroll" style={{ animationDirection: 'reverse' }}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} testimonial={testimonial} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;