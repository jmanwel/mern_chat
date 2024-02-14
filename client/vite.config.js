import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // replace with the IP address of the Homestead machine
    https: false,
    cors: false,
    hmr: {
        host: '0.0.0.0', // replace with the IP address of the Homestead machine
    }
  }
}
})