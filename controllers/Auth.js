import User from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  console.log("Request Body:", req.body);

  try {
    const { username, password } = req.body;

    let user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Validasi password
    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }

    req.session.userId = user.id;
    res.status(200).json({
      id: user.id,
      nama: user.nama,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan dalam proses login" });
  }
};

export const register = async (req, res) => {
  console.log("Request Body:", req.body);

  const { username, password } = req.body;

  try {
    // const existingUser = await User.findOne({ where: { username } });
    // if (existingUser) {
    //   return res.status(400).json({ msg: "Username already taken" });
    // }

    // Validasi role
    // if (role !== "User" && role !== "user") {
    //   return res.status(400).json({ msg: "Invalid role" });
    // }

    // Hash password
    const hashedPassword = await argon2.hash(password, 10);

    // Simpan user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
      //   role,
    });

    res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const { username, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak sama" });
  }

  let hashPassword;
  if (!password) {
    hashPassword = user.password; // Jangan update password jika tidak ada
  } else {
    hashPassword = await argon2.hash(password); // Hash password baru
  }

  try {
    await User.update(
      {
        username: username,
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "Data Telah Terupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login terlebih dahulu" });
    }

    let user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Terjadi Kesalahan:", error);
    res.status(500).json({
      msg: "Terjadi kesalahan",
    });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "Tidak dapat logout" });
    }
    res.status(200).json({ msg: "Logout telah berhasil" });
  });
};
