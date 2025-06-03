"use client";
import type {Metadata} from 'next';
import './globals.css';
import { GlobalHeader } from '@/components/global-header';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AuthProvider>
            <GlobalHeader />
            <main className="flex-grow container py-4 sm:py-8">
              {children}
            </main>
            <footer className="py-4 sm:py-6 text-center text-muted-foreground border-t">
              © {new Date().getFullYear()} FlavorFlow. All rights reserved.
            </footer>
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
