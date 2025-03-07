/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { GetArticles } from "@/Interfaces/Interfaces";
import { getArticleById, incrementLike } from "@/services/ArticlesService";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Timer, ThumbsUp, User, BookOpen, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { addBooMark, deleteBoomark } from "@/services/BookMarksService";
import { useAlert } from "@/context/AlertContext";
import { Comments } from "./Comments";

export default function ArticleComponent() {
  const [specificArticle, setSpecificArticle] = useState<GetArticles | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await getArticleById(Number(id));
        setSpecificArticle(response?.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 flex justify-center">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!specificArticle) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 flex justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  const formattedDate = specificArticle.createdAt
    ? new Date(specificArticle.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // evvent handler
  function handleLikeClick() {
    incrementLike(Number(id))
      .then((response) => {
        if (specificArticle) {
          setSpecificArticle({
            ...specificArticle,
            clapsCount: response.data,
          });
          showAlert("Added", "bg-green-500");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleBookMarkClick(articleId: number) {
    if (!specificArticle) return;

    if (specificArticle.bookmarked) {
      deleteBoomark(articleId)
        .then((response) => {
          // console.log(response);

          setSpecificArticle({
            ...specificArticle,
            bookmarked: false,
            bookmarksCount: (specificArticle.bookmarksCount || 0) - 1,
          } as GetArticles);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      addBooMark(articleId)
        .then((response) => {
          // console.log(response);

          setSpecificArticle({
            ...specificArticle,
            bookmarked: true,
            bookmarksCount: (specificArticle.bookmarksCount || 0) + 1,
          } as GetArticles);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  // evvent handler

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <Card className="shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {specificArticle.title}
            </h1>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User size={16} />
              <span
                className="font-medium cursor-pointer"
                onClick={() =>
                  router.push(`/profile/${specificArticle.userId}`)
                }
              >
                {specificArticle.userName}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen size={14} />
              {specificArticle.categoryName}
            </Badge>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Timer size={16} />
              <span>{specificArticle.readingTime} min read</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ThumbsUp size={16} />
              <span>{specificArticle.clapsCount}</span>
            </div>

            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>

          <Separator />
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: specificArticle.content }}
            ></div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={handleLikeClick}
              className="flex items-center gap-2"
            >
              <ThumbsUp size={18} />
              <span>Like</span>
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => handleBookMarkClick(specificArticle.id)}
            >
              <Bookmark fill={specificArticle.bookmarked ? "black" : "white"} />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Comments
              setCommentCount={setSpecificArticle}
              text="Comments"
              setOpen={setIsCommentsOpen}
              isOpen={isCommentsOpen}
              commentsCount={specificArticle.commentsCount}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
