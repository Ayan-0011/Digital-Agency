import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';

const toolCategories = [
  {
    category: 'Social & Content',
    desc: 'A consistent, on-brand presence that keeps your audience engaged.',
    items: ['Social Media Management & Content', 'Content Strategy'],
  },
  {
    category: 'Video & Visuals',
    desc: 'Footage and photography turned into content people stop to watch.',
    items: ['Reels Editing', 'Product / In-store Shoot'],
  },
  {
    category: 'Campaigns & Reach',
    desc: 'Big ideas and the right voices, working together for a launch or an offer.',
    items: ['Campaign Creatives', 'Influencer Campaigns'],
  },
  {
    category: 'Your Digital Home',
    desc: 'A clean, responsive website where social attention turns into enquiries.',
    items: ['Website Development'],
  },
];

export default function ToolsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        gsap.from('.tools-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.tools-head'),
        });

        gsap.from('.tools-eyebrow, .tools-intro', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: once('.tools-head'),
        });

        gsap.utils.toArray('.tools-cat').forEach((col, i) => {
          gsap.from(col, {
            autoAlpha: 0,
            y: 40,
            duration: 0.85,
            delay: (i % 2) * 0.08,
            ease: 'power3.out',
            scrollTrigger: once(col),
          });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="tools-sec" id="tools" ref={root} aria-label="How social365 services fit together">
      <div className="tools-head">
        <span className="eyebrow tools-eyebrow">( Our Craft )</span>
        <h2 className="tools-title">
          <span className="tools-line"><span>Everything your brand</span></span>
          <span className="tools-line"><span>needs to <em>stand out.</em></span></span>
        </h2>
        <p className="tools-intro">
          Seven services, grouped around the way brands actually grow: showing up consistently, creating strong visuals, running bigger campaigns and having a place to land online.
        </p>
      </div>

      <div className="tools-grid">
        {toolCategories.map((cat, i) => (
          <article className="tools-cat" key={i}>
            <div className="tools-cat-header">
              <span className="tools-cat-num">0{i + 1}</span>
              <h3>{cat.category}</h3>
            </div>
            <p className="tools-cat-desc">{cat.desc}</p>
            <div className="tools-tag-list">
              {cat.items.map((item, idx) => (
                <span className="tools-tag" key={idx}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="tools-foot">
        <span>STRATEGY. CREATIVITY. IMPACT.</span>
        <a href="#top" className="text-link" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          BACK TO TOP <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
