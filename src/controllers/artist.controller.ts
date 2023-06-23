import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const getAllArtists = async (req: Request, res: Response)=>{
    const response = await prisma.artist.findMany({
    });
    if(response.length === 0){
      res.send({response:'There are no artists currently'})
    }else{
    res.send({response})
    };
  
}

const getOneArtist = async({params}:Request, res:Response)=>{
    const id = params.id
    const idParse = parseInt(id)
    
    try{
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
      res.status(404).send({error:"Artist not found"})
    }
    res.send({artist:getOne})
  }
  catch(error){
    console.log(error)
  }
}

const createArtist =async ({body}:Request, res:Response) => {
  if(
    !body.name 
  ){
    res.status(400).send({status:"FAILED", data: {error: "The following key are empty in request body: 'name'"}})
  }
    try {
      const create = await prisma.artist.create({
        data: body
      });
      res.send(create)
    } catch (error) {
      console.error(error)
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
      data:body
    });
    if(
      !body.name 
    ){
      res.status(400).send({status:"FAILED", data: {error: "The following key are empty in request body: 'name'"}})
    } 
    else{
    res.send(getOne)
    }
  }
   catch (error) {
    handleHttp(res, 'ERROR_UPDATE_ARTIST', 500, 'ARTIST NOT FOUND')    
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
    handleHttp(res, 'ERROR_DELETE_ARTIST', 404, "ARTIST NOT FOUND")    
  }
}

export {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist}