import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ClipboardCheck, DollarSign, Cpu, Search, Lightbulb, Handshake, Package } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Strategic Enterprise Development',
    tagline: 'Structure. Scale. Sustain.',
    description: 'We help enterprises build strong foundations for scalable, sustainable growth through strategic development frameworks.',
    accent: 'orange',
  },
  {
    icon: ClipboardCheck,
    title: 'Feasibility Study & Business Case Development',
    tagline: 'Assess. Validate. Invest.',
    description: 'Rigorous feasibility analysis and compelling business cases that validate ideas and attract investment.',
    accent: 'teal',
  },
  {
    icon: DollarSign,
    title: 'Capital Mobilization Advisory',
    tagline: 'Prepare. Position. Raise.',
    description: 'We prepare enterprises for fundraising, position them for investors, and support capital-raising strategies.',
    accent: 'orange',
  },
  {
    icon: Cpu,
    title: 'Technology Needs Assessment',
    tagline: 'Identify. Integrate. Innovate.',
    description: 'Identifying the right technology solutions and integrating them to drive innovation and competitive advantage.',
    accent: 'teal',
  },
  {
    icon: Search,
    title: 'Opportunity Discovery & Value Identification',
    tagline: 'Discover. Evaluate. Unlock.',
    description: 'Systematically discovering market opportunities and identifying where enterprises can unlock the most value.',
    accent: 'orange',
  },
  {
    icon: Lightbulb,
    title: 'Corporate Entrepreneurship',
    tagline: 'Ideate. Develop. Commercialize.',
    description: 'Fostering an entrepreneurial mindset within organizations to ideate, develop and commercialize new ventures.',
    accent: 'teal',
  },
  {
    icon: Handshake,
    title: 'Partnership Development & Value Networking',
    tagline: 'Connect. Collaborate. Grow.',
    description: 'Building strategic partnerships and value networks that open doors to new markets, resources and opportunities.',
    accent: 'orange',
  },
  {
    icon: Package,
    title: 'Project Development & Packaging',
    tagline: 'Conceptualize. Develop. Launch.',
    description: 'End-to-end project development from concept to launch — packaged for impact, investment and implementation.',
    accent: 'teal',
  },
];

export default function HomeServicesPreview() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
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
            Strategic advisory, research and enterprise development support to help you navigate, innovate, seize opportunities and grow sustainably.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 flex flex-col group hover:border-white/15 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 transition-all duration-300 ${
                service.accent === 'orange'
                  ? 'text-accent-orange group-hover:shadow-[0_0_20px_rgba(255,123,0,0.2)]'
                  : 'text-accent-teal group-hover:shadow-[0_0_20px_rgba(0,210,255,0.2)]'
              }`}>
                <service.icon size={20} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight leading-snug">{service.title}</h3>
              <p className={`text-[11px] font-bold tracking-wide mb-3 ${service.accent === 'orange' ? 'text-accent-orange' : 'text-accent-teal'}`}>
                {service.tagline}
              </p>
              <p className="text-text-muted text-[12px] sm:text-[13px] leading-relaxed flex-grow">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-accent-orange text-sm font-semibold hover:gap-3 transition-all"
          >
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
