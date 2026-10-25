/**
 * Site Header Component with Progress Bar & Navigation
 */
import { siteMeta, navigationLinks } from '../content.js';
import { createButton } from './buttons.js';

export function renderHeader() {
  const navItemsHtml = navigationLinks
    .map(
      (link, idx) => `
    <li>
      <a href="${link.href}" class="nav-link ${idx === 0 ? 'active' : ''}" data-target="${link.href}">
        ${link.label}
      </a>
    </li>
  `
    )
    .join('');

  const ctaBtn = createButton({
    text: siteMeta.ctaText,
    href: siteMeta.ctaHref,
    variant: 'primary',
    size: 'sm'
  });

  return `
    <header class="site-header" id="site-header">
      <div class="progress-bar-container">
        <div class="progress-bar" id="scroll-progress"></div>
      </div>
      <div class="header-container">
        <a href="#ch1" class="brand-link" aria-label="BuildCraft Homepage">
          <div class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Geometric House Mark using brand Charcoal and Safety Yellow -->
              <polygon points="20,4 36,16 4,16" fill="#1F2326" />
              <polygon points="20,8 32,17 8,17" fill="#FFB020" />
              <rect x="7" y="17" width="26" height="19" rx="1" fill="#1F2326" />
              <rect x="15" y="24" width="10" height="12" fill="#E6E1D8" />
              <rect x="18" y="27" width="4" height="9" fill="#FFB020" />
            </svg>
          </div>
          <span class="brand-name">${siteMeta.brand}</span>
        </a>

        <nav class="site-nav" aria-label="Main Navigation">
          <ul class="nav-links" id="nav-links">
            ${navItemsHtml}
          </ul>
        </nav>

        <div class="header-actions">
          ${ctaBtn}
          <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initHeader() {
  const progressBar = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinksList = document.getElementById('nav-links');

  // Mobile menu toggle
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksList.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinksList.classList.remove('open');
      });
    });
  }

  // Scroll Progress Bar & Nav Active Tracking
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Update active nav link based on section in view
    const sections = document.querySelectorAll('.chapter-section');
    let currentId = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentId = '#' + section.id;
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}
