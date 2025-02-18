/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  getAllCategoriesInterface,
  getAllUsersInterface,
} from "@/Interfaces/UserContextInterface";
import { getAllUsers } from "@/services/usersService";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { follow, unfollow } from "@/services/FollowService";
import { useUserInfo } from "@/context/UserContext";
import { Badge } from "./ui/badge";
import {
  getAllCategories,
  getCategoryById,
} from "@/services/CategoriesService";
export default function ArticlesPageComponent() {
  const router = useRouter();
  const { currentUser } = useUserInfo();
  // const [isFollowDone, setIsFollowDone] = useState<boolean>(false);
  const [allUsersData, setAllUsersData] = useState<getAllUsersInterface[]>([
    {
      id: 0,
      name: "",
      username: "",
      profileImage: null,
      doIFollowThisUser: false,
    },
  ]);

  const [allCategories, setAllCategories] = useState<
    getAllCategoriesInterface[]
  >([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        console.log("all users: ", response.data);
        setAllUsersData(response.data);
      })
      .catch((error) => {
        console.error("error getting all users", error);
      });
  }, []);

  // event handlers
  async function handleArticlesFollowClick(
    e: React.MouseEvent<HTMLButtonElement>,
    user: getAllUsersInterface
  ) {
    e.stopPropagation();
    console.log(e, user);
    try {
      if (!user.doIFollowThisUser) {
        const response = await follow(user.id);
        if (response) {
          console.log("follow done");
          setAllUsersData((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id ? { ...u, doIFollowThisUser: true } : u
            )
          );
        }
      } else {
        const response = await unfollow(user.id);
        if (response) {
          console.log("unfollow done");
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
    getCategoryById(categoryId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleArticlesPageCardClick(userId: number) {
    console.log("the user id is: ", userId);
    router.push(`/profile/${userId}`);
  }
  // event handlers

  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-full">
        <p className="font-bold text-5xl mx-auto w-fit">Articles</p>

        {/* container div */}
        <div className="flex flex-col items-center  h-full ">
          <div className=" h-fit p-2 w-full flex gap-2 flex-wrap">
            {allCategories.map((category) => (
              <Badge
                onClick={() => handleCategoryClick(category.id)}
                className="p-2 cursor-pointer"
                key={category.id}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div className="bg-teal-300 h-full w-full p-2 ">articles cards</div>
        </div>
        {/* ===container div=== */}
      </div>
      <div className="w-4/12 h-screen border-l-2 border-gray-500">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-4 p-4">
            {allUsersData
              .filter((user) => user.id !== currentUser.id)
              .map((user) => (
                <div
                  key={user?.id}
                  onClick={() => handleArticlesPageCardClick(user?.id)}
                  className="bg-white border rounded-lg shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={`User ${user?.name}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium">{user.name}</span>
                        <br />
                        <span className="text-gray-400 font-thin">
                          {user.username}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={user.doIFollowThisUser ? "danger" : "follow"}
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
  );
}
