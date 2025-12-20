import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

// This will be set by the router core
let handleRoute = null;
export function setHandleRoute(handler) {
  handleRoute = handler;
}

export function loadServicePage(serviceKey) {
  Promise.all([
    import('../../services.js'),
    import('../../icons.js')
  ]).then(([{ servicesData }, { getResultIcon, getServiceIcon, getCommonIcon }]) => {
    const service = servicesData[serviceKey];
    if (!service) {
      window.history.replaceState({}, '', '/');
      if (handleRoute) handleRoute();
      return;
    }

    // Get features - either detailed or simple
    const features = service.featuresDetailed || service.features?.map(f => ({ title: f, description: '' })) || [];
    
    // Format overview text with proper paragraphs
    const formatOverview = (text) => {
      if (!text) return '';
      return text.split('\n\n').map(p => `<p class="service-section-text">${p.trim()}</p>`).join('');
    };

    const app = document.querySelector('#app');
    app.innerHTML = `
      ${getHeaderHTML(getCommonIcon)}

      <main class="service-detail-page">
        <div class="container">
          <!-- Hero Section -->
          <div class="service-hero">
            <div class="service-hero-content">
            <div class="service-hero-icon">
                ${getServiceIcon(serviceKey, 56, 'white')}
            </div>
              <div class="service-hero-text">
                ${service.subtitle ? `<p class="service-hero-subtitle">${service.subtitle}</p>` : ''}
            <h1 class="service-hero-title">${service.title}</h1>
            <p class="service-hero-description">${service.description}</p>
                ${service.engagementTag ? `<span class="service-hero-tag">${service.engagementTag}</span>` : ''}
              </div>
            </div>
            <div class="service-hero-cta">
              <a href="/contact?service=${serviceKey}" class="service-hero-button">
                Get Started
                ${getCommonIcon('arrow-right', 18, 'currentColor')}
              </a>
            </div>
          </div>

          <!-- Main Content Layout -->
          <div class="service-detail-layout">
            <!-- Left Column -->
            <div class="service-detail-main">
              <!-- Overview Section -->
              <section class="service-section overview-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('info', 24, 'var(--bright-blue)')}
                  Overview
                </h2>
                <div class="service-overview-content">
                  ${formatOverview(service.overview || service.description)}
                </div>
              </section>

              <!-- What's Included Section -->
              <section class="service-section features-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('check-circle', 24, 'var(--bright-blue)')}
                  What's Included
                </h2>
                <div class="service-features-detailed">
                  ${features.map(feature => `
                    <div class="service-feature-detailed">
                      <div class="feature-header">
                        ${getCommonIcon('check', 20, '#10B981')}
                        <h3 class="feature-title">${feature.title}</h3>
                      </div>
                      ${feature.description ? `<p class="feature-description">${feature.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              </section>

              <!-- Our Process Section -->
              ${service.process ? `
              <section class="service-section process-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('git-branch', 24, 'var(--bright-blue)')}
                  Our Process
                </h2>
                <div class="service-process-timeline">
                  ${service.process.map((step, index) => `
                    <div class="process-step">
                      <div class="process-step-number">${step.step || index + 1}</div>
                      <div class="process-step-content">
                        <h3 class="process-step-title">${step.title}</h3>
                        <p class="process-step-description">${step.description}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
              ` : ''}

              <!-- When You Need This Section -->
              ${service.useCases ? `
              <section class="service-section use-cases-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('target', 24, 'var(--bright-blue)')}
                  When You Need This
                </h2>
                <ul class="service-use-cases">
                  ${service.useCases.map(useCase => `
                    <li class="use-case-item">
                      ${getCommonIcon('chevron-right', 18, '#10B981')}
                      <span>${useCase}</span>
                    </li>
                  `).join('')}
                </ul>
              </section>
              ` : ''}

              <!-- Technologies Section -->
              ${service.technologies ? `
              <section class="service-section tech-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('code', 24, 'var(--bright-blue)')}
                  Technologies & Tools
                </h2>
                <div class="service-tech-grid">
                  ${service.technologies.map(tech => `
                    <span class="tech-badge">${tech}</span>
                  `).join('')}
                </div>
              </section>
              ` : ''}

              <!-- Results Section -->
              ${service.results ? `
              <section class="service-section results-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('trending-up', 24, 'var(--bright-blue)')}
                  The Results
                </h2>
                <div class="service-results-grid">
                  ${service.results.map(result => `
                    <div class="service-result-card">
                      <div class="result-icon-wrapper" style="background: ${result.color}15;">
                        ${getResultIcon(result.icon, 32, result.color)}
                      </div>
                      <div class="result-content">
                      <h3 class="result-title">${result.title}</h3>
                        ${result.description ? `<p class="result-description">${result.description}</p>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
              ` : ''}

              <!-- FAQs Section -->
              ${service.faqs ? `
              <section class="service-section faq-section">
                <h2 class="service-section-title">
                  ${getCommonIcon('help-circle', 24, 'var(--bright-blue)')}
                  Frequently Asked Questions
                </h2>
                <div class="service-faqs">
                  ${service.faqs.map((faq, index) => `
                    <details class="faq-item" ${index === 0 ? 'open' : ''}>
                      <summary class="faq-question">
                        <span>${faq.question}</span>
                        ${getCommonIcon('chevron-down', 20, 'currentColor')}
                      </summary>
                      <p class="faq-answer">${faq.answer}</p>
                    </details>
                  `).join('')}
                </div>
              </section>
              ` : ''}
            </div>

            <!-- Right Sidebar -->
            <aside class="service-sidebar">
              <div class="service-sidebar-card cta-card">
                <h2 class="sidebar-title">${service.ctaTitle || 'Ready to Start?'}</h2>
                <p class="sidebar-description">${service.ctaDescription || 'Let\'s discuss how we can help transform your Salesforce platform.'}</p>
                <a href="/contact?service=${serviceKey}" class="sidebar-cta-button">
                  Schedule a Call
                  ${getCommonIcon('calendar', 18, 'currentColor')}
                </a>
              </div>

              ${service.deliverables ? `
              <div class="service-sidebar-card deliverables-card">
                <h3 class="sidebar-subtitle">
                  ${getCommonIcon('file-text', 20, 'var(--bright-blue)')}
                  What You'll Receive
                </h3>
                <ul class="deliverables-list">
                  ${service.deliverables.map(item => `
                    <li>
                      ${getCommonIcon('check', 16, '#10B981')}
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
              ` : ''}

              ${service.packages ? `
              <div class="service-sidebar-card packages-card">
                <h3 class="sidebar-subtitle">
                  ${getCommonIcon('package', 20, 'var(--bright-blue)')}
                  Available Packages
                </h3>
                <div class="packages-list">
                  ${service.packages.map(pkg => `
                    <div class="package-item">
                      <h4 class="package-name">${pkg.name}</h4>
                      <p class="package-description">${pkg.description}</p>
                    </div>
                  `).join('')}
                </div>
                <a href="/contact?service=${serviceKey}" class="sidebar-link">
                  Compare packages
                  ${getCommonIcon('arrow-right', 16, 'currentColor')}
                </a>
              </div>
              ` : ''}

              <div class="service-sidebar-card contact-card">
                <h3 class="sidebar-subtitle">Have Questions?</h3>
                <p class="sidebar-text">Talk directly to our experts. No sales reps, no middlemen.</p>
                <a href="mailto:contact@apexrune.com" class="sidebar-email-link">
                  ${getCommonIcon('mail', 18, 'currentColor')}
                  contact@apexrune.com
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
    
    // Re-initialize contact form and mobile menu for dynamically loaded pages
    import('../../contact-form.js').then(({ initContactForm }) => {
      initContactForm();
    });
    
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function addServiceDetailStyles() {
  if (document.getElementById('service-detail-styles')) return;

  const style = document.createElement('style');
  style.id = 'service-detail-styles';
  style.textContent = `
    .service-detail-page {
      padding: 2rem 2rem 4rem;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
      width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    .service-detail-page .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .service-detail-page {
        padding: 1.5rem 1rem 3rem;
        padding-top: 100px;
      }

      .service-detail-page .container {
        padding: 0 1.25rem;
      }
    }

    /* Hero Section */
    .service-hero {
      background: linear-gradient(135deg, var(--dark-blue) 0%, #1e3a5f 100%);
      border-radius: 20px;
      padding: 3rem;
      margin-bottom: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      position: relative;
      overflow: hidden;
    }

    .service-hero::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      height: 100%;
      background: radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%);
      pointer-events: none;
    }

    .service-hero-content {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .service-hero-icon {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .service-hero-text {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .service-hero-subtitle {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }

    .service-hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--white);
      margin: 0;
      line-height: 1.2;
    }

    .service-hero-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
      margin: 0;
      max-width: 600px;
    }

    .service-hero-tag {
      display: inline-flex;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      width: fit-content;
      margin-top: 0.5rem;
    }

    .service-hero-cta {
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .service-hero-button {
      background: white;
      color: var(--dark-blue);
      padding: 1rem 2rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .service-hero-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    /* Main Layout */
    .service-detail-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: start;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      margin-top: 0;
    }

    @media (min-width: 1025px) {
      .service-detail-layout {
        grid-template-columns: 1fr 320px;
        gap: 3rem;
      }
    }

    @media (min-width: 1200px) {
      .service-detail-layout {
        grid-template-columns: 1fr 380px;
      }
    }

    .service-detail-main {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      margin-top: 0;
      padding-top: 0;
    }

    /* Sections */
    .service-section {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .service-section-title {
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .service-section-title svg {
      flex-shrink: 0;
    }

    .service-section-text {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.8;
      margin: 0;
    }

    .service-overview-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Detailed Features */
    .service-features-detailed {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .service-feature-detailed {
      background: #F8FAFC;
      border-radius: 12px;
      padding: 1.25rem;
      border-left: 3px solid var(--bright-blue);
    }

    .feature-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .feature-header svg {
      flex-shrink: 0;
    }

    .feature-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0;
    }

    .feature-description {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
      padding-left: 2rem;
    }

    /* Process Timeline */
    .service-process-timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
      position: relative;
    }

    .process-step {
      display: flex;
      gap: 1.25rem;
      position: relative;
      padding-bottom: 1.5rem;
    }

    .process-step:last-child {
      padding-bottom: 0;
    }

    .process-step:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 18px;
      top: 40px;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, var(--bright-blue), #E5E7EB);
    }

    .process-step-number {
      width: 38px;
      height: 38px;
      background: var(--bright-blue);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9375rem;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .process-step-content {
      flex: 1;
      padding-top: 0.25rem;
    }

    .process-step-title {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0 0 0.375rem 0;
    }

    .process-step-description {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    /* Use Cases */
    .service-use-cases {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .use-case-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 1rem;
      color: var(--text-dark);
      line-height: 1.5;
    }

    .use-case-item svg {
      flex-shrink: 0;
      margin-top: 0.25rem;
    }

    /* Tech Grid */
    .service-tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .tech-badge {
      background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
      color: var(--dark-blue);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }

    /* Results Grid */
    .service-results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .service-result-card {
      background: #F8FAFC;
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 1rem;
      transition: all 0.2s;
    }

    .service-result-card:hover {
      background: #F1F5F9;
      transform: translateY(-2px);
    }

    .result-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0;
    }

    .result-description {
      font-size: 0.875rem;
      color: var(--text-light);
      margin: 0;
      line-height: 1.5;
    }

    /* FAQs */
    .service-faqs {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .faq-item {
      background: #F8FAFC;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #E5E7EB;
    }

    .faq-question {
      padding: 1.25rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      list-style: none;
    }

    .faq-question::-webkit-details-marker {
      display: none;
    }

    .faq-question span {
      flex: 1;
    }

    .faq-question svg {
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    .faq-item[open] .faq-question svg {
      transform: rotate(180deg);
    }

    .faq-answer {
      padding: 0 1.25rem 1.25rem;
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.7;
      margin: 0;
    }

    /* Sidebar */
    .service-sidebar {
      position: sticky;
      top: 0;
      align-self: start;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      margin-top: 0;
      padding-top: 0;
    }

    .service-sidebar-card {
      background: white;
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      word-wrap: break-word;
    }

    .service-sidebar-card.cta-card {
      background: linear-gradient(135deg, #1E3A5F 0%, var(--dark-blue) 100%);
    }

    .cta-card .sidebar-title {
      color: white;
    }

    .cta-card .sidebar-description {
      color: rgba(255, 255, 255, 0.85);
    }

    .sidebar-title {
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
    }

    .sidebar-subtitle {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sidebar-description {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .sidebar-text {
      font-size: 0.875rem;
      color: var(--text-light);
      margin: 0;
    }

    .sidebar-cta-button {
      background: white;
      color: var(--dark-blue);
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .sidebar-cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Deliverables */
    .deliverables-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .deliverables-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      font-size: 0.875rem;
      color: var(--text-dark);
      line-height: 1.4;
    }

    .deliverables-list li svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Packages */
    .packages-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .package-item {
      padding-bottom: 1rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .package-item:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    .package-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0 0 0.25rem 0;
    }

    .package-description {
      font-size: 0.8125rem;
      color: var(--text-light);
      margin: 0;
    }

    .sidebar-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: gap 0.2s;
    }

    .sidebar-link:hover {
      gap: 0.625rem;
    }

    /* Contact Card */
    .contact-card {
      background: #F8FAFC;
    }

    .sidebar-email-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
    }

    .sidebar-email-link:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .service-detail-layout {
        grid-template-columns: 1fr !important;
        gap: 2rem;
        overflow-x: hidden;
      }

      .service-sidebar {
        position: static;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .service-sidebar-card {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow-x: hidden;
      }

      .service-sidebar-card.cta-card {
        grid-column: 1 / -1;
      }

      .service-results-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .service-hero {
        flex-direction: column;
        align-items: flex-start;
      }

      .service-hero-cta {
        width: 100%;
      }

      .service-hero-button {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .service-detail-layout {
        gap: 1.5rem;
        overflow-x: hidden;
        width: 100%;
        box-sizing: border-box;
      }

      .service-hero {
        padding: 1.75rem;
      }

      .service-hero-content {
        flex-direction: column;
        gap: 1rem;
      }

      .service-hero-title {
        font-size: 1.75rem;
      }

      .service-hero-description {
        font-size: 1rem;
      }

      .service-section {
        padding: 1.5rem;
        overflow-x: hidden;
        width: 100%;
        box-sizing: border-box;
      }

      .service-section-title {
        font-size: 1.25rem;
      }

      .service-results-grid {
        grid-template-columns: 1fr;
      }

      .service-sidebar {
        grid-template-columns: 1fr;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
      }

      .service-sidebar-card {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        padding: 1.5rem;
        overflow-x: hidden;
        word-wrap: break-word;
      }

      .sidebar-title,
      .sidebar-subtitle,
      .sidebar-description,
      .sidebar-text {
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
      }

      .sidebar-cta-button,
      .sidebar-email-link {
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
      }

      .feature-description {
        padding-left: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

