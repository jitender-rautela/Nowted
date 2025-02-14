import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://nowted-server.remotestate.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure:false,
      },
    },
  },
})
