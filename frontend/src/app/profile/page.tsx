// "use client";

import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";
import ProfilePage from "@/components/ProfilePage";

export const metadata = {
    title: "Profile Page"
  }

export default function page() {
  return (
    <ArticlesLayout>
      <ProfilePage/>
    </ArticlesLayout>
  );
}
