import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const getAllArtists = async (req: Request, res: Response)=>{
  try {
    const response = await prisma.artist.findMany({
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, 'ERROR_GET_ARTISTS')    
  }
}

const getOneArtist = async({params}:Request, res:Response)=>{
  try {
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
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_GET_ARTIST')    
  }
}

const createArtist =async ({body}:Request, res:Response) => {
  try{
    
    const create = await prisma.artist.create({
      data: body
    });
    res.send(create)
  } catch(error){
    handleHttp(res, 'ERROR_CREATE_ARTIST')
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
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_ARTIST')    
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
    res.send(deleteOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_ARTIST')    
  }
}

export {getAllArtists, createArtist, getOneArtist, deleteArtist, updateArtist}