// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Transactions/CreateTransaction.css";
// import { useLocation } from "react-router-dom";

// const CreateTransaction = () => {
//   const location = useLocation();
//   const existingTransaction = location.state?.transaction || null;

//   const [transactionId] = useState(
//     existingTransaction?.transactionId || "TXN-" + Math.floor(Math.random() * 100000)
//   );

//   const [formData, setFormData] = useState({
//     member: existingTransaction?.member?._id || "",
//     book: existingTransaction?.book?._id || "",
//     issueDate: existingTransaction
//       ? new Date(existingTransaction.issueDate).toISOString().split("T")[0]
//       : new Date().toISOString().split("T")[0],
//     returnDate: existingTransaction
//       ? new Date(existingTransaction.returnDate).toISOString().split("T")[0]
//       : "",
//     status: existingTransaction?.status || "",
//     fineAmount: existingTransaction?.fineAmount || 0,
//   });

//   const [members, setMembers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [errors, setErrors] = useState({});
//   const statusOptions = ["Issued", "Returned", "Overdue"];
//   const finePerDay = 10;

//   // ✅ Fetch members and books
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [membersRes, booksRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/members"),
//           axios.get("http://localhost:5000/api/books"),
//         ]);
//         setMembers(membersRes.data);
//         setBooks(booksRes.data);
//       } catch (err) {
//         console.error("Error fetching members/books:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Auto calculate fine
//   useEffect(() => {
//     if (formData.returnDate && formData.issueDate && formData.status === "Overdue") {
//       const issue = new Date(formData.issueDate);
//       const ret = new Date(formData.returnDate);
//       const diffDays = Math.ceil((ret - issue) / (1000 * 60 * 60 * 24));
//       setFormData((prev) => ({
//         ...prev,
//         fineAmount: diffDays > 0 ? diffDays * finePerDay : 0,
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, fineAmount: 0 }));
//     }
//   }, [formData.returnDate, formData.issueDate, formData.status]);

//   // ✅ Validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.member) newErrors.member = "Select a member.";
//     if (!formData.book) newErrors.book = "Select a book.";
//     if (!formData.issueDate) newErrors.issueDate = "Issue date is required.";
//     if (!formData.returnDate) newErrors.returnDate = "Return date is required.";
//     else if (new Date(formData.returnDate) < new Date(formData.issueDate))
//       newErrors.returnDate = "Return date must be after issue date.";
//     if (!formData.status) newErrors.status = "Select status.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit / Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const payload = { transactionId, ...formData };

//         if (existingTransaction) {
//           await axios.put(
//             `http://localhost:5000/api/transactions/${existingTransaction._id}`,
//             payload
//           );
//           alert("Transaction Updated Successfully ✅");
//         } else {
//           await axios.post("http://localhost:5000/api/transactions", payload);
//           alert("Transaction Created Successfully ✅");
//         }

        
//       } catch (err) {
//         console.error("Error saving transaction:", err);
//         alert("Error saving transaction!");
//       }
//     }
//   };

//   return (
//     <div className="transaction-form-container">
//       <h2>{existingTransaction ? "Update Transaction" : "Create New Transaction"}</h2>
//       <form className="transaction-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Transaction ID</label>
//           <input type="text" value={transactionId} disabled />
//         </div>

//         <div className="form-group">
//           <label>
//             Member <span className="required">*</span>
//           </label>
//           <select name="member" value={formData.member} onChange={handleChange}>
//             <option value="">Select Member</option>
//             {members.map((m) => (
//               <option key={m._id} value={m._id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//           {errors.member && <span className="error">{errors.member}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Book <span className="required">*</span>
//           </label>
//           <select name="book" value={formData.book} onChange={handleChange}>
//             <option value="">Select Book</option>
//             {books.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.title}
//               </option>
//             ))}
//           </select>
//           {errors.book && <span className="error">{errors.book}</span>}
//         </div>

//         <div className="form-group">
//           <label>Issue Date</label>
//           <input
//             type="date"
//             name="issueDate"
//             value={formData.issueDate}
//             onChange={handleChange}
//           />
//           {errors.issueDate && <span className="error">{errors.issueDate}</span>}
//         </div>

//         <div className="form-group">
//           <label>Return Date</label>
//           <input
//             type="date"
//             name="returnDate"
//             value={formData.returnDate}
//             onChange={handleChange}
//           />
//           {errors.returnDate && <span className="error">{errors.returnDate}</span>}
//         </div>

