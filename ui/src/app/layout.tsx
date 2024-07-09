import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "next-auth/react";
import AuthProvider from "@/components/providers/auth-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ride Ready",
  description: "Rent your ride",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen`}>
        <AuthProvider session={session}>
          <Navbar />
          <div className="w-full h-full pt-16 ">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
