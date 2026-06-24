import gsap from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getDetailsHeights = (details) => {
  const wasOpen = details.open;
  const currentHeight = details.offsetHeight;

  if (!wasOpen) {
    details.open = true;
    const openHeight = details.offsetHeight;
    details.open = false;
    return { collapsedHeight: currentHeight, expandedHeight: openHeight };
  }

  details.open = false;
  const collapsedHeight = details.offsetHeight;
  details.open = true;
  return { collapsedHeight, expandedHeight: currentHeight };
};

export function initFaqAccordion() {
  const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  if (reduceMotion.matches) {
    return;
  }

  const faqItems = [...document.querySelectorAll('.faq-item')];
  if (faqItems.length === 0) {
    return;
  }

  const activeTimelines = new WeakMap();

  faqItems.forEach((item) => {
    if (!(item instanceof HTMLDetailsElement)) {
      return;
    }

    const summary = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!(summary instanceof HTMLElement) || !(answer instanceof HTMLElement)) {
      return;
    }

    summary.addEventListener('click', (event) => {
      event.preventDefault();

      const runningTimeline = activeTimelines.get(item);
      if (runningTimeline) {
        runningTimeline.kill();
        activeTimelines.delete(item);
      }

      const { collapsedHeight, expandedHeight } = getDetailsHeights(item);
      const isOpening = !item.open;

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          item.style.removeProperty('height');
          item.style.removeProperty('overflow');
          if (isOpening) {
            gsap.set(answer, { clearProps: 'height,opacity,transform,overflow' });
          } else {
            item.open = false;
            gsap.set(answer, { clearProps: 'height,opacity,transform,overflow' });
          }
          activeTimelines.delete(item);
        },
        onInterrupt: () => {
          item.style.removeProperty('height');
          item.style.removeProperty('overflow');
          gsap.set(answer, { clearProps: 'height,opacity,transform,overflow' });
          activeTimelines.delete(item);
        },
      });

      activeTimelines.set(item, timeline);

      if (isOpening) {
        item.open = true;
        gsap.set(answer, { height: 0, opacity: 0, y: -8, overflow: 'hidden' });
        gsap.set(item, { height: collapsedHeight, overflow: 'hidden' });

        timeline
          .to(item, {
            height: expandedHeight,
            duration: 0.45,
          })
          .to(
            answer,
            {
              height: answer.scrollHeight,
              opacity: 1,
              y: 0,
              duration: 0.4,
            },
            0
          );
        return;
      }
      item.open = false;
      gsap.set(answer, { clearProps: 'height,opacity,transform,overflow' });
      gsap.set(item, { clearProps: 'height,overflow' });
      timeline.kill();
      activeTimelines.delete(item);
    });
  });
}
