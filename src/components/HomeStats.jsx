import { Users, Briefcase, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '50+', label: 'Clients Served', accent: 'orange' },
  { icon: Briefcase, value: '100+', label: 'Projects Completed', accent: 'teal' },
  { icon: Award, value: '4+', label: 'Years Experience', accent: 'orange' },
  { icon: Globe, value: '10+', label: 'Industries Covered', accent: 'teal' },
];

export default function HomeStats() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 sm:p-8 text-center">
              <div className={`w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 ${
                s.accent === 'orange' ? 'text-accent-orange' : 'text-accent-teal'
              }`}>
                <s.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-1 ${
                s.accent === 'orange' ? 'text-gradient' : 'text-gradient-teal'
              }`}>
                {s.value}
              </div>
              <p className="text-text-muted text-[11px] sm:text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
