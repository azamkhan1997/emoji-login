import axios from "axios";
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: "https://emoji-login.onrender.com"
  // baseURL: "http://localhost:3500",
});
