import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/, // allow JSX in .js within src
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});


