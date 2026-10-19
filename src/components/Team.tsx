import React from 'react';
import { TeamMember } from '../types';
import { Reveal } from './Reveal';

export const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Nitu Singh',
      role: 'Marketing Specialist',
      image: '/images/user1.jpg',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
    {
      name: 'Yogesh Singh',
      role: 'CEO & Founder',
      image: '/images/user2.jpg',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
    {
      name: 'Nisha Sharma',
      role: 'Web Developer',
      image: '/images/user3.jpg',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  ];

  return (
    <section id="team" className="team-section section-padding">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '50px' }}>
            <h3>Our Team</h3>
            <span className="line"></span>
            <p>
              Meet the passionate individuals driving our parking app forward with their expertise and dedication.
            </p>
          </div>
        </Reveal>

        <div className="grid-3">
          {teamMembers.map((member, idx) => (
            <Reveal key={idx} animation="flip-left" delay={idx * 180} duration={850}>
              <div className="team-card">
                <div className="team-avatar-wrapper">
                  <img src={member.image} alt={member.name} className="team-avatar-img" />
                </div>
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <div className="team-social-links">
                  <a href={member.twitter || '#'} aria-label={`${member.name} Twitter`}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href={member.linkedin || '#'} aria-label={`${member.name} LinkedIn`}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={member.github || '#'} aria-label={`${member.name} GitHub`}>
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
