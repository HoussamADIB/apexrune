// Simple router for handling page navigation
export function initRouter() {
  // Handle initial load
  handleRoute();

  // Handle browser back/forward
  window.addEventListener('popstate', handleRoute);

  // Handle link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.history.pushState({}, '', href);
      handleRoute();
    }
  });
}

function handleRoute() {
  const path = window.location.hash.slice(1) || '/';
  const app = document.querySelector('#app');

  if (path === '/' || path === '') {
    // If we're already on home page, don't reload
    if (!app.innerHTML.includes('service-detail-page')) {
      return; // Already on home page
    }
    // Otherwise reload to show home page
    window.location.href = window.location.pathname;
  } else if (path.startsWith('/service/')) {
    // Load service detail page
    const serviceKey = path.split('/service/')[1];
    loadServicePage(serviceKey);
  }
}

function loadServicePage(serviceKey) {
  import('./services.js').then(({ servicesData }) => {
    const service = servicesData[serviceKey];
    if (!service) {
      window.location.hash = '#/';
      return;
    }

    // Helper function to get result icon SVG
    function getResultIcon(iconType, color) {
      const icons = {
        lightning: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L18 20H28L20 44L30 28H20L24 4Z" fill="${color}"/>
        </svg>`,
        users: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="14" r="6" stroke="${color}" stroke-width="2" fill="none"/>
          <circle cx="32" cy="14" r="6" stroke="${color}" stroke-width="2" fill="none"/>
          <path d="M8 36C8 30 12 28 24 28C36 28 40 30 40 36" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        target: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="${color}" stroke-width="2" fill="none"/>
          <circle cx="24" cy="24" r="12" stroke="${color}" stroke-width="2" fill="none"/>
          <circle cx="24" cy="24" r="4" fill="${color}"/>
        </svg>`,
        rocket: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 8L20 16L12 20L20 24L24 32L28 24L36 20L28 16L24 8Z" fill="${color}"/>
          <path d="M24 32V40M20 36H28" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        shield: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L8 8V20C8 28 12 34 24 40C36 34 40 28 40 20V8L24 4Z" stroke="${color}" stroke-width="2" fill="none"/>
        </svg>`,
        link: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 18L30 30M30 18L18 30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <circle cx="20" cy="20" r="6" stroke="${color}" stroke-width="2" fill="none"/>
          <circle cx="28" cy="28" r="6" stroke="${color}" stroke-width="2" fill="none"/>
        </svg>`,
        sync: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 16L40 8L32 0M16 32L8 40L16 48" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 24C8 16 14 10 24 10M40 24C40 32 34 38 24 38" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        chart: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="28" width="8" height="12" fill="${color}"/>
          <rect x="20" y="20" width="8" height="20" fill="${color}"/>
          <rect x="32" y="12" width="8" height="28" fill="${color}"/>
        </svg>`,
        speed: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="${color}" stroke-width="2" fill="none"/>
          <path d="M24 6L28 18L36 20" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        check: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="${color}" stroke-width="2" fill="none"/>
          <path d="M18 24L22 28L30 20" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        clock: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" stroke="${color}" stroke-width="2" fill="none"/>
          <path d="M24 12V24L30 30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        accuracy: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 8L30 20L42 22L32 30L34 42L24 36L14 42L16 30L6 22L18 20L24 8Z" fill="${color}"/>
        </svg>`,
        scale: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24L24 12L36 24M12 36L24 24L36 36" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      };
      return icons[iconType] || icons.target;
    }

    const app = document.querySelector('#app');
    app.innerHTML = `
      <header class="header">
        <div class="header-content">
          <a href="#/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
            <div class="logo-square">
              <span class="logo-letter">A</span>
            </div>
            <span class="logo-text">ApexRune</span>
          </a>
          <nav class="nav">
            <a href="#/" class="nav-link">HOME</a>
            <a href="#/" class="nav-link">OUR SERVICES</a>
            <a href="#/" class="nav-link">WHY US</a>
            <a href="#/" class="nav-link">CONTACT US</a>
          </nav>
        </div>
      </header>

      <main class="service-detail-page">
        <div class="container">
          <a href="#/" class="back-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Services
          </a>
          
          <!-- Hero Section -->
          <div class="service-hero">
            <div class="service-hero-icon">
              ${service.icon}
            </div>
            <h1 class="service-hero-title">${service.title}</h1>
            <p class="service-hero-description">${service.description}</p>
          </div>

          <!-- Main Content Layout -->
          <div class="service-detail-layout">
            <!-- Left Column -->
            <div class="service-detail-main">
              <!-- Overview Section -->
              <section class="service-section">
                <h2 class="service-section-title">Overview</h2>
                <p class="service-section-text">${service.overview || service.description}</p>
              </section>

              <!-- What It Includes Section -->
              <section class="service-section">
                <h2 class="service-section-title">What It Includes</h2>
                <div class="service-features-grid">
                  ${service.features.map(feature => `
                    <div class="service-feature-card">
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>${feature}</span>
                    </div>
                  `).join('')}
                </div>
              </section>

              <!-- The Results Section -->
              ${service.results ? `
              <section class="service-section">
                <h2 class="service-section-title">The Results</h2>
                <div class="service-results-grid">
                  ${service.results.map(result => `
                    <div class="service-result-card">
                      <div class="result-icon-wrapper">
                        ${getResultIcon(result.icon, result.color)}
                      </div>
                      <h3 class="result-title">${result.title}</h3>
                    </div>
                  `).join('')}
                </div>
              </section>
              ` : ''}
            </div>

            <!-- Right Sidebar -->
            <aside class="service-sidebar">
              <div class="service-sidebar-card">
                <h2 class="sidebar-title">${service.ctaTitle || 'Ready to Start?'}</h2>
                <p class="sidebar-description">${service.ctaDescription || 'Let\'s discuss how we can help transform your Salesforce platform.'}</p>
                <button class="sidebar-cta-button">
                  Discuss Your Project
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    `;

    // Add service detail page styles
    addServiceDetailStyles();
    
    // Re-initialize contact form for dynamically loaded pages
    import('./contact-form.js').then(({ initContactForm, openContactModal }) => {
      initContactForm();
      
      // Add click handler to sidebar CTA button
      const sidebarButton = document.querySelector('.sidebar-cta-button');
      if (sidebarButton) {
        sidebarButton.addEventListener('click', (e) => {
          e.preventDefault();
          if (openContactModal) {
            openContactModal();
          }
        });
      }
    });
  });
}

function addServiceDetailStyles() {
  if (document.getElementById('service-detail-styles')) return;

  const style = document.createElement('style');
  style.id = 'service-detail-styles';
  style.textContent = `
    .service-detail-page {
      padding: 2rem 2rem 4rem;
      min-height: calc(100vh - 100px);
      background: var(--white);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: opacity 0.2s;
    }

    .back-link:hover {
      opacity: 0.8;
    }

    /* Hero Section */
    .service-hero {
      background: var(--dark-blue);
      border-radius: 16px;
      padding: 3rem;
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .service-hero-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .service-hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--white);
      margin: 0;
    }

    .service-hero-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      margin: 0;
    }

    /* Main Layout */
    .service-detail-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 3rem;
      align-items: start;
    }

    .service-detail-main {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    /* Sections */
    .service-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .service-section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
    }

    .service-section-text {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.7;
      margin: 0;
    }

    /* Features Grid */
    .service-features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .service-feature-card {
      background: #F3F4F6;
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: background 0.2s;
    }

    .service-feature-card:hover {
      background: #E5E7EB;
    }

    .service-feature-card svg {
      flex-shrink: 0;
    }

    .service-feature-card span {
      font-size: 0.9375rem;
      color: var(--text-dark);
      font-weight: 500;
    }

    /* Results Grid */
    .service-results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .service-result-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      transition: box-shadow 0.2s;
    }

    .service-result-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .result-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0;
    }

    /* Sidebar */
    .service-sidebar {
      position: sticky;
      top: 2rem;
    }

    .service-sidebar-card {
      background: #F3F4F6;
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .sidebar-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
    }

    .sidebar-description {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .sidebar-cta-button {
      background: var(--bright-blue);
      color: var(--white);
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
    }

    .sidebar-cta-button:hover {
      background: var(--primary-blue);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .service-detail-layout {
        grid-template-columns: 1fr;
      }

      .service-sidebar {
        position: static;
      }

      .service-results-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .service-detail-page {
        padding: 1.5rem 1rem 3rem;
      }

      .service-hero {
        padding: 2rem;
      }

      .service-hero-title {
        font-size: 2rem;
      }

      .service-features-grid {
        grid-template-columns: 1fr;
      }

      .service-results-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

