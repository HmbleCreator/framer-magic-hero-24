import { useState, useEffect, useRef } from 'react';

interface UseHeadingRevealOptions {
  delay?: number;
  duration?: number;
  direction?: 'fade-up' | 'slide-right' | 'fade-in';
  threshold?: number;
}

export const useHeadingReveal = (options: UseHeadingRevealOptions = {}) => {
  const {
    delay = 0,
    duration = 800,
    direction = 'fade-up',
    threshold = 0.1
  } = options;

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const startReveal = () => {
    if (hasStarted) return;
    setHasStarted(true);
    
    setTimeout(() => {
      setIsRevealed(true);
    }, delay);
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startReveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    if (!isRevealed) {
      switch (direction) {
        case 'slide-right':
          return `${baseClasses} opacity-0 transform translate-x-12`;
        case 'fade-up':
          return `${baseClasses} opacity-0 transform translate-y-8`;
        case 'fade-in':
          return `${baseClasses} opacity-0 transform scale-95`;
        default:
          return `${baseClasses} opacity-0 transform translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 transform translate-x-0 translate-y-0 scale-100`;
  };

  return {
    isRevealed,
    hasStarted,
    ref: elementRef,
    animationClasses: getAnimationClasses(),
    start: startReveal
  };
};