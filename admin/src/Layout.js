import React from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
export const Layout = ({ children }) => {
  return (
    <>
        <Topbar />
        <div className="container">
        <Sidebar />
        {children}
        </div>
    </>
  );
};