import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "@/styles/globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Proptee | Premium Real Estate",
  description: "Experience luxury living with curated premium properties worldwide. Discover your next prestigious address.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} font-sans bg-brand-bg text-brand-dark antialiased`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
