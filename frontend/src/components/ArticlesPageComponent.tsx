/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getAllUsersInterface } from "@/Interfaces/UserContextInterface";
import { getAllUsers } from "@/services/usersService";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function ArticlesPageComponent() {
  const router = useRouter();
  const [allUsersData, setAllUsersData] = useState<getAllUsersInterface[]>([
    {
      id: 0,
      name: "",
      username: "",
      profileImage: null,
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
  function handleArticlesFollowClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    alert("hi");
  }

  function handleArticlesPageCardClick(userId: number) {
    console.log("the user id is: ",userId )
    router.push(`/profile/${userId}`)
    // alert("hi article");
  }
  // event handlers

  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-full">
        <h1>This is Articles page</h1>
      </div>

      <div className="w-4/12 h-screen border-l-2 border-gray-500">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-4 p-4">
            {allUsersData.map((user) => (
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

                      <span className="text-gray-400  font-thin">{user.username}</span>
                    </div>
                  </div>
                  <Button
                    variant={"follow"}
                    onClick={handleArticlesFollowClick}
                  >
                    Follow
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
