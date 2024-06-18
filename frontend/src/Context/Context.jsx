import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/games/games")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        setLoading(false);
      });
  }, []);

  return (
    <AppContext.Provider value={{ games, loading }}>
      {children}
    </AppContext.Provider>
  );
};
