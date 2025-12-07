// const mongoose = require("mongoose");

// const StaffSchema = new mongoose.Schema({
//   staffId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   role: { type: String, required: true },
//   phone: { type: String, required: true },
// });

// module.exports = mongoose.model("Staff", StaffSchema);

const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // NEW FIELD
  permissions: { type: [String], required: true }, // <-- NEW FIELD
});

module.exports = mongoose.model("Staff", StaffSchema);
