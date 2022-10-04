import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message); // err.messaage from the authcontroller
    const defaultError = {
        statusCode: err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Something went wrong, please try again later"
}
//Assign an validation to each error object to a specific variable e.g name or password
//instead of one giant object for a missing variable
    
    if (err.name ==='ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = err.message

        //condition for errors in object values for a property for missing values or fields
defaultError.msg = Object.values(err.errors).map((item)=>item.message).join(',')

    }
//condition for unique values or object keys i.e if user register with already registered
    //email an error will occur
if (err.code && err.code===11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} fields has to be unique`
}
    // res.status(defaultError.statusCode).json({msg:err})  //Complete error message or response
    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}

export default errorHandlerMiddleware