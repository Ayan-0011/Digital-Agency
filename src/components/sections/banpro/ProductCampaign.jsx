import { useRef } from 'react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function ProductCampaign() {
  const root = useRef(null);

  useReveal(root, () => {
    const cards = gsap.utils.toArray('.bp-product-card');
    if (!cards.length) return;
    gsap.set(cards, { y: 38, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: true,
      }),
    });
  }, []);

  return (
    <section className="bp-product bp-section" id="bp-product-campaign" ref={root} aria-labelledby="bp-product-title">
      <div className="bp-section-head bp-wrap bp-section-head--split">
        <div>
          <p className="bp-eyebrow">( Product campaign )</p>
          <h2 className="bp-section-title" id="bp-product-title">Every product<br /><em>has a story.</em></h2>
        </div>
        <p className="bp-section-note">A selection of product campaign visuals from the supplied Banpro artwork.</p>
      </div>

      <div className="bp-product-grid bp-wrap">
        {banproData.products.map((item, index) => (
          <figure className={`bp-product-card bp-product-card--${index + 1}`} key={item.id}>
            <div className="bp-product-frame" style={{ aspectRatio: item.aspectRatio }}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              ) : (
                <div className="bp-media-pending" role="img" aria-label={`${item.title} image pending`}>Product campaign image pending</div>
              )}
            </div>
            <figcaption><span>{item.title}</span><small>{item.category}</small></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
