import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/profile", {
          withCredentials: true,
        });
        setUser(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching user data:", err);
      } finally {
        setReady(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, error }}>
      {children}
    </UserContext.Provider>
  );
}
