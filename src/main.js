/**
 * BuildCraft: "From Empty Land to Forever Home"
 * Application Entry Point
 * Orchestrates Lenis smooth scrolling, GSAP ScrollTrigger, and 2.5D depth motion.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { renderHeader, initHeader } from './ui/header.js';
import { renderFooter, initFooter } from './ui/footer.js';

import { renderCh1 } from './chapters/ch1.js';
import { renderCh2 } from './chapters/ch2.js';
import { renderCh3 } from './chapters/ch3.js';
import { renderCh4 } from './chapters/ch4.js';
import { renderCh5 } from './chapters/ch5.js';
import { renderCh6 } from './chapters/ch6.js';
import { renderCh7 } from './chapters/ch7.js';
import { renderCh8 } from './chapters/ch8.js';

gsap.registerPlugin(ScrollTrigger);

// 1. Render App HTML
function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderHeader()}
    <main id="main-content">
      ${renderCh1()}
      ${renderCh2()}
      ${renderCh3()}
      ${renderCh4()}
      ${renderCh5()}
      ${renderCh6()}
      ${renderCh7()}
      ${renderCh8()}
    </main>
    ${renderFooter()}
  `;

  initHeader();
  initFooter();
}

// 2. Setup Lenis Smooth Scrolling
function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion requested: Lenis smooth scrolling bypassed.');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Smooth scroll anchor link interceptor
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -60, duration: 1.1 });
        }
      }
    });
  });

  return lenis;
}

// 3. ScrollTrigger Orchestration
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Gentle reveal that doesn't hide elements if scrolling quickly
  const sections = document.querySelectorAll('.chapter-section');
  sections.forEach((section) => {
    const textCol = section.querySelector('.chapter-text');
    const stage = section.querySelector('.chapter-stage');
    const satellites = section.querySelectorAll('.stage-satellite');

    if (textCol) {
      gsap.from(textCol, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    if (stage) {
      gsap.from(stage, {
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Parallax depth motion for satellites on scroll
    satellites.forEach((sat) => {
      const depth = parseFloat(sat.getAttribute('data-depth')) || 0.2;
      gsap.to(sat, {
        y: -30 * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  });

  ScrollTrigger.refresh();
}

// 4. 2.5D Depth: Perspective Tilt Following Cursor
function init25DDepth() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReducedMotion) return;

  const tiltStages = document.querySelectorAll('.chapter-stage[data-tilt="true"]');

  tiltStages.forEach((stage) => {
    const wrapper = stage.querySelector('.stage-wrapper');
    const satellites = stage.querySelectorAll('.stage-satellite');
    if (!wrapper) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovered = false;
    let animFrame = null;

    function updatePhysics() {
      // Smooth lerp easing
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;

      wrapper.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      satellites.forEach((sat) => {
        const depth = parseFloat(sat.getAttribute('data-depth')) || 0.3;
        const offsetX = currentRotY * 3.5 * depth;
        const offsetY = -currentRotX * 3.5 * depth;
        sat.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
      });

      if (isHovered || Math.abs(targetRotX - currentRotX) > 0.05 || Math.abs(targetRotY - currentRotY) > 0.05) {
        animFrame = requestAnimationFrame(updatePhysics);
      }
    }

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt: max 6 degrees
      targetRotY = ((x - centerX) / centerX) * 5.5;
      targetRotX = -((y - centerY) / centerY) * 5.5;

      if (!isHovered) {
        isHovered = true;
        cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(updatePhysics);
      }
    });

    stage.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
      isHovered = false;
    });
  });
}

// Initialize everything on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  mountApp();
  initLenis();
  initScrollAnimations();
  init25DDepth();
});
