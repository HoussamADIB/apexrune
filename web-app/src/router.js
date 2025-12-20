// Simple router for handling page navigation
// NOTE: This file is being refactored into modular structure
// See router/ directory for new modular components

// Import modular components
import { getHeaderHTML } from './router/components/header.js';
import { getFooterHTML } from './router/components/footer.js';
import { initMobileMenu } from './router/ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from './router/ui/dropdowns.js';
import { loadServicePage, setHandleRoute } from './router/pages/services.js';

let updateMetaTags = null;
let iconsModule = null;

// Load icons module
import('./icons.js').then((module) => {
  iconsModule = module;
});

// Logo SVG component - matches home page logo (deprecated - use router/components/logo.js)
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

// Helper function to get header HTML with dropdown menus (deprecated - use router/components/header.js)
// Keeping for backward compatibility during migration
function getHeaderHTML_OLD(getCommonIcon) {
  return `
    <header class="header site-header">
      <div class="header-content">
        <a href="/" class="logo-container">
          <img src="/logo.png" alt="ApexRune Logo" class="logo-icon">
        </a>
        <nav class="nav">
          <a href="/" class="nav-link">Home</a>
          <div class="nav-dropdown">
            <button class="nav-link nav-dropdown-trigger" type="button">
              What We Do
              ${getCommonIcon('chevron-down', 16, 'currentColor')}
            </button>
            <div class="nav-dropdown-menu">
              <a href="/service/custom-development" class="dropdown-item">
                ${getCommonIcon('code', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Custom Development</span>
                  <span class="dropdown-item-desc">Bespoke Salesforce applications</span>
                </div>
              </a>
              <a href="/service/system-integration" class="dropdown-item">
                ${getCommonIcon('git-merge', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">System Integration</span>
                  <span class="dropdown-item-desc">Connect your essential tools</span>
                </div>
              </a>
              <a href="/service/health-checks" class="dropdown-item">
                ${getCommonIcon('activity', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Health Checks</span>
                  <span class="dropdown-item-desc">Audit & optimize your org</span>
                </div>
              </a>
              <a href="/service/process-automation" class="dropdown-item">
                ${getCommonIcon('zap', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Process Automation</span>
                  <span class="dropdown-item-desc">Flows, triggers & workflows</span>
                </div>
              </a>
            </div>
          </div>
          <div class="nav-dropdown">
            <button class="nav-link nav-dropdown-trigger" type="button">
              Insights
              ${getCommonIcon('chevron-down', 16, 'currentColor')}
            </button>
            <div class="nav-dropdown-menu">
              <a href="/case-studies" class="dropdown-item">
                ${getCommonIcon('briefcase', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Case Studies</span>
                  <span class="dropdown-item-desc">Real results from real clients</span>
                </div>
              </a>
              <a href="/blog" class="dropdown-item">
                ${getCommonIcon('file-text', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Blog</span>
                  <span class="dropdown-item-desc">Tips, guides & best practices</span>
                </div>
              </a>
            </div>
          </div>
          <a href="/contact" class="nav-link nav-cta">Contact Us</a>
        </nav>
        <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
          ${getCommonIcon('menu', 24, 'currentColor')}
        </button>
      </div>
      <div class="mobile-menu-overlay"></div>
      <nav class="mobile-menu">
        <button class="mobile-menu-close" aria-label="Close mobile menu">
          ${getCommonIcon('x', 24, 'currentColor')}
        </button>
        <a href="/" class="mobile-nav-link">Home</a>
        <div class="mobile-nav-section">
          <span class="mobile-nav-label">What We Do</span>
          <a href="/service/custom-development" class="mobile-nav-link mobile-nav-sub">Custom Development</a>
          <a href="/service/system-integration" class="mobile-nav-link mobile-nav-sub">System Integration</a>
          <a href="/service/health-checks" class="mobile-nav-link mobile-nav-sub">Health Checks</a>
          <a href="/service/process-automation" class="mobile-nav-link mobile-nav-sub">Process Automation</a>
        </div>
        <div class="mobile-nav-section">
          <span class="mobile-nav-label">Insights</span>
          <a href="/case-studies" class="mobile-nav-link mobile-nav-sub">Case Studies</a>
          <a href="/blog" class="mobile-nav-link mobile-nav-sub">Blog</a>
        </div>
        <a href="/contact" class="mobile-nav-link mobile-nav-cta">Contact Us</a>
      </nav>
    </header>
  `;
}

// Helper function to get footer HTML with Lucide icons (deprecated - use router/components/footer.js)
// Keeping for backward compatibility during migration
function getFooterHTML_OLD(getCommonIcon) {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              <img src="/logo-v2.png" alt="ApexRune Logo" class="logo-icon" style="height: 40px; width: auto;">
            </div>
            <p class="footer-description">Demystifying Salesforce and making it an engine for growth for ambitious businesses.</p>
            <div class="social-icons">
              <a href="https://www.linkedin.com/company/apexrune/" target="_blank" rel="noopener noreferrer" class="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:contact@apexrune.com" class="social-icon">
                ${getCommonIcon('mail', 24, 'currentColor')}
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">What We Do</h4>
            <ul class="footer-links">
              <li><a href="/service/custom-development">Custom Development</a></li>
              <li><a href="/service/system-integration">System Integration</a></li>
              <li><a href="/service/health-checks">Health Checks</a></li>
              <li><a href="/service/process-automation">Process Automation</a></li>
            </ul>
              </div>
          <div class="footer-column">
            <h4 class="footer-heading">Insights</h4>
            <ul class="footer-links">
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/blog">Technical Blog</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <a href="/contact" class="footer-cta-button">
              Contact Us
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

// Export handleRoute and initDropdownMenus for use in other modules
window.handleRoute = handleRoute;
window.initDropdownMenus = initDropdownMenus;
window.cleanupDropdownMenus = cleanupDropdownMenus;

function handleRoute() {
  const path = window.location.pathname || '/';
  const app = document.querySelector('#app');

  if (path === '/' || path === '') {
    // Always reload to show home page when navigating to home
    // Check if we're coming from another page
    const isOnOtherPage = app.innerHTML.includes('service-detail-page') || 
                         app.innerHTML.includes('legal-page') || 
                         app.innerHTML.includes('contact-page') || 
                         app.innerHTML.includes('case-studies-page') ||
                         app.innerHTML.includes('case-study-detail-page') ||
                         app.innerHTML.includes('blog-page') ||
                         app.innerHTML.includes('blog-post-page');
    
    if (isOnOtherPage) {
      // Reload to show home page and scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.location.href = '/';
    }
    // If already on home page, do nothing
    return;
  } else if (path.startsWith('/service/')) {
    // Load service detail page - using modular version
    const serviceKey = path.split('/service/')[1];
    loadServicePage(serviceKey);
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/privacy-policy') {
    loadPrivacyPolicyPage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/terms-of-service') {
    loadTermsOfServicePage();
    if (updateMetaTags) updateMetaTags(path);
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
  } else if (path === '/blog') {
    loadBlogPage();
    if (updateMetaTags) updateMetaTags(path);
  } else if (path.startsWith('/blog/')) {
    const postId = path.split('/blog/')[1];
    loadBlogPostPage(postId);
    if (updateMetaTags) updateMetaTags(path);
  } else {
    // 404 - redirect to home
    window.history.replaceState({}, '', '/');
    handleRoute();
  }
  
  // Clean up old dropdown handlers before initializing new ones
  cleanupDropdownMenus();
  
  // Initialize mobile menu and dropdowns after page load
  requestAnimationFrame(() => {
    initMobileMenu();
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
      initDropdownMenus();
    }, 50);
  });
}

// Set handleRoute reference for services page module
setHandleRoute(handleRoute);

// Load service page (deprecated - use router/pages/services.js)
// Keeping for backward compatibility - this function is now imported from router/pages/services.js
function loadServicePage_OLD(serviceKey) {
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
    import('./contact-form.js').then(({ initContactForm }) => {
      initContactForm();
    });
    
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

// Initialize mobile menu functionality (deprecated - use router/ui/mobile-menu.js)
// Keeping for backward compatibility during migration
function initMobileMenu_OLD() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Hide toggle button when menu is open
    if (toggle) {
      toggle.style.opacity = '0';
      toggle.style.pointerEvents = 'none';
    }
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Show toggle button when menu is closed
    if (toggle) {
      toggle.style.opacity = '1';
      toggle.style.pointerEvents = 'auto';
    }
  }

  if (toggle) toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Global dropdown state management to prevent conflicts (deprecated - use router/ui/dropdowns.js)
// Keeping for backward compatibility during migration
const dropdownState_OLD = {
  handlers: new Map(), // Store handlers for cleanup
  initialized: false
};

