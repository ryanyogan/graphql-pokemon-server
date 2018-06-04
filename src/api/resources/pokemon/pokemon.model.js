import mongoose from 'mongoose';

export const schema = {
  number: Number,
  name: {
    type: String,
    required: [true, 'A pokemon must have a name'],
    unique: true,
  },
  classification: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'A pokemon must have an image associated'],
  },
};

const pokemonSchema = new mongoose.Schema(schema);

export const Pokemon = mongoose.model('pokemon', pokemonSchema);
