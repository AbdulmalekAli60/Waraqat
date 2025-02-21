"use client";
import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";
import WriteArticleComponent from "@/components/WriteArticleComponent";

export default function page() {
  return (
    <ArticlesLayout>
      <WriteArticleComponent/>
    </ArticlesLayout>
  );
}
