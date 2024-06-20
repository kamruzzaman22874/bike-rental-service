/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';




import config from '../config';
import AppError from '../error/AppError';
import handleDuplicateError from '../error/handleDuplicateError';
import handlecastnErr from '../error/handleCastError';
import { TErrorSources } from '../globalInterface/error.interface';
import handelerError from '../error/handleZodError';
import handleValidationErr from '../error/handleValidationError';

const globalErrorHandeler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Some thing went Wrong !';

    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (error instanceof ZodError) {
        const simplifiedError = handelerError(error);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSources = simplifiedError?.errorSources);
    } else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationErr(error);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSources = simplifiedError?.errorSources);
    } else if (error?.name === 'CastError') {
        const simplifiedError = handlecastnErr(error);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSources = simplifiedError?.errorSources);
    } else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSources = simplifiedError?.errorSources);
    } else if (error instanceof Error) {
        (message = error.message),
            (errorSources = [
                {
                    path: '',
                    message: error.message,
                },
            ]);
    } else if (error instanceof AppError) {
        (statusCode = error?.statusCode),
            (message = error?.message),
            (errorSources = [
                {
                    path: '',
                    message: error?.message,
                },
            ]);
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // error,
        stack: config.NODE_ENV === 'development' ? error?.stack : null,
    });
};

export default globalErrorHandeler;
