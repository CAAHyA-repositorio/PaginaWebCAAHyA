import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: './',
  root: '.',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'assets/search-*.json', dest: 'assets' },
        { src: 'assets/vendor/**', dest: 'assets/vendor' },
        { src: 'assets/js/**', dest: 'assets/js' },
        { src: 'assets/css/**', dest: 'assets/css' },
        { src: 'assets/img/**', dest: 'assets/img' },
        { src: 'assets/audio/**', dest: 'assets/audio' },
        { src: 'assets/pdf/**', dest: 'assets/pdf' }
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
        search: 'search.html',
        privacidadSimplificado: 'privacidadSimplificado.html',
        privacidadIntegral: 'privacidadIntegral.html',
        creditos: 'creditos.html',
        juntaGobierno: 'juntaGobierno.html',
        
        // Nuevas páginas (antiguos modales)
        directorio: 'pages/directorio.html',
        pleno: 'pages/pleno.html',
        sobreElConsejo: 'pages/sobreElConsejo.html',
        contacto: 'pages/contacto.html',
        publicaciones: 'pages/publicaciones.html',
        informes: 'pages/informes.html',
        calendario: 'pages/calendario.html',
        entidades: 'pages/entidades.html',
        comparecencias: 'pages/comparecencias.html',
        orgullo: 'pages/orgullo.html',
        
        // Comités
        comiteArquitectura: 'pages/comites/comiteArquitectura.html',
        comiteDiseno: 'pages/comites/comiteDiseno.html',
        comiteFilosofia: 'pages/comites/comiteFilosofia.html',
        comiteHistoria: 'pages/comites/comiteHistoria.html',
        comiteIntercultural: 'pages/comites/comiteIntercultural.html',
        comitePedagogia: 'pages/comites/comitePedagogia.html',
        
        // Comisiones
        personalAcademico: 'pages/comisiones/personalAcademico.html',
        planesYProgramas: 'pages/comisiones/planesYProgramas.html',
        planeacionYEvaluacion: 'pages/comisiones/planeacionYEvaluacion.html',
        difusionYExtension: 'pages/comisiones/difusionYExtension.html',
        comisionVigilancia: 'pages/comisiones/comisionVigilancia.html',
        comisionLenguas: 'pages/comisiones/comisionLenguas.html',
        comisionPRIDE: 'pages/comisiones/comisionPRIDE.html'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
