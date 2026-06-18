const DESKTOP_MEDIA_QUERY = '(min-width: 1025px)';

export function initSiteHeaderMenu() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const burger = header.querySelector('.js-burger');
  const nav = header.querySelector('.site-header__nav');
  const actions = header.querySelector('.site-header__actions');
  if (!(burger instanceof HTMLButtonElement)) return;

  const links = [
    ...header.querySelectorAll('.site-header__nav-link'),
    ...header.querySelectorAll('.site-header__cta'),
  ];
  const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

  const setOpenState = (isOpen) => {
    header.classList.toggle('is-menu-open', isOpen);
    document.body.classList.toggle('is-menu-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  const toggleMenu = () => {
    const isOpen = header.classList.contains('is-menu-open');
    setOpenState(!isOpen);
  };

  const closeMenu = () => setOpenState(false);

  burger.addEventListener('click', toggleMenu);
  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  desktopMediaQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('is-menu-open')) return;
    if (!(event.target instanceof Node)) return;

    const clickedBurger = burger.contains(event.target);
    const clickedNav = nav?.contains(event.target) ?? false;
    const clickedActions = actions?.contains(event.target) ?? false;

    if (!clickedBurger && !clickedNav && !clickedActions) {
      closeMenu();
    }
  });
}
