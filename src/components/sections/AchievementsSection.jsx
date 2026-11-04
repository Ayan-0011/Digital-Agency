
import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig.js';

const metrics = [
  {
    value: 7,
    suffix: '',
    decimals: 0,
    pad: true,
    label: 'Core Services',
    desc: 'Social media, reels, shoots, campaigns, content strategy, websites and influencer campaigns, all under one roof.',
  },
  {
    value: 3,
    suffix: '',
    decimals: 0,
    pad: true,
    label: 'Brand Pillars',
    desc: 'Strategy. Creativity. Impact. The three ideas behind every project we take on.',
  },
  {
    value: 365,
    suffix: '',
    decimals: 0,
    pad: false,
    label: 'Days Of Presence',
    desc: 'A brand is not built in one post. We think about consistency across the whole year.',
  },
  {
    value: 1,
    suffix: '',
    decimals: 0,
    pad: true,
    label: 'Story, Told Well',
    desc: 'Every post, reel, shoot and campaign is made to tell one consistent story for your brand.',
  },
];

export default function AchievementsSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({
          trigger,
          start: 'top 85%',
          once: true,
        });

        // Heading animation
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
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: once('.achieve-head'),
        });

        // Cards + count-up animation
        gsap.utils.toArray('.achieve-card').forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 40,
            duration: 0.85,
            delay: (i % 2) * 0.08,
            ease: 'power3.out',
            scrollTrigger: once(card),
          });

          const number = card.querySelector('.achieve-num');
          const target = Number(number.dataset.value);
          const decimals = Number(number.dataset.decimals);
          const suffix = number.dataset.suffix;
          const pad = number.dataset.pad === 'true';

          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            snap: {
              value: decimals === 1 ? 0.1 : 1,
            },
            scrollTrigger: once(card),
            onUpdate: () => {
              let formatted = counter.value.toFixed(decimals);

              if (pad) {
                formatted = formatted.padStart(2, '0');
              }

              number.textContent = formatted + suffix;
            },
          });
        });

      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
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

        <h2 className="achieve-title">
          <span className="achieve-line">
            <span>Behind every</span>
          </span>
          <span className="achieve-line">
            <span>great brand <em>lives</em></span>
          </span>
          <span className="achieve-line">
            <span>a clear story.</span>
          </span>
        </h2>

        <p className="achieve-intro">
          We turn ideas into meaningful connections. Strategy gives the
          direction, creativity gives the voice, and impact is what
          your brand builds over time.
        </p>
      </div>

      <div className="achieve-grid">
        {metrics.map((m, i) => (
          <article className="achieve-card" key={i}>
            <div className="achieve-card-top">
              <span
                className="achieve-num"
                data-value={m.value}
                data-decimals={m.decimals}
                data-suffix={m.suffix}
                data-pad={m.pad}
              >
                0
              </span>

              <span className="achieve-icon" aria-hidden="true">
                ✳
              </span>
            </div>

            <h3 className="achieve-label">{m.label}</h3>
            <p className="achieve-desc">{m.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
