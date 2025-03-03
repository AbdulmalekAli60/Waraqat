import EditProfile from "@/components/EditProfile";
import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";

export const metadata = {
  title: "Edit Profile",
};

export default function page() {
  return (
    <ArticlesLayout>
      <EditProfile />
    </ArticlesLayout>
  );
}
