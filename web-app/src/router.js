// Simple router for handling page navigation
let updateMetaTags = null;
let iconsModule = null;

// Load icons module
import('./icons.js').then((module) => {
  iconsModule = module;
});

// Logo SVG component - matches home page logo
function getLogoHTML() {
  return `
    <div class="logo-square">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon">
        <defs>
          <filter id="logoShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Blue rounded square background with shadow -->
        <rect width="40" height="40" rx="8" fill="#1E40AF" filter="url(#logoShadow)"/>
        
        <!-- Modern automation icon: Connected workflow nodes -->
        <g stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Workflow nodes -->
          <circle cx="14" cy="14" r="3" fill="white"/>
          <circle cx="26" cy="14" r="3" fill="white"/>
          <circle cx="20" cy="26" r="3" fill="white"/>
          
          <!-- Connecting lines showing automation flow -->
          <path d="M17 14L23 14" stroke-width="2"/>
          <path d="M17.5 16.5L19 23.5" stroke-width="2"/>
          <path d="M22.5 16.5L21 23.5" stroke-width="2"/>
          
          <!-- Arrow indicating automation direction -->
          <path d="M24 14L26 14M25 13L26 14M25 15L26 14" stroke-width="2"/>
        </g>
      </svg>
    </div>
  `;
}

// Helper function to get footer HTML with Lucide icons
function getFooterHTML(getCommonIcon) {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              ${getLogoHTML()}
              <span class="logo-text">ApexRune</span>
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                ${getCommonIcon('linkedin', 24, 'currentColor')}
              </a>
              <a href="#" class="social-icon">
                ${getCommonIcon('mail', 24, 'currentColor')}
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Get In Touch</h4>
            <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
            <p class="footer-text">+1 (563) 123-4567</p>
            <p class="footer-text">contact@apexrune.com</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Our Services</h4>
            <ul class="footer-links">
              <li><a href="/service/custom-development">Custom Development</a></li>
              <li><a href="/service/system-integration">System Integration</a></li>
              <li><a href="/service/health-checks">Health Checks</a></li>
              <li><a href="/service/process-automation">Process Automation</a></li>
            </ul>
            <h4 class="footer-heading" style="margin-top: 2rem;">Latest Case Study</h4>
            <a href="/case-study/automating-onboarding" class="latest-post">
              <div class="post-image"></div>
              <div class="post-content">
                <p class="post-title">SAMPLECORP: Automating Onboarding</p>
                <p class="post-date">Jan 15, 2025</p>
              </div>
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 ApexRune. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Load SEO functions
import('./seo.js').then((module) => {
  updateMetaTags = module.updateMetaTags;
  // Update meta tags on initial load
  if (updateMetaTags) {
    updateMetaTags(window.location.pathname || '/');
  }
});

export function initRouter() {
  // Handle initial load
  handleRoute();

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    handleRoute();
    if (updateMetaTags) {
      updateMetaTags(window.location.pathname || '/');
    }
  });

  // Handle link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (link && !link.hasAttribute('target') && !link.hasAttribute('download')) {
      const href = link.getAttribute('href');
      // Only handle internal links (not external URLs)
      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        handleRoute();
        if (updateMetaTags) {
          updateMetaTags(href);
        }
      }
    }
    
    // Also handle back-link clicks specifically
    const backLink = e.target.closest('.back-link, .back-to-home');
    if (backLink && backLink.hasAttribute('href')) {
      const href = backLink.getAttribute('href');
      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        handleRoute();
        if (updateMetaTags) {
          updateMetaTags(href);
        }
      }
    }
  });
}

// Export handleRoute for use in other modules
window.handleRoute = handleRoute;

function handleRoute() {
  const path = window.location.pathname || '/';
  const app = document.querySelector('#app');

  if (path === '/' || path === '') {
    // Always reload to show home page when navigating to home
    // Check if we're coming from another page
    const isOnOtherPage = app.innerHTML.includes('service-detail-page') || 
                         app.innerHTML.includes('legal-page') || 
                         app.innerHTML.includes('our-services-page') || 
                         app.innerHTML.includes('contact-page') || 
                         app.innerHTML.includes('case-studies-page') ||
                         app.innerHTML.includes('case-study-detail-page');
    
    if (isOnOtherPage) {
      // Reload to show home page and scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.location.href = '/';
    }
    // If already on home page, do nothing
    return;
  } else if (path.startsWith('/service/')) {
    // Load service detail page
    const serviceKey = path.split('/service/')[1];
    loadServicePage(serviceKey);
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/privacy-policy') {
    loadPrivacyPolicyPage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/terms-of-service') {
    loadTermsOfServicePage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/services' || path === '/our-services') {
    loadOurServicesPage();
    if (updateMetaTags) updateMetaTags('/services');
  } else if (path === '/contact') {
    loadContactPage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/case-studies') {
    loadCaseStudiesPage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path.startsWith('/case-study/')) {
    const caseStudyId = path.split('/case-study/')[1];
    loadCaseStudyDetailPage(caseStudyId);
    if (updateMetaTags) updateMetaTags(path);
  } else {
    // 404 - redirect to home
    window.history.replaceState({}, '', '/');
    handleRoute();
  }
}

