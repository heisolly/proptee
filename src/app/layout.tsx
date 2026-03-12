import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Dancing_Script } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting",
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
      <body className={`${playfair.variable} ${space.variable} ${dancing.variable} font-sans bg-brand-bg text-brand-dark antialiased selection:bg-brand-gold-pale selection:text-brand-gold`}>
        {children}
      </body>
    </html>
  );
}
