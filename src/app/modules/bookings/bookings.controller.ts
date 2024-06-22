import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BookingServices } from './bookings.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.user;
    const booking = req.body;
    const result = await BookingServices.createBooking(userId, booking);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car Booked successfully',
        data: result
    })
})

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const { carId, date } = req.query;
    const bookings = await BookingServices.getAllBookings(carId as string, date as string);
    console.log(bookings)
    if (bookings.length === 0) {
        throw new Error("Booking not found")
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings
    });
});



const singleBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingServices.getSingleUserBooking(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Bookings retrieved successfully',
        data: result
    })
    console.log("from single booking", result)  // if (!result)
})

export const BookingController = {
    createBooking,
    getAllBookings,
    singleBooking
};