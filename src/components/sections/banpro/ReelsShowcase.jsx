import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { ScrollTrigger, gsap } from '../../../animations/gsapConfig.js';
import { useReveal } from '../../../animations/useReveal.js';
import { banproData } from '../../../data/banpro.js';

export default function ReelsShowcase() {
  const root = useRef(null);
  const videoRefs = useRef(new Map());
  const [mutedById, setMutedById] = useState(() => Object.fromEntries(banproData.videos.map(video => [video.id, true])));

  useReveal(root, () => {
    const cards = gsap.utils.toArray('.bp-video-card');
    if (!cards.length) return;
    gsap.set(cards, { y: 30, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%', once: true,
      onEnter: batch => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', overwrite: true }),
    });
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    const videos = [...videoRefs.current.values()].filter(Boolean);

    if (reduceMotion || saveData) {
      videos.forEach(video => video.pause());
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      videos.forEach(video => video.pause());
      if (visible[0]?.target) {
        visible[0].target.querySelector('video')?.play().catch(() => {});
      }
    }, { threshold: [0.35, 0.65] });

    videos.forEach(video => {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      observer.observe(video.closest('.bp-video-card'));
    });

    return () => observer.disconnect();
  }, []);

  const toggleMute = (event, videoId) => {
    event.stopPropagation();
    setMutedById(previous => {
      const nextMuted = !previous[videoId];
      const video = videoRefs.current.get(videoId);
      if (video) {
        video.muted = nextMuted;
        if (!nextMuted) video.play().catch(() => {});
      }
      return { ...previous, [videoId]: nextMuted };
    });
  };

  return (
    <section className="bp-reels bp-section" id="bp-reels" ref={root} aria-labelledby="bp-reels-title">
      <div className="bp-section-head bp-wrap bp-section-head--split">
        <div>
          <p className="bp-eyebrow">( Reels & video )</p>
          <h2 className="bp-section-title" id="bp-reels-title">Motion that<br /><em>tells the story.</em></h2>
        </div>
        <p className="bp-section-note">Muted video previews loop automatically while in view. Use the sound control to unmute.</p>
      </div>

      <div className="bp-video-grid bp-wrap">
        {banproData.videos.map((video, index) => {
          const isMuted = mutedById[video.id];
          return (
            <article className="bp-video-card" key={video.id}>
              {video.videoUrl ? (
                <div className="bp-video-open">
                  <span className="bp-video-poster" style={{ aspectRatio: video.aspectRatio }}>
                    <video
                      ref={element => element ? videoRefs.current.set(video.id, element) : videoRefs.current.delete(video.id)}
                      src={video.videoUrl}
                      poster={video.thumbnail || undefined}
                      muted={isMuted}
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      aria-label={video.alt}
                      onLoadedMetadata={() => ScrollTrigger.refresh()}
                    />
                    <button className="bp-video-mute" type="button" onClick={event => toggleMute(event, video.id)} aria-label={isMuted ? `Unmute ${video.title}` : `Mute ${video.title}`}>
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  </span>
                  <span className="bp-video-card-caption"><span>{video.title}</span><small>Video feature</small></span>
                </div>
              ) : video.instagramUrl ? (
                <a className="bp-video-open" href={video.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${video.title} on Instagram`}>
                  <span className="bp-video-poster bp-video-poster-fallback" style={{ aspectRatio: video.aspectRatio }}>
                    <span>BANPRO <i>×</i> SOCIAL365</span><small>INSTAGRAM / 0{index + 1}</small>
                  </span>
                  <span className="bp-instagram-link">Watch on Instagram <ArrowUpRight size={14} /></span>
                </a>
              ) : (
                <div className="bp-video-open bp-video-pending">
                  <span className="bp-video-poster-fallback" style={{ aspectRatio: video.aspectRatio }}><span>BANPRO <i>×</i> SOCIAL365</span><small>VIDEO / 0{index + 1}</small></span>
                  <span className="bp-instagram-link">Video pending</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
