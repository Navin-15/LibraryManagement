// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Members/ManageMembers.css";

// const ManageMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   // ✅ Fetch members from backend
//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/members");
//       setMembers(res.data);
//     } catch (err) {
//       console.error("Error fetching members:", err);
//     }
//   };

//   // ✅ Handle checkbox selection
//   const handleCheckboxChange = (memberId) => {
//     setSelectedMembers((prev) =>
//       prev.includes(memberId)
//         ? prev.filter((id) => id !== memberId)
//         : [...prev, memberId]
//     );
//   };

//   // ✅ Delete selected members
//   const handleDelete = async () => {
//     if (selectedMembers.length === 0) {
//       alert("Please select at least one member to delete!");
//       return;
//     }
//     if (window.confirm("Are you sure you want to delete the selected members?")) {
//       try {
//         await axios.delete("http://localhost:5000/api/members", {
//           data: { ids: selectedMembers },
//         });
//         fetchMembers();
//         setSelectedMembers([]);
//         alert("Selected members deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting members:", err);
//       }
//     }
//   };

//   // ✅ Export selected members to Excel
//   const exportToExcel = () => {
//     if (selectedMembers.length === 0) {
//       alert("Please select at least one member to export!");
//       return;
//     }
//     const selectedData = members.filter((member) =>
//       selectedMembers.includes(member._id)
//     );
//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
//     XLSX.writeFile(workbook, "Selected_Members.xlsx");
//   };

//   // ✅ Export selected members to PDF
//   const exportToPDF = () => {
//     if (selectedMembers.length === 0) {
//       alert("Please select at least one member to export!");
//       return;
//     }
//     const doc = new jsPDF();
//     const selectedData = members.filter((member) =>
//       selectedMembers.includes(member._id)
//     );
//     const tableData = selectedData.map((m) => [
//       m.memberId,
//       m.name,
//       m.email,
//       m.phone,
//       new Date(m.startDate).toLocaleDateString(),
//       m.membershipType,
//       m.maxBooks,
//     ]);
//     doc.text("Library Members Report", 14, 15);
//     doc.autoTable({
//       head: [
//         [
//           "Member ID",
//           "Name",
//           "Email",
//           "Phone",
//           "Start Date",
//           "Membership Type",
//           "Max Books",
//         ],
//       ],
//       body: tableData,
//       startY: 20,
//     });
//     doc.save("Selected_Members.pdf");
//   };

//   return (
//     <div className=" mt-5 parentdiv d-block bg-light p-4 rounded shadow">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">👥 Manage Members</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrashAlt /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={exportToExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={exportToPDF}>
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
//                     setSelectedMembers(
//                       e.target.checked ? members.map((m) => m._id) : []
//                     )
//                   }
//                   checked={
//                     selectedMembers.length === members.length && members.length > 0
//                   }
//                 />
//               </th>
//               <th>Member ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Start Date</th>
//               <th>Membership Type</th>
//               <th>Max Books</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.length > 0 ? (
//               members.map((member) => (
//                 <tr key={member._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedMembers.includes(member._id)}
//                       onChange={() => handleCheckboxChange(member._id)}
//                     />
//                   </td>
//                   <td>{member.memberId}</td>
//                   <td>{member.name}</td>
//                   <td>{member.email}</td>
//                   <td>{member.phone}</td>
//                   <td>{new Date(member.startDate).toLocaleDateString()}</td>
//                   <td>{member.membershipType}</td>
//                   <td>{member.maxBooks}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-muted">
//                   No members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageMembers;

// managemembers with search option and pdf downloadable

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../Members/ManageMembers.css";
import TopBar from '../../Topbar/TopBar'

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleDelete = async () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member to delete!");
      return;
    }
    if (
      window.confirm("Are you sure you want to delete the selected members?")
    ) {
      try {
        await axios.delete("http://localhost:5000/api/members", {
          data: { ids: selectedMembers },
        });
        fetchMembers();
        setSelectedMembers([]);
        alert("Selected members deleted successfully!");
      } catch (err) {
        console.error("Error deleting members:", err);
      }
    }
  };

  const exportToExcel = () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member to export!");
      return;
    }
    const selectedData = members.filter((member) =>
      selectedMembers.includes(member._id)
    );
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    XLSX.writeFile(workbook, "Selected_Members.xlsx");
  };

  const exportToPDF = () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member to export!");
      return;
    }
    const doc = new jsPDF();
    const selectedData = members.filter((member) =>
      selectedMembers.includes(member._id)
    );
    const tableData = selectedData.map((m) => [
      m.memberId,
      m.name,
      m.email,
      m.phone,
      new Date(m.startDate).toLocaleDateString(),
      m.membershipType,
      m.maxBooks,
    ]);

    doc.text("Library Members Report", 14, 15);
    autoTable(doc, {
      head: [
        [
          "Member ID",
          "Name",
          "Email",
          "Phone",
          "Start Date",
          "Membership Type",
          "Max Books",
        ],
      ],
      body: tableData,
      startY: 20,
    });
    doc.save("Selected_Members.pdf");
  };

  // 🔍 Search filter
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.memberId.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="managemember">
      <TopBar/>
      <div className="mt-5 parentdiv d-block bg-light p-4 rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">👥 Manage Members</h2>
        <div>
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            <FaTrashAlt /> Delete
          </button>
          <button className="btn btn-success me-2" onClick={exportToExcel}>
            <FaFileExcel /> Excel
          </button>
          <button className="btn btn-secondary" onClick={exportToPDF}>
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or member ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedMembers(
                      e.target.checked
                        ? filteredMembers.map((m) => m._id)
                        : []
                    )
                  }
                  checked={
                    selectedMembers.length === filteredMembers.length &&
                    filteredMembers.length > 0
                  }
                />
              </th>
              <th>Member ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Start Date</th>
              <th>Membership Type</th>
              <th>Max Books</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.length > 0 ? (
              currentMembers.map((member) => (
                <tr key={member._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member._id)}
                      onChange={() => handleCheckboxChange(member._id)}
                    />
                  </td>
                  <td>{member.memberId}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{new Date(member.startDate).toLocaleDateString()}</td>
                  <td>{member.membershipType}</td>
                  <td>{member.maxBooks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3 ">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
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

export default ManageMembers;
