// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Staffs/ManageStaffs.css";

// const ManageStaff = () => {
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   // ✅ Fetch all staff
//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/staff");
//       setStaffList(response.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   // ✅ Checkbox select/deselect
//   const handleCheckboxChange = (id) => {
//     setSelectedStaff((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedStaff(staffList.map((s) => s._id));
//     } else {
//       setSelectedStaff([]);
//     }
//   };

//   // ✅ Delete selected staff
//   const handleDelete = async () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select at least one staff member to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected staff?")) return;

//     try {
//       await Promise.all(
//         selectedStaff.map((id) =>
//           axios.delete(`http://localhost:5000/api/staff/${id}`)
//         )
//       );
//       alert("🗑️ Selected staff deleted successfully!");
//       setSelectedStaff([]);
//       fetchStaff();
//     } catch (error) {
//       alert("Error deleting staff: " + error.message);
//     }
//   };

//   // ✅ Export selected to Excel
//   const handleExportExcel = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to Excel!");
//       return;
//     }

//     const selectedData = staffList.filter((s) => selectedStaff.includes(s._id));
//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
//     XLSX.writeFile(workbook, "StaffData.xlsx");
//   };

//   // ✅ Export selected to PDF
//   const handleExportPDF = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to PDF!");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.text("Library Staff Details", 14, 15);
//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => [s.staffId, s.name, s.email, s.role, s.phone]);

//     doc.autoTable({
//       head: [["Staff ID", "Name", "Email", "Role", "Phone"]],
//       body: selectedData,
//       startY: 25,
//     });
//     doc.save("StaffData.pdf");
//   };

//   return (
//     <div className="manage-staff-container">
//       <div className="table-header">
//         <h2>Manage Staff Members</h2>
//         <div className="actions">
//           <button className="delete-btn" onClick={handleDelete}>
//             <FaTrash /> Delete
//           </button>
//           <button className="pdf-btn" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//           <button className="excel-btn" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//         </div>
//       </div>

//       <table className="staff-table">
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={selectedStaff.length === staffList.length && staffList.length > 0}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             <th>Staff ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffList.length > 0 ? (
//             staffList.map((staff) => (
//               <tr
//                 key={staff._id}
//                 className={selectedStaff.includes(staff._id) ? "selected-row" : ""}
//               >
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedStaff.includes(staff._id)}
//                     onChange={() => handleCheckboxChange(staff._id)}
//                   />
//                 </td>
//                 <td>{staff.staffId}</td>
//                 <td>{staff.name}</td>
//                 <td>{staff.email}</td>
//                 <td>{staff.role}</td>
//                 <td>{staff.phone}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="no-data">
//                 No staff members found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageStaff;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Staffs/ManageStaffs.css";

// const ManageStaff = () => {
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   // ✅ Fetch all staff
//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/staff");
//       setStaffList(response.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   // ✅ Checkbox select/deselect
//   const handleCheckboxChange = (id) => {
//     setSelectedStaff((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedStaff(staffList.map((s) => s._id));
//     } else {
//       setSelectedStaff([]);
//     }
//   };

//   // ✅ Delete selected staff
//   const handleDelete = async () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select at least one staff member to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected staff?")) return;

//     try {
//       await Promise.all(
//         selectedStaff.map((id) =>
//           axios.delete(`http://localhost:5000/api/staff/${id}`)
//         )
//       );
//       alert("🗑️ Selected staff deleted successfully!");
//       setSelectedStaff([]);
//       fetchStaff();
//     } catch (error) {
//       alert("Error deleting staff: " + error.message);
//     }
//   };

//   // ✅ Export selected to Excel
//   const handleExportExcel = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to Excel!");
//       return;
//     }

//     const selectedData = staffList.filter((s) => selectedStaff.includes(s._id));
//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
//     XLSX.writeFile(workbook, "StaffData.xlsx");
//   };

//   // ✅ Export selected to PDF
//   const handleExportPDF = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to PDF!");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.text("Library Staff Details", 14, 15);
//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => [s.staffId, s.name, s.email, s.role, s.phone]);

//     doc.autoTable({
//       head: [["Staff ID", "Name", "Email", "Role", "Phone"]],
//       body: selectedData,
//       startY: 25,
//     });
//     doc.save("StaffData.pdf");
//   };

//   return (
//     <div className="manage-staff-container parentdiv mt-5 p-4 rounded shadow bg-light">
//       {/* Header & Action Buttons */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">👥 Manage Staff Members</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrash /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedStaff.length === staffList.length && staffList.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th>Staff ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.length > 0 ? (
//               staffList.map((staff) => (
//                 <tr
//                   key={staff._id}
//                   className={selectedStaff.includes(staff._id) ? "selected-row" : ""}
//                 >
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedStaff.includes(staff._id)}
//                       onChange={() => handleCheckboxChange(staff._id)}
//                     />
//                   </td>
//                   <td>{staff.staffId}</td>
//                   <td>{staff.name}</td>
//                   <td>{staff.email}</td>
//                   <td>{staff.role}</td>
//                   <td>{staff.phone}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="no-data text-muted">
//                   No staff members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageStaff;

