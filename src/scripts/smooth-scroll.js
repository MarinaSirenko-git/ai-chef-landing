import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const ANCHOR_SELECTOR = 'a[href]';
const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

gsap.registerPlugin(ScrollToPlugin);

function getTargetFromHash(hash) {
  if (!hash || hash === '#') {
    return null;
  }

  const targetId = decodeURIComponent(hash.slice(1));
  if (!targetId) {
    return null;
  }

  return document.getElementById(targetId);
}

function focusTarget(target) {
  const isNaturallyFocusable = target.matches(FOCUSABLE_SELECTOR);

  if (!isNaturallyFocusable) {
    target.setAttribute('tabindex', '-1');
  }

  target.focus({ preventScroll: true });
}

function isSamePageHashLink(link) {
  const destination = new URL(link.href, window.location.href);
  return (
    destination.origin === window.location.origin &&
    destination.pathname === window.location.pathname &&
    destination.search === window.location.search &&
    Boolean(destination.hash)
  );
}

export function initSmoothScroll() {
  const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY);

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (reduceMotion.matches) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest(ANCHOR_SELECTOR);
    if (!link) {
      return;
    }

    if (!isSamePageHashLink(link)) {
      return;
    }

    if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    const target = getTargetFromHash(destination.hash);
    if (!target) {
      return;
    }

    event.preventDefault();

    gsap.to(window, {
      duration: 1,
      ease: 'power1.out',
      overwrite: 'auto',
      scrollTo: {
        y: target,
        autoKill: false,
      },
      onComplete: () => {
        window.history.pushState(null, '', destination.hash);
        focusTarget(target);
      },
    });
  });
}
