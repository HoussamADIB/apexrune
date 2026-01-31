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
          <!-- Case Study 1: Account 360 Dashboard (HIGH INTEREST - Comprehensive unified view, high impact) -->
          <a href="/case-study/account-360-dashboard" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/account-360-dashboard.png" alt="Account 360 Dashboard case study showing unified account management interface for global manufacturer" class="case-study-image" />
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

          <!-- Case Study 2: Revenue Lifecycle Management (HIGH INTEREST - Advanced CPQ, sub-second pricing) -->
          <a href="/case-study/revenue-lifecycle-management" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/revenue-lifecycle-management.png" alt="Revenue Lifecycle Management case study showcasing dynamic CPQ with real-time ERP pricing for industrial manufacturer" class="case-study-image" />
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

          <!-- Case Study 3: Platform Paralysis (MOST INTERESTING - High impact performance optimization) -->
          <a href="/case-study/platform-paralysis" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/platform-paralysis.png" alt="Platform Paralysis case study demonstrating agile Salesforce transformation for professional services firm" class="case-study-image" />
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

          <!-- Case Study 4: Event Management Dashboard (MEDIUM-HIGH INTEREST - Real-time Platform Events) -->
          <a href="/case-study/event-management-dashboard" class="case-study-card">
            <div class="case-study-image-wrapper">
              <img src="/images/case-studies/event-management-dashboard.png" alt="Event Management Dashboard case study displaying intelligent event tracking system for marketing organization" class="case-study-image" />
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
              <img src="/images/case-studies/ux-ui-modernization.png" alt="UX/UI Modernization case study featuring Lightning Web Components redesign for medical device manufacturer" class="case-study-image" />
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
      clientDescription: 'A global manufacturer with complex product portfolios spanning multiple subscription tiers (Tier 1, Tier 2, Tier 3, Tier 4) across 10+ product lines, requiring comprehensive account intelligence for field sales teams.',
      challenge: 'Sales representatives spent an average of 2-3 hours per account researching product subscriptions, engagement history, and critical attention points before important meetings. With data scattered across subscription records, activities, and custom objects, reps struggled to get a complete picture, leading to missed upsell opportunities and unprepared client conversations.',
      solution: 'We designed and implemented a comprehensive Account 360 dashboard that consolidates account intelligence into a single, unified view. The solution combines visual account flags, real-time activity scorecards, and intelligent attention points—all optimized for mobile field sales.',
      solutionSteps: [
        'Visual Flag System: 10+ product subscription indicators with priority logic (Tier 4 > Tier 3 > Tier 2 > Tier 1) derived from subscription records, showing active/expired status at-a-glance',
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
      technicalDetails: 'The dashboard combines three main features: visual flags showing subscription status, an activity scorecard tracking engagement, and intelligent attention points that automatically surface critical account information. All data is optimized for fast loading and works seamlessly across devices.',
      projectMeta: {
        duration: '3 months',
        teamSize: '2 Salesforce Developers, 1 Technical Architect',
        industry: 'Manufacturing',
        companySize: 'Enterprise (5000+ employees)',
        region: 'Global'
      },
      keyInsight: 'The breakthrough wasn\'t the technology—it was understanding that sales reps needed answers, not data dumps. By surfacing critical information automatically through visual flags and intelligent attention points, we eliminated the "analysis paralysis" that was killing productivity. The visual flag system alone reduced cognitive load by 60%.',
      lessonsLearned: [
        'Configurable attention points mean business users can add new information displays without waiting for developers—changes happen in minutes, not weeks',
        'Mobile-first design was critical—60% of users access the dashboard on tablets during client visits, so it had to work perfectly on smaller screens',
        'Performance optimization was essential: the dashboard loads 73% faster than traditional approaches, even for accounts with 100+ related records'
      ],
      // New sections for Account 360
      hasVisualElements: true,
      components: [
        {
          name: 'Visual Flag System',
          description: 'At-a-glance subscription status indicators',
          role: 'Sales reps instantly see which products each account has, eliminating time spent searching through records'
        },
        {
          name: 'Activity Scorecard',
          description: 'Real-time engagement tracking',
          role: 'See all account interactions—calls, emails, meetings—in one place, helping reps prepare better for client conversations'
        },
        {
          name: 'Intelligent Attention Points',
          description: 'Automatically surfaces critical information',
          role: 'Highlights important account details like upcoming renewals, outstanding issues, or opportunities—no manual searching required'
        }
      ],
      userJourney: {
        before: [
          { step: 1, action: 'Open Account record', time: '5 seconds' },
          { step: 2, action: 'Navigate to Subscriptions tab', time: '30 seconds' },
          { step: 3, action: 'Check each subscription manually', time: '2-3 minutes' },
          { step: 4, action: 'Navigate to Activities tab', time: '30 seconds' },
          { step: 5, action: 'Review activity history', time: '1-2 minutes' },
          { step: 6, action: 'Check custom objects for attention points', time: '1-2 minutes' }
        ],
        after: [
          { step: 1, action: 'Open Account record', time: '5 seconds' },
          { step: 2, action: 'View Account 360 dashboard (all information visible)', time: '5 seconds' }
        ],
        timeSaved: '95% reduction (from 5-8 minutes to 5 seconds)'
      }
    },
    'revenue-lifecycle-management': {
      client: 'INDUSTRIAL MANUFACTURER',
      title: 'Revenue Lifecycle Management: Real-Time ERP Pricing That Closes Deals',
      heroImage: '/images/case-studies/revenue-lifecycle-management.png',
      clientDescription: 'An industrial manufacturer with 50,000+ products requiring real-time pricing from their ERP system during quote and order creation.',
      challenge: 'Sales teams were losing deals during customer meetings—reps couldn\'t provide accurate quotes without manual ERP lookups. By the time they called customers back, competitors had already closed the deal. Pricing errors led to order rejections, costing 5% in annual revenue leakage.',
      problemMetrics: {
        before: [
          '30% of quotes contained pricing errors',
          'Quote generation: 2-3 days',
          '1 in 5 deals lost due to delays',
          '5% annual revenue leakage'
        ],
        industryStats: [
          '88% of B2B manufacturers report lost deals from manual quoting',
          '40% reduction in errors possible with automation'
        ]
      },
      solution: 'We implemented a Revenue Lifecycle Management solution that makes ERP pricing invisible to users. Sales teams can now provide accurate, customer-specific pricing in real-time during meetings—all happening seamlessly in the background. The solution leverages Salesforce Industries CPQ with prehook processing, intercepting transactions before commit to inject real-time ERP pricing and inventory data.',
      solutionSteps: [
        'Prehook Processing Engine: Intercepts transactions before commit, enabling seamless ERP pricing injection—users see pricing appear instantly',
        'Customer-Specific Pricing: Returns three pricing tiers (base, retail, customer-specific) enabling dynamic pricing strategies',
        'Combined Pricing + Inventory: Single ERP callout returns both pricing and availability, preventing quotes for unavailable products',
        'Smart Optimization: Prevents duplicate pricing calls (saves 40% API costs) and optimizes bulk processing',
        'Unified Transaction Management Component: Single component dynamically handles all Orders and Quotes with intelligent transaction type detection'
      ],
      hasVisualElements: true,
      rlmFlow: {
        steps: [
          { step: 1, title: 'User Adds Products', description: 'Sales rep adds products to quote/order during customer meeting' },
          { step: 2, title: 'Prehook Intercepts', description: 'Prehook processor intercepts transaction context before commit' },
          { step: 3, title: 'Extract Product Data', description: 'System extracts product IDs and quantities from transaction' },
          { step: 4, title: 'Map to ERP SKUs', description: 'Product2 IDs mapped to Article__c (SKU) codes for ERP compatibility' },
          { step: 5, title: 'Single ERP Callout', description: 'Combined pricing + inventory callout handles all products at once' },
          { step: 6, title: 'Receive Pricing Data', description: 'ERP returns basePrice, retailPrice, and customerPrice for each product' },
          { step: 7, title: 'Update Transaction', description: 'Pricing attributes updated seamlessly via tag-based architecture' },
          { step: 8, title: 'User Sees Result', description: 'Accurate pricing appears instantly—user never knows ERP callout happened' }
        ]
      },
      keyFeatures: [
        {
          name: 'Invisible Integration',
          description: 'ERP pricing appears automatically—users don\'t know a callout is happening',
          benefit: 'Zero workflow changes, no training required'
        },
        {
          name: 'Customer-Specific Pricing',
          description: 'Three pricing tiers: base, retail, and customer-specific',
          benefit: 'Enables dynamic pricing strategies and shows customers their exact pricing'
        },
        {
          name: 'Real-Time Inventory',
          description: 'Combined pricing + availability in single callout',
          benefit: 'Prevents quoting unavailable products, reduces rejections'
        },
        {
          name: 'Unified Transaction Management',
          description: 'Single component handles all Orders and Quotes dynamically',
          benefit: 'Consistent experience, automatic transaction type detection'
        }
      ],
      beforeAfter: {
        before: {
          title: 'Before RLM',
          scenario: 'Sales rep in meeting → Can\'t provide quote → Must call office → Wait for ERP lookup → Often wrong price → Deal lost',
          metrics: [
            'Quote generation: 2-3 days',
            '30% error rate',
            '5% revenue leakage'
          ]
        },
        after: {
          title: 'After RLM',
          scenario: 'Sales rep in meeting → Adds products → Pricing appears instantly → Accurate customer-specific pricing → Deal closed',
          metrics: [
            'Quote generation: Minutes',
            '98% accuracy',
            'Zero pricing-related rejections'
          ]
        }
      },
      results: [
        'Sub-second pricing response times (800ms average)',
        '98% pricing accuracy (up from 75%)',
        '60% faster quote generation',
        '5% annual revenue recovered'
      ],
      technologies: ['Salesforce Industries CPQ', 'Prehook Processing', 'Context API', 'REST APIs', 'Tag-Based Architecture', 'ERP Integration', 'Lightning Web Components', 'Apex Controllers'],
      technicalDetails: 'Prehook processing with tag-based data access via Industries Context API. Bulk product processing with single ERP callout per transaction. Unified Lightning Web Component architecture handling all Orders and Quotes dynamically.',
      projectMeta: {
        duration: '4 months',
        teamSize: '2 Salesforce Developers, 1 CPQ Specialist, 1 ERP Integration Expert',
        industry: 'Manufacturing',
        companySize: 'Enterprise (3000+ employees)',
        region: 'North America'
      },
      keyInsight: 'The breakthrough was making ERP pricing invisible to users. Sales reps can now provide accurate, customer-specific pricing during meetings without knowing an ERP callout is happening. This eliminated pricing delays, reduced errors by 40%, and recovered 5% in annual revenue.',
      lessonsLearned: [
        'Smart filtering prevented 40% of unnecessary ERP calls, reducing API costs and improving performance',
        'Customer-specific pricing became the key differentiator—enabling dynamic pricing strategies competitors couldn\'t match',
        'Unified component architecture reduced maintenance overhead by 60% while ensuring consistent user experience',
        'Combined pricing + inventory in single callout eliminated order rejections and improved customer satisfaction'
      ],
      screenshotPlaceholders: [
        {
          title: 'Product Discovery Flow',
          description: 'Visual showing the product discovery and pricing flow from product selection to pricing display',
          placeholder: '/images/case-studies/screenshots/rlm-product-discovery-flow.png',
          tags: ['Process Flow', 'Product Discovery']
        },
        {
          title: 'Unified Transaction Management Component - Product Selection',
          description: 'Screenshot showing the unified component\'s product selection interface with advanced filtering, real-time search, and inventory status indicators (in-stock, low stock, out-of-stock)',
          placeholder: '/images/case-studies/screenshots/rlm-product-selection.png',
          tags: ['Unified Component', 'Product Selection', 'Inventory', 'Filtering']
        },
        {
          title: 'Unified Transaction Management Component - Line Items',
          description: 'Screenshot showing the unified component\'s line items management interface with discount management, approval calculations, and bundle configuration',
          placeholder: '/images/case-studies/screenshots/rlm-line-items.png',
          tags: ['Unified Component', 'Line Items', 'Discount Management']
        }
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
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18V6C3 4.89543 3.89543 4 5 4H8C9.10457 4 10 4.89543 10 6V18M3 18H17M3 18H1M10 18H17M10 18V10C10 8.89543 10.8954 8 12 8H15C16.1046 8 17 8.89543 17 10V18M17 18H19M6 8H6.01M6 12H6.01M13 8H13.01M13 12H13.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>${caseStudy.client}</span>
            </div>
            ${caseStudy.technologies ? `
              <div class="case-study-tech-tags">
                ${caseStudy.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            ` : ''}
            
            <div class="case-study-share-buttons">
              <span class="share-label">Share:</span>
              <button class="share-btn share-linkedin" onclick="shareOnLinkedIn('${caseStudy.id}', '${encodeURIComponent(caseStudy.title)}')" title="Share on LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button class="share-btn share-twitter" onclick="shareOnTwitter('${caseStudy.id}', '${encodeURIComponent(caseStudy.title)}')" title="Share on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button class="share-btn share-copy" onclick="copyShareLink('${caseStudy.id}')" title="Copy link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18V6C3 4.89543 3.89543 4 5 4H8C9.10457 4 10 4.89543 10 6V18M3 18H17M3 18H1M10 18H17M10 18V10C10 8.89543 10.8954 8 12 8H15C16.1046 8 17 8.89543 17 10V18M17 18H19M6 8H6.01M6 12H6.01M13 8H13.01M13 12H13.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">The Client</h2>
                  </div>
                  <p class="case-study-section-text">${caseStudy.clientDescription}</p>
                </section>
              ` : ''}

                <!-- RLM Screenshots Section - Moved to Top -->
                ${caseStudy.screenshotPlaceholders ? `
                <section class="case-study-content-section screenshots-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon screenshot-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                        <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">RLM Implementation Visualizations</h2>
                  </div>
                  <p class="case-study-section-text">Visual representations of the Revenue Lifecycle Management solution showing real-time pricing, product discovery flow, and customer-specific pricing capabilities.</p>
                  
                  <div class="screenshots-grid">
                    ${caseStudy.screenshotPlaceholders.map((screenshot, index) => `
                      <div class="screenshot-card ${index === 0 ? 'screenshot-card-full' : ''}">
                        <div class="screenshot-image-container" onclick="openScreenshotModal('${screenshot.placeholder}', '${screenshot.title}')">
                          <img src="${screenshot.placeholder}" alt="${screenshot.title}" class="screenshot-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                          <div class="screenshot-placeholder" style="display: none;">
                            <div class="screenshot-placeholder-content">
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                                <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>Image Placeholder</span>
                              <p>Add anonymized screenshot: ${screenshot.title}</p>
                            </div>
                          </div>
                          <div class="screenshot-overlay-hint">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                          </div>
                        </div>
                        <div class="screenshot-info">
                          <h4 class="screenshot-title">${screenshot.title}</h4>
                          <p class="screenshot-description">${screenshot.description}</p>
                          <div class="screenshot-tags">
                            ${screenshot.tags.map(tag => `<span class="screenshot-tag">${tag}</span>`).join('')}
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                  
                  <!-- Screenshot Modal -->
                  <div id="screenshot-modal" class="screenshot-modal" onclick="closeScreenshotModal(event)">
                    <button class="screenshot-modal-close" onclick="closeScreenshotModal(event)" aria-label="Close">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <div class="screenshot-modal-zoom-controls">
                      <button class="zoom-btn" onclick="zoomScreenshotIn(event)" title="Zoom in">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="M21 21l-4.35-4.35"/>
                          <line x1="11" y1="8" x2="11" y2="14"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </button>
                      <button class="zoom-btn" onclick="zoomScreenshotOut(event)" title="Zoom out">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="M21 21l-4.35-4.35"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </button>
                      <button class="zoom-btn" onclick="resetScreenshotZoom(event)" title="Reset zoom">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                          <path d="M3 3v5h5"/>
                        </svg>
                      </button>
                    </div>
                    <div class="screenshot-modal-content" onclick="event.stopPropagation()">
                      <img id="screenshot-modal-image" src="" alt="" class="screenshot-modal-img" />
                      <div class="screenshot-modal-title" id="screenshot-modal-title"></div>
                    </div>
                  </div>
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
                
                ${caseStudy.problemMetrics ? `
                  <div class="problem-metrics-section">
                    <h3 class="metrics-section-title">The Problem in Numbers</h3>
                    <div class="metrics-grid">
                      <div class="metrics-column">
                        <h4 class="metrics-column-title">Before RLM Implementation</h4>
                        <ul class="metrics-list">
                          ${caseStudy.problemMetrics.before.map(metric => `
                            <li class="metric-item">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 10L8 13L15 6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>${metric}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                      <div class="metrics-column">
                        <h4 class="metrics-column-title">Industry Statistics</h4>
                        <ul class="metrics-list">
                          ${caseStudy.problemMetrics.industryStats.map(stat => `
                            <li class="metric-item">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2L12 8L18 8L13.5 12L15 18L10 15L5 18L6.5 12L2 8L8 8L10 2Z" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>${stat}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    </div>
                  </div>
                ` : ''}
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

              ${caseStudy.hasVisualElements && caseStudyId === 'revenue-lifecycle-management' ? `
                <!-- How It Works Section -->
                <section class="case-study-content-section architecture-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon architecture-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">How It Works</h2>
                  </div>
                  <p class="case-study-section-text">The prehook processor intercepts transactions seamlessly, making ERP pricing completely invisible to users. Here's how the 8-step Product Discovery Flow works behind the scenes:</p>
                  
                  ${caseStudy.rlmFlow ? `
                  <div class="rlm-flow-diagram">
                    ${caseStudy.rlmFlow.steps.map((flowStep, index) => `
                      <div class="rlm-flow-step">
                        <div class="rlm-flow-number">${flowStep.step}</div>
                        <div class="rlm-flow-content">
                          <h4 class="rlm-flow-title">${flowStep.title}</h4>
                          <p class="rlm-flow-description">${flowStep.description}</p>
                        </div>
                        ${index < caseStudy.rlmFlow.steps.length - 1 ? '<div class="rlm-flow-arrow"></div>' : ''}
                      </div>
                    `).join('')}
                  </div>
                  ` : ''}
                </section>

                <!-- Key Features Section -->
                ${caseStudy.keyFeatures ? `
                <section class="case-study-content-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon solution-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">Key Differentiators</h2>
                  </div>
                  <p class="case-study-section-text">What makes this solution special—the features that set it apart from traditional CPQ-ERP integrations:</p>
                  
                  <div class="key-features-grid">
                    ${caseStudy.keyFeatures.map((feature, index) => `
                      <div class="key-feature-card" style="animation-delay: ${index * 0.1}s">
                        <div class="key-feature-header">
                          <div class="key-feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <h3 class="key-feature-name">${feature.name}</h3>
                        </div>
                        <p class="key-feature-description">${feature.description}</p>
                        <div class="key-feature-benefit">
                          <strong>Benefit:</strong> ${feature.benefit}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </section>
                ` : ''}

                <!-- Before/After Comparison -->
                ${caseStudy.beforeAfter ? `
                <section class="case-study-content-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon proof-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">Before & After</h2>
                  </div>
                  
                  <div class="before-after-comparison">
                    <div class="comparison-column before-column">
                      <div class="comparison-header">
                        <h3 class="comparison-title">${caseStudy.beforeAfter.before.title}</h3>
                        <span class="comparison-badge before-badge">Old Process</span>
                      </div>
                      <div class="comparison-scenario">
                        <p class="scenario-text">${caseStudy.beforeAfter.before.scenario}</p>
                      </div>
                      <div class="comparison-metrics">
                        <h4 class="metrics-title">Metrics:</h4>
                        <ul class="comparison-metrics-list">
                          ${caseStudy.beforeAfter.before.metrics.map(metric => `
                            <li>
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 10L8 13L15 6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>${metric}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    </div>
                    
                    <div class="comparison-arrow">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <div class="comparison-column after-column">
                      <div class="comparison-header">
                        <h3 class="comparison-title">${caseStudy.beforeAfter.after.title}</h3>
                        <span class="comparison-badge after-badge">New Process</span>
                      </div>
                      <div class="comparison-scenario">
                        <p class="scenario-text">${caseStudy.beforeAfter.after.scenario}</p>
                      </div>
                      <div class="comparison-metrics">
                        <h4 class="metrics-title">Metrics:</h4>
                        <ul class="comparison-metrics-list">
                          ${caseStudy.beforeAfter.after.metrics.map(metric => `
                            <li>
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>${metric}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                ` : ''}
              ` : ''}

              ${caseStudy.hasVisualElements && caseStudyId === 'account-360-dashboard' ? `
                <!-- How It Works Section -->
                <section class="case-study-content-section architecture-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon architecture-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">How It Works</h2>
                  </div>
                  <p class="case-study-section-text">The dashboard brings together three key features that work seamlessly to give your sales team everything they need in one place. The interface adapts perfectly to any device—desktop, tablet, or mobile—so your team can access critical account information whether they're in the office or visiting clients.</p>
                  
                  <!-- Component Breakdown -->
                  ${caseStudy.components ? `
                  <div class="components-grid">
                    <div class="component-card" style="animation-delay: 0s">
                      <div class="component-card-header">
                        <div class="component-icon">1</div>
                        <h3 class="component-name">Visual Flag System</h3>
                      </div>
                      <p class="component-description">At-a-glance subscription status indicators</p>
                      <div class="component-benefit">
                        <span class="benefit-text">Sales reps instantly see which products each account has, eliminating time spent searching through records</span>
                      </div>
                    </div>
                    
                    <div class="component-card" style="animation-delay: 0.1s">
                      <div class="component-card-header">
                        <div class="component-icon">2</div>
                        <h3 class="component-name">Activity Scorecard</h3>
                      </div>
                      <p class="component-description">Real-time engagement tracking</p>
                      <div class="component-benefit">
                        <span class="benefit-text">See all account interactions—calls, emails, meetings—in one place, helping reps prepare better for client conversations</span>
                      </div>
                    </div>
                    
                    <div class="component-card" style="animation-delay: 0.2s">
                      <div class="component-card-header">
                        <div class="component-icon">3</div>
                        <h3 class="component-name">Intelligent Attention Points</h3>
                      </div>
                      <p class="component-description">Automatically surfaces critical information</p>
                      <div class="component-benefit">
                        <span class="benefit-text">Highlights important account details like upcoming renewals, outstanding issues, or opportunities—no manual searching required</span>
                      </div>
                    </div>
                  </div>
                  ` : ''}
                  
                  <!-- Simple Visual Flow -->
                  <div class="simple-flow-diagram compact">
                    <div class="flow-step">
                      <div class="flow-icon-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </div>
                      <h4>Multiple Data Sources</h4>
                      <p>Subscription records, activities, and account information</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                      <div class="flow-icon-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <h4>Smart Processing</h4>
                      <p>Data is organized and optimized for fast loading</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                      <div class="flow-icon-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                          <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <h4>Unified Dashboard</h4>
                      <p>Everything your team needs in one view</p>
                    </div>
                  </div>
                </section>

                <!-- Screenshot Placeholders -->
                <section class="case-study-content-section screenshots-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon screenshot-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                        <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">Dashboard Visualizations</h2>
                  </div>
                  <p class="case-study-section-text">Visual representations of the Account 360 dashboard showing the unified interface and component structure.</p>
                  
                  <div class="screenshots-grid">
                    <!-- Main Dashboard Screenshot -->
                    <div class="screenshot-card screenshot-card-full">
                      <div class="screenshot-image-container" onclick="openScreenshotModal('/images/case-studies/screenshots/account-360-complete-dashboard.png', 'Complete Dashboard View')">
                        <img src="/images/case-studies/screenshots/account-360-complete-dashboard.png" alt="Account 360 Dashboard - Full View" class="screenshot-image" />
                        <div class="screenshot-overlay-hint">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                          </svg>
                          <span>Click to view full size</span>
                        </div>
                      </div>
                      <div class="screenshot-info">
                        <h4 class="screenshot-title">Complete Dashboard View</h4>
                        <p class="screenshot-description">The full Account 360 dashboard showing all components working together—profiling metrics, flag system, news feed, and activity tracking in a unified interface</p>
                        <div class="screenshot-tags">
                          <span class="screenshot-tag">Unified Interface</span>
                          <span class="screenshot-tag">Complete View</span>
                        </div>
                      </div>
                    </div>

                    <!-- Account 360 Profiling Screenshot -->
                    <div class="screenshot-card">
                      <div class="screenshot-image-container" onclick="openScreenshotModal('/images/case-studies/screenshots/account-360-profiling.png', 'Account 360 Profiling')">
                        <img src="/images/case-studies/screenshots/account-360-profiling.png" alt="Account 360 Profiling Component" class="screenshot-image" />
                        <div class="screenshot-overlay-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="screenshot-info">
                        <h4 class="screenshot-title">Account 360 Profiling</h4>
                        <p class="screenshot-description">Comprehensive account metrics including open cases, contacts, sales performance (YTD and R12), leads, opportunities, and invoice tracking</p>
                        <div class="screenshot-tags">
                          <span class="screenshot-tag">Key Metrics</span>
                          <span class="screenshot-tag">Performance Tracking</span>
                        </div>
                      </div>
                    </div>

                    <!-- Flag System Screenshot -->
                    <div class="screenshot-card">
                      <div class="screenshot-image-container" onclick="openScreenshotModal('/images/case-studies/screenshots/account-360-flag-system.png', 'Flag System Detail')">
                        <img src="/images/case-studies/screenshots/account-360-flag-system.png" alt="Account 360 Flags Component" class="screenshot-image" />
                        <div class="screenshot-overlay-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="screenshot-info">
                        <h4 class="screenshot-title">Flag System Detail</h4>
                        <p class="screenshot-description">Visual indicators showing subscription status at-a-glance—green for active, red for expired, white for none</p>
                        <div class="screenshot-tags">
                          <span class="screenshot-tag">Instant Recognition</span>
                          <span class="screenshot-tag">Color-Coded</span>
                        </div>
                      </div>
                    </div>

                    <!-- Account News Screenshot -->
                    <div class="screenshot-card">
                      <div class="screenshot-image-container" onclick="openScreenshotModal('/images/case-studies/screenshots/account-360-news-feed.png', 'Account News Feed')">
                        <img src="/images/case-studies/screenshots/account-360-news-feed.png" alt="Account News Component" class="screenshot-image" />
                        <div class="screenshot-overlay-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="screenshot-info">
                        <h4 class="screenshot-title">Account News Feed</h4>
                        <p class="screenshot-description">Intelligent attention points and account updates—surfaces critical information like recently closed cases, product line changes, and important dates</p>
                        <div class="screenshot-tags">
                          <span class="screenshot-tag">Attention Points</span>
                          <span class="screenshot-tag">Smart Updates</span>
                        </div>
                      </div>
                    </div>

                    <!-- Activity Scorecard Screenshot -->
                    <div class="screenshot-card">
                      <div class="screenshot-image-container" onclick="openScreenshotModal('/images/case-studies/screenshots/account-360-activity-scorecard.png', 'Activity Scorecard')">
                        <img src="/images/case-studies/screenshots/account-360-activity-scorecard.png" alt="Activity Scorecard Component" class="screenshot-image" />
                        <div class="screenshot-overlay-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="screenshot-info">
                        <h4 class="screenshot-title">Activity Scorecard</h4>
                        <p class="screenshot-description">See all account interactions in one place—calls made, emails sent, meetings scheduled—helping reps prepare for conversations</p>
                        <div class="screenshot-tags">
                          <span class="screenshot-tag">Engagement History</span>
                          <span class="screenshot-tag">Real-time Updates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Screenshot Modal -->
                  <div id="screenshot-modal" class="screenshot-modal" onclick="closeScreenshotModal(event)">
                    <button class="screenshot-modal-close" onclick="closeScreenshotModal(event)" aria-label="Close">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <div class="screenshot-modal-zoom-controls">
                      <button class="zoom-btn" onclick="zoomScreenshotIn(event)" title="Zoom in">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="M21 21l-4.35-4.35"/>
                          <line x1="11" y1="8" x2="11" y2="14"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </button>
                      <button class="zoom-btn" onclick="zoomScreenshotOut(event)" title="Zoom out">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="M21 21l-4.35-4.35"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </button>
                      <button class="zoom-btn" onclick="resetScreenshotZoom(event)" title="Reset zoom">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                          <path d="M3 3v5h5"/>
                        </svg>
                      </button>
                    </div>
                    <div class="screenshot-modal-content" onclick="event.stopPropagation()">
                      <img id="screenshot-modal-image" src="" alt="" class="screenshot-modal-img" />
                      <div class="screenshot-modal-title" id="screenshot-modal-title"></div>
                    </div>
                  </div>
                </section>

                <!-- Configurable Attention Points -->
                <section class="case-study-content-section metadata-flow-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon metadata-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">Configurable Without Code</h2>
                  </div>
                  <p class="case-study-section-text">One of the biggest advantages: your business team can add new attention points or change what information is displayed—without waiting for developers or code deployments.</p>
                  
                  <div class="config-flow-visual">
                    <div class="config-step">
                      <div class="config-number">1</div>
                      <div class="config-content">
                        <h4>Business User Defines</h4>
                        <p>"Show me accounts with contracts expiring in 30 days"</p>
                      </div>
                    </div>
                    <div class="config-arrow">→</div>
                    <div class="config-step">
                      <div class="config-number">2</div>
                      <div class="config-content">
                        <h4>System Configures</h4>
                        <p>Dashboard automatically finds and displays matching accounts</p>
                      </div>
                    </div>
                    <div class="config-arrow">→</div>
                    <div class="config-step">
                      <div class="config-number">3</div>
                      <div class="config-content">
                        <h4>Sales Team Sees It</h4>
                        <p>New attention point appears immediately—no downtime</p>
                      </div>
                    </div>
                  </div>

                  <div class="metadata-benefits">
                    <h4 class="benefits-title">Why This Matters</h4>
                    <ul class="benefits-list">
                      <li><strong>Faster changes:</strong> Add new attention points in minutes, not weeks</li>
                      <li><strong>No IT dependency:</strong> Business users control what information is shown</li>
                      <li><strong>Always relevant:</strong> Most important information automatically surfaces first</li>
                      <li><strong>Cost savings:</strong> Fewer developer hours needed for routine updates</li>
                    </ul>
                  </div>
                </section>

                <!-- User Journey Comparison -->
                ${caseStudy.userJourney ? `
                <section class="case-study-content-section user-journey-section">
                  <div class="case-study-section-header">
                    <div class="case-study-section-icon journey-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2 class="case-study-section-title">User Journey Comparison</h2>
                  </div>
                  
                  <div class="journey-comparison">
                    <div class="journey-column before-journey">
                      <div class="journey-header">
                        <h3 class="journey-title">Before</h3>
                        <span class="journey-time">5-8 minutes</span>
                      </div>
                      <div class="journey-steps">
                        ${caseStudy.userJourney.before.map((step, idx) => `
                          <div class="journey-step">
                            <div class="step-number-badge">${step.step}</div>
                            <div class="step-content">
                              <p class="step-action">${step.action}</p>
                              <span class="step-time">${step.time}</span>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                    
                    <div class="journey-arrow">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <div class="journey-column after-journey">
                      <div class="journey-header">
                        <h3 class="journey-title">After</h3>
                        <span class="journey-time">5 seconds</span>
                      </div>
                      <div class="journey-steps">
                        ${caseStudy.userJourney.after.map((step, idx) => `
                          <div class="journey-step">
                            <div class="step-number-badge">${step.step}</div>
                            <div class="step-content">
                              <p class="step-action">${step.action}</p>
                              <span class="step-time">${step.time}</span>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                  
                  <div class="journey-savings">
                    <div class="savings-badge">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>${caseStudy.userJourney.timeSaved}</span>
                    </div>
                  </div>
                </section>
                ` : ''}

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
    
    // Initialize screenshot modal functions
    if (!window.openScreenshotModal) {
      window.openScreenshotModal = function(imageSrc, title) {
        const modal = document.getElementById('screenshot-modal');
        const modalImage = document.getElementById('screenshot-modal-image');
        const modalTitle = document.getElementById('screenshot-modal-title');
        
        if (modal && modalImage && modalTitle) {
          modalImage.src = imageSrc;
          modalImage.alt = title;
          modalTitle.textContent = title;
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      };
    }

    // Social sharing functions
    if (!window.shareOnLinkedIn) {
      window.shareOnLinkedIn = function(caseStudyId, title) {
        const url = `${window.location.origin}/case-studies/${caseStudyId}`;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=600');
      };
    }
    
    if (!window.shareOnTwitter) {
      window.shareOnTwitter = function(caseStudyId, title) {
        const url = `${window.location.origin}/case-studies/${caseStudyId}`;
        const text = decodeURIComponent(title) + ' - ApexRune Case Study';
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=600');
      };
    }
    
    if (!window.copyShareLink) {
      window.copyShareLink = function(caseStudyId) {
        const url = `${window.location.origin}/case-studies/${caseStudyId}`;
        navigator.clipboard.writeText(url).then(() => {
          // Show temporary feedback
          const btn = event.target.closest('.share-copy');
          if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            `;
            btn.style.background = 'var(--color-green)';
            btn.style.color = 'white';
            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.color = '';
            }, 2000);
          }
        }).catch(err => {
          console.error('Failed to copy link:', err);
          alert('Link copied: ' + url);
        });
      };
    }

    // Zoom state
    let screenshotZoom = 1;
    let screenshotPanX = 0;
    let screenshotPanY = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    if (!window.zoomScreenshotIn) {
      window.zoomScreenshotIn = function(event) {
        event.stopPropagation();
        screenshotZoom = Math.min(screenshotZoom + 0.25, 3);
        applyZoomToScreenshot();
      };
    }

    if (!window.zoomScreenshotOut) {
      window.zoomScreenshotOut = function(event) {
        event.stopPropagation();
        screenshotZoom = Math.max(screenshotZoom - 0.25, 0.5);
        applyZoomToScreenshot();
      };
    }

    if (!window.resetScreenshotZoom) {
      window.resetScreenshotZoom = function(event) {
        event.stopPropagation();
        screenshotZoom = 1;
        screenshotPanX = 0;
        screenshotPanY = 0;
        applyZoomToScreenshot();
      };
    }

    function applyZoomToScreenshot() {
      const img = document.getElementById('screenshot-modal-image');
      if (img) {
        img.style.transform = `scale(${screenshotZoom}) translate(${screenshotPanX}px, ${screenshotPanY}px)`;
        img.style.cursor = screenshotZoom > 1 ? 'grab' : 'default';
      }
    }

    if (!window.closeScreenshotModal) {
      window.closeScreenshotModal = function(event) {
        if (event) {
          event.stopPropagation();
        }
        const modal = document.getElementById('screenshot-modal');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          // Reset zoom
          screenshotZoom = 1;
          screenshotPanX = 0;
          screenshotPanY = 0;
        }
      };
      
      // Close screenshot modal on Escape key (only add once)
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const modal = document.getElementById('screenshot-modal');
          if (modal && modal.style.display === 'flex') {
            window.closeScreenshotModal();
          }
        }
      });

      // Add wheel zoom to modal image
      const modalContent = document.querySelector('.screenshot-modal-content');
      if (modalContent) {
        modalContent.addEventListener('wheel', function(e) {
          const modal = document.getElementById('screenshot-modal');
          if (modal && modal.style.display === 'flex') {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            screenshotZoom = Math.max(0.5, Math.min(3, screenshotZoom + delta));
            applyZoomToScreenshot();
          }
        }, { passive: false });

        // Add pan functionality
        const modalImg = document.getElementById('screenshot-modal-image');
        if (modalImg) {
          modalImg.addEventListener('mousedown', function(e) {
            if (screenshotZoom > 1) {
              isPanning = true;
              startX = e.clientX - screenshotPanX;
              startY = e.clientY - screenshotPanY;
              modalImg.style.cursor = 'grabbing';
            }
          });

          document.addEventListener('mousemove', function(e) {
            if (isPanning) {
              screenshotPanX = e.clientX - startX;
              screenshotPanY = e.clientY - startY;
              applyZoomToScreenshot();
            }
          });

          document.addEventListener('mouseup', function() {
            if (isPanning) {
              isPanning = false;
              const img = document.getElementById('screenshot-modal-image');
              if (img && screenshotZoom > 1) {
                img.style.cursor = 'grab';
              }
            }
          });
        }
      }
    }
    
    // Animate components on scroll
    if (caseStudy.hasVisualElements && caseStudyId === 'account-360-dashboard') {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);
      
      // Observe component cards
      setTimeout(() => {
        document.querySelectorAll('.component-card').forEach(card => {
          observer.observe(card);
        });
      }, 100);
    }
    
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
    /* ============================================
       CASE STUDY DETAIL - COMPLETE REDESIGN
       Modern, Compact, Polished Design
       ============================================ */
    
    .case-study-detail-page {
      padding: 0;
      padding-top: 70px;
      min-height: calc(100vh - 80px);
      background: linear-gradient(to bottom, #FAFBFC 0%, #FFFFFF 500px);
    }

    @media (max-width: 768px) {
      .case-study-detail-page {
        padding-top: 60px;
      }
    }

    /* Container - More Compact */
    .case-study-detail-page .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2.5rem;
    }

    @media (max-width: 768px) {
      .case-study-detail-page .container {
        padding: 0 1.5rem;
      }
    }

    /* Back Navigation - More Spacing & Better Hover */
    .case-study-back-nav {
      margin: 2.5rem 0 2rem 0;
    }

    .case-study-detail-page .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-primary);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.625rem 1.125rem 0.625rem 0.75rem;
      border-radius: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }

    .case-study-detail-page .back-link:hover {
      background: var(--color-blue-50);
      border-color: var(--color-primary-light);
      transform: translateX(-3px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    }

    .case-study-detail-page .back-link:active {
      transform: translateX(-2px) scale(0.98);
    }

    .case-study-detail-page .back-link svg {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .case-study-detail-page .back-link:hover svg {
      transform: translateX(-3px);
    }

    /* Main Detail Container */
    .case-study-detail {
      max-width: 100%;
      margin: 0;
      background: transparent;
    }

    /* Hero Section - Compact & Modern */
    .case-study-hero {
      background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
      color: var(--color-bg-white);
      padding: 2.5rem 2rem 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      position: relative;
      box-shadow: 0 4px 16px rgba(30, 64, 175, 0.12);
    }

    @media (max-width: 768px) {
      .case-study-hero {
        padding: 2rem 1.5rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
      }
    }

    /* Hero Meta Tags - Minimal */
    .case-study-hero-meta {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 1rem;
    }

    .case-study-tag {
      background: rgba(255, 255, 255, 0.15);
      color: var(--color-bg-white);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.625rem;
      border-radius: 4px;
    }

    .case-study-industry-tag {
      background: rgba(255, 255, 255, 0.2);
      color: var(--color-bg-white);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.625rem;
      border-radius: 4px;
    }

    /* Hero Title - Bold & Compact */
    .case-study-hero-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-bg-white);
      margin: 0 0 0.875rem 0;
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    @media (max-width: 768px) {
      .case-study-hero-title {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
      }
    }

    /* Hero Client - With Icon */
    .case-study-hero-client {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.95);
      font-size: 0.8125rem;
      margin-bottom: 0.875rem;
      font-weight: 500;
    }

    .case-study-hero-client svg {
      width: 18px;
      height: 18px;
      opacity: 0.9;
      flex-shrink: 0;
    }

    /* Tech Tags - Minimal Pills */
    .case-study-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.875rem;
    }

    .tech-tag {
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.95);
      font-size: 0.6875rem;
      font-weight: 500;
      padding: 0.25rem 0.625rem;
      border-radius: 12px;
      transition: background 0.2s ease;
    }

    .tech-tag:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .case-study-share-buttons {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .share-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .share-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .share-btn:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    .share-btn:active {
      transform: translateY(0);
    }

    .share-linkedin:hover {
      background: #0077b5;
    }

    .share-twitter:hover {
      background: #000000;
    }

    .share-copy:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Article Container */
    .case-study-detail article {
      padding: 0;
      margin: 0;
      background: transparent;
    }

    /* Two Column Layout - More Compact */
    .case-study-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 3rem;
      align-items: start;
      padding: 0 0 3rem;
    }

    @media (max-width: 1024px) {
      .case-study-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 0 0 2.5rem;
      }
    }

    /* Main Content Column - Compact */
    .case-study-main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 0;
    }

    /* Content Sections - Clean Card Design */
    .case-study-content-section {
      background: var(--color-bg-white);
      border-radius: 8px;
      padding: 2rem 2rem;
      border: 1px solid var(--color-border-light);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 768px) {
      .case-study-content-section {
        padding: 1.5rem 1.25rem;
      }
    }

    /* Challenge Section - Inset Effect */
    .challenge-section {
      background: linear-gradient(145deg, #FFF7ED 0%, #FFEDD5 100%);
      border-left: 3px solid #F97316;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(249, 115, 22, 0.15) !important;
      border-left: 3px solid #F97316 !important;
    }

    /* Problem Metrics - Compact Cards */
    .problem-metrics-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(249, 115, 22, 0.2);
    }

    .metrics-section-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 1rem 0;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .metrics-column {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      padding: 1.25rem;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }

    .metrics-column-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-primary-dark);
      margin: 0 0 0.75rem 0;
    }

    .metrics-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .metric-item {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    .metric-item svg {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      margin-top: 0.25rem;
    }

    /* RLM Flow Diagram - Clean Vertical Flow */
    .rlm-flow-diagram {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: var(--color-gray-50);
      border-radius: 8px;
      border: 1px solid var(--color-border-light);
    }

    .rlm-flow-step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      position: relative;
      padding-bottom: 1.5rem;
    }

    .rlm-flow-step:last-child {
      padding-bottom: 0;
    }

    .rlm-flow-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);
    }

    .rlm-flow-content {
      flex: 1;
      padding-top: 0.375rem;
    }

    .rlm-flow-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 0.25rem 0;
    }

    .rlm-flow-description {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    /* Arrow between steps - Vertical connector line */
    .rlm-flow-arrow {
      position: absolute;
      left: 17px;
      top: 36px;
      bottom: -1.5rem;
      width: 2px;
      background: linear-gradient(to bottom, var(--color-primary-light) 0%, rgba(59, 130, 246, 0.2) 100%);
      z-index: 1;
      pointer-events: none;
    }

    .rlm-flow-step:last-child .rlm-flow-arrow {
      display: none;
    }

    .rlm-flow-arrow::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid var(--color-primary-light);
    }

    @media (max-width: 768px) {
      .rlm-flow-diagram {
        padding: 1.25rem;
      }

      .rlm-flow-step {
        padding-bottom: 1.25rem;
      }

      .rlm-flow-number {
        width: 32px;
        height: 32px;
        font-size: 0.8125rem;
      }

      .rlm-flow-arrow {
        left: 15px;
        top: 32px;
      }

      .rlm-flow-arrow::after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid var(--color-primary-light);
      }
    }

    /* Key Features Grid - Compact */
    .key-features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;
    }

    @media (max-width: 768px) {
      .key-features-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .key-feature-card {
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      padding: 1.25rem;
      transition: all 0.2s ease;
    }

    .key-feature-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-color: var(--color-primary-light);
      transform: translateY(-2px);
    }

    .key-feature-header {
      margin-bottom: 0.75rem;
    }

    .key-feature-icon {
      display: none;
    }

    .key-feature-name {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 0.5rem 0;
    }

    .key-feature-description {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0 0 0.625rem 0;
    }

    .key-feature-benefit {
      padding-top: 0.625rem;
      border-top: 1px solid var(--color-border-light);
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    /* Before/After Comparison - Compact */
    .before-after-comparison {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
      align-items: start;
    }

    .comparison-column {
      background: var(--color-bg-white);
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid var(--color-border-default);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .before-column {
      border-left: 3px solid #EF4444;
      background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
    }

    .after-column {
      border-left: 3px solid var(--color-green);
      background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
    }

    .comparison-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .comparison-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0;
    }

    .comparison-badge {
      font-size: 0.625rem;
      font-weight: 600;
      padding: 0.1875rem 0.5rem;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .before-badge {
      background: rgba(239, 68, 68, 0.15);
      color: #EF4444;
    }

    .after-badge {
      background: rgba(16, 185, 129, 0.15);
      color: var(--color-green);
    }

    .comparison-scenario {
      margin-bottom: 1rem;
    }

    .scenario-text {
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      line-height: 1.5;
      margin: 0;
      font-weight: 500;
    }

    .comparison-metrics {
      margin-top: 1rem;
    }

    .metrics-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-primary-dark);
      margin: 0 0 0.625rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .comparison-metrics-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .comparison-metrics-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      line-height: 1.4;
    }

    .comparison-metrics-list li svg {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      margin-top: 0.125rem;
    }

    .comparison-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bright-blue);
      margin-top: 2rem;
    }

    @media (max-width: 1024px) {
      .before-after-comparison {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .comparison-arrow {
        transform: rotate(90deg);
        margin: 0;
      }
    }

    @media (max-width: 768px) {
      .comparison-column {
        padding: 1.5rem;
      }
    }

    /* Proof Section - Success Green Inset */
    .proof-section {
      background: linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 100%);
      border-left: 3px solid var(--color-green);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.15) !important;
      border-left: 3px solid var(--color-green) !important;
    }

    /* Section Header - Modern & Minimal */
    .case-study-section-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .case-study-section-icon {
      display: none;
    }

    /* Show icon for client section */
    .user-icon {
      display: flex !important;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      color: var(--color-primary-light);
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-icon svg {
      width: 20px;
      height: 20px;
    }

    .case-study-section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }

    .case-study-section-text {
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
      margin: 0;
    }

    /* Solution Steps */
    .case-study-solution-steps {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0 0 0;
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
      gap: 2rem;
      margin-top: 1.5rem;
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


    /* Lessons Learned Section - Blue Inset */
    .lessons-learned-section {
      background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%);
      border-left: 3px solid var(--color-primary-light);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.15) !important;
      border-left: 3px solid var(--color-primary-light) !important;
    }

    .lessons-learned-section .lessons-icon {
      background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
      color: var(--bright-blue);
    }

    /* Lessons Learned List - Clean */
    .lessons-learned-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .lessons-learned-list li {
      position: relative;
      padding-left: 1.5rem;
      font-size: 0.875rem;
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .lessons-learned-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--color-primary-light);
      font-weight: 700;
      font-size: 1rem;
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
    /* Sidebar - Compact & Modern */
    .case-study-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: sticky;
      top: 120px;
    }

    .case-study-sidebar-card {
      background: var(--color-bg-white);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: all 0.2s ease;
    }

    .case-study-sidebar-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-color: var(--color-primary-light);
    }

    .sidebar-card-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 0.75rem 0;
      line-height: 1.3;
    }

    .sidebar-card-text {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .sidebar-card-list {
      list-style: none;
      padding: 0;
      margin: 0.75rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .sidebar-card-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      font-size: 0.8125rem;
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    .sidebar-card-list svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 0.125rem;
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
        padding: 2rem 1.5rem;
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

    /* New Visual Elements Styles */
    
    /* Architecture Section */
    .architecture-section {
      background: linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 100%);
      border-left: 3px solid var(--bright-blue);
      border-radius: 8px;
    }

    .architecture-icon {
      background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
      color: var(--bright-blue);
    }

    /* Diagram Container - Removed complex SVG diagrams */
    .diagram-container {
      display: none;
    }

    /* Components Grid */
    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .component-card {
      background: var(--white);
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.3s ease;
      animation: fadeInUp 0.5s ease forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    .component-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
      border-color: var(--bright-blue);
    }

    .component-card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .component-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--bright-blue) 0%, #2563EB 100%);
      color: var(--white);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .component-name {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
    }

    .component-description {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0 0 0.75rem 0;
    }

    .component-benefit {
      padding-top: 0.75rem;
      border-top: 1px solid #F1F5F9;
    }

    .benefit-text {
      font-size: 0.875rem;
      color: var(--text-dark);
      line-height: 1.6;
    }

    /* Simple Flow Diagram */
    .simple-flow-diagram {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin: 2.5rem 0;
      flex-wrap: wrap;
    }

    .simple-flow-diagram.compact {
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .flow-step {
      flex: 1;
      min-width: 200px;
      max-width: 280px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .simple-flow-diagram.compact .flow-step {
      min-width: 150px;
      max-width: 220px;
      gap: 0.75rem;
    }

    .flow-icon-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
      border: 3px solid var(--bright-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bright-blue);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    }

    .simple-flow-diagram.compact .flow-icon-circle {
      width: 56px;
      height: 56px;
      border-width: 2px;
    }

    .flow-step h4 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
    }

    .simple-flow-diagram.compact .flow-step h4 {
      font-size: 1rem;
    }

    .flow-step p {
      font-size: 0.9375rem;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .simple-flow-diagram.compact .flow-step p {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .flow-arrow {
      font-size: 2rem;
      color: var(--bright-blue);
      font-weight: 700;
    }

    .simple-flow-diagram.compact .flow-arrow {
      font-size: 1.5rem;
    }

    /* Flag Explanation */
    .flag-explanation {
      margin: 2rem 0;
    }

    .flag-example-card {
      background: var(--white);
      border-radius: 12px;
      padding: 2rem;
      border: 2px solid #E5E7EB;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .flag-example-header h4 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0 0 1.5rem 0;
    }

    .example-text {
      font-size: 0.9375rem;
      color: var(--text-dark);
      margin: 0 0 1.5rem 0;
      line-height: 1.6;
    }

    .flag-display-example {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .flag-display-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #F8FAFC;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .flag-display-item.highlight {
      background: #EFF6FF;
      border: 2px solid var(--bright-blue);
    }

    .flag-box {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: 2px solid;
      flex-shrink: 0;
    }

    .flag-box.tier1 {
      background: #D1FAE5;
      border-color: #10B981;
    }

    .flag-box.tier2 {
      background: #D1FAE5;
      border-color: #10B981;
    }

    .flag-box.tier3 {
      background: #D1FAE5;
      border-color: #10B981;
      border-width: 3px;
    }

    .flag-box.tier4 {
      background: #D1FAE5;
      border-color: #10B981;
      border-width: 3px;
    }

    .flag-display-item span {
      font-size: 0.9375rem;
      color: var(--text-dark);
    }

    .flag-display-item.highlight span strong {
      color: var(--bright-blue);
    }

    .example-result {
      font-size: 0.9375rem;
      color: var(--text-dark);
      margin: 1rem 0 0 0;
      padding: 1rem;
      background: #ECFDF5;
      border-left: 3px solid var(--green);
      border-radius: 6px;
      font-weight: 500;
    }

    /* Config Flow Visual */
    .config-flow-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      flex-wrap: nowrap;
    }

    .config-step {
      flex: 1;
      min-width: 0;
      max-width: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }

    .config-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--bright-blue) 0%, #2563EB 100%);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.25);
      flex-shrink: 0;
    }

    .config-content h4 {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0 0 0.25rem 0;
      line-height: 1.3;
    }

    .config-content p {
      font-size: 0.75rem;
      color: var(--text-light);
      line-height: 1.4;
      margin: 0;
      font-style: italic;
    }

    .config-arrow {
      font-size: 1rem;
      color: var(--bright-blue);
      font-weight: 700;
      flex-shrink: 0;
      margin: 0 0.25rem;
    }

    /* Updated Legend */
    .legend-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .legend-content strong {
      font-size: 0.9375rem;
      color: var(--dark-blue);
    }

    .legend-content span {
      font-size: 0.875rem;
      color: var(--text-light);
    }

    /* Screenshots Section - Prominent Display */
    .screenshots-section {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
    }

    .screenshots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    @media (max-width: 768px) {
      .screenshots-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
    }

    /* Screenshot Card - Clean & Modern */
    .screenshot-card {
      background: var(--color-bg-white);
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
      border: 1px solid var(--color-border-default);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .screenshot-card:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
      border-color: var(--color-primary-light);
      transform: translateY(-2px);
    }

    /* Screenshot Image Container - Compact */
    .screenshot-image-container {
      position: relative;
      width: 100%;
      background: var(--color-gray-50);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      min-height: 300px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 10px 10px 0 0;
    }

    .screenshot-image-container:hover {
      background: var(--color-gray-100);
    }

    .screenshot-image-container:hover .screenshot-overlay-hint {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .screenshot-image-container {
        min-height: 250px;
        padding: 1.25rem;
      }
    }

    .screenshot-overlay-hint {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.5);
      color: var(--white);
      opacity: 0;
      transition: opacity 0.2s ease;
      border-radius: 8px;
      z-index: 2;
      pointer-events: none;
    }

    .screenshot-overlay-hint svg {
      width: 32px;
      height: 32px;
    }

    .screenshot-overlay-hint span {
      font-size: 0.875rem;
      font-weight: 600;
    }

    /* Screenshot Image - Clean */
    .screenshot-image {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .screenshot-card-full {
      grid-column: 1 / -1;
    }

    .screenshot-card-full .screenshot-image-container {
      min-height: 500px;
      padding: 2rem;
    }

    .screenshot-card-full .screenshot-overlay-hint span {
      display: block;
    }

    @media (max-width: 768px) {
      .screenshot-card-full .screenshot-overlay-hint span {
        display: none;
      }
    }

    .screenshot-card-full .screenshot-overlay-hint span {
      display: block;
    }

    @media (max-width: 768px) {
      .screenshot-card-full .screenshot-overlay-hint span {
        display: none;
      }
    }

    /* Screenshot Modal */
    .screenshot-modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 3000;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
      animation: fadeIn 0.2s ease;
    }


    .screenshot-modal-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--white);
      transition: all 0.2s ease;
      z-index: 3001;
    }

    .screenshot-modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .screenshot-modal-zoom-controls {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      display: flex;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.8);
      padding: 0.5rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      z-index: 3001;
    }

    .zoom-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--white);
      transition: all 0.2s ease;
    }

    .zoom-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }

    .screenshot-modal-img {
      transition: transform 0.2s ease;
      user-select: none;
    }

    .screenshot-modal-content {
      max-width: calc(100vw - 4rem);
      max-height: calc(100vh - 4rem);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      overflow: hidden;
      padding: 0;
    }

    .screenshot-modal-img {
      max-width: calc(100vw - 4rem);
      max-height: calc(100vh - 8rem);
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      display: block;
      flex-shrink: 1;
    }

    .screenshot-modal-title {
      color: var(--white);
      font-size: 1.125rem;
      font-weight: 600;
      text-align: center;
      padding: 0.625rem 1.25rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      backdrop-filter: blur(8px);
      flex-shrink: 0;
      margin-top: auto;
    }

    @media (max-width: 768px) {
      .screenshot-modal {
        padding: 1rem;
      }

      .screenshot-modal-close {
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
      }

      .screenshot-modal-zoom-controls {
        top: 1rem;
        left: 1rem;
        padding: 0.375rem;
        gap: 0.375rem;
      }

      .zoom-btn {
        width: 36px;
        height: 36px;
      }

      .screenshot-modal-content {
        max-width: calc(100vw - 2rem);
        max-height: calc(100vh - 2rem);
        gap: 0.75rem;
      }

      .screenshot-modal-img {
        max-width: calc(100vw - 2rem);
        max-height: calc(100vh - 6rem);
      }

      .screenshot-modal-title {
        font-size: 0.9375rem;
        padding: 0.5rem 1rem;
      }
    }

    .screenshot-placeholder {
      position: relative;
      width: 100%;
      min-height: 400px;
      background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 8px;
    }

    .screenshot-placeholder-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      text-align: center;
      padding: 2rem;
      color: var(--text-light);
    }

    .screenshot-placeholder-content svg {
      opacity: 0.5;
    }

    .screenshot-placeholder-content span {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
    }

    .screenshot-placeholder-content p {
      font-size: 0.875rem;
      margin: 0;
      color: var(--text-light);
    }

    .screenshot-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      z-index: 2;
      background: rgba(255, 255, 255, 0.95);
      color: var(--text-light);
    }

    .screenshot-overlay svg {
      opacity: 0.5;
    }

    .screenshot-overlay span {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Screenshot Mockups */
    .screenshot-mockup {
      position: absolute;
      inset: 0;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      z-index: 1;
    }

    .mockup-header {
      height: 12px;
      background: #E5E7EB;
      border-radius: 4px;
      opacity: 0.6;
    }

    .mockup-content {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 0.75rem;
      flex: 1;
    }

    .mockup-left {
      background: #DBEAFE;
      border-radius: 6px;
      opacity: 0.7;
    }

    .mockup-right {
      background: #E0E7FF;
      border-radius: 6px;
      opacity: 0.7;
    }

    .mockup-bottom {
      height: 60px;
      background: #F3F4F6;
      border-radius: 6px;
      opacity: 0.6;
    }

    .screenshot-mockup-flag {
      position: absolute;
      inset: 0;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .flag-grid-mockup {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      width: 100%;
      max-width: 200px;
    }

    .flag-item {
      aspect-ratio: 1;
      border-radius: 8px;
      border: 2px solid rgba(0, 0, 0, 0.1);
    }

    .flag-item.green {
      background: #D1FAE5;
      border-color: #10B981;
    }

    .flag-item.red {
      background: #FEE2E2;
      border-color: #EF4444;
    }

    .flag-item.white {
      background: #F3F4F6;
      border-color: #9CA3AF;
    }

    .screenshot-mockup-scorecard {
      position: absolute;
      inset: 0;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .scorecard-mockup {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      width: 100%;
      max-width: 300px;
    }

    .scorecard-item {
      height: 60px;
      background: #EFF6FF;
      border-radius: 8px;
      border: 1px solid #DBEAFE;
      opacity: 0.7;
    }

    /* Screenshot Info - Compact */
    .screenshot-info {
      padding: 1.25rem 1.5rem;
      background: var(--color-gray-50);
    }

    .screenshot-title {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    }

    .screenshot-description {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0 0 0.75rem 0;
    }

    .screenshot-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }

    .screenshot-tag {
      font-size: 0.6875rem;
      font-weight: 500;
      color: var(--color-primary);
      background: var(--color-bg-white);
      padding: 0.25rem 0.625rem;
      border-radius: 12px;
      border: 1px solid var(--color-border-default);
    }

    /* Flag Logic Section */
    .flag-logic-section {
      background: linear-gradient(135deg, #FEF7F0 0%, #FFF5ED 100%);
      border-left: 3px solid #F59E0B;
      border-radius: 8px;
    }

    .flag-icon {
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #EF4444;
    }

    .flag-legend {
      background: var(--white);
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      border: 1px solid #E5E7EB;
    }

    .legend-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--dark-blue);
      margin: 0 0 1rem 0;
    }

    .legend-items {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .legend-color {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 2px solid rgba(0, 0, 0, 0.1);
    }

    .legend-color.green {
      background: #D1FAE5;
      border-color: #10B981;
    }

    .legend-color.red {
      background: #FEE2E2;
      border-color: #EF4444;
    }

    .legend-color.white {
      background: #F3F4F6;
      border-color: #9CA3AF;
    }

    /* Metadata Flow Section */
    .metadata-flow-section {
      background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
      border-left: 3px solid #6366F1;
      border-radius: 8px;
    }

    .metadata-icon {
      background: linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%);
      color: #6366F1;
    }

    .metadata-benefits {
      background: var(--white);
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      border: 1px solid #E5E7EB;
    }

    .benefits-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--dark-blue);
      margin: 0 0 1rem 0;
    }

    .benefits-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .benefits-list li {
      position: relative;
      padding-left: 1.75rem;
      font-size: 0.9375rem;
      color: var(--text-dark);
      line-height: 1.6;
    }

    .benefits-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10B981;
      font-weight: 700;
      font-size: 1.125rem;
    }

    /* User Journey Section */
    .user-journey-section {
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      border-left: 3px solid var(--green);
      border-radius: 8px;
    }

    .journey-icon {
      background: linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%);
      color: var(--green);
    }

    .journey-comparison {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 2.5rem;
      margin-top: 2rem;
      margin-top: 2rem;
      align-items: start;
    }

    .journey-column {
      background: var(--white);
      border-radius: 12px;
      padding: 1.5rem;
      border: 2px solid #E5E7EB;
    }

    .before-journey {
      border-color: #FEE2E2;
    }

    .after-journey {
      border-color: #D1FAE5;
    }

    .journey-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #F1F5F9;
    }

    .journey-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin: 0;
    }

    .journey-time {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-light);
      background: #F3F4F6;
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
    }

    .before-journey .journey-time {
      background: #FEE2E2;
      color: #DC2626;
    }

    .after-journey .journey-time {
      background: #D1FAE5;
      color: #059669;
    }

    .journey-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .journey-step {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .step-number-badge {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--bright-blue) 0%, #2563EB 100%);
      color: var(--white);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9375rem;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;
      padding-top: 0.25rem;
    }

    .step-action {
      font-size: 0.9375rem;
      color: var(--text-dark);
      margin: 0 0 0.25rem 0;
      line-height: 1.5;
    }

    .step-time {
      font-size: 0.8125rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .journey-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bright-blue);
      margin-top: 2rem;
    }

    .journey-savings {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }

    .savings-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: #059669;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1.125rem;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }

    .savings-badge svg {
      flex-shrink: 0;
    }


    /* Data Flow Section */
    .data-flow-section {
      background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
      border-left: 3px solid var(--green);
    }

    .flow-icon {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: var(--green);
    }

    /* Responsive Styles */
    @media (max-width: 1024px) {
      .journey-comparison {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .journey-arrow {
        transform: rotate(90deg);
        margin: 0;
      }

      .components-grid {
        grid-template-columns: 1fr;
      }

      .screenshots-grid {
        grid-template-columns: 1fr;
      }


      .simple-flow-diagram {
        flex-direction: column;
      }

      .flow-arrow {
        transform: rotate(90deg);
      }

      .config-flow-visual {
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      .config-step {
        min-width: 150px;
        flex: 0 1 auto;
      }

      .config-arrow {
        transform: rotate(90deg);
        margin: 0.5rem 0;
      }
    }

    @media (max-width: 768px) {
      .component-card {
        padding: 1.25rem;
      }

      .screenshot-placeholder {
        height: 200px;
      }

      .journey-column {
        padding: 1.25rem;
      }

      .flow-step {
        min-width: 100%;
      }

      .config-step {
        min-width: 100%;
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
