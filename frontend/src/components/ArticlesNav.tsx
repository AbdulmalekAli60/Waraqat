// "use client";
import React from "react";
import DropDown_menu from "@/components/AvatarDropDown";
import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
export default function ArticlesNav() {
  const router = useRouter();
  const pathName = usePathname();
  function handlePage() {
    router.push("/articles");
  }
  return (
    <div>
      <nav className="flex justify-between border-b-2 border-black 400 w-full items-center h-14 px-4">
        <div>
          <h1
            className="font-bold text-4xl text-black cursor-pointer hover:opacity-80"
            onClick={handlePage}
          >
            Waraqat
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {pathName !== "/write" && (
            <Button variant="secondary" onClick={() => router.push("/write")}>
              Write an article{" "}
              <span className="hover:underline">
                <NotebookPen />
              </span>{" "}
            </Button>
          )}
          <DropDown_menu />
        </div>
      </nav>
    </div>
  );
}
