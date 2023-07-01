import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {Prisma, PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


const getAllPublish = async (req: Request, res: Response)=>{
  try {
    const response = await prisma.publish.findMany({
    });
    if(response.length === 0){
      return res.status(404).send({message:'There are no artists currently'})
    }else{
    return res.send({status: 200, count: response.length, data:response})
    };
  } catch (error) {
    handleHttp(res, 'ERROR_GET_PUBLISH')    
  }
}

const getOnePublish = async({params}:Request, res:Response)=>{
  try {
    const id = params.id
    const idParse = parseInt(id)
    const totalDuration:any = await prisma.theme.aggregate({
      _sum:{
        duration:true,
      },
      where:{
        publish_id:{equals: idParse}
      }
      })
    const getOne = await prisma.publish.findUnique({
      where:{
       id_publish:idParse
      },
      include:{
        theme:{
          orderBy:{
            index:'asc'
          },
        },
      },
      
    });
    if(!getOne){
      return res.status(404).send({error:"Publish not found"})
    }
    // res.send({...getOne, totalDuration: parseInt(totalDuration[0].sum)})
    res.send({status: 200, data: getOne, totalDuration:(totalDuration._sum.duration)})
  }
   catch (error) {
    handleHttp(res, 'ERROR_GET_ONE_PUBLISH')  }
}

const createPublish =async ({body}:Request, res:Response) => {

  const {artist_id, name, date, theme} = body;
  const themes = theme?.map((theme: Prisma.ThemeCreateInput) => {
    return { index: theme?.index, duration: theme?.duration }
  })
  try{
    const create = await prisma.publish.create({
      data: {
        artist_id,
        name,
        date, 
        theme:{
          create:themes
        }
      },
      include:{
        theme:true,
      }
      });
      if(!artist_id || !name || !date){
        return res.status(403).send({status:"FAILED", data: {error: "Some of the keys are missing from the request body, please check them: 'name', 'date', 'artist_id'"}})
      }
    res.send({status: 200, data:create})
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

    if(
      !body.name 
    ){
      return res.status(403).send({status:403, data: {error: "The following key are required 'name' "}})
    }else{
    res.send({status:200, data:getOne})
    }
  }
   catch (error) {
    handleHttp(res, 'ERROR_UPDATE_PUBLISH')   
  }
}

const deletePublish = async({params}:Request, res:Response)=>{
  try {
    
    const id = params.id
    const idParse = parseInt(id)
    
    const deleteOne = prisma.publish.delete({
      where:{
        id_publish:idParse
      }
    });
    if(!deletePublish){
      return res.status(404).send({error: "Publish not found"})
    } 
    const deleteThemes = prisma.theme.deleteMany({
      where:{
        publish_id:idParse
      }
    });
    
    const transaction = await prisma.$transaction([deleteThemes, deleteOne])
    res.send({status: 200, data:transaction})
  }
   catch (error) {
    handleHttp(res,'ERROR_DELETE_PUBLISH')
  }
}

export {getAllPublish, createPublish, getOnePublish, deletePublish, updatePublish}