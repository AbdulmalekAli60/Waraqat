"use client";

import React, { useEffect, useState } from "react";
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
import { useUserInfo } from "@/context/UserContext";
import Footer from "./Footer";
import { ValidationErrors, validateLoginForm } from "@/utills/formValidation";

export default function Signin() {
  const [signInData, setSignInData] = useState<signInDataInterface>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });

  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserInfo();

  useEffect(() => {
    // console.log("Updated user data:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const validationErrors = validateLoginForm(
      signInData.email,
      signInData.password
    );
    setErrors(validationErrors);
  }, [signInData]);

  async function handleLogInFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    // Validate all fields before submission
    const validationErrors = validateLoginForm(
      signInData.email,
      signInData.password
    );

    // If there are errors, don not submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(signInData);
      const userData = response.data.userData;

      sessionStorage.setItem("token", response.data.accessToken);
      sessionStorage.setItem("userData", JSON.stringify(userData));

      setCurrentUser(userData);

      router.push("/articles");
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

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  return (
    <>
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
            <form onSubmit={handleLogInFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="mohammed@example.com"
                  type="email"
                  value={signInData.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
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
                  value={signInData.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full ${
                    touched.password && errors.password ? "border-red-500" : ""
                  }`}
                />
                {touched.password && errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <Button
                  className="w-full mt-5"
                  type="submit"
                  // disabled={isLoading || Object.keys(errors).length > 0}
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin mr-2" />
                  ) : (
                    "Log in"
                  )}
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
