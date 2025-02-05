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
import { registerDataInterface } from "@/Interfaces/AuthInterfaces";
import { register } from "@/services/authService";
import { LoaderCircle } from "lucide-react";
export default function Register() {
  const [registerData, setRegisterData] = useState<registerDataInterface>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  //event handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegisterFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await register(registerData);
      sessionStorage.setItem("token", response.data.jwtToken);
      console.log(response);
      // show alert
      router.push("/articles");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  //event handlers

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
          <form onSubmit={handleRegisterFormSubmit} className="">
            <div className="">
              <Label htmlFor="name">First Name</Label>
              <Input
                placeholder="Mohammed"
                type="text"
                value={registerData.name}
                name="name"
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-red-600">askda</span>
            </div>

            <div className="">
              <Label htmlFor="username">Username</Label>
              <Input
                placeholder="@Mohammed"
                type="text"
                value={registerData.username}
                name="username"
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-red-600">askda</span>
            </div>

            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="mohammed@example.com"
                type="email"
                value={registerData.email}
                name="email"
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-red-600">askda</span>
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
              <span className="text-red-600">askda</span>
            </div>

            <div className="mt-5">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? <LoaderCircle /> : "Create Account"}
              </Button>
            </div>
          </form>
          {/*=== form === */}
        </CardContent>
      </Card>
    </div>
  );
}
