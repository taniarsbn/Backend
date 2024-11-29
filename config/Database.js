import dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

const db = new Sequelize("db_nasabah", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db