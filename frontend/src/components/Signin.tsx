"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UserPlus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface signInDataInterface {
  email: string;
  password: string;
}

export default function Signin() {
  const [signInData, setSignInData] = useState<signInDataInterface>({
    email: "",
    password: "",
  });

  const router  = useRouter();

  //event handlers
  function handleRegisterFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(signInData.email + signInData.password);
    router.push("articles");
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
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="mohammed@example.com"
                type="email"
                value={signInData.email}
                name="email"
                onChange={handleChange}
                className="w-full"
              />
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
