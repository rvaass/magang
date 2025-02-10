// src/components/Button.js
import React from "react";

export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded text-white transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
