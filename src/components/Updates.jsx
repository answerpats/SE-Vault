import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { Calendar, AlertTriangle, Loader } from 'lucide-react';

export default function Updates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await apiFetch('updates.php?limit=12');
        setUpdates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching updates:', err.message);
        setError(true);
      }
      setLoading(false);
    };
    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-section text-center">
          <Loader className="animate-spin mx-auto text-text-muted" size={24} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-section text-center text-text-muted flex items-center justify-center gap-2">
          <AlertTriangle size={18} /> Unable to load updates.
        </div>
      </section>
    );
  }

  if (updates.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Latest Updates
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            What&apos;s <span className="text-gradient">New</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {updates.map((u) => (
            <div key={u.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
              {u.image_url && (
                <div className="overflow-hidden h-44 sm:h-48">
                  <img src={u.image_url} alt={u.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              )}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={13} className="text-accent-orange" />
                  <span className="text-[11px] text-text-muted font-medium">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <h4 className="text-[17px] sm:text-lg font-bold text-white mb-2 leading-snug">{u.title}</h4>
                <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed">{u.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
