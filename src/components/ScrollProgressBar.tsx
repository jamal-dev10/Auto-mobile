import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3.5px',
        background: 'linear-gradient(90deg, #ffea79 0%, #cd9ffa 40%, #7a60ff 80%, #5c38e6 100%)',
        zIndex: 9999,
        transition: 'width 0.1s cubic-bezier(0.2, 0.8, 0.4, 1)',
        boxShadow: '0 0 10px rgba(122, 96, 255, 0.6)',
      }}
    />
  );
};
