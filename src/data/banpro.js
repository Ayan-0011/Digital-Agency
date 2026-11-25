import collaborationImage from '../assets/collab/collabe.jpg';

const campaignFiles = import.meta.glob('../assets/banpro/campaigns/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const videoFiles = import.meta.glob('../assets/banpro/videos/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
});

const campaignImage = filename => campaignFiles[`../assets/banpro/campaigns/${filename}`] ?? null;
const campaignVideo = filename => videoFiles[`../assets/banpro/videos/${filename}`] ?? null;

const imageMedia = (id, title, category, filename, alt, caption, aspectRatio = '4 / 5') => {
  const image = campaignImage(filename);
  return {
    id,
    title,
    category,
    image,
    alt,
    caption,
    aspectRatio,
    mediaType: 'image',
    pendingMedia: image ? [] : ['image'],
  };
};

const videoMedia = (id, title, filename, aspectRatio = '9 / 16') => {
  const videoUrl = campaignVideo(filename);
  return {
    id,
    title,
    category: 'Video',
    videoUrl,
    thumbnail: null,
    alt: `${title} — Banpro video`,
    caption: 'Banpro video supplied with the collaboration assets.',
    aspectRatio,
    mediaType: 'video',
    pendingMedia: [!videoUrl && 'video', 'thumbnail'].filter(Boolean),
  };
};

