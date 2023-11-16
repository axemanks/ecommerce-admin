// Main layout for the app
// Global imports
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Local Imports
import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/dark-mode';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard - By Keith Scheldt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem >
          <ToasterProvider />
          <ModalProvider />
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
