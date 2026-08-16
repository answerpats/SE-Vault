import { Shield, Clock, HeartHandshake, TrendingUp, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Trusted & Reliable',
    description: 'We deliver consistent, high-quality results that businesses across Uganda depend on.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'We respect deadlines and ensure every project is completed on time, every time.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-Centric Approach',
    description: 'Your success is our priority. We tailor our solutions to fit your unique business needs.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'Our strategies are focused on delivering measurable outcomes that drive real business growth.',
  },
];

export default function HomeWhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-teal/[0.04] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text content */}
          <div>
            <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 mb-5 tracking-tight">
              Built for <span className="text-gradient">Your Success</span>
            </h2>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-8">
              At S.E. & Associates, we combine expertise with dedication to help businesses of all sizes
              navigate challenges and seize opportunities. Here is why businesses trust us.
            </p>

            <div className="space-y-4">
              {reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 text-accent-orange group-hover:border-accent-orange/30 transition-colors">
                    <reason.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-bold mb-1">{reason.title}</h3>
                    <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual card */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-teal/8 blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Our Commitment</h3>

              <div className="space-y-4">
                {[
                  'Personalized service for every client',
                  'Transparent pricing with no hidden fees',
                  'Dedicated support team available Mon-Fri',
                  'Scalable solutions that grow with you',
                  'Industry-specific expertise and insights',
                  'Regular progress reports and updates',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-accent-teal flex-shrink-0" />
                    <span className="text-text-muted text-[13px] sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gradient tracking-tight">98%</div>
                    <p className="text-text-muted text-[11px] sm:text-xs mt-1">Client Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gradient-teal tracking-tight">24h</div>
                    <p className="text-text-muted text-[11px] sm:text-xs mt-1">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
