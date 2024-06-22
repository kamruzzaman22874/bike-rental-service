import { TBooking } from "./bookings.interface";
import { Bookings } from "./bookings.model";
import { Cars } from "../cars/cars.model";
import mongoose from "mongoose";


const createBooking = async (id: string, payload: TBooking) => {
    // console.log("from payload", payload)
    payload.userId = id;
    const car = await Cars.findOne({
        _id: payload.carId
    })
    if (!car) {
        throw new Error("Not Found")
    }
    if (car.status === "not available") {
        throw new Error("Not Found")
    }
    const session = await mongoose.startSession();
    try {

        session.startTransaction()
        const update = await Cars.findByIdAndUpdate(payload.carId, { status: "not available" }, { new: true, session });

        if (!update) {
            throw new Error("Not Found")
        }

        const result = await Bookings.create([payload], {
            session
        })
        if (!result[0]) {
            throw new Error("Not Found")
        }
        await session.commitTransaction()
        await session.endSession()
        return (await result[0].populate("userId")).populate("carId");

    } catch (error) {
        console.log(error)
    }
}

const getAllBookings = async (carId?: string, date?: string) => {
    console.log(carId)
    const query: any = { status: "available" };
    if (carId) query.car = carId;
    if (date) query.date = date;

    const bookings = await Bookings.find(query)
        .populate('User', '-password')
        .populate('Cars')
        .exec();

    return bookings;
};

export const BookingServices = {
    createBooking,
    getAllBookings
};


