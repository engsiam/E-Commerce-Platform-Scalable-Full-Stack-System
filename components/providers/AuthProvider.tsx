'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/stores/authStore';
import Cookies from 'js-cookie';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = () => {
      try {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const token = await firebaseUser.getIdToken();
              Cookies.set('odyssey-auth-token', token, { expires: 1 });
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              });
            } catch {
              setUser(null);
            }
          } else {
            Cookies.remove('odyssey-auth-token');
            setUser(null);
          }
          setLoading(false);
        });
      } catch {
        // Firebase not configured - skip auth
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setUser, setLoading]);

  return <>{children}</>;
}