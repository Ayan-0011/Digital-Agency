import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, Volume2, VolumeX, X } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { getLenis } from '../../../animations/smoothScroll.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function ReelsShowcase() {
  const root = useRef(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const videoRef = useRef(null);
  const trigger = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const activeVideo = banproData.videos.find(video => video.id === activeId);

  useReveal(root, () => {
    const cards = gsap.utils.toArray('.bp-video-card');
    if (!cards.length) return;
    gsap.set(cards, { y: 30, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: true,
      }),
    });
  }, []);

  useEffect(() => {
    if (!activeVideo) return undefined;
    const previousOverflow = document.body.style.overflow;
    const lenis = getLenis();
    const previouslyFocused = trigger.current;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    setIsMuted(true);
    closeButton.current?.focus();

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveId(null);
      } else if (event.key === 'Tab') {
        const focusable = [...(dialog.current?.querySelectorAll('button:not([disabled]), video') ?? [])];
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
      videoRef.current?.pause();
      if (videoRef.current) {
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [activeVideo]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };

  return (
    <section className="bp-reels bp-section" id="bp-reels" ref={root} aria-labelledby="bp-reels-title">
      <div className="bp-section-head bp-wrap bp-section-head--split">
        <div>
          <p className="bp-eyebrow">( Reels & video )</p>
          <h2 className="bp-section-title" id="bp-reels-title">Motion that<br /><em>tells the story.</em></h2>
        </div>
        <p className="bp-section-note">Supplied Banpro video files are available to play on demand. Playback never starts automatically.</p>
      </div>

      <div className="bp-video-grid bp-wrap">
        {banproData.videos.map((video, index) => {
          const content = (
            <>
              <span className="bp-video-poster" style={{ aspectRatio: video.aspectRatio }}>
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.alt} loading="lazy" decoding="async" onLoad={() => ScrollTrigger.refresh()} />
                ) : (
                  <span className="bp-video-poster-fallback" aria-hidden="true"><span>BANPRO <i>×</i> SOCIAL365</span><small>VIDEO / 0{index + 1}</small></span>
                )}
                <span className="bp-video-play" aria-hidden="true"><Play fill="currentColor" size={17} /></span>
              </span>
              <span className="bp-video-card-caption"><span>{video.title}</span><small>{video.instagramUrl ? 'Instagram reel' : 'Video feature'}</small></span>
            </>
          );

          return (
            <article className="bp-video-card" key={video.id}>
              {video.videoUrl ? (
                <button
                  className="bp-video-open"
                  type="button"
                  aria-label={`Play ${video.title}`}
                  onClick={event => {
                    trigger.current = event.currentTarget;
                    setActiveId(video.id);
                  }}
                >{content}</button>
              ) : video.instagramUrl ? (
                <a className="bp-video-open" href={video.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${video.title} on Instagram`}>
                  {content}<span className="bp-instagram-link">Watch on Instagram <ArrowUpRight size={14} /></span>
                </a>
              ) : (
                <div className="bp-video-open bp-video-pending" aria-label={`${video.title} pending`}>{content}<span className="bp-instagram-link">Video pending</span></div>
              )}
            </article>
          );
        })}
      </div>

      {activeVideo && (
        <div className="bp-video-modal" onMouseDown={event => event.target === event.currentTarget && setActiveId(null)}>
          <div className="bp-video-dialog" ref={dialog} role="dialog" aria-modal="true" aria-label={`${activeVideo.title} video player`}>
            <div className="bp-video-modal-head">
              <span>{activeVideo.title} <small>— BANPRO × SOCIAL365</small></span>
              <button className="bp-modal-close" ref={closeButton} type="button" onClick={() => setActiveId(null)} aria-label="Close video"><X /></button>
            </div>
            <div className="bp-video-player-wrap" style={{ aspectRatio: activeVideo.aspectRatio }}>
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnail || undefined}
                controls
                playsInline
                preload="metadata"
                muted={isMuted}
                aria-label={activeVideo.alt}
                onLoadedMetadata={() => ScrollTrigger.refresh()}
              />
            </div>
            <div className="bp-video-modal-foot">
              <p>{activeVideo.caption}</p>
              <button className="bp-mute-button" type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}{isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
