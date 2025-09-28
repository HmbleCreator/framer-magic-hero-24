import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import orbitLogo from "@/assets/orbit-logo.png";

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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-6 max-w-8xl mx-auto h-[60px] bg-orbit-dark bg-opacity-95 backdrop-blur-md shadow-md">
        {/* Logo */}
        <div
          style={{
            width: "clamp(140px, 35vw, 190px)",
            height: "160px",
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
            backgroundPosition: "center",
            borderRadius: 0,
          }}
          aria-label="OrbIT Labs logo"
        />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 h-full">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link to="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link>
          <Link to="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center h-full">
          <Button variant="orbit" className="px-6 py-2 rounded-lg font-medium h-[40px] flex items-center overflow-hidden group relative" style={{height: '40px'}}>
            <span className="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
              Book a call
            </span>
            <span className="block absolute left-0 right-0 top-full transition-transform duration-500 translate-y-0 group-hover:translate-y-[-150%] group-hover:opacity-100 opacity-0">
              Book a call
            </span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-orbit-text-primary hover:text-orbit-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[60px] left-0 right-0 bg-orbit-dark/60 backdrop-blur-sm border-t border-gray-800 md:hidden z-40 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <Link 
              to="/" 
              className={`${getLinkClass("/")} py-3 px-4 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`${getLinkClass("/about")} py-3 px-4 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className={`${getLinkClass("/blog")} py-3 px-4 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`${getLinkClass("/contact")} py-3 px-4 rounded-lg hover:bg-white/5 transition-all text-lg`}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
            
            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-gray-800">
              <Button 
                variant="orbit" 
                className="w-full px-6 py-3 rounded-lg font-medium h-[48px] text-base"
              >
                Book a call
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;