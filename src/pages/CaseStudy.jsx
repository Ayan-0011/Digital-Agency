import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ProjectArtwork } from '../components/ui/ProjectCard.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import CaseDetail from '../components/sections/CaseDetail.jsx';
import NotFound from './NotFound.jsx';
import { projects } from '../data/projects.js';

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex(p => p.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];

  const [first, second] = project.name.split(' / ');
  const accent = second ?? 'Collaboration';

  return <>
    <section className={`case-hero case-${project.style}`}>
      <div className="case-kicker"><span>CASE STUDY / {project.no}</span><span>{project.year} · {project.category}</span></div>
      <h1>{first}<br /><em>{accent}.</em></h1>
      <p>{project.intro}</p>
      <div className="case-art-wrap"><ProjectArtwork project={project} /></div>
      <div className="case-bottom"><span>STRATEGY / CREATIVITY / IMPACT</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
    <div className="cs-surface">
    <section className="case-story">
      <div><span className="eyebrow">THE PROJECT</span><h2>Strategy,<br /><em>creativity, impact.</em></h2></div>
      <div>
        <p>{project.brief}</p>
        <div className="case-facts">
          <span>DISCIPLINES</span><b>{project.type}</b>
          <span>SERVICES</span><b>{project.services.join(' · ')}</b>
          <span>STATUS</span><b>{project.placeholder ? 'Placeholder: details coming soon.' : 'Full project details coming soon.'}</b>
        </div>
      </div>
    </section>
    </div>
    <CaseDetail project={project} next={next} />
    <div className="case-next"><span className="eyebrow">MORE FROM SOCIAL365</span><Link to="/work">BACK TO ALL PROJECTS <ArrowUpRight /></Link></div>
    <div className="cs-surface"><ContactSection /></div>
  </>;
}
