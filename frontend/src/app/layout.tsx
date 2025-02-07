"use client";
import { UserContextProvider } from "@/context/UserContext";
// import SignedInUserLayOut from "./articles/layout";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import HomeNav from "@/components/HomeNav";
// export const metadata: Metadata = {
//   title: "Read and Write",
//   description: "Read, Write, and More!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
