import { useRef } from 'react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function ProductCampaign() {
  const root = useRef(null);

  useReveal(root, () => {
    gsap.from('.bp-product .bp-section-head > *', {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.bp-product .bp-section-head', start: 'top 82%', once: true },
    });

    const cards = gsap.utils.toArray('.bp-product-card');
    cards.forEach((card, index) => {
      const frame = card.querySelector('.bp-product-frame');
      const image = card.querySelector('img');
      gsap.set(card, { y: 32, autoAlpha: 0 });
      gsap.set(frame, { clipPath: 'inset(0 0 100% 0)' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      });
      tl.to(card, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out' })
        .to(frame, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.out' }, 0.08)
        .from(image || frame, { scale: 1.06, duration: 1.2, ease: 'power3.out' }, 0.08);
      if (index > 0) tl.duration(tl.duration() * 0.95);
    });

    return () => ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && root.current?.contains(trigger.trigger)) trigger.kill();
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
