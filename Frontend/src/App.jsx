// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from './Header/Header'
// import Sidebar from './Sidebar/Sidebar'
// import TopBar from './Topbar/TopBar'
// import CreateBook from './Modules/Books/ManageBooks'

// function App() {

//   return (
//     <>
//       {/* <Router> */}
//         <Routes>
//           <TopBar/>
//           {/* <Sidebar/> */}
//           {/* <Header/>  */}

//           <Route>
//              <Route path="/create-book" element={<CreateBook />} />
//           </Route>



//         </Routes>
//       {/* </Router> */}
//     </>
//   )
// }

// export default App

import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import TopBar from './Topbar/TopBar'
import CreateBook from './Modules/Books/CreateBooks'
import CreateMember from './Modules/Members/CreateMembers';
import CreateTransaction from './Modules/Transactions/CreateTransaction';
import CreateStaff from './Modules/Staffs/CreateStaff';
import ManageBooks from './Modules/Books/ManageBooks';
import ManageMembers from './Modules/Members/ManageMembers';
import ManageTransactions from './Modules/Transactions/ManageTransactions';
import ManageStaffs from './Modules/Staffs/ManageStaffs';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <>
      {/* Components outside Routes */}
      {/* <TopBar /> */}
      {/* <Login/> */}
      {/* <Sidebar /> */}
      {/* <Header /> */}

      {/* Only Route elements inside Routes */}
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/create-member" element={<CreateMember />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />
        <Route path="/create-staff" element={<CreateStaff />} />

        <Route path="/manage-book" element={<ManageBooks />} />
        <Route path="/manage-member" element={<ManageMembers />} />
        <Route path="/manage-transaction" element={<ManageTransactions />} />
        <Route path="/manage-staff" element={<ManageStaffs />} />
        {/* Add more routes here */}
      </Routes>
    </>
  )
}

export default App
