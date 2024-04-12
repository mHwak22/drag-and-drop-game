import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-gesture-responder'],
    },
  },
  // Specify the entry point for your project
  resolve: {
    alias: {
      // Adjust the path based on your project structure
      // Assuming "src" directory contains your entry point JavaScript file
      '@': path.resolve(__dirname, 'src') 
    }
  },
  // Specify the entry point JavaScript file
  root: './', // Adjust if your entry point file is named differently
});
