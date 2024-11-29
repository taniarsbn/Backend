import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;