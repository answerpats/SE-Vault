import { Quote } from 'lucide-react';
import useCollection from '../hooks/useCollection';

const defaultTestimonials = [
  {
    id: 'default-1',
    author: 'Sarah Nakamya',
    role: 'CEO, Bloom Enterprises',
    content: 'S.E VAULT transformed how we run our business. Their administrative support freed us to focus on growth, and we have seen a 40% increase in productivity.',
  },
  {
    id: 'default-2',
    author: 'David Okello',
    role: 'Founder, TechBridge Uganda',
    content: 'The digital transformation package was exactly what we needed. Professional, thorough, and delivered on time. Highly recommend their services.',
  },
  {
    id: 'default-3',
    author: 'Grace Atim',
    role: 'Director, Harvest Foods Ltd',
    content: 'Working with S.E VAULT has been a game-changer. Their e-commerce solutions helped us reach customers across East Africa.',
  },
];

export default function HomeTestimonials() {
  const { items: testimonials } = useCollection('testimonials', { limit: 6 });

  const active = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-accent-teal text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            What Our <span className="text-gradient-teal">Clients Say</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Hear from the businesses we have helped grow and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {active.map((t) => (
            <div key={t.id} className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col relative">
              <Quote size={28} className="text-accent-orange/15 absolute top-5 right-5" />
              <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed flex-grow mb-5">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-orange/15 flex items-center justify-center text-accent-orange font-bold text-sm">
                    {t.author?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-white text-sm font-semibold">{t.author}</p>
                  {t.role && <p className="text-text-muted text-[11px]">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
