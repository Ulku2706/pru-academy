import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRU AI-Academy | Proof-of-Learning & Interactive Web3 Onboarding",
  description:
    "Piri Reis Üniversitesi Blockchain Kulübü için AI Mentor Destekli, Aşama Kilitli ve Soulbound Sertifikalı Web3 Öğrenme Platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-[#090d16] text-gray-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
