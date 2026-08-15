import './styles/main.css';
import { initSmoothScroll } from './scripts/lenis-scroll.js';
import { initPreloader } from './scripts/preloader.js';
import { initWebGLStudio } from './scripts/webgl-studio.js';
import { initCursorEffects } from './scripts/cursor-effects.js';
import { initProjectCards } from './scripts/project-cards.js';
import { initScrollEffects } from './scripts/scroll-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initPreloader();
  initWebGLStudio();
  initCursorEffects();
  initProjectCards();
  initScrollEffects();
});
