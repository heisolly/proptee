import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Syne } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

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
      <body className={`${playfair.variable} ${space.variable} ${syne.variable} font-sans bg-brand-bg text-brand-dark antialiased selection:bg-brand-gold-pale selection:text-brand-gold`}>
        {children}
      </body>
    </html>
  );
}
