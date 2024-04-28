import axios from "axios";
axios.defaults.withCredentials = true;
export const api = axios.create({
  // baseURL: "https://emoji-picker-jtqw.onrender.com"
  baseURL: "http://localhost:3500",
});
