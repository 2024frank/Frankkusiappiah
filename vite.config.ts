import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo under /Frankkusiappiah/; Vercel serves at root.
  base: process.env.PAGES ? '/Frankkusiappiah/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


