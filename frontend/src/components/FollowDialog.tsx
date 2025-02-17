/* eslint-disable @next/next/no-img-element */
"use client";
import { getAllFollowingInterface } from "@/Interfaces/UserContextInterface";
import {
  follow,
  getFollowers,
  getFollowing,
  unfollow,
} from "@/services/FollowService";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useFollow } from "@/context/FollowContext";
import { useRouter } from "next/navigation";

interface FollowDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | number | string[] | null;
  initialTab: "following" | "followers";
}

export default function FollowDialog({
  isOpen,
  onOpenChange,
  userId,
  initialTab,
}: FollowDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    initialTab
  );
  const [isVisible, setIsVisible] = useState(false);
  // const [allFollowing, setAllFollowing] = useState<getAllFollowingInterface[]>([
  //   {
  //     id: 0,
  //     username: "",
  //     name: "",
  //     profileImage: undefined,
  //     following: false,
  //   },
  // ]);

  const [users, setUsers] = useState<getAllFollowingInterface[]>([]);

  // const [allFollowers, setAllFollowers] = useState<getAllFollowingInterface[]>([
  //   {
  //     id: 0,
  //     username: "",
  //     name: "",
  //     profileImage: undefined,
  //     following: false,
  //   },
  // ]);
  const { setFollowersCount, setFollowingCount } = useFollow();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response =
          activeTab === "following"
            ? await getFollowing(Number(userId))
            : await getFollowers(Number(userId));

        setUsers(
          response.data.map((user) => ({
            userId: user?.userId,
            username: user?.username,
            name: user?.name,
            profileImage: user?.profileImage,
            following: user?.following,
          }))
        );

        if (activeTab === "following") {
          setFollowingCount(response.data.length);
        } else {
          setFollowersCount(response.data.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      fetchUsers();
    }
  }, [userId, activeTab, setFollowersCount, setFollowingCount]);

  if (!isVisible) return null;

  async function handleFollowUnfollowClickInCard(
    user: getAllFollowingInterface
  ) {
    try {
      if (!user.following) {
        const response = await follow(user?.userId);
        if (response) {
          setUsers(
            users.map((u) =>
              u.userId === user.userId ? { ...u, following: true } : u
            )
          );
          console.log("follow done");
        }
      } else {
        const response = await unfollow(user?.userId);
        if (response) {
          setUsers(
            users.map((u) =>
              u.userId === user.userId ? { ...u, following: false } : u
            )
          );
          console.log("unfollow done");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleUserCardClick(id: number, user: getAllFollowingInterface) {
    console.log(id, user);
    router.push(`/profile/${id}`);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white rounded-lg p-5 w-full max-w-md transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "following"
                  ? "bg-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "followers"
                  ? "bg-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Followers
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] px-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <span>Loading...</span>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
             {users.map((user) => (
  <div
    key={user.userId}
    className="bg-white border rounded-lg shadow-sm"
  >
    <div className="flex items-center justify-between p-4">
      {/* Clickable user info area */}
      <div 
        onClick={() => handleUserCardClick(user?.userId, user)}
        className="flex items-center gap-3 flex-1 cursor-pointer"
      >
        <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200">
          <img
            src={user?.profileImage}
            alt={`User ${user.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="font-medium">{user.username}</span>
      </div>
      
      {/* Separate non-clickable button area */}
      <div className="flex-none">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleFollowUnfollowClickInCard(user);
          }}
          variant={user.following ? "danger" : "follow"}
        >
          {user.following ? "Unfollow" : "Follow"}
        </Button>
      </div>
    </div>
  </div>
))}
            </div>
          )}
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
