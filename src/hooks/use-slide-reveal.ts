import { useState, useEffect, useRef } from 'react';

interface UseSlideRevealOptions {
  delay?: number;
  duration?: number;
  trigger?: 'immediate' | 'scroll' | 'manual';
  threshold?: number;
}

export const useSlideReveal = (options: UseSlideRevealOptions = {}) => {
  const {
    delay = 0,
    duration = 1000,
    trigger = 'immediate',
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
    if (trigger === 'immediate') {
      startReveal();
    } else if (trigger === 'scroll' && elementRef.current) {
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
    }
  }, []);

  return {
    isRevealed,
    hasStarted,
    ref: elementRef,
    start: startReveal
  };
};