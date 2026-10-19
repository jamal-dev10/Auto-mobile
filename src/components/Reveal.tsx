import React, { useEffect, useRef, useState } from 'react';

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'flip-left';

interface RevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  className = '',
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const animationClass = `reveal-item reveal-${animation} ${isVisible ? 'reveal-active' : ''} ${className}`;

  const customStyle: React.CSSProperties = {
    ...style,
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <div ref={elementRef} className={animationClass} style={customStyle}>
      {children}
    </div>
  );
};
