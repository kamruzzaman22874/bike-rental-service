import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/constant';
import { BookingController } from './bookings.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
const router = express.Router();

router.post('/bookings', auth(USER_ROLE.user), validateRequest(BookingValidation.bookingValidationSchema), BookingController.createBooking);
router.get('/bookings', auth(USER_ROLE.admin), BookingController.getAllBookings);


export const BookingsRoute = router;