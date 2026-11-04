import { brand } from '../config/brand.js';

// Copy for the About / Services / Contact pages. Edit freely; nothing here is wired to logic.
// Nothing in this file states company history, team size, results or client numbers.

export const studioTimezone = 'Asia/Kolkata'; // used for the live local time on the Contact page

// ---------- ABOUT ----------
export const aboutStatement =
  'social365 is a creative digital marketing agency. We turn ideas into meaningful connections, using *strategy, creativity and impactful communication* to help brands show up with confidence.';

export const aboutPillars = [
  {
    label: 'What we do',
    text: 'Social media management, reels, shoots, campaign creatives, content strategy, websites and influencer campaigns, all built around your brand.',
  },
  {
    label: 'How we work',
    text: 'We start with strategy, then create with intent. Every post, reel and campaign is designed to connect with your audience and support your business.',
  },
  {
    label: 'What we believe',
    text: 'Strategy. Creativity. Impact. A strong digital presence is built on clear thinking, bold ideas and work that actually moves people.',
  },
];

export const expertise = [
  {
    n: '01',
    title: 'Strategy',
    text: 'Positioning, content direction and planning that give your brand a clear voice and a reason behind every post.',
    tags: ['Content strategy', 'Brand voice', 'Content pillars', 'Channel planning'],
  },
  {
    n: '02',
    title: 'Creativity',
    text: 'Storytelling through design, video and photography that makes your brand look and feel like itself.',
    tags: ['Reels editing', 'Product / in-store shoot', 'Campaign creatives', 'Social content'],
  },
  {
    n: '03',
    title: 'Impact',
    text: 'Presence that reaches the right people: consistent social media, creator collaborations and a website to land on.',
    tags: ['Social media management', 'Influencer campaigns', 'Website development'],
  },
];

export const philosophy = [
  {
    n: '01',
    title: 'Start with the brand.',
    text: 'Before we design anything, we understand who you are, who you want to reach and what you want your content to do.',
  },
  {
    n: '02',
    title: 'Make it worth noticing.',
    text: 'Feeds are crowded. We create work with a point of view, so your brand is remembered rather than scrolled past.',
  },
  {
    n: '03',
    title: 'Keep it human.',
    text: 'Good marketing sounds like people, not press releases. We write and design in a natural, confident voice.',
  },
  {
    n: '04',
    title: 'Build for growth.',
    text: 'Every piece of content is a step toward a stronger digital presence and more opportunities for your business.',
  },
];

// vertical timeline on the About page
export const aboutProcess = [
  {
    n: '01',
    title: 'Discovery',
    text: 'We learn about your business, your audience and what you want to achieve online.',
    outputs: ['Intro conversation', 'Goals & audience', 'Brand review'],
  },
  {
    n: '02',
    title: 'Strategy',
    text: 'We shape the direction: messaging, content pillars and the services that fit your goals.',
    outputs: ['Content direction', 'Service plan', 'Priorities'],
  },
  {
    n: '03',
    title: 'Creative',
    text: 'Concepts, designs, shoots and edits that bring the strategy to life in your brand style.',
    outputs: ['Concepts', 'Design & edits', 'Review & feedback'],
  },
  {
    n: '04',
    title: 'Launch',
    text: 'Content goes live across your channels with consistency and care.',
    outputs: ['Publishing', 'Campaign roll-out', 'Community care'],
  },
  {
    n: '05',
    title: 'Grow',
    text: 'We look at what worked, refine the approach and keep building your presence.',
    outputs: ['Review', 'Refinements', 'Next ideas'],
  },
];

export const whyUs = [
  { n: '01', title: 'Strategy before content.', text: 'Every piece we make has a purpose, an audience and a place in a bigger plan.' },
  { n: '02', title: 'Creative that fits you.', text: 'We shape the look and voice around your brand instead of using one template for everyone.' },
  { n: '03', title: 'One team, many formats.', text: 'Social, video, shoots, campaigns and web in one place, so your brand stays consistent everywhere.' },
  { n: '04', title: 'Clear communication.', text: 'You know what we are working on and why. Simple conversations, straightforward next steps.' },
  { n: '05', title: 'Built for business.', text: 'Creative work should support growth. We keep your business goals in view from first idea to final post.' },
];

