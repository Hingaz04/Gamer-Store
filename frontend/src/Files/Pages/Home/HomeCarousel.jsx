import React, { useState, useEffect } from "react";
import "./HomeCarousel.css";
import { FaPause, FaPlay } from "react-icons/fa";

function HomeCarousel({ game, swiperInstance }) {
  const [active, setActive] = useState(false);

  const handleToggleVideo = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  useEffect(() => {
    if (swiperInstance) {
      if (active) {
        swiperInstance.autoplay?.stop();
      } else {
        swiperInstance.autoplay?.start();
      }
    }
  }, [active, swiperInstance]);

  return (
    <div className="home-slider">
      <img
        src={`http://127.0.0.1:5000/games/${game.image_url}`}
        alt={game.title}
      />
      <div className={`video ${active ? "active" : ""}`}>
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
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <div className="buttons">
          <a href="#" className="order-btn">
            Order Now
          </a>
          <a
            href="#"
            className={`play-btn ${active ? "active" : ""}`}
            onClick={handleToggleVideo}
          >
            <span className="pause">
              <FaPause />
            </span>
            <span className="play">
              <FaPlay />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeCarousel;
