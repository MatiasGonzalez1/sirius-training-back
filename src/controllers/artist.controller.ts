import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const getAllArtists = async (req: Request, res: Response)=>{
  try{
    const response = await prisma.artist.findMany({
    });
    if(response.length === 0){
      return res.send({message:'There are no artists currently'})
    }else{
    return res.send({status:200, count: response.length, data:response})
    };
  }catch(e){
    res.status(500).send({error: '500'})
  }
  
  
}

const getOneArtist = async({params}:Request, res:Response)=>{
  try{
      const id = params.id
      const idParse = parseInt(id)
      const getOne = await prisma.artist.findUnique({
      where:{
        id_artist:idParse
      }, 
      include:{
        post:{
          orderBy:{
            date: 'desc'
          }
        }
      },
    });

     if(!getOne){
      return res.send({status: 404, message:"Artist not found"})
     }
    res.send({status:200, data:getOne})
  }
  catch(error){
    res.status(500).send({error: '500'})
  }
}

const createArtist =async ({body}:Request, res:Response) => {
  // if(!body.name ){
  //   return res.status(400).send({status:"FAILED", data: {error: "The following key are empty in request body: 'name'"}})
  // }
    try {
      const create = await prisma.artist.create({
        data: {name: body.name}
      });
      res.send({status: 200, data:create})
    } catch (error) {
      res.status(500).send({error: '500'})
    }  
}

const updateArtist = async({params, body}:Request, res:Response)=>{
 
  try {
    const id = params.id
    const idParse = parseInt(id)
    const getOne = await prisma.artist.update({
      where:{
        id_artist:idParse
      },
      data:{name: body.name}
    });
    
    if(
      !body.name
    ){
      return res.status(403).send({status:400, data: {error: "The following key are empty in request body: 'name'"}})
    }
    else{
    res.send({status:200, data:getOne})
    }
  }
   catch (error) {
    res.status(500).send({error: '500 Internal Server Error'})  
  }
}

const deleteArtist = async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const deleteOne = await prisma.artist.delete({
      where:{
        id_artist:idParse
      }
    });
    res.send({status:"success", artistDeleted:deleteOne})
  }
   catch (error) {
    res.status(500).send({error: '500 Internal Server Error'})  
  }
}

export {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist}