import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://take-home-assessment-423502.uc.r.appspot.com/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("api error", error);
    return Promise.reject(error);
  }
);

export default apiClient;
