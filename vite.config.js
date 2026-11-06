import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// User-site repo (thaiveng.github.io) is served from the domain root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split the heavy 3D/animation libraries out of the entry chunk so the
        // hero text paints before three.js finishes downloading.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@react-three')) return 'r3f';
          if (id.includes('/three/') || id.includes('three-stdlib')) return 'three';
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils'))
            return 'motion';
          return undefined;
        },
      },
    },
  },
});
