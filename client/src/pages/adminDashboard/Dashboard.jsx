import React from "react";
import "./dasbhord.css";
import Sidebar from "../../components/adminDash/Sidebar";
import UsersTable from "../../components/adminDash/UsersTable";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <header className="header"></header>
      <section className="sidebar">
        <Sidebar />
      </section>
      <main className="main">
        <Outlet className="table" />
      </main>
    </div>
  );
};

export default Dashboard;
