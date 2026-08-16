import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';

const defaults = {
  announcementText: '',
  announcementEnabled: false,
  phone: '0761 140132',
  email: 'Sevault@gmail.com',
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await apiFetch('settings.php');
      setSettings({ ...defaults, ...data });
    } catch (err) {
      console.error('Error fetching site settings:', err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSettings = async (data) => {
    await apiFetch('settings.php', { method: 'POST', body: data, auth: true });
    await fetchSettings();
  };

  return { settings, loading, updateSettings };
}
