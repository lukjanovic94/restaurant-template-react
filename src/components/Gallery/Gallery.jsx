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

  // Lock body scroll when grid or fullscreen is open
  useEffect(() => {
    if (showGrid) {
      // Save position only when grid first opens
      savedScrollPosition.current = window.pageYOffset;

      // Lock the body
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // Restore when grid closes (regardless of fullscreen state)
      const scrollPos = savedScrollPosition.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      // Restore scroll position immediately without smooth scroll
      window.scrollTo({ top: scrollPos, behavior: "instant" });
    }
  }, [showGrid]);

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

  // Function to pause autoplay for 1 seconds
  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    pauseAutoplay();
  }, [pauseAutoplay]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryData.length) % galleryData.length,
    );
    pauseAutoplay();
  }, [pauseAutoplay]);

  const goToIndex = useCallback(
    (index) => {
      setCurrentIndex(index);
      pauseAutoplay();
    },
    [pauseAutoplay],
  );

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
      } else if (!showGrid && !showFullscreen) {
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

  const handleSlideshowClick = (e) => {
    if (
      e.target.closest(".slideshow-nav-btn") ||
      e.target.closest(".slideshow-indicators")
    ) {
      return;
    }
    setShowGrid(true);
  };

  const handleSlideshowNext = (e) => {
    e.stopPropagation();
    goToNext();
  };

  const handleSlideshowPrev = (e) => {
    e.stopPropagation();
    goToPrev();
  };

  const handleIndicatorClick = (e, index) => {
    e.stopPropagation();
    goToIndex(index);
  };

  const handleGridItemClick = (index) => {
    setCurrentIndex(index);
    setShowFullscreen(true);
  };

  const handleGridOverlayClick = (e) => {
    if (e.target.classList.contains("grid-overlay")) {
      setShowGrid(false);
    }
  };

  const handleFullscreenOverlayClick = (e) => {
    if (e.target.classList.contains("fullscreen-overlay")) {
      setShowFullscreen(false);
    }
  };

  const handleCloseFullscreen = (e) => {
    e.stopPropagation();
    setShowFullscreen(false);
  };

  const handleCloseGrid = () => {
    // Close grid (which will also close fullscreen if open)
    setShowFullscreen(false);
    setShowGrid(false);
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Naša Galerija</h2>

      {/* Slideshow View */}
      <div className="slideshow-container" onClick={handleSlideshowClick}>
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
            <p>Click to view gallery</p>
          </div>

          <button
            className="slideshow-nav-btn slideshow-prev"
            onClick={handleSlideshowPrev}
          >
            ‹
          </button>
          <button
            className="slideshow-nav-btn slideshow-next"
            onClick={handleSlideshowNext}
          >
            ›
          </button>
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
          <button className="grid-close-btn" onClick={handleCloseGrid}>
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
            onClick={handleCloseFullscreen}
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
