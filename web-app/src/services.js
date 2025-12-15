// Service content data
export const servicesData = {
  'custom-development': {
    title: 'Custom Development',
    description: 'We build bespoke applications on the Salesforce platform that solve your unique business challenges.',
    overview: 'Standard Salesforce functionality is powerful, but sometimes it is not enough. We build custom solutions tailored to your specific processes using Apex, Lightning Web Components (LWC), and Visualforce.',
    features: [
      'Discovery & requirements gathering',
      'Custom objects & field design',
      'Apex triggers & classes',
      'LWC development'
    ],
    results: [
      { icon: 'lightning', title: 'Increased Efficiency', color: '#F59E0B' },
      { icon: 'users', title: 'Higher Adoption', color: '#3B82F6' },
      { icon: 'target', title: 'Competitive Advantage', color: '#EF4444' }
    ],
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Standard Salesforce isn\'t enough? Let\'s build a tool tailored to your specific processes.',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="40" rx="4" stroke="white" stroke-width="2" fill="none"/>
      <rect x="16" y="20" width="32" height="4" fill="white" opacity="0.8"/>
      <rect x="16" y="28" width="24" height="4" fill="white" opacity="0.8"/>
      <rect x="16" y="36" width="32" height="4" fill="white" opacity="0.8"/>
      <circle cx="52" cy="20" r="3" fill="white" opacity="0.6"/>
    </svg>`
  },
  'salesforce-quick-start': {
    title: 'Get Started Fast with Salesforce Quick Start',
    description: 'Jumpstart your Salesforce journey with our comprehensive setup service. We configure your org, set up essential objects, and get your team up and running in days, not months.',
    overview: 'Starting with Salesforce can be overwhelming. We provide a complete setup service that gets your organization up and running quickly, with best practices built in from day one.',
    features: [
      'Complete Org Setup & Configuration',
      'User Training & Onboarding',
      'Essential Customizations',
      'Data Migration Support'
    ],
    results: [
      { icon: 'rocket', title: 'Faster Time to Value', color: '#10B981' },
      { icon: 'shield', title: 'Best Practices Built In', color: '#3B82F6' },
      { icon: 'users', title: 'Team Ready to Use', color: '#8B5CF6' }
    ],
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'New to Salesforce? Let\'s get you set up the right way from the start.',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" stroke="white" stroke-width="2" fill="none"/>
      <path d="M24 32L30 38L40 26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  'system-integration': {
    title: 'System Integration',
    description: 'We connect Salesforce to your other essential tools like Slack, Mailchimp, and ERPs.',
    overview: 'Your business uses multiple tools, but they don\'t talk to each other. We create seamless integrations that connect Salesforce with your existing systems, eliminating data silos and providing a unified view of your business.',
    features: [
      'API Development',
      'Third-party connectors',
      'Data synchronization',
      'Real-time data flow'
    ],
    results: [
      { icon: 'link', title: 'Unified Data', color: '#10B981' },
      { icon: 'sync', title: 'Real-Time Sync', color: '#3B82F6' },
      { icon: 'chart', title: 'Better Insights', color: '#8B5CF6' }
    ],
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Need to connect Salesforce with your other tools? Let\'s create seamless integrations.',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="6" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="48" cy="16" r="6" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="16" cy="48" r="6" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="48" cy="48" r="6" stroke="white" stroke-width="2" fill="none"/>
      <line x1="22" y1="16" x2="42" y2="16" stroke="white" stroke-width="2"/>
      <line x1="16" y1="22" x2="16" y2="42" stroke="white" stroke-width="2"/>
      <line x1="22" y1="48" x2="42" y2="48" stroke="white" stroke-width="2"/>
      <line x1="48" y1="22" x2="48" y2="42" stroke="white" stroke-width="2"/>
    </svg>`
  },
  'health-checks': {
    title: 'Health Checks',
    description: 'We audit your existing setup to find and fix inefficiencies, boost performance, and improve user experience.',
    overview: 'Is your Salesforce org running smoothly? Our comprehensive health checks identify performance bottlenecks, security issues, and optimization opportunities to ensure your platform operates at peak efficiency.',
    features: [
      'System Audit',
      'Security Review',
      'Performance Optimization',
      'Technical Debt Assessment'
    ],
    results: [
      { icon: 'shield', title: 'Improved Security', color: '#10B981' },
      { icon: 'speed', title: 'Better Performance', color: '#3B82F6' },
      { icon: 'check', title: 'Reduced Risk', color: '#F59E0B' }
    ],
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Worried about your Salesforce health? Let\'s audit and optimize your org.',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="32" height="32" rx="4" stroke="white" stroke-width="2" fill="none"/>
      <path d="M24 32L30 38L40 26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  'process-automation': {
    title: 'Process Automation',
    description: 'We build custom flows and triggers to make Salesforce work exactly how your business operates.',
    overview: 'Stop wasting time on repetitive tasks. We automate your business processes using Salesforce Flow, Process Builder, and Apex to create seamless workflows that save hours every week.',
    features: [
      'Flow Builder',
      'Process Builder Migration',
      'Approval Processes',
      'Automated Notifications'
    ],
    results: [
      { icon: 'clock', title: 'Time Saved', color: '#10B981' },
      { icon: 'accuracy', title: 'Reduced Errors', color: '#3B82F6' },
      { icon: 'scale', title: 'Scalable Processes', color: '#8B5CF6' }
    ],
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Tired of manual work? Let\'s automate your processes and save time.',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L40 24L56 24L44 36L48 52L32 42L16 52L20 36L8 24L24 24L32 8Z" fill="white" opacity="0.9"/>
      <path d="M32 16L38 28L50 28L42 38L44 48L32 40L20 48L22 38L14 28L26 28L32 16Z" fill="white"/>
    </svg>`
  }
};

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

  content.innerHTML = `
    <h3 class="unified-title">${service.title}</h3>
    <p class="unified-description">${service.description}</p>
    <ul class="unified-list">
      ${service.features.map(feature => `
        <li>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${feature}
        </li>
      `).join('')}
    </ul>
    <a href="#/service/${serviceKey}" class="read-more">READ MORE
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  `;

  if (icon) {
    icon.innerHTML = service.icon;
  }
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

