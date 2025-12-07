// const express = require("express");
// const Staff = require("../Models/StaffModel");

// const router = express.Router();

// // ✅ CREATE Staff
// router.post("/", async (req, res) => {
//   try {
//     const newStaff = new Staff(req.body);
//     await newStaff.save();
//     res.status(201).json({ message: "Staff added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ GET All Staff
// router.get("/", async (req, res) => {
//   try {
//     const staffList = await Staff.find();
//     res.json(staffList);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ DELETE staff by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Staff.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Staff not found" });
//     res.json({ message: "Staff deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// module.exports = router;

const express = require("express");
const Staff = require("../Models/StaffModel");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json({ message: "Staff added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
