const mongoose = require('mongoose');
const characterSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    species: {type: String, required: false, trim: true},
    gender: {type: String, required: false, trim: true},
    personality: {type: String, required: false, trim: true},
    img: {type: String, required: false, trim: true},
  },
  {timestamps: true}
);

const Character = mongoose.model('characters', characterSchema);
module.exports = Character;
