import { useState, useEffect, useCallback, useRef } from "react";
import galleryData from "../../data/galleryData";
import "./Gallery.css";

function Gallery() {
  const [showGrid, setShowGrid] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const savedScrollPosition = useRef(0);
  const pauseTimeoutRef = useRef(null);

  // Lock body scroll when ANY overlay is open
  // KEY FIX: track overlayOpen separately so body unlock only happens
  // when BOTH grid and fullscreen are closed, not on every state change.
  const overlayOpen = showGrid || showFullscreen;

  useEffect(() => {
    if (overlayOpen) {
      // Only save scroll position when transitioning from no-overlay to overlay
      savedScrollPosition.current = window.pageYOffset;

      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollPos = savedScrollPosition.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo({ top: scrollPos, behavior: "instant" });
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  // Resume autoplay when both overlays are closed
  useEffect(() => {
    if (!showGrid && !showFullscreen) {
      setIsAutoPlaying(true);
    }
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

  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    pauseAutoplay();
  }, [pauseAutoplay]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
    pauseAutoplay();
  }, [pauseAutoplay]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
    pauseAutoplay();
  }, [pauseAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showFullscreen) setShowFullscreen(false);
        else if (showGrid) setShowGrid(false);
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGrid, showFullscreen, goToNext, goToPrev]);

  // Reusable touch/swipe hook values
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;

    // Only handle horizontal swipes (ignore scrolling intent)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
      dx > 0 ? goToNext() : goToPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Handlers
  const handleSlideshowClick = (e) => {
    if (
      e.target.closest(".slideshow-nav-btn") ||
      e.target.closest(".slideshow-indicators")
    ) return;
    setShowGrid(true);
  };

  const handleSlideshowNext = (e) => { e.stopPropagation(); goToNext(); };
  const handleSlideshowPrev = (e) => { e.stopPropagation(); goToPrev(); };
  const handleIndicatorClick = (e, index) => { e.stopPropagation(); goToIndex(index); };

  const handleGridItemClick = (index) => {
    setCurrentIndex(index);
    setShowFullscreen(true);
  };

  const handleGridOverlayClick = (e) => {
    if (e.target.classList.contains("grid-overlay")) setShowGrid(false);
  };

  const handleFullscreenOverlayClick = (e) => {
    if (e.target.classList.contains("fullscreen-overlay")) setShowFullscreen(false);
  };

  const handleCloseFullscreen = (e) => {
    e.stopPropagation();
    setShowFullscreen(false);
  };

  const handleCloseGrid = () => {
    setShowFullscreen(false);
    setShowGrid(false);
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Naša Galerija</h2>

      {/* Slideshow View — swipe enabled */}
      <div
        className="slideshow-container"
        onClick={handleSlideshowClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="slideshow-wrapper">
          {galleryData.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
            />
          ))}

          <div className="slideshow-overlay">
            <p>Klikni za galeriju</p>
          </div>

          <button className="slideshow-nav-btn slideshow-prev" onClick={handleSlideshowPrev}>‹</button>
          <button className="slideshow-nav-btn slideshow-next" onClick={handleSlideshowNext}>›</button>
        </div>

        <div className="slideshow-indicators">
          {galleryData.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={(e) => handleIndicatorClick(e, index)}
            />
          ))}
        </div>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="grid-overlay" onClick={handleGridOverlayClick}>
          <button className="grid-close-btn" onClick={handleCloseGrid}>✕</button>
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
          onTouchEnd={onTouchEnd}
        >
          <button className="fullscreen-close-btn" onClick={handleCloseFullscreen}>✕</button>

          <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>‹</button>

          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryData[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="fullscreen-image"
            />
            <div className="fullscreen-counter">
              {currentIndex + 1} / {galleryData.length}
            </div>
          </div>

          <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); goToNext(); }}>›</button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
