import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import orbitLogo from "@/assets/Orbitlabs_footer.png";
import { useFormSubmission } from '@/hooks/use-form-submission';
import { useState } from 'react';

// Newsletter Form Component
const NewsletterForm = () => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-xs">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
          className="bg-orbit-card border-orbit-purple/20 text-black placeholder:text-gray-400 w-full text-sm py-1.5 px-3"
        style={{ fontSize: "0.85rem", height: "2.25rem" }}
      />
      <div className="flex gap-2 w-full">
        <Input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
            className="bg-orbit-card border-orbit-purple/20 text-black placeholder:text-gray-400 flex-1 text-sm py-1.5 px-3"
          style={{ fontSize: "0.85rem", height: "2.25rem" }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="orbit"
          className="px-4 py-1.5 text-sm whitespace-nowrap"
          style={{ fontSize: "0.85rem", height: "2.25rem" }}
        >
          {isSubmitting ? '...' : 'Subscribe'}
        </Button>
      </div>
      {submitStatus === 'success' && (
        <p className="text-green-400 text-xs">✅ Subscribed successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-400 text-xs">❌ Something went wrong</p>
      )}
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="bg-orbit-dark border-t border-orbit-purple/20 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-4" style={{ zIndex: 50, position: 'relative' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          
          {/* Left Section - Logo, Tagline, Newsletter */}
          <div className="lg:col-span-5 space-y-5">
            {/* Logo */}
            <div className="flex items-center">
              <div
                style={{
                  width: "180px",
                  height: "56px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "100px",
                  overflow: "visible",
                  padding: 0,
                  alignContent: "center",
                  flexWrap: "nowrap",
                  gap: "10px",
                  backgroundImage: `url(${orbitLogo})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  borderRadius: 0,
                }}
                aria-label="OrbIT Labs logo"
              />
            </div>

            {/* Tagline */}
            <p className="text-orbit-text-muted text-sm leading-relaxed max-w-md">
              OrbIT Labs — Automate Smarter, Optimize Faster, and Grow Stronger.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3 pt-2">
              <h4 className="text-orbit-text-primary font-semibold text-base">
                Join our newsletter
              </h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Right Section - Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Links Column */}
            <div className="space-y-4">
              <h4 className="text-orbit-text-primary font-semibold text-sm uppercase tracking-wide">Links</h4>
              <nav className="flex flex-col space-y-2.5">
                <Link
                  to="/#services"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Services
                </Link>
                <Link
                  to="/#process"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Process
                </Link>
                <Link
                  to="/#case-studies"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Case studies
                </Link>
                <Link
                  to="/#benefits"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Benefits
                </Link>
                <Link
                  to="/#pricing"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Pricing
                </Link>
              </nav>
            </div>

            {/* Pages Column */}
            <div className="space-y-4">
              <h4 className="text-orbit-text-primary font-semibold text-sm uppercase tracking-wide">Pages</h4>
              <nav className="flex flex-col space-y-2.5">
                <Link
                  to="/"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  About
                </Link>
                <Link
                  to="/blog"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Blog
                </Link>
                <Link
                  to="/faq"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Socials Column */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-orbit-text-primary font-semibold text-sm uppercase tracking-wide">Socials</h4>
              <nav className="flex flex-col space-y-2.5">
                <a
                  href="#"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
                >
                  Twitter
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orbit-purple/20 pt-6 mt-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-orbit-text-muted text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} Created by OrbIT Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;