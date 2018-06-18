const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A Good team, must have a name'],
  },
  pokemons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pokemon',
    },
  ],
});

module.exports = mongoose.model('team', teamSchema);
