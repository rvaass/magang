// src/components/Navbar.js
import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl">Admin Dashboard</div>
      <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
        Log Out
      </button>
    </div>
  );
}
