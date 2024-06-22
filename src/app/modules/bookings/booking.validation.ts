import { z } from 'zod';

// Define the validation schema
const bookingValidationSchema = z.object({
    body: z.object({
        user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format').optional(),
        carId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
        startTime: z.string()
    }),
});

export const BookingValidation = { bookingValidationSchema };
