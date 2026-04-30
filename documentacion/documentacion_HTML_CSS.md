# CAAHyA Frontend Architecture: Documentación de HTML y CSS

**Autor:** Equipo de Desarrollo (Arquitectura Frontend)
**Tecnología Base:** HTML5 Semántico, Bootstrap 5.x, CSS3 Modular (Vanilla).

Esta documentación detalla la arquitectura, patrones de diseño y librerías de componentes utilizadas en la capa de presentación del proyecto CAAHyA. Está diseñada como un manual definitivo para la integración y escalabilidad del código por parte de nuevos desarrolladores.

---

## 1. Visión General de la Arquitectura

El proyecto adopta un enfoque **Modular y Componentizado** para el CSS, evitando archivos monolíticos o la dependencia estricta de utilitarios (como Tailwind). Se utiliza **Bootstrap 5** como framework base (Grid, Flexbox, y Funcionalidad base JS), pero la identidad y UI institucional están abstraídas en una capa de CSS personalizado meticulosamente estructurada.

### 1.1 Estructura CSS (Separation of Concerns)

El punto de entrada principal es `styles.css` (ubicado en `/assets/css/`), el cual funciona únicamente como un manifiesto de importación (`@import`). Esto mantiene el *Critical Rendering Path* limpio.

*   `base.css`: Define el *Design System* (Design Tokens genéricos). Aquí residen las variables CSS (`:root`), reseteos globales y la topografía base.
*   `layout.css`: Gestiona macro-estructuras (Macro-layout). Específicamente el Header (`.navbar-ca`), navegación (`.mega-menu`), contenedor `Footer` y el `.hero` general de las páginas.
*   `components.css`: El núcleo de la UI interactiva. Aquí se aíslan los micro-componentes repetibles (Tarjetas, Acordeones, Carruseles de documentos, Modales dinámicos).
*   `theme.css`: Clases temáticas de contexto, diseñadas para alterar visualmente secciones completas de manera estandarizada (ej. `.section-formal`).
*   `cartelera.css` / `comites-academicos.css`: Hojas de estilo encapsuladas específicas de un módulo/sección, utilizadas solo cuando el HTML lo requiere para no sobrecargar el renderizado global.
*   `responsive.css`: *Overrides* finales de media queries y breakpoints que no pueden ser solventados por la grilla natural de Bootstrap o las reglas intrínsecas construidas en los módulos previos.

---

## 2. Inyección y Patrones HTML

### 2.1 Uso Estratégico de Modales (Arquitectura de Iframes)

**¿Qué es un modal?**
En términos de desarrollo (y específicamente en Bootstrap), un modal es un cuadro de diálogo o ventana emergente que se sitúa sobre el contenido de la página actual, forzando al usuario a interactuar con él (o cerrarlo) antes de poder regresar a la pantalla principal. Se utilizan típicamente para alertas, formularios o información suplementaria sin recargar el navegador.

**¿Cómo se comportan *exclusivamente* en CAAHyA?**
A diferencia del uso estándar de Bootstrap (donde todo el código del modal se escribe oculto dentro del mismo archivo `index.html`), **este proyecto utiliza una arquitectura de inyección por `<iframe>`.**

Si revisas el HTML, notarás estructuras como esta:
```html
<div class="modal fade" id="modalDirectorio" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body">
        <!-- El núcleo de la estrategia: -->
        <iframe src="modals/modalDirectorio.html" class="w-100 h-100 border-0"></iframe>
      </div>
    </div>
  </div>
</div>
```

