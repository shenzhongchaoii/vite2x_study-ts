import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      apis: path.resolve(__dirname, "src/apis"),
      components: path.resolve(__dirname, "src/components"),
      layouts: path.resolve(__dirname, "src/layouts"),
      mixins: path.resolve(__dirname, "src/mixins"),
      plugins: path.resolve(__dirname, "src/plugins"),
      router: path.resolve(__dirname, "src/router"),
      store: path.resolve(__dirname, "src/store"),
      styles: path.resolve(__dirname, "src/styles"),
      utils: path.resolve(__dirname, "src/utils"),
      views: path.resolve(__dirname, "src/views")
    }
  },
  server: {
    port: 8081
  },
  plugins: [vue(), vueJsx(), viteMockServe({})]
})
