import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { getLenis } from '../../../animations/smoothScroll.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function CreativeGallery() {
  const root = useRef(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const trigger = useRef(null);
  const activeIndexRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All work');
  const [activeIndex, setActiveIndex] = useState(null);
  const categories = ['All work', ...new Set(banproData.gallery.map(item => item.category))];
  const visible = activeCategory === 'All work'
    ? banproData.gallery
    : banproData.gallery.filter(item => item.category === activeCategory);
  const isOpen = activeIndex !== null;

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  useReveal(root, () => {
    const cards = gsap.utils.toArray('.bp-gallery-card');
    if (!cards.length) return;
    gsap.set(cards, { y: 28, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.055,
        ease: 'power3.out',
        overwrite: true,
      }),
    });
  }, [activeCategory]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const lenis = getLenis();
    const previouslyFocused = trigger.current;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    closeButton.current?.focus();

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex(current => (current + 1) % visible.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex(current => (current - 1 + visible.length) % visible.length);
      } else if (event.key === 'Tab') {
        const focusable = [...(dialog.current?.querySelectorAll('button:not([disabled]), a[href]') ?? [])];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [isOpen, visible.length]);

  const activeItem = isOpen ? visible[activeIndex] : null;

  return (
    <section className="bp-gallery bp-section" id="bp-creative-gallery" ref={root} aria-labelledby="bp-gallery-title">
      <div className="bp-section-head bp-wrap bp-section-head--split">
        <div>
          <p className="bp-eyebrow">( Creative campaigns )</p>
          <h2 className="bp-section-title" id="bp-gallery-title">Ideas turned<br /><em>into visuals.</em></h2>
        </div>
        <p className="bp-section-note">Campaign artwork and promotional content, shown as supplied. Select any image to view it in full.</p>
      </div>

      <div className="bp-gallery-tools bp-wrap">
        <div className="bp-gallery-filters" role="group" aria-label="Filter Banpro campaign artwork">
          {categories.map(category => (
            <button
              type="button"
              key={category}
              className={`bp-filter ${activeCategory === category ? 'is-active' : ''}`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="bp-gallery-count">{String(visible.length).padStart(2, '0')} VISUALS</span>
      </div>

      <div className="bp-masonry bp-wrap">
        {visible.map((item, index) => (
          <figure className="bp-gallery-card" key={item.id}>
            {item.image ? (
              <button
                className="bp-gallery-open"
                type="button"
                aria-label={`View ${item.title} full screen`}
                onClick={event => {
                  trigger.current = event.currentTarget;
                  setActiveIndex(index);
                }}
              >
                <span className="bp-gallery-image" style={{ aspectRatio: item.aspectRatio }}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                  <span className="bp-gallery-zoom" aria-hidden="true">View image <ArrowRight size={15} /></span>
                </span>
                <span className="bp-gallery-caption"><span>{item.title}</span><small>{item.category}</small></span>
              </button>
            ) : (
              <div className="bp-gallery-pending" role="img" aria-label={`${item.title} image pending`}>
                <span>Campaign image pending</span><small>{item.title}</small>
              </div>
            )}
          </figure>
        ))}
      </div>

      {isOpen && activeItem && (
        <div className="bp-lightbox" onMouseDown={event => event.target === event.currentTarget && setActiveIndex(null)}>
          <div className="bp-lightbox-dialog" ref={dialog} role="dialog" aria-modal="true" aria-label={`${activeItem.title} image preview`}>
            <div className="bp-lightbox-top"><span>{activeItem.title} <small>— {activeItem.category}</small></span>
              <button className="bp-modal-close" ref={closeButton} type="button" onClick={() => setActiveIndex(null)} aria-label="Close image preview"><X /></button>
            </div>
            <div className="bp-lightbox-stage">
              {activeItem.image && <img src={activeItem.image} alt={activeItem.alt} decoding="async" />}
              <button className="bp-lightbox-nav bp-lightbox-nav--prev" type="button" onClick={() => setActiveIndex(i => (i - 1 + visible.length) % visible.length)} aria-label="Previous image"><ArrowLeft /></button>
              <button className="bp-lightbox-nav bp-lightbox-nav--next" type="button" onClick={() => setActiveIndex(i => (i + 1) % visible.length)} aria-label="Next image"><ArrowRight /></button>
            </div>
            <p className="bp-lightbox-caption">{activeItem.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
