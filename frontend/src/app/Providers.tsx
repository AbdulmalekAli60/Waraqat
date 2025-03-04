"use client";

import { UserContextProvider } from "@/context/UserContext";
import { FollowProvider } from "@/context/FollowContext";
import { NewArticleContextProvider } from "@/context/NewArticleContext";
import { AlertProvider } from "@/context/AlertContext";
import React from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <FollowProvider>
        <NewArticleContextProvider>
          <AlertProvider>{children}</AlertProvider>
        </NewArticleContextProvider>
      </FollowProvider>
    </UserContextProvider>
  );
}