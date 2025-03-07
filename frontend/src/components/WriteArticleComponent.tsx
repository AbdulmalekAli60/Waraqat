/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCreateNewArticle } from "@/context/NewArticleContext";
import ArticlesCategories from "./ArticlesCategories";
import { Button } from "./ui/button";
import { createNewArticle } from "@/services/ArticlesService";
import TextEditor from "./TextEditore";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Pencil, Save } from "lucide-react";
import Footer from "./Footer";
import { useAlert } from "@/context/AlertContext";

export default function WriteArticleComponent() {
  const { newArticleData, setNewArticleData } = useCreateNewArticle();
  const [isProcessing, setIsProcessing] = useState(false);
  const {showAlert} = useAlert();

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

  const processImagesInContent = async (
    htmlContent: string
  ): Promise<string> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = doc.getElementsByTagName("img");

    for (const img of images) {
      const src = img.getAttribute("src");
      if (src && src.startsWith("blob:")) {
        try {
          const base64Url = await convertBlobToBase64(src);
          img.setAttribute("src", base64Url);
        } catch (error) {
          console.error("Failed to convert image:", error);
        }
      }
    }

    return doc.body.innerHTML;
  };

  const handleContentChange = (content: string) => {
    setNewArticleData((prev) => ({ ...prev, content }));
  };

  const handleSaveNewArticle = async () => {
    if (newArticleData.title === "") {
      alert("Please add title");
      return;
    }

    try {
      setIsProcessing(true);

      if (!newArticleData.categoryId) {
        alert("Please choose a category");
        return;
      }

      // Process images in content
      const processedContent = await processImagesInContent(
        newArticleData.content
      );

      // Update article data with processed content
      const articleToSave = {
        ...newArticleData,
        content: processedContent,
      };

      const response = await createNewArticle(articleToSave);
      // console.log("Article saved successfully:", response);
      showAlert("Article saved successfully", "bg-green-500")

      // Reset form
      setNewArticleData({
        ...newArticleData,
        title: "",
        categoryId: null,
        content: "",
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
    <>
      <div className="max-w-4xl mx-auto w-full px-4 py-6 space-y-6">
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Pencil size={20} className="text-gray-500" />
              <h1 className="text-2xl font-bold">Write New Article</h1>
            </div>

            <Input
              value={newArticleData.title}
              onChange={(e) =>
                setNewArticleData({ ...newArticleData, title: e.target.value })
              }
              type="text"
              className="text-xl font-medium py-6 border-gray-300 focus:border-primary"
              placeholder="Enter article title..."
              name="title"
            />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="border rounded-md p-4 bg-gray-50">
              <h2 className="text-sm font-medium text-gray-500 mb-3">
                Select a category:
              </h2>
              <div className="flex flex-wrap gap-2">
                <ArticlesCategories  />
              </div>
            </div>

            <div className="border rounded-md">
              <TextEditor
                onContentChange={handleContentChange}
                initialContent={newArticleData.content}
              />
            </div>
          </CardContent>

          <CardFooter className="pt-4 flex justify-end">
            <Button
              onClick={handleSaveNewArticle}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              {isProcessing ? "Processing..." : "Save Article"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}
