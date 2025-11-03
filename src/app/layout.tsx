import type { Metadata } from 'next';
import './globals.css';
import { StoreHydration } from '@/components/StoreHydration';
import { Header } from '@/components/Header';

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
        <meta name="theme-color" content="#00b34d" />
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <body className="bg-bg-primary text-text-primary h-screen overflow-hidden flex flex-col">
        {/* Italian flag-inspired top accent */}
        <div className="fixed top-0 left-0 right-0 h-2 z-50">
          <div className="h-full w-full flex">
            <div className="flex-1 bg-accent-green"></div>
            <div className="flex-1 bg-accent-white"></div>
            <div className="flex-1 bg-accent-red"></div>
          </div>
        </div>
        <StoreHydration />
        <div className="pt-2 flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
