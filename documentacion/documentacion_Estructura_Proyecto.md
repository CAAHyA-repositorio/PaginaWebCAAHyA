# Documentación de la Estructura del Proyecto

Este documento describe la estructura de carpetas y archivos del proyecto `CAAHyA Web`. Explica su propósito, qué tipo de archivos se deben incluir en cada directorio, y qué prácticas se deben evitar para mantener el proyecto organizado.

## Estructura General

```text
d:\caahya_web
├── assets/                 # Recursos estáticos del sitio
├── dist/                   # Archivos construidos para producción (Generado por Vite)
├── modals/                 # Archivos HTML que representan ventanas modales
├── node_modules/           # Dependencias de npm
├── .git/                   # Configuración del repositorio
├── .vscode/                # Configuraciones específicas del editor VS Code
├── .gitignore              # Archivos y carpetas ignorados por Git
├── package.json            # Configuración del proyecto de Node y dependencias
├── package-lock.json       # Árbol de dependencias exactas
├── vite.config.js          # Configuración de herramientas de empaquetado (Vite)
├── *.html                  # Archivos HTML principales (Páginas del sitio)
└── *.md                    # Archivos de documentación (como este)
```

### 1. Directorio Raíz (`/`)
El directorio raíz está destinado **únicamente** a archivos de configuración del proyecto, documentación general, y los archivos HTML correspondientes a las páginas principales del sitio.

*   **¿Qué va aquí?**
    *   Archivos HTML que representan una página completa navegable (ej. `index.html`, `cartelera.html`, `comisiones.html`).
    *   Archivos de configuración globales (`package.json`, `vite.config.js`, `.gitignore`).
    *   Documentación técnica en formato Markdown (`.md`).
*   **¿Qué NO va aquí?**
    *   No colocar archivos de diseño (CSS), scripts (JS), imágenes, ni URLs de documentos estáticos temporales. Todo recurso que acompañe a estas páginas debe estar en el directorio `assets`.
    *   No incluir secciones o recortes de HTML que no son páginas principales (estas van en `modals`).

### 2. Directorio `assets/`
Este directorio contiene todos los recursos estáticos vinculados desde el código fuente HTML/JS.

```text
assets/
├── css/                    # Hojas de estilo del sitio
├── img/                    # Imágenes y recursos gráficos
├── js/                     # Scripts y lógica de la aplicación
├── pdf/                    # Documentos descargables y de consulta
├── vendor/                 # Librerías externas de terceros
└── search-*.json           # Archivos de metadatos o índices de búsqueda
```

*   **`assets/css/`**
    *   **Propósito:** Contener todos los archivos `.css`.
    *   **¿Qué va aquí?** Estilos globales, estilos de módulos específicos, librerías CSS propias.
    *   **¿Qué NO va aquí?** Archivos de pre-procesadores (.scss o .less) si no están siendo compilados, a menos que se integren bajo esa estructura en el futuro.
*   **`assets/img/`**
    *   **Propósito:** Almacenar cualquier archivo gráfico usado en el sitio.
    *   **¿Qué va aquí?** Formatos `.jpg`, `.png`, `.svg`, `.webp`, `.gif`. Logotipos, fondos, íconos y banners.
    *   **¿Qué NO va aquí?** Archivos de diseño fuente muy pesados como `.psd`, `.ai` o videos grandes.
*   **`assets/js/`**
    *   **Propósito:** Contener la lógica particular de interactividad del proyecto.
    *   **¿Qué va aquí?** Archivos `.js` creados específicamente para este sitio (como la carga de modales, animaciones, lógica de interacción).
    *   **¿Qué NO va aquí?** Dependencias instalables vía `npm` o grandes bibliotecas (estas deben ir en `assets/vendor` o `node_modules`).
*   **`assets/pdf/`**
    *   **Propósito:** Archivar documentos que los usuarios consultarán o descargarán.
    *   **¿Qué va aquí?** Archivos `.pdf` de reglamentos, legislaciones, carteles u otros documentos oficiales vinculados en el sitio.
    *   **¿Qué NO va aquí?** Documentos de ofimática genéricos (.docx, .xlsx) a menos que sea estrictamente necesario. Priorizar siempre formatos abiertos como PDF para la publicación al visitante.
*   **`assets/vendor/`**
    *   **Propósito:** Proveer recursos de librerías externas que no se manejan estrictamente con NPM.
    *   **¿Qué va aquí?** CSS o JS de frameworks (ej. Bootstrap si es estático), plugins locales o íconos especiales que se incluyan manualmente.
    *   **¿Qué NO va aquí?** Código escrito por los autores del proyecto local.

### 3. Directorio `modals/`
Este directorio está diseñado para organizar componentes parciales de la interfaz de usuario, especialmente orientados a las ventanas emergentes (modales) informativas.

```text
modals/
├── entidades/              # HTML para representaciones de entidades
├── modalsComites/          # HTML modales vinculadas a comités
├── modalsEspeciales/       # HTML modales para apartados especiales
├── modalsPermanentes/      # HTML modales de componentes permanentes
└── modal*.html             # Archivos modales de propósito general
```

*   **Propósito:** Facilitar la carga diferida e inserción dinámica de secciones pesadas (como largos listados de comisiones o información detallada que no necesita cargarse de primera mano en el `index.html`), a través de Fetch API en JavaScript.
*   **¿Qué va aquí?** Puros archivos HTML sin encabezados completos (idealmente fragmentos o contenido interno que forma la estructura de una modal dentro del sitio).
*   **¿Qué NO va aquí?** Páginas completas independientes (éstas van en la raíz). No incrustar grandes bloques de CSS o `<script>` directamente en estos HTML fragmentados, delegando esa tarea en `assets/`.

### 4. Directorio `dist/`
*   **Propósito:** Es la versión empaquetada, procesada y minimizada de tu código, que generará el comando de `Vite` (como `npm run build`). Es la copia que verdaderamente debería exponerse en el servidor público de producción.
*   **¿Qué va aquí?** Archivos auto-generados que son una versión final estática.
*   **¿Qué NO va aquí?** **NUNCA** editar archivos manualmente dentro de `dist/`. Cualquier cambio será sobreescrito la próxima vez que se construya el proyecto. Edita los archivos en sus directorios originales de trabajo.

### 5. Archivos de Herramientas y Configuración
*   `node_modules/`: Auto-generado por npm. Nunca comitear a Git ni modificar manualmente.
*   `package.json` y `package-lock.json`: Dictan las dependencias (como Vite) de tu proyecto.
*   `vite.config.js`: Da las reglas sobre cómo compilar módulos y assets.

## Fines y Buenas Prácticas
1. **Modularidad:** El hecho de tener modales extraídas en `html` separados aligera las páginas base.
2. **Consistencia:** Todo elemento estático tiene que ir indiscutiblemente en `assets/`. Las importaciones/rutas relativas a través del proyecto siempre apuntarán a subdirectorios de `assets/` o `modals/`.
3. **Mantenimiento:** Respeta la semántica de las carpetas de imágenes vs pdfs. No restrinjas todo en un solo folder de subida.
4. **Respaldo de Git:** Evita incluir la compilación de `dist` en `.git`, `.gitignore` es clave aquí para concentrarse en respaldar y compartir exclusivamente el código de programación.
