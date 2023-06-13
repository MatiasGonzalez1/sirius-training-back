import {Router } from "express";
import {getAllTheme, createTheme, getOneTheme, deleteTheme, updateTheme} from "../controllers/theme.controller";

const router = Router();

router.get("/theme", getAllTheme);
router.get("/theme/:id", getOneTheme)
router.post("/theme", createTheme);
router.put("/theme/:id", updateTheme);
router.delete("/theme/:id", deleteTheme);

export default router;