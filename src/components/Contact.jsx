import { Phone, Mail, ExternalLink, MessageCircle, Calendar } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '0761 140132 / 0743 820775', href: 'tel:+256761140132' },
  { icon: Mail, label: 'Email Us', value: 'Seandassociates@gmail.com', href: 'mailto:Seandassociates@gmail.com' },
  { icon: ExternalLink, label: 'LinkedIn', value: 'Connect with us', href: 'https://www.linkedin.com/in/ssekaayielvis' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'S.E', href: 'https://wa.me/256761140132' },
];

export default function Contact() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-teal/[0.04] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container-section relative z-10">
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <span className="text-accent-teal text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
            Let&apos;s Build Something <span className="text-gradient">Great Together</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Ready to take your business to the next level? Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-20">
          {contactInfo.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 sm:p-7 text-center group block"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 group-hover:bg-accent-teal/15 group-hover:border-accent-teal/40 transition-all duration-300">
                <c.icon className="text-accent-teal" size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{c.label}</h3>
              <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed group-hover:text-white/80 transition-colors">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="mailto:Seandassociates@gmail.com?subject=Appointment%20Request"
            className="group relative inline-flex items-center gap-2 bg-accent-orange text-white px-7 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm font-bold shadow-[0_0_24px_rgba(255,123,0,0.25)] transition-all hover:shadow-[0_0_32px_rgba(255,123,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            <Calendar size={18} className="relative z-10" />
            <span className="relative z-10">Book an Appointment</span>
          </a>
        </div>
      </div>
    </section>
  );
}
