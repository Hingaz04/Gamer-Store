import React, { useState, useEffect } from "react";
import "./Games.css";
import SideMenu from "./Game-Components/Sidemenu/SideMenu";
import Play from "./Game-Components/Play/Play";
import Library from "./Game-Components/Library/Library";
import Tournaments from "./Game-Components/Tournaments/Tournaments";
import Forum from "./Game-Components/Forum/Forum";

function Games() {
  const [activeSection, setActiveSection] = useState("play");
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

  const handleSectionActive = (target) => {
    setActiveSection(target);
  };

  return (
    <main className="games">
      <div className="games-sidemenu">
        <SideMenu active={activeSection} sectionActive={handleSectionActive} />
      </div>

      <div className="games-data">
        {loading && <p>Loading...</p>}
        {!loading && games.length > 0 && (
          <>
            {activeSection === "play" && (
              <Play games={games} loading={loading} />
            )}
            {activeSection === "library" && <Library games={games} />}

            {activeSection === "tournament" && <Tournaments games={games} />}
            {activeSection === "forum" && <Forum games={games} />}
          </>
        )}
      </div>
    </main>
  );
}

export default Games;
