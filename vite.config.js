import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
//  root: 'frontend' ,
  resolve:{ alias: {'@':'frontend'} },
  build: {
    outDir:'build',
    minify: true,
    sourcemap: 'inline',
    rollupOptions: {
      output: {
        format: 'es', // Formato de archivo de salida (ES Module)
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    }
  },
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  server:{
    host:"0.0.0.0",
    port:5173,
    proxy: {
      // Usa el prefijo '/api' para las rutas
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
   optimizeDeps: {
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  buffer: true
              })
          ]
      }
    }
})
