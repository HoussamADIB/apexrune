import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

export function loadContactPage() {
  Promise.all([
    import('../../contact-form.js'),
    import('../../icons.js')
  ]).then(([{ getContactFormHTML }, { getCommonIcon }]) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
      ${getHeaderHTML(getCommonIcon)}

      <main class="contact-page">
        <div class="contact-page-container">
          <div class="contact-page-layout">
            <div class="contact-info-panel">
              <h1 class="contact-info-title">Let's Build Something Great Together.</h1>
              <p class="contact-info-description">Whether you have a specific project in mind or just want to explore what's possible, we're here to help.</p>
              
              <div class="contact-info-items">
                <div class="contact-info-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:contact@apexrune.com" class="contact-info-link">contact@apexrune.com</a>
                </div>
                
                <div class="contact-info-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <a href="/contact" class="contact-info-link underlined">Book a Free 30-Minute Discovery Call</a>
                </div>
              </div>
              
              <p class="contact-info-footer">We'll respond within one business day.</p>
            </div>
            
            <div class="contact-form-panel">
              ${getContactFormHTML()}
            </div>
          </div>
        </div>
      </main>

      ${getFooterHTML(getCommonIcon)}
    `;

    addContactPageStyles();
    initContactPageForm();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function addContactPageStyles() {
  if (document.getElementById('contact-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'contact-page-styles';
  style.textContent = `
    .contact-page {
      min-height: calc(100vh - 100px);
      background: linear-gradient(135deg, #EEF4FF 0%, #E0EBFF 100%);
      padding-top: 120px;
    }

    .contact-page-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .contact-page-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      min-height: calc(100vh - 200px);
      margin-top: 2rem;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .contact-info-panel {
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 50%, #1E3A8A 100%);
      padding: 4rem 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: var(--white);
      border-radius: 16px 0 0 16px;
    }

    .contact-info-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .contact-info-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      margin-bottom: 3rem;
    }

    .contact-info-items {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .contact-info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .contact-info-item svg {
      flex-shrink: 0;
      color: var(--white);
    }

    .contact-info-link {
      color: var(--white);
      font-size: 1rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .contact-info-link:hover {
      opacity: 0.8;
    }

    .contact-info-link.underlined {
      text-decoration: underline;
    }

    .contact-info-footer {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.8);
      margin-top: auto;
    }

    .contact-form-panel {
      background: var(--white);
      padding: 4rem 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 0 16px 16px 0;
    }

    .contact-page .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: opacity 0.2s;
    }

    .contact-page .back-link:hover {
      opacity: 0.8;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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
    .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #E5E7EB;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
      width: 100%;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--bright-blue);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 150px;
    }

    .contact-form-submit {
      background: var(--dark-blue);
      color: var(--white);
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
      width: 100%;
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

    @media (max-width: 1024px) {
      .contact-page-layout {
        grid-template-columns: 1fr;
      }

      .contact-info-panel {
        padding: 3rem 2rem;
        border-radius: 16px 16px 0 0;
      }

      .contact-form-panel {
        padding: 3rem 2rem;
        border-radius: 0 0 16px 16px;
      }
    }

    @media (max-width: 768px) {
      .contact-page {
        padding-top: 100px;
      }

      .contact-page-container {
        padding: 1.5rem 1rem;
      }

      .contact-page-layout {
        margin-top: 1rem;
      }

      .contact-info-panel {
        padding: 2rem 1.5rem;
      }

      .contact-form-panel {
        padding: 2rem 1.5rem;
      }

      .contact-info-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .contact-info-description {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .contact-info-items {
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .contact-info-item {
        flex-wrap: wrap;
      }

      .contact-info-link {
        font-size: 0.9375rem;
      }

      .form-group input,
      .form-group textarea {
        padding: 0.875rem;
        font-size: 1rem;
        min-height: 48px;
        -webkit-appearance: none;
        appearance: none;
      }

      .form-group textarea {
        min-height: 120px;
      }

      .contact-form-submit {
        padding: 1rem 1.5rem;
        min-height: 48px;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .contact-page-container {
        padding: 1.25rem 0.875rem;
      }

      .contact-info-panel {
        padding: 1.75rem 1.25rem;
      }

      .contact-form-panel {
        padding: 1.75rem 1.25rem;
      }

      .contact-info-title {
        font-size: 1.75rem;
      }

      .contact-info-description {
        font-size: 0.9375rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function initContactPageForm() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', handleContactPageFormSubmit);
  }
}

async function handleContactPageFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('.contact-form-submit');
  const formPanel = document.querySelector('.contact-form-panel');
  const originalHTML = formPanel.innerHTML;
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  try {
    const formData = new FormData(form);
    
    // Ensure form-name is set
    if (!formData.has('form-name')) {
      formData.set('form-name', 'contact');
    }
    
    // Log form data for debugging (remove in production if needed)
    console.log('Submitting form with data:', Object.fromEntries(formData));
    
    // Submit to Netlify Forms
    // Use the current pathname to avoid redirect issues in SPAs
    const submitPath = window.location.pathname === '/' ? '/' : window.location.pathname;
    const response = await fetch(submitPath, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams(formData).toString(),
      redirect: 'follow' // Explicitly follow redirects
    });
    
    console.log('Form submission response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      redirected: response.redirected,
      type: response.type
    });
    
    // Netlify Forms returns 200 on successful AJAX submission
    // According to Netlify docs: "successful AJAX submissions return 200"
    // Also handle 302/301/303 redirects which Netlify sometimes returns
    if (response.ok || [200, 301, 302, 303].includes(response.status)) {
      // Success - show success message
      formPanel.innerHTML = `
        <div class="form-success">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" fill="#10B981" opacity="0.1"/>
            <path d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" fill="#10B981"/>
            <path d="M24 32L30 38L40 26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Thank you for your message!</h3>
          <p>We'll get back to you within one business day.</p>
        </div>
      `;
    } else {
      // Try to get error message from response
      const status = response.status;
      let errorMessage = `Form submission failed with status ${status}`;
      let errorDetails = '';
      
      try {
        const responseText = await response.text();
        if (responseText) {
          console.error('Netlify form error response:', responseText);
          errorDetails = responseText.substring(0, 200); // Limit length
          
          // Check if it's a validation error (422) or other error
          if (status === 422) {
            errorMessage = 'Please check your form fields and try again.';
          } else if (status === 404) {
            errorMessage = 'Form endpoint not found. Please contact us directly.';
          }
        }
      } catch (e) {
        console.error('Could not read error response:', e);
      }
      
      console.error('Form submission failed:', { status, errorMessage, errorDetails });
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Determine if it's a network error
    const isNetworkError = error.message.includes('Failed to fetch') || 
                          error.message.includes('NetworkError') ||
                          error.name === 'TypeError';
    
    // Show error message with retry functionality
    formPanel.innerHTML = `
      <div class="form-error">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#EF4444" opacity="0.1"/>
          <circle cx="32" cy="32" r="30" stroke="#EF4444" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.01" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <h3>Something went wrong</h3>
        <p>${isNetworkError ? 'Network error. Please check your connection and try again.' : 'Please try again or contact us directly at contact@apexrune.com'}</p>
        <button id="retry-form-btn" class="contact-form-submit" style="margin-top: 1.5rem;">Try Again</button>
      </div>
    `;
    
    // Add retry button handler
    const retryBtn = document.getElementById('retry-form-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        // Restore original form
        formPanel.innerHTML = originalHTML;
        // Re-initialize form handler
        const restoredForm = document.querySelector('.contact-form');
        if (restoredForm) {
          restoredForm.addEventListener('submit', handleContactPageFormSubmit);
        }
      });
    }
  }
}
