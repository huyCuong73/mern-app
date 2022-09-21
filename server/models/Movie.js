import mongoose from "mongoose";


const ratingSchema = mongoose.Schema(
    {
        rating: { type: Number, required: true },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
      timestamps: true,
    }
)

const commentSchema = mongoose.Schema(
    {
        username: { type: String , required:true},
        headline: {type:String},
        comment: { type: String , required:true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
      timestamps: true,
    }
)

// const statSchema = 
//     {
//         votes: {type:Number, default: 0},
//         one: {type:Number, default: 0},
//         two: {type:Number, default: 0},
//         three: {type:Number, default: 0},
//         four: {type:Number, default: 0},
//         five: {type:Number, default: 0},
//         six: {type:Number, default: 0},
//         seven: {type:Number, default: 0},
//         eight: {type:Number, default: 0},
//         nine: {type:Number, default: 0},
//         ten: {type:Number, default: 0},
//     }


const schema = new mongoose.Schema({
    title: {type:String},
    des: {type: String},
    portraitImg: {type: String},
    landscapeImg: {type: String},
    trailer: {type: String},
    releaseDate: {type:String},
    ageRating: {type: String},
    genre: {type: String},
    duration: {type: String},
    type: { type: String},
    rating: [ratingSchema],
    comment: [commentSchema],
    ratingStat: Array,
    avgRating: {type: Number,required: true,default: 0},
    numReviews: {type: Number,required: true,default: 0},
    numRatings: {type: Number,required: true,default: 0},
    castList: Array,
    upcoming:{type:Boolean, default: false}
}, {timestamps: true})

export const MovieModel = mongoose.model('Movie', schema)