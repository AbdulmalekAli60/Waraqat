"use client";

import { getAllCategoriesInterface } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "https://spring-boot-app-latest-9uem.onrender.com/categories";

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
