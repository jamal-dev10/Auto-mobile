import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VideoSection } from './components/VideoSection';
import { Features } from './components/Features';
import { ParkingFinderDemo } from './components/ParkingFinderDemo';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Download } from './components/Download';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AuthPage } from './pages/AuthPage';
import { UserProfile } from './types';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth'>(() => {
    return window.location.hash === '#auth' || window.location.hash === '#login' ? 'auth' : 'home';
  });

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('auto_mobile_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Listen to hash changes for browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#auth' || window.location.hash === '#login') {
        setCurrentPage('auth');
        window.scrollTo(0, 0);
      } else if (currentPage === 'auth') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const navigateToAuth = () => {
    window.location.hash = '#auth';
    setCurrentPage('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('auto_mobile_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('auto_mobile_user');
    } catch {
      // ignore
    }
  };

  const handleScrollToFinder = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById('finder');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('finder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on the separate Auth Page, render only the standalone AuthPage
  if (currentPage === 'auth') {
    return (
      <AuthPage
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onBackToHome={navigateToHome}
        onGoToFinder={handleScrollToFinder}
      />
    );
  }

  // Otherwise render the Main Landing Page
  return (
    <div className="app-root">
      <ScrollProgressBar />
      <Navbar
        currentUser={currentUser}
        onOpenBookingDemo={handleScrollToFinder}
        onOpenAuth={navigateToAuth}
      />
      <Hero
        onExploreSpots={handleScrollToFinder}
        onWatchVideo={() => setIsVideoModalOpen(true)}
      />
      <About />
      <VideoSection
        isOpenExternal={isVideoModalOpen}
        onCloseExternal={() => setIsVideoModalOpen(false)}
      />
      <Features />
      <ParkingFinderDemo userPlate={currentUser?.vehiclePlate} />
      <Team />
      <Contact />
      <Download />
      <Footer onOpenAuth={navigateToAuth} />
      <ScrollToTop />
    </div>
  );
};

export default App;
