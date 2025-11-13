(function () {
  const loops = new WeakMap();

  const hideCloneFromA11y = (node) => {
    node.setAttribute('aria-hidden', 'true');
    node.querySelectorAll('a, button').forEach((el) => {
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-hidden', 'true');
    });
  };

  const ensureClones = (track, multiplier) => {
    const container = track.parentElement;
    if (!container) return;
    const originals = Array.from(track.children).filter(
      (node) => !node.hasAttribute('data-marquee-clone')
    );
    if (!originals.length) return;
    const targetWidth = container.offsetWidth * multiplier;
    const limit = originals.length * 6; // avoid runaway cloning
    let clonesMade = 0;
    while (track.scrollWidth < targetWidth && clonesMade < limit) {
      for (const node of originals) {
        if (track.scrollWidth >= targetWidth) break;
        const clone = node.cloneNode(true);
        clone.setAttribute('data-marquee-clone', 'true');
        hideCloneFromA11y(clone);
        track.appendChild(clone);
        clonesMade += 1;
      }
    }
  };

  const removeClones = (track) => {
    track
      .querySelectorAll('[data-marquee-clone="true"]')
      .forEach((node) => node.remove());
  };

  const getGap = (track) => {
    const style = window.getComputedStyle(track);
    const gapValue = style.columnGap || style.gap || '0';
    const parsed = parseFloat(gapValue);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const createLoop = (track, options = {}) => {
    const speed = options.speed || 30;
    const minWidthMultiplier = options.minWidthMultiplier || 2.5;
    ensureClones(track, minWidthMultiplier);

    let offset = 0;
    let rafId = null;
    let lastTime = null;
    const gap = getGap(track);

    const recycle = () => {
      let first = track.firstElementChild;
      while (first) {
        const width = first.getBoundingClientRect().width;
        if (width <= 0) break;
        if (-offset >= width + gap) {
          offset += width + gap;
          track.appendChild(first);
          first = track.firstElementChild;
          continue;
        }
        break;
      }
    };

    const step = (time) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;
      offset -= (speed * delta) / 1000;
      recycle();
      track.style.transform = `translateX(${offset}px)`;
      rafId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (rafId !== null) return;
      lastTime = null;
      rafId = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (rafId === null) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const handleResize = () => {
      ensureClones(track, minWidthMultiplier);
    };
    window.addEventListener('resize', handleResize);

    const destroy = () => {
      stop();
      track.style.transform = '';
      window.removeEventListener('resize', handleResize);
      removeClones(track);
      loops.delete(track);
    };

    return { start, stop, destroy };
  };

  window.MarqueeLooper = {
    mount(track, options) {
      if (!track) return null;
      if (loops.has(track)) {
        const existing = loops.get(track);
        existing.start();
        return existing;
      }
      const loop = createLoop(track, options);
      loops.set(track, loop);
      loop.start();
      return loop;
    },
    unmount(track) {
      const loop = loops.get(track);
      if (loop) {
        loop.destroy();
      }
    }
  };
})();
