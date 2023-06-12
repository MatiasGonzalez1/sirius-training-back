import express from "express"; 
import cors from "cors";

import { PrismaClient } from '@prisma/client'
import { router } from "./routes/artists";

const prisma = new PrismaClient()

const PORT = process.env.PORT || 3000;

const app = express();

//de esta forma puede ser consumida la app desde cualquier origen
app.use(cors());

//recibe datos en formato json por body
app.use(express.json())


app.use(router);


// async function main() {
//   const newUser = await prisma.artist.create({
//     data: {
//       name: 'Alice in Chains',
//     },
//   })
//   console.log('Created new user: ', newUser)

//   const allUsers = await prisma.artist.findMany({
//   })
//   console.log('All users: ')
//   console.dir(allUsers, { depth: null })}

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())

app.listen(PORT, ()=> console.log(`Servidor listo en el puerto ${PORT}`));