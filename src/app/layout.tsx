import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-marathi",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "शेळीपालन - गावातल्या शेळ्या/बोकड एका ठिकाणी",
  description: "शेतकरी आणि खातिकसाठी शेळीपालन डिरेक्टरी",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${notoDevanagari.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-orange-50">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
