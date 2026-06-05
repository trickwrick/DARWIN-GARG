import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "When Gods Must Return | Ancient Wisdom for Modern Chaos",
  description:
    "The world isn't facing one crisis. It's facing ten — simultaneously. Discover the ancient wisdom of the Dashavatar for our modern chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body className="font-body antialiased">
        <div className="deploy-test-banner" role="status">
          Site update test — this banner will be removed shortly.
        </div>
        {children}
      </body>
    </html>
  );
}
