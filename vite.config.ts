import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Updated for more flexible deployment
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
