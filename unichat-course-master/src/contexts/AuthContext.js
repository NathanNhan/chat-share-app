import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const authContext = React.createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [history, user]);
  const value = {user}
  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
};
