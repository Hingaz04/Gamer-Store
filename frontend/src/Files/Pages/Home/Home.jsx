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
      <div className="headers">
        <h1 className="h1">WELCOME TO THE</h1>
        <h1 className="h2">NEXT LEVEL</h1>
        <h1 className="h2">GAMING CENTER</h1>
      </div>
      <div className="description">
        <p>
          Elevate your gaming experience with our gaming products from video
          games to consoles. We are the largest and most trusted gaming store
          and online entertainment throughout Africa and beyond.
        </p>
      </div>
      <div className="start">
        <button>
          <Link className="links" to="/signup">
            <p>SHOP WITH US</p>
            <FaShopify className="shop-icon" />
          </Link>
        </button>
      </div>
      <div className="home-carousel">
        <h1>Top Selections</h1>{" "}
        <div className="carousel">
          {loading ? <div>Loading...</div> : <HomeSwiper games={games} />}
        </div>
      </div>

      <div className="social-icons">
        <FontAwesomeIcon className="icon" icon={faFacebook} />
        <FontAwesomeIcon className="icon" icon={faInstagram} />
        <FontAwesomeIcon className="icon" icon={faTwitter} />
      </div>
    </div>
  );
};

export default Home;
