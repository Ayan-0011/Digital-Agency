import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';
import { gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';

const editorialBlocks = [
  { index: '01', title: 'Visual Storytelling', copy: 'Presenting Banpro products through clear, engaging campaign visuals.' },
  { index: '02', title: 'Campaign Direction', copy: 'Shaping a consistent visual direction across campaign and product work.' },
  { index: '03', title: 'Product Communication', copy: 'Giving styling tools a distinct place within everyday product stories.' },
  { index: '04', title: 'Digital Content', copy: 'Creating social-first visuals and video content for the collaboration.' },
];

export default function BanproClosing() {
  const root = useRef(null);

  useReveal(root, () => {
    gsap.from('.bp-services-head, .bp-editorial-block, .bp-closing-copy > *', {
      y: 24,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
    });
  }, []);

  return (
    <section className="bp-closing" ref={root} aria-labelledby="bp-closing-title">
      <div className="bp-services bp-wrap">
        <div className="bp-services-head">
          <p className="bp-eyebrow">( The collaboration )</p>
          <h2 className="bp-service-title">From product<br /><em>to perception.</em></h2>
          <p className="bp-services-description">Every creative decision contributes to how a brand is experienced. From visual direction to digital storytelling, we focus on creating content that makes products more engaging.</p>
        </div>

        <div className="bp-editorial-list">
          {editorialBlocks.map(block => (
            <article className="bp-editorial-block" key={block.index}>
              <span className="bp-editorial-index">{block.index}</span>
              <div>
                <h3>{block.title}</h3>
                <p>{block.copy}</p>
              </div>
              <ArrowDownRight size={18} aria-hidden="true" />
            </article>
          ))}
          <p className="bp-editorial-conclusion">Creative thinking. Consistent visuals. Stronger brand presence.</p>
        </div>
      </div>

      <div className="bp-closing-band">
        <div className="bp-closing-copy bp-wrap">
          <p className="bp-eyebrow">( Your next collaboration )</p>
          <h2 id="bp-closing-title">Every brand has a story.<br /><em>Let’s make yours unforgettable.</em></h2>
          <p>Great collaborations begin with a creative idea. Let’s build something meaningful together.</p>
          <div className="bp-closing-actions">
            <Link className="bp-start-link" to="/contact">Start a Project <ArrowDownRight size={18} aria-hidden="true" /></Link>
            <Link className="bp-back-work" to="/work"><ArrowLeft size={16} aria-hidden="true" /> Explore More Work</Link>
          </div>
        </div>
        <p className="bp-closing-signature">BANPRO × SOCIAL365</p>
        <span className="bp-closing-mark" aria-hidden="true">S365 <i>×</i> BP</span>
      </div>
    </section>
  );
}
