import { defineConfig } from 'vite';

export default defineConfig({
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

