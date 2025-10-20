// Página de resultados globales
(function(){
  const normalize = (s) => (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  async function fetchJson(url){
    try{ const res = await fetch(url, {cache:'no-store'}); if(!res.ok) throw new Error('HTTP '+res.status); return await res.json(); }
    catch(_){ return null; }
  }

  async function fetchText(url){
    try{ const res = await fetch(url, {cache:'no-store'}); if(!res.ok) throw new Error('HTTP '+res.status); return await res.text(); }
    catch(_){ return ''; }
  }

  async function buildIndexFromManifest(){
    const manifest = await fetchJson('assets/search-manifest.json');
    if(!Array.isArray(manifest) || manifest.length===0) return null;
    const pages = [];
    for(const url of manifest){
      const html = await fetchText(url);
      if(!html) continue;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title = (doc.querySelector('title')?.textContent || url).trim();
      const sections = [];
      doc.querySelectorAll('section[id]').forEach(sec=>{
        const id = sec.id;
        const h = sec.querySelector('h1,h2,h3,h4,h5,h6');
        const p = sec.querySelector('p');
        const stitle = (h?.textContent || '').trim();
        const content = ((p?.textContent || sec.textContent || '').replace(/\s+/g,' ').trim()).slice(0, 500);
        sections.push({ id, title: stitle, content });
      });
      if(url.indexOf('directorio')!==-1){
        doc.querySelectorAll('.card-profile').forEach(card=>{
          const name = (card.querySelector('h3')?.textContent || '').trim();
          const role = (card.querySelector('.text-secondary-ca')?.textContent || '').trim();
          const desc = (card.querySelector('p')?.textContent || '').trim();
          const content = [name, role, desc].filter(Boolean).join(' - ');
          if(content){ sections.push({ id: 'miembros', title: name, content }); }
        });
      }
      if(sections.length===0){
        const bodyText = (doc.body?.textContent || '').replace(/\s+/g,' ').trim().slice(0,500);
        sections.push({ id: '', title: '', content: bodyText });
      }
      pages.push({ url, title, sections });
    }
    return { version: 1, generated: 'runtime', pages };
  }

  async function fetchIndex(){
    const runtime = await buildIndexFromManifest();
    if(runtime) return runtime;
    return await fetchJson('assets/search-index.json');
  }

  function render(q, results){
    const info = document.getElementById('searchQueryInfo');
    if(info) info.textContent = results.length ? '"' + q + '" - ' + results.length + ' resultado(s)' : '"' + q + '" - sin resultados';
    const wrap = document.getElementById('globalResults'); if(!wrap) return;
    wrap.innerHTML = '';
    const frag = document.createDocumentFragment();
    results.forEach(r=>{
      const a = document.createElement('a');
      a.href = r.url;
      a.className = 'result-item';
      a.innerHTML = '<div class="result-title">'+r.title+'</div>'+
                     '<div class="result-url">'+r.url+'</div>'+
                     '<div class="result-snippet">'+r.snippet+'</div>';
      frag.appendChild(a);
    });
    wrap.appendChild(frag);
  }

  async function run(){
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const q = normalize(query);
    const tokens = q.split(/\s+/).filter(Boolean);
    const idx = await fetchIndex();
    const out = [];
    if(idx && q){
      (idx.pages||[]).forEach(p=>{
        const baseUrl = p.url || '';
        const pageTitle = p.title || baseUrl;
        (p.sections||[]).forEach(s=>{
          const text = ((s.title||'') + ' ' + (s.content||'')).trim();
          const norm = normalize(text);
          // Coincidencia si todos los tokens de la consulta están presentes
          const ok = tokens.every(t=> norm.includes(t));
          if(ok){
            const pos = norm.indexOf(q);
            const start = Math.max(0, pos - 40);
            const end = Math.min(text.length, pos + q.length + 60);
            const snippet = text.substring(start, end).replace(/\s+/g,' ');
            const anchor = s.id ? ('#'+s.id) : '';
            out.push({ url: baseUrl + anchor, title: pageTitle + (s.title? ' - ' + s.title : ''), snippet });
          }
        });
      });
    }
    render(query, out);
  }

  if(document.documentElement.getAttribute('data-page') === 'search'){
    document.addEventListener('DOMContentLoaded', run);
  }
})();

