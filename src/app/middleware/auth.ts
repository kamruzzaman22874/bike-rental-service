import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../error/AppError';
import config from '../config';
import { catchAsync } from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.iterface';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authCheck = req.headers?.authorization;
        const token = authCheck?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route',
            });
        }
        // Check if the token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
            function (err, decoded) {
                if (err) {
                    throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT ATHURIZED !');
                }

                const role = (decoded as JwtPayload).role

                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT ATHORIZED!');
                }
                req.user = decoded as JwtPayload
                next();
            }
        )



        // // checking if the user is exist
        // const user = await User.isUserExistsByEmail(email);
        // if (!user) {
        //     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        // }



        // req.user = decoded as JwtPayload;

    });
};

export default auth;

//
