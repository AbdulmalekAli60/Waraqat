"use client"
import ArticlesNav from "@/components/ArticlesNav";

// import { useRouter } from "next/navigation";
import React from "react";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const router = useRouter();

  // useEffect(() => {
   
  //   const isAuthenticated = false; 
  //   if (!isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [router]);

  return (
    <>
      <ArticlesNav/>
    <main>{children}</main>
  </>
  );
}