#### Ventajas y Beneficios de este Comportamiento:
1.  **Lazy-Loading (Carga Diferida Nato):** El contenido del iframe no pesa ni bloquea la carga inicial de tu página. Si un usuario entra a leer noticias, jamás descargará los cientos de nodos HTML de un directorio o reglamento, a menos que haga clic en el botón del modal.
2.  **Mantenibilidad Aislada:** Si necesitas actualizar el nombre de un director o miembro del comité, **no tocas** `index.html`. Vas directamente a `modals/modalDirectorio.html`. Esto previene que rompas la estructura de la página de inicio por un error de tipeo.
3.  **Dimensionamiento Responsivo Forzado:** Para asegurar que el iframe no se vea "aplastado" o genere barras de scroll dobles, el CSS del proyecto (`layout.css` y `components.css`) forza a las clases `.modal-dialog` y `.modal-content` a ocupar `min-height: 100vh` (el 100% de la altura de tu pantalla). Así el contenido del iframe controla su propio flujo de manera impecable.
4.  **Animación Sobrescrita por JS:** Su comportamiento de entrada/salida no es el básico de Bootstrap (`.fade`). Como se detalla en la documentación de JS, interceptamos sus eventos para animarlos fluidamente simulando físicas de aceleración usando la librería `Anime.js`.
Toda página requiere la correcta encapsulación de flujo:
1.  `<nav aria-label="Navegacion principal">`
2.  `<main id="contenido">` (El ancla primaria para el `skip-link` de accesibilidad visual).
3.  `<section id="...">` o contenedores semánticos (`article`, `aside`) en vez de meros `<div>` para separar la jerarquía de la información.

---

## 3. Design Tokens (Variables CSS)

