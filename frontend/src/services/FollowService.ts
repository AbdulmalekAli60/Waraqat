"use client";

import { getAllFollowingInterface } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/followManagement";

export const follow = (id: number | string) => {
  return axios.post(
    `${url}/follow/${id}`,
    {},
    {
      headers: getAuthHeaderWithToken(),
    }
  );
};

export const unfollow = (id: number | string) => {
  return axios.post(
    `${url}/unfollow/${id}`,
    {},
    { headers: getAuthHeaderWithToken() }
  );
};

export const getFollowing = (
  id: number
): Promise<AxiosResponse<getAllFollowingInterface[]>> => {
  console.log("full url: ", `${url}/getFollowing/${id}`);
  console.log("the token is: ", getAuthHeaderWithToken());
  return axios.get(`${url}/getFollowing/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getFollowers = (
  id: number
): Promise<AxiosResponse<getAllFollowingInterface[]>> => {
  return axios.get(`${url}/getFollowers/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};
