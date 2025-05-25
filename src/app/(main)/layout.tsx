import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutClientWrapper from './LayoutClientWrapper'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLASSIK - Gestion scolaire",
  description: "Espace de gestion des niveaux et paramètres de l'application Classiq.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <LayoutClientWrapper>
        {children}
      </LayoutClientWrapper>
    </div>
  );
}