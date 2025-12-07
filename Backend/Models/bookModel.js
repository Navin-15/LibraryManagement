// import mongoose from 'mongoose';

// const BookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   category: { type: String },
//   price: { type: Number }
// });

// export default mongoose.model('Book', BookSchema);

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  publicationYear: { type: Number },
  availableCopies: { type: Number, min: 0 },
  isbn: { type: String, required: true, unique: true },
  rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Book", bookSchema);
