const PROCESS_TOP_LAYER = ['front', 'mid', 'back'];

export function initProcessSlider() {
  const root = document.querySelector('[data-process-slider]');
  if (!root) return;

  const items = [...root.querySelectorAll('[data-process-slide]')];
  const gallery = root.querySelector('[data-process-gallery]');
  const photos = [...root.querySelectorAll('[data-process-alt]')];
  const prevButton = root.querySelector('.process__control--prev');
  const nextButton = root.querySelector('.process__control--next');
  const currentLabels = [...root.querySelectorAll('[data-process-current]')];

  if (items.length === 0) return;

  let index = items.findIndex((item) => item.classList.contains('is-active'));
  if (index < 0) index = 0;

  const lastIndex = items.length - 1;

  const syncGalleryAccessibility = (stepIndex) => {
    const topLayer = PROCESS_TOP_LAYER[stepIndex];
    if (!topLayer) return;

    photos.forEach((img) => {
      const picture = img.closest('.process__picture');
      const layer = picture?.className.match(/process__picture--(\w+)/)?.[1];
      const isTop = layer === topLayer;
      const alt = img.dataset.processAlt ?? '';

      if (isTop) {
        img.alt = alt;
        img.removeAttribute('aria-hidden');
      } else {
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
      }
    });
  };

  const setActive = (nextIndex) => {
    index = Math.min(Math.max(nextIndex, 0), lastIndex);

    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === index;
      item.classList.toggle('is-active', isActive);
      item.toggleAttribute('hidden', !isActive);
    });

    if (gallery) {
      gallery.dataset.processStep = String(index + 1);
    }

    syncGalleryAccessibility(index);

    const label = String(index + 1).padStart(2, '0');
    currentLabels.forEach((element) => {
      element.textContent = label;
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === lastIndex;
  };

  prevButton?.addEventListener('click', () => setActive(index - 1));
  nextButton?.addEventListener('click', () => setActive(index + 1));

  setActive(index);
}
