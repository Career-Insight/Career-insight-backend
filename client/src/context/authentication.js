import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (Cookies.get("token") !== null) {
      setToken(Cookies.get("token"));
    }
    return () => {};
  }, []);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
