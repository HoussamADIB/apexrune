import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

export function load404Page() {
  import('../../icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
      ${getHeaderHTML(getCommonIcon)}

      <main class="error-404-page">
        <div class="error-404-container">
          <div class="error-404-content">
            <div class="error-404-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 class="error-404-title">404</h1>
            <h2 class="error-404-subtitle">Page Not Found</h2>
            <p class="error-404-description">
              Looks like this page took a vacation. Let's get you back on track.
            </p>
            
            <div class="error-404-actions">
              <a href="/" class="error-404-btn-primary">
                ${getCommonIcon('home', 20, 'currentColor')}
                Back to Home
              </a>
              <a href="/contact" class="error-404-btn-secondary">
                ${getCommonIcon('mail', 20, 'currentColor')}
                Contact Support
              </a>
            </div>

            <div class="error-404-links">
              <h3 class="error-404-links-title">Popular Pages</h3>
              <div class="error-404-links-grid">
                <a href="/service/custom-development" class="error-404-link">
                  ${getCommonIcon('code', 18, 'currentColor')}
                  Custom Development
                </a>
                <a href="/service/system-integration" class="error-404-link">
                  ${getCommonIcon('git-merge', 18, 'currentColor')}
                  System Integration
                </a>
                <a href="/service/health-checks" class="error-404-link">
                  ${getCommonIcon('activity', 18, 'currentColor')}
                  Health Checks
                </a>
                <a href="/case-studies" class="error-404-link">
                  ${getCommonIcon('briefcase', 18, 'currentColor')}
                  Case Studies
                </a>
                <a href="/blog" class="error-404-link">
                  ${getCommonIcon('file-text', 18, 'currentColor')}
                  Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      ${getFooterHTML(getCommonIcon)}
    `;

    add404PageStyles();
    
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function add404PageStyles() {
  if (document.getElementById('error-404-styles')) return;

  const style = document.createElement('style');
  style.id = 'error-404-styles';
  style.textContent = `
    .error-404-page {
      min-height: calc(100vh - 100px);
      background: linear-gradient(135deg, #EEF4FF 0%, #E0EBFF 100%);
      padding-top: 120px;
      padding-bottom: 4rem;
    }

    .error-404-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .error-404-content {
      background: white;
      border-radius: 20px;
      padding: 4rem 3rem;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .error-404-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
      color: var(--color-primary-light);
      opacity: 0.8;
    }

    .error-404-title {
      font-size: 6rem;
      font-weight: 800;
      color: var(--color-primary);
      margin: 0;
      line-height: 1;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .error-404-subtitle {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 1rem 0;
    }

    .error-404-description {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      margin: 1.5rem 0 2.5rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .error-404-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .error-404-btn-primary,
    .error-404-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .error-404-btn-primary {
      background: var(--color-primary);
      color: white;
      box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.3);
    }

    .error-404-btn-primary:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 8px -1px rgba(30, 64, 175, 0.4);
    }

    .error-404-btn-secondary {
      background: white;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
    }

    .error-404-btn-secondary:hover {
      background: var(--color-blue-50);
      transform: translateY(-2px);
    }

    .error-404-links {
      border-top: 1px solid var(--color-border-default);
      padding-top: 2rem;
      margin-top: 2rem;
    }

    .error-404-links-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
    }

    .error-404-links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.75rem;
    }

    .error-404-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--color-gray-50);
      border-radius: 8px;
      color: var(--color-text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .error-404-link:hover {
      background: var(--color-blue-50);
      color: var(--color-primary);
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .error-404-page {
        padding-top: 100px;
      }

      .error-404-content {
        padding: 3rem 2rem;
      }

      .error-404-title {
        font-size: 4rem;
      }

      .error-404-subtitle {
        font-size: 1.5rem;
      }

      .error-404-actions {
        flex-direction: column;
      }

      .error-404-btn-primary,
      .error-404-btn-secondary {
        width: 100%;
        justify-content: center;
      }

      .error-404-links-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}
