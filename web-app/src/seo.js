// SEO utility functions for dynamic meta tag updates

const pageMeta = {
  '/': {
    title: 'ApexRune - Salesforce Optimization & Automation Experts',
    description: 'Expert Salesforce developers who build, optimize, and automate your platform. Certified Salesforce consultants specializing in custom development, system integration, health checks, and process automation.',
    keywords: 'Salesforce, Salesforce optimization, Salesforce automation, Salesforce consulting, Salesforce developers'
  },
  '/services': {
    title: 'Our Services - Salesforce Development & Consulting | ApexRune',
    description: 'Comprehensive Salesforce services including custom development, system integration, health checks, and process automation. Transform your Salesforce platform with expert solutions.',
    keywords: 'Salesforce services, Salesforce development, Salesforce integration, Salesforce health check, Salesforce automation'
  },
  '/service/custom-development': {
    title: 'Custom Salesforce Development Services | ApexRune',
    description: 'Bespoke Salesforce applications built to solve your unique business challenges. Custom objects, Apex triggers, and tailored solutions.',
    keywords: 'Salesforce custom development, Apex development, Salesforce customization, Salesforce apps'
  },
  '/service/system-integration': {
    title: 'Salesforce System Integration Services | ApexRune',
    description: 'Connect Salesforce to your essential tools like Slack, Mailchimp, and ERPs. Seamless API development and third-party integrations.',
    keywords: 'Salesforce integration, Salesforce API, Salesforce connectors, system integration'
  },
  '/service/health-checks': {
    title: 'Salesforce Health Check & Audit Services | ApexRune',
    description: 'Comprehensive Salesforce audits to find and fix inefficiencies. Boost performance, improve user experience, and optimize your org.',
    keywords: 'Salesforce health check, Salesforce audit, Salesforce optimization, Salesforce performance'
  },
  '/service/process-automation': {
    title: 'Salesforce Process Automation Services | ApexRune',
    description: 'Custom flows, triggers, and automation to make Salesforce work exactly how your business operates. Streamline processes and eliminate manual work.',
    keywords: 'Salesforce automation, Flow Builder, Salesforce triggers, process automation'
  },
  '/contact': {
    title: 'Contact Us - Get Your Free Salesforce Consultation | ApexRune',
    description: 'Schedule your free consultation with Salesforce experts. Let\'s discuss how we can transform your Salesforce platform.',
    keywords: 'contact Salesforce consultant, Salesforce consultation, Salesforce expert'
  },
  '/case-studies': {
    title: 'Salesforce Case Studies - Real Results | ApexRune',
    description: 'See how we\'ve helped businesses transform their Salesforce platforms. Real case studies with measurable results.',
    keywords: 'Salesforce case studies, Salesforce success stories, Salesforce results'
  },
  '/blog': {
    title: 'Salesforce Blog - Insights & Best Practices | ApexRune',
    description: 'Expert Salesforce tips, guides, and insights. Learn best practices for optimization, automation, integration, and more.',
    keywords: 'Salesforce blog, Salesforce tips, Salesforce best practices, Salesforce guides, Salesforce insights'
  }
};

export function updateMetaTags(path) {
  // Handle service pages dynamically
  let meta = pageMeta[path];
  
  if (!meta && path.startsWith('/service/')) {
    const serviceKey = path.split('/service/')[1];
    const serviceNames = {
      'custom-development': 'Custom Development',
      'system-integration': 'System Integration',
      'health-checks': 'Health Checks',
      'process-automation': 'Process Automation'
    };
    const serviceName = serviceNames[serviceKey] || 'Service';
    meta = {
      title: `${serviceName} - Salesforce Services | ApexRune`,
      description: `Expert ${serviceName.toLowerCase()} services for Salesforce. Transform your platform with certified Salesforce consultants.`,
      keywords: `Salesforce ${serviceKey}, ${serviceName.toLowerCase()}, Salesforce services`
    };
  }
  
  // Handle blog post pages dynamically
  if (!meta && path.startsWith('/blog/')) {
    import('./blog.js').then(({ getPostById }) => {
      const postId = path.split('/blog/')[1];
      const post = getPostById(postId);
      if (post) {
        meta = {
          title: `${post.title} | ApexRune Blog`,
          description: post.excerpt,
          keywords: `Salesforce, ${post.category}, Salesforce best practices, Salesforce tips`
        };
        // Update meta tags with post data
        document.title = meta.title;
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', meta.description);
      }
    });
  }
  
  // Fallback to home page meta
  if (!meta) {
    meta = pageMeta['/'];
  }
  
  // Update title
  document.title = meta.title;
  
  // Update or create meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.description);
  
  // Update or create meta keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
  }
  keywordsMeta.setAttribute('content', meta.keywords);
  
  // Update Open Graph tags
  updateOGTag('og:title', meta.title);
  updateOGTag('og:description', meta.description);
  updateOGTag('og:url', `https://apexrune.com${path}`);
  
  // Update Twitter tags
  updateTwitterTag('twitter:title', meta.title);
  updateTwitterTag('twitter:description', meta.description);
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://apexrune.com${path}`);
}

function updateOGTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateTwitterTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

