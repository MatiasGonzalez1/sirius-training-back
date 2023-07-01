import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";


export const validateCreateArtist = [
  check('name')
  .exists().withMessage('Name is required')
  .trim().isLength({min:3}).withMessage('The name must have at least 3 characters')
  .not().isEmpty().withMessage('Name is empty')
  ,
  (req: Request, res: Response, next: NextFunction)=>{
    try{
      validationResult(req).throw()
      return next()
    } catch (error:any){
      res.status(403)
      res.send({errors: error.array()})
    }
  }
];