//         <div className="form-group">
//           <label>Status</label>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="">Select Status</option>
//             {statusOptions.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//           {errors.status && <span className="error">{errors.status}</span>}
//         </div>

//         <div className="form-group">
//           <label>Fine Amount ($)</label>
//           <input type="number" value={formData.fineAmount} disabled />
//         </div>

//         <button type="submit" className="submit-btn">
//           {existingTransaction ? "Update Transaction" : "Create Transaction"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTransaction;

// changes code remove the fine amount field while creating new transaction in 14/11/2025

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Transactions/CreateTransaction.css";
// import { useLocation } from "react-router-dom";

// const CreateTransaction = () => {
//   const location = useLocation();
//   const existingTransaction = location.state?.transaction || null;

//   const [transactionId] = useState(
//     existingTransaction?.transactionId || "TXN-" + Math.floor(Math.random() * 100000)
//   );

//   const [formData, setFormData] = useState({
//     member: existingTransaction?.member?._id || "",
//     book: existingTransaction?.book?._id || "",
//     issueDate: existingTransaction
//       ? new Date(existingTransaction.issueDate).toISOString().split("T")[0]
//       : new Date().toISOString().split("T")[0],
//     returnDate: existingTransaction
//       ? new Date(existingTransaction.returnDate).toISOString().split("T")[0]
//       : "",
//     status: existingTransaction?.status || "",
//     fineAmount: existingTransaction?.fineAmount || 0,
//   });

//   const [members, setMembers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [errors, setErrors] = useState({});
//   const finePerDay = 2; // <-- Updated to ₹2 as requested

//   // 🔥 Dynamic status options
//   const createOptions = ["Issued"];
//   const updateOptionsNormal = ["Returned"];
//   const updateOptionsOverdue = ["Returned", "Overdue"];

//   // ⛔ Do not show fine field at creation
//   const showFineField =
//     existingTransaction && formData.status === "Overdue";

//   // -------------------------------------------------------------------

//   // Fetch members + books
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const [mem, bk] = await Promise.all([
//           axios.get("http://localhost:5000/api/members"),
//           axios.get("http://localhost:5000/api/books"),
//         ]);
//         setMembers(mem.data);
//         setBooks(bk.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     load();
//   }, []);

//   // 🔥 Fine calculation ONLY when updating and status is Overdue
//   useEffect(() => {
//     if (!existingTransaction) return; // ignore for create

//     if (formData.status === "Overdue") {
//       const expectedReturn = new Date(existingTransaction.returnDate);
//       const actualReturn = new Date(formData.returnDate);

//       const diffDays = Math.ceil(
//         (actualReturn - expectedReturn) / (1000 * 60 * 60 * 24)
//       );

//       setFormData((prev) => ({
//         ...prev,
//         fineAmount: diffDays > 0 ? diffDays * finePerDay : 0,
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, fineAmount: 0 }));
//     }
//   }, [formData.returnDate, formData.status]);

//   // -------------------------------------------------------------------

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.member) newErrors.member = "Select a member.";
//     if (!formData.book) newErrors.book = "Select a book.";
//     if (!formData.issueDate) newErrors.issueDate = "Issue date required.";

//     if (!formData.returnDate) newErrors.returnDate = "Return date required.";
//     else if (new Date(formData.returnDate) < new Date(formData.issueDate))
//       newErrors.returnDate = "Return date must be after issue date.";

//     if (!formData.status) newErrors.status = "Select status.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const payload = { transactionId, ...formData };

//         if (existingTransaction) {
//           await axios.put(
//             `http://localhost:5000/api/transactions/${existingTransaction._id}`,
//             payload
//           );
//           alert("Transaction Updated Successfully");
//         } else {
//           await axios.post("http://localhost:5000/api/transactions", payload);
//           alert("Transaction Created Successfully");
//         }
//       } catch (err) {
//         console.error("Save Error:", err);
//         alert("Error saving!");
//       }
//     }
//   };

//   // -------------------------------------------------------------------

//   // 🔥 Build dropdown options dynamically
//   const getStatusOptions = () => {
//     if (!existingTransaction) return createOptions; // Only "Issued"

//     const today = new Date();
//     const expectedReturn = new Date(existingTransaction.returnDate);

//     // Is book returned late?
//     const isLateReturn = today > expectedReturn;

