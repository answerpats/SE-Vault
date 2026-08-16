import PackageCard from './PackageCard';
import { AlertTriangle } from 'lucide-react';
import useCollection from '../hooks/useCollection';
import defaultPackages from '../data/defaultPackages';

export default function Services() {
  const { items, loading, error } = useCollection('packages');

  // Packages are managed in the admin dashboard. The hardcoded defaults are only
  // a fallback for a fresh install where the table has not been seeded yet.
  const packages = items.length > 0 ? items : defaultPackages;

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent-orange/[0.04] rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-teal/[0.04] rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            Tailored Solutions for <span className="text-gradient">Every Business</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Choose the package that fits your business needs. From startups to enterprises,
            we have the expertise to help you succeed.
          </p>
        </div>

        {error && items.length === 0 && (
          <div className="glass-card rounded-2xl p-6 mb-10 flex items-center gap-3 justify-center text-center">
            <AlertTriangle size={20} className="text-accent-orange flex-shrink-0" />
            <p className="text-text-muted text-sm">
              Showing our standard packages — live pricing could not be loaded.
            </p>
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id ?? i}
              icon={pkg.icon}
              title={pkg.title}
              subtitle={pkg.subtitle}
              description={pkg.description}
              features={Array.isArray(pkg.features) ? pkg.features : []}
              highlighted={!!pkg.highlighted}
              price={pkg.price}
              imageUrl={pkg.image_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
