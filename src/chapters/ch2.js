/**
 * Chapter 2: Foundations (Trust)
 * "02 FOUNDATIONS"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh2() {
  const data = chapters.find((c) => c.id === 'ch2');
  const hero = manifest[data.heroImage];
  const excavator = manifest['machine-excavator'];
  const rebar = manifest['material-rebar-cage'];
  const mixer = manifest['machine-mixer'];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const metaTagsHtml = data.meta
    .map((tag) => `<span class="meta-tag">${tag}</span>`)
    .join('');

  return `
    <section class="chapter-section" id="ch2" data-chapter="2">
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
              <!-- Rebar Cage Satellite -->
              <div class="stage-satellite ch2-rebar" data-depth="0.25">
                <img 
                  src="${rebar.src}" 
                  width="${rebar.width}" 
                  height="${rebar.height}" 
                  alt="Seismic grade rebar reinforcement cage"
                  loading="lazy"
                />
              </div>

              <!-- Main Foundation Diorama Image -->
              <img 
                src="${hero.src}" 
                width="${hero.width}" 
                height="${hero.height}" 
                alt="Engineered concrete foundation and footing site" 
                class="main-stage-image"
                loading="lazy"
              />

              <!-- Excavator Machine Satellite -->
              <div class="stage-satellite ch2-excavator" data-depth="0.4">
                <img 
                  src="${excavator.src}" 
                  width="${excavator.width}" 
                  height="${excavator.height}" 
                  alt="Excavation machine on bedrock site"
                  loading="lazy"
                />
              </div>

              <!-- Concrete Mixer Machine Satellite -->
              <div class="stage-satellite ch2-mixer" data-depth="0.35">
                <img 
                  src="${mixer.src}" 
                  width="${mixer.width}" 
                  height="${mixer.height}" 
                  alt="High PSI concrete mixer truck"
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
