import type React from 'react';
import '@/src/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/src/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Social Integration App</title>
        <meta name="description" content="Find your community in Sweden" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata = {
  generator: 'v0.dev',
};
