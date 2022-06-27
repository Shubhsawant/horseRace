import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import commonUtil from '../utils/commonUtils';
import { errors } from '../utils/constant.utils';
import responseUtils from '../utils/response.utils';
import racingModel from '../models/racing.model';
import mongoose from 'mongoose';

const apiGateway = async(req: Request , res:Response , next:NextFunction) => {
try{
    const url = `http://35.207.169.147/auth`
    const passwordMatch = "lTgAYaLP9jRs"
    const {email,password} = req.body;

    if(password != passwordMatch){
        return responseUtils.errorResponse(StatusCodes.BAD_REQUEST,errors.PASSWORD_IS_NOT_MATCHED);
    }

    const getToken = await commonUtil.postApiCall(
        url,
        req.body,
        req.headers
    );    


    const getUrl = `http://35.207.169.147/results`
    const token = {"Authorization" : `Bearer ${getToken.token}`}
    const data = await commonUtil.getApiCall(
        getUrl,
        {},
        token
    )        


    console.log(data?.data);
    
    const race = new racingModel({
        _id: new mongoose.Types.ObjectId(),
        event:data?.data.event,
        horse:data?.data.horse,
        time:data?.data.time
    });
    const result = await race.save();

    return responseUtils.successResponse(result);


    }catch(error){
        return responseUtils.errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error)
    }

}


const getResult =async () => {
    const url = `http://35.207.169.147/results`;

    
}




export default {apiGateway}