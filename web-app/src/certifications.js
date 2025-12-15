// Certification badges data
export const certifications = [
  {
    name: 'Platform Developer I',
    image: '/certifications/salesforce-certified-Platform-Developer-I-salesforce-agentur-SUNZINET.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
  },
  {
    name: 'AI Associate',
    image: '/certifications/AI Associate - Salesforce Agency SUNZINET.png',
    fallbackColor: '#3B82F6',
    shadowColor: '#60A5FA',
  },
  {
    name: 'AI Specialist',
    image: '/certifications/Salesforce AI specialist - Salesforce Agentur SUNZINET.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
  },
  {
    name: 'Technical Architect',
    image: '/certifications/Salesforce Certified Technical Architect-PhotoRoom.png-PhotoRoom.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#10B981',
  },
  {
    name: 'Platform Developer II',
    image: '/certifications/Salesforce-Platform-Developer-II-expert-salesforce agentur SUNZINET.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#10B981',
  },
  {
    name: 'Sales Cloud Consultant',
    image: '/certifications/Sales-Cloud-Consultant-1.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
  },
  {
    name: 'Service Cloud Consultant',
    image: '/certifications/Salesforce-Certified-Service-Cloud-Consultant-Badge.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
  },
  {
    name: 'Platform App Builder',
    image: '/certifications/Salesforce-certified-Platform-App-Builder.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
  },
  {
    name: 'Administrator',
    image: '/certifications/salesforce-certified-administratorAdministrator.png',
    fallbackColor: '#1E3A8A',
    shadowColor: '#3B82F6',
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
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.4 9.6C19.6 6.4 16.8 4 13.6 4C11.6 4 10 4.8 8.8 6C7.2 2.4 4 0 0.4 0C-2 0 -4 2 -4 4.4C-4 4.8 -3.6 5.2 -3.2 5.6C-4.4 6.8 -5.2 8.4 -5.2 10.4C-5.2 13.2 -2.8 15.6 0 15.6H20.4C23.2 15.6 25.6 13.2 25.6 10.4C25.6 7.6 23.2 5.2 20.4 5.2C20.4 5.2 20.4 9.6 20.4 9.6Z" fill="${color}"/>
    </svg>
  `;
}

