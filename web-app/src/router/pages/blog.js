// Blog page loaders - to be extracted from router.js
import { getHeaderHTML } from '../components/header.js';
import { getFooterHTML } from '../components/footer.js';
import { initMobileMenu } from '../ui/mobile-menu.js';
import { initDropdownMenus, cleanupDropdownMenus } from '../ui/dropdowns.js';

// TODO: Extract loadBlogPage, loadBlogPostPage, initBlogFilters and their styles from router.js
export function loadBlogPage() {
  console.warn('loadBlogPage: Not yet extracted from router.js');
}

export function loadBlogPostPage(postId) {
  console.warn('loadBlogPostPage: Not yet extracted from router.js');
}

