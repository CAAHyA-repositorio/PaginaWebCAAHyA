import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectDir = join(__dirname, '..');

const htmlFiles = [
  'index.html',
  'cartelera.html',
  'comisiones.html',
  'comitesAcademicos.html',
  'consejeros.html',
  'curso_taller.html',
  'legislacion.html',
  'procesoConsejo.html',
  'search.html',
  'privacidadSimplificado.html',
  'privacidadIntegral.html',
];

const oldHref = `href="#" class="text-white text-decoration-underline opacity-75-hover">Créditos</a>`;
const newHref = `href="creditos.html" class="text-white text-decoration-underline opacity-75-hover">Créditos</a>`;

let updated = 0;

for (const file of htmlFiles) {
  const filePath = join(projectDir, file);
  if (!existsSync(filePath)) {
    console.log(`[SKIP] No existe: ${file}`);
    continue;
  }

  let content = readFileSync(filePath, 'utf8');
  if (content.includes(oldHref)) {
    content = content.split(oldHref).join(newHref);
    writeFileSync(filePath, content, 'utf8');
    console.log(`[OK]   Actualizado: ${file}`);
    updated++;
  } else {
    console.log(`[--]   Sin cambios: ${file}`);
  }
}

console.log(`\nTotal archivos actualizados: ${updated}`);
