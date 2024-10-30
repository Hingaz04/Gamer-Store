import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import HomeSwiper from "./HomeSwiper";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/games/games");
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <div className="game-description">
          <div className="headers">
            <h1 className="h2">CALL OF DUTY</h1>
            <h1 className="h1">STEP INTO THE BATTLEFIELD</h1>
            <h1 className="h3">GEAR UP, SOLDIER!</h1>
          </div>
          <div className="description">
            <p>
              Join the ranks and experience the ultimate warfare with Call of
              Duty. From high-stakes missions to intense multiplayer battles,
              every moment is a fight for survival. Suit up, take on enemies,
              and become a legend. Your mission starts here—grab your copy now
              and dominate the battlefield!
            </p>
          </div>
        </div>

        <div className="start">
          <button className="start-button">
            <Link className="links-shop" to="/signup">
              <p>SHOP NOW</p>
              <FaShopify className="shop-icon" />
            </Link>
          </button>
        </div>
      </div>
      <div className="bottom-content">
        <div className="home-carousel">
          <h1 className="h2-carousel">Top Selections</h1>
          <div className="carousel">
            {loading ? <div>Loading...</div> : <HomeSwiper games={games} />}
          </div>
          <div className="social-icons">
            <FontAwesomeIcon className="icon" icon={faFacebook} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
            <FontAwesomeIcon className="icon" icon={faTwitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