export const banproData = {
  hero: imageMedia(
    'diwali-campaign-hero',
    'Diwali product campaign',
    'Seasonal campaign',
    'WhatsApp Image 2026-11-05 at 3.44.25 PM (1).jpeg',
    'Banbpro Diwali campaign artwork featuring grooming products in a festive display.',
    'A seasonal campaign visual from the supplied Banpro artwork.',
    '4 / 5',
  ),
  collaboration: {
    id: 'banpro-social365-collaboration',
    title: 'Welcome on board',
    image: collaborationImage,
    alt: 'BANBPro and social365 collaboration welcome artwork.',
    caption: 'The existing BANBPro × social365 collaboration artwork.',
    aspectRatio: '4 / 5',
    mediaType: 'image',
  },
  products: [
    imageMedia(
      'metal-comb-creative',
      'Metal comb campaign',
      'Product visuals',
      'WhatsApp Image 2026-11-05 at 3.44.17 PM (1).jpeg',
      'Yellow Banbpro campaign artwork featuring a metal styling comb.',
      'Metal comb product creative.',
      '3 / 4',
    ),
    imageMedia(
      'jetstream-dryer-creative',
      'Jetstream Pro campaign',
      'Product visuals',
      'WhatsApp Image 2026-11-05 at 3.44.17 PM.jpeg',
      'Orange Banbpro Jetstream Pro hair dryer campaign artwork.',
      'Jetstream Pro hair dryer creative.',
      '2 / 3',
    ),
    imageMedia(
      'everyday-grooming-creative',
      'Everyday grooming campaign',
      'Product visuals',
      'WhatsApp Image 2026-11-05 at 3.44.23 PM.jpeg',
      'Banbpro campaign artwork for everyday grooming with styling tools.',
      'Everyday grooming campaign visual.',
      '4 / 5',
    ),
    imageMedia(
      'heat-pro-brush-campaign',
      'Heat Pro campaign',
      'Product visuals',
      'WhatsApp Image 2026-11-05 at 3.45.16 PM.jpeg',
      'Banbpro Heat Pro styling brush campaign artwork with a festive product display.',
      'Heat Pro styling brush campaign visual.',
      '9 / 16',
    ),
  ],
  gallery: [
    imageMedia('comb-range-black', 'Metal comb range', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.18 PM (1).jpeg', 'Banbpro metal comb range arranged on a black graphic background.', 'Metal comb range creative.', '4 / 5'),
    imageMedia('tail-comb-detail', 'Tail comb detail', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.18 PM (2).jpeg', 'Banbpro metal tail comb campaign artwork on a dark background.', 'Metal tail comb creative.', '4 / 5'),
    imageMedia('yellow-comb-ad', 'Professional comb', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.18 PM.jpeg', 'Yellow Banbpro professional comb campaign artwork.', 'Professional comb campaign artwork.', '3 / 4'),
    imageMedia('comb-feature-artwork', 'Comb feature artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.19 PM (1).jpeg', 'Banbpro comb advertisement with product details and a black background.', 'Comb product advertisement.', '4 / 5'),
    imageMedia('comb-campaign-01', 'Comb campaign artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.20 PM (1).jpeg', 'Banbpro grooming comb campaign artwork.', 'Grooming comb product creative.', '4 / 5'),
    imageMedia('comb-campaign-02', 'Comb campaign artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.20 PM.jpeg', 'Banbpro metal comb campaign artwork with product messaging.', 'Metal comb campaign creative.', '4 / 5'),
    imageMedia('comb-campaign-03', 'Comb campaign artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.21 PM (1).jpeg', 'Banbpro metal comb campaign artwork on a dark patterned background.', 'Metal comb product creative.', '4 / 5'),
    imageMedia('comb-campaign-04', 'Comb campaign artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.21 PM (2).jpeg', 'Banbpro comb campaign graphic showing a range of combs.', 'Comb range campaign creative.', '4 / 5'),
    imageMedia('comb-campaign-05', 'Comb campaign artwork', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.21 PM.jpeg', 'Banbpro comb product advertisement on a black background.', 'Comb product campaign artwork.', '4 / 5'),
    imageMedia('comb-range-creative', 'Comb range creative', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.44.22 PM.jpeg', 'Banbpro comb range campaign artwork.', 'Comb range campaign artwork.', '4 / 5'),
    imageMedia('quality-campaign', 'Quality campaign', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.44.24 PM (1).jpeg', 'Banbpro grooming campaign artwork with a quality-focused editorial headline.', 'Brand campaign artwork.', '4 / 5'),
    imageMedia('comb-editorial', 'More than a comb', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.44.25 PM.jpeg', 'Banbpro editorial campaign artwork about everyday grooming tools.', 'Editorial campaign creative.', '4 / 5'),
    imageMedia('diwali-product-campaign', 'Diwali product campaign', 'Seasonal campaign', 'WhatsApp Image 2026-11-05 at 3.45.21 PM (1).jpeg', 'Banbpro festive campaign featuring a display of grooming products.', 'Seasonal product campaign artwork.', '9 / 16'),
    imageMedia('everyday-style-campaign', 'Everyday style', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.21 PM.jpeg', 'Banbpro campaign artwork about everyday styling.', 'Everyday styling campaign artwork.', '4 / 5'),
    imageMedia('style-campaign', 'Designed to match your style', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.22 PM.jpeg', 'Banbpro campaign artwork with a designed-to-match-your-style message.', 'Brand campaign artwork.', '4 / 5'),
    imageMedia('styling-comb-set', 'Professional styling comb set', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.45.23 PM (1).jpeg', 'Banbpro professional styling comb set campaign artwork.', 'Styling comb set creative.', '9 / 16'),
    imageMedia('heat-pro-range', 'Heat Pro range', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.45.23 PM.jpeg', 'Banbpro Heat Pro styling brush product range campaign artwork.', 'Heat Pro range creative.', '9 / 16'),
    imageMedia('grooming-campaign-01', 'Grooming campaign', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.24 PM (1).jpeg', 'Banbpro grooming campaign artwork with an editorial product message.', 'Grooming campaign visual.', '4 / 5'),
    imageMedia('grooming-campaign-02', 'Grooming campaign', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.24 PM (2).jpeg', 'Banbpro grooming campaign artwork featuring styling products.', 'Grooming campaign visual.', '4 / 5'),
    imageMedia('comb-campaign-detail', 'Comb campaign detail', 'Product visuals', 'WhatsApp Image 2026-11-05 at 3.45.24 PM.jpeg', 'Banbpro comb campaign artwork with a product-focused layout.', 'Comb product creative.', '4 / 5'),
    imageMedia('campaign-poster-01', 'Campaign poster', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.25 PM (1).jpeg', 'Banbpro campaign poster featuring grooming products.', 'Banbpro campaign poster.', '4 / 5'),
    imageMedia('campaign-poster-02', 'Campaign poster', 'Campaign artwork', 'WhatsApp Image 2026-11-05 at 3.45.25 PM.jpeg', 'Banbpro promotional campaign artwork for grooming products.', 'Promotional campaign artwork.', '9 / 16'),
  ],
  videos: [
    videoMedia('banpro-video-01', 'Banpro video 01', 'WhatsApp Video 2026-11-05 at 3.45.04 PM.mp4'),
    videoMedia('banpro-video-02', 'Banpro video 02', 'WhatsApp Video 2026-11-05 at 3.45.11 PM.mp4'),
    videoMedia('banpro-video-03', 'Banpro video 03', 'WhatsApp Video 2026-11-05 at 3.45.25 PM.mp4'),
    videoMedia('banpro-video-04', 'Banpro video 04', 'WhatsApp Video 2026-11-05 at 3.45.36 PM.mp4'),
  ],
  services: [
    'Campaign creatives',
    'Product campaign visuals',
    'Social content',
    'Video content',
  ],
};
