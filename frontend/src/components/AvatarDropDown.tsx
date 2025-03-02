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

  const { currentUser, setCurrentUser } = useUserInfo();

  // event handlers
  function handleLogOutClick() {
    // log out api
    router.push("/Home");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    sessionStorage.clear();
    localStorage.clear();

    setCurrentUser({
      id: 0,
      username: "",
      name: "",
      email: "",
      bio: "",
      profileImage: undefined,
      created_at: "",
      followers: 0,
      following: 0,
      articlesCount: 0,
    });
  }
  // event handlers

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
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>

          <Link href={"/bookmarks"}>
            <DropdownMenuItem className="cursor-pointer">
              Bookmarks
            </DropdownMenuItem>
          </Link>
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
