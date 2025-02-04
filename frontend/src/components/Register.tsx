"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
interface registerDataInterface {
  name: string;
  username: string;
  email: string;
  password: string;
}
export default function Register() {
  const [registerData, setRegisterData] = useState<registerDataInterface>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  //event handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRegisterFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(registerData);
    router.push("/articles")
  }
  //event handlers

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-center">
            <UserPlus className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Join our platform!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* form */}
          <form onSubmit={handleRegisterFormSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                placeholder="Mohammed"
                type="text"
                value={registerData.name}
                name="name"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                placeholder="@Mohammed"
                type="text"
                value={registerData.username}
                name="username"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="mohammed@example.com"
                type="email"
                value={registerData.email}
                name="email"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                value={registerData.password}
                name="password"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
          {/*=== form === */}
        </CardContent>
      </Card>
    </div>
  );
}
