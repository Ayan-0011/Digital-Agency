
import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsapConfig.js';

const metrics = [
  {
    value: 7,
    label: 'Core Services',
    desc: 'Social media, content, campaigns, branding and digital experiences under one roof.',
  },
  {
    value: 3,
    label: 'Brand Pillars',
    desc: 'Strategy, creativity and impact. The foundation behind every project.',
  },
  {
    value: 365,
    label: 'Days Of Presence',
    desc: 'Building consistent brand experiences that keep your business moving forward.',
  },
  {
    value: 1,
    label: 'Clear Direction',
    desc: 'One unified story connecting every interaction with your audience.',
  },
];

export default function AchievementsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const pinMm = gsap.matchMedia();

    // Keep the pin lifecycle with its React-owned section so it is unpinned
    // before React removes the section during route navigation.
    pinMm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'bottom bottom',
        end: () => '+=' + window.innerHeight,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = (trigger) => ({
          trigger,
          start: 'top 85%',
          once: true,
        });

        gsap.from('.achieve-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.achieve-head'),
        });

        gsap.from('.achieve-eyebrow, .achieve-intro', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: once('.achieve-head'),
        });

        gsap.from('.achieve-image', {
          clipPath: 'inset(100% 0 0 0)',
          scale: 1.08,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: once('.achieve-image'),
        });

        gsap.utils.toArray('.achieve-card').forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 35,
            duration: 0.85,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: once(card),
          });

          const number = card.querySelector('.achieve-num');
          const target = Number(number.dataset.value);
          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            snap: { value: 1 },
            scrollTrigger: once(card),
            onUpdate: () => {
              number.textContent = Math.round(counter.value)
                .toString()
                .padStart(target === 365 ? 3 : 2, '0');
            },
          });
        });
      }, root);

      return () => ctx.revert();
    });

    return () => {
      pinMm.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      className="achieve"
      id="achievements"
      ref={root}
      aria-label="What social365 stands for"
    >
      <div className="achieve-head">
        <span className="eyebrow achieve-eyebrow">
          ( What We Stand For )
        </span>

        <div className="achieve-heading-wrap">
          <h2 className="achieve-title">
            <span className="achieve-line">
              <span>More than</span>
            </span>
            <span className="achieve-line">
              <span>just <em>creative.</em></span>
            </span>
            <span className="achieve-line">
              <span>We create impact.</span>
            </span>
          </h2>

          <p className="achieve-intro">
            We bring strategy, creativity and consistency together
            to build brands that people notice, remember and trust.
          </p>
        </div>

      </div>

      <div className="achieve-grid">
        {metrics.map((m, i) => (
          <article className="achieve-card" key={m.label}>
            <div className="achieve-card-top">
              <span
                className="achieve-num"
                data-value={m.value}
              >
                {String(m.value).padStart(m.value === 365 ? 3 : 2, '0')}
              </span>
              <span className="achieve-icon">✳</span>
            </div>

            <div>
              <h3 className="achieve-label">{m.label}</h3>
              <p className="achieve-desc">{m.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="achieve-bottom">
        <span>STRATEGY × CREATIVITY × IMPACT</span>
        <span>BUILT TO MAKE A DIFFERENCE ↗</span>
      </div>
    </section>
  );
}
