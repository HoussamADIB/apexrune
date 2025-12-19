import { getServiceIcon } from './icons.js';

// Service content data - Comprehensive detail for each service
export const servicesData = {
  'custom-development': {
    title: 'Custom Development',
    subtitle: 'Bespoke Salesforce Solutions Built for Your Business',
    description: 'We build bespoke applications on the Salesforce platform that solve your unique business challenges.',
    overview: `Standard Salesforce functionality is powerful, but sometimes it falls short of your specific needs. When out-of-the-box solutions don't fit, we step in to build custom applications tailored exactly to your business processes.

Our custom development services leverage the full power of the Salesforce platform—Apex, Lightning Web Components (LWC), Visualforce, and more—to create solutions that work the way you work. We don't just write code; we architect scalable, maintainable systems that grow with your business.`,
    engagementTag: 'Project based',
    
    // Expanded features with descriptions
    featuresDetailed: [
      {
        title: 'Discovery & Requirements Gathering',
        description: 'We start by deeply understanding your business processes, pain points, and goals. Through collaborative workshops and documentation, we ensure every requirement is captured before a single line of code is written.'
      },
      {
        title: 'Custom Objects & Data Architecture',
        description: 'We design scalable data models with custom objects, fields, and relationships that mirror your business entities and support future growth.'
      },
      {
        title: 'Apex Development',
        description: 'Server-side logic built with Apex—triggers, classes, batch jobs, and scheduled processes that automate complex business rules and calculations.'
      },
      {
        title: 'Lightning Web Components (LWC)',
        description: 'Modern, responsive UI components that provide intuitive user experiences. Built with web standards for peak performance and reusability.'
      },
      {
        title: 'API Development & Integration',
        description: 'Custom REST and SOAP APIs that connect your Salesforce org to external systems, enabling seamless data flow across your tech stack.'
      },
      {
        title: 'Testing & Quality Assurance',
        description: 'Comprehensive unit tests, integration tests, and UAT support. We maintain 85%+ code coverage and follow Salesforce best practices.'
      }
    ],

    // Process/methodology
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'We conduct stakeholder interviews and process mapping to understand your needs completely.'
      },
      {
        step: 2,
        title: 'Design',
        description: 'We create technical specifications, data models, and UI mockups for your approval.'
      },
      {
        step: 3,
        title: 'Build',
        description: 'Agile development in sprints with regular demos and feedback loops.'
      },
      {
        step: 4,
        title: 'Test',
        description: 'Rigorous QA testing, user acceptance testing, and security review.'
      },
      {
        step: 5,
        title: 'Deploy',
        description: 'Careful deployment to production with rollback plans and monitoring.'
      },
      {
        step: 6,
        title: 'Support',
        description: 'Post-launch support, documentation, and training for your team.'
      }
    ],

    // When you need this service
    useCases: [
      'Your business has unique workflows that can\'t be handled by standard Salesforce features',
      'You need a custom application (portal, calculator, dashboard) within Salesforce',
      'Off-the-shelf AppExchange solutions don\'t quite fit your requirements',
      'You\'re looking to replace legacy systems with modern Salesforce solutions',
      'Your team needs custom UI components that match your brand and workflows'
    ],

    // Technologies used
    technologies: [
      'Apex Classes & Triggers',
      'Lightning Web Components',
      'Visualforce Pages',
      'SOQL & SOSL',
      'Salesforce DX',
      'VS Code + SF Extensions',
      'Git Version Control',
      'Salesforce CLI'
    ],

    // FAQs
    faqs: [
      {
        question: 'How long does a typical custom development project take?',
        answer: 'Project timelines vary based on complexity. Simple customizations may take 2-4 weeks, while complex applications can span 2-6 months. We provide detailed timelines during the discovery phase.'
      },
      {
        question: 'Do you provide ongoing support after the project is complete?',
        answer: 'Absolutely. We offer maintenance retainers for ongoing support, bug fixes, and feature enhancements. We also provide comprehensive documentation and training.'
      },
      {
        question: 'How do you handle changes during the project?',
        answer: 'We use agile methodologies with regular sprint reviews. Changes are documented, assessed for impact, and incorporated into future sprints when approved.'
      },
      {
        question: 'Will my team be able to maintain the code after handoff?',
        answer: 'Yes. We write clean, well-documented code following Salesforce best practices. We also provide technical documentation and can train your internal team.'
      }
    ],

    results: [
      { icon: 'lightning', title: 'Increased Efficiency', description: 'Streamlined processes that save hours every week', color: '#F59E0B' },
      { icon: 'users', title: 'Higher Adoption', description: 'Intuitive solutions your team actually wants to use', color: '#3B82F6' },
      { icon: 'target', title: 'Competitive Advantage', description: 'Custom tools that differentiate your business', color: '#EF4444' }
    ],

    ctaTitle: 'Ready to Build?',
    ctaDescription: 'Standard Salesforce isn\'t enough? Let\'s build a tool tailored to your specific processes.',
    iconKey: 'custom-development'
  },

  'system-integration': {
    title: 'System Integration',
    subtitle: 'Connect Your Tools. Unify Your Data.',
    description: 'We connect Salesforce to your other essential tools like Slack, Mailchimp, ERPs, and custom systems.',
    overview: `Your business runs on multiple systems—CRM, ERP, marketing automation, accounting software, and more. But when these systems don't talk to each other, you end up with data silos, manual data entry, and an incomplete view of your business.

We create seamless integrations that connect Salesforce with your entire tech stack. Whether it's syncing contacts with your email marketing platform, connecting to your ERP for order management, or building custom APIs for your proprietary systems—we make your data flow automatically, accurately, and in real-time.`,
    engagementTag: 'Project based',

    featuresDetailed: [
      {
        title: 'REST & SOAP API Development',
        description: 'We build robust APIs that expose or consume data securely. Custom endpoints designed for your specific integration needs with proper authentication and error handling.'
      },
      {
        title: 'Pre-Built Connectors',
        description: 'Leverage existing connectors for popular platforms like Slack, Mailchimp, QuickBooks, Stripe, and more. We configure and customize them to match your workflows.'
      },
      {
        title: 'Middleware & iPaaS Solutions',
        description: 'We implement integration platforms like MuleSoft, Dell Boomi, or Zapier when complex orchestration is needed across multiple systems.'
      },
      {
        title: 'Real-Time Data Sync',
        description: 'Bi-directional, real-time synchronization that keeps your systems in perfect harmony. Changes in one system instantly reflect in others.'
      },
      {
        title: 'Data Mapping & Transformation',
        description: 'We handle the complexity of mapping fields between systems, transforming data formats, and ensuring consistency across platforms.'
      },
      {
        title: 'Error Handling & Monitoring',
        description: 'Robust error handling, retry logic, and alerting systems that notify you when integrations need attention.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Systems Audit',
        description: 'We map your current tech stack, data flows, and identify integration points.'
      },
      {
        step: 2,
        title: 'Integration Design',
        description: 'We design the integration architecture, data mapping, and sync schedules.'
      },
      {
        step: 3,
        title: 'Development',
        description: 'We build the connections with proper authentication, error handling, and logging.'
      },
      {
        step: 4,
        title: 'Testing',
        description: 'End-to-end testing with real data, edge cases, and failure scenarios.'
      },
      {
        step: 5,
        title: 'Go-Live',
        description: 'Phased rollout with monitoring dashboards and support.'
      },
      {
        step: 6,
        title: 'Documentation',
        description: 'Complete technical documentation and runbooks for your team.'
      }
    ],

    useCases: [
      'You\'re manually copying data between Salesforce and other systems',
      'Your sales team lacks visibility into customer data from other platforms',
      'You need to sync Salesforce with your ERP, accounting, or inventory systems',
      'Your marketing tools (Mailchimp, HubSpot, Marketo) are disconnected from your CRM',
      'You need to build a custom integration with a proprietary or legacy system'
    ],

    technologies: [
      'Salesforce Connect',
      'Platform Events',
      'Change Data Capture',
      'MuleSoft',
      'REST/SOAP APIs',
      'Webhooks',
      'OAuth 2.0',
      'Heroku Connect'
    ],

    faqs: [
      {
        question: 'What systems can you integrate with Salesforce?',
        answer: 'Virtually any system with an API. We\'ve integrated Salesforce with ERPs (NetSuite, SAP), marketing tools (HubSpot, Mailchimp), accounting (QuickBooks, Xero), e-commerce (Shopify), and many custom systems.'
      },
      {
        question: 'How do you handle data conflicts between systems?',
        answer: 'We establish clear "source of truth" rules during design. For two-way syncs, we implement conflict resolution logic based on timestamps, field-level rules, or business priorities you define.'
      },
      {
        question: 'What about data security during integration?',
        answer: 'Security is paramount. We use OAuth 2.0 authentication, encrypted connections (TLS), and follow principle of least privilege. Sensitive data can be masked or excluded from syncs.'
      },
      {
        question: 'How do you handle high-volume data?',
        answer: 'For large data volumes, we use bulk APIs, batch processing, and asynchronous patterns to ensure integrations perform well without hitting governor limits.'
      }
    ],

    results: [
      { icon: 'link', title: 'Unified Data', description: 'Single source of truth across all your systems', color: '#10B981' },
      { icon: 'sync', title: 'Real-Time Sync', description: 'Data flows automatically, no manual entry needed', color: '#3B82F6' },
      { icon: 'chart', title: 'Better Insights', description: 'Complete visibility into your entire business', color: '#8B5CF6' }
    ],

    ctaTitle: 'Ready to Connect?',
    ctaDescription: 'Need to connect Salesforce with your other tools? Let\'s create seamless integrations.',
    iconKey: 'system-integration'
  },

  'health-checks': {
    title: 'Salesforce Health Check',
    subtitle: 'Diagnose. Optimize. Protect.',
    description: 'We audit your existing setup to find and fix inefficiencies, boost performance, and improve user experience.',
    overview: `Is your Salesforce org running at peak performance? Over time, even well-built orgs accumulate technical debt—unused fields, inefficient automations, security gaps, and outdated configurations that slow down your team and create risk.

Our comprehensive Health Check service is like a physical exam for your Salesforce org. We analyze every aspect—data model, automations, security, integrations, user experience, and code quality—then provide you with a prioritized action plan to restore your org to optimal health.`,
    engagementTag: 'Starting at $1,500',

    featuresDetailed: [
      {
        title: 'Performance Analysis',
        description: 'We identify slow-loading pages, inefficient SOQL queries, and automation bottlenecks that frustrate your users and waste their time.'
      },
      {
        title: 'Security & Compliance Review',
        description: 'Assessment of sharing rules, permission sets, field-level security, and data access patterns to identify vulnerabilities and compliance gaps.'
      },
      {
        title: 'Data Quality Audit',
        description: 'Analysis of duplicate records, incomplete data, inconsistent formats, and data hygiene issues that undermine your reporting accuracy.'
      },
      {
        title: 'Technical Debt Assessment',
        description: 'Review of legacy code, unused automations, deprecated features, and configurations that create maintenance burden.'
      },
      {
        title: 'User Experience Review',
        description: 'Evaluation of page layouts, navigation, and workflows from the end-user perspective to identify adoption barriers.'
      },
      {
        title: 'Governor Limits Analysis',
        description: 'Assessment of your org\'s proximity to Salesforce limits—API calls, storage, processing time—to prevent future issues.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Access & Discovery',
        description: 'We securely access your org and gather information about your business context and priorities.'
      },
      {
        step: 2,
        title: 'Automated Scans',
        description: 'We run diagnostic tools to collect data on performance, security, and code quality.'
      },
      {
        step: 3,
        title: 'Expert Analysis',
        description: 'Our certified experts manually review findings and assess business impact.'
      },
      {
        step: 4,
        title: 'Report Generation',
        description: 'We compile a detailed report with findings, risk assessments, and recommendations.'
      },
      {
        step: 5,
        title: 'Presentation',
        description: 'We walk you through the findings and answer questions about priorities.'
      },
      {
        step: 6,
        title: 'Action Plan',
        description: 'You receive a prioritized remediation roadmap you can execute internally or with our help.'
      }
    ],

    useCases: [
      'Your Salesforce org feels slow and users complain about performance',
      'You\'ve inherited an org and need to understand its current state',
      'You\'re preparing for a major project and want to ensure a solid foundation',
      'Your organization is growing and you need to ensure scalability',
      'You haven\'t had an external review of your Salesforce setup in over a year'
    ],

    technologies: [
      'Salesforce Optimizer',
      'Field Trip (Salesforce Labs)',
      'Security Health Check',
      'Apex PMD',
      'Code Analysis Tools',
      'Custom Audit Scripts',
      'Data Quality Tools',
      'Performance Profiler'
    ],

    // What's included in the report
    deliverables: [
      'Executive Summary with overall health score',
      'Detailed findings across all assessment areas',
      'Risk ratings (Critical, High, Medium, Low)',
      'Specific recommendations with effort estimates',
      'Prioritized remediation roadmap',
      'Quick wins you can implement immediately'
    ],

    faqs: [
      {
        question: 'How long does a Health Check take?',
        answer: 'A standard Health Check takes 1-2 weeks, depending on org complexity. We provide the final report with a walkthrough presentation.'
      },
      {
        question: 'Will the Health Check disrupt our users?',
        answer: 'No. We work in the background using read-only access. Your users won\'t notice anything, and we don\'t make any changes to your org during the assessment.'
      },
      {
        question: 'What access do you need?',
        answer: 'We request a user account with System Administrator profile (or equivalent read permissions) in your Production org. We follow strict data security protocols.'
      },
      {
        question: 'Can you help fix the issues you find?',
        answer: 'Absolutely. After the Health Check, we can provide a proposal to implement the recommended fixes, or your internal team can use our report as a guide.'
      }
    ],

    results: [
      { icon: 'shield', title: 'Improved Security', description: 'Close vulnerabilities before they become breaches', color: '#10B981' },
      { icon: 'speed', title: 'Better Performance', description: 'Faster page loads and happier users', color: '#3B82F6' },
      { icon: 'check', title: 'Reduced Risk', description: 'Address technical debt before it becomes costly', color: '#F59E0B' }
    ],

    ctaTitle: 'Ready for Your Checkup?',
    ctaDescription: 'Worried about your Salesforce health? Let\'s audit and optimize your org.',
    iconKey: 'health-checks'
  },

  'process-automation': {
    title: 'Process Automation',
    subtitle: 'Work Smarter. Not Harder.',
    description: 'We build custom flows and triggers to make Salesforce work exactly how your business operates.',
    overview: `How much time does your team waste on repetitive, manual tasks? Data entry, status updates, notification emails, approval routing—these are tasks that machines should handle, not your valuable employees.

We transform your manual processes into automated workflows that run reliably in the background. Using Salesforce Flow, Apex triggers, and scheduled jobs, we build automation that saves hours every week, eliminates human error, and ensures nothing falls through the cracks.`,
    engagementTag: 'Retainer based',

    featuresDetailed: [
      {
        title: 'Salesforce Flow Development',
        description: 'We build sophisticated flows—screen flows for guided user experiences, record-triggered flows for automation, and scheduled flows for batch operations.'
      },
      {
        title: 'Apex Automation',
        description: 'When Flow isn\'t enough, we write Apex triggers and classes to handle complex business logic, calculations, and integrations.'
      },
      {
        title: 'Approval Process Design',
        description: 'Multi-step approval workflows with dynamic routing, escalation rules, and delegation support to keep business moving.'
      },
      {
        title: 'Email & Notification Automation',
        description: 'Automated emails, Slack notifications, SMS alerts, and in-app notifications triggered by business events.'
      },
      {
        title: 'Data Automation',
        description: 'Scheduled data cleanup, enrichment, calculations, and roll-up summaries that keep your data accurate and current.'
      },
      {
        title: 'Process Builder Migration',
        description: 'We migrate your legacy Process Builders and Workflow Rules to Flow before Salesforce sunsets them.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Process Mapping',
        description: 'We document your current manual processes and identify automation opportunities.'
      },
      {
        step: 2,
        title: 'Prioritization',
        description: 'We rank automations by impact and effort to deliver quick wins first.'
      },
      {
        step: 3,
        title: 'Design',
        description: 'We design the automation logic, including edge cases and error handling.'
      },
      {
        step: 4,
        title: 'Build',
        description: 'We develop the automation using best-practice patterns.'
      },
      {
        step: 5,
        title: 'Test',
        description: 'Thorough testing with various scenarios before deployment.'
      },
      {
        step: 6,
        title: 'Train',
        description: 'We train your team on how automations work and how to make simple updates.'
      }
    ],

    useCases: [
      'Your team spends hours on data entry that could be automated',
      'Leads are falling through the cracks due to missed follow-ups',
      'Approval processes are slow and bottle-necked',
      'You need to ensure data consistency across related records',
      'Manual email reminders and notifications are unreliable'
    ],

    // Example automations we've built
    exampleAutomations: [
      {
        title: 'Lead Assignment & Follow-up',
        description: 'Automatically assign leads based on territory, industry, or round-robin. Schedule follow-up tasks and reminder emails.'
      },
      {
        title: 'Quote-to-Cash Automation',
        description: 'Generate quotes from opportunities, route for approval, trigger contract creation, and update billing systems.'
      },
      {
        title: 'Case Escalation',
        description: 'Auto-escalate support cases based on priority, SLA timers, and customer tier. Notify managers and reassign as needed.'
      },
      {
        title: 'Data Quality Maintenance',
        description: 'Scheduled flows that check for duplicates, standardize formats, populate missing fields, and flag data issues.'
      }
    ],

    technologies: [
      'Salesforce Flow',
      'Flow Orchestrator',
      'Apex Triggers',
      'Scheduled Apex',
      'Platform Events',
      'Custom Notifications',
      'Email Templates',
      'Outbound Messages'
    ],

    faqs: [
      {
        question: 'What\'s the difference between Flow and Apex automation?',
        answer: 'Flow is declarative (clicks, not code) and great for most automations. Apex is needed for complex logic, integrations, or when Flow\'s capabilities are insufficient. We use the right tool for each job.'
      },
      {
        question: 'How do you handle automation errors?',
        answer: 'We build in error handling, retry logic, and notifications. Failed automations are logged and can alert administrators so issues are caught early.'
      },
      {
        question: 'Will automations slow down my org?',
        answer: 'When built properly, no. We follow bulkification patterns and best practices to ensure automations run efficiently even with high data volumes.'
      },
      {
        question: 'Can my team modify automations after you build them?',
        answer: 'Yes—we use Flow whenever possible specifically because admins can maintain it. We also provide documentation and training.'
      }
    ],

    results: [
      { icon: 'clock', title: 'Time Saved', description: 'Reclaim hours spent on repetitive manual tasks', color: '#10B981' },
      { icon: 'accuracy', title: 'Reduced Errors', description: 'Eliminate human mistakes in routine processes', color: '#3B82F6' },
      { icon: 'scale', title: 'Scalable Processes', description: 'Handle growth without adding headcount', color: '#8B5CF6' }
    ],

    ctaTitle: 'Ready to Automate?',
    ctaDescription: 'Tired of manual work? Let\'s automate your processes and save time.',
    iconKey: 'process-automation'
  },

  'salesforce-quick-start': {
    title: 'Salesforce Quick Start',
    subtitle: 'Launch Your CRM in Weeks, Not Months',
    description: 'Jumpstart your Salesforce journey with our comprehensive setup service. We configure your org, set up essential objects, and get your team up and running fast.',
    overview: `Starting with Salesforce can feel overwhelming. There are hundreds of features, settings, and decisions to make—and getting it wrong from the start creates technical debt that's painful to fix later.

Our Quick Start service eliminates the guesswork. We configure your Salesforce org with best practices baked in from day one, customize it for your specific industry and processes, migrate your existing data, and train your team to hit the ground running. In weeks, not months, you'll have a CRM that's actually working for your business.`,
    engagementTag: 'Fixed price packages',

    featuresDetailed: [
      {
        title: 'Org Configuration',
        description: 'We configure company settings, fiscal year, currency, business hours, and all foundational settings according to Salesforce best practices.'
      },
      {
        title: 'User Setup & Security',
        description: 'We create user accounts, configure roles and profiles, set up permission sets, and establish your security model.'
      },
      {
        title: 'Data Model Customization',
        description: 'We customize standard objects and create custom objects, fields, and relationships to match your business entities.'
      },
      {
        title: 'Page Layout Design',
        description: 'We design intuitive page layouts, record types, and Lightning pages that make sense for your team\'s workflows.'
      },
      {
        title: 'Data Migration',
        description: 'We migrate your existing data from spreadsheets, legacy systems, or other CRMs—cleaned, de-duped, and properly formatted.'
      },
      {
        title: 'Team Training',
        description: 'Role-based training sessions that get your team comfortable with Salesforce. We don\'t leave until your team is confident.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Kickoff',
        description: 'We learn about your business, processes, and goals in a discovery session.'
      },
      {
        step: 2,
        title: 'Configure',
        description: 'We set up your org with all foundational settings and customizations.'
      },
      {
        step: 3,
        title: 'Migrate',
        description: 'We import and validate your existing data.'
      },
      {
        step: 4,
        title: 'Train',
        description: 'Interactive training sessions for all user groups.'
      },
      {
        step: 5,
        title: 'Go-Live',
        description: 'We support your launch and handle any immediate needs.'
      },
      {
        step: 6,
        title: 'Hypercare',
        description: '2-week support period after launch for questions and quick fixes.'
      }
    ],

    useCases: [
      'You just purchased Salesforce licenses and don\'t know where to start',
      'You\'re moving from spreadsheets or another CRM to Salesforce',
      'You tried to set up Salesforce yourself but it\'s become a mess',
      'You need to be up and running quickly for a new sales team or initiative',
      'You want to start with best practices instead of learning lessons the hard way'
    ],

    // What's included in packages
    packages: [
      {
        name: 'Essentials',
        description: 'Perfect for small teams',
        includes: ['Core configuration', 'Up to 5 users', 'Basic customization', 'Data migration up to 5,000 records', '2 training sessions']
      },
      {
        name: 'Professional',
        description: 'For growing businesses',
        includes: ['Everything in Essentials', 'Up to 25 users', 'Advanced customization', 'Data migration up to 50,000 records', 'Unlimited training', 'Basic automation']
      },
      {
        name: 'Enterprise',
        description: 'For complex requirements',
        includes: ['Everything in Professional', 'Unlimited users', 'Custom development', 'Data migration unlimited', 'Integration setup', 'Advanced automation']
      }
    ],

    technologies: [
      'Sales Cloud',
      'Service Cloud',
      'Data Loader',
      'Lightning App Builder',
      'Report Builder',
      'Dashboard Builder',
      'Email Integration',
      'Mobile App'
    ],

    faqs: [
      {
        question: 'How long does Quick Start take?',
        answer: 'Typically 2-6 weeks depending on complexity and package. We provide a detailed timeline during the kickoff.'
      },
      {
        question: 'What Salesforce editions do you support?',
        answer: 'We work with all Salesforce editions—Essentials, Professional, Enterprise, and Unlimited. We\'ll advise if you need features not available in your edition.'
      },
      {
        question: 'Do you provide support after the project?',
        answer: 'Yes. Quick Start includes a 2-week hypercare period. After that, we offer ongoing support retainers or can assist on an as-needed basis.'
      },
      {
        question: 'What if we already started setting up Salesforce ourselves?',
        answer: 'No problem. We can audit what you\'ve done, fix issues, and complete the setup properly. It\'s often faster than starting from scratch.'
      }
    ],

    results: [
      { icon: 'rocket', title: 'Faster Time to Value', description: 'Start using Salesforce productively in weeks', color: '#10B981' },
      { icon: 'shield', title: 'Best Practices Built In', description: 'Avoid costly mistakes from the start', color: '#3B82F6' },
      { icon: 'users', title: 'Team Ready to Use', description: 'Confident users who actually adopt the system', color: '#8B5CF6' }
    ],

    ctaTitle: 'Ready to Launch?',
    ctaDescription: 'New to Salesforce? Let\'s get you set up the right way from the start.',
    iconKey: 'salesforce-quick-start'
  }
};

