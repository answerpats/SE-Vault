import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Globe, Zap, PenTool, BarChart3, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Business Administration',
    description: 'Streamline your operations with professional administrative support tailored to your needs.',
    accent: 'orange',
  },
  {
    icon: Globe,
    title: 'Digital Transformation',
    description: 'Modernize your business with cutting-edge digital solutions and technology integration.',
    accent: 'teal',
  },
  {
    icon: PenTool,
    title: 'Brand Development',
    description: 'Build a powerful brand identity that resonates with your target audience and drives loyalty.',
    accent: 'orange',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Make data-driven decisions with comprehensive analytics and performance tracking.',
    accent: 'teal',
  },
  {
    icon: Zap,
    title: 'E-Commerce Solutions',
    description: 'Launch and scale your online store with end-to-end e-commerce support and strategy.',
    accent: 'orange',
  },
  {
    icon: Megaphone,
    title: 'Marketing & Growth',
    description: 'Accelerate growth with targeted marketing strategies and customer acquisition plans.',
    accent: 'teal',
  },
];

export default function HomeServicesPreview() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-accent-orange/[0.04] rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent-teal/[0.03] rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Comprehensive business support solutions designed to help you focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col group hover:border-white/15 transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-5 transition-all duration-300 ${
                service.accent === 'orange'
                  ? 'text-accent-orange group-hover:shadow-[0_0_20px_rgba(255,123,0,0.2)]'
                  : 'text-accent-teal group-hover:shadow-[0_0_20px_rgba(0,210,255,0.2)]'
              }`}>
                <service.icon size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">{service.title}</h3>
              <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed flex-grow">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-accent-orange text-sm font-semibold hover:gap-3 transition-all"
          >
            View All Packages <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
