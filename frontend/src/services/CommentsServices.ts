"use client";

import {
  writeCommentInterface,
  writeCommentResponse,
} from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/comments";

export const writeComment = (
  commentData: writeCommentInterface
): Promise<AxiosResponse<writeCommentResponse>> => {
  return axios.post(`${url}/addComment`, commentData, {
    headers: getAuthHeaderWithToken(),
  });
};

export const deleteComment = (commentId: number) => {
  return axios.delete(`${url}/deleteComment/${commentId}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getAllCommentsWithArticleId = (
  articleId: number
): Promise<AxiosResponse<writeCommentResponse[]>> => {
  return axios.get(`${url}/getAllComments/${articleId}`, {
    headers: getAuthHeaderWithToken(),
  });
};
