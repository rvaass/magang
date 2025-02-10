require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Port untuk Express.js, bukan MySQL

app.use(cors());
app.use(express.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // Pastikan port MySQL tetap 3306 di sini
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
  } else {
    console.log("Terhubung ke database MySQL");
  }
});

// API untuk mengambil semua data barang
app.get("/barang", (req, res) => {
  db.query("SELECT * FROM barang", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API untuk menambahkan barang baru
app.post("/barang", (req, res) => {
  const { nama_barang, harga, stok } = req.body;
  db.query(
    "INSERT INTO barang (nama_barang, harga, stok) VALUES (?, ?, ?)",
    [nama_barang, harga, stok],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Data berhasil ditambahkan", id: result.insertId });
    }
  );
});

app.put("/barang/:id", (req, res) => {
  const { name, price } = req.body;
  db.query(
    "UPDATE barang SET name = ?, price = ? WHERE id = ?",
    [name, price, req.params.id],
    (err) => {
      if (err) throw err;
      res.send("Data updated");
    }
  );
});

// API untuk menghapus barang
app.delete("/barang/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM barang WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Data berhasil dihapus" });
  });
});
// *Menjalankan server*
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
