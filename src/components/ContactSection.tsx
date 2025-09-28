import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  const handleBookCall = () => {
    // Add your booking logic here
    console.log('Book a call clicked');
  };

  return (
    <section className="relative bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Grid pattern background (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div 
          className="rounded-xl p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(99, 102, 241, 0.1) 25%,
                rgba(59, 130, 246, 0.08) 50%,
                rgba(30, 41, 59, 0.2) 75%,
                rgba(15, 23, 42, 0.4) 100%
              )
            `,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          {/* Subtle inner glow */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)
              `
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Main heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
              <span className="block">Let AI do the Work so</span>
              <span className="block">you can Scale Faster</span>
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 max-w-md mx-auto font-medium">
              Book a Call Today and Start Automating
            </p>

            {/* CTA Button */}
            <button
              onClick={handleBookCall}
              className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(99, 102, 241) 50%, rgb(79, 70, 229) 100%)',
                boxShadow: '0 6px 15px rgba(139, 92, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
                height: '40px'
              }}
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                Book a free call
                <ArrowUpRight 
                  size={14} 
                  className="inline ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </span>
              <span className="block absolute left-0 right-0 top-full transition-transform duration-500 translate-y-0 group-hover:translate-y-[-150%] group-hover:opacity-100 opacity-0">
                Book a free call
                <ArrowUpRight 
                  size={14} 
                  className="inline ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </span>
              {/* Button hover effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-purple-500/10 blur-lg" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-500/10 blur-lg" />
          <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-indigo-500/5 blur-md" />
          <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-violet-500/5 blur-md" />
        </div>
      </div>

      {/* Additional background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/15 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400/18 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default ContactSection;