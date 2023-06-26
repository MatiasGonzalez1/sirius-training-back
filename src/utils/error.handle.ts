//función para manejar mensajes de errores

import { Response } from "express"

const handleHttp = (res:Response, error:string, status?: number, errorRaw?:any)=>{
  console.log(errorRaw)
  res.status(status = 500)
  res.send({error, why:errorRaw})
}

export {handleHttp};