const express = require("express");
const router = express.Router();
const Member = require("../Models/memberModel");

// ✅ POST: Create new member
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: "Member created successfully!", member: newMember });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET: Fetch all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: Delete multiple members by IDs
router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body;
    await Member.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Members deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
