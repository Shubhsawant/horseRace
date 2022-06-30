import { StatusCodes } from 'http-status-codes';
import commonUtil from '../utils/commonUtils';
import { errors } from '../utils/constant.utils';
import responseUtils from '../utils/response.utils';
import { config } from '../config/config';
import { runThreadService } from '../server';

export var reqObj: any = {};

const apiGateway = async (req: any) => {
    try {
        if (req.body.password !== `${config.server.PASSWORD}`) {
            return responseUtils.errorResponse(StatusCodes.BAD_REQUEST, errors.PASSWORD_IS_NOT_MATCHED);
        }

        const getToken = await commonUtil.postApiCall(config.server.postUrl, req.body, req.headers);

        reqObj.email = req.body.email;
        reqObj.password = req.body.password;
        await runThreadService(getToken);
        
        return responseUtils.successResponse(getToken);
    } catch (error) {
        return responseUtils.errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
};

console.log(reqObj);

export default { apiGateway };
