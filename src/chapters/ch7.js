/**
 * Chapter 7: Our Homes (Proof)
 * "07 OUR HOMES"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh7() {
  const data = chapters.find((c) => c.id === 'ch7');
  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const projectCardsHtml = data.projects
    .map((project, idx) => {
      const asset = manifest[project.key];
      const isFeatured = idx === 0 ? 'featured' : '';

      return `
        <article class="portfolio-card ${isFeatured}">
          <div class="portfolio-image-wrap">
            <img 
              src="${asset.src}" 
              width="${asset.width}" 
              height="${asset.height}" 
              alt="${project.title} - ${project.type}" 
              loading="lazy"
            />
          </div>
          <div class="portfolio-details">
            <div class="portfolio-meta-row">
              <span class="portfolio-type">${project.type}</span>
              <span class="portfolio-year">${project.year}</span>
            </div>
            <h3 class="portfolio-title">${project.title}</h3>
            <div class="portfolio-specs">
              <span>📍 ${project.location}</span>
              <span>📐 ${project.area}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="chapter-section" id="ch7" data-chapter="7">
      <div class="chapter-container">
        <div class="portfolio-header">
          <span class="chapter-label">${data.label}</span>
          <h2 class="chapter-headline">${headline}</h2>
          <p class="chapter-body">${data.body}</p>
        </div>

        <div class="portfolio-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>
  `;
}
