import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

// This will be set by the router core
let handleRoute = null;
let loadBlogPageRef = null;
export function setHandleRoute(handler) {
  handleRoute = handler;
}
export function setLoadBlogPage(loader) {
  loadBlogPageRef = loader;
}

export function loadBlogPage() {
  import('../../blog.js').then(({ blogPosts, getAllCategories }) => {
    import('../../icons.js').then(({ getCommonIcon }) => {
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
                      ${post.image ? `
                        <img src="${post.image}" alt="${post.title}" class="article-card-img" />
                      ` : `
                        <div class="card-icon-placeholder" style="--icon-color: ${iconColor}">
                          ${getCommonIcon(iconName, 28, iconColor)}
                        </div>
                      `}
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
export function initBlogFilters(allPosts, initialPosts, getAllCategories) {
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

export function loadBlogPostPage(postId) {
  // Clean up any existing scroll handler from previous blog post
  if (window._blogPostScrollHandler) {
    window.removeEventListener('scroll', window._blogPostScrollHandler);
    window._blogPostScrollHandler = null;
  }
  
  import('../../blog.js').then(({ blogPosts, getPostById }) => {
    import('../../icons.js').then(({ getCommonIcon }) => {
      const post = getPostById(postId);
      
      if (!post) {
        window.history.replaceState({}, '', '/blog');
        if (loadBlogPageRef) loadBlogPageRef();
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
            
            <div class="article-back-nav">
              <a href="/blog" class="back-to-articles">
                ${getCommonIcon('chevron-left', 20, 'currentColor')}
                <span>Back to Articles</span>
              </a>
            </div>
            
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
      padding: 0;
      overflow: hidden;
    }

    .article-card-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
      display: block;
    }

    .article-card:hover .article-card-img {
      transform: scale(1.05);
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

      .article-card-img {
        height: 180px;
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

    /* Back to Articles Navigation */
    .article-back-nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 2rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .back-to-articles {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-dark);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 600;
      padding: 0.625rem 1rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      background: var(--white);
      border: 1px solid #E5E7EB;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .back-to-articles:hover {
      color: var(--bright-blue);
      border-color: var(--bright-blue);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15);
      transform: translateX(-2px);
    }

    .back-to-articles:focus {
      outline: 2px solid var(--bright-blue);
      outline-offset: 2px;
    }

    .back-to-articles svg {
      transition: transform 0.2s ease;
    }

    .back-to-articles:hover svg {
      transform: translateX(-2px);
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
      .article-back-nav {
        padding: 2rem 1.5rem 0;
        max-width: 100%;
      }

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

      .article-back-nav {
        padding: 1.5rem 1.25rem 0;
        max-width: 100%;
      }

      .article-hero-image {
        padding: 0 1.25rem;
        margin-top: -1rem;
        margin-bottom: 1.5rem;
      }

      .article-hero-image img {
        max-height: 300px;
      }

      .article-image-wrapper {
        margin: 2rem 0;
      }

      .back-to-articles {
        font-size: 0.875rem;
        padding: 0.5rem 0.875rem;
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
