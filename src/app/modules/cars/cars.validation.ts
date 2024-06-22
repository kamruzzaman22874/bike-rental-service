import { z } from 'zod';

const carValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({ message: 'Name is required' }),
        description: z.string().nonempty({ message: 'Description is required' }),
        color: z.string().nonempty({ message: 'Color is required' }),
        isElectric: z.boolean(),
        features: z.array(z.string()),
        pricePerHour: z.number().positive({ message: 'Price per hour must be positive' })
    })
});

export const CarValidation = {
    carValidationSchema
};