
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.iterface";
import config from "../../config";
import bcrypt from 'bcrypt';

export const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: 0
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
},
    { timestamps: true }
);

//set password
userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next()
})

//set "" after saving password

userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
})

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser, UserModel>("User", userSchema)