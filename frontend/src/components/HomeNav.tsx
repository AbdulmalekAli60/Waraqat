"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function HomeNav() {
  const router = useRouter();
  return (
    <div>
      <nav className="flex justify-between border-b-2 border-black 400 w-full items-center h-14 px-4">
        <div className="">
          <h1
            onClick={() => router.push("/Home")}
            className="font-bold text-4xl text-black cursor-pointer hover:opacity-80"
          >
            Waraqat
          </h1>
        </div>
        {/* Button container */}
        <div className="w-1/2  flex justify-end gap-2 mr-10">
          <Button onClick={() => router.push("/signin")}>Sign in</Button>
          <Link href={"/register"}>
            <Button>Join</Button>
          </Link>
        </div>
        {/* Button container */}
      </nav>
    </div>
  );
}
