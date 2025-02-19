"use client";

import { getAllCategoriesInterface } from "@/Interfaces/UserContextInterface";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/categories";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const getAllCategories = (): Promise<
  AxiosResponse<getAllCategoriesInterface[]>
> => {
  return axios.get(`${url}/getAllCategories`, {
    headers: getAuthHeaderWithToken(),
  });
};

export const getCategoryById = (
  id: number
): Promise<AxiosResponse<getAllCategoriesInterface>> => {
  return axios.get(`${url}/findCategoryById/${id}`, {
    headers: getAuthHeaderWithToken(),
  });
};
