// today working 13/11/2025

// const express = require("express");
// const Transaction = require("../Models/TransactionModel");
// const Book = require("../Models/bookModel");

// const router = express.Router();

// /**
//  * 🟢 CREATE a new transaction
//  * - Decrease book count by 1 when issued
//  */
// router.post("/", async (req, res) => {
//   try {
//     const { book: bookId, status } = req.body;

//     // Save new transaction
//     const newTransaction = new Transaction(req.body);
//     await newTransaction.save();

//     // If book is issued, reduce its available copies
//     if (status === "Issued" && bookId) {
//       await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });
//     }

//     res.status(201).json({ message: "Transaction created successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * 🟢 GET all transactions (with member and book details)
//  */
// router.get("/", async (req, res) => {
//   try {
//     const transactions = await Transaction.find()
//       .populate("member", "name memberId")
//       .populate("book", "title bookId availableCopies");
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // /**
// //  * 🟡 UPDATE transaction status (Issued → Returned)
// //  * - If status becomes "Returned", increase book count by 1
// //  */
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     const transaction = await Transaction.findById(req.params.id);

// //     if (!transaction) {
// //       return res.status(404).json({ error: "Transaction not found" });
// //     }

// //     // Update transaction status
// //     transaction.status = status;
// //     await transaction.save();

// //     // When book is returned, increase book count
// //     if (status === "Returned" && transaction.book) {
// //       await Book.findByIdAndUpdate(transaction.book, {
// //         $inc: { availableCopies: 1 },
// //       });
// //     }

// //     res.json({ message: "Transaction updated successfully!" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// //new put request

// /**
//  * 🟡 UPDATE transaction status (Issued → Returned)
//  * - If status becomes "Returned", increase book count by 1
//  */
// router.put("/:id", async (req, res) => {
//   try {
//     const { status } = req.body;

//     // Find transaction first
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }

//     // Get the book ID from transaction (ObjectId)
//     const bookId = transaction.book;

//     // 🧠 Only increase count if changing from "Issued" → "Returned"
//     if (transaction.status === "Issued" && status === "Returned" && bookId) {
//       await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });
//     }

//     // Update the transaction status and save
//     transaction.status = status;
//     await transaction.save();

//     res.json({ message: "Transaction updated successfully!" });
//   } catch (err) {
//     console.error("Error updating transaction:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * 🔴 DELETE transaction
//  * - Optionally restore book count if deleted while status is Issued
//  */
// router.delete("/:id", async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // If the transaction was "Issued", return that copy back
//     if (transaction.status === "Issued" && transaction.book) {
//       await Book.findByIdAndUpdate(transaction.book, {
//         $inc: { availableCopies: 1 },
//       });
//     }

//     await Transaction.findByIdAndDelete(req.params.id);
//     res.json({ message: "Transaction deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

//functioning code for (Issued → Returned / Overdue) 

// const express = require("express");
// const Transaction = require("../Models/TransactionModel");
// const Book = require("../Models/bookModel");

// const router = express.Router();

// /**
//  * 🟢 CREATE a new transaction
//  * - Decrease book count by 1 when issued
//  */
// router.post("/", async (req, res) => {
//   try {
//     const { book: bookId, status } = req.body;

//     // Save new transaction
//     const newTransaction = new Transaction(req.body);
//     await newTransaction.save();

//     // If book is issued, reduce its available copies
//     if (status === "Issued" && bookId) {
//       await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });
//     }

//     res.status(201).json({ message: "Transaction created successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * 🟢 GET all transactions (with member and book details)
//  */
// router.get("/", async (req, res) => {
//   try {
//     const transactions = await Transaction.find()
//       .populate("member", "name memberId")
//       .populate("book", "title bookId availableCopies");
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * 🟡 UPDATE transaction status (Issued → Returned / Overdue)
//  * - If status becomes "Returned", increase book count by 1
//  * - If status becomes "Overdue", calculate fine
//  */
// router.put("/:id", async (req, res) => {
//   try {
//     const { status, returnDate, issueDate } = req.body;
//     const finePerDay = 10;

//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }

//     const bookId = transaction.book;

//     // If returning book, increase count
//     if (transaction.status === "Issued" && status === "Returned" && bookId) {
//       await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });
//     }

