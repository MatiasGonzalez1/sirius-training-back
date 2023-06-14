import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const getAllPublish = async (req: Request, res: Response)=>{
  try {
    const response = await prisma.publish.findMany({
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, 'ERROR_GET_PUBLISH')    
  }
}

const getOnePublish = async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const getOne = await prisma.publish.findUnique({
      where:{
       id_publish:idParse
      },
      // include:{
      //   theme:{
      //     orderBy:{
      //       index:'asc'
      //     }
      //   }
      // },
    });
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_GET_PUBLISH')    
  }
}

const createPublish =async ({body}:Request, res:Response) => {
  try{
    const create = await prisma.publish.create({
      data: body
    });
    res.send(create)
  } catch(error){
    handleHttp(res, 'ERROR_CREATE_PUBLISH')
  }
}

const updatePublish = async({params, body}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const getOne = await prisma.publish.update({
      where:{
        id_publish:idParse
      },
      data:body
    });
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_PUBLISH')    
  }
}

const deletePublish = async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const deleteOne = await prisma.publish.delete({
      where:{
        id_publish:idParse
      }
    });
    res.send(deleteOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_PUBLISH')    
  }
}

export {getAllPublish, createPublish, getOnePublish, deletePublish, updatePublish}