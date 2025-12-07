// import React, { useState } from "react";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [activeModule, setActiveModule] = useState(null);

//   const toggleModule = (module) => {
//     setActiveModule(activeModule === module ? null : module);
//   };

//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title">Library Modules</h2>

//       {/* Books Module */}
//       <div className="module">
//         <div
//           className="module-title"
//           onClick={() => toggleModule("books")}
//         >
//           📚 Books Module
//         </div>
//         {activeModule === "books" && (
//           <ul className="submodules">
//             <li>Create Books</li>
//             <li>Manage Books</li>
//           </ul>
//         )}
//       </div>

//       {/* Members Module */}
//       <div className="module">
//         <div
//           className="module-title"
//           onClick={() => toggleModule("members")}
//         >
//           👥 Members Module
//         </div>
//         {activeModule === "members" && (
//           <ul className="submodules">
//             <li>Add Member</li>
//             <li>Manage Members</li>
//           </ul>
//         )}
//       </div>

//       {/* Transaction Module */}
//       <div className="module">
//         <div
//           className="module-title"
//           onClick={() => toggleModule("transactions")}
//         >
//           💳 Transaction Module
//         </div>
//         {activeModule === "transactions" && (
//           <ul className="submodules">
//             <li>Issue Book</li>
//             <li>Return Book</li>
//             <li>View Transactions</li>
//           </ul>
//         )}
//       </div>

//       {/* Staff Members Module */}
//       <div className="module">
//         <div
//           className="module-title"
//           onClick={() => toggleModule("staff")}
//         >
//           🧑‍💼 Staff Members Module
//         </div>
//         {activeModule === "staff" && (
//           <ul className="submodules">
//             <li>Add Staff</li>
//             <li>Manage Staff</li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// without permission side bar code

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);
  const navigate = useNavigate();

  const toggleModule = (module) => {
    setActiveModule(activeModule === module ? null : module);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Library Modules</h2>

      {/* Books Module */}
      <div className="module">
        <div className="module-title" onClick={() => toggleModule("books")}>
          📚 Books Module
        </div>
        {activeModule === "books" && (
          <ul className="submodules">
            <li onClick={() => navigate("/create-book")}>Create Books</li>
            <li onClick={() => navigate("/manage-book")}>Manage Books</li>
          </ul>
        )}
      </div>

      {/* Members Module */}
      <div className="module">
        <div className="module-title" onClick={() => toggleModule("members")}>
          👥 Members Module
        </div>
        {activeModule === "members" && (
          <ul className="submodules">
            <li onClick={() => navigate("/create-member")}>Add Member</li>
            <li onClick={() => navigate("/manage-member")}>Manage Members</li>
          </ul>
        )}
      </div>

      {/* Transaction Module */}
      <div className="module">
        <div
          className="module-title"
          onClick={() => toggleModule("transactions")}
        >
          💳 Transaction Module
        </div>
        {activeModule === "transactions" && (
          <ul className="submodules">
            {/* <li>Issue Book</li> */}
            <li onClick={() => navigate("/create-transaction")}>Create Transaction</li>
            <li onClick={() => navigate("/manage-transaction")}>Manage Transactions</li>
          </ul>
        )}
      </div>

      {/* Staff Members Module */}
      <div className="module">
        <div className="module-title" onClick={() => toggleModule("staff")}>
          🧑‍💼 Staff Members
        </div>
        {activeModule === "staff" && (
          <ul className="submodules">
            <li onClick={() => navigate("/create-staff")}>Add Staff</li>
            <li onClick={() => navigate("/manage-staff")}>Manage Staff</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;


