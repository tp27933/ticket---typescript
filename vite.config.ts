import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    base:loadEnv(mode, process.cwd()).VUE_APP_API,
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: false
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@pages': resolve(__dirname, 'src/pages'),
        "@components": resolve(__dirname, 'src/components'),
        "@imgs": resolve(__dirname, 'src/assets/imgs'),
      },
      extensions: [".ts", ".tsx", ".js"]
    },
    css: {
    modules: false,
    preprocessorOptions: {
      sass: { 
        additionalData: '@import "./src/styles/main"'
      }
    }
    }
    })
}