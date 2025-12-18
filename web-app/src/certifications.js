// Certification badges data
export const certifications = [
  {
    name: 'Platform Developer I',
    image: '/certifications/salesforce-certified-Platform-Developer-I-salesforce-agentur-SUNZINET.png',
  },
  {
    name: 'AI Associate',
    image: '/certifications/AI Associate - Salesforce Agency SUNZINET.png',
  },
  {
    name: 'AI Specialist',
    image: '/certifications/Salesforce AI specialist - Salesforce Agentur SUNZINET.png',
  },
  {
    name: 'Technical Architect',
    image: '/certifications/Salesforce Certified Technical Architect-PhotoRoom.png-PhotoRoom.png',
  },
  {
    name: 'Platform Developer II',
    image: '/certifications/Salesforce-Platform-Developer-II-expert-salesforce agentur SUNZINET.png',
  },
  {
    name: 'Sales Cloud Consultant',
    image: '/certifications/Sales-Cloud-Consultant-1.png',
  },
  {
    name: 'Service Cloud Consultant',
    image: '/certifications/Salesforce-Certified-Service-Cloud-Consultant-Badge.png',
  },
  {
    name: 'Platform App Builder',
    image: '/certifications/Salesforce-certified-Platform-App-Builder.png',
  },
  {
    name: 'Administrator',
    image: '/certifications/salesforce-certified-administratorAdministrator.png',
  }
];

// Modern infinite carousel with gentle auto-slide and manual controls
export function initCertificationsCarousel() {
  const carousel = document.querySelector('.certifications-carousel');
  const track = document.querySelector('.certifications-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (!carousel || !track) return;

  const originalBadges = Array.from(track.querySelectorAll('.certification-badge'));
  const totalOriginal = originalBadges.length;
  
  if (totalOriginal === 0) return;

  // Clone badges for infinite effect (prepend and append clones)
  originalBadges.forEach(badge => {
    const cloneEnd = badge.cloneNode(true);
    cloneEnd.setAttribute('aria-hidden', 'true');
    track.appendChild(cloneEnd);
  });
  
  originalBadges.forEach(badge => {
    const cloneStart = badge.cloneNode(true);
    cloneStart.setAttribute('aria-hidden', 'true');
    track.insertBefore(cloneStart, track.firstChild);
  });

  let currentIndex = totalOriginal; // Start at first original badge
  let isTransitioning = false;
  let autoSlideTimer = null;
  let isPaused = false;

  // Get badge width including gap
  function getBadgeWidth() {
    const badge = track.querySelector('.certification-badge');
    if (!badge) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return badge.offsetWidth + gap;
  }

  // Update carousel position
  function updatePosition(animate = true) {
    const badgeWidth = getBadgeWidth();
    const offset = currentIndex * badgeWidth;
    
    track.style.transition = animate ? 'transform 0.5s ease-out' : 'none';
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Handle infinite loop reset
  function handleTransitionEnd() {
    isTransitioning = false;
    
    // Reset to original set if we've gone past the clones
    if (currentIndex >= totalOriginal * 2) {
      currentIndex = totalOriginal;
      updatePosition(false);
    } else if (currentIndex < totalOriginal) {
      currentIndex = totalOriginal * 2 - (totalOriginal - currentIndex);
      updatePosition(false);
    }
  }

  track.addEventListener('transitionend', handleTransitionEnd);

  // Go to next slide
  function next() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  }

  // Go to previous slide
  function prev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  }

  // Start auto-slide (gentle, every 4 seconds)
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        next();
      }
    }, 4000);
  }

  // Stop auto-slide
  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Button click handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      startAutoSlide(); // Reset timer
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      startAutoSlide(); // Reset timer
    });
  }

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updatePosition(false);
    }, 150);
  });

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Initialize - set starting position without animation
  updatePosition(false);
  startAutoSlide();
}

// Generate Salesforce cloud icon SVG (legacy fallback)
export function getSalesforceCloudIcon(color) {
  return `
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 12c0 3.3-2.7 6-6 6H8c-4.4 0-8-3.6-8-8s3.6-8 8-8c1.1 0 2.2.2 3.2.7C12.6 1.1 14.7 0 17 0c3.9 0 7.1 2.8 7.8 6.5.1 0 .2 0 .2 0 2.8 0 5 2.2 5 5s-2.2 5-5 5h-1" fill="${color}"/>
    </svg>
  `;
}
