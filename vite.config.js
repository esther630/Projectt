import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // Or your framework plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});