const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A pokemon must have a name'],
    unique: true,
  },
  img: {
    type: String,
    required: [true, 'A pokemon must have an image associated'],
  },
  type: [
    {
      type: String,
    },
  ],
  stats: {
    hp: Number,
    attack: String,
    defense: String,
    spattack: String,
    spdefense: String,
    speed: Number,
  },
  damages: {
    normal: String,
    fire: String,
    water: String,
    electric: String,
    grass: String,
    ice: String,
    fight: String,
    poison: String,
    ground: String,
    flying: String,
    psychic: String,
    bug: String,
    rock: String,
    ghost: String,
    dragon: String,
    dark: String,
    steel: String,
  },
  misc: {
    classification: String,
    height: String,
    weight: String,
  },
});

module.exports = mongoose.model('pokemon', pokemonSchema);
