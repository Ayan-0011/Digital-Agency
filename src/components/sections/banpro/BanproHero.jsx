import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import banproLogo from '../../../assets/banpro/products/banpro.jpg';

export default function BanproHero() {
  const root = useRef(null);

  useReveal(root, () => {
    gsap.from('.bp-hero-logo, .bp-hero-intro', {
      y: 24,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    });
    gsap.from('.bp-hero-title > span, .bp-hero-deck, .bp-hero-meta, .bp-scroll-link', {
      y: 34,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.09,
      ease: 'power3.out',
      delay: 0.22,
    });
  }, []);

  return (
    <section className="bp-hero" ref={root} aria-labelledby="bp-hero-title">
      <div className="bp-hero-top bp-wrap">
        <div className="bp-hero-brand">
          <img className="bp-hero-logo" src={banproLogo} alt="BANPRO official logo" width="220" height="220" fetchPriority="high" />
        </div>
        <p className="bp-hero-intro">
          BANPRO is a product-focused brand brought into the spotlight through creative visual storytelling and digital campaigns.
        </p>
      </div>

      <div className="bp-hero-layout bp-wrap">
        <div className="bp-hero-copy">
          <p className="bp-hero-kicker">Brand collaboration <span>/</span> 2026</p>
          <h1 className="bp-hero-title" id="bp-hero-title">
            <span>BANPRO</span>
            <span className="bp-hero-title-secondary"><i aria-hidden="true">×</i> SOCIAL365</span>
          </h1>
          <p className="bp-hero-deck">A creative collaboration focused on transforming everyday products into engaging visual campaigns.</p>
          <ul className="bp-hero-meta" aria-label="Project information">
            <li>Brand Collaboration</li>
            <li>Creative Campaigns</li>
            <li>Product Advertising</li>
          </ul>
        </div>
      </div>

      <a className="bp-scroll-link bp-wrap" href="#bp-collaboration" aria-label="Scroll to the collaboration section">
        <span>Scroll to explore</span><ArrowDown aria-hidden="true" size={16} />
      </a>

      <div className="bp-hero-bottom bp-wrap" aria-hidden="true">
        <span>Campaign journal</span><span>01 — Collaboration</span>
      </div>
    </section>
  );
}
