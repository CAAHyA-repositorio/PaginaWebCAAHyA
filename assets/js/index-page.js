document.addEventListener('DOMContentLoaded', () => {
  const comunicadoSlides = Array.from(document.querySelectorAll('.hero-comunicados .comunicado-slide'));
  const comunicadoDots = Array.from(document.querySelectorAll('.hero-comunicados .comunicado-dot'));
  const comunicadoCarousel = document.querySelector('.hero-comunicados-carousel');

  if (comunicadoSlides.length > 1) {
    let activeIndex = comunicadoSlides.findIndex((slide) => slide.classList.contains('active'));
    if (activeIndex < 0) activeIndex = 0;
    let autoTimer;

    const syncDots = () => {
      comunicadoDots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    const setActiveSlide = (nextIndex) => {
      if (nextIndex === activeIndex) return;
      comunicadoSlides[activeIndex].classList.remove('active');
      activeIndex = nextIndex;
      comunicadoSlides[activeIndex].classList.add('active');
      syncDots();
    };

    const goTo = (index) => {
      const nextIndex = (index + comunicadoSlides.length) % comunicadoSlides.length;
      setActiveSlide(nextIndex);
    };

    const nextSlide = () => goTo(activeIndex + 1);

    const startAuto = () => {
      clearInterval(autoTimer);
      autoTimer = window.setInterval(nextSlide, 3000);
    };

    const pauseAuto = () => {
      clearInterval(autoTimer);
    };

    comunicadoDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goTo(index);
        startAuto();
      });
      dot.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          goTo(index);
          startAuto();
        }
      });
    });

    if (comunicadoCarousel) {
      ['mouseenter', 'focusin'].forEach((type) => {
        comunicadoCarousel.addEventListener(type, pauseAuto);
      });
      ['mouseleave', 'focusout'].forEach((type) => {
        comunicadoCarousel.addEventListener(type, startAuto);
      });
    }

    syncDots();
    startAuto();
  }

  const entitiesTrack = document.querySelector('.entities-track');
  if (entitiesTrack && entitiesTrack.children.length > 0 && entitiesTrack.dataset.enhanced !== 'true') {
    const slides = Array.from(entitiesTrack.children);
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('data-duplicate', 'true');
      entitiesTrack.appendChild(clone);
    });
    entitiesTrack.dataset.enhanced = 'true';

    const marqueeWrapper = entitiesTrack.parentElement;
    if (marqueeWrapper) {
      const distance = entitiesTrack.scrollWidth / 2;
      const seconds = Math.max(18, distance / 100);
      entitiesTrack.style.setProperty('--entities-marquee-duration', `${seconds}s`);
    }
  }

  const docsConfig = {
    reglamentos: [
      {
        title: 'ESTATUTO GENERAL DE LA UNAM',
        description: 'CONSULTAR',
        href: 'https://www.abogadogeneral.unam.mx/sites/default/files/archivos/LegUniv/3-EstatutoGeneral_rem38_021220.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'REGLAMENTO INTERNO DE LOS CONSEJOS ACADÉMICOS DE ÁREA',
        description: 'CONSULTAR',
        href: 'https://www.abogadogeneral.unam.mx/sites/default/files/archivos/LegUniv/ReglamentoInternoConsejosAcademicosArea_090424.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'REGLAMENTO GENERAL PARA LA PRESENTACIÓN Y APROBACIÓN DE PLANES Y PROGRAMAS DE ESTUDIO',
        description: 'CONSULTAR',
        href: 'https://www.caahya.unam.mx/wp-content/uploads/2023/09/RGPAPPE.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'REQUISITOS GENERALES PARA FUNGIR COMO MIEMBRO DE LAS COMISIONES DICTAMINADORAS DEL ÁREA DE LAS HUMANIDADES Y DE LAS ARTES',
        description: 'CONSULTAR',
        href: 'https://www.caahya.unam.mx/wp-content/uploads/2025/05/Requisitos-generales.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'REGLAMENTO PARA LA ELECCIÓN DE CONSEJEROS ACADÉMICOS DE ÁREA Y DEL BACHILLERATO REPRESENTANTES DE PROFESORES, INVESTIGADORES, TÉCNICOS ACADÉMICOS Y ALUMNOS',
        description: 'CONSULTAR',
        href: 'https://www.abogadogeneral.unam.mx/sites/default/files/archivos/LegUniv/18-ReglamentoEleccionConsejerosAcademicosBachilleratoRepresentantesProfesoresInvestigadoresTecnicosAcademicosAlumnos_rem38_021220.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'NORMAS DE APLICACIÓN Y PROCEDIMIENTO DE LOS REGLAMENTOS PARA LA ELECCIÓN DE CONSEJEROS UNIVERSITARIOS Y TÉCNICOS, Y PARA LA ELECCIÓN DE CONSEJEROS ACADÉMICOS DE ÁREA Y DEL BACHILLERATO, REPRESENTANTES DE PROFESORES, INVESTIGADORES Y ALUMNOS',
        description: 'CONSULTAR',
        href: 'https://www.abogadogeneral.unam.mx/sites/default/files/archivos/LegUniv/6-NormasAplicacionProcedimientoReglamentosEleccionConsejerosUniversitariosTecnicosEleccionConsejerosAcademicosBachilleratoRepresentantesProfesoresInvestigadoresAlumnos_rem38_021220.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      },
      {
        title: 'LINEAMIENTOS Y CRITERIOS GENERALES DE EVALUACIÓN DEL PEDPACMET',
        description: 'CONSULTAR',
        href: 'https://www.caahya.unam.mx/wp-content/uploads/2025/04/LINEAMIENTOS-Y-CRITERIOS-GENERALES-CAAHyA-PEDPACMET.pdf',
        icon: 'bi bi-file-earmark-text-fill',
        arrowIcon: 'bi bi-arrow-down-circle-fill',
        targetBlank: true
      }
    ],
    actas: [
      {
        title: 'Directorio del Consejo',
        description: 'Consulta la integración y datos de contacto actualizados.',
        href: 'directorio.html',
        icon: 'bi bi-people-fill',
        arrowIcon: 'bi bi-arrow-up-right-circle-fill'
      }
    ]
  };

  const createDocCard = (item) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';

    const link = document.createElement('a');
    link.className = 'reglamento-card';
    link.href = item.href;
    if (item.targetBlank) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    const iconWrap = document.createElement('div');
    iconWrap.className = 'reglamento-icon';
    iconWrap.innerHTML = `<i class="${item.icon}"></i>`;

    const textWrap = document.createElement('div');

    const titleEl = document.createElement('h6');
    titleEl.className = 'mb-1';
    titleEl.textContent = item.title;

    const descEl = document.createElement('small');
    descEl.textContent = item.description;

    textWrap.appendChild(titleEl);
    textWrap.appendChild(descEl);

    const arrowWrap = document.createElement('span');
    arrowWrap.className = 'reglamento-arrow';
    arrowWrap.innerHTML = `<i class="${item.arrowIcon}"></i>`;

    link.appendChild(iconWrap);
    link.appendChild(textWrap);
    link.appendChild(arrowWrap);

    col.appendChild(link);
    return col;
  };

  document.querySelectorAll('[data-docs]').forEach((container) => {
    const key = container.getAttribute('data-docs');
    const entries = docsConfig[key];
    if (!entries) return;

    const fragment = document.createDocumentFragment();
    entries.forEach((item) => fragment.appendChild(createDocCard(item)));
    container.appendChild(fragment);
  });
});
