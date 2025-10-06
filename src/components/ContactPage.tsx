import React, { useState } from 'react';
import Footer from './Footer';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';
import { useFormSubmission } from '@/hooks/use-form-submission';

// ✨ Animated Floating Orbs Background
const AnimatedOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating orb */}
      <div
        className="absolute w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.35) 0%, rgba(147,51,234,0) 70%)",
          top: "-10%",
          right: "-10%",
          animation: "float 22s ease-in-out infinite",
        }}
      />

      {/* Medium floating orb */}
      <div
        className="absolute w-80 h-80 rounded-full blur-2xl opacity-25 animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(236,72,153,0) 70%)",
          bottom: "-5%",
          left: "-5%",
          animation: "float 18s ease-in-out infinite reverse",
        }}
      />

      {/* Small accent orb */}
      <div
        className="absolute w-40 h-40 rounded-full blur-xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 70%)",
          top: "30%",
          left: "10%",
          animation: "float 14s ease-in-out infinite",
        }}
      />
    </div>
  );
};

// 💌 Contact Form
const ContactForm: React.FC = () => {
  const { submitForm, isSubmitting, submitStatus } = useFormSubmission();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitForm({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      message: formData.message,
      formType: 'contact',
    });
    if (result.success)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'firstName', label: 'First Name', placeholder: 'Jane' },
          { id: 'lastName', label: 'Last Name', placeholder: 'Smith' },
          { id: 'email', label: 'Email', placeholder: 'jane@mail.com' },
          { id: 'phone', label: 'Phone', placeholder: '+91 91996 81619' },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-white mb-2">
              {field.label}
            </label>
            <input
              type={field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'}
              id={field.id}
              name={field.id}
              required
              value={(formData as any)[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-black/60 border border-purple-600/30 rounded-md text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Hi, I am Jane and I want help with..."
          className="w-full px-4 py-3 bg-black/60 border border-purple-600/30 rounded-md text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-transform transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-3 bg-green-900/40 border border-green-600 rounded text-green-300 text-center mt-2">
          ✅ Message sent successfully!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-3 bg-red-900/40 border border-red-600 rounded text-red-300 text-center mt-2">
          ❌ Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
};

// 📩 Contact Info Cards
const ContactInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-xl mx-auto">
      {[
        {
          icon: 'https://img.icons8.com/?size=100&id=jicLxt1sA2qa&format=png&color=000000',
          title: 'E-mail',
          value: 'help.orbitlabs@gmail.com',
        },
        {
          icon: 'https://img.icons8.com/?size=100&id=eoVcP6w171GZ&format=png&color=000000',
          title: 'Phone',
          value: '+91 91996 81619',
        },
      ].map((info, i) => (
        <div
          key={i}
          className="bg-black/60 rounded-lg border border-purple-700/30 hover:border-purple-500/50 p-5 flex items-center gap-4 shadow-md shadow-purple-900/20 hover:shadow-purple-700/40 transition-all"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-800 to-pink-700">
            <img src={info.icon} alt={info.title} className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{info.title}</div>
            <div className="text-zinc-300 text-sm mt-1">{info.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 💬 Main Contact Page
const ContactPage: React.FC = () => {
  const heroHeading = useHeadingReveal({ direction: 'slide-right', delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: 'slide-right', delay: 600 });
  const formHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const faqHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#13001f] to-[#1a012c] text-white relative overflow-hidden">
      <AnimatedOrbs />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block border border-purple-500/40 text-purple-300/80 px-4 py-1 rounded-full text-sm mb-6 backdrop-blur-sm">
              Get In Touch
            </div>

            <h1
              ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>}
              className={`text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg ${heroHeading.animationClasses}`}
            >
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
                Your Workflow?
              </span>
            </h1>

            <p
              ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>}
              className={`text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed ${heroSubheading.animationClasses}`}
            >
              Let’s discuss how AI automation can streamline your business, boost productivity, 
              and unlock next-level efficiency. We’d love to hear from you.
            </p>
          </div>

          {/* Contact Info */}
          <ContactInfo />

          {/* Form */}
          <div className="max-w-xl mx-auto mt-10">
            <div className="bg-black/50 border border-purple-700/30 rounded-2xl p-6 shadow-lg shadow-purple-900/20 backdrop-blur-md">
              <div className="mb-6">
                <h2
                  ref={formHeading.ref as React.RefObject<HTMLHeadingElement>}
                  className={`text-xl font-semibold mb-2 ${formHeading.animationClasses}`}
                >
                  Send us a message
                </h2>
                <p className="text-zinc-400 text-sm">
                  Fill out the form below and we’ll get back to you as soon as possible.  
                  All fields marked with * are required.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <h3
              ref={faqHeading.ref as React.RefObject<HTMLHeadingElement>}
              className={`text-3xl font-bold text-center mb-10 ${faqHeading.animationClasses}`}
            >
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: 'What types of businesses do you work with?',
                  answer:
                    'We partner with startups to enterprises across industries such as e-commerce, healthcare, and finance to build scalable automation solutions.',
                },
                {
                  question: 'How long does a typical automation project take?',
                  answer:
                    'Depending on the project complexity, most automation workflows are delivered within 2–6 weeks.',
                },
                {
                  question: 'Do you provide ongoing support?',
                  answer:
                    'Absolutely. We provide continuous monitoring, updates, and performance optimization to ensure reliability and scalability.',
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-black/50 rounded-lg border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 shadow-md shadow-purple-900/10"
                >
                  <summary className="p-5 cursor-pointer font-medium text-white hover:text-purple-300 transition">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-zinc-300 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
