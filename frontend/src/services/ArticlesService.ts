"use client";

import { ArticleInterface, GetArticles } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/articles";

export const createNewArticle = (articleData: ArticleInterface) => {
  return axios.post(`${url}/createArticle`, articleData, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getArticleWithUserId = (
  id: number
): Promise<AxiosResponse<GetArticles[]>> => {
  return axios.get(`${url}/getAllArticlesById/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getArticleById = (
  id: number
): Promise<AxiosResponse<GetArticles>> => {
  return axios.get(`${url}/getArticleWithId/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const incrementLike = (id: number): Promise<AxiosResponse<number>> => {
  return axios.post(
    `${url}/ClapsCount/${id}`,
    {},
    { headers: getAuthHeaderWithToken() }
  );
};

export const getAllArticles = (): Promise<AxiosResponse<GetArticles[]>> => {
  return axios.get(`${url}/getAllArticles`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const deleteArticle = (id: number) => {
  return axios.delete(`${url}/delete/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};
