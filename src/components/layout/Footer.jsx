import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';
import { brand } from '../../config/brand.js';
import Brand from '../ui/Brand.jsx';

const SOCIAL_NAMES = { WA: 'WhatsApp', X: 'X', IG: 'Instagram', LI: 'LinkedIn' };
const socials = brand.socials.filter(s => /^https?:/.test(s.href));
const WORD = [...'social365'];
const SPLIT = WORD.findIndex(c => /\d/.test(c)); // where "365" starts
const GRAD_COUNT = WORD.length - SPLIT;

export default function Footer() {
  const root = useRef(null);
  const word = useRef(null);

  // fit the giant wordmark to the footer width
  useLayoutEffect(() => {
    const el = word.current;
    const box = el?.parentElement;            // .footer-giant
    if (!el || !box) return;

    const fit = () => {
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);

      el.style.fontSize = '100px';
      const natural = el.getBoundingClientRect().width;
      if (!natural || !avail) return;

      el.style.fontSize = `${Math.floor((100 * avail) / natural) - 2}px`;
    };

    fit();
    document.fonts?.load('800 100px Montserrat').then(fit).catch(() => { });
    document.fonts?.ready.then(fit);

    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    // Ensure all footer content is visible by default
    const els = root.current?.querySelectorAll('.footer-col, .footer-brand, .back-top, .footer-bottom');
    if (els) {
      els.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
    }

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.footer-col, .footer-brand', {
          y: 20,
          opacity: 0.4,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 95%', once: true },
        });
        gsap.from('.fg-char > span', {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.footer-giant', start: 'top 98%', once: true },
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="footer-main">
        <div className="footer-brand">
          <Brand light />
          <p>
            {brand.tagline}<br />
            {brand.philosophy}
          </p>
        </div>

        <nav className="footer-col" aria-label="Footer Navigation">
          <span className="footer-label">Navigate</span>
          <div className="footer-links">
            <Link to="/">Home <ArrowUpRight size={13} /></Link>
            <Link to="/work">Work <ArrowUpRight size={13} /></Link>
            <Link to="/about">About <ArrowUpRight size={13} /></Link>
            <Link to="/services">Services <ArrowUpRight size={13} /></Link>
            <Link to="/contact">Contact <ArrowUpRight size={13} /></Link>
          </div>
        </nav>

        <div className="footer-col footer-contact">
          <span className="footer-label">Say hello</span>
          <div className="footer-links">
            <a href={`mailto:${brand.email}`}>{brand.email} <ArrowUpRight size={13} /></a>
            <span className="footer-plain">{brand.location}</span>
          </div>
        </div>

        <div className="footer-col footer-follow">
          <span className="footer-label">Follow</span>
          <div className="footer-links">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {SOCIAL_NAMES[s.label] || s.label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>

        <a
          href="#top"
          className="back-top"
          onClick={event => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          BACK TO TOP ↑
        </a>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <div className="footer-giant-word" ref={word}>
          {WORD.map((char, i) => {
            const isGrad = i >= SPLIT;
            const isI = char === 'i';
            return (
              <span className="fg-char" key={i}>
                <span
                  className={isGrad ? 'fg-grad' : 'fg-solid'}
                  style={isGrad ? { '--i': i - SPLIT, '--n': GRAD_COUNT } : undefined}
                >
                  {isI ? 'ı' : char}
                  {isI && <i className="fg-dot" />}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {brand.year} {brand.name.toUpperCase()} — {brand.positioning.toUpperCase()}</span>
        <span>{brand.philosophy.toUpperCase()}</span>
        <div>
          <Link to="/privacy-policy">PRIVACY</Link>
          <Link to="/terms">TERMS</Link>
        </div>
      </div>
    </footer>
  );
}
