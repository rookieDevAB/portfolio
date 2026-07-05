import { Bricolage_Grotesque, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/SmoothScroll';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'CS undergrad at Arya College. I build software that thinks: voice agents, adaptive EdTech platforms, browser automation.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Abhay Soni — Full Stack & AI Developer',
    template: '%s · Abhay Soni',
  },
  description,
  keywords: [
    'Abhay Soni',
    'Full Stack Developer',
    'AI Developer',
    'React',
    'Next.js',
    'Voice AI',
    'NLP',
    'Jaipur',
  ],
  authors: [{ name: 'Abhay Soni', url: 'https://github.com/rookieDevAB' }],
  creator: 'Abhay Soni',
  openGraph: {
    type: 'website',
    title: 'Abhay Soni — Full Stack & AI Developer',
    description,
    siteName: 'Abhay Soni',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Abhay Soni — Full Stack & AI Developer',
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0d1117',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <noscript>
          {/* Reveal-on-scroll elements start hidden; show them if JS is off. */}
          <style>{`.reveal{opacity:1 !important;transform:none !important} html{scroll-behavior:smooth !important}`}</style>
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
