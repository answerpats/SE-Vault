import { useState } from 'react';
import { login } from '../api';
import { Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-bg-card border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-accent-orange/20 flex items-center justify-center mb-4">
            <Lock className="text-accent-orange" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
          <p className="text-text-muted text-sm mt-1">S.E &amp; Associates</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-orange hover:bg-accent-orange/80 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-text-muted hover:text-accent-orange text-sm transition-colors">
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
