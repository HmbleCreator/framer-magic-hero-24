"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useHeadingReveal } from "@/hooks/use-heading-reveal";

// Animated Background
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-96 h-96 bg-orbit-purple/10 rounded-full blur-3xl -top-20 -right-20 animate-pulse" />
    <div className="absolute w-64 h-64 bg-orbit-purple/5 rounded-full blur-2xl top-1/2 -left-20 animate-pulse delay-700" />
    <div className="absolute w-48 h-48 bg-orbit-purple/8 rounded-full blur-xl bottom-20 right-1/3 animate-pulse delay-1000" />
  </div>
);

// Statistics Component
const Statistics = () => {
  const [counts, setCounts] = React.useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    years: 0,
  });

  const targets = {
    clients: 150,
    projects: 500,
    satisfaction: 99,
    years: 5,
  };

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-orbit-text-primary mb-2">
            {stat.number}
          </div>
          <div className="text-orbit-purple font-semibold mb-1">{stat.label}</div>
          <div className="text-orbit-text-muted text-sm">{stat.description}</div>
        </div>
      ))}
    </div>
  );
};

// TeamMember Card
const TeamMember = ({ name, role, description, image, linkedin }) => (
  <div className="bg-orbit-card border border-orbit-purple/20 rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full aspect-[4/5] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold group-hover:text-orbit-purple transition-colors duration-300">{name}</h3>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-orbit-text-muted hover:text-orbit-purple">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.804-1.75-1.732s.784-1.732 1.75-1.732 1.75.804 1.75 1.732-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.155 1.459-2.155 2.963v5.704h-3v-10h2.881v1.367h.041c.401-.757 1.379-1.557 2.837-1.557 3.037 0 3.263 2.001 3.263 4.604v5.586z"/>
            </svg>
          </a>
        )}
      </div>
      <p className="text-orbit-purple text-sm font-medium">{role}</p>
      <p className="text-orbit-text-muted text-sm mt-2">{description}</p>
    </div>
  </div>
);

// Team Carousel
const TeamCarousel = () => {
  const members = [
    { name: "Amit Kumar", role: "AI/ML Specialist", description: "Designs scalable ML models.", image: "https://avatars.githubusercontent.com/u/140157584?v=4", linkedin: "https://github.com/HmbleCreator" },
    { name: "Manish Kumar", role: "Lead Web Developer", description: "Builds robust web platforms.", image: "https://avatars.githubusercontent.com/u/198463638?v=4", linkedin: "https://github.com/manishtarjan2" },
    { name: "Rakshit Malik", role: "Lead DevOps Engineer", description: "Ensures CI/CD & uptime.", image: "/images/team/rakshit.jpg", linkedin: "https://www.linkedin.com/in/rakshit-malik-2132a5288/" },
    { name: "Sachin Singh", role: "Product Manager & GenAI Specialist", description: "Bridges client goals with GenAI.", image: "/images/team/ava-patel.png", linkedin: "https://linkedin.com/in/ava" },
    { name: "Rakshit Malik", role: "Lead DevOps Engineer", description: "Ensures CI/CD & uptime.", image: "/images/team/rakshit.jpg", linkedin: "https://www.linkedin.com/in/rakshit-malik-2132a5288/" },
    { name: "Sachin Singh", role: "Product Manager & GenAI Specialist", description: "Bridges client goals with GenAI.", image: "/images/team/ava-patel.png", linkedin: "https://linkedin.com/in/ava" },
  ];

  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...members, ...members].map((m, i) => (
          <div key={i} className="min-w-[250px] max-w-[280px]">
            <TeamMember {...m} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Values Component
const Values = () => {
  const values = [
    { icon: "🎯", title: "Innovation First", description: "We stay at the forefront of AI technology." },
    { icon: "🤝", title: "Client-Centric", description: "Your success is our success." },
    { icon: "⚡", title: "Efficiency Focus", description: "We streamline processes to save time." },
    { icon: "🔒", title: "Security Priority", description: "Data security and privacy are paramount." },
    { icon: "📈", title: "Scalable Solutions", description: "Our solutions grow with your business." },
    { icon: "🎨", title: "Quality Excellence", description: "We deliver high-quality solutions." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {values.map((v, i) => (
        <div key={i} className="bg-orbit-card border border-orbit-purple/20 rounded-2xl p-6 hover:border-orbit-purple/40 transition-all duration-300 group">
          <div className="text-3xl mb-4">{v.icon}</div>
          <h3 className="text-orbit-text-primary font-semibold text-lg mb-2 group-hover:text-orbit-purple transition-colors duration-300">{v.title}</h3>
          <p className="text-orbit-text-muted text-sm leading-relaxed">{v.description}</p>
        </div>
      ))}
    </div>
  );
};

// About Page
const AboutPage = () => {
  const heroHeading = useHeadingReveal({ direction: "slide-right", delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: "slide-right", delay: 600 });

  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${heroHeading.animationClasses}`}>
            Transforming Businesses with <span className="block text-orbit-purple">AI Automation</span>
          </h1>
          <p ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>} className={`text-orbit-text-muted text-lg max-w-3xl mx-auto leading-relaxed ${heroSubheading.animationClasses}`}>
            At OrbIT Labs, we help businesses unlock their full potential through intelligent automation.
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-orbit-card border border-orbit-purple/20 rounded-2xl p-12 mb-20">
          <Statistics />
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-orbit-text-muted leading-relaxed">
              <p>Founded in 2019, OrbIT Labs emerged from a simple observation: businesses were spending countless hours on repetitive tasks that could be automated.</p>
              <p>From a small team of AI enthusiasts, we have grown into a full-service automation company serving clients across industries.</p>
              <p>Our mission: democratize AI and make intelligent automation accessible to businesses of all sizes.</p>
            </div>
            <Link to="/#services"><Button variant="orbit" className="mt-6">Learn More About Our Services</Button></Link>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orbit-purple/20 to-orbit-purple/5 rounded-2xl flex items-center justify-center">
              <img src="src/assets/officelogo.jpeg" alt="Office Logo" className="w-2/3 h-2/3 object-contain rounded-xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-orbit-purple/10 to-transparent rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-orbit-text-muted max-w-2xl mx-auto">These core principles guide every decision we make.</p>
          </div>
          <Values />
        </div>

        {/* Team Carousel */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meet Our Team</h2>
          <p className="text-orbit-text-muted text-center max-w-2xl mx-auto mb-8">A diverse group of AI specialists and automation experts dedicated to your success.</p>
          <TeamCarousel />
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orbit-purple/10 to-orbit-purple/5 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-orbit-text-muted text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have already transformed operations with our AI automation solutions.
          </p>
          <Link to="/contact">
            <Button variant="orbit" className="px-8 py-3">Book a Free Consultation</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
