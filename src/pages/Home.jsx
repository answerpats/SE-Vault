import HeroCarousel from '../components/HeroCarousel';
import HomeServicesPreview from '../components/HomeServicesPreview';
import HomeNewsPreview from '../components/HomeNewsPreview';
import HomeGalleryPreview from '../components/HomeGalleryPreview';
import HomeWhyChooseUs from '../components/HomeWhyChooseUs';
import HomeTestimonials from '../components/HomeTestimonials';

import HomeCTA from '../components/HomeCTA';
import useCollection from '../hooks/useCollection';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Home() {
  const { items: heroSlides } = useCollection('hero_slides');
  const { settings } = useSiteSettings();

  return (
    <div className="-mt-28 sm:-mt-[148px] lg:-mt-[164px]">
      <HeroCarousel slides={heroSlides} settings={settings} />
      <div className="section-divider" />
      <HomeServicesPreview />
      <div className="section-divider" />
      <HomeWhyChooseUs />
      <div className="section-divider" />
      <HomeNewsPreview />
      <div className="section-divider" />
      <HomeGalleryPreview />
      <div className="section-divider" />
      <HomeTestimonials />
      <div className="section-divider" />
      <HomeCTA />
    </div>
  );
}