No se permiten colores `hard-coded` (#hexadecimales perdidos en el código) para estructuras principales. El sistema depende del contexto definido en `:root` dentro de `base.css`:

```css
:root {
  --primary: #262261;      /* Azul CAAHyA */
  --secondary: #ee8219;    /* Naranja Institucional */
  --accent: #ffca00;       /* Amarillo / Llamadas a la acción */
  --text-on-dark: #ffffff; /* Contraste estandarizado */
}
```

---

## 4. Diccionario de UI: Componentes Core

Los siguientes componentes abstraen lógica compleja de CSS. Deben consumirse invocando sus clases, asegurando consistencia e interacciones predecibles.

### 4.1 Utilidades de Superficie (Z-index e Identidad)

La regla general es que nuestra UI se aleja del diseño plano (Flat). Utilizamos pseudo-elevaciones mediante sombras dispersas (`box-shadow`) y bordes suavizados.

```css
/* Utilidad: Sombra genérica base para todos los contenedores /assets/css/components.css */
.shadow-soft { 
  box-shadow: 0 12px 28px rgba(38, 34, 97, 0.18); 
}

/* Utilidad: Radio de borde institucional unificado */
.rounded-min { 
  border-radius: .5rem; 
}
```

### 4.2 Tarjetas Estándar Interactiva (El patrón "Hover-Lift")

Cualquier tarjeta que represente un enlace, proceso o directivo (`comitesAcademicos.html`, `comisiones.html`) debe implementar *Feedback* cinético interactivo. Utilizamos `transform: translateY` en lugar de `margin` o `top` por requerimientos de Performance y aceleración por GPU.

```css
/* Entidad: .committee-card / .process-card */
.committee-card {
  border: 1px solid rgba(16, 16, 16, 0.08); /* Borde sutil previene "saltos" en outline HDPI */
  border-radius: 1.25rem;
  padding: 1.75rem;
  background: #ffffff;
  box-shadow: 0 15px 35px rgba(17, 24, 39, 0.08); 
  
  /* Transición calculada a 250ms (estándar cognitivo) y curva 'ease' natural */
  transition: transform 0.25s ease, box-shadow 0.25s ease; 
  will-change: transform, box-shadow; /* Hinting para la GPU */
}

/* Estado de interacción */
.committee-card:hover, .committee-card:focus-visible {
  transform: translateY(-6px); /* Elevación (Lift) */
  box-shadow: 0 25px 45px rgba(17, 24, 39, 0.12); /* Spread incrementado */
}
```

### 4.3 Botones (Overrides Inyectados)

Los botones (`.btn`) están mapeados sobre las variables de Bootstrap para conservar las directrices `focus` y soporte de accesibilidad del framework, inyectando nuestra paleta de color.

```css
/* Identidad: .btn-accent (Reemplaza a .btn-primary) */
.btn-accent {
  --bs-btn-bg: var(--accent); 
  --bs-btn-border-color: var(--accent);
  --bs-btn-color: #1f1b4a; /* Contraste WCAG AAA forzado */
  
  --bs-btn-hover-bg: #f0b800; /* Factor de sombreado */
  --bs-btn-hover-border-color: #f0b800;
  font-weight: 700;
}
```

### 4.4 Glassmorphism y Portadas (Hero)

El uso de `<div class="hero">` aplica a todas las portadas debajo del nav. Las tarjetas internas de lectura asumen un efecto de *"Cristal Esmerilado" (Glassmorphism)* utilizando el filtro `backdrop-filter` para difuminar fondos complejos o imágenes embebidas.

```css
/* Estructura: /assets/css/layout.css */
.hero {
  /* Blend de opacidad oscura sobre imagen utilizando mix linear/url */
  background: linear-gradient(180deg, rgba(38,34,97,.60), rgba(0,0,0,.60)),
              url('../img/CAFondoObscuro.png') center/cover no-repeat;
  min-height: 100vh;
}

.hero-card {
  background: rgba(20,17,58,.65);
  border: 1px solid rgba(255,255,255,.18); /* Iluminación perimetral simulada */
  backdrop-filter: blur(14px); /* Difuminador principal del render */
  border-radius: .85rem;
}
```

### 4.5 Mega-Menu Complejo

El `navbar-ca` utiliza un enfoque `absolute/fixed` para expandir modales embebidos (`.mega-menu`) desde la navegación. Implementa "fades" en CSS para evitar manipulación JS pesada en estado *Hover*.

```css
/* Se ocupa en Header Navigation */
.mega-menu {
  position: absolute;
  top: calc(100% + 1.25rem); /* Prevención de colisión de zona Hover */
  transform: translateX(-50%) translateY(8px); /* Inicialización del Offset Y */
  background: #1a1740;
  opacity: 0;
  pointer-events: none; /* Previene clicks invisibles (Fallo UX común) */
  transition: opacity .25s ease, transform .25s ease;
}

/* Gatillo (Trigger) visual de apertura */
.dropdown-mega:hover .mega-menu, 
.dropdown-mega.is-open .mega-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
```

### 4.6 Secciones Texturizadas y Avatares (`linear-gradient` fallback)

Evitamos cargar `.jpg/.png` innecesarios. Elementos circulares vacíos (avatares genéricos) o texturados (tickets) son dibujados nativamente usando CSS `radial` o `linear-gradient` mezclados con transparencias.

```css
.avatar { 
    /* Blend sutil entre color primario y secundario con un tilt de 135deg */
    background: linear-gradient(135deg, rgba(238,130,25,.25), rgba(38,34,97,.25)); 
}
```

---

## 5. Mejores Prácticas y Pautas de Contribución (Senior Guidelines)

Para todo desarrollador que manipule este sistema, nos adherimos rígidamente a los siguientes principios de arquitectura:

1.  **Regla del DRY (Don't Repeat Yourself):** ¡No construyas nuevas tarjetas genéricas! Reusa la triada estructural vista decenas de veces en el proyecto (`shadow-soft` + `rounded-min` + `transform: translateY` en hover). Si una vista exige algo novedoso, expándela a `<componente>-modifier` (Patrón inspirado en pseudo-BEM).
2.  **No Modifiques Bootstrap Globalmente (No Touch Core):** Jamás modifiques archivos de la carpeta `vendor`. Las sobreescrituras se manejan sobre inyección de Variables CSS propias o usando jerarquía de etiqueta combinada.
3.  **Animaciones vía CSS, lógicas vía JS:** Deja a CSS escalar, oscurecer o transicionar (`transition: transform...`). Reserva a JavaScript únicamente el alterar las Clientes de Clases (`.classList.toggle('active')`) para que el Reflow del navegador trabaje mediante CSSOM.
4.  **Imágenes de Componente (Responsive Images):** Utiliza extensivamente la clase utilitaria `.object-fit-cover` junto a anchos / altos fijos (a través de CSS u atributos) o `w-100 h-100` combinado con la grilla de ratio (`.ratio-16x9`) de Bootstrap, esto evitará variaciones no deseadas de layout (`Cumulative Layout Shifts`, CLS).

> **Aviso Visual para Entornos Editores (.md):** Este Markdown no es capaz de interpretar o compilar gráficamente CSS por sí solo. Para previsualizar un componente en la etapa de maquetación, compílelo ejecutando la página principal localmente o inserten explícitamente fragmentos HTML/capturas de pantalla dentro del documento a modo diagramátivo (`<img>`).