// Backward compatibility - simple features array for homepage cards
Object.keys(servicesData).forEach(key => {
  const service = servicesData[key];
  if (service.featuresDetailed && !service.features) {
    service.features = service.featuresDetailed.map(f => f.title);
  }
});

// Helper function to get icon for a service
export function getServiceIconHTML(serviceKey) {
  return getServiceIcon(serviceKey, 64, 'white');
}

// Service button mapping
export const serviceButtonMap = {
  'Custom Development': 'custom-development',
  'System Integration': 'system-integration',
  'Health Checks': 'health-checks',
  'Process Automation': 'process-automation',
  'Salesforce Quick Start': 'salesforce-quick-start'
};

// Function to update service card content
export function updateServiceCard(serviceKey) {
  const service = servicesData[serviceKey];
  if (!service) return;

  const card = document.querySelector('.unified-card');
  if (!card) return;

  const content = card.querySelector('.unified-content');
  const icon = card.querySelector('.unified-icon');

  // Import icons dynamically
  import('./icons.js').then(({ getCommonIcon, getServiceIcon }) => {
    const checkIcon = getCommonIcon('check', 20, '#3B82F6');
    const arrowIcon = getCommonIcon('chevron-right', 16, 'currentColor');
    
    const features = service.features || service.featuresDetailed?.map(f => f.title) || [];
    
    content.innerHTML = `
      <h3 class="unified-title">${service.title}</h3>
      <p class="unified-description">${service.description}</p>
      <ul class="unified-list">
        ${features.slice(0, 4).map(feature => `
          <li>
            ${checkIcon}
            ${feature}
          </li>
        `).join('')}
      </ul>
      <a href="/service/${serviceKey}" class="read-more">READ MORE
        ${arrowIcon}
      </a>
    `;

    if (icon && service.iconKey) {
      icon.innerHTML = getServiceIcon(service.iconKey, 64, 'white');
    }
  });
}

// Initialize service tabs
export function initServiceTabs() {
  const buttons = document.querySelectorAll('.service-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get service key from button text
      const buttonText = button.textContent.trim();
      const serviceKey = serviceButtonMap[buttonText];
      
      if (serviceKey) {
        updateServiceCard(serviceKey);
      }
    });
  });
}
