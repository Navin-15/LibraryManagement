const express = require("express");
const Staff = require("../Models/StaffModel");
const router = express.Router();

// LOGIN STAFF
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check staff
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: "Invalid Email" });
    }

    // Check password
    if (staff.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).json({
      message: "Login Successful",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        permissions: staff.permissions, // VERY IMPORTANT
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
