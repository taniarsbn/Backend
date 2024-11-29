import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pengaduan = db.define(
  "Pengaduan",
  {
    kategori: {
      type: DataTypes.STRING,
      unique: true,
    },
    isi: DataTypes.STRING,
    
  },
  {
    freezeTableName: true,
  }
);

export default Pengaduan;