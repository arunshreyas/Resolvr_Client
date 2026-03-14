import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Toaster } from "sonner";
import PageTransition from "./components/PageTransition";
import { BGPattern } from "@/components/ui/bg-pattern";

export const metadata: Metadata = {
  title: "Resolvr. Bengaluru | Fix Your City Together",
  description: "AI-powered civic issue resolution for a smarter, cleaner city. Report, track, and resolve urban issues in real-time.",
  keywords: ["Bengaluru", "Civic Issues", "BBMP", "BWSSB", "Governance", "Smart City", "Resolvr"],
  authors: [{ name: "Resolvr Team" }],
  openGraph: {
    title: "Resolvr. Bengaluru",
    description: "Fix Your City Together. Report urban issues and track resolution in real-time.",
    url: "https://resolvr-client.vercel.app",
    siteName: "Resolvr",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          *:not(.material-symbols-outlined) {
            font-family: 'Space Grotesk', sans-serif !important;
          }
        ` }} />
      </head>
      <body className="antialiased">
        <ClerkProvider>
          <ThemeProvider>
            <Toaster position="top-right" richColors closeButton />
            <PageTransition>
              <BGPattern
                variant="grid"
                mask="none"
                size={40}
                fill="rgba(132,147,74,0.12)"
                className="pointer-events-none fixed inset-0 z-[-1]"
              />
              {children}
            </PageTransition>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
