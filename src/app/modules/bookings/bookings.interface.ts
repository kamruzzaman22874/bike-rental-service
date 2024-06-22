import { Types } from "mongoose";


export interface TBooking {
    date: Date;
    startTime?: string;
    endTime?: string | null;
    userId?: string;
    carId: Types.ObjectId;
    totalCost: number;
    createdAt: Date;
    updatedAt: Date;
}