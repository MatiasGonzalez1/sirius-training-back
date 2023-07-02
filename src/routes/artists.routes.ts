import {Router } from "express";
import {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist} from "../controllers/artist.controller";
import { validateCreateArtist } from "../validators/artists";


const router = Router();

router.get("/", getAllArtists);
router.get("/:id", getOneArtist)
router.post("/", validateCreateArtist, createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

export default router;