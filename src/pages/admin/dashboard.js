import { useState, useEffect } from "react";

// Komponen AdminDashboard
export default function AdminDashboard() {
  const [data, setData] = useState([]); // Menyimpan data barang
  const [isAddPage, setIsAddPage] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const Sidebar = () => (
    <div
      className={`bg-gray-800 text-white h-screen p-5 transition-all ${isSidebarOpen ? "w-64" : "w-16"}`}
    >
      <button
        className="text-white mb-6"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="text-2xl">{isSidebarOpen ? "←" : "→"}</span>
      </button>
      <div className="space-y-4">
        <p className="block p-2 hover:bg-blue-700">Dashboard</p>
        <p className="block p-2 hover:bg-blue-700">Settings</p>
        <button className="bg-red-500 text-white w-full py-2 rounded">Logout</button>
      </div>
    </div>
  );

  const Navbar = () => (
    <div className="bg-gray-800 text-white flex items-center justify-between p-4">
      <button className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <span className="text-xl">☰</span>
      </button>
      <h1 className="text-lg font-bold">Admin SIBARANG</h1>
    </div>
  );

  // Fetch data dari backend saat halaman dimuat
  useEffect(() => {
    fetch("http://localhost:5000/barang")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fungsi menambahkan barang baru
  const handleAdd = (e) => {
    e.preventDefault();
    const newData = { nama_barang: namaBarang, harga, stok };

    fetch("http://localhost:5000/barang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((result) => {
        setData([...data, { id: result.id, ...newData }]); // Update UI
        setIsAddPage(false);
        setNamaBarang("");
        setHarga("");
        setStok("");
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  const handleEdit = (e) => {
    e.preventDefault();
  
    // Pastikan ID ada
    if (!editItem || !editItem.id) {
      console.error("Invalid item to edit:", editItem);
      return;
    }
  
    const updatedData = {
      nama_barang: namaBarang,
      harga,
      stok,
    };
  
    console.log("Sending PUT request to:", `http://localhost:5000/barang/${editItem.id}`);
    console.log("Data to update:", updatedData);
  
    // Pastikan URL sudah tepat
    fetch(`http://localhost:5000/barang/${editItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update");
        }
        return response.json();
      })
      .then(() => {
        setData(
          data.map((item) =>
            item.id === editItem.id ? { ...item, ...updatedData } : item
          )
        );
        setIsEditPage(false);
        setEditItem(null);
        setNamaBarang("");
        setHarga("");
        setStok("");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  

  // Fungsi menghapus barang
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/barang/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex-1 min-h-screen bg-gray-100 transition-all ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            {isAddPage || isEditPage ? (isAddPage ? "Tambah Barang" : "Edit Barang") : "List Data Barang"}
          </h1>
          <div className="mt-6">
            <button onClick={() => setIsAddPage(true)} className="bg-green-500 text-white px-4 py-2 rounded"> +</button>
          </div>
          <br></br>
          {!isAddPage && !isEditPage ? (
            <>
              <table className="w-full bg-white shadow-md rounded-lg border">
                <thead>
                  <tr>
                    <th className="p-4 border-b">No</th>
                    <th className="p-4 border-b">Nama Barang</th>
                    <th className="p-4 border-b">Harga</th>
                    <th className="p-4 border-b">Stok</th>
                    <th className="p-4 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-4 border-b text-center">{index + 1}</td>
                      <td className="p-4 border-b">{item.nama_barang}</td>
                      <td className="p-4 border-b">Rp {item.harga}</td>
                      <td className="p-4 border-b text-center">{item.stok}</td>
                      <td className="p-4 border-b text-center">
                        <button
                          onClick={() => {
                            setEditItem(item);
                            setNamaBarang(item.nama_barang);
                            setHarga(item.harga);
                            setStok(item.stok);
                            setIsEditPage(true);
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(item);
                            setIsDeleteModalOpen(true);
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
              <form onSubmit={isAddPage ? handleAdd : handleEdit}>
                <input
                  type="text"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  placeholder="Nama Barang"
                  className="border p-2 rounded mb-4 w-full"
                  required
                />
                <input
                  type="text"
                  value={`Rp ${harga}`}
                  onChange={(e) => {
                    // Ambil angka saja dari input
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setHarga(value);
                  }}
                  placeholder="Harga"
                  className="border p-2 rounded mb-4 w-full pl-12" // Memberikan padding kiri agar 'Rp' tidak menutupi input
                  required
                />
                <input
                  type="number"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  placeholder="Stok"
                  className="border p-2 rounded mb-4 w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setIsAddPage(false);
                    setIsEditPage(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
              </form>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Yakin ingin menghapus data ini?</h2>
                <div className="flex justify-between">
                <button
                    onClick={() => handleDelete(itemToDelete.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
