﻿// CAAHYA — Main JS
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

document.addEventListener('DOMContentLoaded', function(){
  const docsSection = document.getElementById('documentos');
  if(!docsSection) return;

  const area = docsSection.querySelector('.documents-area');
  const track = area ? area.querySelector('.documents-track') : null;
  const toggleBtn = docsSection.querySelector('.docs-toggle');

  if(!area || !track || !toggleBtn) return;

  const navButtons = docsSection.querySelectorAll('.documents-nav');
  navButtons.forEach((btn)=> btn && btn.remove());

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(prefersReducedMotion.matches){
    toggleBtn.disabled = true;
    toggleBtn.setAttribute('aria-disabled', 'true');
  }

  const removeDuplicates = ()=>{
    track.querySelectorAll('[data-doc-duplicate="true"]').forEach((node)=> node.remove());
  };

  const setCloneAccessibility = (root)=>{
    root.setAttribute('aria-hidden', 'true');
    root.querySelectorAll('a, button').forEach((el)=>{
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-hidden', 'true');
    });
  };

  const recalcDuration = ()=>{
    if(!area.classList.contains('documents-marquee-active')) return;
    window.requestAnimationFrame(()=>{
      const distance = track.scrollWidth / 2;
      if(distance <= 0) return;
      const seconds = Math.max(18, distance / 110);
      track.style.setProperty('--documents-marquee-duration', `${seconds}s`);
    });
  };

  const activateMarquee = ()=>{
    if(prefersReducedMotion.matches) return;
    removeDuplicates();
    const originals = Array.from(track.children).filter((node)=> !node.hasAttribute('data-doc-duplicate'));
    if(!originals.length) return;
    originals.forEach((node)=>{
      const clone = node.cloneNode(true);
      clone.setAttribute('data-doc-duplicate', 'true');
      setCloneAccessibility(clone);
      track.appendChild(clone);
    });
    area.classList.add('documents-marquee-active');
    area.classList.remove('documents-marquee-paused');
    recalcDuration();
  };

  const deactivateMarquee = ()=>{
    area.classList.remove('documents-marquee-active', 'documents-marquee-paused');
    removeDuplicates();
    track.style.removeProperty('--documents-marquee-duration');
  };

  const pauseMarquee = ()=>{
    if(!area.classList.contains('documents-marquee-active')) return;
    area.classList.add('documents-marquee-paused');
  };

  const resumeMarquee = ()=>{
    area.classList.remove('documents-marquee-paused');
  };

  track.addEventListener('mouseenter', pauseMarquee);
  track.addEventListener('mouseleave', resumeMarquee);
  track.addEventListener('focusin', pauseMarquee);
  track.addEventListener('focusout', (event)=>{
    if(track.contains(event.relatedTarget)) return;
    resumeMarquee();
  });

  const setExpanded = (expanded)=>{
    if(!expanded && prefersReducedMotion.matches){
      expanded = true;
    }
    area.classList.toggle('documents-expanded', expanded);
    area.dataset.expanded = expanded ? 'true' : 'false';
    toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggleBtn.textContent = expanded ? 'Ver menos' : 'Ver todo';
    if(expanded){
      deactivateMarquee();
    } else {
      activateMarquee();
    }
  };

  if(!prefersReducedMotion.matches){
    toggleBtn.addEventListener('click', ()=>{
      const expanded = area.classList.contains('documents-expanded');
      setExpanded(!expanded);
    });
  }

  window.addEventListener('resize', recalcDuration);

  setExpanded(prefersReducedMotion.matches);
});
document.addEventListener('DOMContentLoaded', function(){
  const cards = document.querySelectorAll('[data-pleno-card]');
  if(!cards.length) return;

  const resizeHandlers = [];

  cards.forEach((card, index)=>{
    const header = card.querySelector('.pleno-card-header');
    const body = card.querySelector('.pleno-card-body');
    if(!header || !body) return;

    header.type = 'button';
    header.classList.add('pleno-card-front');
    body.classList.add('pleno-card-back');
    body.hidden = false;
    body.setAttribute('aria-hidden', 'true');
    body.setAttribute('tabindex', '0');

    if(!body.id){
      body.id = `pleno-card-panel-${index + 1}`;
    }
    header.setAttribute('aria-controls', body.id);

    let flip = card.querySelector('.pleno-card-flip');
    if(!flip){
      flip = document.createElement('div');
      flip.className = 'pleno-card-flip';
      card.prepend(flip);
    }
    if(!flip.contains(header)){
      flip.append(header);
    }
    if(!flip.contains(body)){
      flip.append(body);
    }

    if(!body.querySelector('.pleno-card-back-title')){
      const title = document.createElement('h6');
      title.className = 'pleno-card-back-title';
      title.textContent = 'Profesores y alumnos';
      body.prepend(title);
    }

    const updateHeight = ()=>{
      const frontHeight = header.offsetHeight;
      const backHeight = body.scrollHeight;
      flip.style.minHeight = `${Math.max(frontHeight, backHeight)}px`;
    };

    const setOpen = (open)=>{
      card.dataset.open = open ? 'true' : 'false';
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
      card.classList.toggle('is-open', open);
      body.setAttribute('aria-hidden', open ? 'false' : 'true');

      if(!open){
        body.blur();
      }
      updateHeight();
    };

    setOpen(false);
    updateHeight();

    const onResize = ()=> updateHeight();
    window.addEventListener('resize', onResize);
    resizeHandlers.push(onResize);

    header.addEventListener('click', ()=>{
      const isOpen = card.dataset.open === 'true';
      const nextState = !isOpen;
      setOpen(nextState);
      if(nextState){
        body.focus({ preventScroll: true });
      }else{
        header.focus({ preventScroll: true });
      }
    });

    body.addEventListener('click', ()=>{
      setOpen(false);
      header.focus({ preventScroll: true });
    });

    body.addEventListener('keydown', (event)=>{
      if(event.key === 'Escape'){
        setOpen(false);
        header.focus({ preventScroll: true });
      }
    });
  });

  window.addEventListener('beforeunload', ()=>{
    resizeHandlers.forEach((handler)=> window.removeEventListener('resize', handler));
  });
});
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
