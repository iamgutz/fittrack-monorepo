import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Support Docker
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
