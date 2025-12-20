// Global dropdown state management to prevent conflicts
const dropdownState = {
  handlers: new Map(), // Store handlers for cleanup
  initialized: false
};

// Initialize dropdown menus with robust state management and cleanup
export function initDropdownMenus() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  // Clean up any existing handlers first
  cleanupDropdownMenus();
  
  // Add class to disable CSS hover (JavaScript will handle it)
  nav.classList.add('js-dropdown-enabled');
  
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach((dropdown, index) => {
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    
    // Initialize menu state
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.pointerEvents = 'none';
    
    let hideTimeout = null;
    let isVisible = false;
    let isHovering = false;
    
    const showMenu = () => {
      if (hideTimeout) {
      clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      
      isHovering = true;
      isVisible = true;
      
      // Use requestAnimationFrame for smooth transitions
      requestAnimationFrame(() => {
        if (isHovering) {
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.pointerEvents = 'auto';
          menu.style.transition = 'opacity 0.15s ease, visibility 0.15s ease';
        }
      });
    };
    
    const hideMenu = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      hideTimeout = setTimeout(() => {
        // Only hide if we're still not hovering
        if (!isHovering) {
          isVisible = false;
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.pointerEvents = 'none';
        }
      }, 150); // Slightly reduced delay for better responsiveness
    };
    
    const handleMouseEnter = (e) => {
      isHovering = true;
      isVisible = true;
      showMenu();
    };
    
    const handleMouseLeave = (e) => {
      // Check if we're moving to a child element
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && (dropdown.contains(relatedTarget) || menu.contains(relatedTarget))) {
        return; // Still within dropdown area
      }
      isHovering = false;
      hideMenu();
    };
    
    // Add event listeners
    dropdown.addEventListener('mouseenter', handleMouseEnter);
    dropdown.addEventListener('mouseleave', handleMouseLeave);
    menu.addEventListener('mouseenter', handleMouseEnter);
    menu.addEventListener('mouseleave', handleMouseLeave);
    
    // Also handle focus for accessibility
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      const handleFocus = () => {
        isHovering = true;
        isVisible = true;
        showMenu();
      };
      
      const handleBlur = (e) => {
        // Delay to allow clicking on menu items
        setTimeout(() => {
          if (!dropdown.contains(document.activeElement)) {
            isHovering = false;
            hideMenu();
          }
        }, 100);
      };
      
      trigger.addEventListener('focus', handleFocus);
      trigger.addEventListener('blur', handleBlur);
      
      // Store handlers for cleanup
      dropdownState.handlers.set(dropdown, {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        focus: handleFocus,
        blur: handleBlur,
        menu: menu,
        trigger: trigger,
        hideMenu: hideMenu,
        isHovering: () => isHovering,
        setIsHovering: (val) => { isHovering = val; }
      });
    } else {
      dropdownState.handlers.set(dropdown, {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        menu: menu,
        hideMenu: hideMenu,
        isHovering: () => isHovering,
        setIsHovering: (val) => { isHovering = val; }
      });
    }
  });
  
  // Global click handler to close dropdowns when clicking outside
  // Set up after handlers are stored
  const handleDocumentClick = (e) => {
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!menu) return;
      
      // If click is outside the dropdown, close it
      if (!dropdown.contains(e.target) && !menu.contains(e.target)) {
        const handlers = dropdownState.handlers.get(dropdown);
        if (handlers && handlers.hideMenu) {
          handlers.hideMenu();
        }
      }
    });
  };
  
  // Add document click listener (will be cleaned up on next init)
  document.addEventListener('click', handleDocumentClick, true);
  dropdownState.documentClickHandler = handleDocumentClick;
  
  dropdownState.initialized = true;
}

// Clean up dropdown event listeners
export function cleanupDropdownMenus() {
  // Remove document click handler
  if (dropdownState.documentClickHandler) {
    document.removeEventListener('click', dropdownState.documentClickHandler, true);
    dropdownState.documentClickHandler = null;
  }
  
  dropdownState.handlers.forEach((handlers, dropdown) => {
    if (handlers.mouseenter) {
      dropdown.removeEventListener('mouseenter', handlers.mouseenter);
    }
    if (handlers.mouseleave) {
      dropdown.removeEventListener('mouseleave', handlers.mouseleave);
    }
    if (handlers.menu) {
      const menu = handlers.menu;
      if (handlers.mouseenter) {
        menu.removeEventListener('mouseenter', handlers.mouseenter);
      }
      if (handlers.mouseleave) {
        menu.removeEventListener('mouseleave', handlers.mouseleave);
      }
    }
    if (handlers.trigger) {
      if (handlers.focus) {
        handlers.trigger.removeEventListener('focus', handlers.focus);
      }
      if (handlers.blur) {
        handlers.trigger.removeEventListener('blur', handlers.blur);
      }
    }
  });
  
  dropdownState.handlers.clear();
  dropdownState.initialized = false;
  
  // Remove the js-dropdown-enabled class
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.classList.remove('js-dropdown-enabled');
  }
}

