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
            <p>Welcome to ApexRune. We are a remote Salesforce consulting practice currently in our early stages. We are committed to being transparent about how we handle your information. This Privacy Policy explains what information we collect through our website and how we use it.</p>
            <p><strong>Please note:</strong> We are currently building our service offerings and do not yet have active client engagements. This policy primarily covers information collected through our website.</p>
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
            <p>This information is collected via Netlify Forms and stored securely on Netlify's servers. We use it solely to respond to your inquiry.</p>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We currently do not use analytics tools, tracking pixels, or cookies on our website. Standard server logs maintained by Netlify (our hosting provider) may capture basic information such as IP addresses and browser information for security and performance purposes.</p>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information you provide through our contact form to:</p>
            <ul>
              <li>Respond to your inquiry via email</li>
              <li>Understand your service needs</li>
              <li>Schedule consultation calls if requested</li>
            </ul>
            <p>We do not currently send marketing emails, newsletters, or promotional communications. If we introduce these in the future, we will obtain your explicit consent first.</p>
          </section>

          <section class="legal-section">
            <h2>4. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to anyone. Period.</p>
            <p>Your contact form data is stored on Netlify's secure servers (our website hosting provider). Netlify's privacy practices are governed by their own privacy policy.</p>
            <p>We may disclose information only if legally required to do so (e.g., court order, subpoena).</p>
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
            <p>We currently do not use cookies, analytics tools, or tracking technologies on our website. If we introduce these in the future, we will update this policy and, if required, implement a cookie consent banner.</p>
          </section>

          <section class="legal-section">
            <h2>8. Third-Party Services</h2>
            <p><strong>Netlify:</strong> Our website is hosted on Netlify, and contact form data is processed through Netlify Forms. Netlify may collect standard server logs for security and performance. Review Netlify's privacy policy at https://www.netlify.com/privacy/</p>
            <p><strong>External Links:</strong> Our website may link to LinkedIn, email providers, and other external services. We are not responsible for their privacy practices.</p>
          </section>

          <section class="legal-section">
            <h2>9. International Users</h2>
            <p>We operate remotely and may access our systems from various locations. If you are located outside of where our servers are hosted, your information may be transferred internationally. By using our website, you consent to this transfer.</p>
          </section>

          <section class="legal-section">
            <h2>10. Business Status</h2>
            <p>ApexRune is currently in its formation stage. We are building our service offerings and have not yet established a formal business entity. As we grow and formalize our business structure, we will update this policy accordingly.</p>
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
            <h2>1. About These Terms</h2>
            <p>These Terms of Service govern your use of the ApexRune website. By accessing or using our website, you agree to these terms.</p>
            <p><strong>Important Note:</strong> ApexRune is currently in its early stages. We are actively building our service offerings and do not yet have formal client engagements. When we begin offering services, specific projects will be governed by separate service agreements that will detail scope, deliverables, timelines, and payment terms.</p>
          </section>

          <section class="legal-section">
            <h2>2. Who We Are</h2>
            <p>ApexRune is a remote Salesforce consulting practice specializing in custom development, system integration, health checks, process automation, and optimization services.</p>
            <p>We are currently operating in a pre-formation stage and working toward establishing a formal business entity. The case studies and work examples on our website represent anonymized projects completed in previous corporate settings, used here to demonstrate our technical capabilities.</p>
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
            <h2>5. Future Services</h2>
            <p>When we begin offering services to clients, each engagement will be governed by:</p>
            <ul>
              <li>A separate service agreement or statement of work</li>
              <li>Clear scope, deliverables, and timelines</li>
              <li>Agreed payment terms and methods</li>
              <li>Confidentiality provisions</li>
            </ul>
            <p>Payment terms, pricing, and engagement structures are still being finalized and will be discussed on a case-by-case basis with prospective clients.</p>
          </section>

          <section class="legal-section">
            <h2>6. No Warranties</h2>
            <p>Our website is provided "as is" without warranties of any kind. We make no guarantees that:</p>
            <ul>
              <li>The website will always be available or uninterrupted</li>
              <li>All information is completely accurate or up-to-date</li>
              <li>The website will be free from errors or security vulnerabilities</li>
            </ul>
            <p>We are continuously improving our website and services, and some information may change as we grow.</p>
          </section>

          <section class="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ApexRune will not be liable for any indirect, incidental, or consequential damages arising from your use of our website or any information on it.</p>
            <p>Since we do not currently have active service engagements, this limitation primarily applies to website use and information provided through our contact form.</p>
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
            <p>As we grow and formalize our business structure, we may update these Terms of Service. Material changes will be reflected with an updated "Last Updated" date at the top of this page.</p>
            <p>When we establish our formal business entity (LLC or other structure), we will update these terms with our official business information, jurisdiction, and formalized policies.</p>
          </section>

          <section class="legal-section">
            <h2>11. Dispute Resolution</h2>
            <p>If you have any concerns or disputes regarding our website or these terms, please contact us first at contact@apexrune.com so we can try to resolve it informally.</p>
            <p>Formal dispute resolution procedures will be established once we formalize our business structure.</p>
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
