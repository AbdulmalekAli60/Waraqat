"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function HomeNav() {
  const router = useRouter();
  return (
    <>
      <nav className=" flex justify-around items-center  p-2 border-b-2 border-black">
        <div className=" w-1/2 ml-10 text-white ">
          <h1
            onClick={() => router.push("/Home")}
            className="font-bold text-4xl cursor-pointer text-black"
          >
            Waraqat
          </h1>
        </div>
        {/* Button container */}
        <div className="w-1/2  flex justify-end gap-2 mr-10">
          <Button onClick={() => router.push("/articles")}>Sign in</Button>
          <Link href={"/register"}>
            <Button>Join</Button>
          </Link>
        </div>
        {/* Button container */}
      </nav>
    </>
  );
}
