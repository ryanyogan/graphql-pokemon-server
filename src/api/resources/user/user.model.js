import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

export const schema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  authenticate(rawPassword) {
    return bcrypt.compareSync(rawPassword, this.password);
  },
  hashPassword(rawPassword) {
    if (!rawPassword) {
      throw new Error('No password provided, could not save the user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(rawPassword, salt);
  },
};

export const User = mongoose.model('user', userSchema);
