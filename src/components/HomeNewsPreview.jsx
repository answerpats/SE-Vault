import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, AlertTriangle } from 'lucide-react';
import useCollection from '../hooks/useCollection';

export default function HomeNewsPreview() {
  const { items: updates, loading, error } = useCollection('updates', { limit: 3 });

  if (loading) return null;

  if (error) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-section">
          <div className="glass-card rounded-2xl p-8 text-center">
            <AlertTriangle size={28} className="text-accent-orange mx-auto mb-3" />
            <p className="text-text-muted text-sm">Unable to load latest updates. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (updates.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-14 sm:mb-16">
          <Link to="/news" className="inline-block group">
            <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Latest Updates
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight group-hover:text-accent-orange transition-colors">
              What&apos;s <span className="text-gradient">New</span>
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {updates.map((u) => (
            <Link
              key={u.id}
              to="/news"
              className="group glass-card rounded-2xl overflow-hidden flex flex-col hover:border-accent-orange/30 transition-colors"
            >
              {u.image_url && (
                <div className="overflow-hidden h-44 sm:h-48">
                  <img src={u.image_url} alt={u.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={13} className="text-accent-orange" />
                  <span className="text-[11px] text-text-muted font-medium tracking-wide">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <h4 className="text-[17px] sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent-orange transition-colors">{u.title}</h4>
                <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed line-clamp-3">{u.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/news" className="inline-flex items-center gap-2 text-accent-orange text-sm font-semibold hover:gap-3 transition-all">
            View All News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
