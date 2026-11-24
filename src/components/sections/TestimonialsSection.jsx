import { useLayoutEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';
import { testimonials } from '../../data/testimonials.js';

const initials = name =>
  name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function Stars({ rating = 5 }) {
  return (
    <div className="tm-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span className="tm-star" key={i} aria-hidden="true">
            <Star size={18} className="tm-star-base" />
            <span className="tm-star-fill" style={{ width: `${fill * 100}%` }}>
              <Star size={18} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function Card({ t }) {
  return (
    <figure className="tm-card">
      <Stars rating={t.rating} />
      <blockquote className="tm-quote">{t.quote}</blockquote>
      <figcaption className="tm-author">
        {t.image ? (
          <img className="tm-avatar" src={t.image} alt="" loading="lazy" />
        ) : (
          <span className="tm-avatar tm-avatar-initials" aria-hidden="true">{initials(t.name)}</span>
        )}
        <span className="tm-author-text">
          <span className="tm-name">{t.name}</span>
          <span className="tm-role">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// One endlessly sliding row. The list is rendered twice and the track moves -50%,
// so the loop is seamless. The second copy is hidden from assistive tech.
function Row({ items, reverse = false, label }) {
  return (
    <div className={`tm-row ${reverse ? 'tm-row-rev' : ''}`} role="group" aria-label={label}>
      <div className="tm-track">
        {[0, 1].map(copy => (
          <div className="tm-set" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((t, i) => <Card t={t} key={`${copy}-${i}`} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        gsap.from('.tm-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.tm-head'),
        });

        gsap.from('.tm-eyebrow', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: once('.tm-head'),
        });

        gsap.from('.tm-row', {
          autoAlpha: 0,
          y: 50,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: once('.tm-rows'),
        });

        // Gentle opposite drift while scrolling, on the row wrapper so it never
        // fights the CSS slide on the track inside it.
        gsap.utils.toArray('.tm-row').forEach((row, i) => {
          gsap.fromTo(
            row,
            { x: i % 2 ? 40 : -40 },
            {
              x: i % 2 ? -40 : 40,
              ease: 'none',
              scrollTrigger: { trigger: '.tm-rows', start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          );
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  if (!testimonials.length) return null;

  const half = Math.ceil(testimonials.length / 2);
  const top = testimonials.slice(0, half);
  const bottom = testimonials.slice(half).length ? testimonials.slice(half) : top;

  return (
    <section className="tm-sec" id="testimonials" ref={root} aria-label="Client testimonials">
      <div className="tm-head">
        <span className="eyebrow tm-eyebrow">( Testimonials )</span>
        <h2 className="tm-title">
          <span className="tm-line"><span>We love what we do, and</span></span>
          <span className="tm-line"><span><em>they love the results.</em></span></span>
        </h2>
      </div>

      <div className="tm-rows">
        <Row items={top} label="Client testimonials, first row" />
        <Row items={bottom} reverse label="Client testimonials, second row" />
      </div>
    </section>
  );
}
