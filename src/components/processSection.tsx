import React, { useEffect, useState } from 'react';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

// Radar Animation Component
const RadarAnimation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer border circle */}
      <div className="absolute w-24 h-24 rounded-full border border-gray-800"></div>
      
      {/* Concentric circles */}
      <div className="absolute w-20 h-20 rounded-full border border-purple-500/10"></div>
      <div className="absolute w-12 h-12 rounded-full border border-purple-500/10"></div>
      <div className="absolute w-6 h-6 rounded-full border border-purple-500/10"></div>
      
      {/* Rotating scanner */}
      <div 
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, rgba(153, 238, 255, 0) 0deg, rgba(129, 74, 200, 0.2) 30deg, rgba(129, 74, 200, 0.6) 60deg, rgba(153, 238, 255, 0) 90deg)`,
          transform: `rotate(${rotation}deg)`,
          mixBlendMode: 'screen'
        }}
      ></div>
    </div>
  );
};

// AI Development Code Editor Component
const AIDevelopmentEditor = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  // Height of one instance of the code block in px
  const codeHeight = 410; // Height of one complete code block
  const viewHeight = 134; // h-[134px]

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset(prev => {
        // Seamless infinite scroll - reset when one full block has passed
        if (prev >= codeHeight) {
          return prev - codeHeight;
        }
        return prev + 2; // Scroll speed
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border border-white-1px overflow-hidden">
      {/* Window Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 flex items-center justify-center">
            <svg className="w-2 h-2 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-3 h-3 flex items-center justify-center">
            <svg className="w-2 h-2 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Project Name */}
        <div className="bg-black px-7 py-2 rounded text-xs"></div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 flex items-center justify-center">
            <svg className="w-2 h-2 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div className="w-3 h-3 flex items-center justify-center">
            <svg className="w-2 h-2 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-3 h-3 flex items-center justify-center">
            <svg className="w-2 h-2 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex h-[160px]">
        {/* Sidebar */}
        <div className="w-10 bg-gray-900 border-r border-white-1px flex flex-col items-center py-2 gap-2">
          <div className="bg-white/5 p-1 rounded">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg className="w-3 h-3 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg className="w-3 h-3 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </div>
        </div>

        {/* Code Area with Scrolling Text */}
        <div className="flex-1 p-3 overflow-hidden relative">
          <div
            className="font-mono text-xs space-y-1 transition-none"
            style={{ transform: `translateY(-${scrollOffset}px)` }}
          >
            {/* Duplicate code blocks for seamless infinite scroll */}
            {[0, 1, 2].map(idx => (
              <React.Fragment key={idx}>
                {/* Full code content */}
                <div className="flex">
                  <span className="text-purple-400">class</span>
                  <span className="text-white/75 ml-1">AutomationTrigger:</span>
                </div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">__init__(self, threshold):</span>
                </div>
                <div className="ml-8 text-white/75">self.threshold = threshold</div>
                <div className="ml-8 text-white/75">self.status = "inactive"</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">check_trigger(self, value):</span>
                </div>
                <div className="ml-8 text-white/75">if value &gt; self.threshold:</div>
                <div className="ml-12 text-white/75">self.status = "active"</div>
                <div className="ml-12 text-white/75">return "Automation triggered!"</div>
                <div className="ml-8 text-white/75">else:</div>
                <div className="ml-12 text-white/75">return "No action taken."</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">get_status(self):</span>
                </div>
                <div className="ml-8 text-white/75">
                  return f"Status: {'{self.status}'}"
                </div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">reset(self):</span>
                </div>
                <div className="ml-8 text-white/75">self.status = "inactive"</div>
                <div className="ml-8 text-white/75">print("System reset completed.")</div>

                <div className="h-3"></div>
                <div className="text-green-400 ml-4"># Utility methods</div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">simulate(self, values):</span>
                </div>
                <div className="ml-8 text-white/75">for v in values:</div>
                <div className="ml-12 text-white/75">print(self.check_trigger(v))</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">summary(self):</span>
                </div>
                <div className="ml-8 text-white/75">
                  return {"{"}"threshold": self.threshold, "status": self.status{"}"}
                </div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">enable(self):</span>
                </div>
                <div className="ml-8 text-white/75">self.status = "enabled"</div>
                <div className="ml-8 text-white/75">print("Automation enabled.")</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">disable(self):</span>
                </div>
                <div className="ml-8 text-white/75">self.status = "disabled"</div>
                <div className="ml-8 text-white/75">print("Automation disabled.")</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">is_active(self):</span>
                </div>
                <div className="ml-8 text-white/75">return self.status == "active"</div>

                <div className="h-3"></div>
                <div className="flex ml-4">
                  <span className="text-purple-400">def</span>
                  <span className="text-white/75 ml-1">update_threshold(self, new_threshold):</span>
                </div>
                <div className="ml-8 text-white/75">self.threshold = new_threshold</div>
                <div className="ml-8 text-white/75">print(&quot;Threshold updated to {'{'}new_threshold{'}'}&quot;)</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Integration Animation Component
const IntegrationAnimation = () => {
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rayPosition, setRayPosition] = useState(0);

  useEffect(() => {
    // Rotating orbs - doubled speed
    const orbInterval = setInterval(() => {
      setRotation1(prev => (prev - 2) % 360);
      setRotation2(prev => (prev + 2) % 360);
    }, 25);

    // Moving rays
    const rayInterval = setInterval(() => {
      setRayPosition(prev => (prev + 1) % 200);
    }, 20);

    return () => {
      clearInterval(orbInterval);
      clearInterval(rayInterval);
    };
  }, []);

  // Brand icons array - All icons including Discord and Notepad
  const brandIcons = [
    // Slack - Simple hashtag/box
    <svg key="slack" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="url(#slack-gradient)" opacity="0.8"/>
      <path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h8v2H8z" fill="white"/>
      <defs>
        <linearGradient id="slack-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>,
    
    // ChatGPT - Simple chat bubble
    <svg key="chatgpt" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="url(#chatgpt-gradient)"/>
      <defs>
        <linearGradient id="chatgpt-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>,
    
    // Gmail - Simple envelope
    <svg key="gmail" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="url(#gmail-gradient)"/>
      <defs>
        <linearGradient id="gmail-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>,
    
    // Discord - Original Discord icon
    <svg key="discord" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 0 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.043.107a14.076 14.076 0 0 0 1.227 1.993a.077.077 0 0 0 .084.028a19.9 19.9 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418" fill="url(#discord-gradient)"/>
      <defs>
        <linearGradient id="discord-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>,
    
    // Notepad - Simple notepad icon
    <svg key="notepad" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h6v2zm3-4H7v-2h9v2zm0-4H7V7h9v2z" fill="url(#notepad-gradient)"/>
      <defs>
        <linearGradient id="notepad-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>,
    
    // Framer - Simple layers/boxes
    <svg key="framer" className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="url(#framer-gradient)" opacity="0.8"/>
      <rect x="9" y="9" width="6" height="6" rx="1" fill="white"/>
      <defs>
        <linearGradient id="framer-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(129, 74, 200)"/>
          <stop offset="1" stopColor="rgb(223, 122, 254)"/>
        </linearGradient>
      </defs>
    </svg>
  ];

  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % brandIcons.length);
    }, 800);
    return () => clearInterval(iconInterval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full max-w-md relative bg-black border border-white-1px p-12">
      {/* Our Solution */}
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 bg-black border border-white-1px rounded-lg flex items-center justify-center mb-3">
          {/* Rotating orbs */}
          <div 
            className="absolute w-7 h-7 rounded-full blur-sm"
            style={{
              background: "linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)",
              transform: `rotate(${rotation1}deg)`,
              transformOrigin: '50% 50%'
            }}
          />
          <div 
            className="absolute w-12 h-12 rounded-full"
            style={{
              background: "linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)",
              transform: `rotate(${rotation2}deg)`
            }}
          />
        </div>
        <span className="text-xs text-gray-400">Our solution</span>
      </div>
      {/* Animated Connection Lines - Closer spacing */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="space-y-2 w-full">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative h-0.5 bg-white/5 rounded-full overflow-hidden w-full">
              <div 
                className="absolute h-full w-[32px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(129, 74, 200, 0.1) 0%, rgba(129, 74, 200, 0.6) 87%, rgba(221, 121, 253, 0.6) 99%, rgba(223, 122, 254, 0.6) 100%)",
                  transform: `translateX(${(rayPosition + index * 30) % 160}px)`,
                  transition: 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Your Stack - Rotating Icons */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-black border border-white-1px rounded-lg flex items-center justify-center mb-3 transition-all duration-300">
          {brandIcons[currentIcon]}
        </div>
        <span className="text-xs text-gray-400">Your stack</span>
      </div>
    </div>
  );
};

// Optimization Dashboard Component - Based on Framer Design
const OptimizationDashboard = () => {
  const [spinRotation, setSpinRotation] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    // Spinning animation for the chatbot system
    const spinInterval = setInterval(() => {
      setSpinRotation(prev => (prev + 3) % 360);
    }, 25);

    // Slideshow animation for workflow system
    const slideInterval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % 2);
    }, 1500);

    return () => {
      clearInterval(spinInterval);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="bg-black border border-white-1px rounded-lg p-3 space-y-2.5">
      {/* Chatbot System */}
      <div className="bg-black border border-white-1px rounded px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-white/90 font-medium">Chatbot system</div>
            <div className="text-xs text-gray-400">Efficiency will increase by 20%</div>
          </div>
        </div>
        <div 
          className="w-4 h-4 flex items-center justify-center"
          style={{ transform: `rotate(${spinRotation}deg)` }}
        >
          <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 2a2 2 0 00-2 2v11a1 1 0 001 1h2a1 1 0 001-1V4a2 2 0 00-2-2H4zM14 2a2 2 0 012 2v11a1 1 0 01-1 1h-2a1 1 0 01-1-1V4a2 2 0 012-2h2zM10.5 2A1.5 1.5 0 009 3.5v13A1.5 1.5 0 0010.5 18h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0011.5 2h-1z" />
          </svg>
        </div>
      </div>

      {/* Workflow System */}
      <div className="bg-black border border-white-1px rounded px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-white/90 font-medium">Workflow system</div>
            <div className="text-xs text-gray-400">Update available..</div>
          </div>
        </div>
        <div className="w-4 h-4 bg-white/5 border border-gray-700/30 rounded flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <svg 
              className={`absolute w-2.5 h-2.5 text-purple-500 transition-transform duration-300 ${slideIndex === 0 ? 'translate-y-0' : '-translate-y-4'}`}
              style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) translateY(${slideIndex === 0 ? '0' : '-16px'})` }}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <svg 
              className={`absolute w-2.5 h-2.5 text-purple-500 transition-transform duration-300 ${slideIndex === 1 ? 'translate-y-0' : 'translate-y-4'}`}
              style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) translateY(${slideIndex === 1 ? '0' : '16px'})` }}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sales System */}
      <div className="bg-black border border-white-1px rounded px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white/75" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-white/90 font-medium">Sales system</div>
            <div className="text-xs text-gray-400">Up to date</div>
          </div>
        </div>
        <div className="w-4 h-4 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Checklist Component
const Checklist = () => (
  <div className="space-y-2">
    <div className="text-xs text-gray-400 mb-2">Analyzing workflow..</div>
    {[
      { icon: '⚙️', text: 'System check', completed: true },
      { icon: '🔄', text: 'Process check', completed: true },
      { icon: '⚡', text: 'Speed check', completed: false },
      { icon: '👤', text: 'Manual work', completed: false },
      { icon: '🔄', text: 'Repetitive task', completed: false }
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          item.completed 
            ? 'bg-purple-600 border-purple-600' 
            : 'border-gray-600 bg-transparent'
        }`}>
          {item.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="text-xs text-gray-300">{item.text}</span>
      </div>
    ))}
  </div>
);