// Initialize dropdown menus with robust state management and cleanup (deprecated)
function initDropdownMenus_OLD() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  // Clean up any existing handlers first
  cleanupDropdownMenus();
  
  // Add class to disable CSS hover (JavaScript will handle it)
  nav.classList.add('js-dropdown-enabled');
  
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach((dropdown, index) => {
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    
    // Initialize menu state
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.pointerEvents = 'none';
    
    let hideTimeout = null;
    let isVisible = false;
    let isHovering = false;
    
    const showMenu = () => {
      if (hideTimeout) {
      clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      
      isHovering = true;
      isVisible = true;
      
      // Use requestAnimationFrame for smooth transitions
      requestAnimationFrame(() => {
        if (isHovering) {
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.pointerEvents = 'auto';
          menu.style.transition = 'opacity 0.15s ease, visibility 0.15s ease';
        }
      });
    };
    
    const hideMenu = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      hideTimeout = setTimeout(() => {
        // Only hide if we're still not hovering
        if (!isHovering) {
          isVisible = false;
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.pointerEvents = 'none';
        }
      }, 150); // Slightly reduced delay for better responsiveness
    };
    
    const handleMouseEnter = (e) => {
      isHovering = true;
      isVisible = true;
      showMenu();
    };
    
    const handleMouseLeave = (e) => {
      // Check if we're moving to a child element
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && (dropdown.contains(relatedTarget) || menu.contains(relatedTarget))) {
        return; // Still within dropdown area
      }
      isHovering = false;
      hideMenu();
    };
    
    // Add event listeners
    dropdown.addEventListener('mouseenter', handleMouseEnter);
    dropdown.addEventListener('mouseleave', handleMouseLeave);
    menu.addEventListener('mouseenter', handleMouseEnter);
    menu.addEventListener('mouseleave', handleMouseLeave);
    
    // Also handle focus for accessibility
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      const handleFocus = () => {
        isHovering = true;
        isVisible = true;
        showMenu();
      };
      
      const handleBlur = (e) => {
        // Delay to allow clicking on menu items
        setTimeout(() => {
          if (!dropdown.contains(document.activeElement)) {
            isHovering = false;
            hideMenu();
          }
        }, 100);
      };
      
      trigger.addEventListener('focus', handleFocus);
      trigger.addEventListener('blur', handleBlur);
      
      // Store handlers for cleanup
      dropdownState.handlers.set(dropdown, {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        focus: handleFocus,
        blur: handleBlur,
        menu: menu,
        trigger: trigger,
        hideMenu: hideMenu,
        isHovering: () => isHovering,
        setIsHovering: (val) => { isHovering = val; }
      });
    } else {
      dropdownState.handlers.set(dropdown, {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        menu: menu,
        hideMenu: hideMenu,
        isHovering: () => isHovering,
        setIsHovering: (val) => { isHovering = val; }
      });
    }
  });
  
  // Global click handler to close dropdowns when clicking outside
  // Set up after handlers are stored
  const handleDocumentClick = (e) => {
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!menu) return;
      
      // If click is outside the dropdown, close it
      if (!dropdown.contains(e.target) && !menu.contains(e.target)) {
        const handlers = dropdownState.handlers.get(dropdown);
        if (handlers && handlers.hideMenu) {
          handlers.hideMenu();
        }
      }
    });
  };
  
  // Add document click listener (will be cleaned up on next init)
  document.addEventListener('click', handleDocumentClick, true);
  dropdownState.documentClickHandler = handleDocumentClick;
  
  dropdownState.initialized = true;
}

// Clean up dropdown event listeners (deprecated - use router/ui/dropdowns.js)
function cleanupDropdownMenus_OLD() {
  // Remove document click handler
  if (dropdownState.documentClickHandler) {
    document.removeEventListener('click', dropdownState.documentClickHandler, true);
    dropdownState.documentClickHandler = null;
  }
  
  dropdownState.handlers.forEach((handlers, dropdown) => {
    if (handlers.mouseenter) {
      dropdown.removeEventListener('mouseenter', handlers.mouseenter);
    }
    if (handlers.mouseleave) {
      dropdown.removeEventListener('mouseleave', handlers.mouseleave);
    }
    if (handlers.menu) {
      const menu = handlers.menu;
      if (handlers.mouseenter) {
        menu.removeEventListener('mouseenter', handlers.mouseenter);
      }
      if (handlers.mouseleave) {
        menu.removeEventListener('mouseleave', handlers.mouseleave);
      }
    }
    if (handlers.trigger) {
      if (handlers.focus) {
        handlers.trigger.removeEventListener('focus', handlers.focus);
      }
      if (handlers.blur) {
        handlers.trigger.removeEventListener('blur', handlers.blur);
      }
    }
  });
  
  dropdownState.handlers.clear();
  dropdownState.initialized = false;
  
  // Remove the js-dropdown-enabled class
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.classList.remove('js-dropdown-enabled');
  }
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

function loadPrivacyPolicyPage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${getHeaderHTML(getCommonIcon)}

    <main class="legal-page">
      <div class="container">
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

    ${getFooterHTML(getCommonIcon)}
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function loadTermsOfServicePage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${getHeaderHTML(getCommonIcon)}

    <main class="legal-page">
      <div class="container">
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

    ${getFooterHTML(getCommonIcon)}
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function loadContactPage() {
  Promise.all([
    import('./contact-form.js'),
    import('./icons.js')
  ]).then(([{ getContactFormHTML }, { getCommonIcon }]) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
      ${getHeaderHTML(getCommonIcon)}

      <main class="contact-page">
        <div class="contact-page-container">
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

      ${getFooterHTML(getCommonIcon)}
    `;

    addContactPageStyles();
    initContactPageForm();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function loadCaseStudiesPage() {
  import('./icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${getHeaderHTML(getCommonIcon)}

    <main class="case-studies-page">
      <div class="case-studies-container">
        <div class="case-studies-header">
          <span class="case-studies-label">Insights</span>
          <h1 class="case-studies-title">Case Studies</h1>
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

    ${getFooterHTML(getCommonIcon)}
  `;

    addCaseStudiesPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
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
      overallPerformanceGain: 23.05,
      performanceResults: [
        {
          testMethod: 'Test_AccountTrigger.testBulkAccountInsertion()',
          before: { try1: 28.874, try2: 31.572, try3: 27.921, average: 29.456 },
          after: { try1: 19.542, try2: 23.236, try3: 24.968, average: 22.582 },
          improvement: 23.34
        },
        {
          testMethod: 'Test_AccountTrigger.testCreateEntitlement()',
          before: { try1: 4.015, try2: 3.944, try3: 5.146, average: 4.368 },
          after: { try1: 2.981, try2: 2.994, try3: 3.438, average: 3.138 },
          improvement: 28.17
        },
        {
          testMethod: 'Test_AccountTrigger.testSetAccountSubSegmentationInsert()',
          before: { try1: 6.389, try2: 7.001, try3: 6.978, average: 6.789 },
          after: { try1: 4.299, try2: 3.949, try3: 4.337, average: 4.195 },
          improvement: 38.21
        },
        {
          testMethod: 'Test_AccountTrigger.testSetAccountSubSegmentationUpdate()',
          before: { try1: 16.220, try2: 13.996, try3: 16.744, average: 15.653 },
          after: { try1: 11.481, try2: 10.974, try3: 10.921, average: 11.125 },
          improvement: 28.93
        },
        {
          testMethod: 'Test_AccountTrigger.testUpdateAccountsInfo()',
          before: { try1: 3.664, try2: 3.927, try3: 4.103, average: 3.898 },
          after: { try1: 2.715, try2: 4.411, try3: 3.137, average: 3.421 },
          improvement: 12.24
        },
        {
          testMethod: 'Test_AccountTrigger.testUpdateRecordsType()',
          before: { try1: 6.134, try2: 5.518, try3: 7.511, average: 6.388 },
          after: { try1: 4.459, try2: 7.125, try3: 4.576, average: 5.387 },
          improvement: 15.67
        },
        {
          testMethod: 'Test_AccountTrigger.testupdateRelatedContactAddresses()',
          before: { try1: 12.805, try2: 12.383, try3: 12.467, average: 12.552 },
          after: { try1: 9.631, try2: 11.211, try3: 11.234, average: 10.692 },
          improvement: 14.82
        }
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
    ${getHeaderHTML(getCommonIcon)}

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
                
                ${caseStudy.performanceResults && caseStudy.performanceResults.length > 0 ? `
                  <div class="benchmark-table-card" onclick="openPreviewModal()">
                    <div class="benchmark-table-header">
                      <div class="benchmark-file-path">
                        <span class="file-dots">
                          <span class="file-dot red"></span>
                          <span class="file-dot yellow"></span>
                          <span class="file-dot green"></span>
                        </span>
                        <span class="file-path-text">logs/benchmark_results.csv</span>
                      </div>
                    </div>
                    <div class="benchmark-table-wrapper">
                      <table class="benchmark-table">
                        <thead>
                          <tr>
                            <th>TEST METHOD</th>
                            <th>BEFORE (avg)</th>
                            <th>AFTER (avg)</th>
                            <th>IMPROVEMENT</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${caseStudy.performanceResults.slice(0, 3).map(result => `
                            <tr>
                              <td class="metric-name">${result.testMethod.replace('Test_AccountTrigger.', '').replace('()', '')}</td>
                              <td class="metric-before">${result.before.average.toFixed(3)}s</td>
                              <td class="metric-after">${result.after.average.toFixed(3)}s</td>
                              <td class="metric-improvement">${result.improvement.toFixed(2)}%</td>
                              <td class="metric-status">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              </td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                    <div class="benchmark-hover-overlay">
                      <span>View Full Benchmark</span>
                    </div>
                  </div>
                ` : ''}
                
                ${caseStudy.testimonial ? `
                  <div class="case-study-testimonial">
                    <p>"${caseStudy.testimonial}"</p>
                    <button class="preview-details-button" onclick="openPreviewModal()">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2V10M10 10V18M10 10H18M10 10H2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      View Preview Details
                    </button>
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
                <a href="/contact" class="sidebar-cta-button">
                  ${getCommonIcon('calendar', 18, 'currentColor')}
                  Schedule Audit
                </a>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>

    ${getFooterHTML(getCommonIcon)}
  `;

    // Create preview modal
    createPreviewModal();
    addCaseStudyDetailPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

// Make openPreviewModal available globally
window.openPreviewModal = function() {
  const modal = document.getElementById('preview-sheet-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Get case study ID from URL
    const caseStudyId = window.location.pathname.split('/').pop();
    
    // Get case study data
    const caseStudies = {
      'platform-paralysis': {
        overallPerformanceGain: 23.05,
        performanceResults: [
          {
            testMethod: 'Test_AccountTrigger.testBulkAccountInsertion()',
            before: { try1: 28.874, try2: 31.572, try3: 27.921, average: 29.456 },
            after: { try1: 19.542, try2: 23.236, try3: 24.968, average: 22.582 },
            improvement: 23.34
          },
          {
            testMethod: 'Test_AccountTrigger.testCreateEntitlement()',
            before: { try1: 4.015, try2: 3.944, try3: 5.146, average: 4.368 },
            after: { try1: 2.981, try2: 2.994, try3: 3.438, average: 3.138 },
            improvement: 28.17
          },
          {
            testMethod: 'Test_AccountTrigger.testSetAccountSubSegmentationInsert()',
            before: { try1: 6.389, try2: 7.001, try3: 6.978, average: 6.789 },
            after: { try1: 4.299, try2: 3.949, try3: 4.337, average: 4.195 },
            improvement: 38.21
          },
          {
            testMethod: 'Test_AccountTrigger.testSetAccountSubSegmentationUpdate()',
            before: { try1: 16.220, try2: 13.996, try3: 16.744, average: 15.653 },
            after: { try1: 11.481, try2: 10.974, try3: 10.921, average: 11.125 },
            improvement: 28.93
          },
          {
            testMethod: 'Test_AccountTrigger.testUpdateAccountsInfo()',
            before: { try1: 3.664, try2: 3.927, try3: 4.103, average: 3.898 },
            after: { try1: 2.715, try2: 4.411, try3: 3.137, average: 3.421 },
            improvement: 12.24
          },
          {
            testMethod: 'Test_AccountTrigger.testUpdateRecordsType()',
            before: { try1: 6.134, try2: 5.518, try3: 7.511, average: 6.388 },
            after: { try1: 4.459, try2: 7.125, try3: 4.576, average: 5.387 },
            improvement: 15.67
          },
          {
            testMethod: 'Test_AccountTrigger.testupdateRelatedContactAddresses()',
            before: { try1: 12.805, try2: 12.383, try3: 12.467, average: 12.552 },
            after: { try1: 9.631, try2: 11.211, try3: 11.234, average: 10.692 },
            improvement: 14.82
          }
        ]
      }
    };
    
    const caseStudy = caseStudies[caseStudyId];
    
    // Populate full benchmark table with actual performance metrics
    const fullTableBody = document.getElementById('full-benchmark-table-body');
    const overallGainValue = document.getElementById('overall-gain-value');
    
    if (fullTableBody && caseStudy && caseStudy.performanceResults) {
      fullTableBody.innerHTML = caseStudy.performanceResults.map(result => `
        <tr>
          <td class="test-method-cell">${result.testMethod.replace('Test_AccountTrigger.', '')}</td>
          <td>${result.before.try1.toFixed(3)}</td>
          <td>${result.before.try2.toFixed(3)}</td>
          <td>${result.before.try3.toFixed(3)}</td>
          <td class="average-cell before-avg">${result.before.average.toFixed(3)}</td>
          <td>${result.after.try1.toFixed(3)}</td>
          <td>${result.after.try2.toFixed(3)}</td>
          <td>${result.after.try3.toFixed(3)}</td>
          <td class="average-cell after-avg">${result.after.average.toFixed(3)}</td>
          <td class="improvement-cell">${result.improvement.toFixed(2)}%</td>
        </tr>
      `).join('');
      
      if (overallGainValue && caseStudy.overallPerformanceGain) {
        overallGainValue.textContent = `${caseStudy.overallPerformanceGain.toFixed(2)}%`;
      }
    }
  }
};

window.closePreviewModal = function() {
  const modal = document.getElementById('preview-sheet-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

function createPreviewModal() {
  // Check if modal already exists
  if (document.getElementById('preview-sheet-modal')) return;

  const modalHTML = `
    <div id="preview-sheet-modal" class="preview-sheet-modal" style="display: none;">
      <div class="preview-sheet-modal-overlay" onclick="closePreviewModal()"></div>
      <div class="preview-sheet-modal-content">
        <button class="preview-sheet-modal-close" onclick="closePreviewModal()" aria-label="Close preview">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
        </button>
        
        <div class="preview-sheet-container">
          <div class="preview-sheet-content" id="preview-sheet-content">
            <div class="benchmark-results-card">
              <div class="benchmark-header">
                <span class="benchmark-tab">BENCHMARK RESULTS</span>
                  </div>
              
              <div class="benchmark-content">
                <div class="benchmark-table-wrapper">
                  <table class="benchmark-table full-benchmark-table">
                        <thead>
                          <tr>
                            <th class="test-method-col">Test Method</th>
                            <th colspan="4" class="before-header">Before</th>
                            <th colspan="4" class="after-header">After</th>
                            <th class="improvement-col">Improvement %</th>
                          </tr>
                          <tr class="sub-header">
                            <th></th>
                        <th>1st Try<br><span class="time-label">(Time in seconds)</span></th>
                        <th>2nd Try<br><span class="time-label">(Time in seconds)</span></th>
                        <th>3rd Try<br><span class="time-label">(Time in seconds)</span></th>
                            <th>Average</th>
                        <th>1st Try<br><span class="time-label">(Time in seconds)</span></th>
                        <th>2nd Try<br><span class="time-label">(Time in seconds)</span></th>
                        <th>3rd Try<br><span class="time-label">(Time in seconds)</span></th>
                            <th>Average</th>
                            <th></th>
                          </tr>
                        </thead>
                    <tbody id="full-benchmark-table-body">
                      <!-- Will be populated dynamically -->
                        </tbody>
                        <tfoot>
                          <tr class="overall-gain-row">
                            <td colspan="9" class="overall-gain-label">OVERALL PERFORMANCE GAIN</td>
                        <td class="overall-gain-value" id="overall-gain-value">23.05%</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  </div>
      </div>
        </div>
                  </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('preview-sheet-modal');
      if (modal && modal.style.display !== 'none') {
        closePreviewModal();
      }
    }
  });
}

