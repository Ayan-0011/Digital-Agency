import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';

const faqs = [
  {
    q: 'What services does social365 offer?',
    a: 'Seven services: Social Media Management & Content, Reels Editing, Product / In-store Shoot, Campaign Creatives, Content Strategy, Website Development and Influencer Campaigns.',
  },
  {
    q: 'Can we start with just one service?',
    a: 'Yes. Many brands begin with a single service, such as a set of reels or a product shoot, and add more as their needs grow.',
  },
  {
    q: 'Do you handle strategy as well as creative?',
    a: 'Yes. Strategy comes first. We plan the message, the content and the formats, then create work that supports that plan.',
  },
  {
    q: 'What do you need from us to begin?',
    a: 'A short introduction to your brand and goals, any existing brand assets, and examples of content you like. We will guide the rest.',
  },
  {
    q: 'How do we get started?',
    a: 'Send us a message through the contact form, email us, or reach out on Instagram. We will reply and talk through your brand and what you need.',
  },
  {
    q: 'Where can I see your work?',
    a: 'On our Work page and on Instagram at social365.agency.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const once = trigger => ({ trigger, start: 'top 85%', once: true });

        gsap.from('.faq-line > span', {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: once('.faq-head'),
        });

        gsap.from('.faq-eyebrow, .faq-intro', {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: once('.faq-head'),
        });

        gsap.utils.toArray('.faq-item').forEach((item, i) => {
          gsap.from(item, {
            autoAlpha: 0,
            y: 30,
            duration: 0.8,
            delay: (i % 3) * 0.05,
            ease: 'power3.out',
            scrollTrigger: once(item),
          });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const toggle = index => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-sec" id="faq" ref={root} aria-label="Frequently asked questions about social365">
      <div className="faq-head">
        <span className="eyebrow faq-eyebrow">( Good To Know )</span>
        <h2 className="faq-title">
          <span className="faq-line"><span>Quick and clear</span></span>
          <span className="faq-line"><span>answers to your <em>questions.</em></span></span>
        </h2>
        <p className="faq-intro">
          The basics about our services, how we work and how to get started.
        </p>
      </div>

      <div className="faq-accordion" role="region" aria-label="FAQ items">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`} key={index}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="faq-num">0{index + 1}</span>
                <span className="faq-question-text">{item.q}</span>
                <span className="faq-icon-wrap" aria-hidden="true">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="faq-answer-wrap"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                }}
              >
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="faq-bottom-banner">
        <div>
          <h4>Still have a question?</h4>
          <p>Send us a message and we will help you find the right place to start.</p>
        </div>
        <Link to="/contact" className="faq-call-btn">
          <span>LET'S TALK</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
