const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  startDate: { type: Date, required: true },
  membershipType: { type: String, required: true, enum: ["Basic", "Premium", "Elite"] },
  maxBooks: { type: Number, required: true },
});

module.exports = mongoose.model("Member", memberSchema);
