// Contact form functionality with Netlify Forms integration
export function initContactForm() {
  // Create contact form modal
  createContactModal();
  
  // Add event listeners to all CTA buttons
  setupCTAButtons();
}

function createContactModal() {
  // Check if modal already exists
  if (document.getElementById('contact-modal')) return;

  const modalHTML = `
    <div id="contact-modal" class="contact-modal" style="display: none;">
      <div class="contact-modal-overlay"></div>
      <div class="contact-modal-content">
        <button class="contact-modal-close" aria-label="Close contact form">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="contact-form-container">
          <h2 class="contact-form-title">Schedule Your Free Consultation</h2>
          <p class="contact-form-subtitle">Let's discuss how we can help transform your Salesforce platform.</p>
          
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
            <input type="hidden" name="form-name" value="contact" />
            <p style="display: none;">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div class="form-group">
              <label for="company">Company</label>
              <input type="text" id="company" name="company" />
            </div>
            
            <div class="form-group">
              <label for="service">Service Interest</label>
              <select id="service" name="service">
                <option value="">Select a service...</option>
                <option value="custom-development">Custom Development</option>
                <option value="system-integration">System Integration</option>
                <option value="health-checks">Health Checks</option>
                <option value="process-automation">Process Automation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Tell us about your project *</label>
              <textarea id="message" name="message" rows="5" required placeholder="What challenges are you facing with Salesforce? What would you like to achieve?"></textarea>
            </div>
            
            <div class="form-group">
              <label for="urgency">Urgency</label>
              <select id="urgency" name="urgency">
                <option value="not-urgent">Not urgent - Just exploring</option>
                <option value="soon">Soon - Within 1-3 months</option>
                <option value="urgent">Urgent - Need help ASAP</option>
              </select>
            </div>
            
            <button type="submit" class="contact-form-submit">
              Send Message
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
          
          <div id="form-success" class="form-success" style="display: none;">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" fill="#10B981" opacity="0.1"/>
              <path d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" fill="#10B981"/>
              <path d="M24 32L30 38L40 26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you within 24 hours.</p>
          </div>
          
          <div id="form-error" class="form-error" style="display: none;">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" fill="#EF4444" opacity="0.1"/>
              <circle cx="32" cy="32" r="30" stroke="#EF4444" stroke-width="2"/>
              <path d="M32 20V36M32 44H32.01" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <h3>Something went wrong</h3>
            <p>Please try again or contact us directly at info@apexrune.com</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add event listeners
  const modal = document.getElementById('contact-modal');
  const overlay = modal.querySelector('.contact-modal-overlay');
  const closeBtn = modal.querySelector('.contact-modal-close');
  const form = modal.querySelector('.contact-form');
  
  // Close modal handlers
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display !== 'none') {
      closeModal();
    }
  });
  
  // Form submission handler
  form.addEventListener('submit', handleFormSubmit);
  
  // Add contact form styles
  addContactFormStyles();
}

function setupCTAButtons() {
  // Find all CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button, .service-cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });
  
  // Also handle "Contact US" nav link
  const contactNavLinks = document.querySelectorAll('.nav-link');
  contactNavLinks.forEach(link => {
    if (link.textContent.trim() === 'CONTACT US') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
      });
    }
  });
}

function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Reset form
    const form = modal.querySelector('.contact-form');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');
    
    if (form) form.reset();
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('.contact-form-submit');
  const successDiv = document.getElementById('form-success');
  const errorDiv = document.getElementById('form-error');
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  // Hide any previous messages
  if (successDiv) successDiv.style.display = 'none';
  if (errorDiv) errorDiv.style.display = 'none';
  
  try {
    const formData = new FormData(form);
    
    // Ensure form-name is set
    formData.set('form-name', 'contact');
    
    // Submit to Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });
    
    if (response.ok) {
      // Show success message
      form.style.display = 'none';
      if (successDiv) successDiv.style.display = 'block';
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        closeModal();
      }, 3000);
    } else {
      throw new Error(`Form submission failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error message
    form.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
    
    // Re-enable form after a delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      
      // Show form again
      form.style.display = 'flex';
      errorDiv.style.display = 'none';
    }, 5000);
  }
}

function addContactFormStyles() {
  if (document.getElementById('contact-form-styles')) return;

  const style = document.createElement('style');
  style.id = 'contact-form-styles';
  style.textContent = `
    .contact-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
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

    .contact-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
    }

    .contact-modal-content {
      position: relative;
      background: var(--white);
      border-radius: 16px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      animation: slideUp 0.3s ease;
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

    .contact-modal-close {
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
    }

    .contact-modal-close:hover {
      color: var(--text-dark);
    }

    .contact-form-container {
      padding: 3rem 2rem 2rem;
    }

    .contact-form-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .contact-form-subtitle {
      font-size: 1rem;
      color: var(--text-light);
      text-align: center;
      margin-bottom: 2rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-dark);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #E5E7EB;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--bright-blue);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .contact-form-submit {
      background: var(--bright-blue);
      color: var(--white);
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.2s;
      margin-top: 0.5rem;
    }

    .contact-form-submit:hover:not(:disabled) {
      background: var(--primary-blue);
    }

    .contact-form-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-success,
    .form-error {
      text-align: center;
      padding: 3rem 2rem;
    }

    .form-success svg,
    .form-error svg {
      margin: 0 auto 1.5rem;
    }

    .form-success h3,
    .form-error h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
    }

    .form-success p,
    .form-error p {
      color: var(--text-light);
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .contact-modal {
        padding: 1rem;
      }

      .contact-form-container {
        padding: 2rem 1.5rem 1.5rem;
      }

      .contact-form-title {
        font-size: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

