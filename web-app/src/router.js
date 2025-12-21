// Router - Modular structure
// All routing logic has been moved to router/ directory
// This file now serves as a thin wrapper for backward compatibility

// Re-export core router functions for ES6 imports
export { initRouter, handleRoute } from './router/core.js';

// Re-export UI functions for ES6 imports
export { initDropdownMenus, cleanupDropdownMenus } from './router/ui/dropdowns.js';

// Note: window.* properties are already set in router/core.js for backward compatibility
