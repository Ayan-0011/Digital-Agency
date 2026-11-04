import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';

const benefits = [
  {
    num: '01',
    icon: Sparkles,
    title: 'Strategy First',
    subtitle: 'A plan behind every post.',
    desc: 'We start with your brand, your audience and your goals, so every piece of content has a clear purpose.',
  },
  {
    num: '02',
    icon: Layers,
    title: 'One Connected Story',
    subtitle: 'Social, video, shoots and web together.',
    desc: 'Seven services in one place keep your brand looking and sounding consistent wherever people meet it.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Creative With Purpose',
    subtitle: 'Bold ideas that do a job.',
    desc: 'Good-looking work is the starting point. We make sure it also moves your business forward.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Built For Growth',
    subtitle: 'Presence that keeps building.',
    desc: 'Consistent, thoughtful content strengthens your digital presence and creates more opportunities.',
  },
];

export default function BenefitsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        gsap.from('.benefit-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.benefit-head'),
        });

        gsap.from('.benefit-eyebrow, .benefit-intro', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: once('.benefit-head'),
        });

        gsap.utils.toArray('.benefit-card').forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 45,
            duration: 0.9,
            delay: (i % 2) * 0.1,
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
    <section className="benefits" id="benefits" ref={root} aria-label="Why choose social365">
      <div className="benefit-head">
        <span className="eyebrow benefit-eyebrow">( Why Choose Us )</span>
        <h2 className="benefit-title">
          <span className="benefit-line"><span>Partnership,</span></span>
          <span className="benefit-line"><span>not just <em>projects.</em></span></span>
        </h2>
        <p className="benefit-intro">
          A creative team for strategy, content and campaigns, working around your brand and your goals.
        </p>
      </div>

      <div className="benefit-grid">
        {benefits.map((b, i) => {
          const IconComponent = b.icon;
          return (
            <article className="benefit-card" key={i}>
              <div className="benefit-card-top">
                <span className="benefit-num">{b.num}</span>
                <span className="benefit-badge"><IconComponent size={18} /></span>
              </div>
              <h3 className="benefit-card-title">{b.title}</h3>
              <p className="benefit-card-sub">{b.subtitle}</p>
              <p className="benefit-card-desc">{b.desc}</p>
              <div className="benefit-card-foot">
                <span className="benefit-indicator" />
                <span className="benefit-tag">SOCIAL365 WAY</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="benefit-bottom">
        <div className="benefit-seal">
          <span>STRATEGY. CREATIVITY. IMPACT.</span>
          <b>↗</b>
          <span>SOCIAL365</span>
        </div>
        <div className="benefit-cta-wrap">
          <p>Ready to turn your brand into an experience?</p>
          <Link to="/contact" className="text-link">
            START A CONVERSATION <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
