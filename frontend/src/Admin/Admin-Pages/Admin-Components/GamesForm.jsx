import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import { useEffect } from "react";
import axios from "axios";

function GamesForm() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image_url: null,
    genre: "",
    description: "",
    rating: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const parsedToken = JSON.parse(token);
    const accessToken = parsedToken.accessToken;

    axios
      .get("http://127.0.0.1:5000/games/games", {
        headers: { Authorization: `Bearer:${accessToken}` },
      })
      .then((response) => {
        console.log("Fetched games: ", response.data);
        setGames(response.data);
      })
      .catch((err) => {
        console.error("Error fetching games", err);
        setError("Failed to fetch games");
      });
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
    if (!form.image_url) newErrors.image_url = "Image is Required";
    if (!form.genre) newErrors.genre = "Genre is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.rating) newErrors.rating = "Rating is required";
    if (!form.price) newErrors.price = "Price is Required";

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
        setGames([response.data, ...games]);
        setSuccess("Game added successfully");
        setLoading(false);
        setForm({
          title: "",
          image_url: null,
          genre: "",
          description: "",
          rating: "",
          price: "",
        });
      })
      .catch((err) => {
        console.error("Failed to add Game", err);
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
          <div className="form-group">
            <label>Game Title:</label>
            <input type="text" name="title" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game Image:</label>
            <input type="file" name="image_url" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game Genre:</label>
            <input type="text" name="genre" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game Description:</label>
            <input type="text" name="description" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game Rating:</label>
            <input type="text" name="rating" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game Price:</label>
            <input type="text" name="price" onChange={handleChange} />
          </div>

          <button type="submit">Add Game</button>
        </form>
      </div>
      <div className="game-list">
        <h1>Game List</h1>
        {games.length === 0 && <p>No games available.</p>}
        <ul>
          {games.map((game) => (
            <li>
              {game.id}
              <p>{game.title}</p>
              <img
                src={`http://127.0.0.1:5000/games/${game.image_url}`}
                alt="game image"
              />
              <p>{game.genre}</p>
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
