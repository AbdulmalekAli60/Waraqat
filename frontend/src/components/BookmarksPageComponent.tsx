/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Bookmark, MessageCircle, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { GetArticles } from "@/Interfaces/Interfaces";
import { deleteBoomark, getAllBoomarks } from "@/services/BookMarksService";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import { extractFirstImage } from "@/utills/extractFunction";

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

  function handleBookMarkClick(
    articleId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    deleteBoomark(articleId)
      .then((response) => {
        // console.log(response);
        setBookMarksData((prevData) => {
          if (!prevData) return null;
          return prevData.filter((article) => article.id !== articleId);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Articles Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Loading articles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mt-2 gap-6 max-w-7xl mx-auto mb-6">
            {bookmarksData && bookmarksData.length > 0 ? (
              bookmarksData.map((article) => (
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
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                <Bookmark size={40} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">
                  No bookmarks found
                </h3>
                <p className="text-gray-500 mt-2">
                  You haven't bookmarked any articles yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
