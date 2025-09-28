import React, { useState } from 'react';
import Footer from './Footer';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

// Animated Background Orbs
const AnimatedOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating orb */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(129, 74, 200, 0.3) 0%, rgba(129, 74, 200, 0) 70%)",
          top: "-10%",
          right: "-10%",
          animation: "float 20s ease-in-out infinite"
        }}
      />
      
      {/* Medium floating orb */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(223, 122, 254, 0.4) 0%, rgba(223, 122, 254, 0) 70%)",
          bottom: "-5%",
          left: "-5%",
          animation: "float 15s ease-in-out infinite reverse"
        }}
      />
      
      {/* Small accent orbs */}
      <div 
        className="absolute w-32 h-32 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(129, 74, 200, 0.5) 0%, rgba(129, 74, 200, 0) 70%)",
          top: "30%",
          left: "10%",
          animation: "float 12s ease-in-out infinite"
        }}
      />
    </div>
  );
};

// Redesigned Contact Form Component
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace with your form submission logic
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 4000);
      }, 1200);
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Jane@mail.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="+1(969) 819-8061"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Hi, I am jane i want help with...."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-sm font-medium text-white bg-purple-700 hover:bg-gray-700 transition-all text-sm mt-2 disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
      {submitStatus === 'success' && (
        <div className="p-3 bg-green-900/30 border border-green-700 rounded-xs text-green-300 text-center mt-2">
          Message sent successfully!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded-xs text-red-300 text-center mt-2">
          Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
};

// Redesigned Contact Info Cards (Email & Phone only)
const ContactInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-xl mx-auto">
      <div className="bg-black rounded-lg border border-zinc-800 p-4 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-tr from-zinc-800 to-purple-900">
          <img src="https://img.icons8.com/?size=100&id=jicLxt1sA2qa&format=png&color=000000" alt="Email Icon" className="w-5 h-5 object-contain" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg flex items-center gap-2">E-mail</div>
          <div className="text-zinc-300 text-base mt-1">help.orbitlabs@gmail.com</div>
        </div>
      </div>
  <div className="bg-black rounded-lg border border-zinc-800 p-4 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-tr from-zinc-800 to-purple-900">
          <img src="https://img.icons8.com/?size=100&id=eoVcP6w171GZ&format=png&color=000000" alt="Call Icon" className="w-5 h-5 object-contain" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg flex items-center gap-2">Phone</div>
          <div className="text-zinc-300 text-base mt-1">+1(969) 819-8061</div>
        </div>
      </div>
    </div>
  );
};

// Main Contact Page Component
const ContactPage: React.FC = () => {
  const heroHeading = useHeadingReveal({ direction: 'slide-right', delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: 'slide-right', delay: 600 });
  const formHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const faqHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  
  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary relative">
      <AnimatedOrbs />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-orbit-card border border-orbit-purple/20 text-orbit-text-muted px-4 py-2 rounded-full text-sm mb-6">
              Get In Touch
            </div>
            <h1 ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${heroHeading.animationClasses}`}>
              Ready to Transform<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h1>
            <p ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>} className={`text-orbit-text-muted text-lg max-w-2xl mx-auto leading-relaxed ${heroSubheading.animationClasses}`}>
              Let's discuss how AI automation can streamline your business processes, 
              boost efficiency, and drive growth. Our team is ready to help you get started.
            </p>
          </div>

          {/* Contact Info Cards */}
          <ContactInfo />

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto">
            <div className="bg-orbit-card/30 backdrop-blur-sm border border-orbit-purple/20 rounded-xl p-4 md:p-6">
              <div className="mb-4">
                <h2 ref={formHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-xl font-bold mb-2 ${formHeading.animationClasses}`}>Send us a message</h2>
                <p className="text-orbit-text-muted text-sm">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  All fields marked with an asterisk (*) are required.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 ref={faqHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-2xl font-bold text-center mb-8 ${faqHeading.animationClasses}`}>Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  question: "What types of businesses do you work with?",
                  answer: "We work with businesses of all sizes, from startups to enterprises, across various industries including e-commerce, healthcare, finance, and more."
                },
                {
                  question: "How long does a typical automation project take?",
                  answer: "Project timelines vary based on complexity, but most automation solutions are delivered within 2-6 weeks from project initiation."
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, we offer comprehensive support and maintenance packages to ensure your automation solutions continue to perform optimally."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-orbit-card/30 rounded-lg border border-orbit-purple/20 hover:border-orbit-purple/40 transition-all duration-300">
                  <summary className="p-6 cursor-pointer font-medium text-orbit-text-primary hover:text-orbit-purple transition-colors duration-200">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 text-orbit-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;