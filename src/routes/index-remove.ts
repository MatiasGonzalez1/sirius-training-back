import { Router } from "express";
import {readdirSync} from "fs";

//se pasa como constante el directorio actual
const PATH_ROUTER = `${__dirname}`

const router = Router();

//funcion que recibe el nombre del archivo y quita la extensión
const cleanFilename = (filename:string)=>{
  const file = filename.split('.').shift();
  console.log(file)
  return file;
}

//cargador dinámico de modulos
readdirSync(PATH_ROUTER).filter((filename)=>{
  const cleanName = cleanFilename(filename);
  if(cleanName !== "index"){
    import(`./${cleanName}`).then((moduleRouter)=>{
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export {router};