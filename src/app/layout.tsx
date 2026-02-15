import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested/suggested
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mavericko | Verified Job Discovery",
  description: "Aggregating data from verified sources and filtering it for you.",
  icons: {
    icon: '/mavericko_logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
