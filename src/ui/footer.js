/**
 * Site Footer Component
 * Charcoal background (--ink: #1F2326) with Warm Stone & Safety Yellow accents.
 */
import { siteMeta, navigationLinks } from '../content.js';

export function renderFooter() {
  const navCols = navigationLinks
    .slice(0, 5)
    .map((item) => `<li><a href="${item.href}" class="footer-link">${item.label}</a></li>`)
    .join('');

  const secondaryCols = navigationLinks
    .slice(5)
    .map((item) => `<li><a href="${item.href}" class="footer-link">${item.label}</a></li>`)
    .join('');

  return `
    <footer class="site-footer" id="site-footer">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-brand">
            <h3>${siteMeta.brand}</h3>
            <p style="margin-bottom: 16px;">
              Crafting bespoke residential architecture from bare topography to timeless permanence. Every foundation poured for generations.
            </p>
            <p class="text-muted" style="font-size: 13px;">
              Licensed Master General Contractor · NW Architectural Guild Member
            </p>
          </div>

          <div class="footer-col">
            <h4>The Story</h4>
            <ul class="footer-links">
              ${navCols}
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <ul class="footer-links">
              ${secondaryCols}
              <li><a href="#ch8" class="footer-link">Site Feasibility</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Direct Office</h4>
            <p style="font-size: 14px; color: #c5cbd0; margin-bottom: 8px;">
              ${siteMeta.addressPlaceholder}
            </p>
            <p style="font-size: 14px; color: var(--accent); margin-bottom: 8px; font-weight: 600;">
              ${siteMeta.phonePlaceholder}
            </p>
            <p style="font-size: 14px; color: #c5cbd0;">
              ${siteMeta.emailPlaceholder}
            </p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} ${siteMeta.brand} Homes Inc. All rights reserved. Crafted with personal accountability.</p>
          <button type="button" class="back-to-top" id="back-to-top-btn" aria-label="Scroll back to top">
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
