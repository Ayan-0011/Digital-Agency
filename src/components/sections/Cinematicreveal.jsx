import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig.js';
import '../../styles/cinematic-reveal.css';

const CARDS = [
  // pair 1: both rise out of the centre, one drifts to the left, the other to the right
  { src: '/images/p1.avif', alt: 'social365 creative work sample 01', l: 10, w: 22.5, dl: -5,  ml: 4,  mw: 38, mdl: -2, cx: 40, mcx: 36, at: 0.04, dur: 0.40, rt: 10 },
  { src: '/images/p4.avif', alt: 'social365 creative work sample 02', r: 6,  w: 22,   dl: 2,   mr: 4, mw: 38, mdl: 2,  cx: 60, mcx: 64, at: 0.07, dur: 0.40, rt: 40 },
  // pair 2
  { src: '/images/p3.avif', alt: 'social365 creative work sample 03', l: 11, w: 21,   dl: -4,  ml: 6,  mw: 36, mdl: -2, cx: 40, mcx: 36, at: 0.30, dur: 0.40, rt: 55 },
  { src: '/images/p6.avif', alt: 'social365 creative work sample 04', r: 11, w: 21,   dl: 8,   mr: 4, mw: 38, mdl: 3,  cx: 60, mcx: 64, at: 0.33, dur: 0.40, rt: 8  },
  // pair 3
  { src: '/images/p5.avif', alt: 'social365 creative work sample 05', l: 16, w: 23,   dl: -12, ml: 8,  mw: 38, mdl: -4, cx: 40, mcx: 36, at: 0.54, dur: 0.40, rt: 20 },
  { src: '/images/p2.avif', alt: 'social365 creative work sample 06', r: 7,  w: 24,   dl: 4,   mr: 4, mw: 38, mdl: 2,  cx: 60, mcx: 64, at: 0.57, dur: 0.40, rt: 30 },
];

const HEADLINE = ['Creative that', 'connects today', '& builds brands', 'for tomorrow'];

const VIDEO_SRC = '/videos/JvsYQ6i2XehdtVamXDEovL33lw.mp4';

export default function CinematicReveal() {
  const root = useRef(null);
  const stage = useRef(null);
  const video = useRef(null);

  // Keep the video cheap: it only plays while the section is on screen (and never under reduced motion).
  useEffect(() => {
    const el = video.current;
    if (!el) return undefined;
    el.muted = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.pause(); return undefined; }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cine-card');
      // three tiers, read live so a resize / rotation re-evaluates everything (invalidateOnRefresh)
      const isSmall = () => window.innerWidth <= 720;                                   // phones
      const isTablet = () => window.innerWidth > 720 && window.innerWidth <= 1024;      // tablets
      const pick = (desktop, tablet, phone) => (isSmall() ? phone : isTablet() ? tablet : desktop);
      const stageH = () => stage.current.clientHeight;

      // ONE scrubbed timeline for the whole section (0 -> 1). Lenis already drives ScrollTrigger.update.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',          // stage becomes sticky here ...
          end: 'bottom bottom',      // ... and is released when the tall section ends
          scrub: true,
          invalidateOnRefresh: true, // re-reads every function value below on resize
        },
      });

      // 1) the video panel shrinks in width AND height (clip the full-bleed video, so nothing reflows)
      //    values are "% cut from each side / from top+bottom": [desktop, tablet, phone]
      const SIDE_START = () => pick(13, 10, 6);
      const SIDE_END   = () => pick(27.5, 20, 17);
      const TOP_END    = () => pick(12, 12, 14);
      const inset = (tb, side) => `inset(${tb}% ${side}% ${tb}% ${side}% round ${pick(6, 5, 4)}px)`;
      tl.fromTo('.cine-video-wrap',
        { clipPath: () => inset(0, SIDE_START()) },
        { clipPath: () => inset(TOP_END(), SIDE_END()), duration: 0.95, ease: 'power1.inOut' },
        0);

      // 2) cards, in two phases (like the reference):
      //    phase 1 (first ~38% of the card's journey): it peeks up from the bottom near the centre and
      //                SNAPS OUT sideways to its own column while it is still low on the screen
      //    phase 2 (the rest): it goes straight up and out of the top, with only a slight extra drift
      const SPREAD = 0.38; // share of the journey used for the sideways move
      cards.forEach((card, i) => {
        const c = CARDS[i];
        const startX = () => {
          const stageW = stage.current.clientWidth;
          return (stageW * (isSmall() ? c.mcx : c.cx)) / 100 - (card.offsetLeft + card.offsetWidth / 2);
        };
        const endX = () => ((isSmall() ? c.mdl : c.dl) * window.innerWidth) / 100;

        // vertical: one continuous rise from just below the viewport to just above it
        tl.fromTo(card,
          { y: () => stageH(), yPercent: 0 },
          { y: () => -stageH() * 0.04, yPercent: -100, duration: c.dur, ease: 'none' },
          c.at);

        // horizontal phase 1: centre -> own column, eased in and out so it feels like a glide
        tl.fromTo(card,
          { x: startX },
          { x: 0, duration: c.dur * SPREAD, ease: 'power2.inOut' },
          c.at);

        // horizontal phase 2: tiny continued drift while it climbs
        tl.fromTo(card,
          { x: 0 },
          { x: endX, duration: c.dur * (1 - SPREAD), ease: 'none', immediateRender: false },
          c.at + c.dur * SPREAD);
      });

      // make the timeline exactly 1 long so card timings map straight onto scroll progress
      tl.to({}, { duration: 0.0001 }, 0.9999);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cine" ref={root} aria-label="social365 creative work over reel">
      <div className="cine-stage" ref={stage}>
        <div className="cine-video-wrap">
          <video
            ref={video}
            className="cine-video"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="cine-shade" aria-hidden="true" />
        </div>

        <h2 className="cine-title" aria-label="Creative that connects today and builds brands for tomorrow">
          {HEADLINE.map(line => (
            <span className="cine-line" key={line} aria-hidden="true">{line}</span>
          ))}
        </h2>

        <div className="cine-layer">
          {CARDS.map(card => (
            <figure
              className={`cine-card${card.r !== undefined ? ' cine-card--right' : ''}`}
              key={card.src}
              style={{ '--l': `${card.l}%`, '--w': card.w, '--ml': `${card.ml}%`, '--r': `${card.r}%`, '--mr': `${card.mr}%`, '--mw': card.mw, '--rt': `${card.rt}%` }}
            >
              <img src={card.src} alt={card.alt} width="350" height="540" loading="eager" decoding="async" draggable="false" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}