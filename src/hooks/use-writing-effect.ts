import { useState, useEffect, useRef } from 'react';

interface UseWritingEffectOptions {
  speed?: number;
  delay?: number;
  trigger?: 'immediate' | 'scroll';
  threshold?: number;
}

interface UseWritingEffectReturn {
  displayedText: string;
  isWriting: boolean;
  isComplete: boolean;
  ref: React.RefObject<HTMLElement>;
}

export function useWritingEffect(
  text: string,
  options: UseWritingEffectOptions = {}
): UseWritingEffectReturn {
  const {
    speed = 50,
    delay = 0,
    trigger = 'immediate',
    threshold = 0.1
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (trigger === 'immediate') {
      setTimeout(() => {
        startWriting();
      }, delay);
      return;
    }

    // For scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              startWriting();
            }, delay);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array to prevent infinite re-renders

  const startWriting = () => {
    setIsWriting(true);
    setIsComplete(false);
    setDisplayedText('');

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsWriting(false);
        setIsComplete(true);
      }
    }, speed);
  };

  return {
    displayedText,
    isWriting,
    isComplete,
    ref
  };
}