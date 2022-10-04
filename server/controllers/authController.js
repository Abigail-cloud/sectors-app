import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
//A tailor-made error class
import {BadRequestError} from '../errors/index.js'






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
        const user = await User.create(name, email, password)  
        res.status(StatusCodes.CREATED).json({user})
   
}


const login = async(req, res)=>{
    res.send('login')
}


const updateUser = async(req, res)=>{
    res.send('user')
}


export{
    register, 
    login,
updateUser
}