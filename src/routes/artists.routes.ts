import {Router } from "express";
import {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist} from "../controllers/artist.controller";
import { validateCreateArtist } from "../validators/artists";


const router = Router();

router.get("/artists", getAllArtists);
router.get("/artists/:id", getOneArtist)
router.post("/artists", validateCreateArtist, createArtist);
router.put("/artists/:id", updateArtist);
router.delete("/artists/:id", deleteArtist);

export default router;