"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, UserPen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Heart, MessageCircle } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useUserInfo } from "@/context/UserContext";
import { UserDataInterface } from "@/Interfaces/UserContextInterface";
import { useParams, useRouter } from "next/navigation";
import { getUserWithId } from "@/services/usersService";
import FollowDialog from "./FollowDialog";
import { useFollow } from "@/context/FollowContext";
export default function ProfilePage() {
  const { currentUser } = useUserInfo();
  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState<boolean>(false);
  const [dialogTab, setDialogTab] = useState<"following" | "followers">("following");
  const { followersCount, followingCount } = useFollow();
  const router = useRouter();

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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (id && currentUser?.id.toString() !== id) {
        try {
          const response = await getUserWithId(Number(id));
          if (isMounted) setProfileUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      } else {
        if (isMounted) setProfileUser({ ...currentUser });
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
  }, [id, currentUser]);

  if (!profileUser) return <div>Loading...</div>;

  const isCurrentUser = !id || Number(id) === currentUser?.id;

  function handleFollowingClick() {
    // get following (who i follow) done
    setDialogTab("following")
    setIsFollowDialogOpen(true);
  }

  function handleFollowersClick() {
    // who follow me (get followers)
    setDialogTab("followers")
    setIsFollowDialogOpen(true);
  }

  return (
    // profile card
    <div className="min-h-screen p-4">
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
                  {profileUser?.created_at}
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
              <div className="font-bold text-lg">120</div>
              <div className="text-sm text-gray-500">Articles</div>
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={handleFollowingClick}
            >
              <div className="font-bold text-lg">{followingCount}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={handleFollowersClick}
            >
              <div className="font-bold text-lg">{followersCount}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600">{profileUser?.bio}</p>

          <div className="mt-4 flex items-center gap-4">
            <Button>
              <Mail /> Email
            </Button>
            <Button>
              {" "}
              <Linkedin /> Linkdin
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* ===profile card */}

      <div className="w-4/5 mx-auto">
        <Separator className="mt-4" />
        <p className="font-bold text-5xl mt-2 mb-5">Articles</p>
      </div>

      <div className="min-h-screen">
        <Card className="w-4/5 mx-auto ">
          <CardHeader>
            {/* article title */}
            <div className="pb-1 cursor-pointer">
              <p className="text-3xl font-bold">How to use react router?</p>
            </div>
            {/* article title */}

            {/* article image */}
            <div className="relative w-full h-[400px] overflow-hidden rounded-2xl cursor-pointer">
              <Image
                alt="article-image"
                src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*3XS-8r8adjnRoNH4YjKXpw.png"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* article image */}

            {/* title and options */}
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-3">
                <Button className="text-white">
                  <MessageCircle />
                  22
                </Button>
                <Button className="text-white">
                  <Heart />5
                </Button>
              </div>

              <div>
                <Button>
                  <Bookmark />
                </Button>
              </div>
            </div>
            {/* title and options */}
          </CardHeader>
        </Card>
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
  );
}
