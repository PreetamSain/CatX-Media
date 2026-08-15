import './styles/main.css';
import { initSmoothScroll } from './scripts/lenis-scroll.js';
import { initWebGLStudio } from './scripts/webgl-studio.js';
import { initCursorEffects } from './scripts/cursor-effects.js';
import { initProjectCards } from './scripts/project-cards.js';
import { initScrollEffects } from './scripts/scroll-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initWebGLStudio();
  initCursorEffects();
  initProjectCards();
  initScrollEffects();
});
