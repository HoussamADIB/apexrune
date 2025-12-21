import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

export function loadPrivacyPolicyPage() {
  import('../../icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${getHeaderHTML(getCommonIcon)}

    <main class="legal-page">
      <div class="container">
        <div class="legal-content">
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-last-updated">Last Updated: January 2025</p>
          
          <section class="legal-section">
            <h2>1. Introduction</h2>
            <p>Welcome to ApexRune ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our Salesforce consulting services.</p>
          </section>

          <section class="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out contact forms or request consultations</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Communicate with us via email or other channels</li>
              <li>Engage with our services</li>
            </ul>
            <p>This information may include your name, email address, phone number, company name, and any other information you choose to provide.</p>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of your visit</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section class="legal-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
          </section>

          <section class="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section class="legal-section">
            <h2>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section class="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.</p>
          </section>

          <section class="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          </section>

          <section class="legal-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
              <li>Phone: +1 (563) 123-4567</li>
              <li>Address: 123 Tech Boulevard, Innovation City, ST 84000</li>
            </ul>
          </section>
        </div>
      </div>
    </main>

    ${getFooterHTML(getCommonIcon)}
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

export function loadTermsOfServicePage() {
  import('../../icons.js').then(({ getCommonIcon }) => {
    const app = document.querySelector('#app');
    app.innerHTML = `
    ${getHeaderHTML(getCommonIcon)}

    <main class="legal-page">
      <div class="container">
        <div class="legal-content">
          <h1 class="legal-title">Terms of Service</h1>
          <p class="legal-last-updated">Last Updated: January 2025</p>
          
          <section class="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the ApexRune website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.</p>
          </section>

          <section class="legal-section">
            <h2>2. Description of Services</h2>
            <p>ApexRune provides Salesforce consulting, development, and optimization services. Our services include but are not limited to:</p>
            <ul>
              <li>Custom Salesforce development</li>
              <li>System integration services</li>
              <li>Health checks and optimization</li>
              <li>Process automation</li>
              <li>Training and consultation</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Use of Services</h2>
            <h3>3.1 Eligibility</h3>
            <p>You must be at least 18 years old and have the legal capacity to enter into contracts to use our services.</p>

            <h3>3.2 User Responsibilities</h3>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Intellectual Property</h2>
            <p>All content, features, and functionality of our website and services, including but not limited to text, graphics, logos, and software, are the exclusive property of ApexRune and are protected by copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section class="legal-section">
            <h2>5. Service Agreements</h2>
            <p>Specific service engagements will be governed by separate service agreements or statements of work that will detail the scope, deliverables, timelines, and payment terms for each project.</p>
          </section>

          <section class="legal-section">
            <h2>6. Payment Terms</h2>
            <p>Payment terms will be specified in individual service agreements. Generally:</p>
            <ul>
              <li>Invoices are due within 30 days of receipt unless otherwise specified</li>
              <li>Late payments may incur interest charges</li>
              <li>We reserve the right to suspend services for non-payment</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>7. Confidentiality</h2>
            <p>We understand the sensitive nature of your business information. We agree to maintain the confidentiality of all proprietary information disclosed to us in the course of providing services, subject to applicable legal requirements.</p>
          </section>

          <section class="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ApexRune shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.</p>
          </section>

          <section class="legal-section">
            <h2>9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless ApexRune, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these Terms of Service.</p>
          </section>

          <section class="legal-section">
            <h2>10. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms of Service or for any other reason we deem necessary.</p>
          </section>

          <section class="legal-section">
            <h2>11. Disclaimers</h2>
            <p>Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
          </section>

          <section class="legal-section">
            <h2>12. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ApexRune operates, without regard to its conflict of law provisions.</p>
          </section>

          <section class="legal-section">
            <h2>13. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the updated terms on our website and updating the "Last Updated" date.</p>
          </section>

          <section class="legal-section">
            <h2>14. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
              <li>Phone: +1 (563) 123-4567</li>
              <li>Address: 123 Tech Boulevard, Innovation City, ST 84000</li>
            </ul>
          </section>
        </div>
      </div>
    </main>

    ${getFooterHTML(getCommonIcon)}
  `;

    addLegalPageStyles();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Initialize mobile menu and dropdowns
    cleanupDropdownMenus();
    initMobileMenu();
    initDropdownMenus();
  });
}

function addLegalPageStyles() {
  if (document.getElementById('legal-page-styles')) return;

  const style = document.createElement('style');
  style.id = 'legal-page-styles';
  style.textContent = `
    .legal-page {
      padding: 2rem 2rem 4rem;
      padding-top: 120px;
      min-height: calc(100vh - 100px);
      background: linear-gradient(to bottom, #F8FAFC, var(--white) 150px);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--bright-blue);
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: opacity 0.2s;
    }

    .back-link:hover {
      opacity: 0.8;
    }

    .legal-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .legal-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 0.5rem;
    }

    .legal-last-updated {
      font-size: 0.875rem;
      color: var(--text-light);
      margin-bottom: 3rem;
    }

    .legal-section {
      margin-bottom: 3rem;
    }

    .legal-section h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-blue);
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    .legal-section h2:first-of-type {
      margin-top: 0;
    }

    .legal-section h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .legal-section p {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .legal-section ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .legal-section li {
      font-size: 1rem;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 0.5rem;
    }

    .legal-section strong {
      color: var(--text-dark);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .legal-page {
        padding: 1.5rem 1rem 3rem;
        padding-top: 100px;
      }

      .legal-title {
        font-size: 2rem;
      }

      .legal-section h2 {
        font-size: 1.5rem;
      }

      .legal-section h3 {
        font-size: 1.125rem;
      }
    }
  `;
  document.head.appendChild(style);
}
