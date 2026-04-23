'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass: string) => pass.length >= 6;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (!validatePassword(form.password)) newErrors.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
      const credential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(credential.user, { displayName: form.name });
      toast.success('Account created! Welcome to Odyssey.', {
        icon: '🎉',
        style: {
          borderRadius: '8px',
          background: '#10b981',
          color: '#fff',
        },
      });
      router.replace('/');
    } catch (err: any) {
      const messages: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password is too weak.',
      };
      toast.error(messages[err.code] || 'Registration failed. Please try again.', {
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
            Join Odyssey
          </h2>
          <p className="text-gray-400 max-w-md">
            Create an account to start exploring curated lifestyle products.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-2">
            Create Account
          </h1>
          <p className="text-brand-slate mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-amber hover:underline">
              Sign In
            </Link>
          </p>

          {!isFirebaseConfigured() && (
            <div className="mb-6 p-4 bg-amber/10 border border-amber text-amber text-sm rounded-lg">
              Firebase is not configured. Add your credentials to .env.local to enable authentication.
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Display Name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
            />

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

            <Input
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              icon={<Lock className="w-4 h-4" />}
            />

            <Button type="submit" loading={loading} className="w-full" disabled={!isFirebaseConfigured()}>
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}