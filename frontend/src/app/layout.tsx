/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { UserContextProvider } from "@/context/UserContext";
// import SignedInUserLayOut from "./articles/layout";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { FollowProvider } from "@/context/FollowContext";
import { NewArticleContextProvider } from "@/context/NewArticleContext";
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
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/signin"); // Redirect if not authenticated
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
      <UserContextProvider>
          <FollowProvider>
            <NewArticleContextProvider>
              {children}
            </NewArticleContextProvider>
          </FollowProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
