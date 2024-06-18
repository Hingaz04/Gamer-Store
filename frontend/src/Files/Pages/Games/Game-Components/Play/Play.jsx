import React from "react";
import "./Play.css";
import GameSwiper from "./GameSwiper";
import GameCard from "./GameCard";

function Play({ games, loading }) {
  return (
    <section className="play">
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1>GAMES</h1>
            <div>
              <GameSwiper games={games} />
            </div>
            <div>
              <div>
                <h2 className="play-head">Games on promotion</h2>
              </div>
            </div>
            <div className="row">
              {games.map((game) => (
                <GameCard key={game._id} game={game} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Play;
