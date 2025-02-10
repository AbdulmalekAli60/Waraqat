import EditProfile from "@/components/EditProfile";
import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";

export default function page() {
  return (
    <ArticlesLayout>
      <EditProfile />
    </ArticlesLayout>
  );
}
