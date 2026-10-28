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

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => { link.closest('details').open = false; }));

const openingChrome = [...document.querySelectorAll('.preview-bar, .site-head, .notice')];
function sizeHero() {
  const height = openingChrome.reduce((sum, element) => sum + element.getBoundingClientRect().height, 0);
  document.documentElement.style.setProperty('--opening-chrome', Math.ceil(height) + 'px');
}
sizeHero();
const openingObserver = new ResizeObserver(sizeHero);
openingChrome.forEach(element => openingObserver.observe(element));
