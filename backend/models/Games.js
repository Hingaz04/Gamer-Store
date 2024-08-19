const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  image: String,
  title: String,
  genre: String,
  Rating: Number,
  price: Number,
});

const GameModel = mongoose.model("Game", GameSchema);
module.exports = GameModel;
