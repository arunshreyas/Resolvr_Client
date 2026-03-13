import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import UserSync from './components/UserSync';
import "./globals.css";

export const metadata: Metadata = {
  title: "Resolvr. Bengaluru - Fix Your City Together",
  description: "AI-powered civic issue resolution for a smarter, cleaner city.",
};

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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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
          <UserSync />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}



