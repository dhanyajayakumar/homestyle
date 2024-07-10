// lib/axios.js
import axios from "axios";

const api = axios.create({
  // baseURL: "https://hsadmin.staging-ecom.com", // Replace with your API base URL
  baseURL: "http://195.35.23.163", // Replace with your API base URL
  // baseURL: "https://smlive.staging-ecom.com", // Replace with your API base URL
  // baseURL: "https://api.timehouse.store", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
