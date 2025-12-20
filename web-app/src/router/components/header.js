// Helper function to get header HTML with dropdown menus
export function getHeaderHTML(getCommonIcon) {
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

