"use client";
import { UpdatedProfileData } from "@/Interfaces/UserContextInterface";
import axios from "axios";

const url = "http://localhost:8080/users";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const getUserWithId = (id: number) => {
  return axios.get(`${url}/specificUser/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const updateUserInfo = (updatedData: UpdatedProfileData) =>
  axios.patch(`${url}/updateInfo`, updatedData, {headers: getAuthHeaderWithToken()});
