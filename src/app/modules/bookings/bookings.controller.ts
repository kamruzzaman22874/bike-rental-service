import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BookingServices } from './bookings.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// const createCarBookings = catchAsync(async (req: Request, res: Response) => {
//     console.log(req.body)
//     const booking = await BookingServices.createBooking(req.user, req.body);
//     console.log(booking)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Car Booked successfully',
//         data: booking
//     })
// })


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
    console.log(carId)
    const bookings = await BookingServices.getAllBookings(carId as string, date as string);
    console.log(bookings)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings
    });
});

export const BookingController = {
    createBooking,
    getAllBookings
};