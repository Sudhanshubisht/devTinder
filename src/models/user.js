const mongoose  = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minLength :5,
        maxLength :50,
    },
    lastName: {
        type:String,
        required: true
    },
    emailId: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email:" +  value);
            }
        }
    },
    password: {
        type:String,
        required: true
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    about: {
        type: String,
        default: "this is default"
    },
    skills: {
        type:[String],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
