import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const htmlFiles = [];
walkDir(rootDir, filePath => {
  if (filePath.endsWith('.html')) {
    htmlFiles.push(filePath);
  }
});

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Casing of CAAHyA in navbar attributes/text
  content = content.replace(/aria-label="Inicio CAAHYA"/g, 'aria-label="Inicio CAAHyA"');
  content = content.replace(/alt="CAAHYA"/g, 'alt="CAAHyA"');
  content = content.replace(/CAAHYA\.<\/span>/g, 'CAAHyA.</span>');
  content = content.replace(/<span class="text-secondary-ca">\|<\/span> CAAHYA/g, '<span class="text-secondary-ca">|</span> CAAHyA');
  content = content.replace(/Elección para junta de gobierno/g, 'Elección para Junta de Gobierno');

  // Specific file corrections
  content = content.replace(/Proceso del Consejo” CAAHYA/g, 'Proceso del Consejo | CAAHyA');
  content = content.replace(/CAAHYA - Consejo Académico/g, 'CAAHyA - Consejo Académico');
  content = content.replace(/content="Resultados de búsqueda del sitio CAAHYA\."/g, 'content="Resultados de búsqueda del sitio CAAHyA."');
  content = content.replace(/El Consejo Académico del Área de las Humanidades y de las Artes \(CAAHYA\)/g, 'El Consejo Académico del Área de las Humanidades y de las Artes (CAAHyA)');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.relative(rootDir, file)}`);
  }
});
