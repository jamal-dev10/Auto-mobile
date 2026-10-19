import React from 'react';
import { Reveal } from './Reveal';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: 'fas fa-parking',
      title: 'Find Nearby Parking',
      description: 'Locate the nearest available parking spots quickly and easily with our app’s real-time GPS tracking.',
    },
    {
      icon: 'fas fa-clock',
      title: 'Real-time Availability',
      description: 'Check the availability of parking spaces in real-time and avoid driving around searching for a spot.',
    },
    {
      icon: 'fas fa-credit-card',
      title: 'Secure Payment',
      description: 'Pay for your parking securely through the app, with various payment options including cards and digital wallets.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safety Features',
      description: 'Our app provides information on the security level of parking areas, ensuring a safe parking experience.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Notifications',
      description: 'Receive notifications about parking availability, expiration of parking time, and more directly on your phone.',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Parking History',
      description: 'Keep track of your parking history, including locations, times, and payments, for easy reference.',
    },
  ];

  return (
    <section id="features" className="features-section section-padding">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '60px' }}>
            <h3>Features Designed For Drivers</h3>
            <span className="line"></span>
            <p>
              Eliminate parking stress with intuitive GPS navigation, contact-free payments, instant availability sensors, and verified safety ratings.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          {/* Left Mockup with slide from right/left */}
          <Reveal animation="fade-right" duration={850}>
            <div className="mockup-container">
              <img
                src="/images/DALL_E-2024-06-23-22.15.21-A-mobile-app-interface-for-a-parking-application-removebg.png"
                alt="Parking App Mockup"
                className="mockup-img"
                style={{ maxWidth: '360px', width: '100%' }}
              />
            </div>
          </Reveal>

          {/* Right Grid of 6 features with staggered slide from right */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {featureList.map((feat, index) => (
              <Reveal key={index} animation="fade-left" delay={(index % 4) * 120} duration={750}>
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className={feat.icon}></i>
                  </div>
                  <h5>{feat.title}</h5>
                  <p>{feat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
