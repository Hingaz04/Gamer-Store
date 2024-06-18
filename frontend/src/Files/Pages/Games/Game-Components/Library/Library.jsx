import React, { useState, useEffect } from "react";
import "./Library.css";
import GameCard from "../Play/GameCard";

function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/games/games")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const gamesByGenre = games.reduce((acc, game) => {
    if (!acc[game.genre]) {
      acc[game.genre] = [];
    }
    acc[game.genre].push(game);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="library">
      <h1>Library</h1>
      <div className="library-top">
        <h1>Call of Duty: Black Ops</h1>
        <p className="paragraph">
          Play the narrative of Black Ops uniquely told through the eyes of{" "}
          <span>Alex Mason</span>, a special forces operative who is
          interrogated about his involvement in various clandestine missions.
        </p>
      </div>
      <div className="library-bottom">
        <h1>Game Categories</h1>
        {Object.keys(gamesByGenre).map((genre) => (
          <div className="genre-card" key={genre}>
            <h2 className="genre">{genre}</h2>
            <div className="game-card-container">
              {gamesByGenre[genre].map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
