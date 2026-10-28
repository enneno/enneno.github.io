'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector('.lightbox');
let photoOpener;
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    photoOpener = button;
    const source = button.querySelector('img');
    dialog.querySelector('img').src = source.src;
    dialog.querySelector('img').alt = source.alt;
    dialog.querySelector('figcaption').textContent = source.alt;
    dialog.showModal();
  });
});
dialog?.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => photoOpener?.focus({ preventScroll: true }));

const rail = document.querySelector('.film-rail');
function movePhoto(step) {
  const frame = rail.querySelector('.film-frame');
  const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
  rail.scrollBy({ left: step * (frame.getBoundingClientRect().width + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => movePhoto(Number(button.dataset.step))));
rail?.addEventListener('keydown', event => {
  if (event.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
});

document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-service]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-service-panel]').forEach(panel => { panel.hidden = panel.dataset.servicePanel !== button.dataset.service; });
  });
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => { link.closest('details').open = false; }));
if (location.pathname === '/arlista/') {
  const variant = new URLSearchParams(location.search).get('v');
  if (['b', 'c'].includes(variant)) document.querySelectorAll('a[href="/a/"], a[href^="/a/#"]').forEach(link => link.setAttribute('href', link.getAttribute('href').replace('/a/', '/' + variant + '/')));
}
