"use client";
import {
  getAllUsersInterface,
  UpdatedProfileData,
  UserDataInterface,
} from "@/Interfaces/UserContextInterface";
import axios, { AxiosResponse } from "axios";



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
  axios.patch(`${url}/updateInfo`, updatedData, {
    headers: getAuthHeaderWithToken(),
  });

export const deleteAccount = () => {
  const userData = sessionStorage.getItem("userData");
  if (!userData) {
    throw new Error("user data are not stored in session storage");
  }

  const x: UserDataInterface = JSON.parse(userData);
  axios.delete(`${url}/deleteUser/${x.id}`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getAllUsers = (): Promise<AxiosResponse<getAllUsersInterface[]>> => {
  return axios.get(`${url}/allUsers`, {headers: getAuthHeaderWithToken()})
}
