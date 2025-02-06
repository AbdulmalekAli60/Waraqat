import React from "react";
import ArticlesLayout from "../layouts/ArticlesLayout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
export default function page() {
  return (
    <ArticlesLayout>
      <div className="h-screen">
        <Card className="w-5/6 h-2/5  mx-auto mt-3">
          <CardHeader className="">
            <CardTitle>
              <div className="flex items-center justify-evenly ">
                <div className="text-center  w-24 h-24">
                  <Avatar className="align-middle w-24 h-24">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="w-full flex justify-between items-center p-3 mb-8">
                  <span className="font-bold">@Username</span>
                  <Button className=" text-white">
                    {" "}
                    <UserPen /> Edit Profile
                  </Button>
                </div>
              </div>
              

                {/* followers and articles */}
                {/* followers and articles */}

            </CardTitle>

            <CardDescription></CardDescription>
          </CardHeader>

          <CardDescription>asdakljdkalj</CardDescription>
        </Card>
      </div>
    </ArticlesLayout>
  );
}
