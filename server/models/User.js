import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
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
            minLength: 6,
            select:false,
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

//Hash password

UserSchema.pre('save', async function () {
// console.log(this.modifiedPaths())
    // if (!this.modifiedPaths('password')) {
    // const salt = await bcrypt.genSalt(10)
    // this.password = await bcrypt.hash(this.password, salt) 
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) 
   
})

//JsonWebToken
UserSchema.methods.createJWT = function (){
    return jwt.sign({ userId:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}


UserSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema)