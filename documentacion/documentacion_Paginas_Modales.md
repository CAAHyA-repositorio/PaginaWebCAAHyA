# Documentación de Páginas Principales y sus Modales

Este documento describe la relación entre las páginas principales (archivos HTML en la raíz del proyecto) y las ventanas modales (ubicadas en la carpeta `modals/`) que cada una de ellas carga y utiliza.

## 1. `index.html` (Página de Inicio)
Esta es la página de aterrizaje (Landing Page) y principal. Desde aquí se despliegan modales de información general, sobre el consejo o listados de entidades de la universidad.

**Modales asociadas:**
*   **Información General Institucional:**
    *   `modals/modalDirectorio.html` - Muestra el directorio del Consejo Académico.
    *   `modals/modalPleno.html` - Presenta información o listados relativos al integrante Pleno.
    *   `modals/modalSobreElConsejo.html` - Proporciona información descriptiva acerca del Consejo.
*   **Entidades y Dependencias (`modals/entidades/`):**
    *   `modals/entidades/modalFacultades.html` - Información o listado de Facultades.
    *   `modals/entidades/modalEscuelas.html` - Información o listado de Escuelas Nacionales.
    *   `modals/entidades/modalInstitutos.html` - Información o listado de Institutos.
    *   `modals/entidades/ModalCentros.html` - Información o listado de Centros.

---

## 2. `comitesAcademicos.html` (Comités Académicos)
Página dedicada a mostrar la información y conformación de los distintos comités académicos. Las modales se organizan en subcarpetas para un manejo más limpio.

**Modales asociadas (`modals/modalsComites/`):**
*   `modalComiteArquitectura.html` - Detalles e integrantes del Comité de Arquitectura.
*   `modalComiteIntercultural.html` - Detalles e integrantes del Comité Intercultural.
*   `modalComiteDiseno.html` - Detalles e integrantes del Comité de Diseño.
*   `modalComiteHistoria.html` - Detalles e integrantes del Comité de Historia.
*   `modalComiteFilosofia.html` - Detalles e integrantes del Comité de Filosofía.
*   `modalComitePedagogia.html` - Detalles e integrantes del Comité de Pedagogía.

---

## 3. `comisiones.html` (Comisiones)
Página para desglosar la información correspondiente a las distintas Comisiones, dividiéndose funcionalmente en Permanentes y Especiales.

**Modales asociadas (Comisiones Permanentes en `modals/modalsPermanentes/`):**
*   `modalPersonalAcademico.html` - Detalles de la comisión de Personal Académico.
*   `modalPlanesYProgramas.html` - Detalles de la comisión de Planes y Programas de Estudio.
*   `modalPlanesYProgramasDocs.html` - Documentos y anexos relacionados a Planes y Programas.
*   `modalPlaneacionYEvaluacion.html` - Detalles de la comisión de Planeación y Evaluación.
*   `modalPlaneacionYEvaluacionDocs.html` - Documentos de Planeación y Evaluación.
*   `modalDifusionYExtension.html` - Detalles de la comisión de Difusión y Extensión.
*   `modalDifusionYExtensionDocs.html` - Documentos de Difusión y Extensión.

**Modales asociadas (Comisiones Especiales en `modals/modalsEspeciales/`):**
*   `modalComisionLenguas.html` - Información de la Comisión de Lenguas.
*   `modalComisionInnovacion.html` - Información de la Comisión de Innovación.
*   `modalComisionPosgrados.html` - Información de la Comisión de Posgrados.

---

## 4. Otras Páginas Principales
Las siguientes páginas actualmente **no** cargan ventanas modales internas de la carpeta `modals/` como parte de su estructura (están más enfocadas en presentar su propio contenido general, documentos o vistas simples):

*   **`legislacion.html`**: Muestra listados de reglamentos y documentos legales vinculados directamente a PDF (ej. `/assets/pdf/legislacion/`).
*   **`cartelera.html`**: Presenta eventos, noticias o convocatorias.
*   **`consejeros.html`**: Listado y perfiles generales de los consejeros.
*   **`procesoConsejo.html`**: Describe el flujo o proceso del Consejo.
*   **`search.html`**: Página para mostrar los resultados a partir de una consulta de búsqueda en el sitio.

---

### *Nota sobre la implementación*
Las modales descritas se incrustan en las páginas principales predominantemente a través de la etiqueta `<iframe>`. Esto permite cargar su contenido sólo cuando es requerido o de forma diferida (`loading="lazy"`), optimizando la velocidad del sitio. Otras modales referencian estos archivos a través del atributo `href` en botones con la clase `.btn`.
