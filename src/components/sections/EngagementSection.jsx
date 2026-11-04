import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';

const tiers = [
  {
    kicker: 'START SMALL',
    name: 'Single Project',
    headline: 'One focused piece of work with a clear outcome.',
    deliverables: [
      'A set of reels, a product shoot or a campaign creative',
      'Clear direction from the first conversation',
      'Content styled around your brand',
      'A good way to experience how we work',
    ],
    cta: 'DISCUSS A PROJECT',
    featured: false,
  },
  {
    kicker: 'ALWAYS ON',
    name: 'Ongoing Content',
    headline: 'Steady social media management and content for your brand.',
    deliverables: [
      'Social media management & content',
      'Content strategy behind every post',
      'Reels, creatives and shoots as your brand needs them',
      'A consistent look, voice and posting rhythm',
      'Open conversation about what to do next',
    ],
    cta: 'START WITH CONTENT',
    featured: true,
  },
  {
    kicker: 'FULL PICTURE',
    name: 'Brand Build',
    headline: 'Strategy, content, campaigns and web working as one.',
    deliverables: [
      'Content strategy and brand voice',
      'Campaign creatives and influencer campaigns',
      'Website development',
      'Everything connected into a single story',
    ],
    cta: 'BUILD TOGETHER',
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
    <section className="engage-sec" id="engagement" ref={root} aria-label="Ways to work with social365">
      <div className="engage-head">
        <span className="eyebrow engage-eyebrow">( Ways To Work Together )</span>
        <h2 className="engage-title">
          <span className="engage-line"><span>Start where it</span></span>
          <span className="engage-line"><span>makes <em>sense.</em></span></span>
        </h2>
        <p className="engage-intro">
          Pick one service or combine several. Every collaboration is shaped around your brand, your audience and your goals.
        </p>
      </div>

      <div className="engage-grid">
        {tiers.map((t, i) => (
          <article className={`engage-card ${t.featured ? 'engage-featured' : ''}`} key={i}>
            {t.featured && <span className="engage-badge">MOST POPULAR PATH</span>}
            <div className="engage-card-top">
              <span className="engage-kicker">{t.kicker}</span>
              <h3 className="engage-name">{t.name}</h3>
              <p className="engage-headline">{t.headline}</p>
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
          Not sure which path fits? Tell us about your brand and we will suggest the right mix.{' '}
          <Link to="/contact" className="engage-inline-link">Let’s talk ↘</Link>
        </p>
      </div>
    </section>
  );
}
