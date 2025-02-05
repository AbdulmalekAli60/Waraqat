import axios from "axios";
import { signInDataInterface,registerDataInterface } from "@/Interfaces/AuthInterfaces";

const url = "http://localhost:8080/auth";

export const register = (registerData:registerDataInterface) => axios
                                .post(`${url}/signup`,registerData);

 export const login = (loginData:signInDataInterface) => axios
                                .post(`${url}/login`,loginData);