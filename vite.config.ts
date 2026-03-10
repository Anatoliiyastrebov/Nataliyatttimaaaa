import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/telegram': {
        target: 'https://nataliyatttimaaaa.vercel.app',
        changeOrigin: true
      }
    }
  }
})

