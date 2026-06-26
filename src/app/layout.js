import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-barlow',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow-condensed',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-mono',
});

export const metadata = {
  title: 'Abhay Soni — Full Stack & AI Developer',
  description: 'CS undergrad at Arya College. I build software that thinks: voice agents, adaptive EdTech platforms, browser automation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
