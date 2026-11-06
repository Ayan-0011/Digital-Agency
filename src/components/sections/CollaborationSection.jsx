import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsapConfig.js';
import collaborationImage from '../../assets/collab/collabe.jpg';
import banbproLogo from '../../assets/collab/banpro.jpg';
import social365Logo from '../../assets/collab/social.jpg';

export default function CollaborationSection() {
    const root = useRef(null);
    const description = useRef(null);
    const note = useRef(null);
    const partners = useRef(null);
    const image = useRef(null);

    useLayoutEffect(() => {
        const media = gsap.matchMedia(root.current);

        media.add({
            desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
            mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
        }, ({ conditions }) => {
            const { desktop } = conditions;
            const text = [description.current, note.current, partners.current];
            const textOffset = desktop ? 60 : 38;
            const once = trigger => ({ trigger, start: 'top 85%', once: true });

            // ---- Head (same as stories head) ----
            gsap.from('.stories-line > span', {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.12,
                ease: 'power4.out',
                scrollTrigger: once('.stories-head'),
            });

            gsap.from('.stories-eyebrow, .stories-intro', {
                autoAlpha: 0,
                y: 24,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: once('.stories-head'),
            });

            // ---- Image zoom-out ----
            gsap.fromTo(image.current,
                { scale: desktop ? 1.7 : 1.3, opacity: 0.6 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top 85%',
                        end: 'center 50%',
                        scrub: 1,
                    },
                });

            // ---- Copy rise from bottom ----
            gsap.fromTo(text,
                { y: textOffset, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.15,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.collab-content',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
        });

        return () => media.revert();
    }, []);

    return (
        <section className="collab" ref={root} aria-labelledby="collab-title">
            <div className="stories-head">
                <span className="eyebrow stories-eyebrow">( Collaborations )</span>
                <h2 className="stories-title" id="collab-title">
                    <span className="stories-line"><span>Brands we create</span></span>
                    <span className="stories-line"><span>with, <em>together.</em></span></span>
                </h2>
                <p className="stories-intro">
                    A look at the collaborations we are proud to share. More projects will be added here as they go live.
                </p>
            </div>

            <div className="collab-content">
                <div className="collab-image-frame">
                    <img
                        ref={image}
                        className="collab-image"
                        src={collaborationImage}
                        alt="BANBPro x social365 welcome on board partnership"
                        loading="lazy"
                        decoding="async"
                        onLoad={() => ScrollTrigger.refresh()}
                    />
                </div>

                <div className="collab-copy">
                    <p className="collab-description" ref={description}>Proud to partner with BANBPro.</p>
                    <p className="collab-note" ref={note}>
                        Two creative teams, one shared vision. Thank you for trusting us—let’s create something extraordinary together.
                    </p>
                    <div className="collab-partners" ref={partners} aria-label="BANBPro and social365">
                        <img className="collab-logo collab-logo-banbpro" src={banbproLogo} alt="BANBPro" />
                        <span className="collab-partners-x" aria-hidden="true">×</span>
                        <img className="collab-logo collab-logo-social" src={social365Logo} alt="social365" />
                    </div>
                </div>
            </div>
        </section>
    );
}