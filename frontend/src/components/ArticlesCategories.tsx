"use client";

import { getAllCategoriesInterface } from "@/Interfaces/UserContextInterface";
import {
  getAllCategories,
  getCategoryById,
} from "@/services/CategoriesService";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useCreateNewArticle } from "@/context/NewArticleContext";

export default function ArticlesCategories() {
  const [allCategories, setAllCategories] = useState<
    getAllCategoriesInterface[]
  >([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { newArticleData, setNewArticleData } = useCreateNewArticle();

  useEffect(() => {
    setIsLoading(true);
    getAllCategories()
      .then((response) => {
        setAllCategories(
          response.data.map((category) => ({
            id: category?.id,
            name: category?.name,
            description: category?.description,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleCategoryClick(categoryId: number) {
    setNewArticleData({ ...newArticleData, categoryId: categoryId });
    getCategoryById(categoryId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading categories...</div>;
  }

  if (allCategories.length === 0 || (allCategories.length === 1 && allCategories[0].id === 0)) {
    return <div className="text-sm text-gray-500">No categories available</div>;
  }

  return (
    <>
      {allCategories.map((category) => (
        <Badge
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          variant={newArticleData.categoryId === category.id ? "default" : "outline"}
          className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
            newArticleData.categoryId === category.id
              ? "bg-primary hover:bg-primary/90"
              : "hover:bg-gray-100"
          }`}
        >
          {category.name}
        </Badge>
      ))}
    </>
  );
}