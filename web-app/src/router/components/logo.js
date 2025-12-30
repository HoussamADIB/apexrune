// Logo SVG component - matches home page logo
export function getLogoHTML() {
  return `
    <div class="logo-square">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon">
        <defs>
          <filter id="logoShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Blue rounded square background with shadow -->
        <rect width="40" height="40" rx="8" fill="#1E40AF" filter="url(#logoShadow)"/>
        
        <!-- Modern automation icon: Connected workflow nodes -->
        <g stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Workflow nodes -->
          <circle cx="14" cy="14" r="3" fill="white"/>
          <circle cx="26" cy="14" r="3" fill="white"/>
          <circle cx="20" cy="26" r="3" fill="white"/>
          
          <!-- Connecting lines showing automation flow -->
          <path d="M17 14L23 14" stroke-width="2"/>
          <path d="M17.5 16.5L19 23.5" stroke-width="2"/>
          <path d="M22.5 16.5L21 23.5" stroke-width="2"/>
          
          <!-- Arrow indicating automation direction -->
          <path d="M24 14L26 14M25 13L26 14M25 15L26 14" stroke-width="2"/>
        </g>
      </svg>
    </div>
  `;
}


