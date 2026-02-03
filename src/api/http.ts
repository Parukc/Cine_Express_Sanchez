import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.tvmaze.com",
  timeout: 15000,
});
