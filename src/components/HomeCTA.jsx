import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="relative glass-panel rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden glow-orange">
          <div className="absolute top-0 left-0 w-40 h-40 bg-accent-orange/10 blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-teal/8 blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-accent-orange/15 border border-accent-orange/25 flex items-center justify-center mb-6">
              <Sparkles className="text-accent-orange" size={22} />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to Grow <span className="text-gradient">Your Business?</span>
            </h2>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-8">
              Join our growing family of businesses and get access to expert support,
              exclusive resources, and tailored solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/membership"
                className="group relative inline-flex items-center justify-center gap-2 bg-accent-orange text-white px-7 py-3 rounded-full text-sm font-bold shadow-[0_0_24px_rgba(255,123,0,0.25)] transition-all hover:shadow-[0_0_32px_rgba(255,123,0,0.4)] overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                <span className="relative">Join Our Family</span>
                <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/5 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:bg-white/10 w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
