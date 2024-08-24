import mongoose from 'mongoose';

const Users = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }, 
    address : {
        residentialDetails : { type : String },
        street : { type : String },
        landmark : { type : String },
        city : { type : String },
        state : { type : String },
        pincode : { type : Number }
    },
    isVerify : { type : Boolean, default : false},
    verifyToken : String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
});

export default mongoose.model("Users", Users);