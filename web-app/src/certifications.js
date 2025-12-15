// Certification badges data
export const certifications = [
  {
    name: 'Platform Developer I',
    color: '#1E3A8A', // Dark blue
    shadowColor: '#3B82F6', // Light blue shadow
    iconColor: '#60A5FA' // Light blue cloud
  },
  {
    name: 'AI Associate',
    color: '#3B82F6', // Bright blue
    shadowColor: '#60A5FA', // Lighter blue shadow
    iconColor: '#FFFFFF' // White cloud
  },
  {
    name: 'AI Specialist',
    color: '#1E3A8A', // Dark blue
    shadowColor: '#3B82F6', // Light blue shadow
    iconColor: '#60A5FA' // Light blue cloud
  },
  {
    name: 'Technical Architect',
    color: '#1E3A8A', // Dark blue
    shadowColor: '#10B981', // Teal/green shadow
    iconColor: '#60A5FA' // Light blue cloud
  },
  {
    name: 'Integration Architect',
    color: '#1E3A8A', // Dark blue
    shadowColor: '#10B981', // Teal/green shadow
    iconColor: '#60A5FA' // Light blue cloud
  }
];

// Initialize certifications carousel
export function initCertificationsCarousel() {
  const carousel = document.querySelector('.certifications-carousel');
  const track = document.querySelector('.certifications-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (!carousel || !track) return;

  let currentIndex = 0;
  const badges = track.querySelectorAll('.certification-badge');
  const totalBadges = badges.length;
  const badgesPerView = getBadgesPerView();

  function getBadgesPerView() {
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 768) return 3;
    return 1;
  }

  function updateCarousel() {
    const offset = -currentIndex * (100 / badgesPerView);
    track.style.transform = `translateX(${offset}%)`;
    updateButtons();
  }

  function updateButtons() {
    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    }
    if (nextBtn) {
      const maxIndex = Math.max(0, totalBadges - badgesPerView);
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
  }

  function next() {
    const maxIndex = Math.max(0, totalBadges - badgesPerView);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', next);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prev);
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newBadgesPerView = getBadgesPerView();
      if (newBadgesPerView !== badgesPerView) {
        currentIndex = 0;
        updateCarousel();
      }
    }, 250);
  });

  // Initialize
  updateCarousel();

  // Auto-scroll (optional - can be removed if not needed)
  // setInterval(() => {
  //   const maxIndex = Math.max(0, totalBadges - badgesPerView);
  //   if (currentIndex < maxIndex) {
  //     next();
  //   } else {
  //     currentIndex = 0;
  //     updateCarousel();
  //   }
  // }, 5000);
}

// Generate Salesforce cloud icon SVG
export function getSalesforceCloudIcon(color) {
  return `
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.5 12C24.5 8 21 5 17 5C14.5 5 12.5 6 11 7.5C9 3 5 0 0.5 0C-2.5 0 -5 2.5 -5 5.5C-5 6 -4.5 6.5 -4 7C-5.5 8.5 -6.5 10.5 -6.5 13C-6.5 16.5 -3.5 19.5 0 19.5H25.5C29 19.5 32 16.5 32 13C32 9.5 29 6.5 25.5 6.5C25.5 6.5 25.5 12 25.5 12Z" fill="${color}" transform="translate(5, 5)"/>
    </svg>
  `;
}

