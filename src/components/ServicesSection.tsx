import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Bot, Mail, TrendingUp, Code, MessageCircle, Check, X } from "lucide-react";
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

const ServicesSection = () => {
  const servicesHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [typingText, setTypingText] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  
  const fullTypingText = "Generate a list...";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const htmlElement = entry.target as HTMLElement;
            const cardIndex = parseInt(htmlElement.dataset.cardIndex || '0');
            setVisibleCards(prev => new Set(prev).add(cardIndex));
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visibleCards.has(2)) { // AI Assistant animation card
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullTypingText.length) {
          setTypingText(fullTypingText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [visibleCards]);

  useEffect(() => {
    if (visibleCards.has(0)) { // Workflow automation animation card
      const interval = setInterval(() => {
        setScrollPosition(prev => (prev + 1) % 400);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [visibleCards]);

  const services = [
    // Workflow Automation - Animation Card
    {
      category: "Workflow Automation",
      title: "", 
      description: "",
      badges: [],
      icon: Clock,
      type: "workflow-animation",
      column: "left"
    },
    // Workflow Automation - Text Card
    {
      category: "",
      title: "Automate repetitive tasks", 
      description: "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.",
      badges: ["Internal Task Bots", "100+ Automations"],
      icon: Clock,
      type: "workflow-text",
      column: "right"
    },
    // AI Assistant - Animation Card
    {
      category: "AI Assistant",
      title: "",
      description: "",
      badges: [],
      icon: Bot,
      type: "assistant-animation",
      column: "right"
    },
    // AI Assistant - Text Card
    {
      category: "",
      title: "Delegate Daily Tasks",
      description: "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.",
      badges: ["Summaries", "Scheduling", "Many more"],
      icon: Bot,
      type: "assistant-text",
      column: "left"
    },
    // Sales & Marketing - Animation Card
    {
      category: "Sales & Marketing",
      title: "",
      description: "",
      badges: [],
      icon: TrendingUp,
      type: "sales-animation",
      column: "left"
    },
    // Sales & Marketing - Text Card
    {
      category: "",
      title: "Accelerate Sales Growth",
      description: "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.",
      badges: ["Leads", "Content", "Social post"],
      icon: TrendingUp,
      type: "sales-text",
      column: "right"
    },
    // Custom Projects - Animation Card
    {
      category: "Custom Projects",
      title: "",
      description: "",
      badges: [],
      icon: Code,
      type: "custom-animation",
      column: "right"
    },
    // Custom Projects - Text Card
    {
      category: "",
      title: "Build Smarter Systems",
      description: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.",
      badges: ["Strategy", "Custom AI", "Consulting"],
      icon: Code,
      type: "custom-text",
      column: "left"
    }
  ];

  const workflowTasks = [
    { name: "Payroll management", status: "pending", date: "Due on 2nd july" },
    { name: "Employee Tracking", status: "completed", date: "2 days ago" },
    { name: "Social media post", status: "cancelled", date: "Cancelled by user" },
    { name: "Lead list", status: "progress", date: "70% prepared" },
    { name: "Invoice processing", status: "pending", date: "Due on 5th july" },
    { name: "Data backup", status: "completed", date: "1 hour ago" },
    { name: "Report generation", status: "progress", date: "45% completed" },
    { name: "Email campaign", status: "pending", date: "Scheduled for tomorrow" }
  ];

  const emailContacts = [
    { name: "Jack Daniel", role: "Founder", email: "justin@main.com", company: "Xavier LLC", verified: true },
    { name: "Ganga Chappal", role: "CEO", email: "ganga@company.com", company: "Tech Corp", verified: false }
  ];

  return (
    <section id="services" ref={sectionRef} className="relative bg-black py-12 sm:py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgb(0, 0, 0) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0, 0, 0) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 5s linear infinite;
        }
      `}</style>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Services Grid - 2 Columns */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 sm:gap-x-0 gap-y-24 auto-rows-fr justify-items-center w-full max-w-6xl">
          {services.map((service, index) => (
            <div 
              key={index}
              data-card-index={index}
              className={`
                bg-black/30
                backdrop-blur-sm border border-black/5 rounded-2xl p-6
                hover:bg-black/40 transition-all duration-500
                flex flex-col justify-between
                transform transition-all duration-700 ease-out
                ${visibleCards.has(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
                }
                w-full max-w-lg h-[460px]
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Category */}
              {service.category && (
                <div className="mb-4">
                  <span className="text-gray-400 text-sm font-medium">
                    {service.category}
                  </span>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {service.type === 'workflow-animation' ? (
                  <div className="h-full">
                    {/* Animated Task List */}
                    <div className="w-full h-full bg-black/80 rounded-2xl p-6 flex flex-col">
                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>All Tasks</span>
                        <span>Waiting for approval</span>
                      </div>
                      
                      {/* Scrolling container with fixed height */}
                      <div className="relative overflow-hidden h-48 flex-shrink-0">
                        <div 
                          className="space-y-3 transition-transform duration-300 ease-linear will-change-transform"
                          style={{
                            transform: `translateY(-${scrollPosition}px)`
                          }}
                        >
                          {[...workflowTasks, ...workflowTasks, ...workflowTasks].map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                              <div className="flex-shrink-0">
                                {task.status === 'completed' && <Check className="w-4 h-4 text-green-400" />}
                                {task.status === 'cancelled' && <X className="w-4 h-4 text-red-400" />}
                                {task.status === 'pending' && <Clock className="w-4 h-4 text-yellow-400" />}
                                {task.status === 'progress' && <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white text-sm font-medium">{task.name}</div>
                                <div className="text-gray-400 text-xs">{task.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Fade effects */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>
                      </div>
                    </div>
                  </div>
                ) : service.type === 'workflow-text' ? (
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                ) : service.type === 'assistant-animation' ? (
                  <div className="h-full">
                    {/* AI Assistant Personal Assistant Interface */}
                    <div className="w-full h-full bg-black/80 rounded-2xl p-6 flex flex-col items-center relative border border-gray-800">
                      {/* Animated Orb */}
                      <div className="relative mb-6 flex items-center justify-center">
                        <div 
                          className="w-16 h-16 rounded-full animate-spin-slow relative"
                          style={{
                            background: "linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)",
                            filter: "blur(1px)"
                          }}
                        />
                        <div 
                          className="absolute w-10 h-10 rounded-full animate-reverse-spin"
                          style={{
                            background: "linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)",
                            filter: "blur(1px)"
                          }}
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-white font-semibold mb-2 text-center">What can I help with?</h3>
                      <p className="text-gray-400 text-sm text-center mb-6 max-w-xs leading-relaxed">
                        Weather you want help in customer handling or make changes in your system just give me command
                      </p>
                      
                      {/* Input Area */}
                      <div className="w-full border border-gray-700 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-400 text-sm flex-1">
                            {visibleCards.has(2) && (
                              <span className="animate-pulse">
                                {typingText}
                                <span className="text-purple-400">|</span>
                              </span>
                            )}
                          </div>
                          <div className="w-6 h-6 bg-white/5 border border-gray-700 rounded flex items-center justify-center ml-2">
                            <div className="w-3 h-3 text-purple-400 flex items-center justify-center">▶</div>
                          </div>
                        </div>
                        
                        {/* Add Document Badge */}
                        <div className="flex mt-2">
                          <span className="inline-flex items-center space-x-1 px-2 py-1 bg-white/5 border border-gray-700 rounded-lg text-xs text-gray-400">
                            <span className="text-purple-400">+</span>
                            <span>Add document</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/5 border border-gray-700 rounded-lg text-xs text-gray-300">
                          <span className="text-purple-400">📊</span>
                          <span>Analyze</span>
                        </span>
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/5 border border-gray-700 rounded-lg text-xs text-gray-300">
                          <span className="text-purple-400">🖼️</span>
                          <span>Generate Image</span>
                        </span>
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/5 border border-gray-700 rounded-lg text-xs text-gray-300">
                          <span className="text-purple-400">🔍</span>
                          <span>Research</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )  : service.type === 'assistant-text' ? (
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                ) : service.type === 'sales-animation' ? (
                  <div className="h-full">
                    {/* Email Sending Interface with Progress Animation */}
                    <div className="w-full h-full bg-black/80 rounded-2xl p-6 flex flex-col border border-gray-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          E-mail Sending..
                        </h3>
                        <div className="w-6 h-6 rounded-full bg-purple-500 animate-spin" style={{
                          background: "linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)"
                        }}></div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-purple-600/20 border-purple-600/40 text-purple-300 text-xs">LinkedIn</Badge>
                        <Badge className="bg-white/5 border-gray-700 text-gray-300 text-xs">IT services</Badge>
                        <Badge className="bg-white/5 border-gray-700 text-gray-300 text-xs">Founders</Badge>
                      </div>
                      
                      <div className="space-y-3 flex-1 overflow-hidden mb-4" style={{
                        mask: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0, 0, 0, 0) 100%)",
                        WebkitMask: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0, 0, 0, 0) 100%)"
                      }}>
                        {emailContacts.map((contact, contactIndex) => (
                          <div key={contactIndex} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-gray-800">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-xs text-white font-medium">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm text-white font-medium">{contact.name}</span>
                                {contact.verified && (
                                  <Badge className="bg-green-500/20 border-green-500/40 text-green-400 text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">{contact.role}</div>
                              <div className="text-xs text-gray-500">{contact.email}</div>
                              <div className="text-xs text-gray-500">{contact.company}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Progress Bar Section */}
                      <div className="space-y-2">
                        <div className="relative h-0.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: visibleCards.has(4) ? '50%' : '1%' }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white font-medium">Draft</span>
                          <span className="text-white font-medium">Schedule</span>
                          <span className="text-gray-500 font-medium">Sent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : service.type === 'sales-text' ? (
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                ) : service.type === 'custom-animation' ? (
                  <div className="h-full">
                    {/* Custom Projects Interface */}
                    <div className="w-full h-full bg-black/80 rounded-2xl p-4 flex flex-col border border-gray-800">
                      {/* Greeting Section */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold text-lg">Hey David!</h3>
                        <p className="text-gray-400 text-sm">Here is your Custom project & schedule</p>
                      </div>
                      
                      {/* Project Status Section */}
                      <div className="bg-white/5 border border-gray-700 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-3 h-3 text-gray-400">⚙️</div>
                          <span className="text-white text-sm font-medium">On going project:</span>
                        </div>
                        
                        <div className="bg-white/5 border border-gray-700 rounded p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-white text-sm font-medium">Customer Support Chatbot</div>
                                <div className="text-gray-400 text-xs">90% Finished</div>
                              </div>
                            </div>
                            <div className="w-4 h-4 animate-spin text-gray-400">
                              <div className="w-full h-full border-2 border-gray-600 border-t-purple-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Calendar Section */}
                      <div className="flex-1">
                        <div className="bg-white/5 border border-gray-700 rounded-lg p-3 h-full">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-3 h-3 text-gray-400">📅</div>
                            <span className="text-white text-sm font-medium">Schedule</span>
                          </div>
                          
                          {/* Week Days */}
                          <div className="flex justify-between mb-3">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
                              <div 
                                key={day}
                                className={`
                                  px-2 py-1 rounded text-xs text-gray-300 text-center min-w-[24px]
                                  ${(visibleCards.has(6) && index === 0) ? 'bg-purple-600' : ''}
                                `}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          
                          {/* Meeting List */}
                          <div className="space-y-2">
                            <div className="bg-white/5 rounded p-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
                                  <div className="w-2 h-2 text-white text-xs">📹</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-white text-xs font-medium">Discovery call</div>
                                  <div className="text-gray-400 text-xs">10:00 am to 10:30 am</div>
                                </div>
                                <div className="text-gray-400">⋮</div>
                              </div>
                            </div>
                            
                            <div className="bg-white/5 rounded p-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
                                  <div className="w-2 h-2 text-white text-xs">🔄</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-white text-xs font-medium">Custom automation</div>
                                  <div className="text-gray-400 text-xs">06:00 pm to 06:30 pm</div>
                                </div>
                                <div className="text-gray-400">⋮</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : service.type === 'custom-text' ? (
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Badges */}
              {service.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white px-2 sm:px-3 py-1 text-xs font-medium backdrop-blur-sm"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;