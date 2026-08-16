import { useState } from 'react';
import { logout } from '../api';
import ManageHeroSlides from './ManageHeroSlides';
import ManagePackages from './ManagePackages';
import ManageUpdates from './ManageUpdates';
import ManageGallery from './ManageGallery';
import ManageValueVault from './ManageValueVault';
import ManageFAQ from './ManageFAQ';
import ManageMembers from './ManageMembers';
import ManageTestimonials from './ManageTestimonials';
import ManageSiteSettings from './ManageSiteSettings';
import { SlidersHorizontal, Package, Bell, ImageIcon, Vault, HelpCircle, Users, MessageSquareQuote, Settings, LogOut, Home, Menu, X } from 'lucide-react';

const tabs = [
  { id: 'hero', label: 'Hero Slides', icon: SlidersHorizontal },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'updates', label: 'Updates', icon: Bell },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'vault', label: 'Value Vault', icon: Vault },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'settings', label: 'Site Settings', icon: Settings },
];

const panels = {
  hero: ManageHeroSlides,
  packages: ManagePackages,
  updates: ManageUpdates,
  gallery: ManageGallery,
  vault: ManageValueVault,
  faqs: ManageFAQ,
  testimonials: ManageTestimonials,
  members: ManageMembers,
  settings: ManageSiteSettings,
};

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  const ActivePanel = panels[activeTab];

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-bg-secondary border-r border-white/10 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-lg font-bold text-text-primary">
            <span className="text-accent-orange">SE</span> Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-text-muted hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent-orange text-white shadow-lg shadow-accent-orange/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-accent-teal hover:bg-white/5 transition-all"
          >
            <Home size={18} /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-bg-secondary/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-primary p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-sm font-bold text-text-primary">
            <span className="text-accent-orange">SE</span> Admin
          </h1>
        </div>

        {/* Panel content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          <ActivePanel />
        </div>
      </div>
    </div>
  );
}
