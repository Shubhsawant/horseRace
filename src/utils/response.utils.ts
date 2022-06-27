import { StatusCodes } from "http-status-codes";
import { errors,messages } from "./constant.utils";

const errorResponse = (code : any , error : any) => ({
	message: errors.FAILED,
	data: null,
	error: error,
	status:code
});

const 	successResponse = (data : any) => ({
	data: data,
	error: null,
	message: messages.SUCCESS,
	status: StatusCodes.OK
});


export default {
	errorResponse,
	successResponse,
};
