import { Badge } from "@/components/ui/badge";

const TrustSection = () => {
  const techLogos = [
    { name: "Vercel", icon: "vercel", useSimpleIcons: true },
    { name: "Hugging Face", icon: "huggingface", useSimpleIcons: true },
    { name: "n8n", icon: "n8n", useSimpleIcons: true },
    { name: "Figma", icon: "figma", useSimpleIcons: true },
    { name: "Framer", icon: "framer", useSimpleIcons: true },
    { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", useSimpleIcons: false },
    { name: "Keras", icon: "keras", useSimpleIcons: true },
    { name: "TensorFlow", icon: "tensorflow", useSimpleIcons: true },
    { name: "PyTorch", icon: "pytorch", useSimpleIcons: true },
    { name: "React", icon: "react", useSimpleIcons: true },
    { name: "Terraform", icon: "terraform", useSimpleIcons: true },
    { name: "Ansible", icon: "ansible", useSimpleIcons: true },
    { name: "Docker", icon: "docker", useSimpleIcons: true },
    { name: "Jenkins", icon: "jenkins", useSimpleIcons: true },
    { name: "JavaScript", icon: "javascript", useSimpleIcons: true },
    { name: "Kubernetes", icon: "kubernetes", useSimpleIcons: true },
    { name: "Python", icon: "python", useSimpleIcons: true },
    { name: "scikit-learn", icon: "scikitlearn", useSimpleIcons: true },
    { name: "OpenCV", icon: "opencv", useSimpleIcons: true },
    { name: "Grafana", icon: "grafana", useSimpleIcons: true },
    { name: "PostgreSQL", icon: "postgresql", useSimpleIcons: true },
    { name: "Django", icon: "django", useSimpleIcons: true },
    { name: "Flask", icon: "flask", useSimpleIcons: true },
    { name: "GCP", icon: "googlecloud", useSimpleIcons: true },
    { name: "Azure", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg", useSimpleIcons: false },
    { name: "PHP", icon: "php", useSimpleIcons: true },
    { name: "Git", icon: "git", useSimpleIcons: true },
    { name: "GitHub", icon: "github", useSimpleIcons: true },
    { name: "GitLab", icon: "gitlab", useSimpleIcons: true },
    { name: "Prometheus", icon: "prometheus", useSimpleIcons: true },
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
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold-medium mb-8 sm:mb-12 lg:mb-16 px-4">
          Powered by industry-leading technologies
        </h2>

        {/* Tech logos carousel */}
        <div className="mb-16 sm:mb-24 lg:mb-32">
          <div className="carousel-container">
            <div className="flex animate-scroll gap-8 sm:gap-12 lg:gap-16">
              {/* First set of logos */}
              {techLogos.map((tech, index) => (
                <div 
                  key={`set1-${index}`} 
                  className="flex items-center justify-center space-x-2 sm:space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 min-w-fit"
                >
                  <img 
                    src={tech.useSimpleIcons ? `https://cdn.simpleicons.org/${tech.icon}/white` : tech.icon}
                    alt={tech.name}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={!tech.useSimpleIcons ? { filter: 'brightness(0) invert(1)' } : {}}
                  />
                  <span className="text-gray-400 font-medium text-sm sm:text-base lg:text-lg whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {techLogos.map((tech, index) => (
                <div 
                  key={`set2-${index}`} 
                  className="flex items-center justify-center space-x-2 sm:space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 min-w-fit"
                >
                  <img 
                    src={tech.useSimpleIcons ? `https://cdn.simpleicons.org/${tech.icon}/white` : tech.icon}
                    alt={tech.name}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={!tech.useSimpleIcons ? { filter: 'brightness(0) invert(1)' } : {}}
                  />
                  <span className="text-gray-400 font-medium text-sm sm:text-base lg:text-lg whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .carousel-container {
          overflow: hidden;
          width: 100%;
        }
        
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 80s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;