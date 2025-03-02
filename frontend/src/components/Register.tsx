"use client";

import React, { useEffect, useState } from "react";
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
import { useUserInfo } from "@/context/UserContext";
import Footer from "./Footer";
import { ValidationErrors, validateRegisterForm } from "@/utills/formValidation";

export default function Register() {
  const [registerData, setRegisterData] = useState<registerDataInterface>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    username: false,
    email: false,
    password: false,
  });

  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserInfo();

  useEffect(() => {
    console.log("register user data:", currentUser);
  }, [currentUser]);

  // Validate form on data change, but only show errors for touched fields
  useEffect(() => {
    const validationErrors = validateRegisterForm(
      registerData.name,
      registerData.username,
      registerData.email,
      registerData.password
    );
    setErrors(validationErrors);
  }, [registerData]);

  //event handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  async function handleRegisterFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      username: true,
      email: true,
      password: true,
    });

    // Validate all fields before submission
    const validationErrors = validateRegisterForm(
      registerData.name,
      registerData.username,
      registerData.email,
      registerData.password
    );
    
    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await register(registerData);
      sessionStorage.setItem("token", response.data.accessToken);
      const responseData = response.data.userData;

      sessionStorage.setItem("userData", JSON.stringify(responseData));

      console.log(response);
      setCurrentUser({
        ...currentUser,
        id: responseData.id,
        username: responseData.username,
        name: responseData.name,
        bio: responseData.bio,
        profileImage: responseData.profileImage,
        created_at: responseData.created_at,
      });

      router.push("/articles");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <form onSubmit={handleRegisterFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  placeholder="Mohammed"
                  type="text"
                  value={registerData.name}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${touched.name && errors.name ? "border-red-500" : ""}`}
                />
                {touched.name && errors.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="@Mohammed"
                  type="text"
                  value={registerData.username}
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${touched.username && errors.username ? "border-red-500" : ""}`}
                />
                {touched.username && errors.username && (
                  <span className="text-red-600 text-sm">{errors.username}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="mohammed@example.com"
                  type="email"
                  value={registerData.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${touched.email && errors.email ? "border-red-500" : ""}`}
                />
                {touched.email && errors.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={registerData.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${touched.password && errors.password ? "border-red-500" : ""}`}
                />
                {touched.password && errors.password && (
                  <span className="text-red-600 text-sm">{errors.password}</span>
                )}
              </div>

              <div className="mt-5">
                <Button 
                  className="w-full" 
                  type="submit" 
                  disabled={isLoading || Object.keys(errors).length > 0}
                >
                  {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : "Create Account"}
                </Button>
              </div>
            </form>
            {/*=== form === */}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}