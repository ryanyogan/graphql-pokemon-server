import mongoose from 'mongoose';

export const schema = {
  name: {
    type: String,
    required: [true, 'A Good team, must have a name'],
  },
  pokemons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pokemon',
    },
  ],
};

const teamSchema = new mongoose.Schema(schema);

export const Team = mongoose.model('team', teamSchema);
