import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", verifyAdmin, updateRoomAvailability);
router.delete("/:id/:hotelid", verifyAdmin,deleteRoom);
router.get("/:id",getRoom);
router.get("/", getRooms);

export default router;
