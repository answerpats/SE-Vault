import { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { Loader, Save, ChevronDown, ChevronUp } from 'lucide-react';

const heroSlideDefaults = [
  { heading: 'Empowering Businesses to Thrive', subtext: 'We are dedicated to helping businesses succeed by providing tailored support services that simplify operations, enhance efficiency, and drive sustainable growth.', ctaText: 'Explore Our Services', ctaLink: '/services' },
  { heading: 'Your Trusted Partner in Growth', subtext: 'From administration to digital transformation, our expert team delivers reliable and professional solutions so you can focus on what matters most — growing your business.', ctaText: 'View Packages', ctaLink: '/services' },
  { heading: 'Simplify. Enhance. Grow.', subtext: 'Our team is here to be your trusted partner in success. Let us handle the complexity while you lead the vision.', ctaText: 'Get Started Today', ctaLink: '/contact' },
];

const vaultDefaults = {
  vaultHeading: 'Resources That Drive Results',
  vaultSubtitle: 'Access premium templates, innovative tools, and exclusive resources curated to help your business excel.',
  vaultCat1Title: 'Business Templates',
  vaultCat1Desc: 'Ready-to-use templates for proposals, invoices, contracts, and more.',
  vaultCat2Title: 'Innovation & R&D',
  vaultCat2Desc: 'Stay ahead with the latest insights, tools, and research to drive innovation.',
  vaultCat3Title: 'Member Resources',
  vaultCat3Desc: 'Premium content, guides, and tools available exclusively to our members.',
};

export default function ManageSiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [form, setForm] = useState({
    phone: '0761 140132',
    email: 'Seandassociates@gmail.com',
    announcementText: '',
    announcementEnabled: false,
    heroSlide1Heading: '', heroSlide1Subtext: '', heroSlide1CtaText: '', heroSlide1CtaLink: '',
    heroSlide2Heading: '', heroSlide2Subtext: '', heroSlide2CtaText: '', heroSlide2CtaLink: '',
    heroSlide3Heading: '', heroSlide3Subtext: '', heroSlide3CtaText: '', heroSlide3CtaLink: '',
    ...Object.fromEntries(Object.keys(vaultDefaults).map((k) => [k, ''])),
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await apiFetch('settings.php');
        setForm((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('settings.php', { method: 'POST', body: form, auth: true });
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-12 text-text-muted">Loading settings...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Site Settings</h2>

      <form onSubmit={handleSubmit} className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-text-muted text-xs font-medium mb-1.5 block">Phone Number</label>
              <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
            </div>
            <div>
              <label className="text-text-muted text-xs font-medium mb-1.5 block">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
            </div>
          </div>
        </div>

        <div className="h-px bg-white/8" />

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Announcement Bar</h3>
          <div className="space-y-4">
            <div>
              <label className="text-text-muted text-xs font-medium mb-1.5 block">Announcement Text</label>
              <input type="text" placeholder="e.g. Special offer: 20% off all packages this month!" value={form.announcementText} onChange={(e) => setForm({ ...form, announcementText: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" checked={form.announcementEnabled} onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })} className="sr-only peer" />
                <div className="w-10 h-5 bg-white/10 border border-white/10 rounded-full peer-checked:bg-accent-orange/30 peer-checked:border-accent-orange/50 transition-all" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-text-muted rounded-full peer-checked:translate-x-5 peer-checked:bg-accent-orange transition-all" />
              </div>
              <span className="text-text-muted text-sm">Show announcement on website</span>
            </label>
          </div>
        </div>

        <div className="h-px bg-white/8" />

        <div>
          <button type="button" onClick={() => setHeroOpen(!heroOpen)} className="flex items-center justify-between w-full text-left">
            <h3 className="text-sm font-semibold text-white">Hero Slide Defaults</h3>
            {heroOpen ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
          </button>
          <p className="text-text-muted text-xs mt-1 mb-4">Edit the default text shown on homepage slides when no custom slides are added.</p>
          {heroOpen && (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => {
                const d = heroSlideDefaults[n - 1];
                return (
                  <div key={n} className="bg-bg-primary border border-white/5 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-accent-orange">Slide {n}</h4>
                    <div>
                      <label className="text-text-muted text-xs font-medium mb-1.5 block">Heading</label>
                      <input type="text" placeholder={d.heading} value={form[`heroSlide${n}Heading`]} onChange={(e) => setForm({ ...form, [`heroSlide${n}Heading`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm" />
                    </div>
                    <div>
                      <label className="text-text-muted text-xs font-medium mb-1.5 block">Subtext</label>
                      <textarea rows={2} placeholder={d.subtext} value={form[`heroSlide${n}Subtext`]} onChange={(e) => setForm({ ...form, [`heroSlide${n}Subtext`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-text-muted text-xs font-medium mb-1.5 block">Button Text</label>
                        <input type="text" placeholder={d.ctaText} value={form[`heroSlide${n}CtaText`]} onChange={(e) => setForm({ ...form, [`heroSlide${n}CtaText`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm" />
                      </div>
                      <div>
                        <label className="text-text-muted text-xs font-medium mb-1.5 block">Button Link</label>
                        <input type="text" placeholder={d.ctaLink} value={form[`heroSlide${n}CtaLink`]} onChange={(e) => setForm({ ...form, [`heroSlide${n}CtaLink`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-px bg-white/8" />

        <div>
          <button type="button" onClick={() => setVaultOpen(!vaultOpen)} className="flex items-center justify-between w-full text-left">
            <h3 className="text-sm font-semibold text-white">Value Vault Defaults</h3>
            {vaultOpen ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
          </button>
          <p className="text-text-muted text-xs mt-1 mb-4">Edit the heading, subtitle, and category cards shown in the Value Vault section.</p>
          {vaultOpen && (
            <div className="space-y-4">
              <div>
                <label className="text-text-muted text-xs font-medium mb-1.5 block">Section Heading</label>
                <input type="text" placeholder={vaultDefaults.vaultHeading} value={form.vaultHeading} onChange={(e) => setForm({ ...form, vaultHeading: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm" />
              </div>
              <div>
                <label className="text-text-muted text-xs font-medium mb-1.5 block">Section Subtitle</label>
                <textarea rows={2} placeholder={vaultDefaults.vaultSubtitle} value={form.vaultSubtitle} onChange={(e) => setForm({ ...form, vaultSubtitle: e.target.value })} className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm resize-none" />
              </div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-bg-primary border border-white/5 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-semibold text-accent-teal">Category {n}</h4>
                  <div>
                    <label className="text-text-muted text-xs font-medium mb-1.5 block">Title</label>
                    <input type="text" placeholder={vaultDefaults[`vaultCat${n}Title`]} value={form[`vaultCat${n}Title`]} onChange={(e) => setForm({ ...form, [`vaultCat${n}Title`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-medium mb-1.5 block">Description</label>
                    <textarea rows={2} placeholder={vaultDefaults[`vaultCat${n}Desc`]} value={form[`vaultCat${n}Desc`]} onChange={(e) => setForm({ ...form, [`vaultCat${n}Desc`]: e.target.value })} className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-orange text-sm resize-none" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={saving} className="bg-accent-orange hover:bg-accent-orange/80 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2">
          {saving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
          Save Settings
        </button>
      </form>
    </div>
  );
}
