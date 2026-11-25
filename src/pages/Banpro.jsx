import BanproHero from '../components/sections/banpro/BanproHero.jsx';
import BanproIntro from '../components/sections/banpro/BanproIntro.jsx';
import ProductCampaign from '../components/sections/banpro/ProductCampaign.jsx';
import CreativeGallery from '../components/sections/banpro/CreativeGallery.jsx';
import ReelsShowcase from '../components/sections/banpro/ReelsShowcase.jsx';
import BanproClosing from '../components/sections/banpro/BanproClosing.jsx';
import '../styles/banpro.css';

export default function Banpro() {
  return (
    <article className="banpro-page">
      <BanproHero />
      <BanproIntro />
      <ProductCampaign />
      <CreativeGallery />
      <ReelsShowcase />
      <BanproClosing />
    </article>
  );
}
