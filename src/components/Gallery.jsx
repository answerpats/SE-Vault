import { useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import useCollection from '../hooks/useCollection';

export default function Gallery() {
  const { items, loading } = useCollection('gallery');
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-accent-teal text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Our <span className="text-gradient-teal">Gallery</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            A visual showcase of our work, events, and the businesses we help grow.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-muted text-sm">Loading gallery...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-text-muted">No photos yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className="relative group rounded-xl overflow-hidden aspect-square bg-bg-card focus:outline-none focus:ring-2 focus:ring-accent-teal/50"
              >
                <img src={item.image_url} alt={item.caption || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 sm:p-8" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/60 hover:text-white p-2 z-10">
            <X size={24} />
          </button>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.caption || ''} className="w-full max-h-[80vh] object-contain rounded-lg" />
            {lightbox.caption && (
              <p className="text-white/80 text-center mt-4 text-sm">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
