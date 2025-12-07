import React from "react";
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import "./Dashboard.css";

const Dashboard = () => {
  const staff = JSON.parse(localStorage.getItem("staff"));

  return (

    <div className="dashboard-container">
        <Sidebar/> <Header/>
      <div className="dashboard-header shadow">
        <h2>📊 Dashboard</h2>
        <div className="staff-info">
          <span>Welcome, {staff?.name}</span>
          <span className="role">{staff?.role}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card-box">
          <h4>Total Books</h4>
          <p>1,240</p>
        </div>

        <div className="card-box">
          <h4>Active Members</h4>
          <p>980</p>
        </div>

        <div className="card-box">
          <h4>Books Issued</h4>
          <p>320</p>
        </div>

        <div className="card-box">
          <h4>Staff Members</h4>
          <p>24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
