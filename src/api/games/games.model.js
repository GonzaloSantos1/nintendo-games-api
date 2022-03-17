const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    year: {type: Number, required: false, trim: true},
    genre: {type: String, required: false, trim: true},
    img: {type: String, required: false, trim: true},
    characters: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'characters', required: true},
    ],
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('games', gameSchema);
module.exports = Game;
