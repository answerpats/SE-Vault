import { useState } from 'react';
import { apiFetch } from '../api';
import { UserPlus, CheckCircle, Sparkles } from 'lucide-react';

export default function MembershipSignup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      await apiFetch('members_public.php', {
        method: 'POST',
        body: { name: name.trim(), phone: phone.trim() },
      });
      setSuccess(true);
      setName('');
      setPhone('');
    } catch (err) {
      setError(err.message || 'Unable to submit. Please try again later.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-orange/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-section max-w-[520px] relative z-10">
        <div className="glass-card border-t border-t-accent-orange/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/10 blur-[50px] -translate-y-1/2 translate-x-1/2" />

          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 shadow-[0_0_16px_rgba(255,123,0,0.12)] relative z-10">
            <UserPlus className="text-accent-orange" size={26} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight relative z-10">
            Join Our Business Family
          </h2>
          <p className="text-text-muted mb-8 text-sm sm:text-base leading-relaxed relative z-10">
            Become a member and gain access to exclusive resources, templates, and priority support.
          </p>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-accent-teal/15 border border-accent-teal/25 flex items-center justify-center">
                <CheckCircle className="text-accent-teal" size={28} />
              </div>
              <p className="text-xl font-bold text-white">Application Submitted!</p>
              <p className="text-text-muted text-sm">We&apos;ll review your request and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left relative z-10">
              <div>
                <label className="block text-white/60 text-[11px] font-bold mb-2 tracking-[0.1em] uppercase">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wily Jack"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent-orange/60 focus:bg-white/8 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/60 text-[11px] font-bold mb-2 tracking-[0.1em] uppercase">Contact Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 0761 140132"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent-orange/60 focus:bg-white/8 transition-all"
                />
              </div>
              {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden bg-accent-orange text-white py-3.5 rounded-xl font-bold shadow-[0_0_24px_rgba(255,123,0,0.25)] transition-all disabled:opacity-50 hover:shadow-[0_0_32px_rgba(255,123,0,0.4)] mt-2"
              >
                {!loading && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />}
                <div className="relative flex items-center justify-center gap-2">
                  <Sparkles size={16} className={loading ? "animate-spin" : ""} />
                  <span className="text-sm">{loading ? 'Submitting...' : 'Sign Up for Membership'}</span>
                </div>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
