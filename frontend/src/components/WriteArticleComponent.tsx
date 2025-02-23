"use client";
import { useCreateNewArticle } from "@/context/NewArticleContext";
import ArticlesCategories from "./ArticlesCategories";
import TextEditore from "./TextEditore";
import { Button } from "./ui/button";

export default function WriteArticleComponent() {
  const { newArticleData, setNewArticleData } = useCreateNewArticle();

  function handleSaveNewArticle(){
    console.log(newArticleData)
    alert("hi")
  }


  return (
    <div className="bg-orange-400 mx-auto w-3/4 min-h-screen mt-1 flex flex-col gap-3 p-2">
      <input
        value={newArticleData.title}
        onChange={(e) =>
          setNewArticleData({ ...newArticleData, title: e.target.value })
        }
        type="text"
        className="h-14 w-full border focus:outline-none border-gray-500 border-solid border-s-8 bg-orange-400 text-5xl p-4"
        placeholder="Title..."
        name="title"
      />

      <div className="bg-red-500 p-2 border-s-8 border-gray-500 flex gap-2 flex-wrap">
        <ArticlesCategories />
      </div>

      <div className="mt-6">
        <TextEditore />
      </div>

      <Button onClick={handleSaveNewArticle}>Save chanegs</Button>
    </div>
  );
}
