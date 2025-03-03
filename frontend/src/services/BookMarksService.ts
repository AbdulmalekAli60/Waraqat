"use client";

import { GetArticles } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/bookmarks";

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
