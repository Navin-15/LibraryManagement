// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaFilePdf, FaFileExcel, FaEdit } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import "../Transactions/ManageTransactions.css";

// const ManageTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Fetch transactions from MongoDB
//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/transactions");
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // ✅ Checkbox handling
//   const handleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const isSelected = (id) => selected.includes(id);

//   // ✅ Delete selected transactions
//   const handleDelete = async () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected transactions?"))
//       return;

//     try {
//       await Promise.all(
//         selected.map((id) =>
//           axios.delete(`http://localhost:5000/api/transactions/${id}`)
//         )
//       );
//       alert("Selected transactions deleted successfully!");
//       fetchTransactions();
//       setSelected([]);
//     } catch (err) {
//       console.error("Error deleting transactions:", err);
//     }
//   };

//   // ✅ Edit Transaction
//   const handleEdit = (transaction) => {
//     navigate("/create-transaction", { state: { transaction } });
//   };

//   // ✅ Export selected transactions to PDF
//   const handleExportPDF = () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to export!");
//       return;
//     }

//     const pdf = new jsPDF();
//     pdf.text("Library Transaction Report", 14, 15);

//     const selectedData = transactions.filter((t) => selected.includes(t._id));
//     const tableRows = selectedData.map((t) => [
//       t.transactionId,
//       t.member?.name || "—",
//       t.book?.title || "—",
//       new Date(t.issueDate).toLocaleDateString(),
//       new Date(t.returnDate).toLocaleDateString(),
//       t.status,
//       `$${t.fineAmount}`,
//     ]);

//     pdf.autoTable({
//       head: [["Txn ID", "Member", "Book", "Issue Date", "Return Date", "Status", "Fine"]],
//       body: tableRows,
//       startY: 20,
//     });

//     pdf.save("Transactions_Report.pdf");
//   };

//   // ✅ Export selected transactions to Excel
//   const handleExportExcel = () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to export!");
//       return;
//     }

//     const selectedData = transactions
//       .filter((t) => selected.includes(t._id))
//       .map((t) => ({
//         TransactionID: t.transactionId,
//         Member: t.member?.name || "—",
//         Book: t.book?.title || "—",
//         IssueDate: new Date(t.issueDate).toLocaleDateString(),
//         ReturnDate: new Date(t.returnDate).toLocaleDateString(),
//         Status: t.status,
//         FineAmount: `$${t.fineAmount}`,
//       }));

//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
//     XLSX.writeFile(workbook, "Transactions_Report.xlsx");
//   };

//   return (
//     <div className="mt-5 parentdiv d-block bg-light p-4 rounded shadow">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">📚 Manage Transactions</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrashAlt /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     setSelected(
//                       e.target.checked ? transactions.map((t) => t._id) : []
//                     )
//                   }
//                   checked={
//                     selected.length === transactions.length &&
//                     transactions.length > 0
//                   }
//                 />
//               </th>
//               <th>Transaction ID</th>
//               <th>Member</th>
//               <th>Book</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//               <th>Status</th>
//               <th>Fine Amount</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((t) => (
//                 <tr key={t._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={isSelected(t._id)}
//                       onChange={() => handleSelect(t._id)}
//                     />
//                   </td>
//                   <td>{t.transactionId}</td>
//                   <td>{t.member?.name || "—"}</td>
//                   <td>{t.book?.title || "—"}</td>
//                   <td>{new Date(t.issueDate).toLocaleDateString()}</td>
//                   <td>{new Date(t.returnDate).toLocaleDateString()}</td>
//                   <td>
//                     <span
//                       className={`badge px-3 py-2 ${
//                         t.status === "Issued"
//                           ? "bg-info"
//                           : t.status === "Returned"
//                           ? "bg-success"
//                           : "bg-danger"
//                       }`}
//                     >
//                       {t.status}
//                     </span>
//                   </td>
//                   <td>${t.fineAmount}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => handleEdit(t)}
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-muted">
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageTransactions;

