import React, { useState } from "react";
import "./HomeCarousel.css";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

function HomeCarousel({ game }) {
  const [active, setActive] = useState(false);

  const handleToggleVideo = () => {
    setActive(!active);
  };
  return (
    <div className="home-slider">
      <img
        src={`http://127.0.0.1:5000/games/${game.image_url}`}
        alt={game.title}
      />
      <div className={`video ${active ? "active" : undefined}`}>
        <iframe
          width="1280"
          height="720"
          src={game.trailer}
          title={game.name}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
      <div className="content">
        <h2>{game.name}</h2>
        <p>{game.description}</p>
        <div className="buttons">
          <a href="#" className="order-btn">
            Order Now
          </a>
          <a
            href="#"
            className={`play-btn ${active ? "active" : undefined}`}
            onClick={handleToggleVideo}
          >
            <span className="pause">
              <i className="bi bi-pause-fill">
                <FaPause />
              </i>
            </span>
            <span className="play">
              <i className="bi bi-play-fill">
                <FaPlay />
              </i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeCarousel;
