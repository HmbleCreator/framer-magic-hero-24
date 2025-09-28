import React, { useState, useEffect } from 'react';
import { 
  PaperPlaneRight, 
  Plus, 
  ChartLine, 
  Image as ImageIcon, 
  FileMagnifyingGlass 
} from '@phosphor-icons/react';

interface PersonalAssistantProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
  onSendMessage?: (message: string) => void;
  onOptionClick?: (option: string) => void;
}

const PersonalAssistant: React.FC<PersonalAssistantProps> = ({
  variant = 'desktop',
  className = '',
  onSendMessage,
  onOptionClick
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typewriterTexts = [
    'Generate a invoice',
    'Schedule a 30 day content',
    'Provide me full report'
  ];

  useEffect(() => {
    const currentFullText = typewriterTexts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % typewriterTexts.length);
        }
      }
    }, isDeleting ? 80 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  const handleOptionClick = (option: string) => {
    onOptionClick?.(option);
  };

  const isMobile = variant === 'mobile';

  return (
    <div 
      className={`personal-assistant ${isMobile ? 'mobile' : 'desktop'} ${className}`}
      style={{
        width: isMobile ? '100%' : '280px',
        height: isMobile ? 'auto' : '280px',
        backgroundColor: '#000000',
        border: '1px solid #222222',
        borderRadius: '12px',
        padding: '5px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '10px',
        gap: '15px'
      }}>
        {/* Animated Orb */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'blur(1px)'
        }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)',
              animation: 'rotate 5s linear infinite'
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(141deg, rgb(223, 122, 254) 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)',
              animation: 'rotate-reverse 5s linear infinite',
              zIndex: 1
            }}
          />
        </div>

        {/* Title and Description */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0',
            color: 'white',
            textAlign: 'center'
          }}>
            What can I help with?
          </h2>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '0',
            textAlign: 'center',
            maxWidth: '240px',
            lineHeight: '1.4'
          }}>
            Weather you want help in customer handling or make changes in your system just give me command
          </p>
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '100%'
        }}>
          {/* Top Input */}
          <div style={{
            border: '1px solid #222222',
            borderRadius: '4px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: '500',
                minHeight: '14px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {currentText}
                <span style={{
                  opacity: 1,
                  animation: 'blink 1s infinite'
                }}>|</span>
              </div>
              <div style={{
                border: '1px solid #222222',
                borderRadius: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PaperPlaneRight size={12} color="rgb(129, 74, 200)" />
              </div>
            </div>

            {/* Add Document Button */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%'
            }}>
              <button
                onClick={() => handleOptionClick('add-document')}
                style={{
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  padding: '3px 8px 3px 5px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                <Plus size={12} color="rgb(129, 74, 200)" />
                Add document
              </button>
            </div>
          </div>

          {/* Bottom Options */}
          <div style={{
            padding: '5px 10px',
            borderRadius: '4px'
          }}>
            <div style={{
              display: 'flex',
              gap: '3px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleOptionClick('analyze')}
                style={{
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.75)',
                  padding: '3px 8px 3px 5px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                <ChartLine size={12} color="rgb(129, 74, 200)" />
                Analyze
              </button>
              
              <button
                onClick={() => handleOptionClick('generate-image')}
                style={{
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.75)',
                  padding: '3px 8px 3px 5px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                <ImageIcon size={12} color="rgb(129, 74, 200)" />
                Generate Image
              </button>

              {!isMobile && (
                <button
                  onClick={() => handleOptionClick('research')}
                  style={{
                    border: '1px solid #222222',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.75)',
                    padding: '3px 8px 3px 5px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  <FileMagnifyingGlass size={12} color="rgb(129, 74, 200)" />
                  Research
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .personal-assistant button:hover {
          background-color: rgb(0, 0, 0) !important;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        .personal-assistant.mobile {
          max-width: 100%;
          height: auto;
        }
        
        .personal-assistant.desktop {
          width: 280px;
          height: 280px;
        }
      `}</style>
    </div>
  );
};

export default PersonalAssistant;