// Finalized Manage Transaction code 
// managetransaction without-pdf downloadable



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaFilePdf, FaFileExcel, FaEdit } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import "../Transactions/ManageTransactions.css";

// const ManageTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const navigate = useNavigate();

//   // Fetch transactions from MongoDB
//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/transactions");
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // Checkbox handling
//   const handleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const isSelected = (id) => selected.includes(id);

//   // Delete selected transactions
//   const handleDelete = async () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected transactions?"))
//       return;

//     try {
//       await Promise.all(
//         selected.map((id) =>
//           axios.delete(`http://localhost:5000/api/transactions/${id}`)
//         )
//       );
//       alert("Selected transactions deleted successfully!");
//       fetchTransactions();
//       setSelected([]);
//     } catch (err) {
//       console.error("Error deleting transactions:", err);
//     }
//   };

//   // Edit Transaction
//   const handleEdit = (transaction) => {
//     navigate("/create-transaction", { state: { transaction } });
//   };

//   // Export selected transactions to PDF
//   const handleExportPDF = () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to export!");
//       return;
//     }

//     const pdf = new jsPDF();
//     pdf.text("Library Transaction Report", 14, 15);

//     const selectedData = transactions.filter((t) => selected.includes(t._id));
//     const tableRows = selectedData.map((t) => [
//       t.transactionId,
//       t.member?.name || "—",
//       t.book?.title || "—",
//       new Date(t.issueDate).toLocaleDateString(),
//       new Date(t.returnDate).toLocaleDateString(),
//       t.status,
//       `₹${t.fineAmount}`,
//     ]);

//     pdf.autoTable({
//       head: [["Txn ID", "Member", "Book", "Issue Date", "Return Date", "Status", "Fine"]],
//       body: tableRows,
//       startY: 20,
//     });

//     pdf.save("Transactions_Report.pdf");
//   };

//   // Export selected transactions to Excel
//   const handleExportExcel = () => {
//     if (selected.length === 0) {
//       alert("Please select at least one transaction to export!");
//       return;
//     }

//     const selectedData = transactions
//       .filter((t) => selected.includes(t._id))
//       .map((t) => ({
//         TransactionID: t.transactionId,
//         Member: t.member?.name || "—",
//         Book: t.book?.title || "—",
//         IssueDate: new Date(t.issueDate).toLocaleDateString(),
//         ReturnDate: new Date(t.returnDate).toLocaleDateString(),
//         Status: t.status,
//         FineAmount: `₹${t.fineAmount}`,
//       }));

//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
//     XLSX.writeFile(workbook, "Transactions_Report.xlsx");
//   };

//   return (
//     <div className="mt-5 parentdiv d-block bg-light p-4 rounded shadow">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">📚 Manage Transactions</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrashAlt /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     setSelected(
//                       e.target.checked ? transactions.map((t) => t._id) : []
//                     )
//                   }
//                   checked={
//                     selected.length === transactions.length &&
//                     transactions.length > 0
//                   }
//                 />
//               </th>
//               <th>Transaction ID</th>
//               <th>Member</th>
//               <th>Book</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//               <th>Status</th>
//               <th>Fine Amount</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((t) => (
//                 <tr key={t._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={isSelected(t._id)}
//                       onChange={() => handleSelect(t._id)}
//                     />
//                   </td>
//                   <td>{t.transactionId}</td>
//                   <td>{t.member?.name || "—"}</td>
//                   <td>{t.book?.title || "—"}</td>
//                   <td>{new Date(t.issueDate).toLocaleDateString()}</td>
//                   <td>{new Date(t.returnDate).toLocaleDateString()}</td>
//                   <td>
//                     <span
//                       className={`badge px-3 py-2 ${
//                         t.status === "Issued"
//                           ? "bg-info"
//                           : t.status === "Returned"
//                           ? "bg-success"
//                           : "bg-danger"
//                       }`}
//                     >
//                       {t.status}
//                     </span>
//                   </td>
//                   <td>₹{t.fineAmount}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => handleEdit(t)}
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-muted">
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageTransactions;

