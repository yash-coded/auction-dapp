import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletProvider";
import { QueryProvider } from "@/context/QueryProvider";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auction Dapp",
  description: "A decentralized auction application",
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
        <div className="p-8">
          <QueryProvider>
            <WalletProvider>
              <Navbar />

              {children}
              <Toaster />
            </WalletProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
