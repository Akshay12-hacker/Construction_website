/**
 * Chapter 8: Your Turn (Invitation)
 * "08 YOUR TURN"
 */
import { chapters, manifest, siteMeta } from '../content.js';
import { highlightWord, createButton } from '../ui/buttons.js';

export function renderCh8() {
  const data = chapters.find((c) => c.id === 'ch8');
  const hero = manifest[data.heroImage];
  const hardhat = manifest['tool-hardhat'];
  const hammer = manifest['tool-hammer'];

  const headline = `${data.headlineBefore} ${highlightWord(data.highlight)}${data.headlineAfter}`;

  const highlightsHtml = data.inquiryHighlights
    .map((item) => `<li>${item}</li>`)
    .join('');

  const primaryBtn = createButton({
    text: data.ctaPrimary,
    href: 'mailto:' + siteMeta.emailPlaceholder + '?subject=Inquiry%3A%20Land%20Feasibility%20Walk',
    variant: 'primary',
    size: 'lg'
  });

  const secondaryBtn = createButton({
    text: data.ctaSecondary,
    href: '#site-footer',
    variant: 'secondary',
    size: 'lg'
  });

  return `
    <section class="chapter-section" id="ch8" data-chapter="8">
      <div class="chapter-container">
        <div class="invitation-container">
          <!-- Text & Inquiry Card Column -->
          <div class="chapter-text">
            <span class="chapter-label">${data.label}</span>
            <h2 class="chapter-headline">${headline}</h2>
            <p class="chapter-body">${data.body}</p>

            <div class="inquiry-card">
              <h3>Start With a 45-Minute Site Walk</h3>
              <p>We review your parcel’s orientation, slopes, soil history, and local setbacks with no obligations.</p>
              
              <ul class="inquiry-points">
                ${highlightsHtml}
              </ul>

              <div class="inquiry-actions">
                ${primaryBtn}
                ${secondaryBtn}
              </div>

              <div class="inquiry-contact-direct">
                <span>Or call the builder directly:</span>
                <a href="tel:${siteMeta.phonePlaceholder.replace(/[^0-9+]/g, '')}" class="contact-item">
                  📞 ${siteMeta.phonePlaceholder}
                </a>
              </div>
            </div>
          </div>

          <!-- Stage Column: House Model & Blueprint Tools -->
          <div class="chapter-stage" data-tilt="true">
            <div class="stage-wrapper">
              <!-- Hardhat Satellite -->
              <div class="stage-satellite" style="top: -12%; right: 4%; width: clamp(100px, 16vw, 190px);" data-depth="0.3">
                <img 
                  src="${hardhat.src}" 
                  width="${hardhat.width}" 
                  height="${hardhat.height}" 
                  alt="Job-ready safety hardhat" 
                  loading="lazy"
                />
              </div>

              <!-- Main House Model on Blueprints -->
              <img 
                src="${hero.src}" 
                width="${hero.width}" 
                height="${hero.height}" 
                alt="Architectural model of future residence on drafting table" 
                class="main-stage-image"
                loading="lazy"
              />

              <!-- Precision Hammer Satellite -->
              <div class="stage-satellite" style="bottom: -8%; left: 2%; width: clamp(100px, 15vw, 180px);" data-depth="0.4">
                <img 
                  src="${hammer.src}" 
                  width="${hammer.width}" 
                  height="${hammer.height}" 
                  alt="Balanced precision claw hammer" 
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
