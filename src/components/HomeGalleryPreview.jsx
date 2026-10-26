import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import useCollection from '../hooks/useCollection';

export default function HomeGalleryPreview() {
  const { items, loading, error } = useCollection('gallery', { limit: 8 });

  if (loading) return null;

  if (error) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-section">
          <div className="glass-card rounded-2xl p-8 text-center">
            <AlertTriangle size={28} className="text-accent-teal mx-auto mb-3" />
            <p className="text-text-muted text-sm">Unable to load gallery. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-14 sm:mb-16">
          <Link to="/gallery" className="inline-block group">
            <span className="text-accent-teal text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Gallery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight group-hover:text-accent-teal transition-colors">
              Our <span className="text-gradient-teal">Gallery</span>
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="relative group rounded-xl overflow-hidden aspect-square bg-bg-card block"
            >
              <img
                src={item.image_url}
                alt={item.caption || ''}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-accent-teal text-sm font-semibold hover:gap-3 transition-all">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
