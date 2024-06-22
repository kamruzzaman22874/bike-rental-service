import { TCars } from "./cars.interface";
import { Cars } from "./cars.model";


const createCarIntoDB = async (payload: TCars) => {
    const result = await Cars.create(payload);
    return result.toObject();
};

const getAllCarsFromDB = async (payload: TCars) => {
    const result = await Cars.find(payload)
    return result;
}

const getCarByIdFromDB = async (id: string) => {
    const car = await Cars.findById(id).exec();
    return car;
};
const updateCarByIdFromDB = async (id: string, payload: Partial<TCars>) => {
    const updatedCar = await Cars.findByIdAndUpdate(id, payload, { new: true }).exec();
    return updatedCar;
};
const carsDeleteFromDB = async (id: string) => {
    const deletedCar = await Cars.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    return deletedCar;
};

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getCarByIdFromDB,
    updateCarByIdFromDB,
    carsDeleteFromDB
};