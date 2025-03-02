"use client";

import {
  writeCommentInterface,
  writeCommentResponse,
} from "@/Interfaces/UserContextInterface";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/comments";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const writeComment = (commentData:writeCommentInterface):Promise<AxiosResponse<writeCommentResponse>> => {
   return axios.post(`${url}/addComment`,commentData,{headers:getAuthHeaderWithToken()})
}

export const deleteComment = (commentId:number) => {
    return axios.delete(`${url}/deleteComment/${commentId}`, {headers:getAuthHeaderWithToken()})
 }

 export const getAllCommentsWithArticleId = (articleId:number):Promise<AxiosResponse<writeCommentResponse[]>> => {
    return axios.get(`${url}/getAllComments/${articleId}`,{headers:getAuthHeaderWithToken()})
 }




