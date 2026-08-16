import { Phone, Mail, Megaphone, MapPin, Clock, ExternalLink, MessageCircle, Globe } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

export default function TopBar() {
  const { settings } = useSiteSettings();

  return (
    <div className="hidden sm:block fixed top-0 left-0 right-0 z-[101]">
      {/* Announcement bar - only shows when enabled */}
      {settings.announcementEnabled && settings.announcementText && (
        <div className="bg-accent-orange/10 border-b border-accent-orange/20">
          <div className="container-section h-8 flex items-center justify-center gap-2">
            <Megaphone size={12} className="text-accent-orange flex-shrink-0" />
            <span className="text-[11px] text-accent-orange font-medium truncate">
              {settings.announcementText}
            </span>
          </div>
        </div>
      )}

      {/* Top info bar */}
      <div className="bg-bg-secondary/95 backdrop-blur-sm border-b border-white/5">
        <div className="container-section h-9 flex items-center justify-between">
          {/* Left - Contact info */}
          <div className="flex items-center gap-4 lg:gap-5">
            <a
              href={`tel:+256${settings.phone?.replace(/\s/g, '').replace(/^0/, '')}`}
              className="flex items-center gap-1.5 text-text-muted hover:text-accent-orange transition-colors text-[11px]"
            >
              <Phone size={11} className="text-accent-orange" />
              <span>{settings.phone}</span>
            </a>
            <div className="w-px h-3 bg-white/10" />
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 text-text-muted hover:text-accent-orange transition-colors text-[11px]"
            >
              <Mail size={11} className="text-accent-orange" />
              <span className="hidden md:inline">{settings.email}</span>
              <span className="md:hidden">Email Us</span>
            </a>
            <div className="w-px h-3 bg-white/10 hidden lg:block" />
            <div className="hidden lg:flex items-center gap-1.5 text-text-muted text-[11px]">
              <MapPin size={11} className="text-accent-teal" />
              <span>Kampala, Uganda</span>
            </div>
            <div className="w-px h-3 bg-white/10 hidden xl:block" />
            <div className="hidden xl:flex items-center gap-1.5 text-text-muted text-[11px]">
              <Clock size={11} className="text-accent-teal" />
              <span>Mon - Fri: 8AM - 6PM</span>
            </div>
          </div>

          {/* Right - Social links */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-text-muted/50 hidden lg:block mr-1">Follow Us:</span>
            <a
              href="https://www.linkedin.com/in/ssekaayielvis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-[#0077b5] transition-colors"
              aria-label="LinkedIn"
            >
              <ExternalLink size={13} />
            </a>
            <a
              href="https://wa.me/256761140132"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={13} />
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-[#1877F2] transition-colors"
              aria-label="Website"
            >
              <Globe size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
