// src/pages/admin/add-data.js
import React from "react";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AddData() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Tambah Data</h1>
          <Card>
            <CardContent>
              <form>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Item Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <Button className="w-full bg-green-500 hover:bg-green-600">Tambah Data</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