function addCaseStudyDetailPageStyles() {
  if (document.getElementById('case-study-detail-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'case-study-detail-page-styles';
  style.textContent = `
    .case-study-detail-page {
      padding: 2rem 2rem 4rem;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
    }

    @media (max-width: 768px) {
      .case-study-detail-page {
        padding: 1.5rem 1rem 3rem;
        padding-top: 100px;
      }
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
      margin-top: 0;
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

    /* Clickable Benchmark Table Card */
    .benchmark-table-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .benchmark-table-card:hover {
      border-color: var(--bright-blue);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      transform: translateY(-2px);
    }

    .benchmark-table-card:hover .benchmark-hover-overlay {
      opacity: 1;
    }

    .benchmark-table-header {
      margin-bottom: 1rem;
    }

    .benchmark-hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(59, 130, 246, 0.95);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1.125rem;
    }

    .benchmark-table-card .benchmark-table-wrapper {
      overflow-x: auto;
    }

    .benchmark-table-card .benchmark-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .benchmark-table-card .benchmark-table thead {
      background: #F9FAFB;
    }

    .benchmark-table-card .benchmark-table th {
      padding: 0.75rem 0.5rem;
      text-align: left;
      font-weight: 600;
      color: var(--text-dark);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #E5E7EB;
    }

    .benchmark-table-card .benchmark-table th:first-child {
      padding-left: 0;
    }

    .benchmark-table-card .benchmark-table tbody tr {
      border-bottom: 1px solid #F3F4F6;
    }

    .benchmark-table-card .benchmark-table tbody tr:last-child {
      border-bottom: none;
    }

    .benchmark-table-card .benchmark-table td {
      padding: 1rem 0.5rem;
      color: var(--text-dark);
    }

    .benchmark-table-card .benchmark-table td:first-child {
      padding-left: 0;
    }

    .benchmark-table-card .metric-name {
      font-weight: 600;
      font-family: 'Courier New', 'SF Mono', monospace;
      font-size: 0.8125rem;
    }

    .benchmark-table-card .metric-before {
      color: #DC2626;
      font-weight: 600;
    }

    .benchmark-table-card .metric-after {
      color: var(--green);
      font-weight: 600;
    }

    .benchmark-table-card .metric-improvement {
      color: var(--green);
      font-weight: 600;
      font-size: 0.875rem;
    }

    .benchmark-table-card .metric-status {
      text-align: center;
    }

    .benchmark-table-card .benchmark-file-path {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--text-light);
    }

    .benchmark-table-card .file-dots {
      display: flex;
      gap: 0.25rem;
    }

    .benchmark-table-card .file-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .benchmark-table-card .file-dot.red {
      background: #EF4444;
    }

    .benchmark-table-card .file-dot.yellow {
      background: #F59E0B;
    }

    .benchmark-table-card .file-dot.green {
      background: var(--green);
    }

    .benchmark-table-card .file-path-text {
      font-family: 'Courier New', 'SF Mono', monospace;
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
      margin: 0 0 1rem 0;
      font-style: italic;
    }

    .preview-details-button {
      background: var(--bright-blue);
      color: var(--white);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      margin-top: 1rem;
    }

    .preview-details-button:hover {
      background: var(--primary-blue);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
    }

    .preview-details-button:active {
      transform: translateY(0);
    }

    .preview-details-button svg {
      flex-shrink: 0;
    }

    /* Preview Sheet Modal */
    .preview-sheet-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .preview-sheet-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
    }

    .preview-sheet-modal-content {
      position: relative;
      background: var(--white);
      border-radius: 16px;
      max-width: 1400px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      animation: slideUp 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .preview-sheet-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: var(--text-light);
      transition: color 0.2s;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .preview-sheet-modal-close:hover {
      color: var(--text-dark);
    }

    .preview-sheet-container {
      padding: 2rem 2rem 2rem;
      overflow-y: auto;
      flex: 1;
    }

    .preview-sheet-content {
      color: var(--text-dark);
      line-height: 1.7;
    }

    .preview-sheet-placeholder {
      text-align: center;
      color: var(--text-light);
      font-style: italic;
      padding: 2rem;
    }

    /* Benchmark Results Card */
    .benchmark-results-card {
      background: var(--white);
      border-radius: 16px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-top: 1rem;
    }

    .benchmark-header {
      position: relative;
      padding-top: 1rem;
    }

    .benchmark-tab {
      display: inline-block;
      background: var(--bright-blue);
      color: var(--white);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-left: 1.5rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .benchmark-tab::before {
      content: '>_';
      font-family: 'Courier New', monospace;
    }

    .benchmark-content {
      display: block;
      padding: 2rem;
    }

    .benchmark-section-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .benchmark-description {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .benchmark-metric {
      margin-bottom: 2rem;
    }

    .benchmark-metric-label {
        font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.75rem;
    }

    .benchmark-progress-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .benchmark-progress-bar {
      flex: 1;
      height: 8px;
      background: #E5E7EB;
      border-radius: 4px;
      overflow: hidden;
    }

    .benchmark-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--green) 0%, #34D399 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .benchmark-improvement {
      font-size: 1rem;
      font-weight: 700;
      color: var(--green);
      white-space: nowrap;
    }

    .benchmark-report-button {
      background: var(--white);
      color: var(--bright-blue);
      border: 2px solid var(--bright-blue);
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      width: 100%;
      justify-content: center;
    }

    .benchmark-report-button:hover {
      background: var(--bright-blue);
      color: var(--white);
    }


    .benchmark-file-path {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: var(--text-light);
    }

    .file-dots {
      display: flex;
      gap: 0.25rem;
    }

    .file-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .file-dot.red {
      background: #EF4444;
    }

    .file-dot.yellow {
      background: #F59E0B;
    }

    .file-dot.green {
      background: var(--green);
    }

    .file-path-text {
      font-family: 'Courier New', 'SF Mono', monospace;
    }

    .benchmark-table-wrapper {
      overflow-x: auto;
      margin-bottom: 1.5rem;
      width: 100%;
    }
    
    .benchmark-results-card .benchmark-table-wrapper {
      margin-bottom: 0;
    }

    .benchmark-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .benchmark-table thead {
      background: #F9FAFB;
    }

    .benchmark-table th {
      padding: 0.75rem 0.5rem;
      text-align: left;
      font-weight: 600;
      color: var(--text-dark);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #E5E7EB;
    }

    .benchmark-table th:first-child {
      padding-left: 0;
    }

    .benchmark-table tbody tr {
      border-bottom: 1px solid #F3F4F6;
    }

    .benchmark-table tbody tr:last-child {
      border-bottom: none;
    }

    .benchmark-table td {
      padding: 1rem 0.5rem;
      color: var(--text-dark);
    }

    .benchmark-table td:first-child {
      padding-left: 0;
    }

    .metric-name {
      font-weight: 600;
      font-family: 'Courier New', 'SF Mono', monospace;
      font-size: 0.8125rem;
    }

    .metric-before {
      color: #DC2626;
      font-weight: 600;
    }

    .metric-after {
      color: var(--green);
      font-weight: 600;
    }

    .metric-status {
      text-align: center;
    }

    .benchmark-view-button {
      background: var(--bright-blue);
      color: var(--white);
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      width: 100%;
      margin-top: 1rem;
    }

    .benchmark-view-button:hover {
      background: var(--primary-blue);
    }

    /* Full Benchmark Table Styles */
    .full-benchmark-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      min-width: 100%;
      table-layout: auto;
    }

    .full-benchmark-table thead {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    }

    .full-benchmark-table th {
      padding: 0.75rem 0.5rem;
      text-align: center;
      font-weight: 600;
      color: var(--dark-blue);
      border-bottom: 2px solid #E5E7EB;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .full-benchmark-table th.test-method-col {
      text-align: left;
      padding-left: 1rem;
      min-width: 300px;
    }

    .full-benchmark-table th.before-header,
    .full-benchmark-table th.after-header {
      background: rgba(251, 191, 36, 0.2);
      font-weight: 700;
    }

    .full-benchmark-table th.improvement-col {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
      font-weight: 700;
    }

    .full-benchmark-table .sub-header th {
      font-weight: 500;
      font-size: 0.75rem;
      padding: 0.5rem 0.5rem;
      border-bottom: 1px solid #E5E7EB;
      background: #FEF3C7;
    }

    .full-benchmark-table .time-label {
      font-size: 0.7rem;
      font-weight: 400;
      color: var(--text-light);
      display: block;
      margin-top: 0.25rem;
    }

    .full-benchmark-table tbody tr {
      border-bottom: 1px solid #F3F4F6;
      transition: background 0.2s;
    }

    .full-benchmark-table tbody tr:hover {
      background: #F9FAFB;
    }

    .full-benchmark-table td {
      padding: 0.75rem 0.5rem;
      text-align: center;
      color: var(--text-dark);
      font-size: 0.875rem;
    }

    .full-benchmark-table td.test-method-cell {
      text-align: left;
      padding-left: 1rem;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      font-size: 0.8rem;
      color: var(--text-dark);
      font-weight: 500;
    }

    .full-benchmark-table td.average-cell {
      font-weight: 600;
      background: #F9FAFB;
    }

    .full-benchmark-table td.before-avg {
      color: #DC2626;
    }

    .full-benchmark-table td.after-avg {
      color: #059669;
    }

    .full-benchmark-table td.improvement-cell {
      font-weight: 700;
      color: #059669;
      background: rgba(16, 185, 129, 0.1);
      font-size: 0.9rem;
    }

    .full-benchmark-table tfoot {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
    }

    .full-benchmark-table tfoot tr.overall-gain-row {
      border-bottom: none;
    }

    .full-benchmark-table tfoot td {
      padding: 1rem;
      font-weight: 700;
      font-size: 1rem;
    }

    .full-benchmark-table tfoot td.overall-gain-label {
      text-align: right;
      color: var(--dark-blue);
      padding-right: 1rem;
    }

    .full-benchmark-table tfoot td.overall-gain-value {
      text-align: center;
      color: #059669;
      font-size: 1.25rem;
      background: rgba(16, 185, 129, 0.2);
    }

    @media (max-width: 768px) {
      .benchmark-content {
        padding: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .preview-sheet-modal {
        padding: 0.5rem;
        align-items: flex-end;
      }

      .preview-sheet-modal-content {
        max-height: 95vh;
        border-radius: 16px 16px 0 0;
      }

      .preview-sheet-container {
        padding: 1.75rem 1.25rem 1.5rem;
      }

      .preview-details-button {
        width: 100%;
        justify-content: center;
        padding: 0.875rem 1.5rem;
      }
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
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
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
      padding: 0;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(to bottom, #F0F9FF, var(--white) 250px);
    }

    @media (max-width: 768px) {
      .case-studies-page {
        padding-top: 100px;
      }
    }

    .case-studies-container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
    }

    .case-studies-header {
      margin-bottom: 4rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .case-studies-label {
      display: none;
    }

    .case-studies-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--dark-blue);
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .case-studies-subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      max-width: 600px;
      line-height: 1.6;
    }

    .case-studies-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
        padding: 0;
        padding-top: 70px;
      }

      .case-studies-container {
        padding: 2rem 1.25rem 4rem;
      }

      .case-studies-header {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
      }

      .case-studies-title {
        font-size: 2.5rem;
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
      background: linear-gradient(135deg, #EEF4FF 0%, #E0EBFF 100%);
      padding-top: 120px;
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
      .contact-page {
        padding-top: 100px;
      }

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

      .form-group input,
      .form-group textarea {
        padding: 0.875rem;
        font-size: 1rem;
        min-height: 48px;
        -webkit-appearance: none;
        appearance: none;
      }

      .form-group textarea {
        min-height: 120px;
      }

      .contact-form-submit {
        padding: 1rem 1.5rem;
        min-height: 48px;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .contact-page-container {
        padding: 1.25rem 0.875rem;
      }

      .contact-info-panel {
        padding: 1.75rem 1.25rem;
      }

      .contact-form-panel {
        padding: 1.75rem 1.25rem;
      }

      .contact-info-title {
        font-size: 1.75rem;
      }

      .contact-info-description {
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

function addLegalPageStyles() {
  if (document.getElementById('legal-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'legal-page-styles';
  style.textContent = `
    .legal-page {
      padding: 2rem 2rem 4rem;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(to bottom, #F8FAFC, var(--white) 150px);
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
        padding-top: 100px;
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

function loadBlogPage() {
  import('./blog.js').then(({ blogPosts, getAllCategories }) => {
    import('./icons.js').then(({ getCommonIcon }) => {
      const app = document.querySelector('#app');
      const featuredPost = blogPosts.find(post => post.featured);
      const otherPosts = blogPosts.filter(post => !post.featured || post !== featuredPost);
      
      // Get categories that actually have articles in the displayed list
      const categoriesWithPosts = [...new Set(otherPosts.map(post => post.category))].filter(Boolean);
      
      app.innerHTML = `
        ${getHeaderHTML(getCommonIcon)}

        <main class="blog-page">
          <div class="blog-container">
            <div class="blog-header">
              <span class="blog-label">Insights</span>
              <h1 class="blog-page-title">Technical Blog</h1>
              <p class="blog-page-subtitle">Deep dives into Salesforce architecture, LWC performance, and automated CI/CD pipelines. Written by certified technical architects.</p>
            </div>

            ${featuredPost ? `
            <section class="featured-section">
              <div class="featured-section-header">
                ${getCommonIcon('star', 16, 'currentColor')}
                <h2 class="featured-section-title">Editor's Choice</h2>
              </div>
              <a href="/blog/${featuredPost.id}" class="featured-article">
                <div class="featured-content">
                  <div class="featured-top-meta">
                  <span class="category-tag">${featuredPost.category}</span>
                    <span class="featured-date">
                      ${getCommonIcon('calendar', 14, 'currentColor')}
                      ${new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 class="featured-title">${featuredPost.title}</h2>
                  <p class="featured-excerpt">${featuredPost.excerpt}</p>
                  <div class="featured-footer">
                    <div class="featured-author">
                      <div class="author-avatar">${(featuredPost.author || 'ApexRune Team').charAt(0)}</div>
                      <div class="author-info">
                        <div class="author-name">${featuredPost.author || 'ApexRune Team'}</div>
                        <div class="author-title">Principal Architect</div>
                  </div>
                </div>
                    <div class="featured-read-time">
                      <span>${featuredPost.readTime}</span>
                      ${getCommonIcon('arrow-right', 16, 'currentColor')}
                  </div>
                  </div>
                </div>
                <div class="featured-decoration">
                  ${getCommonIcon('bar-chart-3', 80, 'currentColor')}
                </div>
              </a>
            </section>
            ` : ''}

            <section class="articles-section">
              <div class="articles-filters">
                <div class="filter-buttons">
                  <button class="filter-btn active" data-category="all">All Articles</button>
                  ${categoriesWithPosts.map(cat => `
                    <button class="filter-btn" data-category="${cat}">${cat}</button>
                  `).join('')}
                </div>
                <div class="search-container">
                  ${getCommonIcon('search', 18, 'currentColor')}
                  <input type="text" class="search-input" placeholder="Search articles..." id="blog-search-input">
                </div>
              </div>
              <div class="articles-header">
                <h2 class="articles-title">Latest Articles</h2>
                <span class="articles-count" id="articles-count">Showing ${otherPosts.length} of ${blogPosts.length}</span>
              </div>
              <div class="articles-grid" id="articles-grid">
                ${otherPosts.map((post, index) => {
                  const categoryIcons = {
                    'Performance': 'activity',
                    'Architecture': 'layers',
                    'Integration': 'git-merge',
                    'Development': 'code',
                    'Migration': 'refresh-cw',
                    'default': 'code'
                  };
                  const iconName = categoryIcons[post.category] || categoryIcons['default'];
                  const iconColors = ['#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#EF4444'];
                  const iconColor = iconColors[index % iconColors.length];
                  return `
                  <a href="/blog/${post.id}" class="article-card" data-category="${post.category}" data-title="${post.title.toLowerCase()}" data-excerpt="${post.excerpt.toLowerCase()}">
                    <div class="article-card-image">
                      <div class="card-icon-placeholder" style="--icon-color: ${iconColor}">
                        ${getCommonIcon(iconName, 28, iconColor)}
                      </div>
                    </div>
                    <div class="article-card-body">
                      <div class="article-card-meta">
                        <span class="category-tag category-tag--small">${post.category}</span>
                        <span class="article-card-date">${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 class="article-card-title">
                        ${post.title}
                      </h3>
                      <p class="article-card-excerpt">${post.excerpt}</p>
                      <div class="article-card-footer">
                        <div class="article-author">
                          <div class="author-avatar-small">${(post.author || 'ApexRune Team').charAt(0)}</div>
                          <span class="author-name-small">${(post.author || 'ApexRune Team').split(' ')[0]}</span>
                        </div>
                        <span class="read-article-link">
                          Read
                          ${getCommonIcon('arrow-right', 16, 'currentColor')}
                        </span>
                      </div>
                    </div>
                        </a>
                `}).join('')}
                    </div>
            </section>

            <section class="blog-cta-section">
              <div class="blog-cta-layout">
                <div class="blog-cta-text">
                  <h2 class="blog-cta-title">Stay ahead of the release cycle.</h2>
                  <p class="blog-cta-description">Get our monthly technical digest: no fluff, just actionable code snippets, architecture patterns, and release notes analysis.</p>
                </div>
                <form class="blog-cta-form" netlify>
                  <input type="email" class="blog-cta-input" placeholder="architect@company.com" required>
                  <button type="submit" class="blog-cta-button">Subscribe</button>
                </form>
              </div>
            </section>
          </div>
        </main>

        ${getFooterHTML(getCommonIcon)}
      `;

      addBlogPageStyles();
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      
      // Initialize blog filters and search
      initBlogFilters(blogPosts, otherPosts, getAllCategories);
      
      // Initialize mobile menu and dropdowns
      cleanupDropdownMenus();
      initMobileMenu();
      initDropdownMenus();
    });
  });
}

// Initialize blog filters and search functionality
function initBlogFilters(allPosts, initialPosts, getAllCategories) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('blog-search-input');
  const articlesGrid = document.getElementById('articles-grid');
  const articlesCount = document.getElementById('articles-count');
  
  let currentCategory = 'all';
  let currentSearch = '';
  
  // Filter by category
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      currentCategory = btn.dataset.category || 'all';
      filterArticles();
    });
  });
  
  // Search functionality
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      currentSearch = e.target.value.toLowerCase().trim();
      
      // Debounce search
      searchTimeout = setTimeout(() => {
        filterArticles();
      }, 300);
    });
  }
  
  function filterArticles() {
    // Get all article cards (excluding featured)
    const allCards = Array.from(document.querySelectorAll('.article-card'));
    
    // Filter by category
    let filteredCards = allCards;
    if (currentCategory !== 'all') {
      filteredCards = filteredCards.filter(card => 
        card.dataset.category === currentCategory
      );
    }
    
    // Filter by search term
    if (currentSearch) {
      filteredCards = filteredCards.filter(card => {
        const title = card.dataset.title || '';
        const excerpt = card.dataset.excerpt || '';
        return title.includes(currentSearch) || excerpt.includes(currentSearch);
      });
    }
    
    // Hide all cards
    allCards.forEach(card => {
      card.style.display = 'none';
    });
    
    // Show filtered cards
    filteredCards.forEach(card => {
      card.style.display = 'block';
    });
    
    // Update count
    const totalPosts = allPosts.length;
    const featuredPost = allPosts.find(post => post.featured);
    const totalNonFeatured = totalPosts - (featuredPost ? 1 : 0);
    const showingCount = filteredCards.length;
    
    if (articlesCount) {
      if (currentCategory === 'all' && !currentSearch) {
        articlesCount.textContent = `Showing ${totalNonFeatured} of ${totalPosts}`;
      } else {
        articlesCount.textContent = `Showing ${showingCount} ${showingCount === 1 ? 'article' : 'articles'}`;
      }
    }
    
    // Show/hide empty state
    const emptyState = document.querySelector('.articles-empty-state');
    if (filteredCards.length === 0) {
      if (!emptyState) {
        const emptyHtml = `
          <div class="articles-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="font-size: 1.5rem; color: var(--dark-blue); margin-bottom: 0.5rem;">No articles found</h3>
            <p style="color: var(--text-light);">Try adjusting your filters or search terms.</p>
          </div>
        `;
        articlesGrid.insertAdjacentHTML('beforeend', emptyHtml);
      }
    } else {
      if (emptyState) {
        emptyState.remove();
      }
    }
  }
}

