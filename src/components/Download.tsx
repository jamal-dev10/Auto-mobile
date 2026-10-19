import React from 'react';
import { Reveal } from './Reveal';

export const Download: React.FC = () => {
  return (
    <section id="download" className="download-section section-padding">
      <div className="download-pattern-bg"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#fff' }}>Download Our App</h3>
            <span className="line" style={{ background: '#fff' }}></span>
            <p style={{ color: '#ffffff', opacity: 0.95, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Download now from Playstore or AppStore
            </p>
            <p style={{ color: '#ffffff', opacity: 0.9, marginTop: '8px' }}>
              Join thousands of smart drivers across the city who never circle for parking again.
            </p>
          </div>
        </Reveal>

        <Reveal animation="zoom-in" delay={200} duration={800}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
            >
              <img
                src="/images/appstore.png"
                alt="Download on the App Store"
                style={{ height: '52px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.2)' }}
              />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
            >
              <img
                src="/images/playstore.png"
                alt="Get it on Google Play"
                style={{ height: '52px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.2)' }}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
