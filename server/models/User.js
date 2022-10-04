import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please provide a name'],
            minLength: 3,
            maxLength: 45, 
            trim: true
        },
        email: {
            type: String,
            required: [true, 'please provide a email'],
            validate: {
                validator:validator.isEmail,
                message:'please provide a valid email'
            }, 
            // match: [
            //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            //     'please provide a valid email',
            //   ],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'please provide a password'],
            minLength: 6
        },
        lastName: {
            type: String,
            trim: true,
            minLength: 3, 
            default: 'last_name'
        },
        location: {
            type: String,
            trim: true,
            minLength: 3, 
            default: 'Country or City'
        }
    }
)

export default mongoose.model('User', UserSchema)