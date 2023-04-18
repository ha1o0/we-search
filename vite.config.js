import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'xing/assets/'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      find: '@',
      replacement: path.resolve('./src')
    }
  }
})
