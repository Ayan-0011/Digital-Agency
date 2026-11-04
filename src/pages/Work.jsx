import PageHero from '../components/ui/PageHero.jsx';
import StatsStrip from '../components/ui/StatsStrip.jsx';
import Marquee from '../components/ui/Marquee.jsx';
import WorkGrid from '../components/sections/WorkGrid.jsx';
import PageCta from '../components/sections/PageCta.jsx';
import { projects, workCategories } from '../data/projects.js';
import { services } from '../data/services.js';

const stats = [
  { value: projects.length, pad: true, label: 'Featured projects' },
  { value: workCategories.length, pad: true, label: 'Categories' },
  { value: services.length, pad: true, label: 'Services' },
];

export default function Work() {
  return <>
    <PageHero
      className="pg-hero--work"
      eyebrow="( Selected Work )"
      meta="SOCIAL365 — SELECTED WORK"
      lines={['Selected', <><em>work.</em></>]}
      intro="Collaborations built on strategy, creativity and impact. New projects are added here as they go live."
    >
      <StatsStrip items={stats} />
    </PageHero>

    <Marquee>TURNING BRANDS INTO EXPERIENCES</Marquee>
    <WorkGrid />

    <PageCta
      eyebrow="( Your Project )"
      lines={['Your project', <>could be <em>next.</em></>]}
      sub="Tell us about your brand. We'll tell you honestly how we could help."
    />
  </>;
}
