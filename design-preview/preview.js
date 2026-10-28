'use strict';

const palettes = ['malyva', 'terrakotta', 'zsalya'];
function applyPalette(name) {
  if (!palettes.includes(name)) return;
  document.documentElement.dataset.palette = name;
  document.querySelectorAll('.palette-choice').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.palette === name)));
  try { sessionStorage.setItem('lumi-preview-palette', name); } catch { /* Palette selection also works without storage. */ }
  const current = new URL(location.href);
  current.searchParams.set('szin', name);
  history.replaceState(null, '', current);
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const destination = new URL(link.getAttribute('href'), location.origin);
    destination.searchParams.set('szin', name);
    link.setAttribute('href', destination.pathname + destination.search + destination.hash);
  });
}
let initialPalette = new URLSearchParams(location.search).get('szin');
try { initialPalette ||= sessionStorage.getItem('lumi-preview-palette'); } catch { /* Use the default palette. */ }
applyPalette(palettes.includes(initialPalette) ? initialPalette : 'malyva');
document.querySelectorAll('.palette-choice').forEach(button => button.addEventListener('click', () => applyPalette(button.dataset.palette)));

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
  document.documentElement.style.setProperty('--sticky-header-height', Math.ceil(document.querySelector('.site-head').getBoundingClientRect().height) + 'px');
}
sizeHero();
const openingObserver = new ResizeObserver(sizeHero);
openingChrome.forEach(element => openingObserver.observe(element));
