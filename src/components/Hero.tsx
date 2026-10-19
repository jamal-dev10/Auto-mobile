import React from 'react';

interface HeroProps {
  onExploreSpots: () => void;
  onWatchVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSpots, onWatchVideo }) => {
  return (
    <header id="home" className="hero-header">
      <div className="hero-pattern-bg"></div>
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <div className="hero-badge">
              <i className="fas fa-satellite-dish" style={{ color: '#ffea79' }}></i>
              <span>Live GPS Parking Tracking Active</span>
            </div>

            <h1 className="hero-title">
              Smart Parking Made Effortless & Fast
            </h1>

            <p className="hero-subtitle">
              Locate open parking bays in real-time, navigate instantly with live directions, and reserve guaranteed spaces in advance across Casablanca.
            </p>

            <div className="hero-buttons">
              <button onClick={onExploreSpots} className="btn-primary-custom">
                <i className="fas fa-search-location"></i>
                <span>Find Nearby Spot</span>
              </button>
              <button onClick={onWatchVideo} className="btn-secondary-custom">
                <i className="fas fa-play-circle"></i>
                <span>Watch App Demo</span>
              </button>
            </div>

            <div style={{ marginTop: '25px' }}>
              <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '12px', fontWeight: 600 }}>
                Available on iOS & Android
              </p>
              <div className="store-badges">
                <a href="#download">
                  <img src="/images/appstore.png" alt="Download on App Store" className="store-badge-img" />
                </a>
                <a href="#download">
                  <img src="/images/playstore.png" alt="Get it on Google Play" className="store-badge-img" />
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'flex', gap: '25px', marginTop: '35px', paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>2,450+</div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>Live Active Bays</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>&lt; 30s</div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>Instant Booking</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>99.4%</div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>Arrival Guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup with Shadow */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                maxWidth: '380px',
                width: '100%',
              }}
            >
              <img
                src="/images/DALL_E-2024-06-23-22.15.21-A-mobile-app-interface-for-a-parking-application-removebg.png"
                alt="Auto-Mobile Parking App UI"
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.35))',
                  animation: 'floatMockup 4s ease-in-out infinite alternate',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SVG Wave bottom curve */}
      <img
        src="/images/applight-wave.svg"
        alt="Wave shape divider"
        className="svg-wave"
      />
    </header>
  );
};
