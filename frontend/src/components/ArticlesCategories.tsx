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

  const { newArticleData, setNewArticleData } = useCreateNewArticle();

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        console.log(
          "all categories: ",
          response.data.map((cate) => cate.name)
        );
        setAllCategories(
          response.data.map((category) => ({
            id: category?.id,
            name: category?.name,
            description: category?.description,
          }))
        );
        console.log("all categories stata: ", allCategories);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <>
      {allCategories.map((category) => (
        <Badge
          onClick={() => handleCategoryClick(category.id)}
          className="p-2 cursor-pointer"
          key={category.id}
        >
          {category.name}
        </Badge>
      ))}
    </>
  );
}
