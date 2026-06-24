import gsap from 'gsap';

const PROCESS_TOP_LAYER = ['front', 'mid', 'back'];
const MOBILE_MEDIA_QUERY = '(max-width: 1024px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

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
  const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  if (items.length === 0 || !list) return;

  let index = items.findIndex((item) => item.classList.contains('is-active'));
  if (index < 0) index = 0;

  const lastIndex = items.length - 1;
  let isMobile = mediaQuery.matches;
  let isProgrammaticScroll = false;
  let scrollSyncTimeout;
  let mobileScrollTween;
  let desktopTransitionTween;
  let isDesktopTransitioning = false;

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

  const getPictureByLayer = (layer) => {
    if (!gallery || !layer) return null;
    const picture = gallery.querySelector(`.process__picture--${layer}`);
    return picture instanceof Element ? picture : null;
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

    mobileScrollTween?.kill();
    isProgrammaticScroll = true;

    if (behavior === 'auto' || reduceMotionQuery.matches) {
      list.scrollTo({ left: width * index, behavior: 'auto' });
      window.clearTimeout(scrollSyncTimeout);
      scrollSyncTimeout = window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 0);
      return;
    }

    mobileScrollTween = gsap.to(list, {
      scrollLeft: width * index,
      duration: 0.55,
      ease: 'power2.out',
      onComplete: () => {
        window.clearTimeout(scrollSyncTimeout);
        scrollSyncTimeout = window.setTimeout(() => {
          isProgrammaticScroll = false;
        }, 0);
        mobileScrollTween = null;
      },
      onInterrupt: () => {
        isProgrammaticScroll = false;
        mobileScrollTween = null;
      },
    });
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
    isDesktopTransitioning = false;
    desktopTransitionTween?.kill();
    desktopTransitionTween = null;

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

  const transitionDesktopTo = (nextIndex) => {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), lastIndex);
    if (clampedIndex === index || isDesktopTransitioning) {
      return;
    }

    desktopTransitionTween?.kill();

    if (reduceMotionQuery.matches) {
      applySharedState(clampedIndex);
      setDesktopVisibility();
      return;
    }

    const previousItem = items[index];
    const previousCard = previousItem?.querySelector('.process-card') ?? previousItem;
    const previousTopPicture = getPictureByLayer(PROCESS_TOP_LAYER[index]);

    isDesktopTransitioning = true;
    desktopTransitionTween = gsap.timeline({
      onComplete: () => {
        isDesktopTransitioning = false;
        desktopTransitionTween = null;
      },
      onInterrupt: () => {
        isDesktopTransitioning = false;
        desktopTransitionTween = null;
      },
    });

    if (previousCard) {
      desktopTransitionTween.to(
        previousCard,
        {
          opacity: 0,
          y: -16,
          duration: 0.2,
          ease: 'power2.out',
        },
        0
      );
    }

    if (previousTopPicture) {
      desktopTransitionTween.to(
        previousTopPicture,
        {
          opacity: 0.82,
          scale: 0.97,
          duration: 0.24,
          ease: 'power2.out',
        },
        0
      );
    }

    desktopTransitionTween.add(() => {
      applySharedState(clampedIndex);
      setDesktopVisibility();

      const activeItem = items[index];
      const activeCard = activeItem?.querySelector('.process-card') ?? activeItem;
      const activeTopPicture = getPictureByLayer(PROCESS_TOP_LAYER[index]);

      if (activeCard) {
        gsap.set(activeCard, { opacity: 0, y: 24 });
        desktopTransitionTween.to(
          activeCard,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          0
        );
      }

      if (activeTopPicture) {
        gsap.set(activeTopPicture, { opacity: 0.82, scale: 1.03 });
        desktopTransitionTween.to(
          activeTopPicture,
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          0
        );
      }

      if (previousCard) {
        gsap.set(previousCard, { clearProps: 'opacity,transform' });
      }
      if (previousTopPicture) {
        gsap.set(previousTopPicture, { clearProps: 'opacity,transform' });
      }
    });
  };

  prevButton?.addEventListener('click', () => {
    if (isMobile) {
      scrollToIndex(index - 1);
      return;
    }
    transitionDesktopTo(index - 1);
  });

  nextButton?.addEventListener('click', () => {
    if (isMobile) {
      scrollToIndex(index + 1);
      return;
    }
    transitionDesktopTo(index + 1);
  });

  list.addEventListener('scroll', syncIndexFromScroll, { passive: true });
  mediaQuery.addEventListener('change', applyMode);

  applySharedState(index);
  applyMode();
}
