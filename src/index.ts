import express from "express"; 
import cors from "cors";

import artistRoutes from "./routes/artists.routes";
import publishRoutes from "./routes/publish.routes"
import themeRoutes from "./routes/theme.routes"

const PORT = process.env.PORT || 3000;

const app = express();

//de esta forma puede ser consumida la app desde cualquier origen
app.use(cors());

//recibe datos en formato json por body
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use("/api", artistRoutes );
app.use("/api", publishRoutes);
app.use("/api", themeRoutes);

app.listen(PORT, ()=> console.log(`Servidor listo en el puerto ${PORT}`));