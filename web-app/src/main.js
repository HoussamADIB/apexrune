import './style.css'
import { initServiceTabs } from './services.js'
import { initRouter } from './router.js'
import { certifications, initCertificationsCarousel, getSalesforceCloudIcon } from './certifications.js'
import { initDashboardAnimations } from './dashboard-animations.js'

document.querySelector('#app').innerHTML = `
  <header class="header">
    <div class="header-content">
      <a href="#/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 0.75rem;">
        <div class="logo-square">
          <span class="logo-letter">A</span>
        </div>
        <span class="logo-text">ApexRune</span>
      </a>
      <nav class="nav">
        <a href="#" class="nav-link">HOME</a>
        <a href="#" class="nav-link">OUR SERVICES</a>
        <a href="#" class="nav-link">WHY US</a>
        <a href="#" class="nav-link">CONTACT US</a>
      </nav>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="content-wrapper">
        <div class="left-section">
          <h1 class="headline">
            Is Your Salesforce<br>
            Underperforming?<br>
            <span class="highlight">Let's Unlock Its<br>True Potential.</span>
          </h1>
          <p class="description">
            We are a dedicated team of certified Salesforce developers who
            build, optimize, and automate your platform. Stop wrestling with
            Salesforce and start scaling your business.
          </p>
          <div class="cta-section">
            <button class="cta-button">
              Schedule Your Free Consultation
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="quick-fix">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L10.5 5.5L15.5 6.5L12 10L12.5 15L8 12.5L3.5 15L4 10L0.5 6.5L5.5 5.5L8 1Z" fill="currentColor"/>
              </svg>
              <span>Just need a quick fix?</span>
            </div>
          </div>
        </div>

        <div class="right-section">
          <div class="system-overview-card">
            <div class="system-header">
              <div class="system-header-left">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L2 5V9C2 13.55 5.16 17.74 10 19C14.84 17.74 18 13.55 18 9V5L10 2ZM10 17.65C6.11 16.35 3.5 13.05 3.5 9V6.3L10 3.75L16.5 6.3V9C16.5 13.05 13.89 16.35 10 17.65Z" fill="#6B7280"/>
                  <path d="M10 9.5L7.5 7L6 8.5L10 12.5L14 8.5L12.5 7L10 9.5Z" fill="#6B7280"/>
                </svg>
                <span class="system-title">System Overview</span>
              </div>
              <div class="system-header-right">
                <span class="last-scan">Last scan: Just now</span>
                <div class="live-badge">
                  <div class="live-dot"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>

            <div class="org-performance-card">
              <div class="performance-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H5L7 8L11 16L15 8L17 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="speed-badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1L7.5 4.5L11 5.5L8.5 8L9 11.5L6 10L3 11.5L3.5 8L1 5.5L4.5 4.5L6 1Z" fill="white"/>
                  </svg>
                  <span>+24% Speed</span>
                </div>
              </div>
              <div class="performance-content">
                <div class="performance-label">Org Performance</div>
                <div class="performance-score">98/100</div>
              </div>
            </div>

            <div class="metrics-row">
              <div class="metric-card health-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="metric-content">
                  <div class="metric-label">Health</div>
                  <div class="metric-value">Excellent</div>
                  <div class="metric-detail">0 Critical Issues</div>
                </div>
              </div>

              <div class="metric-card data-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="6" height="6" rx="1" fill="#8B5CF6"/>
                  <rect x="11" y="3" width="6" height="6" rx="1" fill="#8B5CF6"/>
                  <rect x="19" y="3" width="6" height="6" rx="1" fill="#8B5CF6"/>
                  <rect x="3" y="11" width="6" height="6" rx="1" fill="#8B5CF6"/>
                  <rect x="11" y="11" width="6" height="6" rx="1" fill="#8B5CF6"/>
                  <rect x="19" y="11" width="6" height="6" rx="1" fill="#8B5CF6"/>
                </svg>
                <div class="metric-content">
                  <div class="metric-label">Data Qlty</div>
                  <div class="metric-value">99.9%</div>
                  <div class="metric-detail">Duplicates removed</div>
                </div>
              </div>
            </div>

            <div class="optimizations-section">
              <div class="optimizations-title">Recent Optimizations</div>
              <div class="optimization-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="optimization-name">Apex Class Optimization</span>
                <span class="optimization-status">-120ms</span>
              </div>
              <div class="optimization-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="optimization-name">Storage Cleanup</span>
                <span class="optimization-status">-2.4GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certified Experts Section -->
    <section class="certified-section">
      <div class="container">
        <h2 class="certified-section-title">Certified Experts in the Salesforce Ecosystem</h2>
        <div class="certifications-carousel-wrapper">
          <button class="carousel-btn prev" aria-label="Previous certifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="certifications-carousel">
            <div class="certifications-track" id="certifications-track">
              <!-- Badges will be inserted here by JavaScript -->
            </div>
          </div>
          <button class="carousel-btn next" aria-label="Next certifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">Explore Our Services</h2>
        <p class="section-description">A focused suite of services designed to architect, automate, and optimize your Salesforce platform.</p>
        
        <div class="service-buttons">
          <button class="service-btn active">Salesforce Quick Start</button>
          <button class="service-btn">Custom Automation</button>
          <button class="service-btn">Org Health</button>
          <button class="service-btn">Platform Integration</button>
          <button class="service-btn">Custom Solutions</button>
        </div>

        <div class="unified-card">
          <div class="unified-content">
            <h3 class="unified-title">Get Started Fast with Salesforce Quick Start</h3>
            <p class="unified-description">Jumpstart your Salesforce journey with our comprehensive setup service. We configure your org, set up essential objects, and get your team up and running in days, not months.</p>
            <ul class="unified-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Complete Org Setup & Configuration
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                User Training & Onboarding
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Essential Customizations
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Data Migration Support
              </li>
            </ul>
            <a href="#/service/salesforce-quick-start" class="read-more">READ MORE
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
          <div class="unified-icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" stroke="#3B82F6" stroke-width="3" fill="none"/>
              <path d="M40 60L55 75L80 45" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Problems Section -->
    <section class="problems-section">
      <div class="container">
        <h2 class="problems-title">Is Your Salesforce Creating More Problems Than It Solves?</h2>
        <div class="problems-grid">
          <div class="problem-card">
            <div class="problem-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="20" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M12 38C12 32 16 28 24 28C32 28 36 32 36 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 20V12M24 8V12M24 12H20M24 12H28" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <p class="problem-text">Your team avoids using Salesforce because it's clunky and overly complicated.</p>
            <span class="problem-label">Low Adoption</span>
          </div>
          <div class="problem-card">
            <div class="problem-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="18" width="20" height="2" fill="currentColor"/>
                <rect x="14" y="22" width="16" height="2" fill="currentColor"/>
                <rect x="14" y="26" width="20" height="2" fill="currentColor"/>
              </svg>
            </div>
            <p class="problem-text">You're wasting hours on manual data entry and work that should be automated.</p>
            <span class="problem-label">Manual Tasks</span>
          </div>
          <div class="problem-card">
            <div class="problem-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M18 18H30M18 24H26M18 30H28" stroke="currentColor" stroke-width="2"/>
                <circle cx="32" cy="20" r="4" fill="#EF4444"/>
              </svg>
            </div>
            <p class="problem-text">You can't get clear insights because your data is a disconnected disaster.</p>
            <span class="problem-label">Messy Data</span>
          </div>
        </div>
        <p class="solution-statement">It doesn't have to be this way. We transform your Salesforce into your company's most valuable asset.</p>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-section">
      <div class="container">
        <h2 class="section-title">Agency-Level Expertise, Direct-To-Expert Access</h2>
        <p class="section-description">We eliminated the middlemen. No project managers or sales reps getting in the way. You work directly with the experts who will build your solution.</p>
        
        <div class="metrics-boxes">
          <div class="metric-box">3 FOUNDERS</div>
          <div class="metric-box">100% CERTIFIED</div>
        </div>

        <div class="value-cards">
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M8 24C8 20 10 18 16 18C22 18 24 20 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="value-title">Direct-to-Expert Access</h3>
            <p class="value-text">Connect directly with the architects. Faster communication, fewer misunderstandings, and immediate technical feedback on your ideas.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L20 12L28 14L22 20L23 28L16 24L9 28L10 20L4 14L12 12L16 4Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="value-title">Lean & Agile Results</h3>
            <p class="value-text">We're fast, flexible, and focused on results, not bloated processes. You get better value and faster deployment times.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16L12 20L16 12L20 20L24 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="value-title">Deep Collective Expertise</h3>
            <p class="value-text">With collective years of experience, we've solved complex challenges for businesses of all sizes across various industries.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="4" height="8" fill="currentColor"/>
                <rect x="12" y="16" width="4" height="12" fill="currentColor"/>
                <rect x="18" y="12" width="4" height="16" fill="currentColor"/>
                <rect x="24" y="8" width="4" height="20" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="value-title">Focused On Growth</h3>
            <p class="value-text">We don't just build code; we build engines for revenue. Every solution is designed to impact your bottom line directly.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
                <path d="M16 8V16L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="value-title">24/7 Support</h3>
            <p class="value-text">Round-the-clock assistance when you need it most. We're here to ensure your Salesforce runs smoothly.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L20 12L28 14L22 20L23 28L16 24L9 28L10 20L4 14L12 12L16 4Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="value-title">Proven Track Record</h3>
            <p class="value-text">Trusted by businesses worldwide to deliver exceptional Salesforce solutions that drive real results.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Real Results for Real Businesses</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p class="testimonial-text">"Working with ApexRune was a game-changer. They automated our entire lead-to-cash process, saving us 20 hours a week."</p>
            <div class="testimonial-author">
              <strong>Sarah J., CEO</strong>
              <span>TechFlow</span>
            </div>
            <div class="testimonial-badge">20hrs/week Saved</div>
          </div>
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p class="testimonial-text">"Helped a FinTech client increase sales efficiency by 35% in just 90 days. The direct access to developers made all the difference."</p>
            <div class="testimonial-author">
              <strong>Mark T., VP Sales</strong>
              <span>FinGrowth</span>
            </div>
            <div class="testimonial-badge">+35% Efficiency</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-final-section">
      <div class="container">
        <h2 class="cta-title">Ready to Unlock Your Salesforce Potential?</h2>
        <p class="cta-description">Let's talk about your goals. Our initial consultation is always free, and always valuable.</p>
        <button class="cta-button">Schedule Your Free Consultation</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              <div class="logo-square">
                <span class="logo-letter">A</span>
              </div>
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
            <p class="footer-text">info@apexrune.com</p>
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
  </div>
    </footer>
  </main>
`

// Initialize certifications carousel
function initCertifications() {
  const track = document.getElementById('certifications-track');
  if (!track) return;

  track.innerHTML = certifications.map(cert => {
    // Check if image exists, otherwise use fallback
    const hasImage = cert.image && cert.image !== '';
    
    if (hasImage) {
      return `
        <div class="certification-badge">
          <img src="${cert.image}" alt="${cert.name}" class="certification-image" />
        </div>
      `;
    } else {
      // Fallback for missing images
      return `
        <div class="certification-badge" style="background: ${cert.fallbackColor}; box-shadow: 4px 4px 0 0 ${cert.shadowColor}; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); padding: 1.5rem 1rem 1rem;">
          <div class="badge-cloud-icon">
            ${getSalesforceCloudIcon('#FFFFFF')}
          </div>
          <div class="badge-certified-text">CERTIFIED</div>
          <div class="badge-cert-name">${cert.name}</div>
        </div>
      `;
    }
  }).join('');

  initCertificationsCarousel();
}

// Initialize service tabs and router after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initServiceTabs();
    initRouter();
    initCertifications();
    initDashboardAnimations();
  });
} else {
  initServiceTabs();
  initRouter();
  initCertifications();
  initDashboardAnimations();
}
