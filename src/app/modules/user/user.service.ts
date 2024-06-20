import jwt, { JwtPayload } from 'jsonwebtoken';

import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.iterface";
import { User } from "./user.model";
import config from '../../config';

const signupIntoToDB = async (payload: TUser) => {

    const result = await User.create(payload)
    const user = result.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    // delete (user as { password?: string }).password;
    // delete (user as { createdAt?: string }).createdAt;
    // delete (user as { updatedAt?: string }).updatedAt;
    return user;

}

const loginIntoDb = async (data: Partial<TUser>) => {
    const result = await User.isUserExistsByEmail(data.email as string);


    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (!(await User.isPasswordMatched(data?.password as string, result?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    const jwtPayload = {
        email: result.email,
        role: result.role,
    };

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: '10d',
    });

    // const refreshToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     {
    //         expiresIn: '10d',
    //     },
    // );

    const user = result.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return {
        token,
        // refreshToken,
        // result,
        user
    };
};

export const UserServices = {
    signupIntoToDB,
    loginIntoDb
}