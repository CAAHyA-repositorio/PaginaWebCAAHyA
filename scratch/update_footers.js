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
  'index.html',
  'legislacion.html',
  'procesoConsejo.html',
  'search.html',
  'privacidadSimplificado.html',
  'privacidadIntegral.html'
];

const newFooter = `  <footer id="contacto" class="pt-5 pb-0 footer-dark">
    <div class="container pb-4">
      <div class="row g-4">
        <!-- Columna 1: CAAHyA -->
        <div class="col-md-6 col-lg-3">
          <h5 class="footer-title mb-3">
            <span class="text-secondary-ca">|</span> CAAHyA
          </h5>
          <p class="footer-text mb-0">
            Consejo Académico del Área de las Humanidades y de las Artes
          </p>
        </div>

        <!-- Columna 2: Ubicación -->
        <div class="col-md-6 col-lg-3">
          <h5 class="footer-title mb-3">
            <span class="text-secondary-ca">|</span> Ubicación
          </h5>
          <p class="footer-text mb-0">
            Edificio de los Consejos Académicos<br>
            Circuito Exterior s/n. Ciudad<br>
            Universitaria. C.P. 04510. Ciudad de<br>
            México
          </p>
        </div>

        <!-- Columna 3: Contacto -->
        <div class="col-md-6 col-lg-3">
          <h5 class="footer-title mb-3">
            <span class="text-secondary-ca">|</span> Contacto
          </h5>
          <p class="footer-text mb-0">
            Tel: 555622-1411
          </p>
        </div>

        <!-- Columna 4: Privacidad -->
        <div class="col-md-6 col-lg-3">
          <h5 class="footer-title mb-3">
            <span class="text-secondary-ca">|</span> Privacidad
          </h5>
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><a class="footer-link-item" href="privacidadSimplificado.html">Aviso de privacidad simplificada</a></li>
            <li class="mb-2"><a class="footer-link-item" href="privacidadIntegral.html">Aviso de privacidad integral</a></li>
            <li class="mb-2"><a class="footer-link-item" href="https://www.caahya.unam.mx/wp-content/uploads/2022/08/Documento-de-Seguridad_CAAHyA.pdf" target="_blank" rel="noopener noreferrer">Documento de seguridad</a></li>
            <li class="mb-2"><a class="footer-link-item" href="https://www.caahya.unam.mx/wp-content/uploads/2024/01/FEU_02-ctunam-528-2022-docto-seg-3.pdf" target="_blank" rel="noopener noreferrer">Resolución del Comité de Transparencia</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Sección Amarilla de Derechos Reservados -->
    <div class="bg-secondary-ca text-white py-4 mt-4 small">
      <div class="container text-center">
        <p class="text-white mb-2">
          © Hecho en México, Universidad Nacional Autónoma de México (UNAM), todos los derechos reservados 2023.
          Esta página y sus contenidos pueden ser reproducidos con fines no lucrativos, siempre y cuando no se mutile,
          se cite la fuente completa y su dirección electrónica. De otra forma, requiere permiso previo por escrito de
          la institución. Sitio web administrado por la Unidad Coordinadora de Servicios de Apoyo Administrativo a los
          Consejos Académicos de Área.
        </p>
        <p class="mb-0 fw-bold">
          <a href="#" class="text-white text-decoration-underline opacity-75-hover">Créditos</a>
        </p>
      </div>
    </div>
  </footer>`;

const footerRegex = /<footer[\s\S]*?<\/footer>/;

filesToUpdate.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, newFooter);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated footer in ${file}`);
    } else if (content.includes('</main>')) {
      content = content.replace('</main>', `</main>\n\n${newFooter}`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Inserted footer after </main> in ${file}`);
    } else {
      console.warn(`Could not find footer or </main> in ${file}`);
    }
  } else {
    console.error(`File ${file} does not exist`);
  }
});
