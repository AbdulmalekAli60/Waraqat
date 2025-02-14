"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface FollowDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowDialog({
  isOpen,
  onOpenChange,
}: FollowDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen);

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <div className="hidden">
            <DialogTitle>ss</DialogTitle>
          </div>
          <Tabs defaultValue="account" className="p-2">
            <TabsList className="w-full">
              <TabsTrigger value="account" className="w-1/2">
                Following
              </TabsTrigger>
              <TabsTrigger value="password" className="w-1/2">
                Followers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>

        {/* Scrollable container for cards */}
        <div className="overflow-y-auto max-h-[50vh]">
          <div className="grid gap-4 py-4 mr-2">
            {/* Example cards - you can map through your data later */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="w-full">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-[35px] w-[35px] overflow-hidden rounded-full">
                        <Image
                          alt="article-image"
                          src="https://media.istockphoto.com/id/1388420740/photo/net-zero-and-carbon-neutral-concepts-net-zero-emissions-goals-a-climate-neutral-long-term.jpg?s=1024x1024&w=is&k=20&c=B-yemLiwuT3BZcU4rNCb51xeyRkqWrFtPg3bGi3oXBQ="
                          className="object-cover h-full w-full"
                          width={35}
                          height={35}
                          priority
                        />
                      </div>
                      <p className="font-bold">Username {item}</p>
                    </div>

                    <Button variant="follow">Follow</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
