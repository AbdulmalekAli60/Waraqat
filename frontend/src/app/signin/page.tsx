import Signin from "@/components/Signin";
import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export const metadata = {
  title: "Log In",
};
export default function page() {
  return (
    <HomeLayout>
      <Signin />;
    </HomeLayout>
  );
}
