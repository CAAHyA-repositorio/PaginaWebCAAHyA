# Análisis Completo del Proyecto CAAHyA Web

A continuación, se presenta un análisis exhaustivo del proyecto **PaginaWebCAAHyA**, estructurado de principio a fin, revisando su propósito, tecnologías y la organización de cada uno de sus directorios.

## 1. Visión General y Propósito

El proyecto es un sitio web estático desarrollado para el **Consejo Académico del Área de las Humanidades y las Artes (CAAHyA)** de la UNAM. Su principal función es servir como un portal informativo donde los usuarios pueden consultar carteleras, comisiones, comités académicos, legislación, consejeros y procesos del consejo. 

La arquitectura del sitio se basa en el uso de HTML semántico, CSS modular y Vanilla JavaScript, complementado con librerías para animaciones e interactividad (Bootstrap, GSAP, AnimeJS). El proyecto utiliza **Vite** como entorno de desarrollo y empaquetador para optimizar y servir los recursos.

## 2. Stack Tecnológico

Según los archivos de configuración (`package.json`, `vite.config.js`) y las carpetas de dependencias (`assets/vendor`), el stack está compuesto por:

*   **Core:** HTML5, Vanilla CSS, y Vanilla JS (ES Modules).
*   **Herramienta de Construcción (Bundler):** Vite (`vite` y `vite-plugin-static-copy`).
*   **Librerías de UI e Interfaz:** Bootstrap 5 (CSS/JS) y Bootstrap Icons.
*   **Animaciones:** GSAP (Global GreenSock) y Anime.js.
*   **Gestor de Paquetes:** NPM (Node Package Manager).

## 3. Análisis de la Estructura de Directorios

El proyecto sigue una estructura altamente modular para separar responsabilidades.

### 3.1 Directorio Raíz (`/`)
El directorio principal está reservado exclusivamente para los archivos de configuración y los puntos de entrada principales del sitio web.

*   **Archivos HTML Principales:** Representan las páginas navegables completas.
    *   `index.html`: Página principal de inicio.
    *   `cartelera.html`, `comisiones.html`, `comitesAcademicos.html`, `consejeros.html`, `legislacion.html`, `procesoConsejo.html`, `search.html`: Páginas de navegación.
*   **Archivos de Configuración:**
    *   `package.json` / `package-lock.json`: Definen las dependencias (Vite, GSAP) y los scripts de inicio/compilación. **Nota:** El script de build hace referencia a un comando `node scripts/build-search-index.mjs`, pero la carpeta `scripts` no parece estar presente en el repositorio.
    *   `vite.config.js`: Configura el empaquetado, indicando múltiples puntos de entrada HTML y copiando estáticos desde `assets`.
    *   `.gitignore`: Excluye carpetas como `node_modules/` y la carpeta de compilación `dist/`.

### 3.2 Directorio `assets/`
Contiene todos los recursos estáticos del sitio, agrupados por su tipo.

*   **`css/`**: Hojas de estilo modulares. Destacan:
    *   `base.css`: Estilos fundamentales.
    *   `layout.css`: Estructura del layout (navbar, footer, containers).
    *   `components.css`: Estilos para botones, tarjetas, pills, etc.
    *   `theme.css`: Definición de colores y variables del tema.
    *   `responsive.css`: Media queries para adaptabilidad.
    *   `cartelera.css`, `comites-academicos.css`: Estilos específicos por página.
*   **`js/`**: Lógica de interacción del proyecto.
    *   `main.js`: Lógica global (navbar, inicialización de tooltips, transiciones de página).
    *   `index-page.js`, `cartelera.js`, `comisiones.js`: Scripts atados a la lógica de páginas específicas.
    *   `marquee-fallback.js`: Fallback para animaciones de tipo marquesina.
*   **`img/`, `audio/`, `pdf/`**: Recursos multimedia. Los PDF probablemente contienen las actas, reglamentos y documentaciones formales.
*   **`vendor/`**: Librerías de terceros instaladas estáticamente para no depender de node_modules en la distribución HTML. Incluye `animejs`, `bootstrap`, `bootstrap-icons` y `gsap`.
*   **Archivos JSON (`search-index.json`, `search-manifest.json`)**: Estos archivos soportan el motor de búsqueda interno (que es consumido en `search.html`).

### 3.3 Directorio `modals/`
Este es un patrón arquitectónico clave del proyecto. En lugar de tener archivos HTML gigantes o componentes React/Vue, el proyecto carga "ventanas emergentes (modales)" dinámicamente mediante `fetch` de JavaScript.

*   **Estructura Interna:** Contiene carpetas lógicas como `entidades/`, `modalsComites/`, `modalsEspeciales/` y `modalsPermanentes/`.
*   **Archivos (ej. `modalPleno.html`, `modalContacto.html`):** Son fragmentos de HTML (sin `<head>` ni `<body>` completo) que se inyectan en tiempo de ejecución en el DOM de la página principal. Esto aligera enormemente la carga inicial de la página.

### 3.4 Directorio `documentacion/`
Una excelente práctica dentro del proyecto. Contiene documentación técnica en formato Markdown (`.md`).

*   `documentacion_Estructura_Proyecto.md`: Explica las reglas de organización.
*   `documentacion_HTML_CSS.md`, `documentacion_JS_Animaciones.md`, `documentacion_Paginas_Modales.md`: Guías de estilo y convenciones del equipo.

## 4. Hallazgos y Conclusiones Principales

1.  **Arquitectura Modular Inteligente:** Para ser un proyecto Vanilla, el uso de fragmentos HTML en la carpeta `modals/` cargados dinámicamente es una excelente decisión que mejora el rendimiento de carga y el mantenimiento del código.
2.  **Uso de Vite:** Permite usar ES Modules y gestionar de manera eficiente la compilación para producción sin tener que configurar complejos pipelines de Webpack.
3.  **Sistema CSS:** Tienen un sistema CSS bien distribuido (`base`, `layout`, `components`, `theme`), lo que sugiere una metodología escalable tipo ITCSS o SMACSS adaptada.
4.  **Alerta Menor (Scripts):** En el `package.json`, el script `"build:index": "node scripts/build-search-index.mjs"` fallaría si se intenta correr, ya que la carpeta `scripts/` no está en la raíz del proyecto actualmente.
5.  **Motor de Búsqueda Estático:** El uso de `search-index.json` indica que implementaron un sistema de búsqueda en cliente (client-side search), ideal para sitios estáticos sin un backend conectado.

El proyecto está excelentemente organizado, fácil de mantener y sigue buenas prácticas de optimización de carga y separación de responsabilidades.
