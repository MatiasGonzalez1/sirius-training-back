import {Router } from "express";
import {getAllPublish, createPublish, getOnePublish, deletePublish, updatePublish} from "../controllers/publish.controller";

const router = Router();

router.get("/publish", getAllPublish);
router.get("/publish/:id", getOnePublish)
router.post("/publish", createPublish);
router.put("/publish/:id", updatePublish);
router.delete("/publish/:id", deletePublish);

export default router;

