import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

// This will be set by the router core
let handleRoute = null;
export function setHandleRoute(handler) {
  handleRoute = handler;
}

export function loadCaseStudiesPage() {
  import('../../icons.js').then(({ getCommonIcon }) => {
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
export function loadCaseStudyDetailPage(caseStudyId) {
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

  import('../../icons.js').then(({ getCommonIcon }) => {
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

export function createPreviewModal() {
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
