document.addEventListener('DOMContentLoaded', () => {

  // 1. Carousel Navigation
  const arrows = document.querySelectorAll('.carousel-arrow');

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      const targetId = arrow.getAttribute('data-target');
      const container = document.getElementById(targetId);

      if (container) {
        // Calculate dynamic scroll amount based on card width
        // Assumes at least one card is present to measure
        const firstCard = container.querySelector('.event-card');
        let scrollAmount = 400; // default fallback

        if (firstCard) {
          const cardWidth = firstCard.getBoundingClientRect().width; // Should be ~132
          // Get gap from container style
          const style = window.getComputedStyle(container);
          const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 32; // Default to 32px (2rem) if not found

          // User requested: "recorriendo, de 3 en 3 banners"
          // Width of 3 items + 3 gaps = (cardWidth + gap) * 3
          scrollAmount = (cardWidth + gap) * 3;
        }

        const maxScroll = container.scrollWidth - container.clientWidth;

        // Loop logic: if at end, go to start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Filter Logic
  const monthFilter = document.getElementById('filter-month');
  // const entityFilter = document.getElementById('filter-entity'); 
  // const searchFilter = document.getElementById('filter-search'); 

  function filterCards() {
    const selectedMonth = monthFilter.value;

    const allCards = document.querySelectorAll('.event-card');

    allCards.forEach(card => {
      const cardMonth = card.getAttribute('data-month');

      let isMonthMatch = (selectedMonth === 'all' || cardMonth === selectedMonth);

      if (isMonthMatch) {
        card.style.display = '';
        // Small timeout to allow display change to register before opacity transition
        setTimeout(() => {
          card.style.opacity = '1';
        }, 10);
      } else {
        card.style.opacity = '0';
        // Wait for transition to finish before hiding? 
        // For simplicity, just hide immediately or use CSS transitions properly.
        // Current CSS has transition, but display:none kills it.
        // Let's just hide it.
        card.style.display = 'none';
      }
    });
  }

  if (monthFilter) {
    monthFilter.addEventListener('change', filterCards);
  }

  // Footer Year
  const yearSpans = document.querySelectorAll('[data-year]');
  yearSpans.forEach(span => {
    span.textContent = new Date().getFullYear();
  });

});
