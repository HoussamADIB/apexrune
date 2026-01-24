import { defineConfig } from 'vite';

export default defineConfig({
  // Vite automatically handles SPA routing in dev mode
  // For production, ensure your hosting provider (Netlify) has redirects configured
  // See netlify.toml for production configuration
  build: {
    commonjsOptions: {
      include: [/lucide/, /node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  resolve: {
    preserveSymlinks: false
  },
  optimizeDeps: {
    include: ['lucide']
  }
});