//     return isLateReturn ? updateOptionsOverdue : updateOptionsNormal;
//   };

//   // -------------------------------------------------------------------

//   return (
//     <div className="transaction-form-container">
//       <h2>{existingTransaction ? "Update Transaction" : "Create New Transaction"}</h2>

//       <form className="transaction-form" onSubmit={handleSubmit}>

//         <div className="form-group">
//           <label>Transaction ID</label>
//           <input type="text" value={transactionId} disabled />
//         </div>

//         <div className="form-group">
//           <label>Member *</label>
//           <select name="member" value={formData.member} onChange={handleChange}>
//             <option value="">Select Member</option>
//             {members.map((m) => (
//               <option key={m._id} value={m._id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//           {errors.member && <span className="error">{errors.member}</span>}
//         </div>

//         <div className="form-group">
//           <label>Book *</label>
//           <select name="book" value={formData.book} onChange={handleChange}>
//             <option value="">Select Book</option>
//             {books.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.title}
//               </option>
//             ))}
//           </select>
//           {errors.book && <span className="error">{errors.book}</span>}
//         </div>

//         <div className="form-group">
//           <label>Issue Date</label>
//           <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Return Date</label>
//           <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Status</label>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="">Select Status</option>
//             {getStatusOptions().map((s) => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         {showFineField && (
//           <div className="form-group">
//             <label>Fine Amount (₹)</label>
//             <input type="number" value={formData.fineAmount} disabled />
//           </div>
//         )}

//         <button type="submit" className="submit-btn">
//           {existingTransaction ? "Update Transaction" : "Create Transaction"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTransaction;

//Finalized create transaction code 

import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from '../../Topbar/TopBar'
import "../Transactions/CreateTransaction.css";
import { useLocation, useNavigate } from "react-router-dom";

