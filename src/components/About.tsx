import React from 'react';
import { Reveal } from './Reveal';

export const About: React.FC = () => {
  const cards = [
    {
      icon: 'fas fa-headset',
      title: 'Support',
      description: 'Get 24/7 support for any parking-related issues directly through the app, ensuring a smooth experience.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Cross Platform',
      description: 'Access the parking app on any device, including smartphones, tablets, and desktop computers.',
    },
    {
      icon: 'fas fa-bolt',
      title: 'Fast',
      description: 'Quickly find parking spots and make reservations within seconds, thanks to our app’s fast processing capabilities.',
    },
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '50px' }}>
            <h3>Why Choose Auto-Mobile</h3>
            <span className="line"></span>
            <p>
              Experience next-generation urban mobility with lightning-fast reservations, cross-platform accessibility, and round-the-clock driver assistance.
            </p>
          </div>
        </Reveal>

        <div className="grid-3">
          {cards.map((card, idx) => (
            <Reveal key={idx} animation="fade-up" delay={idx * 160} duration={800}>
              <div className="icon-card">
                <div className="icon-circle">
                  <i className={card.icon} aria-hidden="true"></i>
                </div>
                <h5>{card.title}</h5>
                <p className="description">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
