import { getServiceIcon } from './icons.js';

// Service content data
export const servicesData = {
  'custom-development': {
    title: 'Custom Development',
    description: 'We build bespoke applications on the Salesforce platform that solve your unique business challenges.',
    overview: 'Standard Salesforce functionality is powerful, but sometimes it is not enough. We build custom solutions tailored to your specific processes using Apex, Lightning Web Components (LWC), and Visualforce.',
    engagementTag: 'Project based',
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
    iconKey: 'custom-development'
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
    iconKey: 'salesforce-quick-start'
  },
  'system-integration': {
    title: 'System Integration',
    description: 'We connect Salesforce to your other essential tools like Slack, Mailchimp, and ERPs.',
    overview: 'Your business uses multiple tools, but they don\'t talk to each other. We create seamless integrations that connect Salesforce with your existing systems, eliminating data silos and providing a unified view of your business.',
    engagementTag: 'Project based',
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
    iconKey: 'system-integration'
  },
  'health-checks': {
    title: 'Health Checks',
    description: 'We audit your existing setup to find and fix inefficiencies, boost performance, and improve user experience.',
    overview: 'Is your Salesforce org running smoothly? Our comprehensive health checks identify performance bottlenecks, security issues, and optimization opportunities to ensure your platform operates at peak efficiency.',
    engagementTag: 'Starting at $1,500',
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
    iconKey: 'health-checks'
  },
  'process-automation': {
    title: 'Process Automation',
    description: 'We build custom flows and triggers to make Salesforce work exactly how your business operates.',
    overview: 'Stop wasting time on repetitive tasks. We automate your business processes using Salesforce Flow, Process Builder, and Apex to create seamless workflows that save hours every week.',
    engagementTag: 'Retainer based',
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
    iconKey: 'process-automation'
  }
};

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
    
    content.innerHTML = `
      <h3 class="unified-title">${service.title}</h3>
      <p class="unified-description">${service.description}</p>
      <ul class="unified-list">
        ${service.features.map(feature => `
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

