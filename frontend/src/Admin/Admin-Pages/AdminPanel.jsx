import React, { useEffect, useState } from "react";
import axios from "axios";
import GameUpload from "../Game-Upload/GameUpload";

function AdminPanel() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/games")
      .then((response) => {
        const { data } = response;
        if (!data || data.length === 0) {
          console.error("No games found");
          return;
        }
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <GameUpload />
      <div className="games">
        <h2>All Games</h2>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game._id} className="game-item">
              <h3>{game.title}</h3>
              <img
                src={`http://localhost:4000/games/uploads/${game.image}`}
                alt={game.title}
                width="150"
              />
              <p>Genre: {game.genre}</p>
              <p>Rating: {game.rating}</p>
              <p>Price: ${game.price}</p>
            </div>
          ))
        ) : (
          <p>No games available</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
