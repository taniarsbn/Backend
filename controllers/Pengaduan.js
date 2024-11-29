import Pengaduan from "../models/PengaduanModel.js";

export const getPengaduan = async (req, res) => {
  try {
    const response = await Pengaduan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching pengaduan:", error); // Log the error for debugging
    res.status(500).json({ msg: "Data Tidak Ditemukan" });
  }
};

export const getPengaduanbyId = async (req, res) => {
  try {
    const response = await Pengaduan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching pengaduan by ID:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createPengaduan = async (req, res) => {
  try {
    const { kategori, isi } = req.body;
    await Pengaduan.create({
      kategori,
      isi,
    });
    res.status(201).json({ msg: "Data Berhasil Ditambahkan" });
  } catch (error) {
    console.error("Error creating pengaduan:", error);
    res.status(500).json({ msg: "Data Gagal Dibuat" });
  }
};

export const deletePengaduan = async (req, res) => {
  try {
    const pengaduan = await Pengaduan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!pengaduan) {
      return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }

    await pengaduan.destroy(); // Corrected: Call destroy as a method

    res.status(200).json({ msg: "Data Berhasil Dihapus" });
  } catch (error) {
    console.error("Error deleting pengaduan:", error);
    res.status(500).json({ msg: "Data Gagal Dihapus" });
  }
};
