import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { CartProvider } from '@/components/CartContext';
import { ToastProvider } from '@/components/Toast';

function getValidUrl(urlStr?: string): URL {
  if (!urlStr) return new URL('https://vihanadesigns.com');
  let trimmed = urlStr.trim().replace(/^["']|["']$/g, '');
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  try {
    return new URL(trimmed);
  } catch {
    return new URL('https://vihanadesigns.com');
  }
}

export const metadata: Metadata = {
  metadataBase: getValidUrl(process.env.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'VIHANA DESIGNS — Premium Digital Products & Creative Technology Studio',
    template: '%s | VIHANA DESIGNS',
  },
  description:
    'We create digital experiences, thoughtful resources, Notion workspaces, and bespoke websites that help ideas become reality.',
  keywords: [
    'Vihana Designs',
    'digital products India',
    'website development',
    'business websites',
    'landing page design',
    'portfolio websites',
    'digital templates',
    'Notion templates',
    'web application development',
  ],
  authors: [{ name: 'VIHANA DESIGNS' }],
  creator: 'VIHANA DESIGNS',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vihanadesigns.com',
    title: 'VIHANA DESIGNS — Premium Digital Products & Creative Technology Studio',
    description:
      'We create digital experiences, thoughtful resources, Notion workspaces, and bespoke websites that help ideas become reality.',
    siteName: 'VIHANA DESIGNS',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'VIHANA DESIGNS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIHANA DESIGNS',
    description: 'Digital Creativity. Thoughtful Design. Limitless Possibilities.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#18243B] antialiased selection:bg-[#8DB9F0] selection:text-[#18243B]">
        <ToastProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
