// Initialize mobile menu functionality
export function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Hide toggle button when menu is open
    if (toggle) {
      toggle.style.opacity = '0';
      toggle.style.pointerEvents = 'none';
    }
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Show toggle button when menu is closed
    if (toggle) {
      toggle.style.opacity = '1';
      toggle.style.pointerEvents = 'auto';
    }
  }

  if (toggle) toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

