import React, { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function GameSlide({ game, swiperInstance }) {
  const [active, setActive] = useState(false);

  const handleToggleVideo = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (swiperInstance?.autoplay) {
      // Make sure swiperInstance and autoplay exist
      if (active) {
        swiperInstance.autoplay.stop();
        console.log("Swiper autoplay stopped");
      } else {
        swiperInstance.autoplay.start();
        console.log("Swiper autoplay started");
      }
    } else {
      console.warn("Swiper instance or autoplay is not defined");
    }
  }, [active, swiperInstance]);

  return (
    <div className="game-slider">
      <img
        src={`http://127.0.0.1:5000/games/${game.image_url}`}
        alt={game.title}
      />
      <div className={`video ${active ? "active" : ""}`}>
        <iframe
          width="1280"
          height="720"
          src={game.trailer}
          title={game.title}
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

export default GameSlide;
