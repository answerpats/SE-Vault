import { useState, useRef, useEffect, useCallback } from 'react';
import { Bell, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import useCollection from '../hooks/useCollection';

function NewsCard({ u }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef(null);

  const checkClamp = useCallback(() => {
    const el = textRef.current;
    if (el) setClamped(el.scrollHeight > el.clientHeight + 1);
  }, []);

  useEffect(() => {
    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, [checkClamp]);

  return (
    <article className="glass-card rounded-2xl overflow-hidden flex flex-col">
      {u.image_url && (
        <div className="overflow-hidden h-44 sm:h-52">
          <img src={u.image_url} alt={u.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
      )}
      <div className="p-5 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={13} className="text-accent-orange" />
          <span className="text-[11px] text-text-muted font-medium">
            {u.created_at ? new Date(u.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{u.title}</h3>
        <p ref={textRef} className={`text-text-muted text-[13px] sm:text-sm leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
          {u.description}
        </p>
        {(clamped || expanded) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 text-accent-orange text-xs font-semibold hover:text-accent-orange/80 transition-colors self-start"
          >
            {expanded ? <>Show Less <ChevronUp size={14} /></> : <>Read More <ChevronDown size={14} /></>}
          </button>
        )}
      </div>
    </article>
  );
}

export default function News() {
  const { items: updates, loading } = useCollection('updates');

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            News & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Latest <span className="text-gradient">News</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Stay updated with the latest happenings and insights from S.E. & Associates.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-muted text-sm">Loading news...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-text-muted">No news posted yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {updates.map((u) => (
              <NewsCard key={u.id} u={u} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
