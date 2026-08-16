import { useEffect, useState, useRef } from 'react';
import { apiFetch } from '../api';
import {
  FileText, Lightbulb, Users, Download, AlertTriangle,
  Loader, Lock, Phone, X, LogOut, CheckCircle, Eye, EyeOff, BookOpen,
} from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';
import useMemberSession from '../hooks/useMemberSession';

/* ─── Category config ─────────────────────────────────────── */
const CATEGORY_CONFIG = [
  {
    key: 'Business Templates',
    icon: FileText,
    accent: 'orange',
    description: 'Ready-to-use templates for proposals, invoices, contracts, and more.',
  },
  {
    key: 'Innovation & R&D',
    icon: Lightbulb,
    accent: 'teal',
    description: 'Stay ahead with the latest insights, tools, and research to drive innovation.',
  },
  {
    key: 'Member Resources',
    icon: Users,
    accent: 'white',
    description: 'Premium content, guides, and tools available exclusively to our members.',
  },
];

const accentCfg = {
  orange: { iconColor: 'text-accent-orange', glow: 'shadow-[0_0_16px_rgba(255,123,0,0.15)]', ring: 'border-accent-orange/40', badge: 'bg-orange-500/20 text-orange-300' },
  teal:   { iconColor: 'text-accent-teal',   glow: 'shadow-[0_0_16px_rgba(0,210,255,0.15)]', ring: 'border-accent-teal/40',   badge: 'bg-teal-500/20 text-teal-300'   },
  white:  { iconColor: 'text-white',          glow: 'shadow-[0_0_16px_rgba(255,255,255,0.12)]', ring: 'border-white/20',       badge: 'bg-white/10 text-white/70'       },
};

const defaultHeading = 'Resources That Drive Results';
const defaultSubtitle = 'Access premium templates, innovative tools, and exclusive resources curated to help your business excel.';

/* ─── Phone Login Modal ───────────────────────────────────── */
function LoginModal({ onClose, onSuccess }) {
  const { login } = useMemberSession();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPhone, setShowPhone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) { setError('Please enter your phone number.'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await login(phone);
      onSuccess(data.name);
    } catch (err) {
      setError(err.message || 'Unable to verify. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-bg-secondary border border-white/10 rounded-2xl p-7 shadow-2xl animate-fade-in-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(255,123,0,0.15)]">
          <Phone className="text-accent-orange" size={24} />
        </div>

        <h3 className="text-xl font-extrabold text-white text-center mb-1">Member Access</h3>
        <p className="text-text-muted text-sm text-center mb-6 leading-relaxed">
          Enter the phone number you registered with to unlock exclusive resources.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-[11px] font-bold mb-2 tracking-[0.1em] uppercase">
              Registered Phone Number
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPhone ? 'text' : 'tel'}
                placeholder="e.g. 0761 140132"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-accent-orange/60 focus:bg-white/8 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPhone(!showPhone)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
              >
                {showPhone ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-xs leading-relaxed">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-orange hover:bg-accent-orange/80 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,123,0,0.2)] hover:shadow-[0_0_28px_rgba(255,123,0,0.35)] flex items-center justify-center gap-2"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Lock size={16} />}
            {loading ? 'Verifying...' : 'Unlock Resources'}
          </button>
        </form>

        <p className="text-center text-text-muted text-xs mt-5 leading-relaxed">
          Not a member yet?{' '}
          <a href="/membership" className="text-accent-teal hover:underline">Sign up here</a>
          {' '}and wait for approval.
        </p>
      </div>
    </div>
  );
}

