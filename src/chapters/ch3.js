/**
 * Chapter 3: Rising (Progress)
 * "03 RISING"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh3() {
  const data = chapters.find((c) => c.id === 'ch3');
  const hero = manifest[data.heroImage];
  const crane = manifest['machine-crane'];
  const scaffold = manifest['machine-scaffold'];
  const steel = manifest['material-steel-beams'];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const metaTagsHtml = data.meta
    .map((tag) => `<span class="meta-tag">${tag}</span>`)
    .join('');

  return `
    <section class="chapter-section" id="ch3" data-chapter="3">
      <div class="chapter-container">
        <div class="chapter-split">
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
              <!-- Tower Crane Satellite -->
              <div class="stage-satellite ch3-crane" data-depth="0.2">
                <img 
                  src="${crane.src}" 
                  width="${crane.width}" 
                  height="${crane.height}" 
                  alt="Tower crane lifting heavy structural materials"
                  loading="lazy"
                />
              </div>

              <!-- Main Structure Diorama Image -->
              <img 
                src="${hero.src}" 
                width="${hero.width}" 
                height="${hero.height}" 
                alt="Framed brick and concrete home rising into form" 
                class="main-stage-image"
                loading="lazy"
              />

              <!-- Structural Steel Beams Satellite -->
              <div class="stage-satellite ch3-steel" data-depth="0.35">
                <img 
                  src="${steel.src}" 
                  width="${steel.width}" 
                  height="${steel.height}" 
                  alt="Heavy industrial steel columns"
                  loading="lazy"
                />
              </div>

              <!-- Scaffold System Satellite -->
              <div class="stage-satellite ch3-scaffold" data-depth="0.4">
                <img 
                  src="${scaffold.src}" 
                  width="${scaffold.width}" 
                  height="${scaffold.height}" 
                  alt="Multi-tier safety scaffold platform"
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
