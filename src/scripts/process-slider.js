const PROCESS_TOP_LAYER = ['front', 'mid', 'back'];
const MOBILE_MEDIA_QUERY = '(max-width: 1024px)';

export function initProcessSlider() {
  const root = document.querySelector('[data-process-slider]');
  if (!root) return;

  const items = [...root.querySelectorAll('[data-process-slide]')];
  const list = root.querySelector('.process__list');
  const gallery = root.querySelector('[data-process-gallery]');
  const photos = [...root.querySelectorAll('[data-process-alt]')];
  const prevButton = root.querySelector('.process__control--prev');
  const nextButton = root.querySelector('.process__control--next');
  const currentLabels = [...root.querySelectorAll('.process__counter [data-process-current]')];
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

  if (items.length === 0 || !list) return;

  let index = items.findIndex((item) => item.classList.contains('is-active'));
  if (index < 0) index = 0;

  const lastIndex = items.length - 1;
  let isMobile = mediaQuery.matches;
  let isProgrammaticScroll = false;
  let scrollSyncTimeout;

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

  const applySharedState = (nextIndex) => {
    index = Math.min(Math.max(nextIndex, 0), lastIndex);

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

  const setDesktopVisibility = () => {
    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === index;
      item.classList.toggle('is-active', isActive);
      item.toggleAttribute('hidden', !isActive);
    });
  };

  const setMobileVisibility = () => {
    items.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('hidden');
    });
  };

  const getSlideWidth = () => {
    const firstItem = items[0];
    if (!firstItem) return 0;
    return firstItem.getBoundingClientRect().width;
  };

  const scrollToIndex = (nextIndex, behavior = 'smooth') => {
    applySharedState(nextIndex);
    const width = getSlideWidth();
    if (width === 0) return;

    isProgrammaticScroll = true;
    list.scrollTo({ left: width * index, behavior });
    window.clearTimeout(scrollSyncTimeout);
    scrollSyncTimeout = window.setTimeout(() => {
      isProgrammaticScroll = false;
    }, 240);
  };

  const syncIndexFromScroll = () => {
    if (!isMobile || isProgrammaticScroll) return;

    const width = getSlideWidth();
    if (width === 0) return;

    const nextIndex = Math.min(Math.max(Math.round(list.scrollLeft / width), 0), lastIndex);
    if (nextIndex !== index) {
      applySharedState(nextIndex);
    }
  };

  const applyMode = () => {
    isMobile = mediaQuery.matches;

    if (isMobile) {
      setMobileVisibility();
      window.requestAnimationFrame(() => {
        scrollToIndex(index, 'auto');
      });
      return;
    }

    isProgrammaticScroll = false;
    list.scrollTo({ left: 0, behavior: 'auto' });
    setDesktopVisibility();
    applySharedState(index);
  };

  prevButton?.addEventListener('click', () => {
    if (isMobile) {
      scrollToIndex(index - 1);
      return;
    }
    applySharedState(index - 1);
    setDesktopVisibility();
  });

  nextButton?.addEventListener('click', () => {
    if (isMobile) {
      scrollToIndex(index + 1);
      return;
    }
    applySharedState(index + 1);
    setDesktopVisibility();
  });

  list.addEventListener('scroll', syncIndexFromScroll, { passive: true });
  mediaQuery.addEventListener('change', applyMode);

  applySharedState(index);
  applyMode();
}
