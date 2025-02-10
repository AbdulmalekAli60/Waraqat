"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  UpdatedProfileData,
  UserDataInterface,
} from "@/Interfaces/UserContextInterface";
import { useUserInfo } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoaderCircle, User } from "lucide-react";
import { updateUserInfo } from "@/services/usersService";

interface UserResponseData {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  created_at: string;
}
export default function EditProfile() {
  const { currentUser, setCurrentUser } = useUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] =
    useState<UpdatedProfileData>({
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      email: "",
      bio: currentUser.bio || "",
      profileImage: currentUser.profileImage || "",
    });

  //   const router = useRouter();

  //   event handlers

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setUpdatedProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleUpdateInfoClick() {
    //api call
    try {
      setIsLoading(true);
      const response = await updateUserInfo(updatedProfileData);
      const responseData = response.data as UserResponseData;
      setUpdatedProfileData((prev) => ({
        ...prev,
        name: responseData.name,
        username: responseData.username,
        email: responseData.email,
        bio: responseData.bio,
        profileImage: responseData.profileImage,
      }));

      const updatedUser: UserDataInterface = {
        ...currentUser,
        name: responseData.name,
        bio: responseData.bio,
        profileImage: responseData.profileImage,
      };

      setCurrentUser(updatedUser);

      console.log("the response: ", response.data);

      console.log("updated data: ", updatedProfileData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  //   event handlers

  // 1-profile image 2- name, 3-bio
  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Name and Username Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  value={updatedProfileData?.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={currentUser?.username}
                  type="text"
                  name="username"
                  id="username"
                  disabled
                  className="bg-gray-100 dark:bg-gray-800"
                />
              </div>
            </div>

            {/* Email and Profile Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={currentUser?.email}
                  type="email"
                  name="email"
                  disabled
                  className="bg-gray-100 dark:bg-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={currentUser?.profileImage}
                        alt="Profile picture"
                      />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-grow">
                    <Input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      className="cursor-pointer"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  value={updatedProfileData?.bio}
                  onChange={handleChange}
                  name="bio"
                  id="bio"
                  maxLength={255}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-700 p-3 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-sm text-gray-500">Maximum 255 characters</p>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="flex justify-end">
              <Button
                type="submit"
                onClick={handleUpdateInfoClick}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {isLoading ? <LoaderCircle /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
