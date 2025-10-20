import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'assets/search-*.json', dest: 'assets' },
        { src: 'assets/vendor/**', dest: 'assets/vendor' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        directorio: 'directorio.html',
        search: 'search.html'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
