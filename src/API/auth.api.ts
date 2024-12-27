import axios from "axios";
import { LoginType, SignupType, UserRes } from "../types/AuthTypes";

const baseUrl = `${import.meta.env.VITE_AUTODOCS_API}/auth`;

export const signupApi = async (user: SignupType) => {
  return await axios.post<UserRes>(`${baseUrl}/signup`, user);
};

export const loginApi = async (user: LoginType) => {
  return await axios.post<UserRes>(`${baseUrl}/login`, user);
};

export const verify = async (token: string) => {
  return await axios.get<{ valid: boolean }>(`${baseUrl}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
