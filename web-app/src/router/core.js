import { loadServicePage, setHandleRoute } from './pages/services.js';
import { initMobileMenu } from './ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from './ui/dropdowns.js';

// Create and append loading indicator
let loadingIndicator = null;
function createLoadingIndicator() {
  if (loadingIndicator) return loadingIndicator;
  
  loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'page-loading-indicator';
  loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingIndicator);
  return loadingIndicator;
}

function showLoadingIndicator() {
  const indicator = createLoadingIndicator();
  indicator.classList.add('show');
}

function hideLoadingIndicator() {
  if (loadingIndicator) {
    loadingIndicator.classList.remove('show');
  }
}

// Page loaders - will be imported dynamically
let pageLoaders = {
  loadContactPage: null,
  loadCaseStudiesPage: null,
  loadCaseStudyDetailPage: null,
  loadBlogPage: null,
  loadBlogPostPage: null,
  loadPrivacyPolicyPage: null,
  loadTermsOfServicePage: null,
  load404Page: null
};

// Track when page loaders are ready
let pageLoadersReady = false;

// Initialize page loaders
const pageLoadersPromise = Promise.all([
  import('./pages/contact.js').then(m => { 
    pageLoaders.loadContactPage = m.loadContactPage;
  }),
  import('./pages/case-studies.js').then(m => { 
    pageLoaders.loadCaseStudiesPage = m.loadCaseStudiesPage;
    pageLoaders.loadCaseStudyDetailPage = m.loadCaseStudyDetailPage;
    m.setHandleRoute(handleRoute);
  }),
  import('./pages/blog.js').then(m => {
    pageLoaders.loadBlogPage = m.loadBlogPage;
    pageLoaders.loadBlogPostPage = m.loadBlogPostPage;
    m.setLoadBlogPage(m.loadBlogPage);
    m.setHandleRoute(handleRoute);
  }),
  import('./pages/legal.js').then(m => {
    pageLoaders.loadPrivacyPolicyPage = m.loadPrivacyPolicyPage;
    pageLoaders.loadTermsOfServicePage = m.loadTermsOfServicePage;
  }),
  import('./pages/404.js').then(m => {
    pageLoaders.load404Page = m.load404Page;
  })
]).then(() => {
  pageLoadersReady = true;
}).catch(err => {
  console.warn('Some page loaders failed to load:', err);
  pageLoadersReady = true; // Still mark as ready to prevent infinite waiting
});

let updateMetaTags = null;

// Load SEO functions
import('../seo.js').then((module) => {
  updateMetaTags = module.updateMetaTags;
  // Update meta tags on initial load
  if (updateMetaTags) {
    updateMetaTags(window.location.pathname || '/');
  }
});

// Set handleRoute reference for services page after handleRoute is defined
let handleRouteRef = null;

function handleRoute() {
  showLoadingIndicator();
  
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
    // Load service detail page
    const serviceKey = path.split('/service/')[1];
    loadServicePage(serviceKey);
    if (updateMetaTags) updateMetaTags(path);
  } else if (path === '/privacy-policy') {
    if (pageLoaders.loadPrivacyPolicyPage) {
      pageLoaders.loadPrivacyPolicyPage();
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadPrivacyPolicyPage) {
          pageLoaders.loadPrivacyPolicyPage();
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path === '/terms-of-service') {
    if (pageLoaders.loadTermsOfServicePage) {
      pageLoaders.loadTermsOfServicePage();
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadTermsOfServicePage) {
          pageLoaders.loadTermsOfServicePage();
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path === '/contact') {
    if (pageLoaders.loadContactPage) {
      pageLoaders.loadContactPage();
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadContactPage) {
          pageLoaders.loadContactPage();
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path === '/case-studies') {
    if (pageLoaders.loadCaseStudiesPage) {
      pageLoaders.loadCaseStudiesPage();
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadCaseStudiesPage) {
          pageLoaders.loadCaseStudiesPage();
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path.startsWith('/case-study/')) {
    const caseStudyId = path.split('/case-study/')[1];
    if (pageLoaders.loadCaseStudyDetailPage) {
      pageLoaders.loadCaseStudyDetailPage(caseStudyId);
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadCaseStudyDetailPage) {
          pageLoaders.loadCaseStudyDetailPage(caseStudyId);
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path === '/blog') {
    if (pageLoaders.loadBlogPage) {
      pageLoaders.loadBlogPage();
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadBlogPage) {
          pageLoaders.loadBlogPage();
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else if (path.startsWith('/blog/')) {
    const postId = path.split('/blog/')[1];
    if (pageLoaders.loadBlogPostPage) {
      pageLoaders.loadBlogPostPage(postId);
      if (updateMetaTags) updateMetaTags(path);
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.loadBlogPostPage) {
          pageLoaders.loadBlogPostPage(postId);
          if (updateMetaTags) updateMetaTags(path);
        }
      });
    }
  } else {
    // 404 - show error page
    if (pageLoaders.load404Page) {
      pageLoaders.load404Page();
    } else if (!pageLoadersReady) {
      // Page loaders not ready yet, wait and retry
      pageLoadersPromise.then(() => {
        if (pageLoaders.load404Page) {
          pageLoaders.load404Page();
        }
      });
    }
  }
  
  // Clean up old dropdown handlers before initializing new ones
  cleanupDropdownMenus();
  
  // Initialize mobile menu and dropdowns after page load
  requestAnimationFrame(() => {
    initMobileMenu();
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
      initDropdownMenus();
      hideLoadingIndicator();
    }, 50);
  });
}

handleRouteRef = handleRoute;
setHandleRoute(handleRoute);

export { handleRoute };

export function initRouter() {
  // Wait for page loaders to be ready before handling initial route
  // This ensures direct navigation to URLs works correctly
  pageLoadersPromise.then(() => {
    // Handle initial load after page loaders are ready
    handleRoute();
  }).catch(() => {
    // If loaders fail, still try to handle route (fallback)
    handleRoute();
  });

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
window.initDropdownMenus = initDropdownMenus;
window.cleanupDropdownMenus = cleanupDropdownMenus;

