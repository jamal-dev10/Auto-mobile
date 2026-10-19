import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthPageProps {
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onBackToHome: () => void;
  onGoToFinder: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onBackToHome,
  onGoToFinder,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('driver@auto-mobile.ma');
  const [signInPassword, setSignInPassword] = useState('••••••••');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPlate, setSignUpPlate] = useState('');
  const [signUpVehicle, setSignUpVehicle] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      name: signInEmail.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()) || 'Jamal Driver',
      email: signInEmail,
      vehiclePlate: '48291-A-6',
      vehicleModel: 'Peugeot 208 GT',
      points: 320,
    };
    onLogin(user);
    setNotice('Welcome back! You are successfully signed in.');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail) return;

    const user: UserProfile = {
      name: signUpName,
      email: signUpEmail,
      vehiclePlate: signUpPlate || '98765-B-1',
      vehicleModel: signUpVehicle || 'Dacia Sandero Stepway',
      points: 100,
    };
    onLogin(user);
    setNotice('Account created! 100 welcome parking points credited.');
  };

  const handleQuickDemoLogin = (type: 'driver' | 'fleet') => {
    if (type === 'driver') {
      const demoUser: UserProfile = {
        name: 'Jamal Ezziouani',
        email: 'jamal@auto-mobile.ma',
        phone: '+212 600-112233',
        vehiclePlate: '34912-A-6',
        vehicleModel: 'Audi A3 Sportback',
        points: 450,
      };
      onLogin(demoUser);
    } else {
      const fleetUser: UserProfile = {
        name: 'Casablanca Logistics Fleet',
        email: 'fleet@casalog.ma',
        phone: '+212 522-998877',
        vehiclePlate: '88201-B-8',
        vehicleModel: 'Mercedes Sprinter Van',
        points: 1200,
      };
      onLogin(fleetUser);
    }
    setNotice('Signed in with Demo Account.');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1b0e36 0%, #2f1754 50%, #431f77 100%)',
        color: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(205, 159, 250, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Top Navigation Bar for Auth Page */}
      <header
        style={{
          padding: '20px 0',
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(27, 14, 54, 0.65)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div
            onClick={onBackToHome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/images/logo.png"
              alt="Auto-Mobile Parking"
              style={{ height: '42px', width: 'auto' }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '-0.3px',
                color: '#fff',
              }}
            >
              Auto-Mobile
            </span>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              borderRadius: '25px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 15px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ width: '100%', maxWidth: '1080px' }}>
          {notice && (
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto 25px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '14px',
                padding: '14px 20px',
                color: '#065f46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '14px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '18px' }}></i>
                <span>{notice}</span>
              </div>
              <button
                onClick={() => setNotice(null)}
                style={{ background: 'none', border: 'none', color: '#065f46', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {currentUser ? (
            /* Logged In Dashboard View */
            <div
              style={{
                maxWidth: '780px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
                overflow: 'hidden',
                color: '#333',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #7a60ff 0%, #cd9ffa 100%)',
                  padding: '35px 30px',
                  color: 'white',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      color: '#7a60ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      fontWeight: 800,
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    }}
                  >
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.25)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Driver Account
                    </span>
                    <h2 style={{ margin: '6px 0 2px', fontSize: '26px', color: '#fff', fontWeight: 800 }}>
                      {currentUser.name}
                    </h2>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                      <i className="fas fa-envelope" style={{ marginRight: '6px' }}></i>
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(12px)',
                    padding: '14px 24px',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>
                    Parking Rewards
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800 }}>{currentUser.points} pts</div>
                </div>
              </div>

              <div style={{ padding: '35px 30px' }}>
                <h4 style={{ fontSize: '18px', color: '#1f2937', marginBottom: '20px', fontWeight: 700 }}>
                  Active Vehicle Profile
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px',
                    marginBottom: '35px',
                  }}
                >
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Registered License Plate</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', letterSpacing: '0.5px' }}>
                      <i className="fas fa-car" style={{ color: '#7a60ff', marginRight: '8px' }}></i>
                      {currentUser.vehiclePlate}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Vehicle Model</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                      {currentUser.vehicleModel || 'Standard Vehicle'}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Free Parking Credit</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#10b981' }}>
                      <i className="fas fa-gift" style={{ marginRight: '6px' }}></i>
                      {Math.floor(currentUser.points / 100)} Hours Available
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '15px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '20px',
                    borderTop: '1px solid #edf0f5',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={onGoToFinder}
                      className="btn-grad"
                      style={{ width: 'auto', padding: '12px 26px', fontSize: '14px' }}
                    >
                      <i className="fas fa-parking" style={{ marginRight: '8px' }}></i>
                      Go to Spot Finder
                    </button>
                    <button
                      onClick={onBackToHome}
                      style={{
                        background: '#f1edfe',
                        color: '#7a60ff',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 22px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '13.5px',
                      }}
                    >
                      Back to Home
                    </button>
                  </div>

                  <button
                    onClick={onLogout}
                    style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '12px 24px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13.5px',
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standalone Authentication Card with 2-Column Presentation */
            <div
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.45)',
                overflow: 'hidden',
                color: '#333',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              }}
            >
              {/* Left Column: Perks & Brand Showcase */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #7a60ff 0%, #5c38e6 100%)',
                  padding: '50px 40px',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: 'url(/images/pattern.png) repeat',
                    opacity: 0.15,
                    pointerEvents: 'none',
                  }}
                ></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      letterSpacing: '0.6px',
                      display: 'inline-block',
                      marginBottom: '20px',
                    }}
                  >
                    Auto-Mobile Portal
                  </span>
                  <h2 style={{ fontSize: '34px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', color: '#fff' }}>
                    Smart Driver Access &amp; Fleet Hub
                  </h2>
                  <p style={{ opacity: 0.9, fontSize: '15px', lineHeight: 1.6, marginBottom: '35px' }}>
                    Sign in to manage guaranteed parking spots across Casablanca, access automated QR barrier entry, and view digital trip receipts.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                        }}
                      >
                        <i className="fas fa-bolt"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>Instant Automated Booking</div>
                        <div style={{ fontSize: '12.5px', opacity: 0.85 }}>Secure spots in under 15 seconds</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                        }}
                      >
                        <i className="fas fa-qrcode"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>Contactless QR Barrier Entry</div>
                        <div style={{ fontSize: '12.5px', opacity: 0.85 }}>No paper tickets or lost tokens</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                        }}
                      >
                        <i className="fas fa-gift"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>Driver Rewards Program</div>
                        <div style={{ fontSize: '12.5px', opacity: 0.85 }}>Earn points redeemable for free parking</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer on left card */}
                <div style={{ position: 'relative', zIndex: 2, marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '13px', opacity: 0.85 }}>
                  <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i>
                  256-bit SSL Encrypted &amp; Verified by CMI Morocco
                </div>
              </div>

              {/* Right Column: Forms & Toggle */}
              <div style={{ padding: '45px 35px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* Switcher Tab */}
                <div
                  style={{
                    display: 'flex',
                    background: '#f1edfe',
                    borderRadius: '30px',
                    padding: '4px',
                    marginBottom: '26px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: '25px',
                      border: 'none',
                      background: authMode === 'signin' ? '#7a60ff' : 'transparent',
                      color: authMode === 'signin' ? '#ffffff' : '#6b7280',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: authMode === 'signin' ? '0 4px 12px rgba(122,96,255,0.3)' : 'none',
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: '25px',
                      border: 'none',
                      background: authMode === 'signup' ? '#7a60ff' : 'transparent',
                      color: authMode === 'signup' ? '#ffffff' : '#6b7280',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: authMode === 'signup' ? '0 4px 12px rgba(122,96,255,0.3)' : 'none',
                    }}
                  >
                    Create Account
                  </button>
                </div>

                {/* Quick 1-Click Demo Buttons */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '11.5px', color: '#6b7280', textAlign: 'center', marginBottom: '8px', fontWeight: 600 }}>
                    Instant One-Click Demo
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('driver')}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px dashed #7a60ff',
                        background: '#f5f3ff',
                        color: '#7a60ff',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <i className="fas fa-user" style={{ marginRight: '6px' }}></i>
                      Demo Driver
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('fleet')}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px dashed #7a60ff',
                        background: '#f5f3ff',
                        color: '#7a60ff',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <i className="fas fa-truck" style={{ marginRight: '6px' }}></i>
                      Demo Fleet
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', opacity: 0.6 }}>
                  <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
                  <span style={{ padding: '0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>
                    Or credentials
                  </span>
                  <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
                </div>

                {authMode === 'signin' ? (
                  /* Sign In Form */
                  <form onSubmit={handleSignIn}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
                        Email or Phone Number
                      </label>
                      <input
                        type="email"
                        required
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="driver@auto-mobile.ma"
                        className="form-input-custom"
                        style={{ marginBottom: 0 }}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
                        Password
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="form-input-custom"
                          style={{ marginBottom: 0, paddingRight: '45px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#6b7280',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', fontSize: '13px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#4b5563' }}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={{ width: '16px', height: '16px', accentColor: '#7a60ff', margin: 0 }}
                        />
                        Remember my vehicle
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          setNotice('Password recovery code sent to your registered email.');
                        }}
                        style={{ color: '#7a60ff', fontWeight: 600 }}
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button type="submit" className="btn-grad" style={{ padding: '14px', fontSize: '15px' }}>
                      Sign In to Auto-Mobile
                    </button>
                  </form>
                ) : (
                  /* Sign Up Form */
                  <form onSubmit={handleSignUp}>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '5px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="e.g. Jamal Ezziouani"
                        className="form-input-custom"
                        style={{ marginBottom: 0 }}
                      />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '5px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="e.g. jamal@example.com"
                        className="form-input-custom"
                        style={{ marginBottom: 0 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '5px' }}>
                          License Plate
                        </label>
                        <input
                          type="text"
                          required
                          value={signUpPlate}
                          onChange={(e) => setSignUpPlate(e.target.value)}
                          placeholder="e.g. 12345-A-6"
                          className="form-input-custom"
                          style={{ marginBottom: 0 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '5px' }}>
                          Vehicle Model
                        </label>
                        <input
                          type="text"
                          value={signUpVehicle}
                          onChange={(e) => setSignUpVehicle(e.target.value)}
                          placeholder="e.g. Audi A3"
                          className="form-input-custom"
                          style={{ marginBottom: 0 }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '5px' }}>
                        Password
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="Create strong password"
                          className="form-input-custom"
                          style={{ marginBottom: 0, paddingRight: '45px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#6b7280',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="btn-grad" style={{ padding: '14px', fontSize: '15px' }}>
                      Create Driver Account
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container">
          &copy; {new Date().getFullYear()} Auto-Mobile Parking Platform. All rights reserved. Casablanca, Morocco.
        </div>
      </footer>
    </div>
  );
};
