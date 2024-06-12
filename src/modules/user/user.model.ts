import { Schema, model } from "mongoose";
import { TUser } from "./user.iterface";

export const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"]
    }
});


export const UserModel = model<TUser>("User", userSchema)