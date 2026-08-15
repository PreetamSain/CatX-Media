import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEffects() {
  // 1. Kinetic Master Title Roll-up on scroll
  const kineticSection = document.querySelector('.intro-kinetic');
  const kineticLines = document.querySelectorAll('.intro-kinetic .kinetic-line');

  if (kineticSection && kineticLines.length > 0) {
    gsap.fromTo(kineticLines, {
      y: '130%',
      opacity: 0
    }, {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: kineticSection,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // 2. Staggered Word Reveal on About Paragraph
  const aboutSection = document.querySelector('.index__section.about');
  const aboutWords = document.querySelectorAll('.paragraph .word');

  if (aboutSection && aboutWords.length > 0) {
    gsap.fromTo(aboutWords, {
      opacity: 0.15,
      y: 10
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.7
      }
    });
  }

  // 3. Stats Numbers Counter & Fade In
  const statsSection = document.querySelector('.about__stats');
  const statCards = document.querySelectorAll('.stat__card');

  if (statsSection && statCards.length > 0) {
    gsap.fromTo(statCards, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsSection,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // 4. Mobile Menu open/close
  const mobileMenuBtn = document.querySelector('.nav__menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileMenu.classList.add('is-open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
      });
    }

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
      });
    });
  }
}