// managestaffs with permission field without search option and pdf downloadable

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import jsPDF from "jspdf";
// // import "jspdf-autotable";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Staffs/ManageStaffs.css";

// const ManageStaff = () => {
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/staff");
//       setStaffList(response.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedStaff((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedStaff(staffList.map((s) => s._id));
//     } else {
//       setSelectedStaff([]);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select at least one staff member to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected staff?"))
//       return;

//     try {
//       await Promise.all(
//         selectedStaff.map((id) =>
//           axios.delete(`http://localhost:5000/api/staff/${id}`)
//         )
//       );
//       alert("🗑️ Selected staff deleted successfully!");
//       setSelectedStaff([]);
//       fetchStaff();
//     } catch (error) {
//       alert("Error deleting staff: " + error.message);
//     }
//   };

//   // ✅ Export to Excel (updated to include permissions)
//   const handleExportExcel = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to Excel!");
//       return;
//     }

//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => ({
//         StaffID: s.staffId,
//         Name: s.name,
//         Email: s.email,
//         Role: s.role,
//         Permissions: s.permissions.join(", "),
//         Phone: s.phone,
//       }));

//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
//     XLSX.writeFile(workbook, "StaffData.xlsx");
//   };

//   // ✅ Export to PDF (updated to include permissions)
//   const handleExportPDF = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to PDF!");
//       return;
//     }

//     const pdf = new jsPDF();
//     pdf.text("Library Staff Details", 14, 15);

//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => [
//         s.staffId,
//         s.name,
//         s.email,
//         s.role,
//         s.permissions.join(", "),
//         s.phone,
//       ]);

//     autoTable(doc, {
//       head: [["Staff ID", "Name", "Email", "Role", "Permissions", "Phone"]],
//       body: selectedData,
//       startY: 25,
//     });

//     pdf.save("StaffData.pdf");
//   };

//   return (
//     <div className="manage-staff-container parentdiv mt-5 p-4 rounded shadow bg-light">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">👥 Manage Staff Members</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrash /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       {/* Staff Table */}
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedStaff.length === staffList.length &&
//                     staffList.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th>Staff ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>

//               {/* ✅ NEW PERMISSIONS COLUMN */}
//               <th>Permissions</th>

//               <th>Phone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {staffList.length > 0 ? (
//               staffList.map((staff) => (
//                 <tr
//                   key={staff._id}
//                   className={
//                     selectedStaff.includes(staff._id) ? "selected-row" : ""
//                   }
//                 >
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedStaff.includes(staff._id)}
//                       onChange={() => handleCheckboxChange(staff._id)}
//                     />
//                   </td>
//                   <td>{staff.staffId}</td>
//                   <td>{staff.name}</td>
//                   <td>{staff.email}</td>
//                   <td>{staff.role}</td>

//                   {/* ✅ Show permissions */}
//                   <td>{staff.permissions.join(", ")}</td>

//                   <td>{staff.phone}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-muted">
//                   No staff members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageStaff;

// managestaffs with permission field without search option and pdf downloadable

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Staffs/ManageStaffs.css";

// const ManageStaff = () => {
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [staffPerPage] = useState(5);

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const fetchStaff = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/staff");
//       setStaffList(response.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedStaff((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedStaff(filteredStaff.map((s) => s._id));
//     } else {
//       setSelectedStaff([]);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select at least one staff member to delete!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete selected staff?"))
//       return;

//     try {
//       await Promise.all(
//         selectedStaff.map((id) =>
//           axios.delete(`http://localhost:5000/api/staff/${id}`)
//         )
//       );
//       alert("🗑️ Selected staff deleted successfully!");
//       setSelectedStaff([]);
//       fetchStaff();
//     } catch (error) {
//       alert("Error deleting staff: " + error.message);
//     }
//   };

//   const handleExportExcel = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to Excel!");
//       return;
//     }

//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => ({
//         StaffID: s.staffId,
//         Name: s.name,
//         Email: s.email,
//         Role: s.role,
//         Permissions: s.permissions.join(", "),
//         Phone: s.phone,
//       }));

//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
//     XLSX.writeFile(workbook, "StaffData.xlsx");
//   };

//   const handleExportPDF = () => {
//     if (selectedStaff.length === 0) {
//       alert("⚠️ Please select staff to export to PDF!");
//       return;
//     }

//     const pdf = new jsPDF();
//     pdf.text("Library Staff Details", 14, 15);

//     const selectedData = staffList
//       .filter((s) => selectedStaff.includes(s._id))
//       .map((s) => [
//         s.staffId,
//         s.name,
//         s.email,
//         s.role,
//         s.permissions.join(", "),
//         s.phone,
//       ]);

