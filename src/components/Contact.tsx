import React, { useState } from 'react';
import { Reveal } from './Reveal';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="sectioner-header" style={{ marginBottom: '50px' }}>
            <h3>Contact Us</h3>
            <span className="line"></span>
            <p>
              Have a question, feedback, or need partner garage integration? Our team is available 24/7 to assist you.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
          {/* Form */}
          <Reveal animation="fade-right" duration={800}>
            <div className="contact-form-container">
              {submitted ? (
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '16px',
                    padding: '40px 30px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      margin: '0 auto 16px',
                    }}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <h4 style={{ color: '#166534', marginBottom: '8px', fontSize: '20px' }}>Message Dispatched!</h4>
                  <p style={{ color: '#15803d', fontSize: '14px', marginBottom: '20px' }}>
                    Thank you for reaching out. Our support team in Casablanca will get back to you within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-grad"
                    style={{ width: 'auto', display: 'inline-block' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact_form">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input-custom"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input-custom"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input-custom"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      placeholder="Message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input-custom"
                      style={{ height: '140px', resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="btn-grad">
                    {loading ? 'Submitting...' : 'Submit Message'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact Details Card */}
          <Reveal animation="fade-left" duration={800} delay={150}>
            <div>
              <div className="contact-info-card">
                <h4 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>
                  Headquarters
                </h4>

                <div className="contact-info-item">
                  <i className="fa fa-map-marker-alt"></i>
                  <div>
                    <div className="title">Address</div>
                    <div className="detail">Maroc, Casablanca</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <i className="fa fa-mobile-alt"></i>
                  <div>
                    <div className="title">Phone</div>
                    <div className="detail">
                      <a href="tel:+15173977100">009900990099</a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <i className="fa fa-envelope"></i>
                  <div>
                    <div className="title">E-mail</div>
                    <div className="detail">
                      <a href="mailto:yogeshsingh.now@gmail.com">yogeshsingh.now@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <i className="fa fa-clock"></i>
                  <div>
                    <div className="title">Working Hours</div>
                    <div className="detail">Mon-Fri 9.00 AM to 5.00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
