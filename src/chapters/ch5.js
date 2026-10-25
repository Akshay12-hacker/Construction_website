/**
 * Chapter 5: Inside the Walls (Confidence)
 * "05 INSIDE THE WALLS"
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh5() {
  const data = chapters.find((c) => c.id === 'ch5');
  const xray = manifest[data.xrayImage];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const materialsHtml = data.materials
    .map((mat) => {
      const asset = manifest[mat.key];
      return `
        <div class="material-card">
          <img 
            src="${asset.src}" 
            width="${asset.width}" 
            height="${asset.height}" 
            alt="${mat.name} sample" 
            class="material-thumb"
            loading="lazy"
          />
          <div class="material-info">
            <h4>${mat.name}</h4>
            <span>${mat.spec}</span>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <section class="chapter-section" id="ch5" data-chapter="5">
      <div class="chapter-container">
        <div class="chapter-split">
          <!-- Text Column & Material Specifications -->
          <div class="chapter-text">
            <span class="chapter-label">${data.label}</span>
            <h2 class="chapter-headline">${headline}</h2>
            <p class="chapter-body">${data.body}</p>
            <div class="materials-grid">
              ${materialsHtml}
            </div>
          </div>

          <!-- Stage Column: X-Ray Utilities Cutaway -->
          <div class="chapter-stage" data-tilt="true">
            <div class="stage-wrapper">
              <div class="xray-container">
                <span class="xray-badge">Mechanical & Structural Core</span>
                <img 
                  src="${xray.src}" 
                  width="${xray.width}" 
                  height="${xray.height}" 
                  alt="High resolution architectural cutaway of interior mechanics and thermal envelope" 
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
