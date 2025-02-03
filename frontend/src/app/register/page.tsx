import { Input } from "@/components/ui/input";
import React from "react";

export default function page() {
  return (
    <div className="flext justify-center h-screen items-center">
      <div className="container max-w-3xl mx-auto  bg-red-400">
        {/* form */}
        <form>
          <h1 className="font-bold text-center">Welcomm!</h1>
          <Input className="w-1/4"></Input>
        </form>
        {/* form */}
      </div>
    </div>
  );
}
