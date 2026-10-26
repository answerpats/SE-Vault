import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { ArrowRight, Calendar } from 'lucide-react';

const slides = [
  {
    eyebrow: 'STRATEGY TODAY. A STRONGER TOMORROW.',
    heading: 'Supporting enterprises, institutions and entrepreneurs through enterprise development, innovation, strategic partnerships, digitization and transformation.',
    tagWords: ['ANALYSE', 'STRATEGIZE', 'INNOVATE', 'TRANSFORM', 'CREATE VALUE'],
    bottomWords: ['PEOPLE', 'IDEAS', 'ENTERPRISES', 'A STRONGER UGANDA'],
    rightWords: ['IDEAS', 'OPPORTUNITIES', 'PARTNERSHIPS', 'SOLUTIONS', 'GROWTH', 'VALUE'],
  },
  {
    eyebrow: 'DISCOVER. EVALUATE. UNLOCK.',
    heading: 'Helping organizations discover, structure and unlock value in a changing world.',
    tagWords: ['ANALYSE', 'STRATEGIZE', 'INNOVATE', 'TRANSFORM', 'CREATE VALUE'],
    bottomWords: ['PEOPLE', 'IDEAS', 'ENTERPRISES', 'A STRONGER UGANDA'],
    rightWords: ['IDEAS', 'OPPORTUNITIES', 'PARTNERSHIPS', 'SOLUTIONS', 'GROWTH', 'VALUE'],
  },
  {
    eyebrow: 'STRUCTURE. SCALE. SUSTAIN.',
    heading: 'Strengthen your enterprise, explore opportunities, and achieve sustainable growth.',
    tagWords: ['ANALYSE', 'STRATEGIZE', 'INNOVATE', 'TRANSFORM', 'CREATE VALUE'],
    bottomWords: ['PEOPLE', 'IDEAS', 'ENTERPRISES', 'A STRONGER UGANDA'],
    rightWords: ['IDEAS', 'OPPORTUNITIES', 'PARTNERSHIPS', 'SOLUTIONS', 'GROWTH', 'VALUE'],
  },
];

export default function HeroCarousel() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] max-h-[960px] overflow-hidden" style={{ background: '#0d0b08' }}>
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
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="h-full relative flex" style={{ background: '#0d0b08' }}>
              {/* Dark background with subtle orange grid */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, #ff7b00 1px, transparent 1px), linear-gradient(-45deg, #ff7b00 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, #0d0b08 45%, rgba(13,11,8,0.85) 60%, rgba(13,11,8,0.4) 100%)',
                  }}
                />
                {/* Orange ambient glow bottom-left */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[300px] opacity-20" style={{ background: 'radial-gradient(ellipse at bottom left, #ff7b00, transparent 70%)' }} />
              </div>

              {/* Personal photo — right side */}
              <div
                className="absolute right-0 top-0 h-full w-[65%] sm:w-[44%] bg-cover bg-top opacity-35 sm:opacity-100 transition-opacity"
                style={{
                  backgroundImage: 'url(/se.jpeg)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                }}
              />
              {/* Bottom fade on photo */}
              <div
                className="absolute right-0 bottom-0 h-48 w-full sm:w-[44%]"
                style={{ background: 'linear-gradient(to top, #0d0b08, transparent)' }}
              />

              {/* Left tag words (vertical) */}
              <div className="absolute left-5 sm:left-7 top-[42%] -translate-y-1/2 flex flex-col gap-2 z-10 hidden sm:flex">
                {slide.tagWords.map((w, j) => (
                  <span key={j} className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{w}</span>
                ))}
              </div>

              {/* Bottom-left words */}
              <div className="absolute left-5 sm:left-7 bottom-10 flex flex-col gap-1 z-10 hidden sm:flex">
                {slide.bottomWords.map((w, j) => (
                  <span key={j} className="text-[7px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>{w}</span>
                ))}
              </div>

              {/* Right floating words (between text and photo) */}
              <div className="absolute right-[46%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 text-right hidden lg:flex pr-2">
                {slide.rightWords.map((w, j) => (
                  <span key={j} className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,123,0,0.5)' }}>{w}</span>
                ))}
                <span className="text-xs font-bold italic mt-3 leading-snug" style={{ color: 'rgba(255,123,0,0.4)', fontFamily: 'Georgia,serif' }}>
                  Unlocking<br />Enterprise Value
                </span>
              </div>

              {/* Main content */}
              <div className="relative z-10 h-full flex items-center w-full pt-14 sm:pt-0">
                <div className="container-section w-full">
                  <div className="max-w-full sm:max-w-[54%] space-y-3.5 sm:space-y-5 sm:pl-14">

                    {/* Eyebrow */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 sm:w-8 h-[2px] bg-accent-orange" />
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {slide.eyebrow}
                      </span>
                    </div>

                    {/* Name in italic serif */}
                    <div className="italic font-light text-2xl sm:text-3xl" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Georgia, serif' }}>
                      Ssekaayi Elvis
                    </div>

                    {/* Role & Founder */}
                    <div className="space-y-0.5">
                      <p className="text-white font-bold text-base sm:text-lg">Business Development Analyst</p>
                      <p className="text-sm font-semibold text-accent-orange">Founder of SE Vault Uganda</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[15px] leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {slide.heading}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
                      <Link
                        to="/services"
                        className="group inline-flex items-center justify-center gap-2 bg-accent-orange text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto"
                        style={{ boxShadow: '0 0 24px rgba(255,123,0,0.35)' }}
                      >
                        Explore Services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
                        style={{ border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.08)' }}
                      >
                        <Calendar size={13} /> Schedule a Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-40 hidden sm:flex">
        <span className="text-[9px] text-white tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
