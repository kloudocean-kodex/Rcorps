const reviewStage = document.querySelector('.review-stage');
if (reviewStage) {
  const rail = reviewStage.querySelector('.review-rail');
  const slides = [...rail.querySelectorAll('.review-slide')];
  const dots = [...reviewStage.querySelectorAll('[data-review]')];
  const previous = reviewStage.querySelector('[data-review-prev]');
  const next = reviewStage.querySelector('[data-review-next]');
  const position = reviewStage.querySelector('.review-position');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let scrollTimer;
  function sync(index) {
    active = index;
    dots.forEach((dot, i) => i === index ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current'));
    previous.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 4;
    position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
  function go(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    sync(index);
    rail.scrollTo({ left: slides[index].offsetLeft, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => go(active - 1));
  next.addEventListener('click', () => go(active + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
  rail.addEventListener('keydown', event => {
    if (event.target !== rail) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  rail.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const nearest = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - rail.scrollLeft) < Math.abs(slides[best].offsetLeft - rail.scrollLeft) ? i : best, 0);
      sync(nearest);
    }, 120);
  }, { passive: true });
  new ResizeObserver(() => { const overflows = rail.scrollWidth > rail.clientWidth + 4; reviewStage.querySelector('.review-controls').hidden = !overflows; rail.tabIndex = overflows ? 0 : -1; rail.scrollTo({ left: slides[active].offsetLeft, behavior: 'instant' }); sync(active); }).observe(rail);
  reviewStage.classList.add('is-enhanced');
  reviewStage.querySelector('.review-controls').hidden = false;
  sync(0);
}
