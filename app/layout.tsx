import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryClientProvider";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/providers/CartProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriLens",
  description: "Explore Food Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
        <QueryProvider>
            <CartProvider>
              <Navbar />
              <div className="pt-25">{children}</div>
            </CartProvider>
        </QueryProvider>
        </Suspense>
        
      </body>
    </html>
  );
}
