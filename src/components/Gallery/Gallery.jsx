import { useState, useEffect, useCallback } from "react";
import galleryData from "./galleryData";
import "./Gallery.css";

function Gallery() {
  const [showGrid, setShowGrid] = useState(false); // overlay grid visibility
  const [showFullscreen, setShowFullscreen] = useState(false); // fullscreen visibility
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Disable body scroll when grid or fullscreen is open
  useEffect(() => {
    if (showGrid || showFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showGrid, showFullscreen]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!showGrid && !showFullscreen && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showGrid, showFullscreen, isAutoPlaying]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryData.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showFullscreen) {
          setShowFullscreen(false);
        } else if (showGrid) {
          setShowGrid(false);
        }
      } else if (showFullscreen) {
        if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "ArrowLeft") {
          goToPrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGrid, showFullscreen, goToNext, goToPrev]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  const handleSlideshowClick = () => {
    setIsAutoPlaying(false);
    setShowGrid(true);
  };

  const handleGridItemClick = (index) => {
    setCurrentIndex(index);
    setShowFullscreen(true);
  };

  const handleGridOverlayClick = (e) => {
    if (e.target.classList.contains('grid-overlay')) {
      setShowGrid(false);
    }
  };

  const handleFullscreenOverlayClick = (e) => {
    if (e.target.classList.contains('fullscreen-overlay')) {
      setShowFullscreen(false);
    }
  };

  return (
    <section className="gallery">
      <h2 className="section-title">Ambijent</h2>

      {/* Slideshow View */}
      <div className="slideshow-container" onClick={handleSlideshowClick}>
        <div className="slideshow-wrapper">
          <img
            src={galleryData[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            className="slideshow-image"
          />
          <div className="slideshow-overlay">
            <p>Click to view gallery</p>
          </div>
          <div className="slideshow-indicators">
            {galleryData.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="grid-overlay" onClick={handleGridOverlayClick}>
          <button className="grid-close-btn" onClick={() => setShowGrid(false)}>
            ✕
          </button>
          <div className="grid-container">
            <div className="gallery-grid">
              {galleryData.map((img, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => handleGridItemClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen View */}
      {showFullscreen && (
        <div
          className="fullscreen-overlay"
          onClick={handleFullscreenOverlayClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button 
            className="fullscreen-close-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setShowFullscreen(false);
            }}
          >
            ✕
          </button>
          
          <button 
            className="nav-btn prev-btn" 
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            ‹
          </button>
          
          <div 
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryData[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="fullscreen-image"
            />
            <div className="fullscreen-counter">
              {currentIndex + 1} / {galleryData.length}
            </div>
          </div>
          
          <button 
            className="nav-btn next-btn" 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
