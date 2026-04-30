# Documentación Técnica: Javascript y Animaciones

¡Bienvenido! Esta guía te ayudará a comprender cómo funciona el control lógico (JavaScript) y cómo están construidas las animaciones del sitio CAAHyA.

## 1. Filosofía de JavaScript del Proyecto

El proyecto está diseñado bajo **Vanilla JS** (JavaScript puro), sin jQuery o frameworks reactivos como React/Vue. Esto lo mantiene ligero. No obstante, nos apoyamos de:
*   **Bootstrap Bundle:** Para la lógica base de popovers y modales.
*   **Anime.js (`anime.min.js`):** El motor principal para transiciones matemáticas complejas (interpolación fluida de escala y opacidad).

---

## 2. Archivos Principales y Ejemplos de Código

Las lógicas residen en `/assets/js/`.

### A) `main.js` (Funciones Globales)
Aplica y contiene la interactividad compartida en todas las secciones, por ejemplo, el scroll de la navbar o animaciones de entrada.

### Ejemplo Guiado: Animación de Inicio (Overlay `pageTransition`)

Cuando un usuario carga una página, observamos un "Overlay" disolverse. En vez de usar una transición de CSS normal, usamos JavaScript puro invocado mediante `Anime.js` para asegurar que todo comience estrictamente hasta que el DOM detone el evento `load`, previniendo parpadeos extraños de carga de imágenes:

```javascript
// Se ocupa en: /assets/js/main.js
// Funcionalidad: Pantalla de carga (Splash Screen) al navegar entre sección

window.addEventListener('load', function () {
  const pageTransition = document.getElementById('pageTransition');
  if (!pageTransition) return; // Validación de seguridad ("Early exit")

  const logo = pageTransition.querySelector('img');

  const runIntro = () => {
    /* 
      1. Se asegura de tener opacidad correcta preparándolo
      2. Invocación de la librería AnimeJS a través de window.anime
    */
    if (window.anime) {
      // Anima la desaparición del background
      window.anime({ 
          targets: pageTransition, 
          opacity: [1, 0], // Transición de solido(1) a invisible(0)
          duration: 1000, 
          delay: 200, 
          easing: 'cubicBezier(.4,0,.2,1)', 
          complete: () => { 
             // Cleanup DOM
             pageTransition.classList.remove('active'); 
             document.body.classList.remove('no-scroll'); 
          } 
      });

      // Anima simultaneamente el logo dándole un efecto de estiramiento ("Scale")
      if (logo) { 
          window.anime({ 
              targets: logo, 
              scale: [1.05, 1], // Disminuye el tamaño desde el 105% a su nominal (100%)
              duration: 1000, 
              delay: 200, 
              easing: 'cubicBezier(.4,0,.2,1)' 
          }); 
      }
    } 
  };
  
  setTimeout(runIntro, 60); // Retraso virtual para forzar el repintado del DOM 
});
```
**Explicación del Ejemplo:** Este fragmento busca darle un sentimiento más app-like al usuario deteniendo el scroll total del body (`no-scroll`) y escalando un logo con la curva `cubicBezier`.

### B) `index-page.js` (Específico al Inicio)
Contiene scripts únicos para el `index.html`, protegiendo de errores el resto del sitio (que no tendría dichos elementos, como el slider o el marquee de entidades).

### Ejemplo Guiado: Datos Dinámicos (Inyección DOM)
En la página principal hay un área con listas de documentos y reglamentos en tarjetas. En lugar de quemar docenas de contenedores HTML, el JS itera una constante `docsConfig`.

```javascript
// Se ocupa en: /assets/js/index-page.js
// Propósito: Generar las tarjetas HTML en tiempo de script

const docsConfig = {
    reglamentos: [
      {
        title: 'ESTATUTO GENERAL DE LA UNAM',
        description: 'CONSULTAR',
        href: 'https://...',
        icon: 'bi bi-file-earmark-text-fill'
      } //... más elementos
    ]
};

// Iteración de creación
const createDocCard = (item) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
   
    // Se insertan atributos
    const link = document.createElement('a'); 
    link.className = 'reglamento-card';
    link.href = item.href;

    // (Generación del resto de Nodos y Apéndices Omitido)
    col.appendChild(link);
    return col;
};
```
**Tip de contribución:** Notarás que este patrón es clave. Si alguien del equipo CAAHyA de contenido requiere añadir otro reglamento al listado principal del Home, **no** debes añadir tags `<a>` a mano en `index.html`. Hay que buscar la variable `docsConfig` en `index-page.js` y sumar el siguiente objeto literal respectivo.

## 3. Buenas Prácticas y Pautas para Contribuir

1.  **DOMContentLoaded / Event Load:** Engloba tus módulos como en el ejemplo para evitar *Undefined Object errors*. Puesto que usamos módulos script simples al fondo del HTML.
2.  **Verificación Previa (Early Exits):** Tal como se vio en el ejemplo de `pageTransition`: Si (`!element`) detén la función con `return`. Puesto que `main.js` abarca diferentes páginas.
