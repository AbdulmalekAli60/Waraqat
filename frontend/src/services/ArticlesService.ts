"use client";

import { ArticleInterface } from "@/Interfaces/UserContextInterface";
import axios from "axios";

const url = "http://localhost:8080/articles/createArticle";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const createNewArticle = (articleData: ArticleInterface) => {
 return axios.post(`${url}`, articleData, { headers: getAuthHeaderWithToken() });
};
