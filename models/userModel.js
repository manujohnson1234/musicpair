const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true }, 
  password: { type: String }, 
  email: { type: String, unique: true, required: true }, 
  googleId: { type: String, unique: true, sparse: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
