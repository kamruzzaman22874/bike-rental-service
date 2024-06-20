import { Model, Types } from "mongoose";
import { USER_ROLE } from "./constant";

export interface TUser {
    _id?: Types.ObjectId;
    toObject: any;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "admin" | "user";
}

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;