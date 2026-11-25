import { useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function BanproHero() {
  const root = useRef(null);
  const media = banproData.hero;

  useReveal(root, ({ wide }) => {
    gsap.from('.bp-hero-kicker, .bp-hero-title > span, .bp-hero-deck, .bp-hero-scroll', {
      y: 28,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.15,
    });
    gsap.from('.bp-hero-art', {
      clipPath: 'inset(0 0 100% 0)',
      scale: 1.04,
      duration: 1.35,
      ease: 'power4.out',
      delay: 0.18,
    });

    if (wide) {
      gsap.to('.bp-hero-image', {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
    }
  }, []);

  return (
    <section className="bp-hero" ref={root} aria-labelledby="bp-hero-title">
      <div className="bp-hero-top bp-wrap">
        <p className="bp-hero-kicker">BRAND COLLABORATION <span>/</span> 2026</p>
        <p className="bp-hero-index">SOCIAL365 <span>×</span> BANPRO</p>
      </div>

      <div className="bp-hero-layout bp-wrap">
        <div className="bp-hero-copy">
          <h1 className="bp-hero-title" id="bp-hero-title">
            <span>BANPRO</span>
            <span className="bp-hero-title-secondary"><i aria-hidden="true">×</i> SOCIAL365</span>
          </h1>
          <p className="bp-hero-subtitle">A collaboration built on creativity.</p>
          <p className="bp-hero-deck">A showcase of the campaign visuals, product content and digital storytelling created around the Banpro brand.</p>
          <a className="bp-scroll-link" href="#bp-collaboration">
            <span>Scroll to explore</span><ArrowDownRight aria-hidden="true" size={17} />
          </a>
        </div>

        <figure className="bp-hero-art">
          {media.image ? (
            <img
              className="bp-hero-image"
              src={media.image}
              alt={media.alt}
              width="900"
              height="1125"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => ScrollTrigger.refresh()}
            />
          ) : (
            <div className="bp-media-pending" role="img" aria-label="Banpro hero campaign image pending">Campaign image pending</div>
          )}
          <figcaption><span>01 — BANPRO × SOCIAL365</span><span>CAMPAIGN / 2026</span></figcaption>
        </figure>
      </div>

      <div className="bp-hero-bottom bp-wrap" aria-hidden="true">
        <span>CAMPAIGN JOURNAL</span><span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
