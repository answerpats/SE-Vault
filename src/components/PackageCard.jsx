import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PackageIcon } from '../data/packageIcons';

export default function PackageCard({
  icon,
  title,
  subtitle,
  description,
  features = [],
  highlighted,
  price,
  imageUrl,
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-to-b from-accent-orange/15 to-bg-card border border-accent-orange/40 shadow-[0_0_30px_rgba(255,123,0,0.1)]'
          : 'glass-card'
      }`}
    >
      {highlighted && (
        <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-accent-orange text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wide uppercase">
          Most Popular
        </span>
      )}

      {imageUrl && (
        <div className="overflow-hidden h-40 sm:h-44">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-5 sm:p-7">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 ${
            highlighted ? 'bg-accent-orange/15' : 'bg-white/5 border border-white/8'
          } ${highlighted && !imageUrl ? 'mt-4' : ''}`}
        >
          {/* `icon` is an icon name from the database */}
          <PackageIcon
            name={icon}
            className={highlighted ? 'text-accent-orange' : 'text-text-primary'}
            size={22}
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-accent-teal text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-3">
            {subtitle}
          </p>
        )}
        <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed mb-5 flex-grow">
          {description}
        </p>

        {price && <p className="text-accent-orange font-extrabold text-xl mb-5">{price}</p>}

        {features.length > 0 && (
          <>
            <div className="h-px bg-white/8 mb-5" />
            <ul className="space-y-3 mb-6">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-text-muted">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-accent-teal/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-teal text-[10px] font-bold">&#10003;</span>
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <Link
          to="/contact"
          className={`mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group overflow-hidden relative ${
            highlighted
              ? 'bg-accent-orange text-white hover:shadow-[0_0_24px_rgba(255,123,0,0.3)]'
              : 'bg-white/5 border border-white/8 text-white hover:bg-white/10'
          }`}
        >
          <span className="relative z-10">Get Started</span>
          <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          {highlighted && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
          )}
        </Link>
      </div>
    </div>
  );
}
