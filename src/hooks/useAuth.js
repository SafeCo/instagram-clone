import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from './useLocalStorage'
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();



  // call this function when you want to authenticate the user
  // Having issue as the data is stored on LOCAL STORAGE not state
  const login = async (data) => {
    // previously above was async e.g. login = async (data) => 

    setUser(data);

    // navigate doesnt give firebase enough time to update
    navigate("/")
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    auth.signOut()
    // navigate("/login", { replace: true });
  };


  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return  <AuthContext.Provider value={value}>
            {children}
          </AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext