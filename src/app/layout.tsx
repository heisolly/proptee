import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Satisfy } from "next/font/google";
import "@/styles/globals.css";
import { SearchProvider } from "@/context/SearchContext";
import SearchModal from "@/components/SearchModal";

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



const handwriting = Satisfy({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
  weight: "400",
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
      <body className={`${inter.variable} ${playfair.variable} ${handwriting.variable} font-sans bg-brand-bg text-brand-dark antialiased`}>
        <SearchProvider>
          {children}
          <SearchModal />
        </SearchProvider>
      </body>
    </html>
  );
}
