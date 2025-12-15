// Service content data
export const servicesData = {
  'salesforce-quick-start': {
    title: 'Get Started Fast with Salesforce Quick Start',
    description: 'Jumpstart your Salesforce journey with our comprehensive setup service. We configure your org, set up essential objects, and get your team up and running in days, not months.',
    features: [
      'Complete Org Setup & Configuration',
      'User Training & Onboarding',
      'Essential Customizations',
      'Data Migration Support'
    ],
    icon: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" stroke="#3B82F6" stroke-width="3" fill="none"/>
      <path d="M40 60L55 75L80 45" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  'custom-automation': {
    title: 'Automate Your Workflows, Boost Your Productivity',
    description: 'Transform manual processes into automated workflows. Our automation solutions save hours every week by eliminating repetitive tasks and ensuring data consistency across your Salesforce org.',
    features: [
      'Process Builder & Flow Automation',
      'Apex Trigger Development',
      'Workflow Rules & Field Updates',
      'Email & Notification Automation'
    ],
    icon: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20L70 45L95 45L75 60L85 85L60 70L35 85L45 60L25 45L50 45L60 20Z" fill="#3B82F6" opacity="0.3"/>
      <path d="M60 30L67 48L85 48L72 58L78 75L60 67L42 75L48 58L35 48L53 48L60 30Z" fill="#3B82F6"/>
    </svg>`
  },
  'org-health': {
    title: 'Optimize Your Salesforce Org Health',
    description: 'Comprehensive health checks and optimization to ensure your Salesforce org runs smoothly. We identify bottlenecks, clean up technical debt, and optimize performance.',
    features: [
      'Performance Analysis & Optimization',
      'Data Quality Audits',
      'Security & Compliance Review',
      'Technical Debt Cleanup'
    ],
    icon: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="60" height="60" rx="8" stroke="#3B82F6" stroke-width="3" fill="none"/>
      <path d="M50 50L55 55L70 40" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="75" cy="55" r="8" fill="#EF4444"/>
    </svg>`
  },
  'platform-integration': {
    title: 'Create A Single, Unified Source Of Truth.',
    description: 'We connect Salesforce to your other essential business tools. By creating a seamless flow of information, we eliminate data silos and provide a complete view of your customers.',
    features: [
      'Custom API Development',
      'Third-Party App Integration',
      'Error Handling & Monitoring'
    ],
    icon: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="90" cy="30" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="30" cy="90" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="90" cy="90" r="8" fill="#3B82F6" opacity="0.3"/>
      <line x1="38" y1="30" x2="82" y2="30" stroke="#3B82F6" stroke-width="2"/>
      <line x1="30" y1="38" x2="30" y2="82" stroke="#3B82F6" stroke-width="2"/>
      <line x1="38" y1="90" x2="82" y2="90" stroke="#3B82F6" stroke-width="2"/>
      <line x1="90" y1="38" x2="90" y2="82" stroke="#3B82F6" stroke-width="2"/>
      <line x1="38" y1="38" x2="82" y2="82" stroke="#3B82F6" stroke-width="2"/>
      <line x1="82" y1="38" x2="38" y2="82" stroke="#3B82F6" stroke-width="2"/>
    </svg>`
  },
  'custom-solutions': {
    title: 'Tailored Solutions for Your Unique Needs',
    description: 'Every business is unique. We build custom Salesforce solutions designed specifically for your workflows, industry requirements, and business objectives.',
    features: [
      'Custom App Development',
      'Industry-Specific Solutions',
      'Complex Business Logic Implementation',
      'Ongoing Support & Maintenance'
    ],
    icon: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20L80 50H40L60 20Z" fill="#3B82F6" opacity="0.3"/>
      <path d="M40 50L60 80L80 50H40Z" fill="#3B82F6" opacity="0.5"/>
      <circle cx="60" cy="50" r="15" fill="#3B82F6"/>
    </svg>`
  }
};

// Service button mapping
export const serviceButtonMap = {
  'Salesforce Quick Start': 'salesforce-quick-start',
  'Custom Automation': 'custom-automation',
  'Org Health': 'org-health',
  'Platform Integration': 'platform-integration',
  'Custom Solutions': 'custom-solutions'
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

