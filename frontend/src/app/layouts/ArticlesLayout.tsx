"use client"
import DropDown_menu from "@/components/AvatarDropDown";
import Link from "next/link";
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
    <nav className="bg-teal-600 flex w-full justify-around items-center h-14 p2">
      <div className="w-1/2 bg-red-400 flex justify-start ml-4">
        <Link href={"/Home"}>
          <h1 className="font-bold text-4xl text-black">Waraqat</h1>
        </Link>
      </div>
      <div className="w-1/2 bg-green-500 flex justify-end mr-4">
        <DropDown_menu />
      </div>
    </nav>
    <main>{children}</main>
  </>
  );
}


