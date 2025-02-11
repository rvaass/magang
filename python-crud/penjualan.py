import mysql.connector
from tabulate import tabulate

# Koneksi ke database
db = mysql.connector.connect(
    host="localhost",
    user="root",  # Ganti sesuai user MySQL Anda
    password="",  # Ganti sesuai password MySQL Anda
    database="crud_barang"
)

cursor = db.cursor()

# Fungsi untuk menampilkan semua data
def tampilkan_data():
    cursor.execute("SELECT * FROM barang")
    data = cursor.fetchall()
    print(tabulate(data, headers=["ID", "Nama Barang", "Kategori", "Harga", "Stok"], tablefmt="grid"))

# Fungsi untuk menambahkan data barang
def tambah_barang():
    nama = input("Masukkan Nama Barang: ")
    kategori = input("Masukkan Kategori: ")
    harga = int(input("Masukkan Harga: "))
    stok = int(input("Masukkan Stok: "))

    sql = "INSERT INTO barang (nama, kategori, harga, stok) VALUES (%s, %s, %s, %s)"
    val = (nama, kategori, harga, stok)
    cursor.execute(sql, val)
    db.commit()
    print("Barang berhasil ditambahkan!")

# Fungsi untuk mengupdate data barang
def update_barang():
    id_barang = int(input("Masukkan ID Barang yang akan diupdate: "))
    nama = input("Masukkan Nama Baru: ")
    kategori = input("Masukkan Kategori Baru: ")
    harga = int(input("Masukkan Harga Baru: "))
    stok = int(input("Masukkan Stok Baru: "))

    sql = "UPDATE barang SET nama=%s, kategori=%s, harga=%s, stok=%s WHERE id=%s"
    val = (nama, kategori, harga, stok, id_barang)
    cursor.execute(sql, val)
    db.commit()
    print("Barang berhasil diperbarui!")

# Fungsi untuk menghapus data barang
def hapus_barang():
    id_barang = int(input("Masukkan ID Barang yang akan dihapus: "))
    sql = "DELETE FROM barang WHERE id=%s"
    val = (id_barang,)
    cursor.execute(sql, val)
    db.commit()
    print("Barang berhasil dihapus!")

# Menu utama
def main():
    while True:
        print("\n=== SISTEM PENJUALAN SEMBAKO ===")
        print("1. Lihat Data Barang")
        print("2. Tambah Barang")
        print("3. Update Barang")
        print("4. Hapus Barang")
        print("5. Keluar")
        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            tampilkan_data()
        elif pilihan == "2":
            tambah_barang()
        elif pilihan == "3":
            update_barang()
        elif pilihan == "4":
            hapus_barang()
        elif pilihan == "5":
            print("Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid!")

if __name__ == "__main__":
    main()