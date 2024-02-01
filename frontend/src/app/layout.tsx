import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SyncContextProvider } from '@/data/useSync';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "To-don't list",
  description: "You haven't done anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <SyncContextProvider>
        <body className={inter.className}>{children}</body>
      </SyncContextProvider>
    </html>
  );
}
