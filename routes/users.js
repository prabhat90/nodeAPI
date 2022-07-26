import express from "express";
import { createUser, deleteUser, getUsers, getUser, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("you are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("you are logged in and delete.");
});

router.post("/", verifyAdmin, createUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);
router.get("/:id",getUser);
router.get("/", getUsers);
export default router;
