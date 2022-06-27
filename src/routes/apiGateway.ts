import express, { NextFunction , Request , Response } from 'express';
import apiGatewayController from '../controllers/apiGateway.controller'
import { Schemas,ValidateJoi } from '../middleware/Joi';
const router = express.Router();

router.post('/',ValidateJoi(Schemas.apiGateway.auth),async(req:Request,res:Response,next:NextFunction)=>{

   try{ 
        const data = await apiGatewayController.apiGateway(req , res , next)
        res.status(data.status).send(data);
   }catch(error){
        console.log(error);

    }
});


router.get('/',async(req:Request,res:Response,next:NextFunction)=>{

    const data = await apiGatewayController.apiGateway(req , res , next)
    res.status(data.status).send(data);

});

export = router;
