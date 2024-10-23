import { useState, useEffect, createContext, ReactNode, FC } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token:string) => {
    localStorage.setItem("authToken", token);
  };
    
    const authUser = async () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            try {
                const response = 
            } catch (error) {
                
            }
        }
    }

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
