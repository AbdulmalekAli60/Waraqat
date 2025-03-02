/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  GetArticles,
  getAllUsersInterface,
} from "@/Interfaces/UserContextInterface";
import { getAllUsers } from "@/services/usersService";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { follow, unfollow } from "@/services/FollowService";
import { useUserInfo } from "@/context/UserContext";
import ArticlesCategories from "./ArticlesCategories";
import { getAllArticles } from "@/services/ArticlesService";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Bookmark, MessageCircle, User, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { addBooMark, deleteBoomark } from "@/services/BookMarksService";
import Footer from "./Footer";

export default function ArticlesPageComponent() {
  const router = useRouter();
  const { currentUser } = useUserInfo();
  const [allUsersData, setAllUsersData] = useState<getAllUsersInterface[]>([
    {
      id: 0,
      name: "",
      username: "",
      profileImage: null,
      doIFollowThisUser: false,
    },
  ]);
  

  const [articlesData, setArticlesData] = useState<GetArticles[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [filteredArticles, setFilteredArticles] = useState<
    GetArticles[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, articlesResponse] = await Promise.all([
          getAllUsers(),
          getAllArticles(),
        ]);

        setAllUsersData(usersResponse.data);
        setArticlesData(articlesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // event handlers
  useEffect(() => {
    if (articlesData) {
      const filtered =
        selectedCategory === 0
          ? articlesData
          : articlesData.filter(
              (article) => article.categoryId === selectedCategory
            );

      setFilteredArticles(filtered);
    }
  }, [articlesData, selectedCategory]);
  async function handleArticlesFollowClick(
    e: React.MouseEvent<HTMLButtonElement>,
    user: getAllUsersInterface
  ) {
    e.stopPropagation();
    try {
      if (!user.doIFollowThisUser) {
        const response = await follow(user.id);
        if (response) {
          setAllUsersData((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id ? { ...u, doIFollowThisUser: true } : u
            )
          );
        }
      } else {
        const response = await unfollow(user.id);
        if (response) {
          setAllUsersData((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id ? { ...u, doIFollowThisUser: false } : u
            )
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleBookmarkClick(
    articleId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
  
    const currentArticle = articlesData?.find(
      (article) => article.id === articleId
    );
  
    if (!currentArticle) return;
  
    const apiCall = currentArticle.bookmarked
      ? deleteBoomark(articleId)
      : addBooMark(articleId);
  
    apiCall
      .then((response) => {
        console.log(response);
  
        setArticlesData((prevArticles) => {
          if (!prevArticles) return null;
  
          return prevArticles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                bookmarked: !article.bookmarked,
                bookmarksCount: article.bookmarked
                  ? (article.bookmarksCount || 0) - 1
                  : (article.bookmarksCount || 0) + 1,
              };
            }
  
            return article;
          });
        });
      })
      .catch((err) => {
        // Improve error handling here
        console.error("Bookmark operation failed:", err);
        // Don't update the UI state if there was an error
      });
  }

  function handleArticlesPageCardClick(userId: number) {
    router.push(`/profile/${userId}`);
  }

  function handleArticleClick(articleId: number) {
    router.push(`/article/${articleId}`);
  }

  function extractFirstImage(htmlContent: string) {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const firstImg = tempDiv.querySelector("img");
      console.log("the selected category is : ", selectedCategory);

      if (firstImg) {
        return firstImg.src;
      }

      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    } catch (error) {
      console.error("Error extracting image:", error);
      return "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png";
    }
  }

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function handleArticleCardClick(articleId: number) {
    router.push(`/articles/${articleId}`);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        {/* Main content area */}
        <div className="w-full lg:w-3/4 p-4">
          <h1 className="font-bold text-3xl md:text-4xl text-center mb-6">
            Articles
          </h1>

          {/* Categories */}
          <div className="mb-6 border-b">
            <h2 className="text-lg font-medium mb-2 px-2">Categories</h2>
            <div className="flex flex-wrap gap-2 mb-1 justify-center">
              <ArticlesCategories setSelectedCategory={setSelectedCategory} />
            </div>
          </div>
          {/* Categories */}

          {/* Articles Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredArticles?.map((article) => (
                <Card
                  onClick={() => handleArticleCardClick(article.id)}
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
                      <span className="mx-1">•</span>
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </CardHeader>

                  {/* Article image */}
                  <div
                    className="relative w-full h-48 overflow-hidden cursor-pointer"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <img
                      alt="article-image"
                      src={extractFirstImage(article?.content)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Clock size={14} />
                          <span>{article.readingTime} min read</span>
                        </Badge>
                        <Badge>{article.categoryName}</Badge>
                      </div>
                    </div>
                  </CardContent>

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
                      onClick={(e) => handleBookmarkClick(article.id, e)}
                      size="sm"
                    >
                      <Bookmark
                        fill={article.bookmarked ? "black" : "white"}
                        size={16}
                      />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Users */}
        <div className="w-full lg:w-1/4 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-200">
          <div className="sticky top-0 p-4">
            <h2 className="font-semibold text-xl mb-4">People to follow</h2>

            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] pr-2 space-y-3">
              {allUsersData
                .filter((user) => user.id !== currentUser.id)
                .map((user) => (
                  <div
                    key={user?.id}
                    className="bg-white border rounded-lg shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between p-3 flex-wrap">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleArticlesPageCardClick(user?.id)}
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={`User ${user?.name}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-gray-400 text-sm truncate">
                            {user.username}
                          </p>
                        </div>
                      </div>

                      <Button
                        className="mt-2 sm:mt-0 text-sm"
                        variant={
                          user.doIFollowThisUser ? "destructive" : "default"
                        }
                        size="sm"
                        onClick={(e) => handleArticlesFollowClick(e, user)}
                      >
                        {user.doIFollowThisUser ? "Unfollow" : "Follow"}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
