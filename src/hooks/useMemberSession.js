import { useState, useCallback } from 'react';
import { apiFetch } from '../api';

const STORAGE_KEY_PHONE = 'member_phone';
const STORAGE_KEY_NAME  = 'member_name';

function readSession() {
  return {
    phone: localStorage.getItem(STORAGE_KEY_PHONE) || null,
    name:  localStorage.getItem(STORAGE_KEY_NAME)  || null,
  };
}

export default function useMemberSession() {
  const [session, setSession] = useState(readSession);

  const login = useCallback(async (phone) => {
    // Throws on error — caller handles the message
    const data = await apiFetch('member_login.php', {
      method: 'POST',
      body: { phone: phone.trim() },
    });
    localStorage.setItem(STORAGE_KEY_PHONE, phone.trim());
    localStorage.setItem(STORAGE_KEY_NAME,  data.name);
    setSession({ phone: phone.trim(), name: data.name });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_PHONE);
    localStorage.removeItem(STORAGE_KEY_NAME);
    setSession({ phone: null, name: null });
  }, []);

  return {
    isLoggedIn:  !!session.phone,
    memberName:  session.name,
    memberPhone: session.phone,
    login,
    logout,
  };
}
