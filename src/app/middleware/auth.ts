import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../error/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';
import { catchAsync } from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.iterface';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const checkAuth = req.headers.authorization;
        const token = checkAuth?.split(' ')[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT ATHURIZED !');
        }
        // Check if the token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;
        const { role, email, iat, exp } = decoded;

        // checking if the user is exist
        const user = await User.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT ATHORIZED!lala');
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;

//
