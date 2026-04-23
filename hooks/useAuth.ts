'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, setUser, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Auth state is managed by AuthProvider component
    // This hook is a convenience wrapper for route guards
  }, []);

  const logout = async () => {
    const { setUser: storeSetUser } = useAuthStore.getState();
    storeSetUser(null);
    router.push('/');
  };

  return { user, logout };
}