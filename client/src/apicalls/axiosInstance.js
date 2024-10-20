import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3000";
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, //Retrieves the token stored in localStorage. If the token is not present, the header will be set to Bearer undefined.
  },
});
