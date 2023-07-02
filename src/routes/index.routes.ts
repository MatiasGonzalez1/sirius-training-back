import {Router } from "express";
import artistRoutes from "./artists.routes";
import publishRoutes from "./publish.routes"
import themeRoutes from "./theme.routes"

const router = Router();


router.use("/artists", artistRoutes );
router.use("/theme", themeRoutes);
router.use("/publish", publishRoutes);

export default router;