// ---------- SERVICES ----------
export const serviceProcess = [
  {
    n: '01',
    title: 'Understand',
    text: 'We learn about your brand, your audience and the goal behind the brief.',
    outputs: ['Intro call', 'Brand review', 'Goals'],
  },
  {
    n: '02',
    title: 'Plan',
    text: 'We choose the right services and set the direction for content and creative.',
    outputs: ['Strategy', 'Service mix', 'Priorities'],
  },
  {
    n: '03',
    title: 'Create',
    text: 'Designs, shoots, edits and copy made in your brand style and shared for feedback.',
    outputs: ['Concepts', 'Production', 'Feedback'],
  },
  {
    n: '04',
    title: 'Publish',
    text: 'Content and campaigns go live where your audience is.',
    outputs: ['Publishing', 'Roll-out', 'Engagement'],
  },
  {
    n: '05',
    title: 'Improve',
    text: 'We review what is working and refine the plan to keep your presence moving forward.',
    outputs: ['Review', 'Refinement', 'Next steps'],
  },
];

export const serviceBenefits = [
  { n: '01', title: 'One team, one story.', text: 'Strategy, content, video, shoots and web in one place, so your brand tells a single, consistent story.' },
  { n: '02', title: 'Made for your brand.', text: 'Everything is shaped around your identity, your audience and your goals, never copied from a template.' },
  { n: '03', title: 'Start where it makes sense.', text: 'Begin with one service or combine several. The mix is built around what your brand needs right now.' },
  { n: '04', title: 'Creative with purpose.', text: 'Good-looking work is the starting point. We make sure it also does a job for your business.' },
];

export const serviceFaqs = [
  {
    q: 'Which service should we start with?',
    a: 'Start with your goal rather than the service. Tell us what you want to achieve and we will suggest the right mix. Many brands begin with content strategy or social media management and add more from there.',
  },
  {
    q: 'Can we hire you for just one service?',
    a: 'Yes. A set of reels, a product shoot or a single campaign is a perfectly good place to begin.',
  },
  {
    q: 'What do you need from us to get started?',
    a: 'A little about your brand and goals, any existing logos or brand assets, and examples of content you like. Share what you have and we will guide the rest.',
  },
  {
    q: 'Do you handle both strategy and creative?',
    a: 'Yes. Strategy, content, video, shoots, campaign creatives, websites and influencer campaigns all come from the same team, so the work stays consistent.',
  },
  {
    q: 'How do we get in touch?',
    a: `Write to us at ${brand.email} or message social365.agency on Instagram.`,
  },
];

// ---------- CONTACT ----------
export const contactSteps = [
  { n: '01', title: 'Send the first note', text: "Big brief, small question or just an idea. A perfect brief isn't needed." },
  { n: '02', title: 'We reply', text: 'We read your message and get back to you to understand your brand and goals.' },
  { n: '03', title: 'Shape the plan', text: 'Together we decide which services fit and how to get started.' },
  { n: '04', title: 'Start creating', text: 'We begin working on your strategy, content or campaign.' },
];

export const contactFaqs = [
  {
    q: 'What should I include in my first message?',
    a: 'A little about your brand, what you want to achieve and any links that help, such as your Instagram page or website. A polished brief is not required.',
  },
  {
    q: 'What happens after I send it?',
    a: 'We read it and reply with questions or next steps so we can understand what you need.',
  },
  {
    q: 'Do I need to know which service I want?',
    a: 'No. Choose "Not sure yet" in the form and tell us about your goal. We will help you work out the right fit.',
  },
  {
    q: 'Can I reach you on Instagram?',
    a: `Yes. You can message social365.agency on Instagram, or email ${brand.email}.`,
  },
  {
    q: 'Is a small project worth asking about?',
    a: 'Absolutely. A single shoot, a few reels or one campaign is a good way to start working together.',
  },
];
