import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentUser?: UserProfile | null;
  onOpenBookingDemo?: () => void;
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenBookingDemo,
  onOpenAuth,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current section
      const sections = ['home', 'about', 'features', 'finder', 'account', 'team', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'nav-scroll' : ''}`}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="navbar-brand"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img
            src={scrolled ? '/images/logo-black.png' : '/images/logo.png'}
            alt="Auto-Mobile Parking"
            className="logo-img"
          />
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'none' }} className="d-md-flex desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: '4px' }}>
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('about');
                }}
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('features');
                }}
                className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#finder"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('finder');
                }}
                className={`nav-link ${activeSection === 'finder' ? 'active' : ''}`}
              >
                Spot Finder
              </a>
            </li>
            <li>
              <a
                href="#team"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('team');
                }}
                className={`nav-link ${activeSection === 'team' ? 'active' : ''}`}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              >
                Contact
              </a>
            </li>

            {currentUser ? (
              <li style={{ marginLeft: '12px' }}>
                <a
                  href="#auth"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: scrolled ? '#f3e8ff' : 'rgba(255,255,255,0.25)',
                    color: scrolled ? '#7a60ff' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    border: '1px solid rgba(122,96,255,0.2)',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-user-circle" style={{ fontSize: '15px' }}></i>
                  <span>{currentUser.name.split(' ')[0]}</span>
                </a>
              </li>
            ) : (
              <li style={{ marginLeft: '12px' }}>
                <button
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth();
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '25px',
                    border: scrolled ? '1px solid #7a60ff' : '1px solid rgba(255,255,255,0.6)',
                    background: 'transparent',
                    color: scrolled ? '#7a60ff' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className="fas fa-lock" style={{ marginRight: '6px' }}></i>
                  Sign In
                </button>
              </li>
            )}

            {onOpenBookingDemo && (
              <li style={{ marginLeft: '8px' }}>
                <button
                  onClick={onOpenBookingDemo}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '25px',
                    border: 'none',
                    background: scrolled ? 'linear-gradient(135deg, #7a60ff, #cd9ffa)' : '#ffffff',
                    color: scrolled ? '#ffffff' : '#7a60ff',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className="fas fa-parking" style={{ marginRight: '6px' }}></i>
                  Reserve Spot
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          style={{
            display: 'block',
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            color: scrolled ? '#333' : '#fff',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="d-md-none"
        >
          <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            padding: '20px 25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            About
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('features');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            Features
          </a>
          <a
            href="#finder"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('finder');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            Spot Finder
          </a>
          <a
            href="#auth"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (onOpenAuth) onOpenAuth();
            }}
            style={{ color: '#7a60ff', fontWeight: 700, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            {currentUser ? `Account (${currentUser.name})` : 'Sign In / Register'}
          </a>
          <a
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('team');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}
          >
            Team
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            style={{ color: '#333', fontWeight: 600, padding: '8px 0' }}
          >
            Contact
          </a>

          {onOpenBookingDemo && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingDemo();
              }}
              className="btn-grad"
              style={{ marginTop: '8px' }}
            >
              Quick Reserve Spot
            </button>
          )}
        </div>
      )}

      {/* Style for responsive visibility */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .d-md-none {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
