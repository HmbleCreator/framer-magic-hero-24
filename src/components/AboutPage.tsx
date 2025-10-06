"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import officeLogo from '@/assets/officelogo.png';
import { useHeadingReveal } from "@/hooks/use-heading-reveal";

// 🔹 Animated Background
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-[30rem] h-[30rem] bg-orbit-purple/20 rounded-full blur-[100px] -top-20 -right-40 animate-pulse" />
    <div className="absolute w-[20rem] h-[20rem] bg-blue-600/10 rounded-full blur-[90px] top-1/2 -left-20 animate-pulse delay-700" />
    <div className="absolute w-[18rem] h-[18rem] bg-pink-500/10 rounded-full blur-[80px] bottom-10 right-1/3 animate-pulse delay-1000" />
  </div>
);

// 🔹 Statistics
const Statistics: React.FC = () => {
  const [counts, setCounts] = React.useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    years: 0,
  });

  const targets = { clients: 150, projects: 500, satisfaction: 99, years: 5 };

  React.useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        clients: Math.round(targets.clients * progress),
        projects: Math.round(targets.projects * progress),
        satisfaction: Math.round(targets.satisfaction * progress),
        years: Math.round(targets.years * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: `${counts.clients}+`, label: "Happy Clients", description: "Businesses transformed" },
    { number: `${counts.projects}+`, label: "Projects Completed", description: "Successful automations" },
    { number: `${counts.satisfaction}%`, label: "Client Satisfaction", description: "Rating from our clients" },
    { number: `${counts.years}+`, label: "Years Experience", description: "In AI automation" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border border-orbit-purple/30 
                     rounded-xl p-6 hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.4)] transition-all duration-300"
        >
          <div className="text-3xl lg:text-4xl font-extrabold text-orbit-purple mb-2 drop-shadow-sm">{stat.number}</div>
          <div className="text-orbit-text-primary font-semibold mb-1">{stat.label}</div>
          <div className="text-orbit-text-muted text-sm">{stat.description}</div>
        </motion.div>
      ))}
    </div>
  );
};

