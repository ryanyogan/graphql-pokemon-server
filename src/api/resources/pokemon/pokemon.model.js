import mongoose from 'mongoose';

export const schema = {
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
  misc: {
    classification: String,
    height: String,
    weight: String,
  },
};

const pokemonSchema = new mongoose.Schema(schema);

export const Pokemon = mongoose.model('pokemon', pokemonSchema);