// managetransaction with search option and pdf downloadable

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaFilePdf, FaFileExcel, FaEdit } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "../Transactions/ManageTransactions.css";
import TopBar from '../../Topbar/TopBar'

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`);
      setTransactions(res.data);
      setFilteredTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Search & Filter
  useEffect(() => {
    const filtered = transactions.filter(
      (t) =>
        t.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.member?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // reset page on search
  }, [searchTerm, transactions]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Checkbox handling
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selected.includes(id);

  // Delete
  const handleDelete = async () => {
    if (selected.length === 0) {
      alert("Please select at least one transaction to delete!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete selected transactions?"))
      return;

    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/transactions/${id}`)
        )
      );
      alert("Selected transactions deleted successfully!");
      fetchTransactions();
      setSelected([]);
    } catch (err) {
      console.error("Error deleting transactions:", err);
    }
  };

  // Edit
  const handleEdit = (transaction) => {
    navigate("/create-transaction", { state: { transaction } });
  };

  // Export PDF
  const handleExportPDF = () => {
    if (selected.length === 0) {
      alert("Please select at least one transaction to export!");
      return;
    }

    const pdf = new jsPDF();
    pdf.text("Library Transaction Report", 14, 15);

    const selectedData = transactions.filter((t) => selected.includes(t._id));
    const tableRows = selectedData.map((t) => [
      t.transactionId,
      t.member?.name || "—",
      t.book?.title || "—",
      new Date(t.issueDate).toLocaleDateString(),
      new Date(t.returnDate).toLocaleDateString(),
      t.status,
      `₹${t.fineAmount}`,
    ]);

    autoTable(pdf, {
      head: [["Txn ID", "Member", "Book", "Issue Date", "Return Date", "Status", "Fine"]],
      body: tableRows,
      startY: 20,
    });

    pdf.save("Transactions_Report.pdf");
  };

  // Export Excel
  const handleExportExcel = () => {
    if (selected.length === 0) {
      alert("Please select at least one transaction to export!");
      return;
    }

    const selectedData = transactions
      .filter((t) => selected.includes(t._id))
      .map((t) => ({
        TransactionID: t.transactionId,
        Member: t.member?.name || "—",
        Book: t.book?.title || "—",
        IssueDate: new Date(t.issueDate).toLocaleDateString(),
        ReturnDate: new Date(t.returnDate).toLocaleDateString(),
        Status: t.status,
        FineAmount: `₹${t.fineAmount}`,
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transactions_Report.xlsx");
  };

  return (
    <div className="managetransaction">
        <TopBar/>
      <div className="mt-5 parentdiv d-block bg-light p-4 rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">📚 Manage Transactions</h2>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleDelete}>
            <FaTrashAlt /> Delete
          </button>
          <button className="btn btn-success" onClick={handleExportExcel}>
            <FaFileExcel /> Excel
          </button>
          <button className="btn btn-secondary" onClick={handleExportPDF}>
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? filteredTransactions.map((t) => t._id) : []
                    )
                  }
                  checked={
                    selected.length === filteredTransactions.length &&
                    filteredTransactions.length > 0
                  }
                />
              </th>
              <th>Transaction ID</th>
              <th>Member</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((t) => (
                <tr key={t._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(t._id)}
                      onChange={() => handleSelect(t._id)}
                    />
                  </td>
                  <td>{t.transactionId}</td>
                  <td>{t.member?.name || "—"}</td>
                  <td>{t.book?.title || "—"}</td>
                  <td>{new Date(t.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(t.returnDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        t.status === "Issued"
                          ? "bg-info"
                          : t.status === "Returned"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td>₹{t.fineAmount}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(t)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-muted">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
    </div>
  );
};

export default ManageTransactions;