function loadBlogPostPage(postId) {
  // Clean up any existing scroll handler from previous blog post
  if (window._blogPostScrollHandler) {
    window.removeEventListener('scroll', window._blogPostScrollHandler);
    window._blogPostScrollHandler = null;
  }
  
  import('./blog.js').then(({ blogPosts, getPostById }) => {
    import('./icons.js').then(({ getCommonIcon }) => {
      const post = getPostById(postId);
      
      if (!post) {
        window.history.replaceState({}, '', '/blog');
        loadBlogPage();
        return;
      }

      const app = document.querySelector('#app');
      
      // Extract headings from content for table of contents
      const headingRegex = /<h2>(.*?)<\/h2>/g;
      const headings = [];
      let match;
      while ((match = headingRegex.exec(post.content)) !== null) {
        const text = match[1].replace(/<[^>]*>/g, ''); // Strip any HTML tags
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ text, id });
      }
      
      // Add IDs to headings in content
      let processedContent = post.content;
      headings.forEach(({ text, id }) => {
        processedContent = processedContent.replace(
          `<h2>${text}</h2>`,
          `<h2 id="${id}">${text}</h2>`
        );
      });

      // Get author initials
      const authorName = post.author || 'ApexRune Team';
      const authorInitials = authorName.split(' ').map(n => n[0]).join('').substring(0, 2);
      
      // Tags from category
      const tags = ['#Salesforce', '#' + post.category.replace(/\s+/g, ''), '#BestPractices'];
      
      app.innerHTML = `
        ${getHeaderHTML(getCommonIcon)}

        <main class="blog-post-page">
          <article class="blog-article">
            <header class="article-hero">
              <div class="article-hero-inner">
                <div class="article-breadcrumb">
                  <span class="breadcrumb-item">${post.category.toUpperCase()}</span>
                  <span class="breadcrumb-sep">›</span>
                  <span class="breadcrumb-item">SALESFORCE</span>
            </div>
                <h1 class="article-hero-title">${post.title}</h1>
                <div class="article-author-info">
                  <div class="author-avatar-large">${authorInitials}</div>
                  <div class="author-details">
                    <span class="author-name-large">${authorName}</span>
                    <span class="author-role">Principal Technical Architect</span>
                  </div>
                </div>
              </div>
            </header>
            
            <div class="article-layout">
              <aside class="article-toc">
                <div class="toc-sticky">
                  <h3 class="toc-title">On This Page</h3>
                  <nav class="toc-nav">
                    <a href="#introduction" class="toc-link active">Introduction</a>
                    ${headings.map((h, i) => `
                      <a href="#${h.id}" class="toc-link">${i + 1}. ${h.text}</a>
                    `).join('')}
                  </nav>
                  
                  <div class="toc-share">
                    <span class="share-label">Share</span>
                    <div class="share-icons">
                      <a href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.origin + '/blog/' + post.id)}" class="share-icon" title="Share via Email">${getCommonIcon('mail', 18, 'currentColor')}</a>
                      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/blog/' + post.id)}" target="_blank" rel="noopener noreferrer" class="share-icon" title="Share on LinkedIn">${getCommonIcon('linkedin', 18, 'currentColor')}</a>
                      <button class="share-icon copy-link-btn" title="Copy link">${getCommonIcon('link', 18, 'currentColor')}</button>
              </div>
                  </div>
                </div>
              </aside>
              
              <div class="article-main">
                <div class="article-content" id="introduction">
                  ${processedContent}
                </div>
                
                <div class="article-tags">
                  ${tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
                
                <div class="article-author-bio">
                  <div class="author-bio-avatar">${authorInitials}</div>
                  <div class="author-bio-content">
                    <h4 class="author-bio-title">About ${authorName}</h4>
                    <p class="author-bio-text">Principal Technical Architect at ApexRune. ${authorName.split(' ')[0]} has over 12 years of experience in the ecosystem and specializes in enterprise-scale architecture and integration solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>

        ${getFooterHTML(getCommonIcon)}
      `;

      addBlogPostPageStyles();
      
      // Add scroll spy functionality
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Hide header on scroll
        let lastScroll = 0;
        const header = document.querySelector('.site-header');
        const logoImg = header.querySelector('.logo-icon');
        const originalLogoSrc = '/logo.png';
        const whiteLogoSrc = '/logo-v2.png';
        
        // Set white logo initially for blog post page
        if (logoImg) {
          logoImg.src = whiteLogoSrc;
        }
        
        // Get TOC element for sticky behavior
        const toc = document.querySelector('.article-toc');
        const tocSticky = document.querySelector('.toc-sticky');
        const articleLayout = document.querySelector('.article-layout');
        
        const handleScroll = () => {
          const currentScroll = window.scrollY;
          
          // Add scrolled class when past the hero section
          if (currentScroll > 100) {
            header.classList.add('header-scrolled');
            if (logoImg) logoImg.src = originalLogoSrc;
          } else {
            header.classList.remove('header-scrolled');
            if (logoImg) logoImg.src = whiteLogoSrc;
          }
          
          // Hide header when scrolling down past 300px
          if (currentScroll > 300) {
            header.classList.add('header-hidden');
          } else {
            header.classList.remove('header-hidden');
          }
          
          // Make TOC fixed when scrolling, but prevent overlap with footer - DYNAMIC VERSION
          if (toc && tocSticky && articleLayout) {
            const layoutRect = articleLayout.getBoundingClientRect();
            const layoutTop = layoutRect.top + window.scrollY;
            const footer = document.querySelector('.footer');
            
            // Only make TOC fixed if scrolled past the layout top
            if (currentScroll > layoutTop - 30) {
              // Get all dimensions dynamically for current viewport
              const viewportHeight = window.innerHeight;
              const viewportWidth = window.innerWidth;
              const scrollBottom = viewportHeight + window.scrollY;
              const documentHeight = document.documentElement.scrollHeight;
              
              // Get actual TOC dimensions - force reflow to get accurate measurements
              const tocRect = tocSticky.getBoundingClientRect();
              const tocHeight = tocRect.height || tocSticky.scrollHeight || tocSticky.offsetHeight || 400;
              const tocWidth = 200; // Match CSS width
              
              // Calculate left position dynamically
              const layoutLeft = articleLayout.getBoundingClientRect().left;
              const leftPos = layoutLeft + 32; // 32px = 2rem padding
              const maxLeft = viewportWidth - tocWidth - 16; // 16px margin from edge
              const finalLeft = Math.min(leftPos, maxLeft);
              
              // Default positioning
              let shouldBeFixed = true;
              let topPosition = 30; // Default top offset
              const minTop = 30; // Minimum top position
              const buffer = 40; // Buffer between TOC and footer
              
              // Check footer overlap dynamically
              if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const footerTop = footerRect.top; // Viewport-relative position
                const footerHeight = footerRect.height;
                
                // Calculate available space above footer
                const availableSpace = footerTop - minTop;
                
                // Check if TOC would fit in available space
                if (availableSpace < tocHeight + buffer) {
                  // Not enough space - remove fixed positioning
                  shouldBeFixed = false;
                } else {
                  // Calculate where TOC bottom would be at default position
                  const tocBottomAtDefault = minTop + tocHeight;
                  
                  // If TOC would extend into footer area
                  if (tocBottomAtDefault > footerTop - buffer) {
                    // Calculate maximum safe top position
                    const maxSafeTop = footerTop - tocHeight - buffer;
                    
                    if (maxSafeTop >= minTop) {
                      // Adjust top position to fit above footer
                      topPosition = maxSafeTop;
                      
                      // Verify the adjusted position works
                      const adjustedTocBottom = topPosition + tocHeight;
                      if (adjustedTocBottom > footerTop - buffer) {
                        // Still doesn't fit, remove fixed positioning
                        shouldBeFixed = false;
                      }
                    } else {
                      // Even at minimum top, TOC would overlap - remove fixed positioning
                      shouldBeFixed = false;
                    }
                  }
                  
                  // Additional check: if we're very close to bottom of page
                  const distanceFromBottom = documentHeight - scrollBottom;
                  if (distanceFromBottom < 100) {
                    // Re-check footer position
                    const currentFooterTop = footer.getBoundingClientRect().top;
                    const tocBottomAtCurrent = topPosition + tocHeight;
                    
                    if (tocBottomAtCurrent > currentFooterTop - buffer) {
                      const maxTop = currentFooterTop - tocHeight - buffer;
                      if (maxTop >= minTop) {
                        topPosition = maxTop;
                      } else {
                        shouldBeFixed = false;
                      }
                    }
                  }
                }
              }
              
              // Apply or remove fixed positioning
              if (shouldBeFixed) {
              tocSticky.classList.add('is-fixed');
                tocSticky.style.left = finalLeft + 'px';
                tocSticky.style.top = topPosition + 'px';
                tocSticky.style.maxWidth = tocWidth + 'px';
                tocSticky.style.maxHeight = (viewportHeight - topPosition - 20) + 'px';
            } else {
                // Remove fixed positioning completely
              tocSticky.classList.remove('is-fixed');
              tocSticky.style.left = '';
                tocSticky.style.top = '';
                tocSticky.style.maxWidth = '';
                tocSticky.style.maxHeight = '';
              }
            } else {
              // Not scrolled past layout top - remove fixed positioning
              tocSticky.classList.remove('is-fixed');
              tocSticky.style.left = '';
              tocSticky.style.top = '';
              tocSticky.style.maxWidth = '';
              tocSticky.style.maxHeight = '';
            }
          }
          
          lastScroll = currentScroll;
          
          // Update active TOC link
          const tocLinks = document.querySelectorAll('.toc-link');
          const headingElements = document.querySelectorAll('.article-content h2[id], .article-content[id]');
          
          let activeId = 'introduction';
          headingElements.forEach(el => {
            if (el.getBoundingClientRect().top <= 150) {
              activeId = el.id;
            }
          });
          
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + activeId) {
              link.classList.add('active');
            }
          });
        };
        
        // Clean up any existing scroll handler
        if (window._blogPostScrollHandler) {
          window.removeEventListener('scroll', window._blogPostScrollHandler);
        }
        
        // Store handler reference for cleanup
        window._blogPostScrollHandler = handleScroll;
        window.addEventListener('scroll', handleScroll);
        
        // Smooth scroll for TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
              const offset = 100;
              const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
          });
        });
        
        // Copy link functionality
        const copyLinkBtn = document.querySelector('.copy-link-btn');
        if (copyLinkBtn) {
          copyLinkBtn.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              // Show feedback
              copyLinkBtn.classList.add('copied');
              copyLinkBtn.setAttribute('title', 'Copied!');
              setTimeout(() => {
                copyLinkBtn.classList.remove('copied');
                copyLinkBtn.setAttribute('title', 'Copy link');
              }, 2000);
            } catch (err) {
              console.error('Failed to copy:', err);
            }
          });
        }
      });
      
      // Initialize mobile menu and dropdowns
      cleanupDropdownMenus();
      initMobileMenu();
      initDropdownMenus();
      
      // Initialize Prism.js syntax highlighting
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    });
  });
}

