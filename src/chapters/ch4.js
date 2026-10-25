/**
 * Chapter 4: Home (Pride)
 * "04 HOME"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh4() {
  const data = chapters.find((c) => c.id === 'ch4');
  const hero = manifest[data.heroImage];
  const sofa = manifest['room-sofa-set'];
  const shelf = manifest['room-shelf'];
  const badge = manifest['badge-laurel'];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const metaTagsHtml = data.meta
    .map((tag) => `<span class="meta-tag">${tag}</span>`)
    .join('');

  return `
    <section class="chapter-section" id="ch4" data-chapter="4">
      <div class="chapter-container">
        <div class="chapter-split reverse">
          <!-- Text Column -->
          <div class="chapter-text">
            <span class="chapter-label">${data.label}</span>
            <h2 class="chapter-headline">${headline}</h2>
            <p class="chapter-body">${data.body}</p>
            <div class="chapter-meta-tags">
              ${metaTagsHtml}
            </div>
          </div>

          <!-- Stage Column -->
          <div class="chapter-stage" data-tilt="true">
            <div class="stage-wrapper">
              <!-- Architectural Shelf Satellite -->
              <div class="stage-satellite ch4-shelf" data-depth="0.25">
                <img 
                  src="${shelf.src}" 
                  width="${shelf.width}" 
                  height="${shelf.height}" 
                  alt="Custom white oak architectural millwork"
                  loading="lazy"
                />
              </div>

              <!-- Finished Forever Home Diorama Image -->
              <img 
                src="${hero.src}" 
                width="${hero.width}" 
                height="${hero.height}" 
                alt="Finished modern luxury villa surrounded by manicured landscape" 
                class="main-stage-image"
                loading="lazy"
              />

              <!-- Living Sofa Set Satellite -->
              <div class="stage-satellite ch4-interior" data-depth="0.4">
                <img 
                  src="${sofa.src}" 
                  width="${sofa.width}" 
                  height="${sofa.height}" 
                  alt="Harmonious warm interior furnishings"
                  loading="lazy"
                />
              </div>

              <!-- Guild Award Badge Satellite -->
              <div class="stage-satellite ch4-badge" data-depth="0.3">
                <img 
                  src="${badge.src}" 
                  width="${badge.width}" 
                  height="${badge.height}" 
                  alt="Craftsmanship distinction emblem"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
