"use client"
import axios from "axios";
import { signInDataInterface,registerDataInterface } from "@/Interfaces/AuthInterfaces";
// http://localhost:8080/

const url = "https://spring-boot-app-latest-9uem.onrender.com/auth";

export const register = (registerData:registerDataInterface) => axios
                                .post(`${url}/signup`,registerData);

 export const login = (loginData:signInDataInterface) => axios
                                .post(`${url}/login`,loginData);