//     // Update fields
//     transaction.status = status;
//     transaction.returnDate = returnDate || transaction.returnDate;
//     transaction.issueDate = issueDate || transaction.issueDate;

//     // Calculate fine if overdue
//     if (status === "Overdue") {
//       const issue = new Date(transaction.issueDate);
//       const ret = new Date(transaction.returnDate);
//       const diffDays = Math.ceil((ret - issue) / (1000 * 60 * 60 * 24));
//       transaction.fineAmount = diffDays > 0 ? diffDays * finePerDay : 0;
//     } else {
//       transaction.fineAmount = 0;
//     }

//     await transaction.save();
//     res.json({ message: "Transaction updated successfully!" });
//   } catch (err) {
//     console.error("Error updating transaction:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * 🔴 DELETE transaction
//  * - Optionally restore book count if deleted while status is Issued
//  */
// router.delete("/:id", async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // If the transaction was "Issued", return that copy back
//     if (transaction.status === "Issued" && transaction.book) {
//       await Book.findByIdAndUpdate(transaction.book, {
//         $inc: { availableCopies: 1 },
//       });
//     }

//     await Transaction.findByIdAndDelete(req.params.id);
//     res.json({ message: "Transaction deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// Finalized Transaction routes code

const express = require("express");
const Transaction = require("../Models/TransactionModel");
const Book = require("../Models/bookModel");

const router = express.Router();

/**
 * 🟢 CREATE a new transaction
 * - Decrease book count by 1 when issued
 * - Ensure created transactions are marked "Issued" and fineAmount = 0
 */
router.post("/", async (req, res) => {
  try {
    // Ensure status for new transaction is Issued and fine is 0
    const payload = {
      ...req.body,
      status: "Issued",
      fineAmount: 0,
    };

    // Save new transaction
    const newTransaction = new Transaction(payload);
    await newTransaction.save();

    // If book is issued, reduce its available copies
    const bookId = payload.book;
    if (bookId) {
      await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });
    }

    res.status(201).json({ message: "Transaction created successfully!" });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🟢 GET all transactions (with member and book details)
 */
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("member", "name memberId")
      .populate("book", "title bookId availableCopies");
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🟡 UPDATE transaction status (Issued → Returned / Overdue)
 * - If status becomes "Returned" or "Overdue", increase book count by 1 (book returned)
 * - If status becomes "Overdue", calculate fine based on expected return date stored in DB
 *   Fine = number of late days * 2 (₹2 per day)
 *
 * Expected behavior:
 * - existingTransaction.returnDate = expected return date (before updating)
 * - req.body.returnDate = actual return date (when user updates)
 * - lateDays = ceil((actual - expected) / msPerDay) if actual > expected
 */
router.put("/:id", async (req, res) => {
  try {
    const { status, returnDate: actualReturnDate, issueDate } = req.body;
    const finePerDay = 2; // ₹2 per day

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const bookId = transaction.book;

    // Detect a transition from Issued -> Returned/Overdue (book comes back)
    if (transaction.status === "Issued" && (status === "Returned" || status === "Overdue")) {
      if (bookId) {
        await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });
      }
    }

    // Determine expected (stored) return date and actual (incoming)
    const expected = transaction.returnDate ? new Date(transaction.returnDate).setHours(0, 0, 0, 0) : null;
    const actual = actualReturnDate ? new Date(actualReturnDate).setHours(0, 0, 0, 0) : null;

    // Update fields
    transaction.status = status || transaction.status;
    transaction.returnDate = actualReturnDate || transaction.returnDate;
    transaction.issueDate = issueDate || transaction.issueDate;

    // Calculate fine if overdue
    if (status === "Overdue" && expected && actual && actual > expected) {
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffMs = actual - expected;
      const diffDays = Math.ceil(diffMs / msPerDay);
      transaction.fineAmount = diffDays > 0 ? diffDays * finePerDay : 0;
    } else {
      // Not overdue => fine 0
      transaction.fineAmount = 0;
    }

    await transaction.save();

    res.json({ message: "Transaction updated successfully!", transaction });
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🔴 DELETE transaction
 * - Optionally restore book count if deleted while status is Issued
 */
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // If the transaction was "Issued", return that copy back
    if (transaction.status === "Issued" && transaction.book) {
      await Book.findByIdAndUpdate(transaction.book, {
        $inc: { availableCopies: 1 },
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

