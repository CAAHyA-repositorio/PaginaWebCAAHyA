document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-comision-card]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const inner = card.querySelector('.comision-card-inner');
    const frontButton = card.querySelector('.comision-flip-btn');
    const closeButton = card.querySelector('.comision-close-btn');
    const back = card.querySelector('.comision-card-back');

    if (!inner || !frontButton || !closeButton || !back) return;

    const setOpen = (open) => {
      card.dataset.open = open ? 'true' : 'false';
      if (open) {
        back.focus({ preventScroll: true });
      } else {
        frontButton.focus({ preventScroll: true });
      }
    };

    setOpen(false);

    frontButton.addEventListener('click', () => {
      const isOpen = card.dataset.open === 'true';
      setOpen(!isOpen);
    });

    closeButton.addEventListener('click', () => {
      setOpen(false);
      frontButton.focus({ preventScroll: true });
    });

    back.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        frontButton.focus({ preventScroll: true });
      }
    });
  });
});
