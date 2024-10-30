import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import axios from "axios";

function GamesForm() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image_url: null,
    genre: "",
    level: "",
    trailer: "",
    description: "",
    rating: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to fetch the games list
  const fetchGames = () => {
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const parsedToken = JSON.parse(token);
    const accessToken = parsedToken.accessToken;

    axios
      .get("http://127.0.0.1:5000/games/games", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("Fetched games: ", response.data);
        setGames(response.data);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
        setError("Failed to fetch games");
      });
  };

  // Use the fetchGames function inside useEffect
  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url") {
      setForm((prevForm) => ({ ...prevForm, image_url: files[0] }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.image_url) newErrors.image_url = "Image is required";
    if (!form.genre) newErrors.genre = "Genre is required";
    if (!form.level) newErrors.level = "Level is required";
    if (!form.trailer) newErrors.trailer = "Trailer is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.rating) newErrors.rating = "Rating is required";
    if (!form.price) newErrors.price = "Price is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors && Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const parsedToken = JSON.parse(token);
    const accessToken = parsedToken.accessToken;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image_url", form.image_url);
    formData.append("genre", form.genre);
    formData.append("level", form.level);
    formData.append("trailer", form.trailer);
    formData.append("description", form.description);
    formData.append("rating", form.rating);
    formData.append("price", form.price);

    setLoading(true);

    axios
      .post("http://127.0.0.1:5000/games/games", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Game added", response.data);
        setSuccess("Game added successfully");
        setLoading(false);
        setForm({
          title: "",
          image_url: null,
          genre: "",
          level: "",
          trailer: "",
          description: "",
          rating: "",
          price: "",
        });
        // Refresh the games list after adding a new game
        fetchGames();
      })
      .catch((err) => {
        console.error("Failed to add game", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const parsedToken = JSON.parse(token);
    const accessToken = parsedToken.accessToken;

    axios
      .delete(`http://127.0.0.1:5000/games/game/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setGames(games.filter((item) => item.id !== id));
        alert("Game deleted successfully!");
      })
      .catch((err) => {
        console.error("Failed to delete the game", err);
        setError("Failed to delete the game");
      });
  };

  return (
    <div className="games-addition-page">
      <h1>Games</h1>
      <Link to="/admin-panel">Back to admin dashboard</Link>
      <div className="form">
        <form onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Game"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <div className="game-list">
        <h1>Game List</h1>
        {games.length === 0 && <p>No games available.</p>}
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <p>{game.title}</p>
              <img
                src={`http://127.0.0.1:5000/games/${game.image_url}`}
                alt="game image"
              />
              <p>{game.genre}</p>
              <p>{game.level}</p>
              <p>{game.trailer}</p>
              <p>{game.description}</p>
              <p>{game.rating}</p>
              <p>{game.price}</p>
              <button onClick={() => handleDelete(game.id)}>Delete Game</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GamesForm;
