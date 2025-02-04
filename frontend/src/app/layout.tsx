import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Read and Write",
  description: "Read, Write, and More!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-teal-700 flex justify-around items-center h-14 p-2">
          <div className=" w-1/2 ml-10 text-white ">
            <Link href={"/"}>
              <h1 className="font-bold text-4xl">Waraqat</h1>
            </Link>
          </div>
          {/* Button container */}
          <div className="w-1/2  flex justify-end gap-2 mr-10">
            <Link href={"/signin"}>
              <Button>Sign in</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Join</Button>
            </Link>
          </div>
          {/* Button container */}
        </nav>
        {children}
      </body>
    </html>
  );
}
