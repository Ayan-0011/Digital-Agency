import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig.js';

const perspectives = [
  {
    num: '01',
    title: 'Strategy first',
    desc: 'Great content starts with a clear idea of who you are talking to and why. We plan before we create.',
  },
  {
    num: '02',
    title: 'Creativity that connects',
    desc: 'We tell stories that make people feel something, so your brand becomes an experience, not just another post.',
  },
  {
    num: '03',
    title: 'Impact that builds',
    desc: 'Every post, reel and campaign should move your business forward and strengthen your presence over time.',
  },
];

export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-word', {
        yPercent: 110,
        rotate: 2,
        stagger: 0.13,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });

      gsap.to('.manifesto-orb', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      gsap.from('.manifesto-insight', {
        autoAlpha: 0,
        y: 35,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.manifesto-insights-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto-section" id="manifesto" ref={ref} aria-label="social365 philosophy">
      <div className="manifesto-top">
        <span className="eyebrow">( Our Philosophy )</span>
        <span>STRATEGY. CREATIVITY. IMPACT.</span>
      </div>

      <div className="manifesto-copy">
        <span className="manifesto-word">THINK.</span>
        <span className="manifesto-word">CREATE.</span>
        <span className="manifesto-word manifesto-outline">MAKE <i>IMPACT.</i></span>
      </div>

      <div className="manifesto-orb" aria-hidden="true">
        <div />
        <span>MAKE<br />IT MATTER</span>
      </div>

      <p className="manifesto-note">
        Your audience sees hundreds of brands a day.<br />
        We help yours turn into an experience they remember.
      </p>

      <div className="manifesto-insights-grid">
        {perspectives.map((p, i) => (
          <article className="manifesto-insight" key={i}>
            <span className="manifesto-insight-num">{p.num}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
