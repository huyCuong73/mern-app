import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        movieId: {
        type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        portray:{type: String, required: true},
    },
    {
      timestamps: true,
    }
)


const schema = new mongoose.Schema({
    name:{type:String, required: true},
    biography:{type:String, required: true},
    img:{type:String},
    knownFor: {type:String, required: true},
    gender: {type: String, required: true},
    birthday: {type: String, required: true},
    placeOfBirth: {type: String, default: ""},
    playIn:[movieSchema]
}, {timestamps: true})

export const PersonModel = mongoose.model('Person', schema)