import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
const userSignUp = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.signupIntoToDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.loginIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result.user,
        token: result.token
    })
})
export const UserController = {
    userSignUp,
    loginUser
}