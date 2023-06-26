import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {Prisma, PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


const getAllPublish = async (req: Request, res: Response)=>{
  try {
    const response = await prisma.publish.findMany({
    });
    if(response.length === 0){
      res.send({response:'There are no artists currently'})
    }else{
    res.send({allPublish:response})
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
      res.status(404).send({error:"Publish not found"})
    }
    // res.send({...getOne, totalDuration: parseInt(totalDuration[0].sum)})
    res.send({getOne, totalDuration:(totalDuration._sum.duration)})
  }
   catch (error) {
    console.log(error)   
  }
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
      })

    console.log(create)
    res.send(create)
  } catch(error){
    console.log(error)
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
    if(!deletePublish ){
      res.status(404).send({error: "Publish not found"})
    }
    const deleteThemes = prisma.theme.deleteMany({
      where:{
        publish_id:idParse
      }
    });

    
    const transaction = await prisma.$transaction([deleteThemes, deleteOne])
    res.send({dataDeleted:transaction})
  }
   catch (error) {
    console.log(error)
  }
}

export {getAllPublish, createPublish, getOnePublish, deletePublish, updatePublish}