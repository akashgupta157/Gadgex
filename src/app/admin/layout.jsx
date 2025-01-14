import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
