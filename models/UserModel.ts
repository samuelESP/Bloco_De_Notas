import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    notes : {type: Number,  default: 0}
})

export const UserModel = (mongoose.models.users || mongoose.model('users', userSchema))