import { Schema, model } from "mongoose";
import { TCars } from "./cars.interface";

export const carsSchema = new Schema<TCars>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isElectric: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'not available'],
        default: 'available',
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
},
    {
        timestamps: true,
    })


export const Cars = model<TCars>("Cars", carsSchema)