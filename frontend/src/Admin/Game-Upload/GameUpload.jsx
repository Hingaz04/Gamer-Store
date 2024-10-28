import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import "./Gameupload.css";

function GamesFormPage() {
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!_id) {
      return;
    }

    axios
      .get(`http://localhost:4000/games/games/${_id}`) // Updated endpoint to match your backend
      .then((response) => {
        const { data } = response;
        if (!data) {
          console.error("No game found with the given ID");
          return;
        }
        setTitle(data.title);
        setImage(data.image);
        setGenre(data.genre);
        setRating(data.rating);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, [_id]);

  async function saveGame(ev) {
    ev.preventDefault();
    const gameData = {
      title,
      image,
      genre,
      rating,
      price,
    };

    try {
      if (_id) {
        await axios.put(`http://localhost:4000/games/games${_id}`, gameData); // Updated endpoint to match your backend
      } else {
        await axios.post("http://localhost:4000/games/games", gameData); // Ensure this endpoint is correct
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  }

  // if (redirect) {
  //   return <Navigate to="/games" />;
  // }

  function uploadImage(ev) {
    const file = ev.target.files[0];
    const data = new FormData();
    data.append("image", file);

    axios
      .post("http://localhost:4000/games/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const filename = response.data;
        setImage(filename);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

  return (
    <div className="games-form">
      <h1>GAME DATA</h1>
      <form onSubmit={saveGame} className="form">
        <div className="form-group">
          <label htmlFor="title">Game Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Title of the game"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Game Image</label>
          <input type="file" id="image" onChange={uploadImage} />
          {image && (
            <div>
              <img
                src={`http://localhost:4000/games/uploads/${image}`}
                alt="Game"
                className="image-preview"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(ev) => setGenre(ev.target.value)}
            placeholder="Game Genre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(ev) => setRating(ev.target.value)}
            placeholder="Game Rating"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Game Price"
          />
        </div>

        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
}

export default GamesFormPage;
