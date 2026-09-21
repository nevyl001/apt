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
    "Acapulco Padel Tour organiza ligas, torneos, retas, americanos y formatos especiales con seguimiento de resultados, ranking y comunidad local en Acapulco.",
  keywords: [
    "Acapulco Padel Tour",
    "pádel Acapulco",
    "ligas de pádel",
    "torneos de pádel",
    "retas de pádel",
    "ranking de pádel",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "APT — Acapulco Padel Tour",
    title: "APT — Acapulco Padel Tour",
    description:
      "Acapulco Padel Tour organiza ligas, torneos, retas, americanos y formatos especiales con seguimiento de resultados, ranking y comunidad local en Acapulco.",
    images: [{ url: "/brand/apt-icon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "APT — Acapulco Padel Tour",
    description:
      "Acapulco Padel Tour organiza ligas, torneos, retas, americanos y formatos especiales con seguimiento de resultados, ranking y comunidad local en Acapulco.",
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
