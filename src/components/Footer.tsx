import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import orbitLogo from "@/assets/orbit-logo.png";
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-orbit-card border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted flex-1 text-sm py-1.5 px-2"
        style={{ fontSize: "0.85rem", height: "2rem" }}
      />
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-orbit-card border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted flex-1 text-sm py-1.5 px-2"
          style={{ fontSize: "0.85rem", height: "2rem" }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="orbit"
          className="px-3 py-1.5 text-sm"
          style={{ fontSize: "0.85rem", height: "2rem" }}
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
  <footer className="bg-orbit-dark border-t border-orbit-purple/20 px-6 pt-6 pb-2" style={{ zIndex: 50, position: 'relative' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-10">
          {/* Left Side - Logo, Tagline, Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                style={{
                  width: "190px",
                  height: "60px",
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
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: 0,
                }}
                aria-label="OrbIT Labs logo"
              />
            </div>
            {/* Tagline */}
            <p className="text-orbit-text-muted text-sm max-w-sm">
              OrbIT Labs — Automate Smarter, Optimize Faster, and Grow Stronger.
            </p>
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="text-orbit-text-primary font-medium text-base">
                Join our newsletter
              </h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Links</h4>
            <div className="space-y-3">
              <Link
                to="/#services"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                to="/#process"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Process
              </Link>
              <Link
                to="/#case-studies"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Case studies
              </Link>
              <Link
                to="/#benefits"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Benefits
              </Link>
              <Link
                to="/#pricing"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Pages Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Pages</h4>
            <div className="space-y-3">
              <Link
                to="/"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                to="/404"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                404
              </Link>
            </div>
          </div>

          {/* Socials Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Socials</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="#"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orbit-purple/20 pt-4">
          <div className="flex justify-center items-center">
            <p className="text-orbit-text-muted text-sm">
              Created by OrbIT Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;