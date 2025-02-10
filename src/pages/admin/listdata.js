// src/pages/admin/list-data.js
import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import Table from "../../components/Table";
import { Dialog } from "../../components/Dialog";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function ListData() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">List Data</h1>
          <Card>
            <CardContent>
              <Table data={data} onDelete={() => setIsDeleteOpen(true)} />
            </CardContent>
          </Card>
        </main>
      </div>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </div>
  );
}
