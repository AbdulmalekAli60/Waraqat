"use client"
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function HomeNav() {
  const router = useRouter();
  return (
    <>
      <nav className=" flex justify-around items-center h-14 p-2 border border-black">
        <div className=" w-1/2 ml-10 text-white ">
          <Link href={"/Home"}>
            <h1 className="font-bold text-4xl text-black">Waraqat</h1>
          </Link>
        </div>
        {/* Button container */}
        <div className="w-1/2  flex justify-end gap-2 mr-10">
          {/* <Link href={"/signin"}> */}
          <Button onClick={() => router.push("/articles")}>Sign in</Button>
          {/* </Link> */}
          <Link href={"/register"}>
            <Button>Join</Button>
          </Link>
        </div>
        {/* Button container */}
      </nav>
    </>
  );
}
