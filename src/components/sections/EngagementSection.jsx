import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';



const toNum = s => Number(String(s).replace(/,/g, ''));
const savePercent = (orig, now) => Math.round(((toNum(orig) - toNum(now)) / toNum(orig)) * 100);


const tiers = [
  {
    number: '01',
    kicker: 'START SMALL',
    name: 'Starter Plan',
    headline: 'The essentials to get your brand showing up consistently.',
    deliverables: [
      '5 Reels',
      '5 Social Media Posts',
      '1 Carousel Post',
      '1 Story',
      'Festival Special Post',
    ],
    price: '12,000',
    originalPrice: '15,000',
    cta: 'CHOOSE STARTER',
    featured: false,
  },
  {
    number: '02',
    kicker: 'MOST BALANCED',
    name: 'Growth Plan',
    headline: 'More content, more variety and a stronger presence.',
    deliverables: [
      '7 Reels',
      '7 Social Media Posts',
      '3 Carousel Posts',
      '3 Stories',
      'Festival Special Posts',
    ],
    price: '16,000',
    originalPrice: '20,000',
    cta: 'CHOOSE GROWTH',
    featured: true,
  },
  {
    number: '03',
    kicker: 'FULL THROTTLE',
    name: 'Premium Plan',
    headline: 'Our fullest content output for brands ready to lead.',
    deliverables: [
      '10 Reels',
      '10 Social Media Posts',
      '5 Carousel Posts',
      '5 Stories',
      'Festival Special Posts',
    ],
    price: '30,000',
    originalPrice: '36,000',
    cta: 'CHOOSE PREMIUM',
    featured: false,
  },
];

export default function EngagementSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        gsap.from('.engage-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.engage-head'),
        });

        gsap.from('.engage-eyebrow, .engage-intro', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: once('.engage-head'),
        });

        gsap.utils.toArray('.engage-card').forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 45,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: once(card),
          });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="engage-sec" id="engagement" ref={root} aria-label="Social media creative plans">
      <div className="engage-head">
        <span className="eyebrow engage-eyebrow">( Social Media Creative Plans )</span>
        <h2 className="engage-title">
          <span className="engage-line"><span>Start where it</span></span>
          <span className="engage-line"><span>makes <em>sense.</em></span></span>
        </h2>
        <p className="engage-intro">
          Creative content designed to build your brand’s identity and strengthen its social media presence.
        </p>
      </div>

      <div className="engage-grid">
        {tiers.map((t, i) => (
          <article className={`engage-card ${t.featured ? 'engage-featured' : ''}`} key={i}>
            {t.featured && <span className="engage-badge">MOST POPULAR</span>}

            <div className="engage-card-top">
              <span className="engage-number">{t.number}</span>
              <span className="engage-kicker">{t.kicker}</span>
              <h3 className="engage-name">{t.name}</h3>
              <p className="engage-headline">{t.headline}</p>
            </div>

            <div className="engage-divider" />

            <div className="engage-price">
              <div className="engage-price-top">
                <span className="engage-price-label">INVESTMENT</span>
                <span className="engage-save">SAVE {savePercent(t.originalPrice, t.price)}%</span>
              </div>

              <div className="engage-original">
                <span className="engage-original-text">₹{t.originalPrice}/-</span>
              </div>

              <div className="engage-price-row">
                <span className="engage-currency">₹</span>
                <span className="engage-amount">{t.price}</span>
                <span className="engage-suffix">/-</span>
              </div>
            </div>

            <div className="engage-divider" />

            <ul className="engage-list">
              {t.deliverables.map((item, idx) => (
                <li key={idx}>
                  <Check size={16} className="engage-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="engage-card-action">
              <Link to="/contact" className={`engage-btn ${t.featured ? 'engage-btn-featured' : ''}`}>
                <span>{t.cta}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="engage-note">
        <p>
          Need something custom? Tell us about your brand and we will suggest the right mix.{' '}
          <Link to="/contact" className="engage-inline-link">Let’s talk ↘</Link>
        </p>
      </div>
    </section>
  );
}