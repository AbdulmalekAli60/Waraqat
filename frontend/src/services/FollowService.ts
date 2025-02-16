"use client";

import axios from "axios";

const url = "http://localhost:8080/followManagement";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const follow = (id: number | string) => {
    return axios.post(
      `${url}/follow/${id}`,
      {},
      {
        headers: getAuthHeaderWithToken()
      }
    );
  };

  export const unfollow = (id: number | string) => {
   return axios.post(`${url}/unfollow/${id}`, {}, {headers:getAuthHeaderWithToken()})
  }
