import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';
import { gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function BanproClosing() {
  const root = useRef(null);

  useReveal(root, () => {
    gsap.from('.bp-services-head, .bp-service-tag, .bp-closing-copy > *', {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
    });
  }, []);

  return (
    <section className="bp-closing" ref={root} aria-labelledby="bp-closing-title">
      <div className="bp-services bp-wrap">
        <div className="bp-services-head">
          <p className="bp-eyebrow">( Collaboration services )</p>
          <h2 className="bp-service-title">Creative work,<br /><em>thoughtfully executed.</em></h2>
        </div>
        <ul className="bp-service-list" aria-label="Creative work featured in this collaboration">
          {banproData.services.map(service => <li className="bp-service-tag" key={service}>{service}</li>)}
        </ul>
      </div>

      <div className="bp-closing-band">
        <div className="bp-closing-copy bp-wrap">
          <p className="bp-eyebrow">( Your next collaboration )</p>
          <h2 id="bp-closing-title">Have a brand<br /><em>worth showcasing?</em></h2>
          <p>Let’s create something meaningful together.</p>
          <div className="bp-closing-actions">
            <Link className="bp-start-link" to="/contact">Start a project <ArrowDownRight size={18} aria-hidden="true" /></Link>
            <Link className="bp-back-work" to="/work"><ArrowLeft size={16} aria-hidden="true" /> Back to work</Link>
          </div>
        </div>
        <span className="bp-closing-mark" aria-hidden="true">S365 <i>×</i> BP</span>
      </div>
    </section>
  );
}
