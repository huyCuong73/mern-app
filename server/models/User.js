import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String, default: ""},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})

export const UserModel = mongoose.model('User', schema)