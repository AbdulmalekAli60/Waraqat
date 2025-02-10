"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserInfo } from "@/context/UserContext";

export default function AvatarDropDown() {
  const router = useRouter();

  const {currentUser} = useUserInfo()

  // event handlers
  function handleLogOutClick() {
    // log out api
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    router.push("/Home");
  }
  // event handlers
// src="https://github.com/shadcn.png"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={currentUser?.profileImage} />
          <AvatarFallback>Its You</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"profile"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="cursor-pointer">
            Bookmarks
          </DropdownMenuItem>

          {/* <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogOutClick}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
