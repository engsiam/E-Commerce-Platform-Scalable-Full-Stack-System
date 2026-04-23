'use client';

import Link from 'next/link';
import { Mail, Twitter, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!');
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#F5A623" strokeWidth="2" />
                <path
                  d="M16 6C16 6 22 10 22 16C22 22 16 26 16 26"
                  stroke="#F5A623"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="3" fill="#F5A623" />
              </svg>
              <span className="font-display text-xl font-bold text-white">Odyssey</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover. Desire. Own. A curated lifestyle e-commerce experience for those who seek excellence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/items" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/items" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-amber transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers and updates straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                required
              />
              <Button variant="primary" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Odyssey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}