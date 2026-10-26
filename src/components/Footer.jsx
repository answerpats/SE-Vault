import { Link } from 'react-router-dom';
import { Phone, Mail, ExternalLink, MessageCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Insights', to: '/insights' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Value Vault', to: '/vault' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const socials = [
  { icon: Phone, label: '0761 140132', href: 'tel:+256761140132', hoverColor: 'hover:text-accent-orange hover:border-accent-orange/40' },
  { icon: Mail, label: 'Sevault@gmail.com', href: 'mailto:Sevault@gmail.com', hoverColor: 'hover:text-accent-teal hover:border-accent-teal/40', truncate: true },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/256761140132', hoverColor: 'hover:text-[#25D366] hover:border-[#25D366]/40' },
];

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-white/5 border-b-0 border-x-0 mt-10 sm:mt-16">
      <div className="container-section">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="S.E.VAULT — Home">
              <img src="/logo.png" alt="S.E.VAULT" className="h-14 w-auto hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed max-w-xs">
              Dedicated to helping businesses thrive through tailored professional support services in Uganda and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold text-white mb-4 uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-text-muted hover:text-white text-[13px] sm:text-sm transition-colors inline-flex items-center gap-2 group">
                    <span className="w-0 h-px bg-accent-orange transition-all duration-200 group-hover:w-2.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="hidden sm:block">
            <h4 className="text-[11px] sm:text-xs font-bold text-white mb-4 uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-2.5 text-text-muted text-[13px] sm:text-sm">
              <li>Enterprise Development</li>
              <li>Capital Mobilization</li>
              <li>Feasibility Studies</li>
              <li>Partnership Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold text-white mb-4 uppercase tracking-[0.2em]">Get in Touch</h4>
            <div className="space-y-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-text-muted hover:text-white transition-colors text-[13px] sm:text-sm group"
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 transition-all ${s.hoverColor}`}>
                    <s.icon size={13} />
                  </div>
                  <span className={s.truncate ? 'truncate' : ''}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted/70 text-xs">&copy; {new Date().getFullYear()} S.E.VAULT All rights reserved.</p>
          <p className="text-text-muted/40 text-[10px] tracking-wide">Empowering businesses across Uganda</p>
        </div>
      </div>
    </footer>
  );
}
