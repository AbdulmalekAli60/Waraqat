"use client";

import axios, { AxiosResponse } from "axios";

const url = "http://localhost:8080/articles";

function getAuthHeaderWithToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}


