import ArticlesPageComponent from "@/components/ArticlesPageComponent";
import React from "react";
import ArticlesLayout from "@/app/layouts/ArticlesLayout";

export const metadata = {
  title: "Articles"
};
export default function page() {
  console.log("Articles page component rendering");
  return (
    <ArticlesLayout>
      <ArticlesPageComponent />
    </ArticlesLayout>
  );
}
