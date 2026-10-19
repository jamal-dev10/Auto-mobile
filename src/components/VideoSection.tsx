import React, { useState } from 'react';
import { Reveal } from './Reveal';

interface VideoSectionProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ isOpenExternal, onCloseExternal }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isModalOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const closeModal = () => {
    if (onCloseExternal) {
      onCloseExternal();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      <section className="video-section">
        <div className="video-overlay">
          <div className="container" style={{ textAlign: 'center' }}>
            <Reveal animation="fade-up" duration={700}>
              <h3>Watch App in Action</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px' }}>
                See how our parking sensor network and real-time app guide drivers into available spots effortlessly in less than 30 seconds.
              </p>
            </Reveal>

            <Reveal animation="zoom-in" delay={150} duration={800}>
              <button
                onClick={() => {
                  if (isOpenExternal !== undefined && onCloseExternal) {
                    // external control handled by parent
                  } else {
                    setInternalOpen(true);
                  }
                }}
                className="video-play-btn"
                aria-label="Play promotional video"
              >
                <i className="fa fa-play" style={{ marginLeft: '4px' }}></i>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {isModalOpen && (
        <div
          className="video-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="video-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="video-modal-close"
              aria-label="Close video"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="video-modal-aspect">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Ku52zNnft8k?autoplay=1&rel=0&showinfo=0"
                title="Auto-Mobile Parking App Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
