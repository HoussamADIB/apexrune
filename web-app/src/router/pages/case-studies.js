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
          <!-- Case Study 1: Platform Paralysis (MOST INTERESTING - High impact performance optimization) -->
          <a href="/case-study/platform-paralysis" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/platform-paralysis.png" alt="Professional Services Firm" class="case-study-image" />
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">PROFESSIONAL SERVICES FIRM</div>
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

          <!-- Case Study 2: Revenue Lifecycle Management (HIGH INTEREST - Advanced CPQ, sub-second pricing) -->
          <a href="/case-study/revenue-lifecycle-management" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/revenue-lifecycle-management.png" alt="Industrial Manufacturer" class="case-study-image" />
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">INDUSTRIAL MANUFACTURER</div>
              <h3 class="case-study-title">Revenue Lifecycle Management</h3>
              <p class="case-study-challenge">Sales teams needed real-time pricing from ERP during quote creation, but traditional CPQ required manual lookups causing pricing errors and delays.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Sub-second pricing response</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>98% pricing accuracy</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>60% faster quote generation</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 3: Account 360 Dashboard (HIGH INTEREST - Comprehensive unified view, high impact) -->
          <a href="/case-study/account-360-dashboard" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/account-360-dashboard.png" alt="Global Manufacturer" class="case-study-image" />
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">GLOBAL MANUFACTURER</div>
              <h3 class="case-study-title">Account 360 Dashboard</h3>
              <p class="case-study-challenge">Sales teams spent 2-3 hours per account researching product subscriptions, engagement history, and critical information before meetings.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>70% reduction in research time</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>40% increase in productivity</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>95% user adoption rate</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 4: Event Management Dashboard (MEDIUM-HIGH INTEREST - Real-time Platform Events) -->
          <a href="/case-study/event-management-dashboard" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/event-management-dashboard.png" alt="Marketing Organization" class="case-study-image" />
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">MARKETING ORGANIZATION</div>
              <h3 class="case-study-title">Event Management Dashboard</h3>
              <p class="case-study-challenge">Managing 1,000+ events annually with data quality issues discovered weeks after events. Manual audits were time-consuming and orphaned records created reporting inaccuracies.</p>
              <div class="case-study-results">
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>90% reduction in data issues</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Real-time monitoring</span>
                </div>
                <div class="case-study-result">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>75% faster audit processing</span>
                </div>
              </div>
            </div>
          </a>

          <!-- Case Study 5: UX/UI Modernization (MEDIUM-HIGH INTEREST - Modern LWC architecture) -->
          <a href="/case-study/ux-ui-modernization" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/ux-ui-modernization.png" alt="Medical Device Manufacturer" class="case-study-image" />
              <div class="case-study-overlay">
                <span class="read-full-story">Read Full Story</span>
              </div>
            </div>
            <div class="case-study-content">
              <div class="case-study-client">MEDICAL DEVICE MANUFACTURER</div>
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
  // Case study data
  const caseStudies = {
    'account-360-dashboard': {
      client: 'GLOBAL MANUFACTURER',
      title: 'Account 360 Dashboard: Transforming Account Management with Unified Intelligence',
      heroImage: '/images/case-studies/account-360-dashboard.png',
      clientDescription: 'A global manufacturer with complex product portfolios spanning multiple subscription tiers (Access, Light, Standard, Advanced) across 10+ product lines, requiring comprehensive account intelligence for field sales teams.',
      challenge: 'Sales representatives spent an average of 2-3 hours per account researching product subscriptions, engagement history, and critical attention points before important meetings. With data scattered across subscription records, activities, and custom objects, reps struggled to get a complete picture, leading to missed upsell opportunities and unprepared client conversations.',
      solution: 'We designed and implemented a comprehensive Account 360 dashboard that consolidates account intelligence into a single, unified view. The solution combines visual account flags, real-time activity scorecards, and intelligent attention points—all optimized for mobile field sales.',
      solutionSteps: [
        'Visual Flag System: 10+ product subscription indicators with priority logic (Advanced > Standard > Light) derived from subscription records, showing active/expired status at-a-glance',
        'Activity Scorecard: Real-time engagement metrics tracking tasks completed, calls logged, emails sent, events, and 12-month activity trends with locale-aware formatting',
        'Intelligent Attention Points: Metadata-driven system that dynamically queries and displays critical account information with relevance scoring and configurable field mappings',
        'Mobile-Responsive Architecture: Container component with 5/7 column split on desktop, full-width on mobile, optimized for tablets during field visits'
      ],
      results: [
        '70% reduction in account research time',
        '40% increase in sales team productivity',
        '95% user adoption rate within 3 months'
      ],
      technologies: ['Lightning Web Components', 'Wire Decorators', 'Custom Metadata', 'Schema API', 'Cacheable Methods'],
      technicalDetails: 'Container component orchestrating child components for flags, activity scorecards, and attention points. Flags derived from subscription records with level-based logic (inactive/active/expired). Dynamic attention points using Schema API for field label resolution and relationship handling. Cacheable methods with bulk queries for performance optimization.',
      projectMeta: {
        duration: '3 months',
        teamSize: '2 Salesforce Developers, 1 Technical Architect',
        industry: 'Manufacturing',
        companySize: 'Enterprise (5000+ employees)',
        region: 'Global'
      },
      keyInsight: 'The breakthrough wasn\'t the technology—it was understanding that sales reps needed answers, not data dumps. By surfacing critical information automatically through visual flags and intelligent attention points, we eliminated the "analysis paralysis" that was killing productivity. The visual flag system alone reduced cognitive load by 60%.',
      lessonsLearned: [
        'Metadata-driven attention points eliminated hardcoded queries—business users can now add new attention points without developer involvement',
        'Mobile-first design was critical—60% of users access the dashboard on tablets during client visits',
        'Caching strategy was essential: cacheable methods reduced page load time from 4.2s to 1.1s for accounts with 100+ related records'
      ]
    },
    'revenue-lifecycle-management': {
      client: 'INDUSTRIAL MANUFACTURER',
      title: 'Revenue Lifecycle Management: Dynamic CPQ with Real-Time ERP Pricing',
      heroImage: '/images/case-studies/revenue-lifecycle-management.png',
      clientDescription: 'An industrial manufacturer with 50,000+ products requiring real-time pricing from their ERP system during quote and order creation. Sales teams needed instant access to customer-specific pricing, retail prices, and product classifications.',
      challenge: 'Traditional CPQ solutions required manual price lookups or batch synchronization, creating pricing errors and delayed quote generation. Sales teams couldn\'t provide accurate quotes during customer meetings, and pricing mismatches led to order rejections. The disconnect between Salesforce and ERP pricing was costing deals.',
      solution: 'We implemented a custom Revenue Lifecycle Management solution leveraging Salesforce Industries CPQ with prehook processing—intercepting sales transactions before commit to inject real-time ERP pricing seamlessly into the user workflow.',
      solutionSteps: [
        'Prehook Processing Engine: Custom hook implementing prehook interface to intercept transactions before commit, enabling seamless ERP pricing injection',
        'Tag-Based Data Access: Leveraging Industries Context API to query and update transaction nodes via tag-based architecture',
        'Smart Filtering Logic: Prevents duplicate pricing by checking existing pricing data, excludes bundles, and handles deleted items intelligently',
        'Bulk Processing Optimization: Single ERP callout per transaction handling 50+ products, with product ID to SKU mapping for ERP compatibility'
      ],
      results: [
        'Sub-second pricing response times (average 800ms)',
        '98% pricing accuracy (up from 75%)',
        '60% faster quote generation'
      ],
      technologies: ['Salesforce Industries CPQ', 'Prehook Processing', 'Context API', 'REST APIs', 'Tag-Based Architecture'],
      technicalDetails: 'Custom hook implementing prehook interface for prehook processing. Tag-based data access via Industries Context API for querying and updating. Bulk product processing with single ERP callout per transaction. Dynamic attribute mapping for pricing and product classification.',
      projectMeta: {
        duration: '4 months',
        teamSize: '2 Salesforce Developers, 1 CPQ Specialist, 1 ERP Integration Expert',
        industry: 'Manufacturing',
        companySize: 'Enterprise (3000+ employees)',
        region: 'North America'
      },
      keyInsight: 'The game-changer was intercepting transactions at the prehook level—before commit. This allowed us to inject ERP pricing seamlessly without disrupting the user experience or requiring workflow changes. Users got real-time pricing without even knowing an ERP callout was happening.',
      lessonsLearned: [
        'Prehook processing requires careful governor limit management—we optimized to handle 50+ products per transaction within CPU time limits',
        'Smart filtering prevented 40% of unnecessary ERP calls by checking existing pricing data and excluding bundles, significantly reducing API costs',
        'Tag-based architecture in Industries CPQ required a paradigm shift—traditional query patterns don\'t apply, everything goes through Context API'
      ]
    },
    'event-management-dashboard': {
      client: 'MARKETING ORGANIZATION',
      title: 'Event Management Dashboard: Data Quality Assurance Through Platform Events',
      heroImage: '/images/case-studies/event-management-dashboard.png',
      clientDescription: 'A marketing organization managing 1,000+ events annually with Cvent integration, synchronizing event data and attendee information to Salesforce for lead generation and campaign tracking.',
      challenge: 'Manual audits were time-consuming, and data quality problems were discovered weeks after events, making remediation difficult. Orphaned attendee records (unmatched to contacts or leads) and field mismatches between staging and production records created reporting inaccuracies and missed lead generation opportunities. The team had no visibility into data quality until post-event analysis.',
      solution: 'We developed a comprehensive event management dashboard featuring real-time audit processing with Platform Events, automated health score calculation, field-level mismatch detection across 6 mapped fields, and bulk orphan reprocessing capabilities.',
      solutionSteps: [
        'Real-Time Audit with Platform Events: Events published during batch processing provide live UI updates via subscription, eliminating the "wait and see" problem',
        'Health Score Calculation: Automated scoring formula ((contacts + leads) / totalRecords * 100) with color-coded indicators (Green: 80-100%, Orange: 50-80%, Red: <50% or >100% indicating duplicates)',
        'Field-Level Mismatch Detection: Batch audit compares 6 critical fields between staging and production records',
        'Orphan Reprocessing & Duplicate Cleanup: Bulk reprocessing of unmatched attendees with intelligent matching, plus automated duplicate cleanup'
      ],
      results: [
        '90% reduction in data quality issues',
        'Real-time visibility replacing weekly manual audits',
        '75% faster audit processing'
      ],
      technologies: ['Platform Events', 'Batch Apex (Stateful)', 'Lightning Web Components', 'empApi', 'Custom Metadata'],
      technicalDetails: 'Platform Events for real-time UI updates. Batch processing with stateful implementation for large datasets. Lightning Web Component subscription via empApi with deduplication for at-least-once delivery. Configurable field mapping via custom metadata.',
      projectMeta: {
        duration: '2.5 months',
        teamSize: '1 Salesforce Developer, 1 Platform Events Specialist',
        industry: 'Events & Marketing',
        companySize: 'Enterprise (2000+ employees)',
        region: 'Global'
      },
      keyInsight: 'Platform Events enabled "live auditing"—we could show data quality issues as they occurred during batch processing, not days later. This real-time feedback loop transformed data quality from reactive to proactive. The team could now fix issues during events, not weeks after.',
      lessonsLearned: [
        'Platform Events require careful deduplication logic due to at-least-once delivery guarantees—we used set-based deduplication to prevent duplicate mismatch display',
        'Health score calculation needed to account for edge cases (e.g., >100% indicating duplicates)—this became a critical early warning system',
        'Batch processing with stateful implementation was essential for session tracking across 50,000+ attendee records while maintaining audit context'
      ]
    },
    'platform-paralysis': {
      client: 'PROFESSIONAL SERVICES FIRM',
      title: 'Eliminating Platform Paralysis: How We Optimized Core Architecture to Boost Speed by 23%',
      heroImage: '/images/case-studies/platform-paralysis.png',
      clientDescription: 'A professional services firm relying on Salesforce for high-volume account management with complex trigger logic accumulated over years of development.',
      challenge: 'The Salesforce Account object was overloaded with complex triggers and workflows, causing frequent "Apex CPU Time Limit Exceeded" exceptions during bulk operations. This led to lost data during integrations, operational drag for users, and an inability to scale. The platform was becoming a bottleneck rather than an enabler—what should have taken seconds was timing out.',
      solution: 'We identified that the Account Trigger was suffering from years of technical debt—redundant processing paths, inefficient SOQL queries, and non-bulkified logic. Our approach was systematic and data-driven:',
      solutionSteps: [
        'Deep-Dive Profiling: Analyzed every trigger handler, workflow, and process builder firing on Account updates using debug logs and performance benchmarking across 7 test scenarios',
        'Consolidation & Refactoring: Merged redundant logic, eliminated duplicate processing paths, and removed 40% of unnecessary processing discovered through profiling',
        'Architecture Redesign: Rebuilt trigger using Handler/Helper pattern with bulkification, efficient SOQL queries with relationship queries, and proper governor limit management',
        'Comprehensive Testing: Benchmarked performance across bulk operations (200 records), measuring CPU time improvements with 3 trials per test method'
      ],
      results: [
        '+23% Performance Gain',
        '0 CPU Timeout Errors',
        '100% Scalability Restored'
      ],
      technologies: ['Apex Triggers', 'Handler/Helper Pattern', 'SOQL Optimization', 'Bulkification', 'Performance Profiling'],
      overallPerformanceGain: 23.05,
      performanceResults: [
        {
          testMethod: 'Bulk Account Insertion',
          before: { try1: 28.874, try2: 31.572, try3: 27.921, average: 29.456 },
          after: { try1: 19.542, try2: 23.236, try3: 24.968, average: 22.582 },
          improvement: 23.34
        },
        {
          testMethod: 'Create Entitlement',
          before: { try1: 4.015, try2: 3.944, try3: 5.146, average: 4.368 },
          after: { try1: 2.981, try2: 2.994, try3: 3.438, average: 3.138 },
          improvement: 28.17
        },
        {
          testMethod: 'Account Segmentation Insert',
          before: { try1: 6.389, try2: 7.001, try3: 6.978, average: 6.789 },
          after: { try1: 4.299, try2: 3.949, try3: 4.337, average: 4.195 },
          improvement: 38.21
        },
        {
          testMethod: 'Account Segmentation Update',
          before: { try1: 16.220, try2: 13.996, try3: 16.744, average: 15.653 },
          after: { try1: 11.481, try2: 10.974, try3: 10.921, average: 11.125 },
          improvement: 28.93
        },
        {
          testMethod: 'Update Account Info',
          before: { try1: 3.664, try2: 3.927, try3: 4.103, average: 3.898 },
          after: { try1: 2.715, try2: 4.411, try3: 3.137, average: 3.421 },
          improvement: 12.24
        },
        {
          testMethod: 'Update Record Type',
          before: { try1: 6.134, try2: 5.518, try3: 7.511, average: 6.388 },
          after: { try1: 4.459, try2: 7.125, try3: 4.576, average: 5.387 },
          improvement: 15.67
        },
        {
          testMethod: 'Update Related Contacts',
          before: { try1: 12.805, try2: 12.383, try3: 12.467, average: 12.552 },
          after: { try1: 9.631, try2: 11.211, try3: 11.234, average: 10.692 },
          improvement: 14.82
        }
      ],
      technicalDetails: 'Comprehensive profiling across 7 test scenarios with 3 trials each to establish baseline performance. Implemented Handler/Helper pattern to separate orchestration from business logic. Optimized SOQL queries using relationship queries to reduce query count. Enforced bulkification patterns at architecture level. Measured improvements ranging from 12.24% to 38.21% across different operation types.',
      projectMeta: {
        duration: '6 weeks',
        teamSize: '1 Senior Salesforce Architect, 1 Performance Specialist',
        industry: 'Professional Services',
        companySize: 'Enterprise (1000+ employees)',
        region: 'Europe'
      },
      keyInsight: 'The real problem wasn\'t the triggers themselves—it was years of accumulated technical debt creating cascading performance issues. Systematic profiling revealed redundant processing paths that weren\'t visible in code reviews. The data doesn\'t lie: 40% of processing was completely unnecessary.',
      lessonsLearned: [
        'Comprehensive profiling with realistic data volumes (200 records) before refactoring is essential—unit tests with 1-5 records missed the real performance issues',
        'Bulkification patterns must be enforced at the architecture level through Handler/Helper separation, not just hoped for in individual methods',
        'Multiple test trials (3 per scenario) revealed performance variance—single runs can be misleading due to Salesforce\'s multi-tenant caching'
      ]
    },
    'ux-ui-modernization': {
      client: 'MEDICAL DEVICE MANUFACTURER',
      title: 'From "Spaghetti Logic" to a Seamless Sales Wizard',
      heroImage: '/images/case-studies/ux-ui-modernization.png',
      clientDescription: 'A medical device manufacturer with a complex portfolio spanning multiple product categories, requiring sophisticated lead qualification and territory-based owner assignment across 50+ countries.',
      challenge: 'Visual tools are great—until they aren\'t. The client\'s "New Lead" process had grown into a massive, unmanageable Salesforce Flow with hundreds of decision nodes, undocumented loops, and legacy Aura components. What started as simple logic had mutated into a maintenance nightmare. The cost of this complexity was paralyzing the IT team: "What should take 2 hours was taking 2 days." User errors were rampant due to confusing single-screen forms.',
      solution: 'We didn\'t just patch the Flow; we launched a complete modernization initiative. We replaced the monolithic backend process with a modular Lightning Web Component architecture featuring progressive disclosure, modern UI patterns, and intelligent territory-based owner suggestions.',
      solutionSteps: [
        '3-Step Progressive Disclosure Wizard: Broke the process into intuitive stages (Product Interest → Fulfillment & Ownership → Review & Confirm), reducing cognitive load and user errors by 60%',
        'Modern UI Patterns: Replaced standard dropdowns with visual "Pill Selectors" and "Card Layouts" for faster data entry, plus country-based category/brand filtering via custom metadata',
        'Territory-Based Owner Suggestions: Integrated Team Map Modal showing top 3 suggested owners based on account territory, category, and brand context',
        'Client-Side Validation: Real-time validation prevents errors before server submission, with comprehensive field validation and country-specific dealer requirements'
      ],
      results: [
        '70% Maint. Time Cut',
        '3x Faster Deployment',
        '100% Better UX'
      ],
      technologies: ['Lightning Web Components', 'Progressive Disclosure', 'Custom Metadata', 'Territory Management', 'Client-Side Validation'],
      technicalDetails: 'Modular Lightning Web Component architecture with parent component orchestrating child components for each wizard stage. Country-based filtering via custom metadata. Territory-based owner suggestions using territory management for intelligent assignment. Client-side validation with comprehensive error handling. Comprehensive documentation for maintainability.',
      projectMeta: {
        duration: '2 months',
        teamSize: '2 Lightning Web Component Developers, 1 UX Designer',
        industry: 'Medical Devices',
        companySize: 'Enterprise (5000+ employees)',
        region: 'Europe'
      },
      keyInsight: 'The "spaghetti Flow" wasn\'t just a technical problem—it was a user experience problem. By breaking it into intuitive steps with modern UI patterns and intelligent owner suggestions, we didn\'t just fix the code, we transformed how users interact with the system. Maintenance time dropped 70% because the code finally made sense.',
      lessonsLearned: [
        'Progressive disclosure (3-step wizard) reduced user errors by 60% compared to single-screen forms—cognitive load matters more than we thought',
        'Territory-based owner suggestions eliminated the "who should own this?" question that was slowing down lead creation by 40%',
        'Modular LWC architecture made future enhancements 3x faster—adding a new field to the wizard now takes minutes, not days'
      ]
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
        <div class="case-study-back-nav">
        <a href="/case-studies" class="back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <span>Back to Case Studies</span>
        </a>
        </div>
        
        <article class="case-study-detail">
          <!-- Hero Section -->
          <div class="case-study-hero">
            <div class="case-study-hero-meta">
            <span class="case-study-tag">CASE STUDY</span>
              <span class="case-study-industry-tag">${caseStudy.projectMeta?.industry || 'Enterprise'}</span>
            </div>
            <h1 class="case-study-hero-title">${caseStudy.title}</h1>
            <div class="case-study-hero-client">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>
                <path d="M4 17C4 14 6 12 10 12C14 12 16 14 16 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>${caseStudy.client}</span>
            </div>
            ${caseStudy.technologies ? `
              <div class="case-study-tech-tags">
                ${caseStudy.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Main Layout: Two Columns -->
          <div class="case-study-layout">
            <!-- Main Content Column -->
            <div class="case-study-main">
              ${caseStudy.heroImage ? `
                <div class="case-study-hero-image">
                  <img src="${caseStudy.heroImage}" alt="${caseStudy.client}" />
                </div>
              ` : ''}
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2 class="case-study-section-title">The Results</h2>
                </div>
                <div class="case-study-results-grid-new">
                  ${caseStudy.results.map((result, index) => `
                    <div class="case-study-result-card" style="animation-delay: ${index * 0.1}s">
                      <div class="result-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <span class="result-card-text">${result}</span>
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
                              <td class="metric-name">${result.testMethod}</td>
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
                
                ${caseStudy.keyInsight ? `
                  <div class="case-study-key-insight-card">
                    <div class="key-insight-badge">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <span>Key Insight</span>
                    </div>
                    <p class="key-insight-quote">"${caseStudy.keyInsight}"</p>
                  </div>
                ` : ''}
              </section>

              ${caseStudy.lessonsLearned && caseStudy.lessonsLearned.length > 0 ? `
                <section class="case-study-content-section lessons-learned-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon lessons-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">Lessons Learned</h2>
                  </div>
                  <ul class="lessons-learned-list">
                    ${caseStudy.lessonsLearned.map(lesson => `
                      <li>${lesson}</li>
                    `).join('')}
                  </ul>
                </section>
              ` : ''}
            </div>

            <!-- Sidebar Column -->
            <aside class="case-study-sidebar">
              ${caseStudy.projectMeta ? `
                <div class="case-study-sidebar-card project-meta-card">
                  <h3 class="sidebar-card-title">Project Overview</h3>
                  <div class="project-meta-list">
                    ${caseStudy.projectMeta.duration ? `
                      <div class="project-meta-item">
                        <span class="meta-label">Duration</span>
                        <span class="meta-value">${caseStudy.projectMeta.duration}</span>
                      </div>
                    ` : ''}
                    ${caseStudy.projectMeta.teamSize ? `
                      <div class="project-meta-item">
                        <span class="meta-label">Team Size</span>
                        <span class="meta-value">${caseStudy.projectMeta.teamSize}</span>
                      </div>
                    ` : ''}
                    ${caseStudy.projectMeta.industry ? `
                      <div class="project-meta-item">
                        <span class="meta-label">Industry</span>
                        <span class="meta-value">${caseStudy.projectMeta.industry}</span>
                      </div>
                    ` : ''}
                    ${caseStudy.projectMeta.companySize ? `
                      <div class="project-meta-item">
                        <span class="meta-label">Company Size</span>
                        <span class="meta-value">${caseStudy.projectMeta.companySize}</span>
                      </div>
                    ` : ''}
                    ${caseStudy.projectMeta.region ? `
                      <div class="project-meta-item">
                        <span class="meta-label">Region</span>
                        <span class="meta-value">${caseStudy.projectMeta.region}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              ` : ''}

              <div class="case-study-sidebar-card technical-card">
                <div class="technical-card-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  <h3 class="sidebar-card-title">Technical Approach</h3>
                </div>
                <p class="sidebar-card-text">${caseStudy.technicalDetails || 'We performed comprehensive profiling and refactoring of trigger handlers, implementing a clean architecture pattern that separates concerns and optimizes database operations.'}</p>
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
    
    // Add layout switcher function
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
            testMethod: 'Bulk Account Insertion',
            before: { try1: 28.874, try2: 31.572, try3: 27.921, average: 29.456 },
            after: { try1: 19.542, try2: 23.236, try3: 24.968, average: 22.582 },
            improvement: 23.34
          },
          {
            testMethod: 'Create Entitlement',
            before: { try1: 4.015, try2: 3.944, try3: 5.146, average: 4.368 },
            after: { try1: 2.981, try2: 2.994, try3: 3.438, average: 3.138 },
            improvement: 28.17
          },
          {
            testMethod: 'Account Segmentation Insert',
            before: { try1: 6.389, try2: 7.001, try3: 6.978, average: 6.789 },
            after: { try1: 4.299, try2: 3.949, try3: 4.337, average: 4.195 },
            improvement: 38.21
          },
          {
            testMethod: 'Account Segmentation Update',
            before: { try1: 16.220, try2: 13.996, try3: 16.744, average: 15.653 },
            after: { try1: 11.481, try2: 10.974, try3: 10.921, average: 11.125 },
            improvement: 28.93
          },
          {
            testMethod: 'Update Account Info',
            before: { try1: 3.664, try2: 3.927, try3: 4.103, average: 3.898 },
            after: { try1: 2.715, try2: 4.411, try3: 3.137, average: 3.421 },
            improvement: 12.24
          },
          {
            testMethod: 'Update Record Type',
            before: { try1: 6.134, try2: 5.518, try3: 7.511, average: 6.388 },
            after: { try1: 4.459, try2: 7.125, try3: 4.576, average: 5.387 },
            improvement: 15.67
          },
          {
            testMethod: 'Update Related Contacts',
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
          <td class="test-method-cell">${result.testMethod}</td>
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
      padding: 0;
      padding-top: 80px;
      min-height: calc(100vh - 100px);
      background: #FAFBFC;
    }

    @media (max-width: 768px) {
      .case-study-detail-page {
        padding-top: 70px;
      }
    }

    .case-study-detail-page .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0;
    }

    .case-study-back-nav {
      padding: 2rem 2rem 1.5rem;
    }

    @media (max-width: 768px) {
      .case-study-back-nav {
        padding: 1.5rem 1.5rem 1.25rem;
      }
    }

    .case-study-detail-page .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 600;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      transition: all 0.2s ease;
      background: var(--white);
      border: 1.5px solid #E0E7FF;
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.08);
    }

    @media (max-width: 768px) {
      .case-study-detail-page .back-link {
        font-size: 0.875rem;
        padding: 0.5rem 0.875rem;
      }
    }

    .case-study-detail-page .back-link:hover {
      color: var(--white);
      background: var(--bright-blue);
      border-color: var(--bright-blue);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
      transform: translateY(-1px);
    }

    .case-study-detail-page .back-link svg {
      transition: transform 0.2s ease;
      width: 20px;
      height: 20px;
    }

    .case-study-detail-page .back-link:hover svg {
      transform: translateX(-2px);
    }

    .case-study-detail {
      max-width: 100%;
      margin: 0;
      background: var(--white);
      overflow: visible;
    }

    /* Hero Image Inside Content */
    .case-study-main .case-study-hero-image {
      position: relative;
      width: 100%;
      height: 380px;
      overflow: hidden;
      border-radius: 12px;
      margin-bottom: 3rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .case-study-main .case-study-hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
    }

    @media (max-width: 768px) {
      .case-study-main .case-study-hero-image {
        height: 240px;
        margin-bottom: 2rem;
        border-radius: 8px;
      }
    }

    /* Hero Section */
    .case-study-hero {
      background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
      color: var(--white);
      padding: 3rem 2rem 2.5rem;
      margin-bottom: 0;
      position: relative;
    }

    @media (max-width: 768px) {
      .case-study-hero {
        padding: 2rem 1.5rem 1.75rem;
      }
    }

    .case-study-hero-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
    }

    .case-study-tag {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: var(--white);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .case-study-industry-tag {
      display: inline-block;
      background: var(--color-green);
      color: var(--white);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
    }

    .case-study-hero-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      margin: 0 0 1rem 0;
      line-height: 1.25;
      max-width: 900px;
      letter-spacing: -0.01em;
    }

    @media (max-width: 768px) {
      .case-study-hero-title {
        font-size: 1.5rem;
        margin-bottom: 0.875rem;
      }
    }

    .case-study-hero-client {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.95);
      font-size: 0.875rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .case-study-hero-client svg {
      flex-shrink: 0;
      opacity: 0.9;
      width: 18px;
      height: 18px;
    }

    /* Technology Tags */
    .case-study-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .tech-tag {
      background: rgba(255, 255, 255, 0.18);
      color: rgba(255, 255, 255, 0.98);
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.3125rem 0.75rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
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
      grid-template-columns: 1fr 340px;
      gap: 3rem;
      align-items: start;
      margin-top: 0;
      padding: 3rem 2rem 4rem;
      max-width: 1280px;
      margin: 0 auto;
    }

    @media (max-width: 1024px) {
      .case-study-layout {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: 2.5rem 2rem 3.5rem;
      }
    }

    @media (max-width: 768px) {
      .case-study-layout {
        padding: 2rem 1.5rem 3rem;
        gap: 2rem;
      }
    }

    .case-study-main {
      display: flex;
      flex-direction: column;
      gap: 0;
      min-width: 0;
    }

    /* Content Sections */
    .case-study-content-section {
      background: var(--white);
      border-radius: 0;
      padding: 2.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #F1F5F9;
    }

    .case-study-content-section:first-of-type {
      padding-top: 0;
    }

    .case-study-content-section:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
    }

    .lessons-learned-section:last-of-type {
      padding-bottom: 2rem;
      margin-bottom: 0;
    }

    .challenge-section {
      background: linear-gradient(135deg, #FEF7F0 0%, #FFF5ED 100%);
      border-left: 3px solid #F97316;
      padding: 2rem;
      margin: 0;
      border-radius: 8px;
      border-bottom: 1px solid #F1F5F9;
      box-shadow: 0 1px 3px rgba(249, 115, 22, 0.08);
    }

    @media (max-width: 768px) {
      .challenge-section {
        padding: 1.5rem;
      }
    }

    .proof-section {
      background: var(--white);
    }

    .case-study-section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.875rem;
    }

    .case-study-section-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .user-icon {
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      color: var(--bright-blue);
    }

    .challenge-icon {
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #EF4444;
    }

    .solution-icon {
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      color: var(--bright-blue);
    }

    .proof-icon {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: var(--green);
    }

    .lessons-icon {
      background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
      color: var(--bright-blue);
    }

    .case-study-section-title {
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    @media (max-width: 768px) {
      .case-study-section-title {
        font-size: 1.25rem;
      }
    }

    .case-study-section-text {
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin: 0;
      font-weight: 400;
    }

    /* Solution Steps */
    .case-study-solution-steps {
      list-style: none;
      padding: 0;
      margin: 1.25rem 0 0 0;
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
      background: linear-gradient(135deg, var(--bright-blue) 0%, var(--color-primary) 100%);
      color: var(--white);
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.9375rem;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2);
    }

    .step-text {
      flex: 1;
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      padding-top: 0.25rem;
      font-weight: 400;
    }

    /* Results Grid (Legacy) */
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

    /* New Results Grid */
    .case-study-results-grid-new {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin: 1.5rem 0;
    }

    .case-study-result-card {
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      border: 1px solid rgba(16, 185, 129, 0.2);
      padding: 1.5rem 1.25rem;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.875rem;
      animation: fadeInUp 0.5s ease forwards;
      opacity: 0;
      transform: translateY(10px);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.06);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .case-study-result-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .result-card-icon {
      width: 40px;
      height: 40px;
      background: rgba(16, 185, 129, 0.15);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-green);
    }

    .result-card-text {
      font-weight: 700;
      font-size: 0.9375rem;
      color: #065F46;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .case-study-results-grid-new {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1024px) and (min-width: 769px) {
      .case-study-results-grid-new {
        grid-template-columns: repeat(2, 1fr);
      }
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

    .testimonial-author {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(59, 130, 246, 0.2);
    }

    .testimonial-author span {
      color: var(--text-light);
      font-size: 0.875rem;
      font-style: normal;
    }

    /* Key Insight Box (Legacy) */
    .case-study-key-insight {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      border-left: 4px solid #F59E0B;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .key-insight-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: rgba(245, 158, 11, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #D97706;
    }

    .key-insight-content {
      flex: 1;
    }

    .key-insight-title {
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #92400E;
      margin: 0 0 0.5rem 0;
    }

    .key-insight-text {
      font-size: 1rem;
      color: var(--text-dark);
      line-height: 1.6;
      margin: 0;
      font-weight: 500;
    }

    /* New Key Insight Card */
    .case-study-key-insight-card {
      background: linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%);
      border-radius: 12px;
      padding: 2rem;
      margin-top: 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
    }

    .case-study-key-insight-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
    }

    .key-insight-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.15);
      color: #FDE68A;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-bottom: 1rem;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .key-insight-badge svg {
      width: 14px;
      height: 14px;
    }

    .key-insight-quote {
      font-size: 1rem;
      color: white;
      line-height: 1.7;
      margin: 0;
      font-weight: 500;
      font-style: italic;
      position: relative;
      z-index: 1;
    }


    /* Lessons Learned Section */
    .lessons-learned-section {
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border-left: 3px solid var(--bright-blue);
      padding: 2rem;
      margin: 0;
      margin-bottom: 0;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(59, 130, 246, 0.08);
    }

    .lessons-learned-section:last-of-type {
      padding-bottom: 2rem;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .lessons-learned-section {
        padding: 1.5rem;
      }

      .lessons-learned-section:last-of-type {
        padding-bottom: 1.5rem;
      }
    }

    .lessons-learned-section .lessons-icon {
      background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
      color: var(--bright-blue);
    }

    .lessons-learned-list {
      list-style: none;
      padding: 0;
      margin: 1.25rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    .lessons-learned-list li {
      position: relative;
      padding-left: 1.75rem;
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
    }

    .lessons-learned-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--bright-blue);
      font-weight: 700;
      font-size: 1.125rem;
    }

    /* Project Meta Sidebar Card */
    .project-meta-card {
      margin-bottom: 0;
    }

    .project-meta-list {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      margin-top: 1rem;
    }

    .project-meta-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 0.875rem;
      border-bottom: 1px solid #F1F5F9;
    }

    .project-meta-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .meta-label {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .meta-value {
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      font-weight: 700;
      text-align: right;
      max-width: 60%;
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

    }

    /* Sidebar */
    .case-study-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: sticky;
      top: 1.5rem;
    }

    .case-study-sidebar-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .case-study-sidebar-card:hover {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }

    .sidebar-card-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .sidebar-card-text {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
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
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border: 2px solid var(--bright-blue);
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);
    }

    /* Technical Card Sidebar */
    .technical-card {
      background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
      border: 1px solid #E2E8F0;
    }

    .technical-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.625rem;
    }

    .technical-card-header svg {
      color: var(--bright-blue);
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .technical-card .sidebar-card-title {
      margin: 0;
    }

    .technical-card .sidebar-card-text {
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .sidebar-cta-button {
      background: var(--bright-blue);
      color: var(--white);
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2);
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
      .case-study-detail {
        border-radius: 16px;
      }

      .case-study-content-section {
        padding: 2rem 0;
      }

      .case-study-layout {
        gap: 2.5rem;
      }


      .case-study-key-insight {
        flex-direction: column;
        gap: 0.75rem;
      }

      .key-insight-icon {
        width: 32px;
        height: 32px;
      }

      .project-meta-item {
        flex-direction: column;
        gap: 0.25rem;
      }

      .meta-value {
        max-width: 100%;
        text-align: left;
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
      display: block;
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
