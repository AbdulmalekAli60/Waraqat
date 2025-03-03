"use client";

import { getAllCategoriesInterface } from "@/Interfaces/Interfaces";
import { getAuthHeaderWithToken } from "@/utills/getAuthToken";
import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/categories";

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
