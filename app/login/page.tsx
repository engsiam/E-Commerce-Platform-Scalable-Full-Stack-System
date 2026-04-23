'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== ''
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass: string) => pass.length >= 6;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (!validatePassword(form.password)) newErrors.password = 'Minimum 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isFirebaseConfigured()) {
      toast.error('Firebase is not configured. Please add your Firebase credentials.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success('Welcome back!', {
        icon: '👋',
        style: {
          borderRadius: '8px',
          background: '#10b981',
          color: '#fff',
        },
      });
      router.replace('/');
    } catch (err: any) {
      const messages: Record<string, string> = {
        'auth/user-not-found': 'No account with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests': 'Too many attempts. Try again later.',
      };
      toast.error(messages[err.code] || 'Login failed.', {
        style: {
          borderRadius: '8px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured()) {
      toast.error('Firebase is not configured. Please add your Firebase credentials.', {
        style: {
          borderRadius: '8px',
          background: '#ef4444',
          color: '#fff',
        },
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google!', {
        icon: '🎉',
        style: {
          borderRadius: '8px',
          background: '#10b981',
          color: '#fff',
        },
      });
      router.replace('/');
    } catch {
      toast.error('Google sign-in failed. Please try again.', {
        style: {
          borderRadius: '8px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex"
    >
      <div className="hidden lg:flex lg:w-1/2 bg-brand-navy relative items-center justify-center p-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center">
          <svg className="w-24 h-24 mx-auto mb-8" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#F5A623" strokeWidth="2" />
            <path
              d="M16 6C16 6 22 10 22 16C22 22 16 26 16 26"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="3" fill="#F5A623" />
          </svg>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-400 max-w-md">
            Sign in to access your account and manage your products.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-2">
            Sign In
          </h1>
          <p className="text-brand-slate mb-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-brand-amber hover:underline">
              Register
            </Link>
          </p>

          {!isFirebaseConfigured() && (
            <div className="mb-6 p-4 bg-amber/10 border border-amber text-amber text-sm rounded-lg">
              Firebase is not configured. Add your credentials to .env.local to enable authentication.
            </div>
          )}

          <div className="space-y-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading || !isFirebaseConfigured()}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-brand-slate">or</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
            />

            <Button type="submit" loading={loading} className="w-full" disabled={!isFirebaseConfigured()}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}