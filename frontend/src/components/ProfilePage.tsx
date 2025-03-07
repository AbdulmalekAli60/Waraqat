/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2, UserPen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useUserInfo } from "@/context/UserContext";
import { GetArticles, UserDataInterface } from "@/Interfaces/Interfaces";
import { useParams, useRouter } from "next/navigation";
import { getUserWithId } from "@/services/usersService";
import FollowDialog from "./FollowDialog";
import {
  deleteArticle,
  getArticleWithUserId,
} from "@/services/ArticlesService";
import { addBooMark, deleteBoomark } from "@/services/BookMarksService";
import Footer from "./Footer";
import { useAlert } from "@/context/AlertContext";
import { extractFirstImage } from "@/utills/extractFunction";
export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useUserInfo();
  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState<boolean>(false);
  const [dialogTab, setDialogTab] = useState<"following" | "followers">(
    "following"
  );
  const router = useRouter();
  const { showAlert } = useAlert();

  const { id } = useParams();

  let finalId: string | number | string[] | null = null;
  if (!id) {
    finalId = currentUser.id;
  } else {
    finalId = id;
  }

  const [profileUser, setProfileUser] = useState<UserDataInterface | null>(
    null
  );

  const [articlesData, setArticlesData] = useState<GetArticles[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (id && currentUser?.id.toString() !== id) {
          const response = await getUserWithId(Number(id));
          if (isMounted) setProfileUser(response.data);
        } else {
          const response = await getUserWithId(currentUser.id);
          if (isMounted) {
            setProfileUser(response.data);

            const updatedUser = {
              ...currentUser,
              followers: response.data.followers,
              following: response.data.following,
            };
            setCurrentUser(updatedUser);

            sessionStorage.setItem("user", JSON.stringify(updatedUser));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, currentUser]);

  useEffect(() => {
    const userIdToFetch =
      typeof finalId === "string" ? parseInt(finalId, 10) : finalId;

    if (typeof userIdToFetch === "number") {
      getArticleWithUserId(userIdToFetch)
        .then((response) => {
          setArticlesData(response.data);
          // console.log("all articles with user id: ", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finalId]); 

  if (!profileUser) return <div>Loading...</div>;

  const isCurrentUser = !id || Number(id) === currentUser?.id;

  function handleFollowingClick() {
    setDialogTab("following");
    setIsFollowDialogOpen(true);
  }

  function handleFollowersClick() {
    setDialogTab("followers");
    setIsFollowDialogOpen(true);
  }

  function handleArticleClick(articleId: number) {
    router.push(`/articles/${articleId}`);
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
        // console.log(response);
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
        console.error("Bookmark operation failed:", err);
      });
  }

  function handleDeleteClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    arrticleId: number
  ) {
    e.preventDefault();
    e.stopPropagation();

    deleteArticle(arrticleId)
      .then((response) => {
        console.log(response.data);
        showAlert("Article Deleted", "bg-green-500");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        {/* profile card */}
        <Card className="w-4/5 mx-auto">
          <CardHeader className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileUser.profileImage} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              {/* Username and Edit Button Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div>
                  <span className="font-bold">{profileUser?.name}</span>
                  <br />
                  <span className="font-bold text-gray-600">
                    {profileUser?.username}
                  </span>
                  <br />
                  <span className="font-bold text-gray-600">
                    {new Date(profileUser?.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                {isCurrentUser && (
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => router.push("/edit_profile")}
                  >
                    <UserPen className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-start gap-8 pt-4">
              <div className="text-center cursor-pointer">
                <div className="font-bold text-lg">
                  {profileUser?.articlesCount}
                </div>
                <div className="text-sm text-gray-500">Articles</div>
              </div>

              <div
                className="text-center cursor-pointer"
                onClick={handleFollowingClick}
              >
                <div className="font-bold text-lg">
                  {profileUser?.followers}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={handleFollowersClick}
              >
                <div className="font-bold text-lg">
                  {profileUser?.following}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600">{profileUser?.bio}</p>
          </CardContent>
        </Card>
        {/* ===profile card */}

        <div className="w-4/5 mx-auto">
          <Separator className="mt-4" />
          <p className="font-bold text-5xl mt-2 mb-5">Articles</p>
        </div>

        {/* Articles Section with Empty State */}
        <div className="mb-6">
          {!articlesData || articlesData.length === 0 ? (
            <div className="flex justify-center items-center h-64 w-4/5 mx-auto bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xl font-medium text-gray-500">
                No articles yet
              </p>
            </div>
          ) : (
            articlesData.map((article) => (
              <Card
                className="w-4/5 mt-2 mx-auto"
                onClick={() => handleArticleClick(article.id)}
                key={article.id}
              >
                <CardHeader>
                  {/* article title */}
                  <div className="flex justify-between items-center">
                    <div className="pb-1 cursor-pointer ">
                      <p className="text-3xl font-bold">{article.title}</p>
                    </div>
                    <div>
                      <Button
                        variant={"ghost"}
                        onClick={(e) => handleDeleteClick(e, article?.id)}
                        className={`${
                          currentUser.id === finalId ? "" : "hidden"
                        }`}
                      >
                        <Trash2 />
                        Delete Article
                      </Button>
                    </div>
                  </div>
                  {/* article title */}

                  {/* article image */}
                  <div className="relative w-full border h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                    <Image
                      alt="article-image"
                      src={extractFirstImage(article.content)}
                      fill
                      className="object-cover"
                      priority
                      unoptimized={true}
                    />
                  </div>
                  {/* article image */}

                  {/* title and options */}
                  <div className="flex justify-between items-center p-2">
                    <div className="flex gap-3">
                      <Button className="text-white">
                        <MessageCircle />
                        {article.commentsCount}
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant={"ghost"}
                        onClick={(e) => handleBookmarkClick(article.id, e)}
                      >
                        <Bookmark
                          fill={article.bookmarked ? "black" : "white"}
                        />
                      </Button>
                    </div>
                  </div>
                  {/* title and options */}
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        {isFollowDialogOpen && (
          <FollowDialog
            isOpen={isFollowDialogOpen}
            onOpenChange={setIsFollowDialogOpen}
            userId={finalId}
            initialTab={dialogTab}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
