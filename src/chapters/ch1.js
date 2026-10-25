/**
 * Chapter 1: Empty Land (Possibility)
 * "01 EMPTY LAND"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh1() {
  const data = chapters.find((c) => c.id === 'ch1');
  const hero = manifest[data.heroImage];
  const blueprint = manifest['tool-blueprint'];
  const level = manifest['tool-level'];
  const clouds = manifest['sky-clouds'];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const metaTagsHtml = data.meta
    .map((tag) => `<span class="meta-tag">${tag}</span>`)
    .join('');

  return `
    <section class="chapter-section" id="ch1" data-chapter="1">
      <div class="chapter-container">
        <div class="chapter-split">
          <!-- Text Column (Strictly separated from images) -->
          <div class="chapter-text">
            <span class="chapter-label">${data.label}</span>
            <h1 class="chapter-headline">${headline}</h1>
            <p class="chapter-body">${data.body}</p>
            <div class="chapter-meta-tags">
              ${metaTagsHtml}
            </div>
          </div>

          <!-- Stage Column (Layered 2.5D diorama & instruments) -->
          <div class="chapter-stage" data-tilt="true">
            <div class="stage-wrapper">
              <!-- Clouds Satellite -->
              <div class="stage-satellite ch1-clouds" data-depth="0.15">
                <img 
                  src="${clouds.src}" 
                  width="${clouds.width}" 
                  height="${clouds.height}" 
                  alt="Clear sky above construction parcel"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              <!-- Main Plot Diorama Image -->
              <img 
                src="${hero.src}" 
                width="${hero.width}" 
                height="${hero.height}" 
                alt="Empty residential plot ready for construction" 
                class="main-stage-image"
                loading="eager"
                fetchpriority="high"
              />

              <!-- Level Tool Satellite -->
              <div class="stage-satellite ch1-level" data-depth="0.35">
                <img 
                  src="${level.src}" 
                  width="${level.width}" 
                  height="${level.height}" 
                  alt="High precision spirit level"
                  loading="eager"
                />
              </div>

              <!-- Blueprint Tool Satellite -->
              <div class="stage-satellite ch1-blueprint" data-depth="0.45">
                <img 
                  src="${blueprint.src}" 
                  width="${blueprint.width}" 
                  height="${blueprint.height}" 
                  alt="Topographic architectural survey blueprints"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
