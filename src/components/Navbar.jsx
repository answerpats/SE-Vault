import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  const hasAnnouncement = settings.announcementEnabled && settings.announcementText;
  // TopBar height: 36px (info bar) + 32px (announcement bar if active)
  const topBarOffset = hasAnnouncement ? 'sm:top-[68px]' : 'sm:top-9';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Value Vault', href: '/vault' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 ${topBarOffset} left-0 right-0 w-full max-w-[100vw] z-[100] transition-all duration-500 ${
        scrolled || location.pathname !== '/'
          ? 'glass-panel shadow-lg'
          : 'bg-[#0d0b08]/90 backdrop-blur-md lg:bg-transparent'
      }`}
    >
      <div className="container-section w-full">
        <div className="flex items-center justify-between h-16 lg:h-20 w-full">
          <Link to="/" className="flex items-center gap-1 group flex-shrink-0" aria-label="S.E.VAULT — Home">
            <img
              src="/logo.png"
              alt="S.E.VAULT"
              className="h-10 sm:h-14 lg:h-16 w-auto max-w-[160px] sm:max-w-none group-hover:opacity-80 transition-opacity object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `relative text-[13px] font-semibold tracking-wide transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent-orange after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-white after:w-full'
                      : 'text-text-muted hover:text-white after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/membership"
              className="bg-accent-orange/10 border border-accent-orange/30 hover:bg-accent-orange hover:border-accent-orange text-white px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,123,0,0.3)]"
            >
              Join Our Family
            </Link>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 flex-shrink-0 ml-auto rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-accent-orange/50 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={24} className="text-accent-orange" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[550px] opacity-100 pb-5' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="-mx-5 px-5 pt-3 pb-2 space-y-1 bg-[#0a0a0c]/98 backdrop-blur-2xl border-t border-white/10 rounded-b-2xl shadow-2xl">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive ? 'text-white bg-white/10 font-semibold' : 'text-text-muted hover:text-white active:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 px-2">
              <Link
                to="/membership"
                onClick={() => setOpen(false)}
                className="block bg-accent-orange text-white text-center py-3 rounded-xl text-[15px] font-bold shadow-[0_0_20px_rgba(255,123,0,0.3)] active:opacity-90"
              >
                Join Our Family
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