//     autoTable(pdf, {
//       head: [["Staff ID", "Name", "Email", "Role", "Permissions", "Phone"]],
//       body: selectedData,
//       startY: 25,
//     });

//     pdf.save("StaffData.pdf");
//   };

//   // 🔍 Search filter
//   const filteredStaff = staffList.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.email.toLowerCase().includes(search.toLowerCase()) ||
//       s.staffId.toLowerCase().includes(search.toLowerCase()) ||
//       s.role.toLowerCase().includes(search.toLowerCase())
//   );

//   // 📄 Pagination
//   const indexOfLastStaff = currentPage * staffPerPage;
//   const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
//   const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
//   const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

//   return (
//     <div className="manage-staff-container parentdiv mt-5 p-4 rounded shadow bg-light">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">👥 Manage Staff Members</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrash /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={handleExportExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={handleExportPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by Name, Email, Staff ID, or Role"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Staff Table */}
//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedStaff.length === filteredStaff.length &&
//                     filteredStaff.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th>Staff ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Permissions</th>
//               <th>Phone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentStaff.length > 0 ? (
//               currentStaff.map((staff) => (
//                 <tr
//                   key={staff._id}
//                   className={selectedStaff.includes(staff._id) ? "selected-row" : ""}
//                 >
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedStaff.includes(staff._id)}
//                       onChange={() => handleCheckboxChange(staff._id)}
//                     />
//                   </td>
//                   <td>{staff.staffId}</td>
//                   <td>{staff.name}</td>
//                   <td>{staff.email}</td>
//                   <td>{staff.role}</td>
//                   <td>{staff.permissions.join(", ")}</td>
//                   <td>{staff.phone}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-muted">
//                   No staff members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="d-flex justify-content-center align-items-center mt-3">
//           <button
//             className="btn btn-outline-primary me-2"
//             onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           <span className="mx-2">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="btn btn-outline-primary ms-2"
//             onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageStaff;

// with password section

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../Staffs/ManageStaffs.css";
import TopBar from '../../Topbar/TopBar'

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage] = useState(5);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staff");
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedStaff((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStaff(filteredStaff.map((s) => s._id));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleDelete = async () => {
    if (selectedStaff.length === 0) {
      alert("⚠️ Please select at least one staff member to delete!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete selected staff?"))
      return;

    try {
      await Promise.all(
        selectedStaff.map((id) =>
          axios.delete(`http://localhost:5000/api/staff/${id}`)
        )
      );
      alert("🗑️ Selected staff deleted successfully!");
      setSelectedStaff([]);
      fetchStaff();
    } catch (error) {
      alert("Error deleting staff: " + error.message);
    }
  };

  // Export Excel
  const handleExportExcel = () => {
    if (selectedStaff.length === 0) {
      alert("⚠️ Please select staff to export!");
      return;
    }

    const selectedData = staffList
      .filter((s) => selectedStaff.includes(s._id))
      .map((s) => ({
        StaffID: s.staffId,
        Name: s.name,
        Email: s.email,
        Role: s.role,
        Permissions: s.permissions.join(", "),
        Password: s.password,
        Phone: s.phone,
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    XLSX.writeFile(workbook, "StaffData.xlsx");
  };

  // Export PDF
  const handleExportPDF = () => {
    if (selectedStaff.length === 0) {
      alert("⚠️ Please select staff to export!");
      return;
    }

    const pdf = new jsPDF();
    pdf.text("Library Staff Details", 14, 15);

    const selectedData = staffList
      .filter((s) => selectedStaff.includes(s._id))
      .map((s) => [
        s.staffId,
        s.name,
        s.email,
        s.role,
        s.permissions.join(", "),
        s.password,
        s.phone,
      ]);

    autoTable(pdf, {
      head: [["Staff ID", "Name", "Email", "Role", "Permissions", "Password", "Phone"]],
      body: selectedData,
      startY: 25,
    });

    pdf.save("StaffData.pdf");
  };

  // Search filter
  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

  return (
    <div className="parentmanagestaff">
      <TopBar/>
      <div className="manage-staff-container parentdiv mt-5 p-4 rounded shadow bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">👥 Manage Staff Members</h2>
        <div>
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
          <button className="btn btn-success me-2" onClick={handleExportExcel}>
            <FaFileExcel /> Excel
          </button>
          <button className="btn btn-secondary" onClick={handleExportPDF}>
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Email, Staff ID, or Role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedStaff.length === filteredStaff.length &&
                    filteredStaff.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Password</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {currentStaff.length > 0 ? (
              currentStaff.map((staff) => (
                <tr
                  key={staff._id}
                  className={selectedStaff.includes(staff._id) ? "selected-row" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(staff._id)}
                      onChange={() => handleCheckboxChange(staff._id)}
                    />
                  </td>
                  <td>{staff.staffId}</td>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                  <td>{staff.permissions.join(", ")}</td>
                  <td>{staff.password}</td>
                  <td>{staff.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageStaff;
