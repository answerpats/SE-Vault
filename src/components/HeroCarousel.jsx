import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { ArrowRight } from 'lucide-react';

const hardcodedDefaults = [
  { heading: 'Empowering Businesses to Thrive', subtext: 'We are dedicated to helping businesses succeed by providing tailored support services that simplify operations, enhance efficiency, and drive sustainable growth.', ctaText: 'Explore Our Services', ctaLink: '/services', imageUrl: '/back.png' },
  { heading: 'Your Trusted Partner in Growth', subtext: 'From administration to digital transformation, our expert team delivers reliable and professional solutions so you can focus on what matters most — growing your business.', ctaText: 'View Packages', ctaLink: '/services', imageUrl: '/back.png' },
  { heading: 'Simplify. Enhance. Grow.', subtext: 'Our team is here to be your trusted partner in success. Let us handle the complexity while you lead the vision.', ctaText: 'Get Started Today', ctaLink: '/contact', imageUrl: '/back.png' },
];

function buildDefaultSlides(settings) {
  if (!settings) return hardcodedDefaults;
  return hardcodedDefaults.map((d, i) => {
    const n = i + 1;
    return {
      heading: settings[`heroSlide${n}Heading`] || d.heading,
      subtext: settings[`heroSlide${n}Subtext`] || d.subtext,
      ctaText: settings[`heroSlide${n}CtaText`] || d.ctaText,
      ctaLink: settings[`heroSlide${n}CtaLink`] || d.ctaLink,
      imageUrl: d.imageUrl,
    };
  });
}

const highlighted = ['growth', 'thrive', 'grow.', 'partner'];

function CTA({ text, link }) {
  const cls = "group inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm font-bold shadow-[0_0_24px_rgba(255,123,0,0.25)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,123,0,0.4)] overflow-hidden relative";
  const inner = (
    <>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
      <span className="relative">{text}</span>
      <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
    </>
  );
  return link?.startsWith('/')
    ? <Link to={link} className={cls}>{inner}</Link>
    : <a href={link} className={cls}>{inner}</a>;
}

export default function HeroCarousel({ slides, settings }) {
  const defaultSlides = buildDefaultSlides(settings);
  const normalized = slides?.map((s) => ({
    heading: s.heading || '',
    subtext: s.subtext || '',
    ctaText: s.ctaText || s.cta_text || '',
    ctaLink: s.ctaLink || s.cta_link || '',
    imageUrl: s.imageUrl || s.image_url || '',
  }));
  const active = normalized?.length ? normalized : defaultSlides;

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] sm:min-h-[640px] max-h-[960px] overflow-hidden">
      <div className="relative z-10 h-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          speed={1000}
          className="h-full"
        >
          {active.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="h-full relative">
                {slide.imageUrl ? (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-bg-primary" />
                    {/* Image: full width on mobile, right-half on desktop */}
                    <div
                      className="absolute inset-0 sm:left-[40%] bg-cover bg-center sm:bg-right"
                      style={{
                        backgroundImage: `url(${slide.imageUrl})`,
                        maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
                      }}
                    />
                    {/* Mobile: heavy overlay so text is clear */}
                    <div className="absolute inset-0 bg-bg-primary/70 sm:hidden" />
                    {/* Desktop: gradient fade from left */}
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-bg-primary from-30% via-bg-primary/80 via-45% to-transparent" />
                    {/* Subtle bottom fade on all sizes */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-bg-primary/50 to-bg-primary opacity-80" />
                  </div>
                )}

                <div className="relative h-full flex items-center">
                  <div className="container-section w-full">
                    <div className="max-w-2xl space-y-6 sm:space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-accent-orange/60" />
                        <span className="text-text-muted text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase">
                          Business Support Services
                        </span>
                      </div>

                      <h1 className="text-[28px] leading-tight sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white">
                        {slide.heading.split(' ').map((w, j) => (
                          <span key={j} className={highlighted.includes(w.toLowerCase()) ? 'text-gradient' : ''}>
                            {w}{' '}
                          </span>
                        ))}
                      </h1>

                      <p className="text-[15px] sm:text-lg text-text-muted leading-relaxed max-w-lg font-light">
                        {slide.subtext}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                        {slide.ctaText && <CTA text={slide.ctaText} link={slide.ctaLink} />}
                        <Link
                          to="/about"
                          className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/15"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-50 hidden sm:flex">
        <span className="text-[9px] text-white tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
