import { Badge } from "@/components/ui/badge";
import { Camera, Hexagon, Sparkles, Shield } from "lucide-react";

const TrustSection = () => {
  const companyLogos = [
    { icon: Camera, name: "Logoipsum" },
    { icon: Hexagon, name: "Logoipsum" },
    { icon: Sparkles, name: "Logoipsum" },
    { icon: Shield, name: "Logoipsum" },
  ];

  return (
    <section className="relative bg-black py-12 sm:py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Trust headline */}
        <h2 className="text-orbit-text-primary text-lg sm:text-xl md:text-2xl font-medium mb-8 sm:mb-12 lg:mb-16 px-4">
          Over 50+ business trust us
        </h2>

        {/* Company logos carousel */}
        <div className="mb-16 sm:mb-24 lg:mb-32 overflow-hidden">
          <div className="flex animate-scroll-left">
            {/* First set of logos */}
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 sm:space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300 min-w-[150px] sm:min-w-[200px] mx-4 sm:mx-6 lg:mx-8">
                <company.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orbit-text-muted" />
                <span className="text-orbit-text-muted font-medium text-sm sm:text-base lg:text-lg whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companyLogos.map((company, index) => (
              <div key={`duplicate-${index}`} className="flex items-center justify-center space-x-2 sm:space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300 min-w-[150px] sm:min-w-[200px] mx-4 sm:mx-6 lg:mx-8">
                <company.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orbit-text-muted" />
                <span className="text-orbit-text-muted font-medium text-sm sm:text-base lg:text-lg whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services badge */}
        <div className="mb-6 sm:mb-8 px-4">
          <Badge 
            variant="outline" 
            className="bg-orbit-dark-lighter/50 border-orbit-text-muted/20 text-orbit-text-primary px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm"
          >
            Our Services
          </Badge>
        </div>

        {/* Main headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-orbit-text-primary mb-6 sm:mb-8 leading-tight max-w-5xl mx-auto px-4">
          AI Solutions That Take Your{" "}
          <br className="hidden md:block" />
          Business to the Next Level
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-orbit-text-muted max-w-3xl mx-auto leading-relaxed px-4">
          We design, develop, and implement automation tools that help you work smarter, not harder
        </p>
      </div>
    </section>
  );
};

export default TrustSection;