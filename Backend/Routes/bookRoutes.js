// import express from 'express';
// import Book from '../Models/bookModel.js';

// const router = express.Router();

// // Create a book
// router.post('/create', async (req, res) => {
//   try {
//     const book = new Book(req.body);
//     await book.save();
//     res.status(201).json(book);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all books
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;

//correct code 

const express = require("express");
const router = express.Router();
const Book = require("../Models/bookModel");

// POST: Create a new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET: Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: Delete multiple books by IDs
router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body;
    await Book.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Books deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

