import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const filesToUpdate = [
  'cartelera.html',
  'comisiones.html',
  'comitesAcademicos.html',
  'consejeros.html',
  'curso_taller.html',
  'legislacion.html',
  'procesoConsejo.html',
  'search.html'
];

const newMegaMenu = `        <ul class="navbar-nav nav-pills-ca me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown-mega">
            <a class="nav-link" href="index.html" id="inicioMenu">
              CAAHyA
            </a>
            <div class="mega-menu">
              <div class="mega-menu__col">
                <p class="mega-menu__title">Inicio CAAHyA</p>
                <a href="index.html#modalDirectorio" class="mega-menu__item">
                  <span class="mega-menu__item-title">Directorio del Consejo</span>
                  <span class="mega-menu__item-desc">Consulta la integración y los datos de contacto oficiales.</span>
                </a>
                <a href="index.html#modalSobreConsejo" class="mega-menu__item">
                  <span class="mega-menu__item-title">Acerca de nosotros</span>
                  <span class="mega-menu__item-desc">Conoce el origen, funciones e integración del CAAHyA.</span>
                </a>
                <a href="index.html#modalPleno" class="mega-menu__item">
                  <span class="mega-menu__item-title">El Pleno</span>
                  <span class="mega-menu__item-desc">Consulta la integración oficial y representantes del Pleno del
                    CAAHYA.</span>
                </a>
                <a href="index.html#modalPublicaciones" class="mega-menu__item">
                  <span class="mega-menu__item-title">Publicaciones</span>
                  <span class="mega-menu__item-desc">Consulta los libros, revistas y obras académicas del CAAHyA.</span>
                </a>
                <a href="index.html#modalCalendario" class="mega-menu__item">
                  <span class="mega-menu__item-title">Calendario de actividades</span>
                  <span class="mega-menu__item-desc">Consulta las fechas oficiales de sesiones, convocatorias y eventos.</span>
                </a>
                <a href="index.html#modalContacto" class="mega-menu__item">
                  <span class="mega-menu__item-title">Contacto</span>
                  <span class="mega-menu__item-desc">Información de contacto y ubicación del CAAHyA.</span>
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown-mega">
            <a class="nav-link" href="procesoConsejo.html">Procesos</a>
            <div class="mega-menu">
              <div class="mega-menu__col">
                <p class="mega-menu__title">Procesos del Consejo</p>
                <a href="procesoConsejo.html#personalAcademico" class="mega-menu__item">
                  <span class="mega-menu__item-title">Personal Académico</span>
                  <span class="mega-menu__item-desc">Procesos de la Comisión Permanente de Personal Académico.</span>
                </a>
                <a href="procesoConsejo.html#planesEstudio" class="mega-menu__item">
                  <span class="mega-menu__item-title">Planes y Programas de Estudio</span>
                  <span class="mega-menu__item-desc">Creación, modificación e implantación de planes de estudio.</span>
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown-mega">
            <a class="nav-link" href="comisiones.html">Comisiones</a>
            <div class="mega-menu">
              <div class="mega-menu__col">
                <p class="mega-menu__title">Comisiones del Consejo</p>
                <a href="comisiones.html#permanentes" class="mega-menu__item">
                  <span class="mega-menu__item-title">Comisiones Permanentes</span>
                  <span class="mega-menu__item-desc">Estudian y dictaminan asuntos de las labores sustantivas del Consejo.</span>
                </a>
                <a href="comisiones.html#especiales" class="mega-menu__item">
                  <span class="mega-menu__item-title">Comisiones Especiales</span>
                  <span class="mega-menu__item-desc">Comisiones especiales y grupos de trabajo designados por el Pleno.</span>
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item"><a class="nav-link" href="comitesAcademicos.html">Comites</a></li>

          <li class="nav-item dropdown-mega">
            <a class="nav-link" href="legislacion.html">Legislación</a>
            <div class="mega-menu">
              <div class="mega-menu__col">
                <p class="mega-menu__title">Legislación universitaria</p>
                <a href="legislacion.html#legislacion" class="mega-menu__item">
                  <span class="mega-menu__item-title">Normativa esencial</span>
                  <span class="mega-menu__item-desc">Leyes, estatutos y reglamentos base del CAAHyA.</span>
                </a>
                <a href="legislacion.html#reglamentos" class="mega-menu__item">
                  <span class="mega-menu__item-title">Reglamentos vigentes</span>
                  <span class="mega-menu__item-desc">Descarga directa de reglamentos y lineamientos activos.</span>
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown-mega">
            <a class="nav-link" href="consejeros.html">Consejeros</a>
            <div class="mega-menu">
              <div class="mega-menu__col">
                <p class="mega-menu__title">Consejeros del área</p>
                <a href="consejeros.html#normativa" class="mega-menu__item">
                  <span class="mega-menu__item-title">Normativa</span>
                  <span class="mega-menu__item-desc">Requisitos para consejeros académicos, alumnos y posgrados.</span>
                </a>
                <a href="consejeros.html#consejeros" class="mega-menu__item">
                  <span class="mega-menu__item-title">Listado de consejeros</span>
                  <span class="mega-menu__item-desc">Consulta titulares y suplentes por entidad académica.</span>
                </a>
              </div>
            </div>
          </li>
        </ul>`;

const simplifiedNavRegex = /<ul class="navbar-nav nav-pills-ca me-auto mb-2 mb-lg-0">[\s\S]*?<\/ul>/;

filesToUpdate.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (simplifiedNavRegex.test(content)) {
      content = content.replace(simplifiedNavRegex, newMegaMenu);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated navbar in ${file}`);
    } else {
      console.warn(`Could not find simplified navbar in ${file}`);
    }
  } else {
    console.error(`File ${file} does not exist`);
  }
});
