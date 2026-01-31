// Helper function to get header HTML with dropdown menus
export function getHeaderHTML(getCommonIcon) {
  return `
    <header class="header site-header">
      <div class="header-content">
        <a href="/" class="logo-container group" aria-label="ApexRune Home" style="text-decoration: none; display: flex; align-items: center;">
          <div class="logo-square logo-icon-wrapper">
            <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm logo-svg" style="width: 100%; height: 100%;">
              <defs>
                <linearGradient id="headerCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#00A1E0;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#0284c7;stop-opacity:1" />
                </linearGradient>
                <mask id="headerBoltCut">
                  <rect x="0" y="0" width="100" height="100" fill="white"/>
                  <!-- The Bolt Cutout Shape -->
                  <path d="M58 28 L42 52 L54 52 L42 75" fill="black" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                </mask>
              </defs>
              <!-- The Cloud Shape with Mask Applied -->
              <path d="M25 65 Q 15 65 15 55 Q 15 40 30 40 Q 35 25 55 25 Q 70 25 75 40 Q 85 40 85 55 Q 85 65 75 65 Z" fill="url(#headerCloudGrad)" mask="url(#headerBoltCut)" />
            </svg>
          </div>
          <span class="logo-text"><span class="logo-apex">Apex</span><span class="logo-rune">Rune</span></span>
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
                ${getCommonIcon('plug', 18, 'currentColor')}
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">System Integration</span>
                  <span class="dropdown-item-desc">Connect your essential tools</span>
                </div>
              </a>
              <a href="/service/health-checks" class="dropdown-item">
                ${getCommonIcon('stethoscope', 18, 'currentColor')}
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


