import './styles/main.css';
import { initSmoothScroll } from './scripts/lenis-scroll.js';
import { initWebGLStudio } from './scripts/webgl-studio.js';
import { initCursorEffects } from './scripts/cursor-effects.js';
import { initProjectCards } from './scripts/project-cards.js';
import { initScrollEffects } from './scripts/scroll-effects.js';
import { initThemeToggle } from './scripts/theme-toggle.js';
import { initPortfolioFilter } from './scripts/portfolio-filter.js';
import { initMockupViewer } from './scripts/mockup-viewer.js';
import { initDesignSpecimen } from './scripts/design-specimen.js';
import { initProjectEstimator } from './scripts/project-estimator.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initWebGLStudio();
  initCursorEffects();
  initProjectCards();
  initScrollEffects();
  initPortfolioFilter();
  initMockupViewer();
  initDesignSpecimen();
  initProjectEstimator();
});
