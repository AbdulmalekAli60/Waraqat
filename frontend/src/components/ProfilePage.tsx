import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, UserPen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Heart, MessageCircle } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
export default function ProfilePage() {
  return (
    // profile card
    <div className="min-h-screen p-4">
      <Card className="w-4/5 mx-auto">
        <CardHeader className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Username and Edit Button Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              <span className="text-xl font-bold">@Username</span>
              <Button className="flex items-center gap-2">
                <UserPen className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-start gap-8 pt-4">
            <div className="text-center">
              <div className="font-bold text-lg">120</div>
              <div className="text-sm text-gray-500">Articles</div>
            </div>

            <div className="text-center">
              <div className="font-bold text-lg">516</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>

            <div className="text-center">
              <div className="font-bold text-lg">20</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
            aliquam molestias qui. Mollitia incidunt hic deleniti consequuntur
            nam eveniet, perspiciatis odit ea enim deserunt optio quo sit
            exercitationem voluptate. Qui! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Explicabo neque, exercitationem
            placeat quae, iusto quas, quibusdam earum architecto optio provident
            excepturi non hic soluta. Aut ducimus quis quia illo nesciunt.
          </p>

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
                <Button><Bookmark/></Button>
              </div>
            </div>
            {/* title and options */}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
