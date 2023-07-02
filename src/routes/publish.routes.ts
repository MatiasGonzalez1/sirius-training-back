import {Router } from "express";
import {getAllPublish, createPublish, getOnePublish, deletePublish, updatePublish} from "../controllers/publish.controller";

const router = Router();

router.get("/", getAllPublish);
router.get("/:id", getOnePublish)
router.post("/", createPublish);
router.put("/:id", updatePublish);
router.delete("/:id", deletePublish);

export default router;

