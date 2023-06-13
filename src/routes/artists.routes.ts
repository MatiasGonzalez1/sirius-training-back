import {Router } from "express";
import {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist} from "../controllers/artist.controller";

const router = Router();

router.get("/artist", getAllArtists);
router.get("/artist/:id", getOneArtist)
router.post("/artist", createArtist);
router.put("/artist/:id", updateArtist);
router.delete("/artist/:id", deleteArtist);

export default router;