/**
 * Reusable Button Component & Utilities
 * BuildCraft Design System
 */

export function createButton({
  text,
  href = '#',
  variant = 'primary', // 'primary' | 'secondary' | 'surface' | 'dark'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon = null,
  className = '',
  attributes = {}
}) {
  const isLink = Boolean(href);
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const variantClass = `btn-${variant}`;

  const attrString = Object.entries(attributes)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  const iconHtml = icon ? `<span class="btn-icon">${icon}</span>` : '';

  if (isLink) {
    return `<a href="${href}" class="btn ${variantClass} ${sizeClass} ${className}" ${attrString}>
      <span>${text}</span>
      ${iconHtml}
    </a>`;
  }

  return `<button type="button" class="btn ${variantClass} ${sizeClass} ${className}" ${attrString}>
    <span>${text}</span>
    ${iconHtml}
  </button>`;
}

export function highlightWord(word) {
  return `<span class="highlight-bar">${word}</span>`;
}
