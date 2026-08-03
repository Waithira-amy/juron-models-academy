import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juron Models Academy",
  description: "East Africa's premier institution for discovering, nurturing, and empowering models and creative talents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* CHANGED: bg-slate-950 -> bg-slate-50, text-slate-100 -> text-slate-900 */}
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-200 flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
