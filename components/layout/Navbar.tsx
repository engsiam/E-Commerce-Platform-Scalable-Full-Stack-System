'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Plus, LayoutGrid, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15 } },
  exit: { opacity: 0, scale: 0.95, y: -8, transition: { duration: 0.1 } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = async () => {
    const { setUser } = useAuthStore.getState();
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#0A0E1A" strokeWidth="2" />
              <path
                d="M16 6C16 6 22 10 22 16C22 22 16 26 16 26"
                stroke="#F5A623"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3" fill="#F5A623" />
            </svg>
            <span className="font-display text-xl font-bold text-brand-navy">Odyssey</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/' ? 'text-brand-amber' : 'text-brand-slate hover:text-brand-navy'
              )}
            >
              Home
            </Link>
            <Link
              href="/items"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/items' ? 'text-brand-amber' : 'text-brand-slate hover:text-brand-navy'
              )}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/about' ? 'text-brand-amber' : 'text-brand-slate hover:text-brand-navy'
              )}
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {mounted && !authLoading && !user && (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
            {mounted && !authLoading && user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-brand-navy font-medium text-sm">
                    {getInitials(user.displayName)}
                  </div>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-brand-navy truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-brand-slate truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/items/add"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Product
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4" />
                        Manage Products
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-brand-navy" />
            ) : (
              <Menu className="w-6 h-6 text-brand-navy" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-brand-navy font-medium"
              >
                Home
              </Link>
              <Link
                href="/items"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-brand-navy font-medium"
              >
                Products
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-brand-navy font-medium"
              >
                About
              </Link>
              <hr className="border-gray-100" />
              {mounted && !authLoading && !user && (
                <div className="space-y-2 pt-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-start">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
              {mounted && !authLoading && user && (
                <div className="space-y-2 pt-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-brand-navy">{user.displayName || 'User'}</p>
                    <p className="text-xs text-brand-slate">{user.email}</p>
                  </div>
                  <Link href="/items/add" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                  <Link href="/items/manage" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <LayoutGrid className="w-4 h-4 mr-2" />
                      Manage Products
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}