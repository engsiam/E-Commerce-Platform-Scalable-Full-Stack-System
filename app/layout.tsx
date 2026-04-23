import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Odyssey — Discover. Desire. Own.',
  description: 'Premium curated lifestyle products.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white text-brand-navy antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { 
              fontFamily: 'var(--font-body)', 
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
            success: { 
              iconTheme: { primary: '#10b981', secondary: '#fff' },
              style: {
                borderRadius: '8px',
                background: '#10b981',
                color: '#fff',
              },
            },
            error: { 
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
              style: {
                borderRadius: '8px',
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}