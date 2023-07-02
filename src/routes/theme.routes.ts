import {Router } from "express";
import {getAllTheme, createTheme, getOneTheme, deleteTheme, updateTheme} from "../controllers/theme.controller";

const router = Router();

router.get("/", getAllTheme);
router.get("/:id", getOneTheme)
router.post("/", createTheme);
router.put("/:id", updateTheme);
router.delete("/:id", deleteTheme);

export default router;