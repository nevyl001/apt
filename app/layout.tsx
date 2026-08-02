import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AptNavbar } from "@/components/apt/AptNavbar";
import { AptFooter } from "@/components/apt/AptFooter";
import { ReducedMotionProvider } from "@/components/motion/ReducedMotionProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://www.acapulcopadeltour.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "APT — Acapulco Padel Tour",
    template: "%s · APT — Acapulco Padel Tour",
  },
  description:
    "Torneos, retas, ligas y ranking de pádel en Acapulco. Comunidad conectada al ecosistema nacional Riviera Open a través de Riviera App.",
  keywords: [
    "pádel Acapulco",
    "torneos de pádel",
    "APT Acapulco Padel Tour",
    "Riviera Open",
    "ranking de pádel",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "APT — Acapulco Padel Tour",
    title: "APT — Acapulco Padel Tour",
    description:
      "Torneos, retas y competencia conectados a una experiencia nacional a través de Riviera Open.",
    images: [{ url: "/brand/apt-icon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "APT — Acapulco Padel Tour",
    description:
      "Torneos, retas y competencia conectados a una experiencia nacional a través de Riviera Open.",
  },
  icons: {
    icon: "/brand/apt-icon-32.png",
    apple: "/brand/apt-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ReducedMotionProvider>
          <AptNavbar />
          <main className="flex-1">{children}</main>
          <AptFooter />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
