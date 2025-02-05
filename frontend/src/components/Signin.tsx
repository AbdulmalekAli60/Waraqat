"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LogIn, LoaderCircle } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signInDataInterface } from "@/Interfaces/AuthInterfaces";
import { login } from "@/services/authService";
export default function Signin() {
  const [signInData, setSignInData] = useState<signInDataInterface>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  //event handlers
  async function handleLogInFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(signInData);
      sessionStorage.setItem("token", response.data.jwtToken);
      // show alert
      router.push("articles");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //event handlers

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-center">
            <LogIn className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Log in
          </CardTitle>
          <CardDescription className="text-center">
            Welcome Back!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* form */}
          <form onSubmit={handleLogInFormSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="mohammed@example.com"
                type="email"
                value={signInData.email}
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
                value={signInData.password}
                name="password"
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-red-600">askda</span>

            </div>

            <div className="mt-5">
              <Button
                className="w-full mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoaderCircle /> : "Log in"}
              </Button>
            </div>
          </form>
          {/*=== form === */}
        </CardContent>
      </Card>
    </div>
  );
}