const CreateTransaction = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const existingTransaction = location.state?.transaction || null;

  const [transactionId] = useState(
    existingTransaction?.transactionId || "TXN-" + Math.floor(Math.random() * 100000)
  );

  const [formData, setFormData] = useState({
    member: existingTransaction?.member?._id || "",
    book: existingTransaction?.book?._id || "",
    // issueDate default to today or existing issue date
    issueDate: existingTransaction
      ? new Date(existingTransaction.issueDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    // returnDate: expected return date (on create) or actual/expected on edit
    returnDate: existingTransaction
      ? new Date(existingTransaction.returnDate).toISOString().split("T")[0]
      : "",
    status: existingTransaction ? existingTransaction.status : "Issued",
    fineAmount: existingTransaction?.fineAmount || 0,
  });

  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  // DO NOT show a multi-option status - only single relevant option per requirements
  // We'll manage what gets rendered in JSX based on create/edit mode and dates.
  const finePerDay = 2; // ₹2 per day

  // Fetch members and books (unchanged)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, booksRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/members`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books`),
        ]);
        setMembers(membersRes.data);
        setBooks(booksRes.data);
      } catch (err) {
        console.error("Error fetching members/books:", err);
      }
    };
    fetchData();
  }, []);

  /**
   * Logic for create vs update:
   * - Create mode: only "Issued" is allowed; fine hidden (0).
   * - Edit mode: by default set to "Returned" and fine hidden.
   *   If user chooses a returnDate > existingTransaction.returnDate (expected)
   *   then mark status "Overdue", show fine and calculate:
   *     daysLate = ceil((actual - expected) / msPerDay)
   *     fineAmount = daysLate * finePerDay
   *
   * Note: expectedReturn is taken from existingTransaction.returnDate (the stored "expected return date").
   */
  useEffect(() => {
    // if creating: ensure status is Issued and fine hidden
    if (!existingTransaction) {
      setFormData((prev) => ({ ...prev, status: "Issued", fineAmount: 0 }));
      return;
    }

    // editing existing transaction
    // whenever returnDate changes while editing, re-evaluate status + fine
    const evaluateEditStatusAndFine = () => {
      if (!existingTransaction) return;

      const expected = existingTransaction.returnDate
        ? new Date(existingTransaction.returnDate).setHours(0, 0, 0, 0)
        : null;
      const actual = formData.returnDate ? new Date(formData.returnDate).setHours(0, 0, 0, 0) : null;

      // if actual is not provided, keep current status/fine (or default to Returned with 0)
      if (!actual || !expected) {
        setFormData((prev) => ({ ...prev, status: "Returned", fineAmount: 0 }));
        return;
      }

      // if actual > expected => overdue
      if (actual > expected) {
        const msPerDay = 1000 * 60 * 60 * 24;
        // difference in ms
        const diffMs = actual - expected;
        // difference in days (each day after expected date counts)
        const diffDays = Math.ceil(diffMs / msPerDay);
        const fine = diffDays > 0 ? diffDays * finePerDay : 0;

        setFormData((prev) => ({
          ...prev,
          status: "Overdue",
          fineAmount: fine,
        }));
      } else {
        // returned on time or earlier
        setFormData((prev) => ({ ...prev, status: "Returned", fineAmount: 0 }));
      }
    };

    evaluateEditStatusAndFine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.returnDate, existingTransaction]); // recalc when returnDate changes

  // Validation (unchanged except fine field may be optional)
  const validate = () => {
    const newErrors = {};
    if (!formData.member) newErrors.member = "Select a member.";
    if (!formData.book) newErrors.book = "Select a book.";
    if (!formData.issueDate) newErrors.issueDate = "Issue date is required.";
    if (!formData.returnDate) newErrors.returnDate = "Return date is required.";
    else if (new Date(formData.returnDate) < new Date(formData.issueDate))
      newErrors.returnDate = "Return date must be after issue date.";
    if (!formData.status) newErrors.status = "Select status.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit/Update - we keep existing behavior but ensure payload carries fineAmount and correct status
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = {
          transactionId,
          ...formData,
          // ensure number types are correct
          fineAmount: Number(formData.fineAmount || 0),
        };

        if (existingTransaction) {
          await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${existingTransaction._id}`,
            payload
          );
          alert("Transaction Updated Successfully ✅");
        } else {
          // Ensure newly created transaction is issued and fine is 0
          payload.status = "Issued";
          payload.fineAmount = 0;
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`, payload);
          alert("Transaction Created Successfully ✅");
        }

        // keep user on list or navigate back
        // navigate("/manage-transactions");
      } catch (err) {
        console.error("Error saving transaction:", err);
        alert("Error saving transaction!");
      }
    }
  };

  // Helper to decide which single status option to render
  const renderStatusOption = () => {
    if (!existingTransaction) {
      return (
        <select name="status" value={"Issued"} disabled>
          <option value="Issued">Issued</option>
        </select>
      );
    }

    // editing mode - formData.status will already be "Returned" or "Overdue" based on returnDate selection
    // show single option only (per requirement)
    return (
      <select name="status" value={formData.status} disabled>
        <option value={formData.status}>{formData.status}</option>
      </select>
    );
  };

  const showFineField = () => {
    // show only when editing and status is Overdue
    return existingTransaction && formData.status === "Overdue";
  };

  return (
    <div className="parenttransaction">
        <TopBar/>
      <div className="transaction-form-container">
      <h2>{existingTransaction ? "Update Transaction" : "Create New Transaction"}</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction ID</label>
          <input type="text" value={transactionId} disabled />
        </div>

        <div className="form-group">
          <label>
            Member <span className="required">*</span>
          </label>
          <select name="member" value={formData.member} onChange={handleChange}>
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.member && <span className="error">{errors.member}</span>}
        </div>

        <div className="form-group">
          <label>
            Book <span className="required">*</span>
          </label>
          <select name="book" value={formData.book} onChange={handleChange}>
            <option value="">Select Book</option>
            {books.map((b) => (
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
            ))}
          </select>
          {errors.book && <span className="error">{errors.book}</span>}
        </div>

        <div className="form-group">
          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
          {errors.issueDate && <span className="error">{errors.issueDate}</span>}
        </div>

        <div className="form-group">
          <label>Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
          {errors.returnDate && <span className="error">{errors.returnDate}</span>}
          <small className="text-muted d-block mt-1">
            {existingTransaction
              ? "Expected return date: " + new Date(existingTransaction.returnDate).toLocaleDateString()
              : "Select expected return date"}
          </small>
        </div>

        <div className="form-group">
          <label>Status</label>
          {renderStatusOption()}
          {errors.status && <span className="error">{errors.status}</span>}
        </div>

        {showFineField() && (
          <div className="form-group">
            <label>Fine Amount (₹)</label>
            <input type="number" value={formData.fineAmount} disabled />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {existingTransaction ? "Update Transaction" : "Create Transaction"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTransaction;


