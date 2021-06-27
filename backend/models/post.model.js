const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  creationDate: { type: String, required: true },
  editDate: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array, required: true },
  image: { type: String},
  price: { type: Number },
  tel: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