// 🔹 Team Carousel
const TeamCarousel: React.FC = () => {
  const members = [
    {
      name: "Amit Kumar",
      role: "AI/ML Specialist",
      description: "Designs scalable ML models.",
      image: "https://avatars.githubusercontent.com/u/140157584?v=4",
      Github: "https://github.com/HmbleCreator",
    },
    {
      name: "Manish Kumar",
      role: "Lead Web Developer",
      description: "Builds robust web platforms.",
      image:
        "https://avatars.githubusercontent.com/u/198463638?s=400&u=c7609b7f3e3e9fb894123aab9758d397e515b876&v=4",
      Github: "https://github.com/manishtarjan2",
    },
    {
      name: "Rakshit Malik",
      role: "Lead DevOps Engineer",
      description: "Ensures CI/CD & uptime.",
      image:
        "https://avatars.githubusercontent.com/u/111422125?s=400&u=e1ab7f0d5ffaf3e15462cfb026c2642e5c4faa9e&v=4",
      Github: "https://github.com/rakshitmalik136",
    },
    {
      name: "Sachin Singh",
      role: "Product Manager & GenAI Specialist",
      description: "Bridges client goals with GenAI.",
      image: "https://avatars.githubusercontent.com/u/146459827?v=4",
      Github: "https://github.com/ssadhikari02",
    },
  ];

  return (
    <div className="overflow-hidden relative py-10">
      <style>{`
        @keyframes smoothScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-smooth-scroll {
          animation: smoothScroll 40s linear infinite;
        }
        .animate-smooth-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex animate-smooth-scroll w-[400%] sm:w-[300%] md:w-[200%] space-x-6 justify-evenly">
        {[...members, ...members].map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 backdrop-blur-lg bg-gradient-to-br from-gray-800/50 to-gray-900/60 text-white 
                       rounded-2xl shadow-lg border border-orbit-purple/30 hover:shadow-[0_0_25px_-8px_rgba(147,51,234,0.5)]
                       transition-all duration-300 text-center w-[70vw] sm:w-[45vw] md:w-[22vw] max-w-[280px] p-5"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-orbit-purple/50 object-cover shadow-md"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-orbit-purple">{member.role}</p>
            <p className="text-xs text-orbit-text-muted mt-2">{member.description}</p>

            <a
              href={member.Github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mt-4 text-orbit-purple hover:text-orbit-text-primary hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.6)] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61
                -4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
                -1.09-.744.083-.729.083-.729 1.205.084 1.838 
                1.237 1.838 1.237 1.07 1.835 2.807 1.305 
                3.492.998.107-.776.418-1.305.762-1.604
                -2.665-.303-5.466-1.333-5.466-5.93 
                0-1.31.468-2.381 1.235-3.221-.135-.303
                -.54-1.523.105-3.176 0 0 1.005-.322 
                3.3 1.23a11.5 11.5 0 0 1 3.003-.404 
                c1.02.005 2.045.137 3.003.404 2.29-1.552 
                3.296-1.23 3.296-1.23.646 1.653.24 
                2.873.12 3.176.77.84 1.235 1.911 
                1.235 3.221 0 4.61-2.807 5.625-5.478 
                5.922.43.372.823 1.102.823 2.222 
                0 1.605-.015 2.896-.015 3.286 
                0 .319.216.694.825.576C20.565 
                21.796 24 17.299 24 12.297c0-6.627
                -5.373-12-12-12z" />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-950 to-transparent" />
    </div>
  );
};

// 🔹 Values
const Values: React.FC = () => {
  const values = [
    { icon: "🎯", title: "Innovation First", description: "We stay at the forefront of AI technology." },
    { icon: "🤝", title: "Client-Centric", description: "Your success is our success." },
    { icon: "⚡", title: "Efficiency Focus", description: "We streamline processes to save time." },
    { icon: "🔒", title: "Security Priority", description: "Data security and privacy are paramount." },
    { icon: "📈", title: "Scalable Solutions", description: "Our solutions grow with your business." },
    { icon: "🎨", title: "Quality Excellence", description: "We deliver high-quality solutions." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-4">
      {values.map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-orbit-purple/30 rounded-xl p-5 
                     hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] transition-all duration-300"
        >
          <div className="text-3xl mb-3">{v.icon}</div>
          <h3 className="text-orbit-purple font-semibold text-lg mb-2">{v.title}</h3>
          <p className="text-orbit-text-muted text-sm leading-relaxed">{v.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// 🔹 Full About Page
const AboutPage: React.FC = () => {
  const heroHeading = useHeadingReveal({ direction: "slide-right", delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: "slide-right", delay: 600 });

  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
          >
            Transforming Businesses with <span className="block">AI Automation</span>
          </motion.h1>
          <motion.p
            ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-orbit-text-muted text-lg max-w-3xl mx-auto leading-relaxed"
          >
            At OrbIT Labs, we help businesses unlock their full potential through intelligent automation.
          </motion.p>
        </div>

        {/* Statistics */}
        <div className="bg-orbit-card border border-orbit-purple/30 rounded-2xl p-10 sm:p-12 mb-20 shadow-[0_0_25px_-5px_rgba(147,51,234,0.3)]">
          <Statistics />
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 px-6">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orbit-purple">Our Story</h2>
            <div className="space-y-4 text-orbit-text-muted leading-relaxed">
              <p>
                Founded in 2019, OrbIT Labs emerged from a simple observation: businesses were spending countless
                hours on repetitive tasks that could be automated.
              </p>
              <p>
                From a small team of AI enthusiasts, we have grown into a full-service automation company serving
                clients across industries.
              </p>
              <p>
                Our mission: democratize AI and make intelligent automation accessible to businesses of all sizes.
              </p>
            </div>
            <Link to="/services">
              <Button variant="orbit" className="mt-8 shadow-md hover:shadow-[0_0_15px_-3px_rgba(147,51,234,0.4)]">
                Learn More About Our Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            <img
              src={officeLogo}
              alt="Office Logo"
              className="w-2/3 sm:w-3/4 md:w-2/3 h-auto object-contain rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orbit-purple/10 to-transparent rounded-2xl animate-pulse" />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-orbit-text-muted max-w-2xl mx-auto">
              These core principles guide every decision we make.
            </p>
          </div>
          <Values />
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-orbit-purple">Meet Our Team</h2>
          <p className="text-orbit-text-muted text-center max-w-2xl mx-auto mb-8">
            A diverse group of AI specialists and automation experts dedicated to your success.
          </p>
          <TeamCarousel />
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orbit-purple/10 to-orbit-purple/5 rounded-xl p-10 max-w-4xl mx-auto shadow-[0_0_25px_-5px_rgba(147,51,234,0.4)]">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-orbit-text-muted text-base mb-6 max-w-xl mx-auto">
            Join hundreds of businesses that have already transformed operations with our AI automation solutions.
          </p>
          <Link to="/contact">
            <Button variant="orbit" className="px-6 py-2 hover:shadow-[0_0_15px_-3px_rgba(147,51,234,0.4)]">
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
