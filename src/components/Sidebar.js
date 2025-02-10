// src/components/Sidebar.js
import React from "react";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-bold text-blue-500">Admin Panel</h1>
      </div>
      <ul className="space-y-4 px-4">
        <li>
          <Link
            to="/"
            className="block py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/list-data"
            className="block py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            List Data
          </Link>
        </li>
        <li>
          <Link
            to="/add-data"
            className="block py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Data
          </Link>
        </li>
        <li>
          <Link
            to="/edit-data"
            className="block py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit Data
          </Link>
        </li>
      </ul>
    </div>
  );
}
