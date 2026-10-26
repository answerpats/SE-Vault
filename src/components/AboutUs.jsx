import { Target, Eye, Search, Lightbulb, Handshake } from 'lucide-react';

const pillars = [
  { icon: Search, title: 'Client Focus', description: 'Your success is our priority. We listen, understand, and deliver solutions tailored to your unique needs.', accent: 'orange' },
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace modern tools and creative strategies to keep your business ahead of the curve.', accent: 'white' },
  { icon: Handshake, title: 'Collaboration', description: 'We work alongside you as partners, building lasting relationships founded on trust and transparency.', accent: 'teal' },
];

const accentMap = {
  orange: { text: 'text-accent-orange', border: 'border-b-accent-orange/25', glow: 'shadow-[0_0_16px_rgba(255,123,0,0.15)]' },
  white: { text: 'text-white', border: 'border-b-white/20', glow: 'shadow-[0_0_16px_rgba(255,255,255,0.12)]' },
  teal: { text: 'text-accent-teal', border: 'border-b-accent-teal/25', glow: 'shadow-[0_0_16px_rgba(0,210,255,0.15)]' },
};

export default function AboutUs() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-orange/[0.04] rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            Who We Are
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            We believe that every business deserves reliable, accessible, and professional support to thrive.
            Founded in Uganda to address the evolving needs of businesses in administration, compliance, finance, and digital transformation.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-24">
          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border-t border-t-accent-orange/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/10 blur-[50px] -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shadow-[0_0_16px_rgba(255,123,0,0.15)] flex-shrink-0">
                <Target className="text-accent-orange" size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Our Mission</h3>
            </div>
            <p className="text-text-muted text-[13px] sm:text-sm md:text-base leading-relaxed">
              To empower businesses in Uganda and beyond by delivering reliable, affordable, and
              professional business support services that simplify operations, enhance efficiency,
              and enable sustainable growth.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border-t border-t-accent-teal/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-teal/10 blur-[50px] -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shadow-[0_0_16px_rgba(0,210,255,0.15)] flex-shrink-0">
                <Eye className="text-accent-teal" size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Our Vision</h3>
            </div>
            <p className="text-text-muted text-[13px] sm:text-sm md:text-base leading-relaxed">
              To excellently lead provision of innovative business support services, recognized for
              transforming how enterprises access and benefit from professional consulting.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="text-center mb-10">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase">Core Pillars</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {pillars.map((p, i) => {
            const a = accentMap[p.accent];
            return (
              <div key={i} className={`glass-card rounded-2xl p-6 sm:p-8 text-center border-b-2 ${a.border} flex flex-col items-center`}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-white/5 border border-white/8 rounded-full flex items-center justify-center mb-5 ${a.glow}`}>
                  <p.icon className={a.text} size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">{p.title}</h3>
                <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
