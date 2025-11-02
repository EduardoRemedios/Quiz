import type { Metadata } from 'next';
import './globals.css';
import { StoreHydration } from '@/components/StoreHydration';

export const metadata: Metadata = {
  title: 'Symphony Quiz',
  description: 'Mobile-first team quiz game',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Symphony Quiz',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e7f4f" />
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <body className="bg-bg-primary text-text-primary">
        <StoreHydration />
        {children}
      </body>
    </html>
  );
}
