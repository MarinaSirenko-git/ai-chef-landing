import gsap from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MOBILE_QUERY = '(max-width: 767px)';

export function initHeroReveal() {
  const title = document.querySelector('.hero__title');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const galleryItems = gsap.utils.toArray('.hero__gallery-item');

  if (!(title instanceof Element) || !(eyebrow instanceof Element) || galleryItems.length === 0) {
    return;
  }

  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: REDUCED_MOTION_QUERY,
      mobile: MOBILE_QUERY,
      desktop: '(min-width: 768px)',
    },
    (context) => {
      const { reduceMotion, mobile, desktop } = context.conditions;

      if (reduceMotion || mobile || !desktop) {
        return;
      }

      const revealTimeline = gsap.timeline({
        defaults: {
          y: 24,
          ease: 'power2.out',
        },
      });

      revealTimeline
        .from([title, eyebrow], {
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
        })
        .from(
          galleryItems,
          {
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '>-0.05'
        );

      return () => {
        revealTimeline.kill();
        gsap.set([title, eyebrow, ...galleryItems], { clearProps: 'opacity,transform' });
      };
    }
  );
}
