import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import orbitLogo from "@/assets/orbit-logo.png";
import BookingModal from "./BookingModal";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-orbit-text-primary hover:text-orbit-purple transition-colors font-medium"
      : "text-orbit-text-muted hover:text-orbit-purple transition-colors font-medium";
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between 
                   px-4 sm:px-6 md:px-10 py-4 h-[64px] 
                   bg-orbit-dark/95 backdrop-blur-md shadow-lg 
                   border-b border-gray-800"
      >
        {/* 🔹 Logo */}
        <div
          style={{
            width: "clamp(130px, 25vw, 180px)",
            height: "600px",
            backgroundImage: `url(${orbitLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center left",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: "10px",
          }}
          aria-label="OrbIT Labs logo"
        />

        {/* 🔹 Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link to="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link to="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link>
          <Link to="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* 🔹 Desktop CTA */}
        <div className="hidden md:flex items-center">
          <BookingModal>
            <Button
              variant="orbit"
              className="px-6 py-2 rounded-lg font-medium h-[40px] flex items-center 
                        overflow-hidden group relative transition-all duration-300"
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                Book a call
              </span>
              <span className="block absolute left-0 right-0 top-full transition-transform duration-500 translate-y-0 group-hover:translate-y-[-150%] group-hover:opacity-100 opacity-0">
                Book a call
              </span>
            </Button>
          </BookingModal>
        </div>

        {/* 🔹 Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-orbit-text-primary hover:text-orbit-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 🔹 Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-[64px] left-0 right-0 bg-orbit-dark/95 backdrop-blur-md 
                     border-t border-gray-800 md:hidden z-40 animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col px-6 py-6 space-y-4 text-center">
            <Link
              to="/"
              className={`${getLinkClass("/")} py-3 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${getLinkClass("/about")} py-3 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`${getLinkClass("/services")} py-3 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={`${getLinkClass("/blog")} py-3 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`${getLinkClass("/contact")} py-3 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Contact
            </Link>

            {/* 🔹 Mobile CTA */}
            <div className="pt-4 border-t border-gray-800">
              <BookingModal>
                <Button
                  variant="orbit"
                  className="w-full px-6 py-3 rounded-lg font-medium text-base h-[48px]"
                >
                  Book a call
                </Button>
              </BookingModal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
