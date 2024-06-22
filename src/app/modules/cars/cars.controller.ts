import { USER_ROLE } from './../user/constant';
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CarServices } from './cars.services';


const createCar = catchAsync(async (req: Request, res: Response) => {
    // const parsedData = carsSchema.parse(req.body);
    const result = await CarServices.createCarIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus?.CREATED,
        success: true,
        message: 'Car created successfully',
        data: result
    });
});

const getAllCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.getAllCarsFromDB(req.body);

    if (!result) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'No data found',
            data: []
        });
    }
    sendResponse(res, {
        statusCode: httpStatus?.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result
    })
})
const getCarById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await CarServices.getCarByIdFromDB(id);

    if (!car) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'No data found',
            data: []
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A Car retrieved successfully',
        data: car
    });
});

const updateCarById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // const parsedData = carUpdateSchema.parse(req.body);
    const updatedCar = await CarServices.updateCarByIdFromDB(id, req.body);

    if (!updatedCar) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Car not found'
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car updated successfully',
        data: updatedCar
    });
});

const deleteCarById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCar = await CarServices.carsDeleteFromDB(id);

    if (!deletedCar) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Car not found'
        });
    }



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car deleted successfully',
        data: deletedCar
    });
});

export const CarController = {
    createCar,
    getAllCar,
    getCarById,
    updateCarById,
    deleteCarById
};