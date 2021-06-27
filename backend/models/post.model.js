const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  creationDate: { type: String, required: true },
  editDate: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array },
  image: { type: Object},
  price: { type: Number },
  tel: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
