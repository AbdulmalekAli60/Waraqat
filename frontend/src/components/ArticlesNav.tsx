"use client"
import Link from 'next/link'
import React from 'react'
import DropDown_menu from "@/components/AvatarDropDown";

export default function ArticlesNav() {
  return (
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
  )
}