function addBlogPageStyles() {
  if (document.getElementById('blog-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'blog-page-styles';
  style.textContent = `
    .blog-page {
      padding: 0;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(to bottom, #F0F9FF, var(--white) 250px);
    }

    .blog-container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
    }

    .blog-header {
      margin-bottom: 4rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .blog-label {
      display: none;
    }

    .blog-page-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--dark-blue);
      margin-bottom: 1rem;
    }

    .blog-page-subtitle {
      font-size: 1.1rem;
      color: var(--text-light);
      line-height: 1.6;
    }

    /* Featured Section */
    .featured-section {
      margin-bottom: 4rem;
    }

    .featured-section-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .featured-section-header svg {
      color: #F59E0B;
    }

    .featured-section-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 0;
    }

    .featured-article {
      display: grid;
      grid-template-columns: 1fr auto;
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 60%, #1E3A8A 100%);
      border-radius: 16px;
      overflow: hidden;
      text-decoration: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }

    .featured-article:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(30, 58, 138, 0.3);
    }

    .featured-decoration {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: rgba(255, 255, 255, 0.15);
    }

    .featured-decoration svg {
      width: 100px;
      height: 100px;
    }

    .featured-content {
      display: flex;
      flex-direction: column;
      padding: 3rem;
      color: var(--white);
    }

    .featured-top-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .featured-content .category-tag {
      background: rgba(255, 255, 255, 0.2);
      color: var(--white);
      margin-bottom: 0;
    }

    .featured-date {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.85rem;
    }

    .featured-date svg {
      opacity: 0.7;
    }

    .featured-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    .featured-excerpt {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .featured-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2rem;
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    }

    .featured-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .author-info {
      display: flex;
      flex-direction: column;
    }

    .author-name {
      color: var(--white);
      font-weight: 600;
      font-size: 0.95rem;
    }

    .author-title {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.85rem;
    }

    .featured-read-time {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9rem;
    }


    .category-tag {
      display: inline-block;
      background: var(--bright-blue);
      color: var(--white);
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.35rem 0.75rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .category-tag--small {
      font-size: 0.65rem;
      padding: 0.25rem 0.6rem;
      background: #EFF6FF;
      color: var(--bright-blue);
      font-weight: 700;
      border-radius: 4px;
    }

    .meta-divider {
      color: var(--text-light);
      opacity: 0.5;
    }

    .read-time {
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .post-date {
      color: var(--text-light);
      font-size: 0.875rem;
    }

    .read-article-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      font-weight: 600;
      font-size: 0.95rem;
      transition: gap 0.2s ease;
    }

    .article-card:hover .read-article-link {
      gap: 0.75rem;
    }

    /* Articles Section */
    .articles-section {
      margin-top: 4rem;
    }

    .articles-filters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5rem;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .filter-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.6rem 1.25rem;
      border-radius: 24px;
      border: 1px solid #E5E7EB;
      background: var(--white);
      color: var(--text-dark);
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn:hover {
      border-color: var(--bright-blue);
      color: var(--bright-blue);
    }

    .filter-btn.active {
      background: var(--bright-blue);
      color: var(--white);
      border-color: var(--bright-blue);
    }

    .search-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border: 1px solid #E5E7EB;
      border-radius: 24px;
      background: #F9FAFB;
      max-width: 200px;
      max-width: 300px;
    }

    .search-container svg {
      color: var(--text-light);
      flex-shrink: 0;
    }

    .search-input {
      border: none;
      outline: none;
      flex: 1;
      font-size: 0.85rem;
      color: var(--text-dark);
      background: transparent;
    }

    .search-input::placeholder {
      color: #9CA3AF;
    }

    .articles-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .articles-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-blue);
    }

    .articles-count {
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .article-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
      height: 100%;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .article-card:hover {
      border-color: var(--bright-blue);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);
      transform: translateY(-2px);
    }

    .article-card-image {
      padding: 1.5rem 1.5rem 0;
    }

    .image-placeholder {
      width: 100%;
      background: #F3F4F6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9CA3AF;
    }

    .image-placeholder--small {
      height: 180px;
    }

    .card-icon-placeholder {
      width: 100%;
      height: 120px;
      background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E5E7EB;
    }

    .card-icon-placeholder svg {
      opacity: 0.8;
    }

    .article-card-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1.25rem 1.5rem 1.5rem;
    }

    .article-card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .article-card-date {
      font-size: 0.8rem;
      color: var(--text-light);
    }

    .article-card-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--dark-blue);
      line-height: 1.4;
      margin-bottom: 0.5rem;
      transition: color 0.2s;
    }

    .article-card:hover .article-card-title {
      color: var(--bright-blue);
    }

    .article-card-excerpt {
      color: var(--text-light);
      font-size: 0.85rem;
      line-height: 1.6;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 0;
      min-height: 4rem;
    }

    .article-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      margin-top: 1rem;
      border-top: 1px solid #E5E7EB;
    }

    .article-author {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .author-avatar-small {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #E5E7EB;
      color: var(--dark-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.75rem;
      flex-shrink: 0;
    }

    .author-name-small {
      color: var(--text-dark);
      font-size: 0.85rem;
      font-weight: 500;
    }

    .load-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2.5rem;
    }

    .load-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 2rem;
      border: 1px solid #E5E7EB;
      border-radius: 24px;
      background: var(--white);
      color: var(--text-dark);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .load-more-btn:hover {
      border-color: var(--bright-blue);
      color: var(--bright-blue);
    }

    .load-more-btn svg {
      color: var(--bright-blue);
    }

    .blog-cta-section {
      margin-top: 5rem;
      padding: 3.5rem 4rem;
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 60%, #1E3A8A 100%);
      border-radius: 16px;
      color: var(--white);
    }

    .blog-cta-layout {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
    }

    .blog-cta-text {
      flex: 1;
    }

    .blog-cta-title {
      font-size: 1.85rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 0.75rem;
    }

    .blog-cta-description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 0;
      line-height: 1.6;
    }

    .blog-cta-form {
      display: flex;
      gap: 0;
      flex-shrink: 0;
    }

    .blog-cta-input {
      padding: 0.875rem 1.25rem;
      border: none;
      border-radius: 8px 0 0 8px;
      background: rgba(255, 255, 255, 0.15);
      color: var(--white);
      font-size: 0.95rem;
      outline: none;
      width: 220px;
    }

    .blog-cta-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .blog-cta-input:focus {
      background: rgba(255, 255, 255, 0.2);
    }

    .blog-cta-button {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 0 8px 8px 0;
      background: var(--white);
      color: var(--dark-blue);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .blog-cta-button:hover {
      background: #F3F4F6;
    }

    @media (max-width: 900px) {
      .featured-article {
        display: block;
      }

      .featured-decoration {
        display: none;
      }

      .blog-cta-layout {
        flex-direction: column;
        text-align: center;
      }

      .blog-cta-form {
        width: 100%;
        max-width: 400px;
      }

      .blog-cta-input {
        flex: 1;
        width: auto;
      }
    }

    @media (max-width: 768px) {
      .blog-page {
        padding: 0;
        padding-top: 100px;
      }

      .blog-container {
        padding: 2rem 1.25rem 4rem;
      }

      .blog-header {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
      }

      .blog-page-title {
        font-size: 2.5rem;
      }

      .blog-page-subtitle {
        font-size: 1rem;
      }

      .featured-content {
        padding: 1.75rem;
      }

      .featured-title {
        font-size: 1.4rem;
      }

      .articles-grid {
        grid-template-columns: 1fr;
      }

      .articles-filters {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .filter-buttons {
        overflow-x: auto;
        padding-bottom: 0.5rem;
        -webkit-overflow-scrolling: touch;
      }

      .filter-buttons::-webkit-scrollbar {
        height: 4px;
      }

      .search-container {
        max-width: 100%;
      }

      .blog-cta-section {
        padding: 3rem 1.5rem;
        margin-top: 3rem;
      }

      .blog-cta-title {
        font-size: 1.5rem;
      }

      .blog-cta-description {
        font-size: 1rem;
      }

      .blog-cta-form {
        flex-direction: column;
      }

      .blog-cta-button {
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);
}

function addBlogPostPageStyles() {
  if (document.getElementById('blog-post-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'blog-post-page-styles';
  style.textContent = `
    /* Header hide on scroll */
    .site-header.header-hidden {
      transform: translateY(-100%);
    }

    .site-header {
      transition: transform 0.3s ease;
    }

    /* Header styling for blog post page - transparent with white text */
    .blog-post-page ~ .site-header,
    .site-header:has(~ .blog-post-page),
    body:has(.blog-post-page) .site-header {
      background: transparent;
      border-bottom: none;
    }

    body:has(.blog-post-page) .site-header .nav-link {
      color: rgba(255, 255, 255, 0.9);
    }

    body:has(.blog-post-page) .site-header .nav-link:hover {
      color: var(--white);
    }

    body:has(.blog-post-page) .site-header .nav-link svg {
      color: rgba(255, 255, 255, 0.7);
    }

    body:has(.blog-post-page) .site-header .contact-btn {
      background: var(--white);
      color: var(--dark-blue);
    }

    body:has(.blog-post-page) .site-header .contact-btn:hover {
      background: rgba(255, 255, 255, 0.9);
    }

    body:has(.blog-post-page) .site-header .mobile-menu-btn {
      color: var(--white);
    }

    /* When header is scrolled and hidden starts showing again, use solid bg */
    body:has(.blog-post-page) .site-header.header-scrolled {
      background: var(--white);
      border-bottom: 1px solid #E5E7EB;
    }

    body:has(.blog-post-page) .site-header.header-scrolled .nav-link {
      color: var(--text-dark);
    }

    body:has(.blog-post-page) .site-header.header-scrolled .nav-link:hover {
      color: var(--bright-blue);
    }

    body:has(.blog-post-page) .site-header.header-scrolled .nav-link svg {
      color: var(--text-dark);
    }

    body:has(.blog-post-page) .site-header.header-scrolled .contact-btn {
      background: var(--bright-blue);
      color: var(--white);
    }

    body:has(.blog-post-page) .site-header.header-scrolled .contact-btn:hover {
      background: var(--dark-blue);
    }

    body:has(.blog-post-page) .site-header.header-scrolled .mobile-menu-btn {
      color: var(--text-dark);
    }

    /* Blog Post Page */
    .blog-post-page {
      padding: 0;
      background: var(--white);
      min-height: calc(100vh - 200px);
      margin-top: -90px;
      padding-top: 0;
    }

    .blog-article {
      max-width: 100%;
    }

    /* Article Hero */
    .article-hero {
      background: linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%);
      padding: calc(90px + 8rem) 2rem 4rem;
      color: var(--white);
    }

    .article-hero-inner {
      max-width: 1100px;
      margin: 0 auto;
    }

    .article-breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .breadcrumb-item {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.7);
    }

    .breadcrumb-sep {
      color: rgba(255, 255, 255, 0.4);
    }

    .article-hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--white);
      line-height: 1.2;
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
      max-width: 800px;
    }

    .article-author-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author-avatar-large {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F59E0B, #D97706);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-weight: 700;
      color: var(--white);
    }

    .author-details {
      text-align: left;
    }

    .author-name-large {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: var(--white);
    }

    .author-role {
      display: block;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.7);
    }

    /* Article Layout */
    .article-layout {
      display: flex;
      align-items: flex-start;
      gap: 4rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }

    /* Table of Contents */
    .article-toc {
      width: 220px;
      flex-shrink: 0;
      position: relative;
      min-width: 0;
    }

    .toc-sticky {
      /* Container for TOC content */
      transition: none;
    }
    
    .toc-sticky.is-fixed {
      position: fixed;
      top: 30px;
      width: 200px;
      max-width: 200px;
      max-height: calc(100vh - 60px);
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 10;
      box-sizing: border-box;
    }

    /* Footer z-index to ensure it stays above TOC */
    .footer {
      position: relative;
      z-index: 50;
    }

    .toc-title {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #E5E7EB;
    }

    .toc-nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .toc-link {
      display: block;
      padding: 0.5rem 0;
      font-size: 0.85rem;
      color: var(--text-light);
      text-decoration: none;
      border-left: 2px solid transparent;
      padding-left: 1rem;
      margin-left: -1rem;
      transition: all 0.2s;
      line-height: 1.4;
    }

    .toc-link:hover {
      color: var(--dark-blue);
    }

    .toc-link.active {
      color: var(--dark-blue);
      font-weight: 600;
      border-left-color: var(--bright-blue);
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.08), transparent);
    }

    .toc-share {
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #E5E7EB;
    }

    .share-label {
      display: block;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 1rem;
    }

    .share-icons {
      display: flex;
      gap: 0.5rem;
    }

    .share-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
      color: var(--text-light);
      background: var(--white);
      transition: all 0.2s;
      cursor: pointer;
      text-decoration: none;
    }

    .share-icon:hover {
      color: var(--bright-blue);
      border-color: var(--bright-blue);
      background: #EFF6FF;
    }
    
    .share-icon.copied {
      color: #10B981;
      border-color: #10B981;
      background: #ECFDF5;
    }

    /* Article Main Content */
    .article-main {
      flex: 1;
      max-width: 720px;
      min-width: 0;
      overflow-x: hidden;
      word-wrap: break-word;
      box-sizing: border-box;
    }

    .article-content {
      font-size: 1.1rem;
      line-height: 1.9;
      color: var(--text-dark);
      overflow-x: hidden;
      max-width: 100%;
      box-sizing: border-box;
    }

    .article-content > p:first-child {
      font-size: 1.2rem;
      color: var(--text-light);
      line-height: 1.8;
    }

    .article-content p {
      margin-bottom: 1.5rem;
    }

    .article-content h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-top: 3rem;
      margin-bottom: 1rem;
      letter-spacing: -0.01em;
      scroll-margin-top: 100px;
    }

    .article-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-blue);
      margin-top: 2rem;
      margin-bottom: 0.75rem;
    }

    .article-content ul,
    .article-content ol {
      margin: 1.25rem 0;
      padding-left: 0;
      list-style: none;
    }

    .article-content li {
      position: relative;
      margin-bottom: 0.75rem;
      line-height: 1.7;
      padding-left: 1.5rem;
    }

    .article-content ul li::before {
      content: '–';
      position: absolute;
      left: 0;
      color: var(--bright-blue);
      font-weight: 600;
    }

    .article-content ol {
      counter-reset: item;
    }

    .article-content ol li::before {
      content: counter(item) '.';
      counter-increment: item;
      position: absolute;
      left: 0;
      color: var(--bright-blue);
      font-weight: 600;
    }

    .article-content a {
      color: var(--bright-blue);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .article-content a:hover {
      text-decoration: underline;
    }

    .article-content strong {
      font-weight: 600;
      color: var(--dark-blue);
    }

    /* Code Blocks - Prism.js Override */
    .article-content pre[class*="language-"] {
      background: transparent !important;
      border-radius: 0;
      padding: 0;
      margin: 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: none;
      box-shadow: none;
      tab-size: 2;
    }

    .article-content pre[class*="language-"] code {
      background: none !important;
      padding: 0 !important;
      font-size: 0.875rem;
      line-height: 1.75;
      font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
      white-space: pre;
      word-wrap: normal;
      display: block;
      text-shadow: none !important;
    }

    /* Hide line numbers - we don't want them */
    .article-content pre.line-numbers {
      padding-left: 1.5rem !important;
      counter-reset: none !important;
    }

    .article-content .line-numbers-rows,
    .article-content pre::before,
    .article-content pre .line-numbers-rows {
      display: none !important;
    }
    
    /* Remove any line number counters */
    .article-content pre code {
      counter-reset: none !important;
    }
    
    .article-content pre code span::before {
      content: none !important;
      display: none !important;
      color: #4a4e69;
    }

    /* Inline code */
    .article-content code:not([class*="language-"]) {
      background: #EEF2FF;
      color: #4F46E5;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9em;
      font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
      border: none;
      word-break: break-word;
      font-weight: 500;
    }

    /* Prism token colors - One Dark theme */
    .article-content pre {
      color: #abb2bf;
      text-shadow: none !important;
    }

    .article-content .token.comment,
    .article-content .token.prolog,
    .article-content .token.doctype,
    .article-content .token.cdata {
      color: #5c6370;
      font-style: italic;
    }

    .article-content .token.punctuation {
      color: #abb2bf;
    }

    .article-content .token.property,
    .article-content .token.tag,
    .article-content .token.boolean,
    .article-content .token.number,
    .article-content .token.constant,
    .article-content .token.symbol {
      color: #d19a66;
    }

    .article-content .token.selector,
    .article-content .token.attr-name,
    .article-content .token.string,
    .article-content .token.char,
    .article-content .token.builtin {
      color: #98c379;
    }

    .article-content .token.operator,
    .article-content .token.entity,
    .article-content .token.url,
    .article-content .language-css .token.string,
    .article-content .style .token.string {
      color: #56b6c2;
    }

    .article-content .token.atrule,
    .article-content .token.attr-value,
    .article-content .token.keyword {
      color: #c678dd;
    }

    .article-content .token.function,
    .article-content .token.class-name {
      color: #e5c07b;
    }

    .article-content .token.regex,
    .article-content .token.important,
    .article-content .token.variable {
      color: #e06c75;
    }

    /* Tables */
    .article-content table {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
      margin: 1.75rem 0;
      font-size: 0.95rem;
      border-radius: 12px;
      overflow-x: auto;
      overflow-y: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      display: block;
      box-sizing: border-box;
    }

    .article-content table thead tr {
      background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    }

    .article-content table th,
    .article-content table td {
      padding: 1rem 1.25rem;
      text-align: left;
      border: 1px solid #E2E8F0;
      word-wrap: break-word;
    }

    .article-content table th {
      font-weight: 600;
      color: var(--dark-blue);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .article-content table tbody tr:hover {
      background: #F8FAFC;
    }

    /* Text wrapping */
    .article-content {
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      overflow-x: hidden;
    }

    .article-content p,
    .article-content li {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    /* Scrollbar for code blocks */
    .article-content pre::-webkit-scrollbar {
      height: 8px;
    }
    
    .article-content pre::-webkit-scrollbar-track {
      background: #1a1b26;
      border-radius: 4px;
    }
    
    .article-content pre::-webkit-scrollbar-thumb {
      background: #414868;
      border-radius: 4px;
    }
    
    .article-content pre::-webkit-scrollbar-thumb:hover {
      background: #565f89;
    }

    /* Code Block with Header */
    .code-block {
      background: #282c34;
      border-radius: 8px;
      margin: 1.75rem 0;
      overflow: hidden;
      border: 1px solid #1e2227;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: #21252b;
      border-bottom: 1px solid #181a1f;
    }

    .code-filename {
      font-size: 0.8rem;
      color: #9da5b4;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      font-weight: 400;
    }

    .code-badge {
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      background: rgba(224, 108, 117, 0.1);
      color: #e06c75;
      border-radius: 4px;
      font-weight: 400;
    }

    .code-badge.good {
      background: rgba(152, 195, 121, 0.1);
      color: #98c379;
    }

    .code-content {
      padding: 1.25rem 1.5rem;
      background: #282c34;
    }

    /* Override Prism pre background */
    .article-content pre[class*="language-"] {
      background: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }

    .code-content pre {
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }

    .code-content code {
      background: none;
      padding: 0;
      color: #E5E7EB;
        font-size: 0.85rem;
      line-height: 1.7;
    }

    .code-comment {
      color: #6B7280;
    }

    .code-string {
      color: #34D399;
    }

    .code-keyword {
      color: #F472B6;
    }

    /* Callout Box */
    .callout {
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border-left: 4px solid var(--bright-blue);
      border-radius: 0 12px 12px 0;
      padding: 1.5rem 1.75rem;
      margin: 2rem 0;
    }

    .callout-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: var(--bright-blue);
      border-radius: 50%;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .callout-title {
      display: flex;
      align-items: center;
        gap: 0.75rem;
      font-weight: 700;
      font-size: 1rem;
      color: var(--dark-blue);
      margin-bottom: 0.75rem;
    }

    .callout-text {
      font-size: 0.95rem;
      color: var(--text-dark);
      line-height: 1.7;
      margin: 0;
      padding-left: 2.25rem;
    }
    
    .callout-text a {
      color: var(--bright-blue);
      font-weight: 500;
    }

    /* Article Tags */
    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #E5E7EB;
    }

    .article-tag {
      padding: 0.5rem 1rem;
      background: #F3F4F6;
      border-radius: 6px;
        font-size: 0.85rem;
      color: var(--text-dark);
      font-weight: 500;
    }

    /* Author Bio */
    .article-author-bio {
      display: flex;
        gap: 1.5rem;
      margin-top: 3rem;
      padding: 2rem;
      background: #F9FAFB;
      border-radius: 12px;
      border: 1px solid #E5E7EB;
    }

    .author-bio-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F59E0B, #D97706);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--white);
      flex-shrink: 0;
    }

    .author-bio-content {
      flex: 1;
    }

    .author-bio-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
    }

    .author-bio-text {
      font-size: 0.95rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .article-layout {
        gap: 3rem;
        padding: 3rem 1.5rem 5rem;
        overflow-x: hidden;
      }

      .article-toc {
        width: 200px;
        flex-shrink: 0;
      }

      .article-main {
        overflow-x: hidden;
        max-width: calc(100% - 200px - 3rem);
      }

      .toc-sticky.is-fixed {
        width: 180px;
        max-width: 180px;
      }
    }

    @media (max-width: 900px) {
      .article-layout {
        flex-direction: column;
        gap: 2rem;
        padding: 2.5rem 1.5rem 4rem;
      }

      .article-toc {
        display: none;
      }

      .article-main {
        max-width: 100%;
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .blog-post-page {
        margin-top: -60px;
        padding-top: 60px;
      }

      .article-hero {
        padding: calc(70px + 4rem) 1.25rem 2.5rem;
      }

      .article-hero-title {
        font-size: 1.85rem;
        margin-bottom: 1.5rem;
      }

      .article-layout {
        padding: 2rem 1.25rem 3rem;
        gap: 0;
        overflow-x: hidden;
        width: 100%;
        box-sizing: border-box;
      }

      .article-main {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        box-sizing: border-box;
      }

      .article-content {
        overflow-x: hidden;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .article-content {
        font-size: 1rem;
      }

      .article-content > p:first-child {
        font-size: 1.05rem;
      }

      .article-content h2 {
        font-size: 1.3rem;
        margin-top: 2rem;
      }

      .article-content h3 {
        font-size: 1.15rem;
      }

      .article-sidebar {
        grid-template-columns: 1fr;
      }

      .article-author-bio {
        flex-direction: column;
        text-align: center;
        align-items: center;
        padding: 1.5rem;
      }

      /* Mobile code blocks */
      .article-content pre[class*="language-"] {
        padding: 1rem !important;
        margin: 1.25rem -1.25rem !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
        font-size: 0.8rem;
      }

      .article-content pre[class*="language-"] code {
        font-size: 0.75rem !important;
        line-height: 1.6 !important;
      }

      .article-content pre.line-numbers {
        padding-left: 1rem !important;
      }

      .article-content code:not([class*="language-"]) {
        font-size: 0.8em;
        padding: 0.15rem 0.4rem;
      }

      /* Mobile tables - horizontal scroll */
      .article-content table {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        font-size: 0.85rem;
        margin: 1.25rem -1.25rem;
        width: calc(100% + 2.5rem);
        max-width: none;
      }

      .article-content table th,
      .article-content table td {
        padding: 0.75rem 0.75rem;
        white-space: nowrap;
      }
      
      /* Mobile text wrapping */
      .article-content {
        overflow-x: hidden;
      }
      
      .article-content p,
      .article-content li,
      .article-content h2,
      .article-content h3 {
        word-break: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }
    }
  `;
  document.head.appendChild(style);
}



