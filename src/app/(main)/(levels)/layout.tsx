import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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

export default function LevelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-full flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="bg-white rounded-lg border shadow-sm p-6 m-2 flex-grow">
        {children}
      </div>
    </div>
  );
}