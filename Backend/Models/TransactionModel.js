const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { type: String, enum: ["Issued", "Returned", "Overdue"], required: true },
  fineAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Transaction", transactionSchema);
