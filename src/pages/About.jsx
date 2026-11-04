import PageHero from '../components/ui/PageHero.jsx';
import Marquee from '../components/ui/Marquee.jsx';
import WhoWeAre from '../components/sections/WhoWeAre.jsx';
import Expertise from '../components/sections/Expertise.jsx';
import Philosophy from '../components/sections/Philosophy.jsx';
import ProcessTimeline from '../components/sections/ProcessTimeline.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';
import PageCta from '../components/sections/PageCta.jsx';
import { aboutProcess, whyUs } from '../data/studio.js';
import { brand } from '../config/brand.js';

export default function About() {
  return <>
    <PageHero
      className="pg-hero--about"
      eyebrow="( About social365 )"
      meta={brand.positioning.toUpperCase()}
      lines={['Creative with', <>a <em>strategy.</em></>]}
      intro="social365 is a digital marketing and creative agency. We help brands build a stronger digital presence through strategy, storytelling and impactful communication."
    >
      <figure className="ab-figure">
        <img src="/images/img.jpg" alt="" width="2400" height="1500" loading="eager" decoding="async" style={{"objectFit":"cover"}}/>
        <svg className="ab-badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="ab-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text><textPath href="#ab-circle" textLength="284" lengthAdjust="spacing">STRATEGY ✳ CREATIVITY ✳ IMPACT ✳ SOCIAL365 ✳</textPath></text>
        </svg>
      </figure>
    </PageHero>

    <Marquee>TURNING BRANDS INTO EXPERIENCES</Marquee>
    <WhoWeAre />
    <Expertise />
    <Philosophy />

    <ProcessTimeline
      variant="vertical"
      tone="ink"
      id="process"
      eyebrow="( Our Process )"
      lines={['Five steps from', <>hello to <em>growth.</em></>]}
      intro="A clear path from first conversation to ongoing growth, with something concrete to look at along the way."
      steps={aboutProcess}
    />

    <WhyUs
      variant="list"
      tone="paper"
      id="why-us"
      eyebrow="( Why Choose Us )"
      lines={['Partnership,', <>not just <em>projects.</em></>]}
      intro="What working with social365 means for your brand."
      items={whyUs}
    />

    <PageCta
      eyebrow="( Next )"
      lines={["Let's build your", <>brand <em>experience.</em></>]}
      sub="Big brief, small question, or just an idea. Start the conversation."
    />
  </>;
}
