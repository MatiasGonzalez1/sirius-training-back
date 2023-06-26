import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const getAllTheme = async (req: Request, res: Response)=>{
  try {
    const response = await prisma.theme.findMany({})
    res.send(response);
  } catch (error) {
    handleHttp(res, 'ERROR_GET_THEME')    
  }
}

const getOneTheme= async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const getOne = await prisma.theme.findUnique({
      where:{
       id:idParse
      },
    });
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_GET_THEME')    
  }
}

const createTheme = async({body}:Request, res:Response) => {
  if(
    !body.duration || !body.index || !body.publish_id
  ){
    res.status(400).send({status:"FAILED", data: {error: "The following keys are empty in request body:'duration' or 'index' or 'publish:id'"}})
  }
  
  try{
    const create = await prisma.theme.create({
      data: body
    });
    res.send(create)
  } catch(error){
    console.log(error)
  }
}

const updateTheme= async({params, body}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const getOne = await prisma.theme.update({
      where:{
        id:idParse
      },
      data:body
    });
    res.send(getOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_THEME')    
  }
}

const deleteTheme= async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const deleteOne = await prisma.theme.delete({
      where:{
        id:idParse
      }
    });
    res.send(deleteOne)
  }
   catch (error) {
    handleHttp(res, 'ERROR_DELETE_THEME')    
  }
}

export {getAllTheme, createTheme, getOneTheme, deleteTheme, updateTheme}