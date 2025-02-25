"use client";
import { GetArticles } from "@/Interfaces/UserContextInterface";
import { getArticleById } from "@/services/ArticlesService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ArticleComponent() {
  const [specificArticle, setSpecificArticle] = useState<GetArticles | null>(
    null
  );
  const { id } = useParams();
  useEffect(() => {
    getArticleById(Number(id))
      .then((response) => {
        setSpecificArticle(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <div>
      here wh show a specific article
      {specificArticle?.content}
    </div>
  );
}
