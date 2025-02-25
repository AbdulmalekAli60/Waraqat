"use client";
import { useCreateNewArticle } from "@/context/NewArticleContext";
import ArticlesCategories from "./ArticlesCategories";
import { Button } from "./ui/button";
import { createNewArticle } from "@/services/ArticlesService";
import TextEditor from "./TextEditore";
import { useState } from "react";

export default function WriteArticleComponent() {
  const { newArticleData, setNewArticleData } = useCreateNewArticle();
  const [isProcessing, setIsProcessing] = useState(false);

  const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting blob to base64:", error);
      throw error;
    }
  };

  const processImagesInContent = async (htmlContent: string): Promise<string> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.getElementsByTagName('img');

    for (const img of images) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('blob:')) {
        try {
          const base64Url = await convertBlobToBase64(src);
          img.setAttribute('src', base64Url);
        } catch (error) {
          console.error("Failed to convert image:", error);
        }
      }
    }

    return doc.body.innerHTML;
  };

  const handleContentChange = (content: string) => {
    setNewArticleData(prev => ({ ...prev, content }));
  };

  const handleSaveNewArticle = async () => {
    if(newArticleData.title === ""){
      alert("Please add title")
    }
    try {
      setIsProcessing(true);

      if (!newArticleData.categoryId) {
        alert("Please choose a category");
        return;
      }

      // Process images in content
      const processedContent = await processImagesInContent(newArticleData.content);

      // Update article data with processed content
      const articleToSave = {
        ...newArticleData,
        content: processedContent
      };

      const response = await createNewArticle(articleToSave);
      console.log("Article saved successfully:", response);

      // Reset form
      setNewArticleData({
        ...newArticleData,
        title: "",
        categoryId: null,
        content: ""
      });
      localStorage.removeItem("savedHtml");

      alert("Article saved successfully!");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
        <TextEditor 
          onContentChange={handleContentChange}
          initialContent={newArticleData.content}
        />
      </div>

      <Button 
        onClick={handleSaveNewArticle} 
        disabled={isProcessing}
        className="mt-4"
      >
        {isProcessing ? "Processing..." : "Save Article"}
      </Button>
    </div>
  );
}
