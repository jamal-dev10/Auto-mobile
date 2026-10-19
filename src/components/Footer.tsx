import React from 'react';

interface FooterProps {
  onOpenAuth?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  return (
    <footer className="footer-copy">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/logo-black.png" alt="Auto-Mobile" style={{ height: '28px', width: 'auto' }} />
            <span style={{ fontWeight: 600, color: '#333' }}>Auto-Mobile Parking</span>
          </div>

          <p style={{ margin: 0, color: '#666' }}>
            &copy; {new Date().getFullYear()} Auto-Mobile. All rights reserved. Casablanca, Morocco.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#home" style={{ color: '#777', fontSize: '13px' }}>Home</a>
            <a href="#about" style={{ color: '#777', fontSize: '13px' }}>About</a>
            <a href="#features" style={{ color: '#777', fontSize: '13px' }}>Features</a>
            <a href="#finder" style={{ color: '#777', fontSize: '13px' }}>Spot Finder</a>
            <a
              href="#auth"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenAuth) onOpenAuth();
              }}
              style={{ color: '#777', fontSize: '13px' }}
            >
              Account
            </a>
            <a href="#contact" style={{ color: '#777', fontSize: '13px' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
