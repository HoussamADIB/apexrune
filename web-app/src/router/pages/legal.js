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
          <p class="legal-last-updated">Last Updated: January 31, 2026</p>
          
          <section class="legal-section">
            <h2>1. Introduction</h2>
            <p>Welcome to ApexRune. We are a remote Salesforce consulting practice committed to protecting your privacy. This Privacy Policy explains what information we collect through our website and how we use it.</p>
          </section>

          <section class="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Contact Form Data</h3>
            <p>When you submit our contact form, we collect:</p>
            <ul>
              <li>Your name (first and last)</li>
              <li>Email address</li>
              <li>Company name (optional)</li>
              <li>Service interest</li>
              <li>Message content</li>
              <li>Urgency level (optional)</li>
            </ul>
            <p>This information is stored securely and used solely to respond to your inquiry.</p>

            <h3>2.2 Automatically Collected Information</h3>
            <p>Our hosting provider may collect standard server logs including IP addresses, browser type, and access times for security and performance purposes.</p>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information you provide through our contact form to:</p>
            <ul>
              <li>Respond to your inquiry via email</li>
              <li>Understand your service needs</li>
              <li>Schedule consultation calls if requested</li>
              <li>Maintain records of business communications</li>
            </ul>
            <p>We will only send you marketing communications with your explicit consent.</p>
          </section>

          <section class="legal-section">
            <h2>4. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties.</p>
            <p>We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party service providers who assist in operating our website and services, bound by confidentiality obligations</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or other legal process</li>
              <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Data Retention</h2>
            <p>We retain contact form submissions for as long as necessary to respond to your inquiry and for our legitimate business interests (such as maintaining records of potential client conversations).</p>
            <p>You can request deletion of your information at any time by emailing us.</p>
          </section>

          <section class="legal-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the information we have about you</li>
              <li><strong>Correction:</strong> Request that we correct any inaccurate information</li>
              <li><strong>Deletion:</strong> Request that we delete your information</li>
              <li><strong>Opt-out:</strong> Opt out of any future communications (if we introduce them)</li>
            </ul>
            <p>To exercise any of these rights, simply email us at contact@apexrune.com.</p>
          </section>

          <section class="legal-section">
            <h2>7. Cookies and Tracking</h2>
            <p>We may use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. You can control cookie settings through your browser preferences.</p>
          </section>

          <section class="legal-section">
            <h2>8. Third-Party Services</h2>
            <p>We use third-party service providers to operate our website and deliver our services. These providers may collect and process data on our behalf, subject to their own privacy policies.</p>
            <p>Our website may contain links to external websites. We are not responsible for the privacy practices or content of these external sites.</p>
          </section>

          <section class="legal-section">
            <h2>9. International Users</h2>
            <p>We operate remotely and may access our systems from various locations. If you are located outside of where our servers are hosted, your information may be transferred internationally. By using our website, you consent to this transfer.</p>
          </section>

          <section class="legal-section">
            <h2>10. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section class="legal-section">
            <h2>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy as our business evolves. Significant changes will be noted with an updated "Last Updated" date at the top of this page.</p>
          </section>

          <section class="legal-section">
            <h2>12. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or how we handle your information:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
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
          <p class="legal-last-updated">Last Updated: January 31, 2026</p>
          
          <section class="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the ApexRune website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
          </section>

          <section class="legal-section">
            <h2>2. Description of Services</h2>
            <p>ApexRune is a remote Salesforce consulting practice specializing in custom development, system integration, health checks, process automation, and optimization services.</p>
            <p>Specific service engagements are governed by separate service agreements that detail scope, deliverables, timelines, and payment terms for each project.</p>
            <p>The case studies on our website represent anonymized client projects used to demonstrate our technical capabilities, with all proprietary and confidential information removed.</p>
          </section>

          <section class="legal-section">
            <h2>3. Website Use</h2>
            <p>You may use our website to:</p>
            <ul>
              <li>Learn about our services and capabilities</li>
              <li>View case studies and technical examples</li>
              <li>Contact us through our contact form</li>
              <li>Read our blog posts and technical content</li>
            </ul>
            <p>You agree to use our website only for lawful purposes and in a way that doesn't infringe on the rights of others or restrict their use of the website.</p>
          </section>

          <section class="legal-section">
            <h2>4. Intellectual Property</h2>
            <p>All content on this website—including text, images, code examples, case studies, logos, and design—is owned by ApexRune or used with permission.</p>
            <p><strong>Case Studies:</strong> The case studies on our website represent anonymized versions of real projects completed in corporate settings. All client information, company names, and proprietary details have been removed or generalized to protect confidentiality.</p>
            <p>You may not copy, reproduce, or use our content without permission.</p>
          </section>

          <section class="legal-section">
            <h2>5. Service Agreements</h2>
            <p>Client service engagements are governed by separate service agreements or statements of work that include:</p>
            <ul>
              <li>Defined scope, deliverables, and timelines</li>
              <li>Payment terms and pricing</li>
              <li>Confidentiality and non-disclosure provisions</li>
              <li>Intellectual property ownership</li>
              <li>Liability limitations and indemnification</li>
            </ul>
            <p>These Terms of Service apply to website use; service agreements govern actual consulting engagements.</p>
          </section>

          <section class="legal-section">
            <h2>6. Disclaimers</h2>
            <p>Our website and information are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            <p>We do not guarantee that our website will be uninterrupted, secure, or error-free, or that all information will be completely accurate or up-to-date.</p>
          </section>

          <section class="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ApexRune shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
            <ul>
              <li>Your use of or inability to use our website</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>Any bugs, viruses, or other harmful code</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>8. External Links</h2>
            <p>Our website may contain links to external websites (LinkedIn, GitHub, documentation, etc.). We are not responsible for the content or practices of these external sites.</p>
          </section>

          <section class="legal-section">
            <h2>9. Remote Operations</h2>
            <p>ApexRune operates as a remote-first practice. We do not have a physical office location. All communications and services are conducted remotely via email, video calls, and digital collaboration tools.</p>
          </section>

          <section class="legal-section">
            <h2>10. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Material changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section class="legal-section">
            <h2>11. Governing Law and Disputes</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising from these terms or your use of our website shall be resolved through good faith negotiation.</p>
            <p>If you have concerns or disputes, please contact us at contact@apexrune.com to resolve the matter informally before pursuing formal action.</p>
          </section>

          <section class="legal-section">
            <h2>12. Entire Agreement</h2>
            <p>These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and ApexRune regarding your use of our website.</p>
            <p>Once we begin offering services, separate service agreements will govern specific client engagements.</p>
          </section>

          <section class="legal-section">
            <h2>13. Contact Us</h2>
            <p>If you have any questions about these Terms of Service:</p>
            <ul>
              <li>Email: contact@apexrune.com</li>
            </ul>
            <p>We aim to respond to all inquiries within 1-2 business days.</p>
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
