// "use client";
import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";
import WriteArticleComponent from "@/components/WriteArticleComponent";

export const metadata = {
  title: "Write Article"
}
export default function page() {
  return (
    <ArticlesLayout>
      <WriteArticleComponent/>
    </ArticlesLayout>
  );
}
