import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function StudioSection() {
  return (
    <section className="studio-section" id="studio">
      <div className="studio-left">
        <span className="eyebrow">STRATEGY. CREATIVITY. IMPACT.</span>
        <h2>Turning ideas<br />into meaningful<br /><em>connections.</em></h2>
        <div className="studio-seal"><span>CREATIVE<br />AGENCY</span><b>↗</b><span>DIGITAL<br />MARKETING</span></div>
      </div>
      <div className="studio-right">
        <div className="studio-image"><div className="studio-image-grid" /><div className="studio-image-type">THINK<br />THEN<br /><i>MAKE.</i></div><span className="image-note">A GOOD PLACE TO START / 001</span></div>
        <p>social365 is a creative digital marketing agency. We help brands connect with their audience through strategic marketing, creative storytelling and impactful brand communication.</p>
        <Link className="text-link" to="/about">ABOUT SOCIAL365 <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  );
}
