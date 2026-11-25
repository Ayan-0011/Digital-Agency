import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function BanproIntro() {
  const root = useRef(null);
  const media = banproData.collaboration;

  useReveal(root, () => {
    gsap.from('.bp-intro-image', {
      clipPath: 'inset(0 0 100% 0)',
      y: 28,
      duration: 1.15,
      ease: 'power4.out',
      scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
    });
    gsap.from('.bp-intro-copy > *', {
      y: 32,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.bp-intro-copy', start: 'top 82%', once: true },
    });
  }, []);

  return (
    <section className="bp-intro bp-section" id="bp-collaboration" ref={root} aria-labelledby="bp-intro-title">
      <div className="bp-section-head bp-wrap">
        <p className="bp-eyebrow">( The collaboration )</p>
        <h2 className="bp-section-title" id="bp-intro-title">More than a brand.<br /><em>A creative collaboration.</em></h2>
      </div>

      <div className="bp-intro-grid bp-wrap">
        <figure className="bp-intro-image">
          {media.image ? (
            <img
              src={media.image}
              alt={media.alt}
              width="900"
              height="825"
              loading="lazy"
              decoding="async"
              onLoad={() => ScrollTrigger.refresh()}
            />
          ) : (
            <div className="bp-media-pending" role="img" aria-label="Collaboration image pending">Collaboration image pending</div>
          )}
          <figcaption>{media.caption}</figcaption>
        </figure>

        <div className="bp-intro-copy">
          <p className="bp-intro-lead">A shared space for product stories, campaign ideas and digital expression.</p>
          <p className="bp-body-copy">This showcase brings together the Banpro campaign artwork and video supplied for the collaboration — from product-focused visuals to social content. Each piece is presented as part of the creative work, without turning the story into a list of claims or results.</p>
          <dl className="bp-project-facts">
            <div><dt>COLLABORATION</dt><dd>BANPRO × SOCIAL365</dd></div>
            <div><dt>PROJECT YEAR</dt><dd>2026</dd></div>
            <div><dt>FEATURED CONTENT</dt><dd>Campaigns / Product visuals / Video</dd></div>
          </dl>
          <a className="bp-text-link" href="#bp-product-campaign">Explore the work <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
