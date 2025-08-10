import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  esbuild: {
    // Treat .js files in src/ as JSX so we don't need to rename files
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});


