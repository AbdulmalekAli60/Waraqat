import ArticlesPageComponent from "@/components/ArticlesPageComponent";
import ArticlesLayout from "../layouts/ArticlesLayout";
import React from "react";

export const metadata = {
  title: "Articles",
};
export default function page() {
  return (
    <ArticlesLayout>
      <ArticlesPageComponent />
    </ArticlesLayout>
  );
}
