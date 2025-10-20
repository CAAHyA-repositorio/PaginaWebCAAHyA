// Build a global search index from HTML files (client-side friendly JSON)
// Usage: node scripts/build-search-index.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const publicHtml = await findHtmlFiles(root);
const pages = [];

for (const file of publicHtml) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel.startsWith('templates/')) continue;
  if (rel === 'search.html') continue; // exclude search page
  const html = await fs.promises.readFile(file, 'utf8');
  const title = extractTitle(html) || rel;
  const sections = extractSections(html);
  pages.push({ url: rel, title, sections });
}

const out = {
  version: 1,
  generated: new Date().toISOString(),
  pages
};

const outPath = path.join(root, 'assets', 'search-index.json');
await fs.promises.writeFile(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`Wrote ${out.pages.length} page(s) to ${path.relative(root, outPath)}`);

async function findHtmlFiles(dir) {
  const out = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      // Skip node_modules and assets
      if (['node_modules', 'assets'].includes(e.name)) continue;
      out.push(...await findHtmlFiles(fp));
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.html')) {
      out.push(fp);
    }
  }
  return out;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? clean(m[1]) : '';
}

function extractSections(html) {
  const sections = [];
  const secRe = /<section[^>]*\bid\s*=\s*"([^"]+)"[^>]*>([\s\S]*?)<\/section>/gi;
  let m;
  while ((m = secRe.exec(html)) !== null) {
    const id = m[1];
    const inner = m[2];
    const title = extractFirstHeading(inner);
    const content = extractSnippet(inner);
    sections.push({ id, title, content });
  }
  // If no <section>, fallback to body snippet
  if (sections.length === 0) {
    const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [,''])[1];
    const snippet = extractSnippet(body).slice(0, 240);
    if (snippet) sections.push({ id: '', title: '', content: snippet });
  }
  return sections;
}

function extractFirstHeading(html) {
  const m = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  return m ? clean(m[1]) : '';
}

function extractSnippet(html) {
  // Prefer first paragraph
  let m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (m) return clean(m[1]);
  // Otherwise take text up to 300 chars
  return clean(html).slice(0, 300);
}

function clean(s) {
  return decode(
    s
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

