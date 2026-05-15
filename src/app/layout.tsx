import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAgent from "@/components/ui/FloatingAgent";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legalis Argentina | Plataforma LegalTech de Próxima Generación",
  description: "Crea contratos inteligentes adaptados al CCyC en minutos. Automatización, firma electrónica y gestión legal eficiente para el mercado argentino.",
  keywords: ["contratos", "legaltech argentina", "firma electronica", "CCyC", "abogados", "inmobiliarias"],
  authors: [{ name: "Legalis Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}>
        <FloatingAgent />
        <Providers>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