function loadServicePage(serviceKey) {
  Promise.all([
    import('./services.js'),
    import('./icons.js')
  ]).then(([{ servicesData }, { getResultIcon, getServiceIcon, getCommonIcon }]) => {
    const service = servicesData[serviceKey];
    if (!service) {
      window.history.replaceState({}, '', '/');
      handleRoute();
      return;
    }

    const app = document.querySelector('#app');
    app.innerHTML = `
      <header class="header">
        <div class="header-content">
          <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
            ${getLogoHTML()}
            <span class="logo-text">ApexRune</span>
          </a>
          <nav class="nav">
            <a href="/" class="nav-link">HOME</a>
            <a href="/services" class="nav-link">OUR SERVICES</a>
            <a href="/case-studies" class="nav-link">CASE STUDIES</a>
            <a href="/contact" class="nav-link">CONTACT US</a>
          </nav>
        </div>
      </header>

      <main class="service-detail-page">
        <div class="container">
          <a href="/services" class="back-link">
            ${getCommonIcon('chevron-left', 20, 'currentColor')}
            Back to Services
          </a>
          
          <!-- Hero Section -->
          <div class="service-hero">
            <div class="service-hero-icon">
              ${getServiceIcon(serviceKey, 64, 'white')}
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
                      ${getCommonIcon('check', 24, '#10B981')}
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
                        ${getResultIcon(result.icon, 48, result.color)}
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
                <a href="/contact" class="sidebar-cta-button">
                  Discuss Your Project
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      ${getFooterHTML(getCommonIcon)}
    `;

    // Add service detail page styles
    addServiceDetailStyles();
    
    // Scroll to top after content is rendered so user sees the whole page from the beginning
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Re-initialize contact form for dynamically loaded pages (if needed)
    import('./contact-form.js').then(({ initContactForm }) => {
      initContactForm();
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
      text-decoration: none;
      display: block;
      text-align: center;
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

function loadOurServicesPage() {
  Promise.all([
    import('./services.js'),
    import('./icons.js')
  ]).then(([{ servicesData }, { getServiceCardIcon, getCommonIcon }]) => {
    const services = [
      servicesData['custom-development'],
      servicesData['system-integration'],
      servicesData['health-checks'],
      servicesData['process-automation']
    ];

    const app = document.querySelector('#app');
    app.innerHTML = `
      <header class="header">
        <div class="header-content">
          <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
            ${getLogoHTML()}
            <span class="logo-text">ApexRune</span>
          </a>
          <nav class="nav">
            <a href="/" class="nav-link">HOME</a>
            <a href="/services" class="nav-link">OUR SERVICES</a>
            <a href="/case-studies" class="nav-link">CASE STUDIES</a>
            <a href="/contact" class="nav-link">CONTACT US</a>
          </nav>
        </div>
      </header>

      <main class="our-services-page">
        <div class="container">
          <a href="/" class="back-link">
            ${getCommonIcon('chevron-left', 20, 'currentColor')}
            Back to Home
          </a>
          
          <div class="our-services-header">
            <h1 class="our-services-title">Our Services</h1>
            <p class="our-services-description">We provide specialized Salesforce solutions that drive tangible business outcomes.</p>
          </div>

          <div class="our-services-grid">
            ${services.map((service, index) => {
              const serviceKey = ['custom-development', 'system-integration', 'health-checks', 'process-automation'][index];
              const iconColors = {
                'custom-development': { bg: '#EFF6FF', icon: '#3B82F6' },
                'system-integration': { bg: '#F3E8FF', icon: '#8B5CF6' },
                'health-checks': { bg: '#ECFDF5', icon: '#10B981' },
                'process-automation': { bg: '#FEF3C7', icon: '#F59E0B' }
              };
              const colors = iconColors[serviceKey];
              
              return `
                <div class="our-service-card">
                  <div class="service-card-header">
                    <div class="service-icon-wrapper" style="background: ${colors.bg};">
                      ${getServiceCardIcon(serviceKey, 32)}
                    </div>
                    <span class="engagement-tag">${service.engagementTag || 'Project based'}</span>
                  </div>
                  <h3 class="service-card-title">${service.title}</h3>
                  <p class="service-card-description">${service.description}</p>
                  <ul class="service-features">
                    ${service.features.slice(0, 3).map(feature => `
                      <li>
                        ${getCommonIcon('check', 20, '#10B981')}
                        ${feature}
                      </li>
                    `).join('')}
                  </ul>
                  <a href="/service/${serviceKey}" class="service-cta-button">Discuss Your Project</a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </main>

      ${getFooterHTML(getCommonIcon)}
    `;

    addOurServicesPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function loadPrivacyPolicyPage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    <header class="header">
      <div class="header-content">
        <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
          <div class="logo-square">
            <span class="logo-letter">A</span>
          </div>
          <span class="logo-text">ApexRune</span>
        </a>
        <nav class="nav">
          <a href="/" class="nav-link">HOME</a>
          <a href="/services" class="nav-link">OUR SERVICES</a>
          <a href="/" class="nav-link">WHY US</a>
          <a href="/contact" class="nav-link">CONTACT US</a>
        </nav>
      </div>
    </header>

    <main class="legal-page">
      <div class="container">
        <a href="/" class="back-link">
          ${getCommonIcon('chevron-left', 20, 'currentColor')}
          Back to Home
        </a>
        
        <div class="legal-content">
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-last-updated">Last Updated: January 2025</p>
          
          <section class="legal-section">
            <h2>1. Introduction</h2>
            <p>Welcome to ApexRune ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our Salesforce consulting services.</p>
          </section>

          <section class="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out contact forms or request consultations</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Communicate with us via email or other channels</li>
              <li>Engage with our services</li>
            </ul>
            <p>This information may include your name, email address, phone number, company name, and any other information you choose to provide.</p>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of your visit</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section class="legal-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
          </section>

          <section class="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section class="legal-section">
            <h2>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section class="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.</p>
          </section>

          <section class="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          </section>

          <section class="legal-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
              <li>Phone: +1 (563) 123-4567</li>
              <li>Address: 123 Tech Boulevard, Innovation City, ST 84000</li>
            </ul>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              ${getLogoHTML()}
              <span class="logo-text">ApexRune</span>
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Get In Touch</h4>
            <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
            <p class="footer-text">+1 (563) 123-4567</p>
            <p class="footer-text">contact@apexrune.com</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">IT Services</h4>
            <ul class="footer-links">
              <li><a href="#">Salesforce Quick Start</a></li>
              <li><a href="#">Platform Integration</a></li>
              <li><a href="#">Custom Automation</a></li>
              <li><a href="#">Org Health Check</a></li>
              <li><a href="#">Custom Solutions</a></li>
            </ul>
            <h4 class="footer-heading" style="margin-top: 2rem;">Latest Post</h4>
            <div class="latest-post">
              <div class="post-image"></div>
              <div class="post-content">
                <p class="post-title">Will AI Replace The Salesforce Admin?</p>
                <p class="post-date">Oct 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 ApexRune. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function loadTermsOfServicePage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    <header class="header">
      <div class="header-content">
        <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
          <div class="logo-square">
            <span class="logo-letter">A</span>
          </div>
          <span class="logo-text">ApexRune</span>
        </a>
        <nav class="nav">
          <a href="/" class="nav-link">HOME</a>
          <a href="/services" class="nav-link">OUR SERVICES</a>
          <a href="/" class="nav-link">WHY US</a>
          <a href="/contact" class="nav-link">CONTACT US</a>
        </nav>
      </div>
    </header>

    <main class="legal-page">
      <div class="container">
        <a href="/" class="back-link">
          ${getCommonIcon('chevron-left', 20, 'currentColor')}
          Back to Home
        </a>
        
        <div class="legal-content">
          <h1 class="legal-title">Terms of Service</h1>
          <p class="legal-last-updated">Last Updated: January 2025</p>
          
          <section class="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the ApexRune website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.</p>
          </section>

          <section class="legal-section">
            <h2>2. Description of Services</h2>
            <p>ApexRune provides Salesforce consulting, development, and optimization services. Our services include but are not limited to:</p>
            <ul>
              <li>Custom Salesforce development</li>
              <li>System integration services</li>
              <li>Health checks and optimization</li>
              <li>Process automation</li>
              <li>Training and consultation</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Use of Services</h2>
            <h3>3.1 Eligibility</h3>
            <p>You must be at least 18 years old and have the legal capacity to enter into contracts to use our services.</p>

            <h3>3.2 User Responsibilities</h3>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Intellectual Property</h2>
            <p>All content, features, and functionality of our website and services, including but not limited to text, graphics, logos, and software, are the exclusive property of ApexRune and are protected by copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section class="legal-section">
            <h2>5. Service Agreements</h2>
            <p>Specific service engagements will be governed by separate service agreements or statements of work that will detail the scope, deliverables, timelines, and payment terms for each project.</p>
          </section>

          <section class="legal-section">
            <h2>6. Payment Terms</h2>
            <p>Payment terms will be specified in individual service agreements. Generally:</p>
            <ul>
              <li>Invoices are due within 30 days of receipt unless otherwise specified</li>
              <li>Late payments may incur interest charges</li>
              <li>We reserve the right to suspend services for non-payment</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>7. Confidentiality</h2>
            <p>We understand the sensitive nature of your business information. We agree to maintain the confidentiality of all proprietary information disclosed to us in the course of providing services, subject to applicable legal requirements.</p>
          </section>

          <section class="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ApexRune shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.</p>
          </section>

          <section class="legal-section">
            <h2>9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless ApexRune, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these Terms of Service.</p>
          </section>

          <section class="legal-section">
            <h2>10. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms of Service or for any other reason we deem necessary.</p>
          </section>

          <section class="legal-section">
            <h2>11. Disclaimers</h2>
            <p>Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
          </section>

          <section class="legal-section">
            <h2>12. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ApexRune operates, without regard to its conflict of law provisions.</p>
          </section>

          <section class="legal-section">
            <h2>13. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the updated terms on our website and updating the "Last Updated" date.</p>
          </section>

          <section class="legal-section">
            <h2>14. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
              <li>Phone: +1 (563) 123-4567</li>
              <li>Address: 123 Tech Boulevard, Innovation City, ST 84000</li>
            </ul>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              ${getLogoHTML()}
              <span class="logo-text">ApexRune</span>
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Get In Touch</h4>
            <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
            <p class="footer-text">+1 (563) 123-4567</p>
            <p class="footer-text">contact@apexrune.com</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">IT Services</h4>
            <ul class="footer-links">
              <li><a href="#">Salesforce Quick Start</a></li>
              <li><a href="#">Platform Integration</a></li>
              <li><a href="#">Custom Automation</a></li>
              <li><a href="#">Org Health Check</a></li>
              <li><a href="#">Custom Solutions</a></li>
            </ul>
            <h4 class="footer-heading" style="margin-top: 2rem;">Latest Post</h4>
            <div class="latest-post">
              <div class="post-image"></div>
              <div class="post-content">
                <p class="post-title">Will AI Replace The Salesforce Admin?</p>
                <p class="post-date">Oct 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 ApexRune. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function loadContactPage() {
  Promise.all([
    import('./contact-form.js'),
    import('./icons.js')
  ]).then(([{ getContactFormHTML }, { getCommonIcon }]) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
      <header class="header">
        <div class="header-content">
          <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
            ${getLogoHTML()}
            <span class="logo-text">ApexRune</span>
          </a>
          <nav class="nav">
            <a href="/" class="nav-link">HOME</a>
            <a href="/services" class="nav-link">OUR SERVICES</a>
            <a href="/case-studies" class="nav-link">CASE STUDIES</a>
            <a href="/contact" class="nav-link">CONTACT US</a>
          </nav>
        </div>
      </header>

      <main class="contact-page">
        <div class="contact-page-container">
          <a href="/" class="back-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Home
          </a>
          
          <div class="contact-page-layout">
            <div class="contact-info-panel">
              <h1 class="contact-info-title">Let's Build Something Great Together.</h1>
              <p class="contact-info-description">Whether you have a specific project in mind or just want to explore what's possible, we're here to help.</p>
              
              <div class="contact-info-items">
                <div class="contact-info-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:contact@apexrune.com" class="contact-info-link">contact@apexrune.com</a>
                </div>
                
                <div class="contact-info-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <a href="/contact" class="contact-info-link underlined">Book a Free 30-Minute Discovery Call</a>
                </div>
              </div>
              
              <p class="contact-info-footer">We'll respond within one business day.</p>
            </div>
            
            <div class="contact-form-panel">
              ${getContactFormHTML()}
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-column">
              <div class="footer-logo">
                ${getLogoHTML()}
                <span class="logo-text">ApexRune</span>
              </div>
              <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
              <div class="social-icons">
                <a href="#" class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>
            <div class="footer-column">
              <h4 class="footer-heading">Get In Touch</h4>
              <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
              <p class="footer-text">+1 (563) 123-4567</p>
              <p class="footer-text">contact@apexrune.com</p>
            </div>
            <div class="footer-column">
              <h4 class="footer-heading">Our Services</h4>
              <ul class="footer-links">
                <li><a href="/service/custom-development">Custom Development</a></li>
                <li><a href="/service/system-integration">System Integration</a></li>
                <li><a href="/service/health-checks">Health Checks</a></li>
                <li><a href="/service/process-automation">Process Automation</a></li>
              </ul>
              <h4 class="footer-heading" style="margin-top: 2rem;">Latest Case Study</h4>
              <a href="/case-study/automating-onboarding" class="latest-post">
                <div class="post-image"></div>
                <div class="post-content">
                  <p class="post-title">SAMPLECORP: Automating Onboarding</p>
                  <p class="post-date">Jan 15, 2025</p>
                </div>
              </a>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2025 ApexRune. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    addContactPageStyles();
    initContactPageForm();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function loadCaseStudiesPage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    <header class="header">
      <div class="header-content">
        <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
          ${getLogoHTML()}
          <span class="logo-text">ApexRune</span>
        </a>
        <nav class="nav">
          <a href="/" class="nav-link">HOME</a>
          <a href="/services" class="nav-link">OUR SERVICES</a>
          <a href="/case-studies" class="nav-link">CASE STUDIES</a>
          <a href="/contact" class="nav-link">CONTACT US</a>
        </nav>
      </div>
    </header>

    <main class="case-studies-page">
      <div class="container">
        <a href="/" class="back-link">
          ${getCommonIcon('chevron-left', 20, 'currentColor')}
          Back to Home
        </a>
        
        <div class="case-studies-header">
          <h1 class="case-studies-title">Case Studies: The Proof</h1>
          <p class="case-studies-subtitle">Undeniable evidence that we deliver real-world results.</p>
        </div>

        <div class="case-studies-grid">
          <!-- Case Study 1: Platform Paralysis -->
          <a href="/case-study/platform-paralysis" class="case-study-card">
            <div class="case-study-image-wrapper">
              <div class="case-study-image" style="background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);"></div>
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">ENTERPRISE SERVICES (BE/LU)</div>
              <h3 class="case-study-title">Eliminating Platform Paralysis</h3>
              <p class="case-study-challenge">The Salesforce 'Account' object was overloaded with complex triggers causing CPU timeout errors and lost data. Core architecture optimization was needed.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>+23% Performance Gain</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>0 CPU Timeout Errors</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>100% Scalability Restored</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 2: UX/UI Modernization -->
          <a href="/case-study/ux-ui-modernization" class="case-study-card">
            <div class="case-study-image-wrapper">
              <div class="case-study-image" style="background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);"></div>
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">MEDICAL DEVICE MFG (DE)</div>
              <h3 class="case-study-title">UX/UI Modernization</h3>
              <p class="case-study-challenge">A critical sales process was trapped inside a complex, undocumented Flow that took days to debug.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>70% Maint. Time Cut</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>3x Faster Deployment</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>100% Better UX</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 3: Automating Onboarding -->
          <a href="/case-study/automating-onboarding" class="case-study-card">
            <div class="case-study-image-wrapper">
              <div class="case-study-image" style="background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);"></div>
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">SAMPLECORP (SAAS)</div>
              <h3 class="case-study-title">Automating Onboarding</h3>
              <p class="case-study-challenge">Manual processing was causing delays and reducing team productivity. The onboarding process needed automation to scale efficiently.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>+40% increase in team productivity</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Reduced onboarding time by 15 hours</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>100% user adoption</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 4: FinTech Sales Efficiency -->
          <a href="/case-study/fintech-sales-efficiency" class="case-study-card">
            <div class="case-study-image-wrapper">
              <div class="case-study-image" style="background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);"></div>
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">FINTECH CLIENT</div>
              <h3 class="case-study-title">FinTech Sales Efficiency</h3>
              <p class="case-study-challenge">Sales team was wasting hours on manual data entry, leading to lost leads and reporting delays. Real-time automation was needed.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Sales efficiency up 35% in 90 days</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Zero lost leads due to manual error</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Real-time reporting enabled</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 5: ERP Integration -->
          <a href="/case-study/erp-integration" class="case-study-card">
            <div class="case-study-image-wrapper">
              <div class="case-study-image" style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);"></div>
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">LOGISTICS CO</div>
              <h3 class="case-study-title">ERP Integration</h3>
              <p class="case-study-challenge">Disconnected inventory data was causing stock-outs and customer dissatisfaction. Seamless integration was critical for operations.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>99.9% data accuracy</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Eliminated double-entry completely</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Improved customer satisfaction scores</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              ${getLogoHTML()}
              <span class="logo-text">ApexRune</span>
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Get In Touch</h4>
            <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
            <p class="footer-text">+1 (563) 123-4567</p>
            <p class="footer-text">contact@apexrune.com</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Our Services</h4>
            <ul class="footer-links">
              <li><a href="/service/custom-development">Custom Development</a></li>
              <li><a href="/service/system-integration">System Integration</a></li>
              <li><a href="/service/health-checks">Health Checks</a></li>
              <li><a href="/service/process-automation">Process Automation</a></li>
            </ul>
            <h4 class="footer-heading" style="margin-top: 2rem;">Latest Post</h4>
            <div class="latest-post">
              <div class="post-image"></div>
              <div class="post-content">
                <p class="post-title">Will AI Replace The Salesforce Admin?</p>
                <p class="post-date">Oct 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 ApexRune. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

    addCaseStudiesPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function loadCaseStudyDetailPage(caseStudyId) {
  // Case study data - you can expand this later
  const caseStudies = {
    'automating-onboarding': {
      client: 'SAMPLECORP (SAAS)',
      title: 'Automating Onboarding',
      challenge: 'Manual processing was causing delays and reducing team productivity. The onboarding process needed automation to scale efficiently.',
      results: [
        '+40% increase in team productivity',
        'Reduced onboarding time by 15 hours',
        '100% user adoption'
      ],
      fullStory: 'This is where the full case study story will go. You can add detailed information about the project, the challenges faced, the solution implemented, and the results achieved.'
    },
    'fintech-sales-efficiency': {
      client: 'FINTECH CLIENT',
      title: 'FinTech Sales Efficiency',
      challenge: 'Sales team was wasting hours on manual data entry, leading to lost leads and reporting delays. Real-time automation was needed.',
      results: [
        'Sales efficiency up 35% in 90 days',
        'Zero lost leads due to manual error',
        'Real-time reporting enabled'
      ],
      fullStory: 'This is where the full case study story will go. You can add detailed information about the project, the challenges faced, the solution implemented, and the results achieved.'
    },
    'erp-integration': {
      client: 'LOGISTICS CO',
      title: 'ERP Integration',
      challenge: 'Disconnected inventory data was causing stock-outs and customer dissatisfaction. Seamless integration was critical for operations.',
      results: [
        '99.9% data accuracy',
        'Eliminated double-entry completely',
        'Improved customer satisfaction scores'
      ],
      fullStory: 'This is where the full case study story will go. You can add detailed information about the project, the challenges faced, the solution implemented, and the results achieved.'
    },
    'platform-paralysis': {
      client: 'Enterprise Services (BE/LU)',
      title: 'Eliminating Platform Paralysis: How We Optimized Core Architecture to Boost Speed by 23%',
      clientDescription: 'An International Enterprise Client (Belgium & Luxembourg Region) relying on Salesforce for high-volume account management.',
      challenge: 'The Salesforce \'Account\' object was overloaded with complex triggers and workflows, causing frequent "Apex CPU Time Limit Exceeded" exceptions. This led to lost data, operational drag, and an inability to scale. The platform was becoming a bottleneck rather than an enabler.',
      solution: 'We identified that the \'Account Trigger\' was suffering from years of technical debt. Our approach was systematic:',
      solutionSteps: [
        'Deep-Dive Profiling: We analyzed every trigger handler, workflow, and process builder firing on Account updates.',
        'Consolidation: Merged redundant logic and eliminated duplicate processing paths.',
        'Redesign: Rebuilt the trigger architecture using best practices, implementing bulkification and efficient SOQL queries.'
      ],
      results: [
        '+23% Performance Gain',
        '0 CPU Timeout Errors',
        '100% Scalability Restored'
      ],
      testimonial: 'The client\'s sales and operations teams no longer fear the \'Save\' button. The platform works silently and instantly in the background, allowing them to focus on revenue, not troubleshooting.',
      technicalDetails: 'We performed comprehensive profiling and refactoring of trigger handlers, implementing a clean architecture pattern that separates concerns and optimizes database operations.'
    },
    'ux-ui-modernization': {
      client: 'Medical Device Mfg (DE)',
      title: 'From "Spaghetti Logic" to a Seamless Sales Wizard',
      clientDescription: 'A leading Medical Device Manufacturer (Germany) with a complex portfolio comprising implants, equipment, and consumables.',
      challenge: 'Visual tools are great—until they aren\'t. The client\'s \'New Lead\' process had grown into a massive, unmanageable Salesforce Flow. What started as simple logic had mutated into a spiderweb of decision nodes, undocumented loops, and legacy Aura components. The cost of this complexity was paralyzing the IT team: \'What should take 2 hours was taking 2 days\'.',
      solution: 'We didn\'t just patch the Flow; we launched a complete modernization initiative. We replaced the monolithic backend process with a modular Lightning Web Component (LWC) Architecture.',
      solutionSteps: [
        '3-Step Progressive Disclosure: Broke the process into three intuitive stages: Product Interest, Fulfillment, and Review.',
        'Modern UI Patterns: Ditched standard dropdowns for visual \'Pill Selectors\' and \'Card Layouts\' for faster entry.',
        'Smart Validation: Real-time client-side validation prevents errors before the user even hits \'Save\'.'
      ],
      results: [
        '70% Maint. Time Cut',
        '3x Faster Deployment',
        '100% Better UX'
      ],
      testimonial: 'The Sales team now has a tool that feels like a modern consumer app, not a legacy database. The IT team has reclaimed their time, shifting focus from fixing old bugs to building new innovation.',
      technicalDetails: 'We moved away from the \'Spaghetti Flow\' model. We implemented a core LWC Wizard that handles step management, while separate child components handle the logic for each stage. We also standardized the codebase with JSDoc and ApexDoc.'
    }
  };

  const caseStudy = caseStudies[caseStudyId];
  if (!caseStudy) {
    window.history.pushState({}, '', '/case-studies');
    handleRoute();
    return;
  }

  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    <header class="header">
      <div class="header-content">
        <a href="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
          ${getLogoHTML()}
          <span class="logo-text">ApexRune</span>
        </a>
        <nav class="nav">
          <a href="/" class="nav-link">HOME</a>
          <a href="/services" class="nav-link">OUR SERVICES</a>
          <a href="/case-studies" class="nav-link">CASE STUDIES</a>
          <a href="/contact" class="nav-link">CONTACT US</a>
        </nav>
      </div>
    </header>

    <main class="case-study-detail-page">
      <div class="container">
        <a href="/case-studies" class="back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Case Studies
        </a>
        
        <article class="case-study-detail">
          <!-- Hero Section -->
          <div class="case-study-hero">
            <span class="case-study-tag">CASE STUDY</span>
            <h1 class="case-study-hero-title">${caseStudy.title}</h1>
            <div class="case-study-hero-client">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M4 17C4 14 6 12 10 12C14 12 16 14 16 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>${caseStudy.client}</span>
            </div>
          </div>

          <!-- Main Layout: Two Columns -->
          <div class="case-study-layout">
            <!-- Main Content Column -->
            <div class="case-study-main">
              ${caseStudy.clientDescription ? `
                <section class="case-study-content-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon user-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                        <path d="M6 20C6 16 8 14 12 14C16 14 18 16 18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">The Client</h2>
                  </div>
                  <p class="case-study-section-text">${caseStudy.clientDescription}</p>
                </section>
              ` : ''}

              <section class="case-study-content-section challenge-section">
                <div class="case-study-section-header">
                  <div class="case-study-section-icon challenge-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <h2 class="case-study-section-title">The Challenge</h2>
                </div>
                <p class="case-study-section-text">${caseStudy.challenge}</p>
              </section>

              <section class="case-study-content-section">
                <div class="case-study-section-header">
                  <div class="case-study-section-icon solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <h2 class="case-study-section-title">Our Solution</h2>
                </div>
                <p class="case-study-section-text">${caseStudy.solution || caseStudy.fullStory}</p>
                ${caseStudy.solutionSteps ? `
                  <ol class="case-study-solution-steps">
                    ${caseStudy.solutionSteps.map((step, index) => `
                      <li>
                        <span class="step-number">${index + 1}</span>
                        <span class="step-text">${step}</span>
                      </li>
                    `).join('')}
                  </ol>
                ` : ''}
              </section>

              <section class="case-study-content-section proof-section">
                <div class="case-study-section-header">
                  <div class="case-study-section-icon proof-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13L12 18L22 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 6H12M12 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2 class="case-study-section-title">The Proof: Undeniable Gains</h2>
                </div>
                <div class="case-study-results-grid">
                  ${caseStudy.results.map(result => `
                    <div class="case-study-result-box">
                      <span>${result}</span>
                    </div>
                  `).join('')}
                </div>
                ${caseStudy.testimonial ? `
                  <div class="case-study-testimonial">
                    <p>"${caseStudy.testimonial}"</p>
                  </div>
                ` : ''}
              </section>
            </div>

            <!-- Sidebar Column -->
            <aside class="case-study-sidebar">
              <div class="case-study-sidebar-card">
                <h3 class="sidebar-card-title">Technical Deep Dive</h3>
                <p class="sidebar-card-text">${caseStudy.technicalDetails || 'We performed comprehensive profiling and refactoring of trigger handlers, implementing a clean architecture pattern that separates concerns and optimizes database operations.'}</p>
                <ul class="sidebar-card-list">
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Architecture Review</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Apex Optimization</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Query Tuning</span>
                  </li>
                </ul>
              </div>

              <div class="case-study-sidebar-card cta-card">
                <h3 class="sidebar-card-title">Is your Salesforce hitting its limits?</h3>
                <p class="sidebar-card-text">Slow performance isn't just annoying; it costs you money.</p>
                <a href="/contact" class="sidebar-cta-button">Schedule Audit</a>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              ${getLogoHTML()}
              <span class="logo-text">ApexRune</span>
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Get In Touch</h4>
            <p class="footer-text">123 Tech Boulevard<br>Innovation City, ST 84000</p>
            <p class="footer-text">+1 (563) 123-4567</p>
            <p class="footer-text">contact@apexrune.com</p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Our Services</h4>
            <ul class="footer-links">
              <li><a href="/service/custom-development">Custom Development</a></li>
              <li><a href="/service/system-integration">System Integration</a></li>
              <li><a href="/service/health-checks">Health Checks</a></li>
              <li><a href="/service/process-automation">Process Automation</a></li>
            </ul>
            <h4 class="footer-heading" style="margin-top: 2rem;">Latest Post</h4>
            <div class="latest-post">
              <div class="post-image"></div>
              <div class="post-content">
                <p class="post-title">Will AI Replace The Salesforce Admin?</p>
                <p class="post-date">Oct 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 ApexRune. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

    addCaseStudyDetailPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function addCaseStudyDetailPageStyles() {
  if (document.getElementById('case-study-detail-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'case-study-detail-page-styles';
  style.textContent = `
    .case-study-detail-page {
      padding: 2rem 2rem 4rem;
      min-height: calc(100vh - 100px);
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
    }

    .case-study-detail-page .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0;
    }

    .case-study-detail-page .back-link {
      padding: 0 0 1.5rem 0;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      margin-bottom: 0;
      font-weight: 600;
    }

    .case-study-detail {
      max-width: 100%;
      margin: 0;
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Hero Section */
    .case-study-hero {
      background: var(--dark-blue);
      color: var(--white);
      padding: 4rem 2rem;
      margin-bottom: 0;
      border-radius: 16px 16px 0 0;
      position: relative;
    }

    .case-study-tag {
      display: inline-block;
      background: var(--bright-blue);
      color: var(--white);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-bottom: 1.5rem;
    }

    .case-study-hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--white);
      margin: 0 0 1.5rem 0;
      line-height: 1.2;
    }

    .case-study-hero-client {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
    }

    .case-study-hero-client svg {
      flex-shrink: 0;
    }

    /* Article Content Container */
    .case-study-detail article {
      padding: 0;
      margin-top: 0;
      background: var(--white);
    }

    /* Two Column Layout */
    .case-study-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 3rem;
      align-items: start;
      margin-top: 0;
      padding: 0 2rem 4rem;
    }

    .case-study-main {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Content Sections */
    .case-study-content-section {
      background: var(--white);
      border-radius: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .case-study-content-section:first-of-type {
      border-radius: 0;
    }

    .case-study-content-section:last-of-type {
      border-radius: 0 0 16px 16px;
    }

    .challenge-section {
      background: #FDF2F8;
      border-radius: 0;
      padding: 2rem;
    }

    .challenge-section .case-study-section-header {
      padding-left: 0;
      padding-right: 0;
    }

    .challenge-section .case-study-section-text {
      padding-left: 0;
      padding-right: 0;
    }

    .proof-section {
      background: var(--white);
    }

    .case-study-section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .case-study-section-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-icon {
      background: #EFF6FF;
      color: var(--bright-blue);
    }

    .challenge-icon {
      background: #FEE2E2;
      color: #EF4444;
    }

    .solution-icon {
      background: #EFF6FF;
      color: var(--bright-blue);
    }

    .proof-icon {
      background: #D1FAE5;
      color: var(--green);
    }

    .case-study-section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
    }

    .case-study-section-text {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.7;
      margin: 0;
    }

    /* Solution Steps */
    .case-study-solution-steps {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .case-study-solution-steps li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--bright-blue);
      color: var(--white);
      border-radius: 8px;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .step-text {
      flex: 1;
      font-size: 1rem;
      color: var(--text-dark);
      line-height: 1.6;
      padding-top: 0.25rem;
    }

    /* Results Grid */
    .case-study-results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .case-study-result-box {
      background: #D1FAE5;
      color: var(--green);
      padding: 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      text-align: center;
    }

    /* Testimonial */
    .case-study-testimonial {
      background: #EFF6FF;
      border-left: 4px solid var(--bright-blue);
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1.5rem;
    }

    .case-study-testimonial p {
      font-size: 1.125rem;
      color: var(--text-dark);
      line-height: 1.7;
      margin: 0;
      font-style: italic;
    }

    /* Sidebar */
    .case-study-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: sticky;
      top: 2rem;
    }

    .case-study-sidebar-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .sidebar-card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
    }

    .sidebar-card-text {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .sidebar-card-list {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .sidebar-card-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9375rem;
      color: var(--text-dark);
    }

    .sidebar-card-list svg {
      flex-shrink: 0;
    }

    .cta-card {
      background: var(--white);
      border: 2px solid var(--bright-blue);
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
      text-decoration: none;
      display: block;
      text-align: center;
      margin-top: 0.5rem;
    }

    .sidebar-cta-button:hover {
      background: var(--primary-blue);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .case-study-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .case-study-sidebar {
        position: static;
      }

      .case-study-results-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .case-study-detail-page {
        padding: 1.5rem 1rem 3rem;
      }

      .case-study-detail-page .back-link {
        padding: 0 0 1rem 0;
      }

      .case-study-layout {
        padding: 0 1.5rem 3rem;
      }

      .case-study-hero {
        padding: 2.5rem 1.5rem;
        border-radius: 12px 12px 0 0;
      }

      .case-study-detail {
        border-radius: 12px;
      }

      .case-study-hero-title {
        font-size: 1.75rem;
      }

      .case-study-content-section {
        padding: 1.5rem;
      }

      .case-study-section-title {
        font-size: 1.25rem;
      }

      .case-study-results-grid {
        grid-template-columns: 1fr;
      }

      .case-study-layout {
        gap: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function addCaseStudiesPageStyles() {
  if (document.getElementById('case-studies-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'case-studies-page-styles';
  style.textContent = `
    .case-studies-page {
      padding: 2rem 2rem 4rem;
      min-height: calc(100vh - 100px);
      background: var(--white);
    }

    .case-studies-header {
      text-align: center;
      margin-bottom: 4rem;
      margin-top: 2rem;
    }

    .case-studies-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .case-studies-subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .case-studies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .case-study-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 16px;
      overflow: hidden;
      transition: box-shadow 0.2s;
      text-decoration: none;
      color: inherit;
      display: block;
      cursor: pointer;
    }

    .case-study-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .case-study-image-wrapper {
      position: relative;
      width: 100%;
      height: 250px;
      overflow: hidden;
    }

    .case-study-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .case-study-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .case-study-card:hover .case-study-overlay {
      opacity: 1;
    }

    .read-full-story {
      color: var(--white);
      font-weight: 600;
      font-size: 1rem;
    }

    .case-study-content {
      padding: 2rem;
    }

    .case-study-client {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .case-study-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .case-study-challenge {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .case-study-results {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .case-study-result {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9375rem;
      color: var(--green);
      font-weight: 500;
    }

    .case-study-result svg {
      flex-shrink: 0;
    }


    @media (max-width: 1024px) {
      .case-studies-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .case-studies-page {
        padding: 1.5rem 1rem 3rem;
      }

      .case-studies-header {
        margin-bottom: 2rem;
        margin-top: 1rem;
      }

      .case-studies-title {
        font-size: 2rem;
      }

      .case-studies-subtitle {
        font-size: 1rem;
      }

      .case-studies-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .case-study-image-wrapper {
        height: 200px;
      }

      .case-study-content {
        padding: 1.5rem;
      }

      .case-study-title {
        font-size: 1.25rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function addContactPageStyles() {
  if (document.getElementById('contact-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'contact-page-styles';
  style.textContent = `
    .contact-page {
      min-height: calc(100vh - 100px);
      background: var(--white);
    }

    .contact-page-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .contact-page-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      min-height: calc(100vh - 200px);
      margin-top: 2rem;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .contact-info-panel {
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 50%, #1E3A8A 100%);
      padding: 4rem 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: var(--white);
      border-radius: 16px 0 0 16px;
    }

    .contact-info-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .contact-info-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      margin-bottom: 3rem;
    }

    .contact-info-items {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .contact-info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .contact-info-item svg {
      flex-shrink: 0;
      color: var(--white);
    }

    .contact-info-link {
      color: var(--white);
      font-size: 1rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .contact-info-link:hover {
      opacity: 0.8;
    }

    .contact-info-link.underlined {
      text-decoration: underline;
    }

    .contact-info-footer {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.8);
      margin-top: auto;
    }

    .contact-form-panel {
      background: var(--white);
      padding: 4rem 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 0 16px 16px 0;
    }

    .contact-page .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: opacity 0.2s;
    }

    .contact-page .back-link:hover {
      opacity: 0.8;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-dark);
    }

    .form-group input,
    .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #E5E7EB;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
      width: 100%;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--bright-blue);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 150px;
    }

    .contact-form-submit {
      background: var(--dark-blue);
      color: var(--white);
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
      width: 100%;
    }

    .contact-form-submit:hover:not(:disabled) {
      background: var(--primary-blue);
    }

    .contact-form-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-success,
    .form-error {
      text-align: center;
      padding: 3rem 2rem;
    }

    .form-success svg,
    .form-error svg {
      margin: 0 auto 1.5rem;
    }

    .form-success h3,
    .form-error h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
    }

    .form-success p,
    .form-error p {
      color: var(--text-light);
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      .contact-page-layout {
        grid-template-columns: 1fr;
      }

      .contact-info-panel {
        padding: 3rem 2rem;
        border-radius: 16px 16px 0 0;
      }

      .contact-form-panel {
        padding: 3rem 2rem;
        border-radius: 0 0 16px 16px;
      }
    }

    @media (max-width: 768px) {
      .contact-page-container {
        padding: 1.5rem 1rem;
      }

      .contact-page-layout {
        margin-top: 1rem;
      }

      .contact-info-panel {
        padding: 2rem 1.5rem;
      }

      .contact-form-panel {
        padding: 2rem 1.5rem;
      }

      .contact-info-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .contact-info-description {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .contact-info-items {
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .contact-info-item {
        flex-wrap: wrap;
      }

      .contact-info-link {
        font-size: 0.9375rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function initContactPageForm() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', handleContactPageFormSubmit);
  }
}

async function handleContactPageFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('.contact-form-submit');
  const formPanel = document.querySelector('.contact-form-panel');
  const originalHTML = formPanel.innerHTML;
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  try {
    const formData = new FormData(form);
    
    // Ensure form-name is set
    if (!formData.has('form-name')) {
      formData.set('form-name', 'contact');
    }
    
    // Submit to Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams(formData).toString()
    });
    
    // Netlify Forms returns 200 on successful AJAX submission
    // According to Netlify docs: "successful AJAX submissions return 200"
    if (response.ok) {
      // Success - show success message
      formPanel.innerHTML = `
        <div class="form-success">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#10B981" opacity="0.1"/>
            <path d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" fill="#10B981"/>
            <path d="M24 32L30 38L40 26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Thank you for your message!</h3>
          <p>We'll get back to you within one business day.</p>
          <a href="/" class="back-link" style="margin-top: 2rem; display: inline-block;">Back to Home</a>
        </div>
      `;
    } else {
      // Try to get error message from response
      const status = response.status;
      let errorMessage = `Form submission failed with status ${status}`;
      try {
        const responseText = await response.text();
        if (responseText) {
          console.error('Netlify form error response:', responseText);
          // Check if it's a validation error (422) or other error
          if (status === 422) {
            errorMessage = 'Please check your form fields and try again.';
          }
        }
      } catch (e) {
        console.error('Could not read error response:', e);
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error message
    formPanel.innerHTML = `
      <div class="form-error">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#EF4444" opacity="0.1"/>
          <circle cx="32" cy="32" r="30" stroke="#EF4444" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.01" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <h3>Something went wrong</h3>
        <p>Please try again or contact us directly at contact@apexrune.com</p>
        <button onclick="location.reload()" class="contact-form-submit" style="margin-top: 1.5rem;">Try Again</button>
      </div>
    `;
  }
}

function addOurServicesPageStyles() {
  if (document.getElementById('our-services-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'our-services-page-styles';
  style.textContent = `
    .our-services-page {
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

    .our-services-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .our-services-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .our-services-description {
      font-size: 1.125rem;
      color: var(--text-light);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .our-services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .our-service-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transition: box-shadow 0.2s;
    }

    .our-service-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .service-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .service-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .engagement-tag {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--bright-blue);
      background: #EFF6FF;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
    }

    .service-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
    }

    .service-card-description {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .service-features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9375rem;
      color: var(--text-dark);
    }

    .service-features svg {
      flex-shrink: 0;
    }

    @media (max-width: 1024px) {
      .our-services-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .our-services-page {
        padding: 1.5rem 1rem 3rem;
      }

      .our-services-title {
        font-size: 2rem;
      }

      .our-services-description {
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function addLegalPageStyles() {
  if (document.getElementById('legal-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'legal-page-styles';
  style.textContent = `
    .legal-page {
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

    .legal-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .legal-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
    }

    .legal-last-updated {
      font-size: 0.875rem;
      color: var(--text-light);
      margin-bottom: 3rem;
    }

    .legal-section {
      margin-bottom: 3rem;
    }

    .legal-section h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    .legal-section h2:first-of-type {
      margin-top: 0;
    }

    .legal-section h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .legal-section p {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .legal-section ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .legal-section li {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 0.5rem;
    }

    .legal-section strong {
      color: var(--text-dark);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .legal-page {
        padding: 1.5rem 1rem 3rem;
      }

      .legal-title {
        font-size: 2rem;
      }

      .legal-section h2 {
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);
}

