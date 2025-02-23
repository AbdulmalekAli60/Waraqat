// "use client";

import ArticlesLayout from "@/app/layouts/ArticlesLayout";
import ProfilePage from "@/components/ProfilePage";
import React from "react";

export default function page() {
  return (
    <ArticlesLayout>
      <ProfilePage />
    </ArticlesLayout>
  );
}
