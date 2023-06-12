import express from "express"; 
import cors from "cors";

import { router } from "./routes/artists";


const PORT = process.env.PORT || 3000;

const app = express();

//de esta forma puede ser consumida la app desde cualquier origen
app.use(cors());

//recibe datos en formato json por body
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, ()=> console.log(`Servidor listo en el puerto ${PORT}`));