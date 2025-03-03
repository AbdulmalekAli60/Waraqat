"use client"
import ArticlesNav from "@/components/ArticlesNav";
import React from "react";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ArticlesNav/>
    <main>{children}</main>
  </>
  );
}


