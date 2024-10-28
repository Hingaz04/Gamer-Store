import React from "react";
import "./GameCard.css";

function GameCard({ game }) {
  return (
    <div className="game-card">
      <img
        src={`http://127.0.0.1:5000/games/${game.image_url}`}
        alt="game image"
      />
      <h2 className="game-title">{game.title}</h2>
      <p className="game-type">
        <span>Genre:</span>
        {game.genre}
      </p>
      <p>
        <span>Rating:</span>
        {game.rating}
      </p>
      <p>
        <span>Price:</span>${game.price}
      </p>
    </div>
  );
}

export default GameCard;
