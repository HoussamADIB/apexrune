// Animate numbers counting up
export function animateValue(element, start, end, duration, suffix = '') {
  if (!element) return;
  
  const startTime = performance.now();
  const range = end - start;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (range * easeOutQuart));
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

// Animate percentage
export function animatePercentage(element, start, end, duration) {
  if (!element) return;
  
  const startTime = performance.now();
  const range = end - start;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (range * easeOutQuart);
    
    element.textContent = current.toFixed(1) + '%';
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end.toFixed(1) + '%';
    }
  }
  
  requestAnimationFrame(update);
}

// Animate score (like 98/100)
export function animateScore(element, startScore, endScore, maxScore, duration) {
  if (!element) return;
  
  const startTime = performance.now();
  const range = endScore - startScore;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(startScore + (range * easeOutQuart));
    
    element.textContent = current + '/' + maxScore;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = endScore + '/' + maxScore;
    }
  }
  
  requestAnimationFrame(update);
}

// Initialize dashboard animations
export function initDashboardAnimations() {
  // Wait for dashboard to be visible
  const dashboard = document.querySelector('.system-overview-card');
  if (!dashboard) return;

  // Use Intersection Observer to trigger animation when dashboard is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimations();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(dashboard);
}

function startAnimations() {
  // Animate performance score: 60 -> 98
  const performanceScore = document.querySelector('.performance-score');
  if (performanceScore) {
    setTimeout(() => {
      animateScore(performanceScore, 60, 98, 100, 2500);
    }, 300);
  }

  // Animate health status
  const healthValue = document.querySelector('.health-card .metric-value');
  if (healthValue) {
    setTimeout(() => {
      const statuses = ['Poor', 'Fair', 'Good', 'Excellent'];
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < statuses.length - 1) {
          currentIndex++;
          healthValue.textContent = statuses[currentIndex];
          healthValue.style.opacity = '0';
          setTimeout(() => {
            healthValue.style.transition = 'opacity 0.3s';
            healthValue.style.opacity = '1';
          }, 50);
        } else {
          clearInterval(interval);
        }
      }, 600);
    }, 800);
  }

  // Animate data quality: 85.0% -> 99.9%
  const dataQuality = document.querySelector('.data-card .metric-value');
  if (dataQuality) {
    setTimeout(() => {
      animatePercentage(dataQuality, 85.0, 99.9, 2500);
    }, 1000);
  }

  // Animate speed badge
  const speedBadge = document.querySelector('.speed-badge span');
  if (speedBadge) {
    setTimeout(() => {
      const startTime = performance.now();
      const duration = 2000;
      const start = 0;
      const end = 24;
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + ((end - start) * easeOutQuart));
        speedBadge.textContent = '+' + current + '% Speed';
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          speedBadge.textContent = '+24% Speed';
        }
      }
      
      requestAnimationFrame(update);
    }, 500);
  }

  // Animate optimization items appearing
  const optimizationItems = document.querySelectorAll('.optimization-item');
  optimizationItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 50);
    }, 1800 + (index * 250));
  });

  // Animate performance card background gradient
  const performanceCard = document.querySelector('.org-performance-card');
  if (performanceCard) {
    performanceCard.style.opacity = '0.7';
    performanceCard.style.transform = 'scale(0.95)';
    performanceCard.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    
    setTimeout(() => {
      performanceCard.style.opacity = '1';
      performanceCard.style.transform = 'scale(1)';
    }, 200);
  }

  // Animate metric cards
  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    }, 400 + (index * 150));
  });
}