/* ─── Article Modal Reader ────────────────────────────────── */
function ArticleModal({ item, onClose }) {
  if (!item) return null;
  const articleBody = item.content || item.description || 'No detailed content provided for this resource.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-bg-secondary border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <span className="text-accent-teal text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <BookOpen size={14} /> {item.category || 'Member Resource'}
          </span>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {item.image_url && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-white/10">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">{item.title}</h2>
            {item.description && item.content && (
              <p className="text-accent-teal/90 text-sm sm:text-base font-medium italic border-l-2 border-accent-teal pl-3 py-1 mb-4">
                {item.description}
              </p>
            )}
          </div>

          <div className="text-text-primary text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-white/10 pt-4">
            {articleBody}
          </div>

          {item.pdf_url && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 bg-accent-teal/5 p-4 rounded-xl border border-accent-teal/20">
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Downloadable Attachment</p>
                <p className="text-text-muted text-xs">Official PDF document attached to this resource.</p>
              </div>
              <a
                href={item.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/80 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Locked Resource Card ────────────────────────────────── */
function LockedCard({ item, onUnlock }) {
  return (
    <div
      className="glass-card rounded-2xl overflow-hidden flex flex-col relative cursor-pointer group"
      onClick={onUnlock}
    >
      {item.image_url && (
        <div className="overflow-hidden h-44 sm:h-48 relative">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover filter blur-sm brightness-50 transition-all duration-500 group-hover:blur-[2px]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Lock size={18} className="text-white" />
            </div>
          </div>
        </div>
      )}
      <div className="p-5 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-start gap-3 mb-3">
          {!item.image_url && (
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Lock size={16} className="text-text-muted" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1 leading-snug">{item.title}</h4>
            <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed line-clamp-2 select-none">
              {item.description}
            </p>
          </div>
        </div>
        <button
          className="mt-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-accent-orange/10 hover:border-accent-orange/40 text-text-muted hover:text-accent-orange px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:border-white/20"
          onClick={onUnlock}
        >
          <Lock size={14} /> Members Only – Login to Access
        </button>
      </div>
    </div>
  );
}

/* ─── Unlocked Resource Card ──────────────────────────────── */
function UnlockedCard({ item, onReadMore }) {
  const hasPdf = !!item.pdf_url;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col ring-1 ring-accent-teal/15">
      {item.image_url && (
        <div className="overflow-hidden h-44 sm:h-48">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 sm:p-7 flex flex-col flex-grow">
        <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
          {item.description || item.content}
        </p>

        <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {hasPdf && (
            <a
              href={item.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-teal/10 border border-accent-teal/30 hover:bg-accent-teal hover:text-bg-primary text-accent-teal px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              <Download size={16} /> Download
            </a>
          )}
          
          <button
            onClick={() => onReadMore(item)}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              !hasPdf
                ? 'bg-accent-teal/15 hover:bg-accent-teal hover:text-bg-primary border border-accent-teal/30 text-white'
                : 'bg-white/5 hover:bg-white/15 border border-white/8 text-text-muted hover:text-white'
            }`}
          >
            <BookOpen size={16} /> Read More
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function ValueVault() {
  const [items, setItems]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [showModal, setShowModal]     = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [welcomed, setWelcomed]         = useState(false);
  const { settings }                  = useSiteSettings();
  const { isLoggedIn, memberName, logout } = useMemberSession();

  const heading  = settings.vaultHeading  || defaultHeading;
  const subtitle = settings.vaultSubtitle || defaultSubtitle;

  // Merge admin-editable category text from site settings
  const categories = CATEGORY_CONFIG.map((cat, i) => ({
    ...cat,
    title:       settings[`vaultCat${i + 1}Title`] || cat.key,
    description: settings[`vaultCat${i + 1}Desc`]  || cat.description,
  }));

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch('value_vault.php');
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching value vault:', err.message);
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  const handleLoginSuccess = (name) => {
    setShowModal(false);
    setWelcomed(true);
    setTimeout(() => setWelcomed(false), 4000);
  };

  // Group items by category key
  const grouped = {};
  CATEGORY_CONFIG.forEach(({ key }) => { grouped[key] = []; });
  items.forEach((item) => {
    const k = item.category || 'Business Templates';
    if (grouped[k]) grouped[k].push(item);
    else grouped['Business Templates'].push(item);
  });

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-teal/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Member login modal */}
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          item={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <div className="container-section relative z-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <span className="text-accent-teal text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">Value Vault</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">{heading}</h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">{subtitle}</p>
        </div>

        {/* Member session bar */}
        {isLoggedIn ? (
          <div className="flex items-center justify-between gap-4 bg-accent-teal/10 border border-accent-teal/20 rounded-2xl px-5 py-3.5 mb-10 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-teal/20 border border-accent-teal/30 flex items-center justify-center">
                <CheckCircle size={16} className="text-accent-teal" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Welcome back, {memberName}!</p>
                <p className="text-text-muted text-xs">You have full access to all member resources.</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-text-muted hover:text-red-400 text-xs font-medium transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 bg-white/3 border border-white/8 rounded-2xl px-5 py-3.5 mb-10 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock size={15} className="text-text-muted" />
              </div>
              <div>
                <p className="text-white/80 font-semibold text-sm">Members-Only Resources</p>
                <p className="text-text-muted text-xs">Login with your registered phone number to access all resources.</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-accent-orange hover:bg-accent-orange/80 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_16px_rgba(255,123,0,0.2)] hover:shadow-[0_0_24px_rgba(255,123,0,0.35)] whitespace-nowrap"
            >
              Member Login
            </button>
          </div>
        )}

        {/* Welcome toast */}
        {welcomed && (
          <div className="fixed bottom-6 right-6 z-50 bg-accent-teal text-bg-primary px-5 py-3 rounded-2xl font-semibold text-sm shadow-xl flex items-center gap-2 animate-fade-in-up">
            <CheckCircle size={16} /> Resources unlocked! Welcome, {memberName}.
          </div>
        )}

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-8">
            <Loader className="animate-spin mx-auto text-text-muted" size={24} />
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-text-muted flex items-center justify-center gap-2">
            <AlertTriangle size={18} /> Unable to load resources.
          </div>
        )}

        {/* Categories with their resources */}
        {!loading && !error && (
          <div className="space-y-16 sm:space-y-20">
            {categories.map((cat) => {
              const cfg       = accentCfg[cat.accent];
              const catItems  = grouped[cat.key] || [];

              return (
                <div key={cat.key}>
                  {/* Category header card */}
                  <div className="flex items-center gap-5 mb-8 sm:mb-10">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center ${cfg.glow}`}>
                      <cat.icon className={cfg.iconColor} size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{cat.title}</h3>
                      <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed mt-0.5">{cat.description}</p>
                    </div>
                    <div className={`ml-auto hidden sm:block px-3 py-1 rounded-full text-xs font-semibold border ${cfg.badge} ${cfg.ring}`}>
                      {catItems.length} resource{catItems.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Resource cards for this category */}
                  {catItems.length === 0 ? (
                    <div className="glass-card rounded-2xl p-8 text-center text-text-muted text-sm border border-dashed border-white/10">
                      No resources added yet for this category.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                      {catItems.map((item) =>
                        isLoggedIn ? (
                          <UnlockedCard
                            key={item.id}
                            item={item}
                            onReadMore={(article) => setSelectedArticle(article)}
                          />
                        ) : (
                          <LockedCard
                            key={item.id}
                            item={item}
                            onUnlock={() => setShowModal(true)}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
