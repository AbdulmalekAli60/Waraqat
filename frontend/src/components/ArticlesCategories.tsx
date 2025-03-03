"use client";

import { getAllCategoriesInterface, SelectedCategoryProps } from "@/Interfaces/Interfaces";
import {
  getAllCategories,
  getCategoryById,
} from "@/services/CategoriesService";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useCreateNewArticle } from "@/context/NewArticleContext";



export default function ArticlesCategories({
  setSelectedCategory,
}: SelectedCategoryProps) {
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

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
    
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(0);
      if (setSelectedCategory) {
        setSelectedCategory(0);
      }
      setNewArticleData({ ...newArticleData, categoryId: 0 });
    } else {
      
      setSelectedCategoryId(categoryId);
      if (setSelectedCategory) {
        setSelectedCategory(categoryId);
      }
      setNewArticleData({ ...newArticleData, categoryId: categoryId });

      getCategoryById(categoryId)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading categories...</div>;
  }

  if (
    allCategories.length === 0 ||
    (allCategories.length === 1 && allCategories[0].id === 0)
  ) {
    return <div className="text-sm text-gray-500">No categories available</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* "All" category option */}
      <Badge
        key="all"
        onClick={() => handleCategoryClick(0)}
        variant={selectedCategoryId === 0 ? "default" : "outline"}
        className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
          selectedCategoryId === 0
            ? "bg-primary hover:bg-primary/90"
            : "hover:bg-gray-100"
        }`}
      >
        All
      </Badge>

      {allCategories.map(
        (category) =>
          category.id !== 0 && (
            <Badge
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              variant={
                selectedCategoryId === category.id ? "default" : "outline"
              }
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                selectedCategoryId === category.id
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </Badge>
          )
      )}
    </div>
  );
}
