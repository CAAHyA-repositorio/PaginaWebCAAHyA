import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'assets/search-*.json', dest: 'assets' },
        { src: 'assets/vendor/**', dest: 'assets/vendor' },
        { src: 'modals/**', dest: 'modals' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        cartelera: 'cartelera.html',
        comisiones: 'comisiones.html',
        comitesAcademicos: 'comitesAcademicos.html',
        consejeros: 'consejeros.html',
        curso_taller: 'curso_taller.html',
        legislacion: 'legislacion.html',
        procesoConsejo: 'procesoConsejo.html',
        search: 'search.html'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
