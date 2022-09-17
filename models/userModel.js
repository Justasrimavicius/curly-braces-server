const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  correctTestAnswers: Number,
  });

module.exports = mongoose.model('User',userSchema);
