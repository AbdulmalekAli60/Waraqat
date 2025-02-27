/* eslint-disable @next/next/no-img-element */
"use client";

import { Bookmark, MessageCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { GetArticles } from "@/Interfaces/UserContextInterface";
import { deleteBoomark, getAllBoomarks } from "@/services/BookMarksService";
import { useRouter } from "next/navigation";

export default function BookmarksPageComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarksData, setBookMarksData] = useState<GetArticles[] | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getAllBoomarks()
      .then((response) => {
        console.log(response);
        setBookMarksData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleArticleClick(articleId: number) {
    router.push(`/articles/${articleId}`);
  }

  function extractFirstImage(htmlContent: string) {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const firstImg = tempDiv.querySelector("img");
      //  console.log("the selected category is : ", selectedCategory)

      if (firstImg) {
        return firstImg.src;
      }

      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    } catch (error) {
      console.error("Error extracting image:", error);
      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    }
  }

  function handleBookMarkClick(
    articleId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    deleteBoomark(articleId)
      .then((response) => {
        console.log(response);
        setBookMarksData(prevData => {
          if (!prevData) return null;
          return prevData.filter(article => article.id !== articleId);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {/* Articles Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mt-2 gap-6 max-w-7xl mx-auto">
          {bookmarksData?.map((article) => (
            <Card
              onClick={() => handleArticleClick(article.id)}
              key={article.id}
              className="h-full shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="p-4 space-y-2">
                {/* Article title */}
                <div
                  className="cursor-pointer"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <h3 className="text-xl font-bold line-clamp-2">
                    {article.title}
                  </h3>
                </div>

                {/* Author and date */}
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <User size={14} />
                  <span>{article.userName}</span>
                </div>
              </CardHeader>

              {/* Article image */}
              <div
                className="relative w-full h-48 overflow-hidden mb-2 cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <img
                  loading="lazy"
                  alt="article-image"
                  src={extractFirstImage(article?.content)}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardFooter className="flex justify-between p-4 pt-0">
                <Button
                  variant="ghost"
                  disabled
                  className="flex items-center gap-1"
                  size="sm"
                >
                  <MessageCircle size={16} />
                  <span>{article.commentsCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={(e) => handleBookMarkClick(article.id, e)}
                  size="sm"
                >
                  <Bookmark
                    fill={article.bookmarked ? "black" : ""}
                    size={16}
                  />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
