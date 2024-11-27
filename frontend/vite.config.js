import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend berjalan di localhost:5000
        changeOrigin: true, // Mengubah origin header agar sesuai dengan target
        secure: false, // Tidak perlu HTTPS di development
      },
    },
  },
});
