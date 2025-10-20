// CAAHYA — Main JS
document.addEventListener('DOMContentLoaded', function(){
  // Navbar: solo efecto en scroll (sin animar toda la barra)
  const navbar = document.querySelector('.navbar-ca');
  if (navbar){
    const onScroll = ()=>{
      const scrolled = window.scrollY > 10;
      navbar.classList.toggle('navbar-scrolled', scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});

// Overlay de transición: animación de entrada y al cambiar de página
window.addEventListener('load', function(){ const pageTransition = document.getElementById('pageTransition');
  if(!pageTransition) return;
  const logo = pageTransition.querySelector('img');

  // Intro al cargar
  const runIntro = ()=>{
    pageTransition.classList.add('active'); document.body.classList.add('no-scroll');
    pageTransition.setAttribute('aria-hidden','false');
    if(window.anime){
      window.anime({ targets: pageTransition, opacity:[1,0], duration:1000, delay:200, easing:'cubicBezier(.4,0,.2,1)', complete:()=>{ pageTransition.classList.remove('active'); pageTransition.style.opacity=''; pageTransition.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); } });
      if(logo){ window.anime({ targets: logo, scale:[1.05,1], duration:1000, delay:200, easing:'cubicBezier(.4,0,.2,1)' }); }
    } else {
      setTimeout(()=>{ pageTransition.classList.remove('active'); pageTransition.setAttribute('aria-hidden','true'); }, 400);
    }
  };
  setTimeout(runIntro, 60);

  // Salida sin animación: se desactiva la interceptación de clics
});
  // Año dinámico en footer
  const y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }

  // Navbar search: solo redirigir a la página de resultados (links <a> se renderizan en search.html)
  const form = document.getElementById('navbarSearchForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const inp = form.querySelector('input[name="q"], input[type="search"], input[type="text"]');
      const q = inp ? inp.value.trim() : '';
      if(!q) return;
      // Navegar sin animación de salida
      location.href = 'search.html?q=' + encodeURIComponent(q);
    });
  }

  // ===== Modales: animaciones con Anime.js =====
  document.querySelectorAll('.modal-entity').forEach(function(modal){
    modal.addEventListener('shown.bs.modal', function(){
      const first = modal.querySelector('.list-group-item');
      if(first) first.focus();
    });
    modal.addEventListener('show.bs.modal', function(){
      const dialog = modal.querySelector('.modal-dialog');
      if(!dialog) return;
      dialog.style.opacity = '0';
      dialog.style.transform = 'translateY(10px) scale(0.96)';
    });
    modal.addEventListener('shown.bs.modal', function(){
      const dialog = modal.querySelector('.modal-dialog');
      if(!(window.anime && dialog)) return;
      window.anime({
        targets: dialog,
        opacity: [0,1],
        translateY: [10,0],
        scale: [0.96,1],
        duration: 600,
        easing: 'cubicBezier(.25,.8,.25,1)'
      });
    });
    modal.addEventListener('hide.bs.modal', function(e){
      const dialog = modal.querySelector('.modal-dialog');
      if(!(window.anime && dialog)) return;
      if(!modal.dataset.allowHide){
        e.preventDefault();
        window.anime({
          targets: dialog,
          opacity: [1,0],
          translateY: [0,-8],
          scale: [1,0.98],
          duration: 300,
          easing: 'cubicBezier(.4,0,.2,1)',
          complete: function(){
            modal.dataset.allowHide = '1';
            const inst = window.bootstrap ? window.bootstrap.Modal.getInstance(modal) : null;
            if(inst){ inst.hide(); }
            delete modal.dataset.allowHide;
          }
        });
      }
    });
  });

  // ===== SideNav: animación + resaltar sección activa =====
  const sideNav = document.getElementById('sideNav');
  if(sideNav){
    sideNav.classList.add('is-hidden');
    const showSideNav = ()=>{
      if(window.anime){
        window.anime({targets: sideNav, opacity:[0,1], translateX:[8,0], duration:500, easing:'cubicBezier(.25,.8,.25,1)', begin: ()=>{ sideNav.style.transform = 'translateX(8px)'; }, complete: ()=>{ sideNav.classList.remove('is-hidden'); sideNav.style.transform=''; } });
      } else { sideNav.classList.remove('is-hidden'); }
    };
    setTimeout(showSideNav, 60);
    const links = Array.from(sideNav.querySelectorAll('a.nav-link'));
    const map = new Map();
    links.forEach(a=>{
      const id = a.getAttribute('href') || '';
      if(id.startsWith('#')){
        const el = document.querySelector(id);
        if(el){ map.set(el, a); }
      }
    });

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const link = map.get(entry.target);
        if(!link) return;
        if(entry.isIntersecting && entry.intersectionRatio > 0.5){
          links.forEach(l=>l.classList.remove('active'));
          link.classList.add('active');
          const dot = link.querySelector('.dot');
          if(dot){ dot.classList.remove('pulse'); void dot.offsetWidth; dot.classList.add('pulse'); }
        }
      });
    },{ root: null, threshold: [0.51] });

    map.forEach((_, section)=> obs.observe(section));

    links.forEach(a=>{
      a.addEventListener('click', ()=>{ links.forEach(l=>l.classList.remove('active')); a.classList.add('active'); const dot = a.querySelector('.dot'); if(dot){ dot.classList.remove('pulse'); void dot.offsetWidth; dot.classList.add('pulse'); } });
    });
  }

