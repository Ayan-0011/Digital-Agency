import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';
import { services } from '../../data/services.js';

export default function WhatWeDo() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 900px) and (prefers-reduced-motion: no-preference)',
      },
      context => {
        const { desktop } = context.conditions;
        const el = root.current;
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        /* ---------- rows + intro: same on every breakpoint ---------- */
        if (!desktop) {
          gsap.from('.wwd-eyebrow, .wwd-intro', {
            autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: once('.wwd-head'),
          });
        }
        gsap.utils.toArray('.wwd-row').forEach((row, i) => {
          gsap.from(row, { autoAlpha: 0, y: 42, duration: 0.9, delay: (i % 2) * 0.05, ease: 'power3.out', scrollTrigger: once(row) });
          gsap.from(row.querySelector('.wwd-rule'), { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(row) });
        });

        if (!desktop) {
          // Mobile: no pinning, keep the original line reveal.
          gsap.from('.wwd-line > span', { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out', scrollTrigger: once('.wwd-head') });
          return;
        }

        /* ---------- desktop: circular reveal over the pinned Achievements section ---------- */
        const ease = gsap.parseEase('power2.inOut');
        // Full-screen circle: a fixed paper-coloured curtain grows from the viewport bottom-centre.
        //    The section itself stays unclipped (transparent) until the circle has covered the screen.
        const curtain = el.querySelector('.wwd-curtain');
        const head = el.querySelector('.wwd-head');
        const reset = () => {
          curtain.style.visibility = 'hidden';
          head.style.transform = '';
          head.style.clipPath = '';
        };
        const apply = p => {
          if (p <= 0) { reset(); el.style.background = 'transparent'; return; }
          if (p >= 1) { reset(); el.style.background = ''; return; }
          const vh = window.innerHeight;
          const r = (ease(p) * Math.hypot(window.innerWidth / 2, vh) * 1.05).toFixed(1);
          const top = el.getBoundingClientRect().top;
          el.style.background = 'transparent';
          curtain.style.visibility = 'visible';
          curtain.style.clipPath = `circle(${r}px at 50% 100%)`;
          // head stays where it will finally sit (screen centre) and is revealed by the same circle
          head.style.transform = `translateY(${-top}px)`;
          head.style.clipPath = `circle(${r}px at 50% ${vh}px)`;
        };
        apply(0);
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top top',
            invalidateOnRefresh: true,
            onUpdate: self => apply(self.progress),
            onRefresh: self => apply(self.progress),
            onLeave: () => apply(1),
            onLeaveBack: () => apply(0),
          },
        });

        return () => { el.style.background = ''; curtain.style.cssText = ''; head.style.cssText = ''; };
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="wwd" id="what-we-do" ref={root}>
      <div className="wwd-curtain" aria-hidden="true" />
      <div className="wwd-head">
        {/* <span className="eyebrow wwd-eyebrow">( What we do )</span> */}
        <h2 className="wwd-title" aria-label="What we do.">
          <span className="wwd-line"><span>What we</span></span>
          <span className="wwd-line"><span><em>do.</em></span></span>
        </h2>
        <p className="wwd-intro">Seven services, one creative agency. Start with the one your brand needs most, or let us bring them together into a single story.</p>
      </div>

      <ul className="wwd-list">
        {services.map(s => (
          <li key={s.n}>
            <Link to="/services" className="wwd-row" aria-label={`${s.title} — view services`}>
              <span className="wwd-rule" aria-hidden="true" />
              <span className="wwd-no">{s.n}</span>
              <span className="wwd-name">{s.title}</span>
              <span className="wwd-copy">
                <span className="wwd-desc">{s.desc}</span>
                <span className="wwd-tags">{s.items.slice(0, 3).join(' · ')}</span>
              </span>
              <span className="wwd-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="wwd-foot">
        <span>{String(services.length).padStart(2, '0')} SERVICES / ONE AGENCY</span>
        <Link className="text-link" to="/services">ALL SERVICES <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  );
}