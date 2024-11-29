import express from "express";
import { getPengaduan, getPengaduanbyId, createPengaduan, deletePengaduan } from "../controllers/Pengaduan.js";

const router = express.Router();

router.get("/pengaduan/", getPengaduan);
router.get("/pengaduan/:id", getPengaduanbyId);
router.post("/pengaduan", createPengaduan);
router.delete("/pengaduan/:id", deletePengaduan);

export default router;