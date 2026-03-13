import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      setLocalStorage();
    }
    getLocalStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
