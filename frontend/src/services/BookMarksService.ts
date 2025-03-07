"use client";

import { GetArticles } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";
// http://localhost:8080/
const url = "https://spring-boot-app-latest-9uem.onrender.com/bookmarks";

export const addBooMark = (
  articleId: number
): Promise<AxiosResponse<string>> => {
  return axios.post(
    `${url}/add/${articleId}`,
    {},
    { headers: getAuthHeaderWithToken() }
  );
};

export const deleteBoomark = (
  articleId: number
): Promise<AxiosResponse<string>> => {
  return axios.delete(
    `${url}/delete/${articleId}`,

    { headers: getAuthHeaderWithToken() }
  );
};

export const getAllBoomarks = (): Promise<AxiosResponse<GetArticles[]>> => {
  return axios.get(
    `${url}/getAllBookmarks`,

    { headers: getAuthHeaderWithToken() }
  );
};
