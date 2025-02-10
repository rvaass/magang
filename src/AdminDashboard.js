import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaUserAlt,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [data, setData] = useState([]); // Menyimpan data barang
  const [isAddPage, setIsAddPage] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null); // Untuk menyimpan item yang akan dihapus
  const [searchQuery, setSearchQuery] = useState(""); // Untuk menyimpan query pencarian

  // State untuk waktu realtime
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    fetch("http://localhost:5000/barang")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format tanggal dan waktu menggunakan locale Indonesia
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("id-ID");

  // Menangani penambahan data barang
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
        // Asumsikan backend mengembalikan id data baru melalui result.id
        setData([...data, { id: result.id, ...newData }]);
        setIsAddPage(false);
        setNamaBarang("");
        setHarga("");
        setStok("");
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  // Menyiapkan modal edit dengan data yang dipilih
  const handleEdit = (item) => {
    console.log("Edit item:", item);
    setIsEditPage(true);
    setEditItem(item);
    setNamaBarang(item.nama_barang);
    setHarga(item.harga);
    setStok(item.stok);
  };

  // Menangani update data barang (edit)
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = { nama_barang: namaBarang, harga, stok };
    fetch(`http://localhost:5000/barang/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.text())
      .then(() => {
        const newData = data.map((item) =>
          item.id === editItem.id ? { ...item, ...updatedData } : item
        );
        setData(newData);
        setIsEditPage(false);
        setEditItem(null);
        setNamaBarang("");
        setHarga("");
        setStok("");
      })
      .catch((error) => console.error("Error editing data:", error));
  };

  // Fungsi untuk mengkonfirmasi penghapusan data
  const confirmDelete = () => {
    fetch(`http://localhost:5000/barang/${itemToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData(data.filter((item) => item.id !== itemToDelete.id));
        setItemToDelete(null);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  // Fungsi untuk membatalkan penghapusan data
  const cancelDelete = () => {
    setItemToDelete(null);
  };

  // Data yang ditampilkan akan difilter berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-purple-900 text-white h-full p-5 transition-all ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {isSidebarOpen ? (
          <div className="mb-6 flex items-center">
            {/* Logo Sidebar */}
            <img
              src="/logotaskmagang.png"
              alt="Logo"
              className="w-12 h-12 mr-2"
            />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        ) : (
          <div className="mb-6">
            <button
              className="text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="text-2xl">→</span>
            </button>
          </div>
        )}
        <div className="space-y-4">
          <a href="#" className="flex items-center p-2 hover:bg-purple-700">
            <FaTachometerAlt className="mr-2" />
            {isSidebarOpen && <span>Dashboard</span>}
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-purple-700">
            <FaCog className="mr-2" />
            {isSidebarOpen && <span>Settings</span>}
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-purple-700">
            <FaUserAlt className="mr-2" />
            {isSidebarOpen && <span>Users</span>}
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-purple-700">
            <FaChartBar className="mr-2" />
            {isSidebarOpen && <span>Reports</span>}
          </a>
          <button className="flex items-center bg-red-500 text-white w-full py-2 rounded">
            <FaSignOutAlt className="mr-2" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={isSidebarOpen ? "flex-1 ml-64" : "flex-1 ml-16"}>
        {/* Navbar: Search bar dan tombol tambah data */}
        <div className="bg-gray-800 text-white flex items-center justify-between p-4">
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="text-xl">☰</span>
          </button>
          <input
            type="text"
            placeholder="Cari data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3 p-2 rounded text-black"
          />
          <button
            onClick={() => {
              setNamaBarang("");
              setHarga("");
              setStok("");
              setIsAddPage(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Tambah Data Barang
          </button>
        </div>
        <div className="min-h-screen bg-gray-100 p-6">
          {/* Tulisan "Selamat Datang, Admin" di luar kotak */}
          <h1 className="text-2xl font-bold text-center mb-4">
            Selamat Datang, Admin
          </h1>
          {/* Tampilkan tanggal dan waktu realtime */}
          <p className="text-lg text-center mb-4">
            {formattedDate} - {formattedTime}
          </p>
          {/* Container box untuk judul "Data Barang" dan tabel */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-left mb-4">Data Barang</h1>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-purple-200">
                  <th className="p-4 border-b border-r border-gray-300 last:border-r-0">
                    No
                  </th>
                  <th className="p-4 border-b border-r border-gray-300 last:border-r-0">
                    Nama Barang
                  </th>
                  <th className="p-4 border-b border-r border-gray-300 last:border-r-0">
                    Harga
                  </th>
                  <th className="p-4 border-b border-r border-gray-300 last:border-r-0">
                    Stok
                  </th>
                  <th className="p-4 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-r border-gray-300 last:border-r-0 text-center">
                      {index + 1}
                    </td>
                    <td className="p-4 border-b border-r border-gray-300 last:border-r-0">
                      {item.nama_barang}
                    </td>
                    <td className="p-4 border-b border-r border-gray-300 last:border-r-0">
                      Rp {item.harga}
                    </td>
                    <td className="p-4 border-b border-r border-gray-300 last:border-r-0 text-center">
                      {item.stok}
                    </td>
                    <td className="p-4 border-b text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 DashboardAdmin by Revalina S
        </footer>
      </div>

      {/* Modal Tambah Data */}
      {isAddPage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Data Barang</h2>
            <form onSubmit={handleAdd}>
              <input
                type="text"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
                placeholder="Nama Barang"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                placeholder="Stok"
                className="w-full p-2 border rounded mb-2"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
              <button
                onClick={() => setIsAddPage(false)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Data */}
      {isEditPage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Data Barang</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
                placeholder="Nama Barang"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                placeholder="Stok"
                className="w-full p-2 border rounded mb-2"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => {
                  setIsEditPage(false);
                  setEditItem(null);
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{itemToDelete.nama_barang}</strong>?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Ya
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
