import mongoose, { Schema } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingsSchema = new mongoose.Schema<TBooking>({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'Cars',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true,
    }
)


// Create and export the Booking model
export const Bookings = mongoose.model<TBooking>('Booking', bookingsSchema);