// Main Process Section Component
const ProcessSection = () => {
  const processHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  
  return (
  <section id="process" className="bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gray-900/50 text-gray-300 px-3 py-1 rounded-full text-xs mb-3">
            Our Process
          </div>
          <h2 className="text-3xl font-bold mb-3 leading-tight">
            Our Simple, Smart,<br />
            and Scalable Process
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            We design, develop, and implement automation tools that help you work smarter, not harder
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="bg-black backdrop-blur-sm border border-white-1px rounded-lg p-5 relative overflow-hidden">
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Step 1</div>
              <h3 className="text-lg font-bold mb-2">Smart Analyzing</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                We assess your needs and identify AI solutions to streamline workflows and improve efficiency.
              </p>
            </div>
            <div className="flex items-stretch border border-white-1px p-5 scale-75 origin-center">
              <div className="flex-1 flex items-center justify-center border border-white-1px p-3 mr-2">
                <Checklist />
              </div>
              <div className="flex-1 flex items-center justify-center border border-white-1px p-3 ml-2">
                <RadarAnimation />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-black backdrop-blur-sm border border-white-1px rounded-lg p-5 relative overflow-hidden">
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Step 2</div>
              <h3 className="text-lg font-bold mb-2">AI Development</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Our team builds intelligent automation systems tailored to your business processes.
              </p>
            </div>
            <div className="mt-4 scale-75 origin-center">
              <AIDevelopmentEditor />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-black backdrop-blur-sm border border-white-1px rounded-lg p-5 relative overflow-hidden">
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Step 3</div>
              <h3 className="text-lg font-bold mb-2">Seamless Integration</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.
              </p>
            </div>
            <div className="mt-4 flex justify-center scale-75 origin-center">
              <IntegrationAnimation />
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-black backdrop-blur-sm border border-white-1px rounded-lg p-5 relative overflow-hidden">
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Step 4</div>
              <h3 className="text-lg font-bold mb-2">Continuous Optimization</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                We refine performance, analyze insights, and enhance automation for long-term growth.
              </p>
            </div>
            <div className="mt-4 scale-75 origin-center border border-white-1px p-3 ml-2">
              <OptimizationDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;