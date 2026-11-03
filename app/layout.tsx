import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import { LanguageProvider } from "@/components/Language";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "L’Atelier N°04 · Marbella",
  description:
    "Coiffure homme à Marbella. Dégradés, barbes et textures, dans un salon calme. Sur rendez-vous.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "L’Atelier N°04 · Marbella",
    description: "Coiffure homme à Marbella. Dégradés, barbes, textures. Sur rendez-vous.",
    images: ["/photos/facade.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121211",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
