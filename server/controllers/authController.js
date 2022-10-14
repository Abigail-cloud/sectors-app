import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
//A tailor-made error class
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'



const register = async(req, res)=>{
    const { name, email, password } = req.body;

if (!name || !email || !password) {
    throw new BadRequestError('please provide all values')
}

//alternative email verification intead from model
    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }
    ///////////////////////////////////
        const user = await User.create({name, email, password})  
       const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name
        },
        token,
        location: user.location
    })
}


const login = async(req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Kindly provide all values')
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('Invalid credentials')
    }
    const isPasswordRight = await user.comparePassword(password)
    if (!isPasswordRight) {
        throw new UnAuthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    user.password = undefined;
  res.status(StatusCodes.OK) .json({user, token, location:user.location})
}


const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body;
    if (!name||!email||!lastName||!location) {
        throw new BadRequestError('Please provide all details')
    }

    const user = await User.findOne({ _id: req.user.userId })
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location= location

    await user.save()

    // create a new token for the updated user values
    const token =user.createJWT()
    res.status(StatusCodes.ACCEPTED).json({user, token, location:user.location})
}


export{
    register, 
    login,
updateUser
}