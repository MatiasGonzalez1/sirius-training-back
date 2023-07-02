import express from "express"; 
import cors from "cors";

import indexRoutes from "./routes/index.routes"

const PORT = process.env.PORT || 3000;

const app = express();

//de esta forma puede ser consumida la app desde cualquier origen
app.use(cors());

//recibe datos en formato json por body
app.use(express.json())

// app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRoutes );

app.use((req, res, next)=>{
  res.status(404).json({error:'Sorry! 404 not found', try:['/api/artists', '/api/publish', '/api/theme']})
});

app.listen(PORT, ()=> console.log(`Servidor listo en el puerto ${PORT}`));