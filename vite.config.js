import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'xing/assets/'
  },
  plugins: [vue()]
})
