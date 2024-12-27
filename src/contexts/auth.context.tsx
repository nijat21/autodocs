import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { LoginType, SignupType, UserProfile } from "../types/AuthTypes";
import { useNavigate } from "react-router-dom";
import { loginApi, signupApi, verify } from "../API/auth.api";
import { handleError } from "../Helpers/ErrorHandler";
import { toast } from "sonner";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  verify: (jwtToken: string) => void;
  signup: (signupData: SignupType) => void;
  login: (loginData: LoginType) => void;
  isLoggedIn: () => void;
  logout: () => void;
};

type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (storedToken && user) {
      verifyToken(storedToken).then(() => {
        if (tokenValid) {
          setUser(JSON.parse(user));
          setToken(storedToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + storedToken;
        }
      });
    }
    setIsReady(true);
  }, []);

  const verifyToken = async (jwtToken: string) => {
    try {
      const res = await verify(jwtToken);
      setTokenValid(res?.data?.valid || false);
    } catch (error) {
      handleError(error);
      setTokenValid(false);
    }
  };

  const signup = async (input: SignupType) => {
    try {
      const res = await signupApi(input);
      if (res) {
        const jwtToken = res?.data?.token;
        localStorage.setItem("authToken", jwtToken);
        const userObj = {
          name: res?.data.name,
          email: res?.data.email,
          imgUrl: res?.data.imgUrl,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(jwtToken!);
        setUser(userObj!);
        toast.success("Signed up successfully!");
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (input: LoginType) => {
    try {
      const res = await loginApi(input);
      if (res) {
        const jwtToken = res?.data?.token;
        localStorage.setItem("authToken", jwtToken);
        const userObj = {
          name: res?.data.name,
          email: res?.data.email,
          imgUrl: res?.data.imgUrl,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(jwtToken!);
        setUser(userObj!);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setToken("");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ signup, login, verify, token, user, isLoggedIn, logout }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
