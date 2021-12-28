import axios from "axios";
import queryString from "query-string";
import { getTokenAcess } from "src/utils/localStorage";

const baseURL = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

baseURL.interceptors.request.use((request) => {
  const accessToken = getTokenAcess();
  const accessHeader = `Bearer ${accessToken}`;
  request.headers["Authorization"] = accessHeader;
  return request;
});
export default baseURL;
