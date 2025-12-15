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
          
          <div class="service-detail-content">
            <div class="service-detail-icon">
              ${service.icon}
            </div>
            <h1 class="service-detail-title">${service.title}</h1>
            <p class="service-detail-description">${service.description}</p>
            
            <div class="service-features-grid">
              ${service.features.map(feature => `
                <div class="service-feature-card">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>${feature}</span>
                </div>
              `).join('')}
            </div>

            <div class="service-cta-section">
              <h2>Ready to Get Started?</h2>
              <p>Let's discuss how we can help transform your Salesforce platform.</p>
              <button class="cta-button">
                Schedule Your Free Consultation
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    `;

    // Add service detail page styles
    addServiceDetailStyles();
  });
}

function addServiceDetailStyles() {
  if (document.getElementById('service-detail-styles')) return;

  const style = document.createElement('style');
  style.id = 'service-detail-styles';
  style.textContent = `
    .service-detail-page {
      padding: 4rem 2rem;
      min-height: calc(100vh - 100px);
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

    .service-detail-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .service-detail-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .service-detail-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark-blue);
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .service-detail-description {
      font-size: 1.25rem;
      color: var(--text-light);
      line-height: 1.8;
      text-align: center;
      margin-bottom: 3rem;
    }

    .service-features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .service-feature-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: box-shadow 0.2s;
    }

    .service-feature-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .service-feature-card svg {
      flex-shrink: 0;
    }

    .service-feature-card span {
      font-size: 1rem;
      color: var(--text-dark);
      font-weight: 500;
    }

    .service-cta-section {
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border-radius: 16px;
      padding: 3rem;
      text-align: center;
    }

    .service-cta-section h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .service-cta-section p {
      font-size: 1.125rem;
      color: var(--text-light);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .service-detail-title {
        font-size: 2rem;
      }

      .service-features-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

