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

  // Update OG image (always use the same OG image)
  updateOGImage('https://apexrune.com/og-image.png');

  // Add Breadcrumb Schema for all pages (except home) - async
  addBreadcrumbSchema(path).catch(err => console.error('Error adding breadcrumb schema:', err));

  // Add Service Schema for service detail pages
  if (path.startsWith('/service/')) {
    const serviceKey = path.split('/service/')[1];
    const serviceNames = {
      'custom-development': 'Custom Salesforce Development',
      'system-integration': 'Salesforce System Integration',
      'health-checks': 'Salesforce Health Check & Audit',
      'process-automation': 'Salesforce Process Automation'
    };
    const serviceDescriptions = {
      'custom-development': 'Bespoke Salesforce applications built to solve your unique business challenges. Custom objects, Apex triggers, and tailored solutions.',
      'system-integration': 'Connect Salesforce to your essential tools like Slack, Mailchimp, and ERPs. Seamless API development and third-party integrations.',
      'health-checks': 'Comprehensive Salesforce audits to find and fix inefficiencies. Boost performance, improve user experience, and optimize your org.',
      'process-automation': 'Custom flows, triggers, and automation to make Salesforce work exactly how your business operates. Streamline processes and eliminate manual work.'
    };
    
    const serviceName = serviceNames[serviceKey] || 'Salesforce Service';
    const serviceDescription = serviceDescriptions[serviceKey] || meta.description;
    
    addServiceSchema(serviceKey, serviceName, serviceDescription);
  } else {
    // Remove service schema if not on a service page
    const existingServiceSchema = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
    if (existingServiceSchema) {
      existingServiceSchema.remove();
    }
  }
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

// Service Schema for service detail pages
function addServiceSchema(serviceKey, serviceName, serviceDescription) {
  // Remove existing service schema if any
  const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "ProfessionalService",
      "name": "ApexRune",
      "url": "https://apexrune.com"
    },
    "serviceType": "Salesforce Consulting",
    "areaServed": "Worldwide",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'service');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Breadcrumb Schema - dynamically generated based on URL path
async function addBreadcrumbSchema(path) {
  // Remove existing breadcrumb schema if any
  const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  // Don't add breadcrumbs for home page
  if (path === '/' || path === '') {
    return;
  }

  const baseUrl = 'https://apexrune.com';
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];

  let position = 2;
  const pathParts = path.split('/').filter(p => p);

  // Map path segments to readable names
  const pathNameMap = {
    'services': 'Services',
    'service': 'Services',
    'blog': 'Blog',
    'case-studies': 'Case Studies',
    'case-study': 'Case Studies',
    'contact': 'Contact',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service'
  };

  // Service name mapping
  const serviceNameMap = {
    'custom-development': 'Custom Development',
    'system-integration': 'System Integration',
    'health-checks': 'Health Checks',
    'process-automation': 'Process Automation'
  };

  // Build breadcrumb items
  let currentPath = '';
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    currentPath += '/' + part;

    let name = pathNameMap[part] || part;
    
    // Special handling for service pages
    if (part === 'service' && i + 1 < pathParts.length) {
      const serviceKey = pathParts[i + 1];
      name = serviceNameMap[serviceKey] || serviceKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      currentPath += '/' + serviceKey;
      i++; // Skip next part as we've processed it
    }
    // Special handling for blog posts - try to get actual post title
    else if (part === 'blog' && i + 1 < pathParts.length) {
      const postId = pathParts[i + 1];
      // Try to get post title dynamically
      try {
        const { getPostById } = await import('./blog.js');
        const post = getPostById(postId);
        if (post && post.title) {
          name = post.title;
        } else {
          name = postId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      } catch (e) {
        name = postId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      currentPath += '/' + postId;
      i++; // Skip next part
    }
    // Special handling for case studies
    else if (part === 'case-study' && i + 1 < pathParts.length) {
      const caseId = pathParts[i + 1];
      name = caseId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      currentPath += '/' + caseId;
      i++; // Skip next part
    }

    items.push({
      "@type": "ListItem",
      "position": position++,
      "name": name,
      "item": baseUrl + currentPath
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'breadcrumb');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Update OG image tag
function updateOGImage(imageUrl) {
  updateOGTag('og:image', imageUrl);
  updateTwitterTag('twitter:image', imageUrl);
}

