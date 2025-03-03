"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserInfo } from "./UserContext";
import { ArticleContextType, ArticleInterface } from "@/Interfaces/Interfaces";

const NewArticleContext = createContext<ArticleContextType | undefined>(
  undefined
);

export function NewArticleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useUserInfo();

  const [newArticleData, setNewArticleData] = useState<ArticleInterface>({
    title: "",
    content: "",
    userId: currentUser.id || 0,
    categoryId: 0,
  });

  useEffect(() => {
    if (currentUser?.id) {
      setNewArticleData((prev) => ({
        ...prev,
        userId: currentUser.id,
      }));
    }
  }, [currentUser]);

  return (
    <NewArticleContext.Provider value={{ newArticleData, setNewArticleData }}>
      {children}
    </NewArticleContext.Provider>
  );
}

export function useCreateNewArticle() {
  const context = useContext(NewArticleContext);

  if (context === undefined) {
    throw new Error("No new article context stored in the context");
  }

  return context;
}
