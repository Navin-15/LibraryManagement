// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect("mongodb://127.0.0.1:27017/libraryDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error(err));

// // Book Schema
// const bookSchema = new mongoose.Schema({
//   bookId: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: { type: String },
//   publicationYear: { type: Number },
//   availableCopies: { type: Number, min: 0 },
//   isbn: { type: String, required: true, unique: true },
//   rating: { type: Number, min: 1, max: 5 },
// });

// const Book = mongoose.model("Book", bookSchema);

// // Routes
// app.post("/api/books", async (req, res) => {
//   try {
//     const newBook = new Book(req.body);
//     await newBook.save();
//     res.status(201).json({ message: "Book created successfully", book: newBook });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./Routes/bookRoutes");
const memberRoutes = require("./Routes/memberRoutes");
const transactionRoutes = require("./Routes/transactionRoutes");
const staffRoutes = require("./Routes/staffRoutes");
const AuthRoutes = require("./Routes/authRoutes");
const app = express();
require('dotenv').config()

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection

// mongoose.connect("mongodb://127.0.0.1:27017/libraryDB"

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/staff", staffRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
