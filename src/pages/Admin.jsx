import { useState, useEffect } from 'react';
import { checkAuth, isLoggedIn } from '../api';
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isLoggedIn()) {
        const valid = await checkAuth();
        setAuthenticated(valid);
      }
      setChecking(false);
    };
    verify();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}
