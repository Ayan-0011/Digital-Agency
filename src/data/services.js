// The seven confirmed social365 services. Edit here; the homepage, Services page and contact form all read from this file.
// `items` are the focus areas listed under each service; `count` is derived from them.
const list = [
  {
    n: '01',
    title: 'Social Media Management & Content',
    desc: 'Day-to-day management of your social presence, from content planning to posting. A steady, on-brand feed keeps your audience engaged and your business visible.',
    items: ['Content planning', 'Post design & copy', 'Profile & feed styling', 'Community engagement', 'Publishing & consistency'],
  },
  {
    n: '02',
    title: 'Reels Editing',
    desc: 'Short-form video edited for attention: tight cuts, clean pacing and a style that suits your brand. Reels are where discovery happens, so every second has to earn its place.',
    items: ['Short-form edits', 'Hooks & pacing', 'Captions & text overlays', 'Music & sound sync', 'Brand-consistent style'],
  },
  {
    n: '03',
    title: 'Product / In-store Shoot',
    desc: 'Photo and video shoots that show your products and your space the way customers should see them. Strong visuals build trust and give your content real substance.',
    items: ['Product photography', 'In-store & location shoots', 'Lifestyle & detail shots', 'Shoot planning & styling', 'Content-ready delivery'],
  },
  {
    n: '04',
    title: 'Campaign Creatives',
    desc: 'Concept-led creatives for launches, offers and seasonal pushes, designed as one connected story across formats. A clear campaign idea turns scattered posts into momentum.',
    items: ['Campaign concepts', 'Visual design', 'Copywriting', 'Multi-format adaptations', 'Launch & offer creatives'],
  },
  {
    n: '05',
    title: 'Content Strategy',
    desc: 'A plan behind the posts: who you are talking to, what to say and where to say it. Strategy gives your content direction so every piece supports a business goal.',
    items: ['Audience & positioning', 'Content pillars', 'Format & channel planning', 'Posting rhythm', 'Brand voice'],
  },
  {
    n: '06',
    title: 'Website Development',
    desc: 'Clean, responsive websites that give your brand a proper home online. A well-built site turns attention from social media into enquiries and trust.',
    items: ['Business websites', 'Landing pages', 'Responsive design', 'Brand-matched visuals', 'Contact & enquiry flows'],
  },
  {
    n: '07',
    title: 'Influencer Campaigns',
    desc: 'Creator collaborations planned around your brand and your audience. The right voices put your product in front of people who already pay attention to them.',
    items: ['Creator discovery', 'Collaboration briefs', 'Campaign coordination', 'Content direction', 'Campaign wrap-up'],
  },
];

export const services = list.map(s => ({ ...s, count: `${String(s.items.length).padStart(2, '0')} FOCUS AREAS` }));
