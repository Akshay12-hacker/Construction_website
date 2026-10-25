/**
 * Chapter 6: The Person Behind It (Warmth)
 * "06 THE PERSON BEHIND IT"
 * Charcoal background (--ink: #1F2326) per prompt requirements.
 */
import { chapters, manifest } from '../content.js';
import { highlightWord } from '../ui/buttons.js';

export function renderCh6() {
  const data = chapters.find((c) => c.id === 'ch6');
  const founder = manifest[data.heroImage];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const credentialsHtml = data.credentials
    .map(
      (c) => `
    <div class="cred-card">
      <div class="metric">${c.metric}</div>
      <div class="label">${c.label}</div>
    </div>
  `
    )
    .join('');

  return `
    <section class="chapter-section section-dark" id="ch6" data-chapter="6">
      <div class="chapter-container">
        <div class="chapter-split reverse">
          <!-- Text Column: Founder Credo & Accountability -->
          <div class="chapter-text">
            <span class="chapter-label">${data.label}</span>
            <h2 class="chapter-headline" style="color: #ffffff;">${headline}</h2>
            
            <blockquote class="founder-quote">
              ${data.quote}
            </blockquote>

            <div class="founder-profile">
              <span class="founder-name">${data.founderName}</span>
              <span class="founder-title">${data.founderTitle}</span>
              <span class="founder-note">${data.founderNote}</span>
            </div>

            <div class="credentials-row">
              ${credentialsHtml}
            </div>
          </div>

          <!-- Stage Column: Founder Cut-Out -->
          <div class="chapter-stage founder-image-stage" data-tilt="true">
            <div class="stage-wrapper">
              <img 
                src="${founder.src}" 
                width="${founder.width}" 
                height="${founder.height}" 
                alt="${data.founderName}, ${data.founderTitle}" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
