import axios from "axios";

export const api = axios.create({
   //baseURL: 'http://192.168.0.13:3333',
   baseURL: "http://192.168.1.134:3333",
});