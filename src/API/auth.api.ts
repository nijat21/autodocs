import axios from "axios";

const baseUrl = `${import.meta.env.VITE_AUTODOCS_API}/auth`;

export const login = (user) => {
  return axios.post(`${baseUrl}/login`, user);
};
