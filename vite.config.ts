import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcssPluginPxtorem from 'postcss-pxtorem'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-domain.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `
          @use "sass:math";
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `
      }
    },
    postcss: {
      plugins: [
        postcssPluginPxtorem({
          rootValue({ file }) {
            return file.indexOf('element-plus') !== -1 ? 16 : 16;
          },
          propList: ['*'],
          selectorBlackList: ['.norem', 'el-', '.el-'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          exclude: /node_modules\/(?!element-plus)/
        })
      ]
    }
  }
})