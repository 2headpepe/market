import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '': {
        target:'http://nedomarket:8003',
        changeOrigin:true,
      },
    },
    host: true,
    port: 3000, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
  },
  plugins: [react()],
})
